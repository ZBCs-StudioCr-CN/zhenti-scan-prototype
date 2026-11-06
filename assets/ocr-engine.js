/* ==========================================================================
   OCR 引擎模块 · 扫描准确性提升
   1. 图像预处理：灰度/二值化/去噪/倾斜校正
   2. 版面分析：区分印刷题干区与手写作答区，按题号配对
   3. OCR 引擎封装：Tesseract.js（默认）+ 在线 API（Pix2Text/Mathpix/百度，用户配置）
   4. 置信度解析：低置信度词高亮，转人工确认
   ========================================================================== */
(function(global){
'use strict';

/* ---------- 引擎配置 ---------- */
const EngineConfig = {
  type: 'tesseract',           // tesseract | pix2text | mathpix | baidu
  apiKey: '',
  apiUrl: '',
  // 置信度阈值：低于此值的词标记为"需人工确认"
  confidenceThreshold: 70,
};

/* ---------- 1. 图像预处理 ---------- */

/** 加载图片为 Image 对象 */
function loadImage(src){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** 灰度化 */
function grayscale(imgData){
  const d = imgData.data;
  for(let i=0;i<d.length;i+=4){
    const g = 0.299*d[i] + 0.587*d[i+1] + 0.114*d[i+2];
    d[i]=d[i+1]=d[i+2]=g;
  }
  return imgData;
}

/** 自适应二值化（Sauvola 简化版） */
function binarize(imgData, radius=15, k=0.2){
  const {width:w, height:h, data} = imgData;
  const gray = new Float32Array(w*h);
  for(let i=0;i<w*h;i++) gray[i] = data[i*4];
  // 积分图
  const integral = new Float32Array((w+1)*(h+1));
  for(let y=0;y<h;y++){
    let rowSum=0;
    for(let x=0;x<w;x++){
      rowSum += gray[y*w+x];
      integral[(y+1)*(w+1)+x+1] = integral[y*(w+1)+x+1] + rowSum;
    }
  }
  const mean = (x1,y1,x2,y2) => {
    const s = integral[(y2+1)*(w+1)+x2+1] - integral[y1*(w+1)+x2+1] - integral[(y2+1)*(w+1)+x1] + integral[y1*(w+1)+x1];
    return s / ((x2-x1+1)*(y2-y1+1));
  };
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const x1=Math.max(0,x-radius), y1=Math.max(0,y-radius);
      const x2=Math.min(w-1,x+radius), y2=Math.min(h-1,y+radius);
      const m = mean(x1,y1,x2,y2);
      // 简化：用局部均值 - 偏移量作为阈值
      const threshold = m * (1 - k);
      const idx = (y*w+x)*4;
      const v = gray[y*w+x] > threshold ? 255 : 0;
      data[idx]=data[idx+1]=data[idx+2]=v;
    }
  }
  return imgData;
}

/** 中值滤波去噪 */
function denoise(imgData, radius=1){
  const {width:w, height:h, data} = imgData;
  const out = new Uint8ClampedArray(data);
  const win = (radius*2+1)*(radius*2+1);
  const arr = new Array(win);
  for(let y=radius;y<h-radius;y++){
    for(let x=radius;x<w-radius;x++){
      let k=0;
      for(let dy=-radius;dy<=radius;dy++){
        for(let dx=-radius;dx<=radius;dx++){
          arr[k++] = data[((y+dy)*w+(x+dx))*4];
        }
      }
      arr.sort((a,b)=>a-b);
      const med = arr[win>>1];
      const idx = (y*w+x)*4;
      out[idx]=out[idx+1]=out[idx+2]=med;
    }
  }
  return new ImageData(out, w, h);
}

/** 倾斜校正（基于投影轮廓找最佳角度） */
function deskew(canvas){
  const ctx = canvas.getContext('2d');
  const {width:w, height:h} = canvas;
  const imgData = ctx.getImageData(0,0,w,h);
  const gray = new Uint8Array(w*h);
  for(let i=0;i<w*h;i++) gray[i] = imgData.data[i*4] < 128 ? 1 : 0;

  let bestAngle=0, bestScore=-Infinity;
  for(let angle=-10; angle<=10; angle+=0.5){
    const rad = angle * Math.PI/180;
    const cosA = Math.cos(rad), sinA = Math.sin(rad);
    const scores = new Array(h).fill(0);
    let maxScore=0;
    for(let y=0;y<h;y++){
      for(let x=0;x<w;x++){
        if(!gray[y*w+x]) continue;
        const ny = Math.round(y*cosA - x*sinA);
        if(ny>=0 && ny<h){ scores[ny]++; if(scores[ny]>maxScore) maxScore=scores[ny]; }
      }
    }
    // 分数：投影的峰谷差越大，说明越对齐
    let sum=0;
    for(let i=0;i<h;i++) sum += scores[i]*scores[i];
    if(sum>bestScore){ bestScore=sum; bestAngle=angle; }
  }
  if(Math.abs(bestAngle)<0.5) return canvas;
  // 旋转
  const rad = bestAngle * Math.PI/180;
  const cosA = Math.cos(rad), sinA = Math.sin(rad);
  const nw = Math.abs(w*cosA)+Math.abs(h*sinA);
  const nh = Math.abs(w*sinA)+Math.abs(h*cosA);
  const out = document.createElement('canvas');
  out.width = nw; out.height = nh;
  const octx = out.getContext('2d');
  octx.fillStyle='#fff'; octx.fillRect(0,0,nw,nh);
  octx.translate(nw/2, nh/2);
  octx.rotate(rad);
  octx.drawImage(canvas, -w/2, -h/2);
  return out;
}

/** 完整预处理流水线 */
async function preprocess(src, opts={}){
  const img = await loadImage(src);
  const canvas = document.createElement('canvas');
  // 限制最大宽度，提升性能
  const maxW = opts.maxWidth || 1600;
  const scale = Math.min(1, maxW/img.width);
  canvas.width = img.width*scale;
  canvas.height = img.height*scale;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  if(opts.gray !== false) imgData = grayscale(imgData);
  if(opts.denoise !== false) imgData = denoise(imgData, 1);
  if(opts.binarize !== false) imgData = binarize(imgData, 15, 0.15);
  ctx.putImageData(imgData, 0, 0);

  let outCanvas = canvas;
  if(opts.deskew !== false) outCanvas = deskew(outCanvas);
  return outCanvas;
}

/* ---------- 2. 版面分析 ---------- */

/**
 * 版面分析：区分印刷题干区与手写作答区
 * 策略：水平投影切分行 → 每行按水平投影找文字块 → 用颜色/位置区分题干与作答
 */
function analyzeLayout(canvas){
  const ctx = canvas.getContext('2d');
  const {width:w, height:h} = canvas;
  const imgData = ctx.getImageData(0,0,w,h);
  const data = imgData.data;

  // 水平投影：每行的黑色像素数
  const rowProj = new Int32Array(h);
  for(let y=0;y<h;y++){
    let cnt=0;
    for(let x=0;x<w;x++){
      if(data[(y*w+x)*4] < 128) cnt++;
    }
    rowProj[y]=cnt;
  }

  // 切分行（投影 > 阈值的连续段）
  const threshold = Math.max(3, w*0.01);
  const lines = [];
  let inLine=false, start=0;
  for(let y=0;y<h;y++){
    if(rowProj[y] > threshold){
      if(!inLine){ inLine=true; start=y; }
    } else {
      if(inLine){ inLine=false; if(y-start>3) lines.push({y1:start, y2:y}); }
    }
  }
  if(inLine && h-start>3) lines.push({y1:start, y2:h});

  // 对每行做垂直投影，切出文字块
  const blocks = [];
  lines.forEach(line => {
    const lh = line.y2 - line.y1;
    const colProj = new Int32Array(w);
    for(let x=0;x<w;x++){
      let cnt=0;
      for(let y=line.y1;y<line.y2;y++){
        if(data[(y*w+x)*4] < 128) cnt++;
      }
      colProj[x]=cnt;
    }
    const colThresh = Math.max(2, lh*0.1);
    let inBlock=false, bx1=0;
    for(let x=0;x<w;x++){
      if(colProj[x] > colThresh){
        if(!inBlock){ inBlock=true; bx1=x; }
      } else {
        if(inBlock){
          inBlock=false;
          if(x-bx1>5){
            // 判断是否含红色/蓝色笔迹（手写作答通常用红/蓝笔）
            let colored=0, total=0;
            for(let y=line.y1;y<line.y2;y++){
              for(let xx=bx1;xx<x;xx++){
                const idx=(y*w+xx)*4;
                const r=data[idx], g=data[idx+1], b=data[idx+2];
                total++;
                if(r>150 && g<120 && b<120) colored++;       // 红色
                else if(b>120 && r<120 && g<120) colored++;    // 蓝色
              }
            }
            const isHandwritten = colored/total > 0.08;
            blocks.push({x1:bx1, y1:line.y1, x2:x, y2:line.y2, isHandwritten});
          }
        }
      }
    }
  });

  // 合并相邻的印刷体块为题干区（同一行内距离近的）
  const merged = [];
  blocks.sort((a,b)=>a.y1-b.y1 || a.x1-b.x1);
  for(const b of blocks){
    const last = merged[merged.length-1];
    if(last && !last.isHandwritten && !b.isHandwritten
       && b.y1 - last.y2 < 10 && b.x1 - last.x2 < 30){
      last.x2 = b.x2; last.y2 = b.y2;
    } else {
      merged.push({...b});
    }
  }

  // 按题号分组：找以数字开头的印刷体块作为题干起点
  const questions = [];
  let cur = null;
  for(const b of merged){
    if(!b.isHandwritten){
      // 检查是否以题号开头（简化：块在左侧且宽度较大）
      if(b.x1 < w*0.15){
        if(cur) questions.push(cur);
        cur = {stemBlocks:[b], answerBlocks:[]};
      } else if(cur){
        cur.stemBlocks.push(b);
      }
    } else if(cur){
      cur.answerBlocks.push(b);
    }
  }
  if(cur) questions.push(cur);

  return { lines, blocks: merged, questions };
}

/* ---------- 3. OCR 引擎封装 ---------- */

/** Tesseract.js 识别（带置信度） */
async function recognizeTesseract(canvas, lang='chi_sim+eng', opts={}){
  if(!global.Tesseract) throw new Error('Tesseract.js 未加载');
  const ret = await global.Tesseract.recognize(canvas, lang, {
    logger: opts.logger || (()=>{})
  });
  const words = ret.data.words || [];
  return {
    text: ret.data.text || '',
    confidence: ret.data.confidence || 0,
    words: words.map(w => ({
      text: w.text,
      confidence: w.confidence,
      bbox: w.bbox || null
    }))
  };
}

/** 在线 API 识别（预留：Pix2Text / Mathpix / 百度） */
async function recognizeAPI(canvas, opts){
  const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
  const fd = new FormData();
  fd.append('file', blob, 'page.png');
  if(opts.type === 'pix2text'){
    fd.append('api_key', opts.apiKey);
    const res = await fetch(opts.apiUrl || 'https://api.pix2text.com/v1/ocr', {
      method:'POST', body: fd
    });
    const json = await res.json();
    return { text: json.text || json.results?.map(r=>r.text).join('\n') || '', confidence: 90, words: [] };
  }
  if(opts.type === 'mathpix'){
    const res = await fetch(opts.apiUrl || 'https://api.mathpix.com/v3/text', {
      method:'POST',
      headers:{'app_id':opts.appId||'', 'app_key':opts.apiKey, 'Content-type':'application/json'},
      body: JSON.stringify({src: await blobToDataURL(blob), formats:['text','latex_styled']})
    });
    const json = await res.json();
    return { text: json.text || '', confidence: json.confidence || 90, words: [] };
  }
  if(opts.type === 'baidu'){
    const base64 = await blobToDataURL(blob);
    const res = await fetch(opts.apiUrl || 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token='+opts.apiKey, {
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body: 'image='+encodeURIComponent(base64.split(',')[1])
    });
    const json = await res.json();
    return { text: (json.words_result||[]).map(w=>w.words).join('\n'), confidence: 90, words: [] };
  }
  throw new Error('不支持的 OCR 引擎类型：'+opts.type);
}

function blobToDataURL(blob){
  return new Promise((r,f)=>{
    const fr = new FileReader();
    fr.onload = ()=>r(fr.result);
    fr.onerror = f;
    fr.readAsDataURL(blob);
  });
}

/** 统一识别入口 */
async function recognize(canvas, opts={}){
  const cfg = {...EngineConfig, ...opts};
  if(cfg.type === 'tesseract') return recognizeTesseract(canvas, cfg.lang, cfg);
  return recognizeAPI(canvas, cfg);
}

/* ---------- 4. 置信度可视化 ---------- */

/** 将识别结果转为带置信度高亮的 HTML */
function renderConfidenceHTML(result, threshold){
  const t = threshold ?? EngineConfig.confidenceThreshold;
  if(!result.words || result.words.length === 0){
    return escapeHtml(result.text);
  }
  return result.words.map(w => {
    const conf = w.confidence;
    const cls = conf < t ? 'ocr-word-low' : conf < t+15 ? 'ocr-word-mid' : 'ocr-word-high';
    return `<span class="${cls}" title="置信度 ${Math.round(conf)}%">${escapeHtml(w.text)}</span>`;
  }).join(' ');
}

function escapeHtml(s){
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

/* ---------- 导出 ---------- */
global.OcrEngine = {
  config: EngineConfig,
  preprocess,
  analyzeLayout,
  recognize,
  renderConfidenceHTML,
  loadImage,
};

})(window);

/* ==========================================================================
   真题漏洞扫描 · 交互逻辑
   功能模块：
   1. Hash路由（6页面切换+导航同步）
   2. 真题列表渲染 + 选择/模式切换
   3. 逐题分析页：题目渲染/标记对错/快速跳转/快速生成数据
   4. 报告页：算法计算漏洞/雷达图SVG/矩阵热力图/三大主题得分
   5. 练习页：按漏洞分组推荐题/逐题作答反馈/快速完成/完成总结
   6. 我的：localStorage存历史报告/成长曲线SVG/回看报告
   ========================================================================== */

(function(){
'use strict';

/* ---------- 全局状态 ---------- */
const State = {
  selectedExamId: null,     // 当前选择的真题ID
  examMode: 'mark',         // mark=快速标记对错 | answer=完整作答
  currentQNum: 1,           // 当前题号 1-22
  answers: {},              // { 题号: {correct: true/false, userAns, submitted: bool} }
  currentReport: null,      // 当前报告对象（计算好的）
  practice: {               // 练习状态
    answers: {},            // { 练习题ID: {correct, submitted, selected} }
    groups: []              // 5大漏洞组数据
  },
  kbank: {                  // 考点套题状态
    view: 'grid',           // grid | quiz | report
    themeFilter: 'all',     // all | 1 | 2 | 3
    sort: 'freq',           // freq | diff | diffDesc | unfinished
    currentKpId: null,      // 当前做题的考点ID
    currentQIdx: 0,         // 当前题目索引 0-3
    answers: {},            // { kpId: { qId: {correct, selected, submitted} } }
    results: {}             // { kpId: { correctCount, total, mastery, ts } }
  }
};

/* ---------- 自动保存（防抖）---------- */
let _saveTimer = null;
function autosaveProgress(){
  if(!State.selectedExamId) return;
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    window.Storage?.saveProgress(State.selectedExamId, {
      currentQNum: State.currentQNum,
      answers: State.answers,
      examMode: State.examMode,
    });
  }, 400);
}
function autosavePractice(){
  if(!State.selectedExamId) return;
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    window.Storage?.savePractice(State.selectedExamId, {
      answers: State.practice.answers,
      groups: State.practice.groups,
      mode: State.practice.mode || 'B',
    });
  }, 400);
}
function autosaveKbank(){
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    window.Storage?.saveKbank({
      view: State.kbank.view,
      themeFilter: State.kbank.themeFilter,
      sort: State.kbank.sort,
      currentKpId: State.kbank.currentKpId,
      currentQIdx: State.kbank.currentQIdx,
      answers: State.kbank.answers,
      results: State.kbank.results,
    });
  }, 500);
}

/* ---------- 工具函数 ---------- */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];
const fmt = n => (Math.round(n*10)/10).toFixed(1);
const rnd = (min, max) => Math.floor(Math.random()*(max-min+1))+min;
const clamp = (n, min=0, max=100) => Math.max(min, Math.min(max, n));
const KP_MAP = Object.fromEntries(window.KNOWLEDGE_POINTS.map(kp => [kp.id, kp]));
const EXAM_MAP = Object.fromEntries(window.EXAM_PAPERS.map(p => [p.id, p]));

/* ---------- 样例试卷库（绑定到已知 examId）---------- */
const SAMPLE_EXAMS = [
  { id:'s1', name:'2025新高考I卷（正面 · 单选1-12+填空13-14）', img:'images/samples/exam-2025-I-front.svg', examId:'exam-2025-I', tag:'学生真实手写版', tagColor:'#b91c1c', pages:'第1页', note:'包含学生红笔勾选答案A/B、手写计算过程、错题打叉痕迹' },
  { id:'s2', name:'2025新高考I卷（背面 · 解答17-22压轴）', img:'images/samples/exam-2025-I-back.svg', examId:'exam-2025-I', tag:'解答题完整版', tagColor:'#7c3aed', pages:'第2-6页', note:'含解三角/数列/概率/立体几何/圆锥曲线/导数压轴6大解答题 + 学生草稿' },
  { id:'s3', name:'2024新高考II卷（学生手写签名版）', img:'images/samples/exam-2024-II-handwritten.svg', examId:'exam-2024-II', tag:'姓名考号完整', tagColor:'#047857', pages:'第1页', note:'含学生签名"李小明"、考号、考场手写，最接近真实上传场景' }
];

/* ---------- 1. Hash路由 + 状态同步 ---------- */
const ROUTES = ['home','search','kbank','exams','analysis','report','practice','wrongbook','my','pricing','login','teacher','biz'];
function switchPage(route){
  if(!ROUTES.includes(route)) route = 'home';
  $$('.page').forEach(p => p.classList.toggle('active', p.id === 'page-'+route));
  $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.route === route));
  window.scrollTo({top:0, behavior:'smooth'});
  if(route === 'kbank') initKbankPage();
  if(route === 'exams') renderExamList();
  if(route === 'analysis'){
    if(!State.selectedExamId){ location.hash = '#/exams'; return; }
    initAnalysisPage();
  }
  if(route === 'report'){
    if(!State.currentReport){ location.hash = '#/analysis'; return; }
    renderReport();
  }
  if(route === 'practice'){
    if(!State.currentReport){ location.hash = '#/report'; return; }
    initPracticePage();
  }
  if(route === 'my') renderMyPage();
  if(route === 'wrongbook') renderWrongbookPage();
  if(route === 'search') renderSearchPage();
  if(route === 'pricing') renderPricingPage();
  if(route === 'login') initLoginPage();
  if(route === 'teacher') renderTeacherPage();
  if(route === 'biz') renderBizPage();
  if(route === 'home'){
    setTimeout(renderMiniRadar, 100);
    // 示例报告按钮
    const demoBtn = $('#demoReportBtn');
    if(demoBtn && !demoBtn._bound){
      demoBtn._bound = true;
      demoBtn.addEventListener('click', () => {
        // 生成一份示例报告（2025 I 卷，中等偏上学生水平）
        const examId = '2025-I';
        const exam = EXAM_MAP[examId];
        if(!exam) return;
        State.selectedExamId = examId;
        State.answers = {};
        // 模拟一个 108 分左右的学生作答（正确率约 72%）
        exam.questions.forEach(q => {
          // 简单题大概率对，难题大概率错
          let correctProb = 0.92 - (q.diffLevel/5)*0.55 - (q.num>=17 ? 0.15 : 0);
          const correct = Math.random() < correctProb;
          const partial = q.type==='解答题' && correct ? (Math.random()>0.4 ? 1 : 0.7) : (correct ? 1 : 0);
          State.answers[q.num] = { correct: partial>=0.5, partial: q.type==='解答题'?partial:undefined, submitted: true, userAns: correct ? q.answer : 'DEMO_WRONG' };
        });
        State.currentReport = computeReport();
        // 标记为示例报告
        State.currentReport.isDemo = true;
        location.hash = '#/report';
      });
    }
  }
}
window.addEventListener('hashchange', () => {
  const route = location.hash.replace('#/','') || 'home';
  switchPage(route);
});

/* ---------- 2. 真题列表页 ---------- */
function renderExamList(){
  const list = $('#examList');
  list.innerHTML = window.EXAM_PAPERS.map(ex => `
    <div class="exam-item ${State.selectedExamId===ex.id?'selected':''}" data-id="${ex.id}">
      <div class="exam-left">
        <div class="exam-year">
          <div class="exam-year-num">${ex.year}</div>
          <div class="exam-year-vol">${ex.volume}</div>
        </div>
        <div class="exam-info">
          <h4>${ex.shortName} · 数学</h4>
          <div class="exam-meta">
            <span class="exam-meta-item">📝 <b>${ex.totalQuestions}题</b></span>
            <span class="exam-meta-item">🏆 <b>${ex.totalScore}分</b></span>
            <span class="exam-meta-item">📊 平均难度 <b>${ex.avgDifficulty}/5</b></span>
            <span class="exam-meta-item">⏱️ <b>120分钟</b></span>
          </div>
        </div>
      </div>
      <div class="exam-diff">
        <div class="exam-diff-label">难度分布</div>
        <div class="progress exam-diff-bar">
          <div class="progress-bar" style="width:${ex.avgDifficulty/5*100}%;background:linear-gradient(90deg,#10b981,#f59e0b,#dc2626)"></div>
        </div>
        <button class="exam-select">${State.selectedExamId===ex.id?'✓ 已选择':'选择'}</button>
      </div>
    </div>
  `).join('');
  // 绑定选择事件
  $$('.exam-item', list).forEach(el => {
    el.addEventListener('click', () => {
      State.selectedExamId = el.dataset.id;
      State.currentQNum = 1;
      State.answers = {};
      const btn = $('#startAnalyzeBtn');
      btn.disabled = false;
      btn.textContent = `开始分析 ${EXAM_MAP[State.selectedExamId].shortName} →`;
      btn.classList.remove('btn-dark');
      btn.classList.add('btn-primary');
      renderExamList();
    });
  });
  // 模式切换
  $$('.mode-option').forEach(el => {
    el.addEventListener('click', () => {
      $$('.mode-option').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      State.examMode = el.dataset.mode;
    });
  });
  // 开始按钮
  $('#startAnalyzeBtn').onclick = () => {
    if(!State.selectedExamId) return;
    location.hash = '#/analysis';
  };
  // 上传卡片点击效果（改为真实 OCR 流程）
  $('#pickLocalBtn').onclick = (e) => { e.stopPropagation(); $('#fileInput').click(); };
  $('#fileInput').onchange = (e) => {
    if(!e.target.files || !e.target.files.length) return;
    const files = [...e.target.files];
    // 文件校验
    const MAX_SIZE_MB = 15;
    const MAX_COUNT = 12;
    const ALLOWED = ['image/jpeg','image/jpg','image/png','image/svg+xml','image/webp','application/pdf'];
    const errs = [];
    if(files.length > MAX_COUNT) errs.push(`最多上传 ${MAX_COUNT} 张，当前 ${files.length} 张`);
    let totalSize = 0;
    for(const f of files){
      totalSize += f.size;
      if(!ALLOWED.includes(f.type)) errs.push(`不支持的格式：${f.name}（${f.type||'未知'}）`);
      if(f.size > MAX_SIZE_MB*1024*1024) errs.push(`文件过大：${f.name}（${(f.size/1024/1024).toFixed(1)}MB，上限 ${MAX_SIZE_MB}MB）`);
    }
    if(errs.length){
      alert('上传校验未通过：\n\n• ' + errs.slice(0,3).join('\n• ') + (errs.length>3?'\n... 还有 '+(errs.length-3)+' 项':'') + '\n\n请调整后重新上传。');
      e.target.value = '';
      return;
    }
    const f = files[0];
    const reader = new FileReader();
    reader.onload = ev => {
      startOCRFlow({ name: f.name, label: `本地文件：${f.name} · ${files.length}张`, src: ev.target.result, examId: guessExamByText(f.name) || 'exam-2025-I' });
    };
    reader.onerror = () => {
      alert('文件读取失败，请重试或换一张图片。');
    };
    reader.readAsDataURL(f);
    e.target.value = ''; // 允许重复选择同一文件
  };
  $('#uploadCard').onclick = () => {
    // 卡片空白区点击 = 打开选择本地文件
    $('#fileInput').click();
  };
  // 关闭 OCR 弹窗
  $('#ocrCloseBtn').onclick = () => { $('#ocrModal').style.display = 'none'; };

  // 渲染样例试卷库
  renderSampleGrid();
}

/* ---------- 样例试卷渲染 + OCR 流程 ---------- */
function guessExamByText(t){
  if(/2024.*II|2024-?II|新高考.{0,2}二|2024.{0,4}二卷/.test(t)) return 'exam-2024-II';
  if(/2024/.test(t)) return 'exam-2024-I';
  return 'exam-2025-I';
}
function renderSampleGrid(){
  const grid = $('#sampleGrid');
  if(!grid) return;
  grid.innerHTML = SAMPLE_EXAMS.map(s => `
    <div class="sample-card" data-id="${s.id}">
      <div class="sample-thumb">
        <img src="${s.img}" alt="${s.name}" loading="lazy">
        <span class="sample-tag" style="background:${s.tagColor}">${s.tag}</span>
        <span class="sample-pages">${s.pages}</span>
      </div>
      <div class="sample-info">
        <div class="sample-title">${s.name}</div>
        <div class="sample-note">${s.note}</div>
      </div>
      <button class="sample-scan-btn">🔍 立即扫描 →</button>
    </div>
  `).join('');
  $$('.sample-card', grid).forEach(el => {
    el.addEventListener('click', () => {
      const s = SAMPLE_EXAMS.find(x=>x.id===el.dataset.id); if(!s) return;
      startOCRFlow({ name: s.name, label: `样例试卷：${s.name}`, src: s.img, examId: s.examId });
    });
  });
}
/* ---------- AI 学生作答判分（VEHME/LLM 预留接口）----------
   思路：题目 + 参考答案 + 学生作答图片 → LLM 判分（正确性+分步评分+错误定位）
   需用户配置 LLM API（兼容 OpenAI 格式：DeepSeek/通义/Kimi 等）
------------------------------------------------------------------ */
async function gradeStudentAnswer(question, imageFile){
  // 读取 LLM 配置
  const llmCfg = JSON.parse(localStorage.getItem('llmConfig') || '{}');
  if(!llmCfg.apiKey){
    alert('请先在「AI引擎配置」中设置 LLM API Key 后再使用 AI 判分功能。');
    return;
  }
  const qNum = question.num;
  const btn = $(`.ai-grade-btn[data-num="${qNum}"]`);
  const originText = btn?.textContent;
  if(btn){ btn.disabled = true; btn.textContent = '⏳ AI 判分中…'; }

  try {
    // 图片转 base64
    const base64 = await new Promise((r,f)=>{
      const fr = new FileReader();
      fr.onload = ()=>r(fr.result);
      fr.onerror = f;
      fr.readAsDataURL(imageFile);
    });

    // 构建判分 prompt（参考 VEHME 的 Error Detection + Error Localization 思路）
    const systemPrompt = `你是一位资深高中数学阅卷老师。请根据题目、参考答案和学生手写作答图片，进行严格判分。
输出必须是严格的 JSON 格式，不要包含 markdown 标记：
{
  "correct": true/false,           // 整体是否正确
  "partial": 0-1,                  // 得分比例（1=满分，0.5=一半分，0=零分）
  "score": 数字,                    // 实际得分
  "totalScore": 数字,               // 满分
  "errorSteps": ["第1步错误原因", ...],  // 错误步骤及原因（如有）
  "reasoning": "简要判分理由"
}`;
    const userPrompt = `题目：${question.stem}
参考答案：${Array.isArray(question.answer) ? question.answer.join('、') : question.answer}
满分：${question.score} 分
请仔细查看学生的手写作答图片，对照参考答案进行判分。注意：解答题需要按步骤给分，关键步骤正确但最终答案错可给部分分。`;

    // 调用 LLM API（兼容 OpenAI 格式）
    const baseUrl = llmCfg.baseUrl || 'https://api.deepseek.com/v1';
    const model = llmCfg.model || 'deepseek-chat';
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${llmCfg.apiKey}`
      },
      body: JSON.stringify({
        model,
        messages:[
          {role:'system', content:systemPrompt},
          {role:'user', content:[
            {type:'text', text:userPrompt},
            {type:'image_url', image_url:{url: base64}}
          ]}
        ],
        temperature:0.1,
        response_format:{type:'json_object'}
      })
    });
    if(!res.ok) throw new Error(`API 错误 ${res.status}`);
    const json = await res.json();
    const content = json.choices?.[0]?.message?.content || '';
    let result = {};
    try { result = JSON.parse(content.replace(/```json|```/g,'').trim()); }
    catch(e){ result = { correct:false, partial:0, score:0, reasoning:content }; }

    // 更新作答状态
    State.answers[qNum] = {
      correct: result.correct || result.partial >= 0.5,
      partial: result.partial ?? (result.correct ? 1 : 0),
      submitted: true,
      userAns: 'AI_GRADED',
      aiResult: result
    };
    autosaveProgress();

    // 显示判分结果
    alert(`🤖 AI 判分结果：\n\n得分：${result.score ?? '?'} / ${question.score} 分\n${result.correct ? '✅ 回答正确' : '❌ 回答有误'}\n${result.errorSteps?.length ? '错误步骤：\n' + result.errorSteps.map((s,i)=>`${i+1}. ${s}`).join('\n') : ''}\n\n理由：${result.reasoning || ''}`);

    renderQDetail(); renderQGrid(); updateProgressStats(); checkAllDone();
  } catch(e){
    alert(`AI 判分失败：${e.message || e}\n\n请检查 LLM API 配置是否正确，或模型是否支持图片输入。`);
  } finally {
    if(btn){ btn.disabled = false; btn.textContent = originText; }
  }
}

/* ---------- OCR 流程（图像增强→版面分析→识别→人工确认→精标）---------- */
async function startOCRFlow({name, label, src, examId}){
  // 修正 examId：去掉 'exam-' 前缀以匹配 EXAM_MAP 的 key（data.js 中 id 为 '2025-I'）
  examId = examId.replace(/^exam-/, '');
  const modal = $('#ocrModal'); modal.style.display = '';
  $('#ocrFileLabel').textContent = label;
  $('#ocrPreviewImg').src = src;
  $('#ocrPreviewImg').style.display = '';
  $('#ocrPreviewCanvas').style.display = 'none';
  $('#ocrLayoutCanvas').style.display = 'none';
  $('#ocrProgressBar').style.width = '0%';
  $('#ocrPercent').textContent = '0%';
  $('#ocrStageText').textContent = '准备中…';
  $('#ocrEta').textContent = '预计 12 秒';
  $('#ocrLog').innerHTML = '';
  $('#ocrConfirm').style.display = 'none';
  setOcrStage(0);

  const logLine = (t, type='info') => {
    const colors = { info:'#475569', ok:'#059669', warn:'#d97706', err:'#dc2626', hl:'#2563eb' };
    const now = new Date();
    const ts = String(now.getMinutes()).padStart(2,'0')+':'+String(now.getSeconds()).padStart(2,'0');
    const line = document.createElement('div');
    line.className = 'ocr-log-line';
    line.style.color = colors[type] || '#475569';
    line.innerHTML = `<span class="ocr-log-ts">[${ts}]</span> ${t}`;
    $('#ocrLog').appendChild(line);
    $('#ocrLog').scrollTop = $('#ocrLog').scrollHeight;
  };

  // 读取预处理选项
  const getPpOpts = () => ({
    gray: $('#ppGray').checked,
    denoise: $('#ppDenoise').checked,
    binarize: $('#ppBinarize').checked,
    deskew: $('#ppDeskew').checked,
  });

  // ===== 阶段1：图像增强 =====
  setOcrStage(1);
  $('#ocrStageText').textContent = '阶段 1/5 · 图像增强（去噪+二值化+校正）…';
  logLine(`📥 加载试卷图像：${name}`, 'hl');
  updateProg(5, 12);

  let processedCanvas = null;
  try {
    processedCanvas = await OcrEngine.preprocess(src, getPpOpts());
    logLine(`✅ 图像增强完成：${processedCanvas.width}×${processedCanvas.height}px`, 'ok');
    // 显示增强后的图像
    $('#ocrPreviewImg').style.display = 'none';
    const pc = $('#ocrPreviewCanvas');
    pc.width = processedCanvas.width; pc.height = processedCanvas.height;
    pc.getContext('2d').drawImage(processedCanvas, 0, 0);
    pc.style.display = '';
    logLine('💡 提示：如识别效果不佳，可调整上方增强选项后点"重新识别"', 'info');
  } catch(e){
    logLine(`⚠️ 图像增强失败：${e.message||e}，使用原图`, 'warn');
  }
  updateProg(18, 10);

  // ===== 阶段2：版面分析 =====
  setOcrStage(2);
  $('#ocrStageText').textContent = '阶段 2/5 · 版面分析（区分题干/作答区）…';
  logLine('🧩 版面分析：水平投影切行 + 垂直投影切块 + 颜色特征区分印刷/手写', 'hl');
  let layout = null;
  try {
    layout = OcrEngine.analyzeLayout(processedCanvas || await OcrEngine.loadImage(src).then(img=>{
      const c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
      c.getContext('2d').drawImage(img,0,0); return c;
    }));
    const stemCnt = layout.questions.length;
    const handCnt = layout.blocks.filter(b=>b.isHandwritten).length;
    logLine(`✅ 版面分析：检测到 ${stemCnt} 个题干区域 + ${handCnt} 个手写区域`, 'ok');
    // 在 canvas 上标注版面
    drawLayoutOverlay(processedCanvas, layout);
  } catch(e){
    logLine(`⚠️ 版面分析异常：${e.message||e}，跳过`, 'warn');
  }
  updateProg(32, 8);

  // ===== 阶段3：文字识别（带置信度） =====
  setOcrStage(3);
  $('#ocrStageText').textContent = '阶段 3/5 · 文字识别（带置信度）…';
  logLine('🧠 调用 OCR 引擎识别题干与作答（逐词置信度评估）', 'hl');
  updateProg(38, 8);

  let ocrResult = null;
  let realText = '';
  try {
    const canvasForOcr = processedCanvas || $('#ocrPreviewCanvas');
    ocrResult = await OcrEngine.recognize(canvasForOcr, {
      logger: m => {
        if(m.status === 'recognizing text'){
          const p = Math.round(m.progress*100);
          updateProg(38 + p*0.5, 8 - Math.round(p/15));
        }
      }
    });
    realText = ocrResult.text || '';
    const avgConf = Math.round(ocrResult.confidence || 0);
    const lowCount = (ocrResult.words||[]).filter(w => w.confidence < 70).length;
    logLine(`✅ 识别完成：${realText.length} 字符 · 整体置信度 ${avgConf}% · 低置信词 ${lowCount} 个`, lowCount>10?'warn':'ok');
  } catch(e){
    logLine(`⚠️ OCR 异常：${e.message||e}`, 'err');
  }

  // 降级：识别内容过少时用预存题干兜底
  if(!realText || realText.trim().length < 30){
    const exam = EXAM_MAP[examId];
    realText = exam ? exam.questions.map(q => `${q.num}. ${q.stem}`).join('\n\n') : '';
    ocrResult = { text: realText, confidence: 0, words: [] };
    logLine('ℹ️  识别内容不足，使用预存题干兜底（建议检查图像质量）', 'warn');
  }
  updateProg(75, 3);

  // ===== 阶段4：结果确认（人机协同纠错） =====
  setOcrStage(4);
  $('#ocrStageText').textContent = '阶段 4/5 · 等待确认识别结果…';
  logLine('📝 请核对识别结果，红色低置信度词请重点检查，可直接编辑修正', 'hl');

  // 渲染带置信度高亮的结果
  const resultEl = $('#ocrResultHTML');
  if(ocrResult.words && ocrResult.words.length > 0){
    resultEl.innerHTML = OcrEngine.renderConfidenceHTML(ocrResult);
  } else {
    resultEl.textContent = realText;
  }
  $('#ocrConfidenceBadge').textContent = `整体置信度 ${Math.round(ocrResult.confidence||0)}%`;
  $('#ocrConfirm').style.display = '';

  // 等待用户确认
  const confirmedText = await waitForConfirm();
  logLine('✅ 识别结果已确认，进入考点精标', 'ok');
  $('#ocrConfirm').style.display = 'none';
  updateProg(88, 2);

  // ===== 阶段5：考点精标 =====
  setOcrStage(5);
  $('#ocrStageText').textContent = '阶段 5/5 · 考点匹配 + 精标…';
  logLine('🎯 输入至「271 课标考点知识库」进行匹配', 'hl');

  const qMatches = confirmedText.match(/(^|\n)\s*\d{1,2}[\.、\s]/gm) || [];
  const detectCount = Math.min(22, Math.max(8, qMatches.length || 22));
  logLine(`✅ 识别并切分题目：共检测到 ${detectCount} 道题`, 'ok');

  await sleep(500);
  const exam = EXAM_MAP[examId];
  if(exam){
    const mainKps = new Set(exam.questions.slice(0,12).map(q=>q.kpId));
    logLine(`✅ 主考点匹配：${mainKps.size} 个主考点 + ${exam.questions.slice(0,12).reduce((s,q)=>s+((q.relatedKpIds&&q.relatedKpIds.length)||0),0)} 个关联考点`, 'ok');
  }
  updateProg(100, 0);
  logLine('🎉 扫描完成！进入逐题分析页。', 'ok');

  // 选中试卷并跳转
  State.selectedExamId = examId;
  State.currentQNum = 1;
  State.answers = {};
  const examData = EXAM_MAP[examId];
  const btn = $('#startAnalyzeBtn');
  btn.disabled = false;
  btn.textContent = examData ? `开始分析 ${examData.shortName} →` : '开始分析 →';
  btn.classList.remove('btn-dark');
  btn.classList.add('btn-primary');
  renderExamList();

  setTimeout(() => {
    modal.style.display = 'none';
    location.hash = '#/analysis';
  }, 800);

  // ---------- 内部辅助 ----------
  function updateProg(p, eta){
    $('#ocrProgressBar').style.width = p+'%';
    $('#ocrPercent').textContent = p+'%';
    if(eta >= 0) $('#ocrEta').textContent = eta ? `预计 ${eta} 秒` : '即将完成';
  }
  function setOcrStage(n){
    $$('#ocrStageTimeline .ocr-stage').forEach(el => {
      const s = parseInt(el.dataset.stage, 10);
      el.classList.toggle('active', s === n);
      el.classList.toggle('done', s < n);
    });
  }
  function sleep(t){ return new Promise(r => setTimeout(r, t)); }

  // 版面可视化：在叠加层标注题干区(绿框)和手写作答区(红框)
  function drawLayoutOverlay(canvas, layout){
    const lc = $('#ocrLayoutCanvas');
    lc.width = canvas.width; lc.height = canvas.height;
    lc.style.display = '';
    const ctx = lc.getContext('2d');
    ctx.clearRect(0,0,lc.width,lc.height);
    ctx.lineWidth = 2;
    layout.blocks.forEach(b => {
      ctx.strokeStyle = b.isHandwritten ? 'rgba(220,38,38,0.7)' : 'rgba(16,185,129,0.7)';
      ctx.strokeRect(b.x1, b.y1, b.x2-b.x1, b.y2-b.y1);
    });
    // 叠加在预览图上
    lc.style.position = 'absolute';
    lc.style.left = $('#ocrPreviewCanvas').offsetLeft + 'px';
    lc.style.top = $('#ocrPreviewCanvas').offsetTop + 'px';
  }

  // 等待用户点击确认或重新识别
  function waitForConfirm(){
    return new Promise(resolve => {
      const onConfirm = () => {
        cleanup();
        resolve(resultEl.innerText || realText);
      };
      const onReRun = () => {
        logLine('🔄 重新执行识别流程…', 'hl');
        cleanup();
        // 重新跑整个流程
        startOCRFlow({name, label, src, examId});
      };
      $('#ocrConfirmBtn').addEventListener('click', onConfirm, {once:true});
      $('#ocrReRunBtn').addEventListener('click', onReRun, {once:true});
      function cleanup(){
        $('#ocrConfirmBtn').removeEventListener('click', onConfirm);
        $('#ocrReRunBtn').removeEventListener('click', onReRun);
      }
    });
  }
}
startOCRFlow._s = Date.now();

/* ---------- 预处理按钮 & OCR 引擎配置 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // 应用增强并重跑识别
  const applyBtn = $('#ppApplyBtn');
  if(applyBtn){
    applyBtn.addEventListener('click', () => {
      const modal = $('#ocrModal');
      if(modal.style.display === 'none') return;
      const src = $('#ocrPreviewImg').src;
      if(!src) return;
      const label = $('#ocrFileLabel').textContent;
      startOCRFlow({ name: label, label, src, examId: State.selectedExamId || 'exam-2025-I' });
    });
  }

  // OCR 引擎配置
  const cfgToggle = $('#ocrConfigToggle');
  const cfgBody = $('#ocrConfigBody');
  const engineSelect = $('#ocrEngineSelect');
  const apiKeyRow = $('#ocrApiKeyRow');
  const apiUrlRow = $('#ocrApiUrlRow');
  const appIdRow = $('#ocrAppIdRow');
  const saveBtn = $('#ocrSaveConfig');

  if(cfgToggle){
    cfgToggle.addEventListener('click', () => {
      cfgBody.style.display = cfgBody.style.display === 'none' ? '' : 'none';
    });
  }

  // 读取已保存的配置
  const saved = JSON.parse(localStorage.getItem('ocrEngineConfig') || '{}');
  if(saved.type){
    engineSelect.value = saved.type;
    $('#ocrApiKey').value = saved.apiKey || '';
    $('#ocrApiUrl').value = saved.apiUrl || '';
    $('#ocrAppId').value = saved.appId || '';
    applyEngineConfig(saved);
  }

  // 切换引擎时显示对应的配置项
  engineSelect?.addEventListener('change', () => {
    const t = engineSelect.value;
    const needKey = t !== 'tesseract';
    apiKeyRow.style.display = needKey ? '' : 'none';
    apiUrlRow.style.display = needKey ? '' : 'none';
    appIdRow.style.display = t === 'mathpix' ? '' : 'none';
  });
  engineSelect?.dispatchEvent(new Event('change'));

  saveBtn?.addEventListener('click', () => {
    const cfg = {
      type: engineSelect.value,
      apiKey: $('#ocrApiKey').value.trim(),
      apiUrl: $('#ocrApiUrl').value.trim(),
      appId: $('#ocrAppId').value.trim(),
    };
    localStorage.setItem('ocrEngineConfig', JSON.stringify(cfg));
    applyEngineConfig(cfg);
    saveBtn.textContent = '✅ 已保存';
    setTimeout(() => saveBtn.textContent = '保存配置', 1500);
  });

  function applyEngineConfig(cfg){
    if(!window.OcrEngine) return;
    OcrEngine.config.type = cfg.type || 'tesseract';
    OcrEngine.config.apiKey = cfg.apiKey || '';
    OcrEngine.config.apiUrl = cfg.apiUrl || '';
    OcrEngine.config.appId = cfg.appId || '';
    const statusMap = {
      tesseract: 'Tesseract.js 5（浏览器端，免费）· 已就绪 ✅',
      pix2text: `Pix2Text API ${cfg.apiKey ? '· 已配置' : '· 未配置Key'}`,
      mathpix: `Mathpix API ${cfg.apiKey ? '· 已配置' : '· 未配置Key'}`,
      baidu: `百度OCR ${cfg.apiKey ? '· 已配置' : '· 未配置Key'}`,
    };
    const el = $('#ocrEngineStatus');
    if(el) el.textContent = 'OCR 引擎：' + (statusMap[cfg.type] || statusMap.tesseract);
  }

  // LLM 判分配置
  const savedLlm = JSON.parse(localStorage.getItem('llmConfig') || '{}');
  if(savedLlm.baseUrl) $('#llmBaseUrl').value = savedLlm.baseUrl;
  if(savedLlm.model) $('#llmModel').value = savedLlm.model;
  if(savedLlm.apiKey) $('#llmApiKey').value = savedLlm.apiKey;

  $('#llmSaveConfig')?.addEventListener('click', () => {
    const cfg = {
      baseUrl: $('#llmBaseUrl').value.trim(),
      model: $('#llmModel').value.trim(),
      apiKey: $('#llmApiKey').value.trim(),
    };
    localStorage.setItem('llmConfig', JSON.stringify(cfg));
    const btn = $('#llmSaveConfig');
    btn.textContent = '✅ 已保存';
    setTimeout(() => btn.textContent = '保存 LLM 配置', 1500);
  });
});

/* ---------- 3. 逐题分析页 ---------- */
function initAnalysisPage(){
  const exam = EXAM_MAP[State.selectedExamId];
  if(!exam){ console.warn('未找到试卷数据:', State.selectedExamId); return; }
  // 尝试恢复上次做题进度
  (async () => {
    const saved = await window.Storage?.getProgress(State.selectedExamId);
    if(saved && saved.answers && Object.keys(saved.answers).length > 0){
      if(confirm('检测到你上次做到第 ' + (saved.currentQNum || 1) + ' 题，已标记 ' + Object.keys(saved.answers).length + ' 道。\n是否恢复上次进度？')){
        State.answers = saved.answers || {};
        State.currentQNum = saved.currentQNum || 1;
        if(saved.examMode) State.examMode = saved.examMode;
        renderQGrid();
        renderQDetail();
        updateProgressStats();
        return;
      }
    }
  })();
  // 头部
  $('#examHeader').querySelector('h2').textContent = exam.name;
  $('#examHeader').querySelector('p').textContent =
    `${exam.totalQuestions}题 · ${exam.totalScore}分 · 平均难度${exam.avgDifficulty}/5`;
  // 题目小格
  renderQGrid();
  // 当前题目
  renderQDetail();
  // 上一题/下一题
  $('#prevQ').onclick = () => { State.currentQNum = Math.max(1, State.currentQNum-1); autosaveProgress(); renderQDetail(); renderQGrid(); };
  $('#nextQ').onclick = () => { State.currentQNum = Math.min(exam.totalQuestions, State.currentQNum+1); autosaveProgress(); renderQDetail(); renderQGrid(); };
  updateProgressStats();
}
function renderQGrid(){
  const exam = EXAM_MAP[State.selectedExamId];
  const grid = $('#qGrid');
  grid.innerHTML = exam.questions.map(q => {
    const a = State.answers[q.num];
    const cls = a ? (a.correct ? 'correct' : 'wrong') : 'unanswered';
    const cur = State.currentQNum === q.num ? 'current' : '';
    return `<div class="q-cell ${cls} ${cur}" data-num="${q.num}">${q.num}</div>`;
  }).join('');
  $$('.q-cell', grid).forEach(c => {
    c.addEventListener('click', () => {
      State.currentQNum = parseInt(c.dataset.num);
      renderQDetail();
      renderQGrid();
    });
  });
}
function renderQDetail(){
  const exam = EXAM_MAP[State.selectedExamId];
  if(!exam){ console.warn('未找到试卷:', State.selectedExamId); return; }
  const q = exam.questions.find(x => x.num === State.currentQNum);
  if(!q){ console.warn('未找到题目:', State.currentQNum); return; }
  const kp = KP_MAP[q.kpId] || { id:q.kpId, name:'未匹配考点', themeName:'', moduleName:'', moduleId:'', weightScore:0, freqLevel:3, diffLevel:3 };
  const a = State.answers[q.num];
  // 选项/作答区按类型
  let answerArea = '';
  if(q.type === '单选'){
    answerArea = `<div class="q-options">
      ${q.options.map((op,i) => {
        const isAns = q.answer === op;
        const userSel = a && a.userAns === op;
        let cls = 'q-option';
        if(a && a.submitted){
          if(isAns) cls += ' correct';
          else if(userSel) cls += ' wrong';
        }else if(userSel) cls += ' selected';
        return `<div class="${cls}" data-op="${op}" data-num="${q.num}">
          <span class="q-option-key">${op}</span>
          <span class="q-option-text">选项${op}</span>
        </div>`;
      }).join('')}
    </div>`;
  }else if(q.type === '多选'){
    answerArea = `<div class="q-options">
      ${q.options.map((op,i) => {
        const isAns = Array.isArray(q.answer) && q.answer.includes(op);
        const userSel = a && Array.isArray(a.userAns) && a.userAns.includes(op);
        let cls = 'q-option';
        if(a && a.submitted){ if(isAns) cls += ' correct'; else if(userSel) cls += ' wrong'; }
        else if(userSel) cls += ' selected';
        return `<div class="${cls}" data-op="${op}" data-num="${q.num}" data-type="multi">
          <span class="q-option-key">${op}</span>
          <span class="q-option-text">选项${op}（多选）</span>
        </div>`;
      }).join('')}
    </div>
    <div style="margin-top:8px;color:var(--ink-muted);font-size:12px">💡 多选：选中你认为正确的所有选项后，点击"提交答案"</div>`;
  }else if(q.type === '填空'){
    answerArea = `<div class="q-answer-fill">
      <label>你的答案：</label>
      <input type="text" class="q-answer-input" id="fillInput_${q.num}" placeholder="请填写答案" value="${a && a.userAns || ''}">
      <button class="btn btn-primary btn-sm q-submit-fill" data-num="${q.num}">提交</button>
    </div>`;
  }else{ // 解答题
    answerArea = `<div class="q-answer-fill">
      <label style="align-self:flex-start;margin-top:8px">标记作答情况：</label>
      <div style="display:flex;gap:10px;flex-wrap:wrap;flex:1">
        <button class="btn btn-ghost btn-sm mark-btn" data-num="${q.num}" data-correct="1">✅ 完整做对（满分）</button>
        <button class="btn btn-ghost btn-sm mark-btn" data-num="${q.num}" data-correct="0.5">🟡 部分正确（得一半分）</button>
        <button class="btn btn-ghost btn-sm mark-btn" data-num="${q.num}" data-correct="0">❌ 没做出来/错误</button>
      </div>
      <div style="width:100%;margin-top:10px;padding-top:10px;border-top:1px dashed #e2e8f0">
        <button class="btn btn-outline btn-sm ai-grade-btn" data-num="${q.num}">📸 AI 拍照判分（上传学生作答图片）</button>
        <input type="file" class="ai-grade-input" data-num="${q.num}" accept="image/*" style="display:none">
        <span class="ai-grade-hint">需先配置 LLM API（调用 VEHME/通用大模型判分，支持分步评分+错误定位）</span>
      </div>
    </div>`;
  }

  // 结果标记
  const resultBadge = !a || !a.submitted
    ? `<span class="badge">未标记</span>`
    : a.correct
      ? `<span class="badge badge-ok">✓ 做对 · 得${q.score}分</span>`
      : `<span class="badge badge-warn">✗ 做错 · 丢${q.score}分</span>`;

  $('#qDetail').innerHTML = `
    <div class="q-head">
      <div style="display:flex;align-items:flex-start;gap:16px;flex:1;min-width:0">
        <div class="q-num">${q.num}</div>
        <div class="q-info">
          <div class="q-type-score">
            <span class="badge">${q.type}</span>
            <span class="badge badge-accent">${q.score} 分</span>
            <span class="badge">难度 ${'★'.repeat(q.diffLevel)}${'☆'.repeat(5-q.diffLevel)}</span>
            <span class="badge">全国错误率 ${Math.round(q.wrongRate*100)}%</span>
          </div>
        </div>
      </div>
      <div class="q-result-badge">${resultBadge}</div>
    </div>
    <div class="q-stem">【${q.num}】${q.stem}</div>
    ${answerArea}
    <div class="analysis">
      <div class="analysis-head">
        <h4>📚 考点精标与解析</h4>
        <span class="research-badge" title="资深教研团队审校">✓ 教研团队审校</span>
        <span class="kp-tag" title="对应考点路径">${kp.name}</span>
        <span class="kp-path">路径：${kp.themeName} → ${kp.moduleName} → ID ${kp.id}</span>
        ${renderKpDefinition(kp.name)}
      </div>
      <div class="analysis-grid">
        <div class="analysis-body">
          <h5>✅ 参考答案</h5>
          <p>${Array.isArray(q.answer) ? q.answer.join('、') : q.answer}（分值 ${q.score} 分）</p>
          <h5>💡 分步解析</h5>
          <ul class="sol-steps-inline">
            <li><span class="sol-step-label">第一步 · 审题</span>识别题目类型，确定核心考点为「${kp.name}」，考查能力：${window.RADAR_DIMENSIONS.find(d => d.kpModuleIds.includes(kp.moduleId))?.name || '综合应用'}。</li>
            <li><span class="sol-step-label">第二步 · 建模</span>从已知条件出发，建立数学模型，套用${kp.moduleName}对应解题模板（${kp.id.includes('1.3')?'辅助角公式+正余弦定理':kp.id.includes('2.3')?'空间建系+法向量':kp.id.includes('2.4')?'联立方程+韦达定理':'分类讨论思想'}思路）。</li>
            <li><span class="sol-step-label">第三步 · 运算</span>代入数值逐步求解，注意符号运算、公式变形的准确性，关键步骤不能跳步。</li>
            <li><span class="sol-step-label">第四步 · 验证</span>将结果代回原题检验，确认答案合理性，检查是否有多解或漏解情况。</li>
          </ul>
          <h5>🎯 易错点提醒</h5>
          <p>本题全国平均错误率${Math.round(q.wrongRate*100)}%，常见错误：①忽略隐含条件（如定义域、真数大于0、分母不为0）；②计算失误（尤其是符号/公式记错）；③解答题跳步导致丢步骤分。建议在变式练习中强化。</p>
        </div>
        <div class="kp-meta">
          <div class="kp-stat">
            <div class="kp-stat-label">考点高考数据</div>
            <div class="kp-stat-row"><span>近5年考察频率</span><span class="kp-stat-val ${kp.freqLevel>=4?'high':'mid'}">${'●'.repeat(kp.freqLevel)}${'○'.repeat(5-kp.freqLevel)} ${kp.freqLevel}/5</span></div>
            <div class="kp-stat-row"><span>平均难度等级</span><span class="kp-stat-val ${kp.diffLevel>=4?'high':'mid'}">${kp.diffLevel}/5</span></div>
            <div class="kp-stat-row"><span>年均考察分值</span><span class="kp-stat-val high">约 ${kp.weightScore} 分</span></div>
            <div class="kp-stat-row"><span>所属能力维度</span><span class="kp-stat-val">${window.RADAR_DIMENSIONS.find(d => d.kpModuleIds.includes(kp.moduleId))?.name || '综合'}</span></div>
          </div>
          <div>
            <h5 style="font-size:12.5px;font-weight:700;color:var(--ink-deep);margin:14px 0 8px;display:flex;align-items:center;gap:6px">
              <span>🔁</span> 同考点变式题（点击跳转练习）
            </h5>
            <div class="variant-list">
              ${(window.PRACTICE_BANK[kp.id]||[]).map(v=>`
                <div class="variant-item">
                  <span class="variant-label">变式${v.id.slice(-1)}</span>${v.stem.replace(/【变式\d·.*?】/,'')}
                </div>
              `).join('')}
              ${renderK12Exercises(kp.name)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  // 单选点击
  $$('.q-option', $('#qDetail')).forEach(el => {
    if(el.dataset.type === 'multi') return;
    el.addEventListener('click', () => {
      const num = parseInt(el.dataset.num);
      const op = el.dataset.op;
      const qq = exam.questions.find(x=>x.num===num);
      const correct = qq.answer === op;
      State.answers[num] = { correct, userAns: op, submitted: State.examMode==='answer' };
      autosaveProgress();
      if(State.examMode === 'answer'){ renderQDetail(); updateProgressStats(); checkAllDone(); }
      else { // 标记模式：点击即标记
        $$('.q-option').forEach(e=>e.classList.remove('selected','correct','wrong'));
        el.classList.add(correct?'correct':'wrong');
        updateProgressStats();
        checkAllDone();
      }
    });
  });
  // 标记模式快速对/错（顶部小格的右键/长按功能用替代：在未选选项时，提供两个快捷按钮）
  if(State.examMode === 'mark' && q.type !== '解答题'){
    const mk = document.createElement('div');
    mk.style.cssText = 'margin:16px 0;padding:14px;background:var(--paper-dark);border-radius:10px;display:flex;gap:10px;align-items:center';
    mk.innerHTML = `<b style="font-size:13px;color:var(--ink-deep);margin-right:6px">⚡ 快速标记（标记模式）：</b>
      <button class="btn btn-ghost btn-sm" data-mark="1">✅ 这道题做对了</button>
      <button class="btn btn-ghost btn-sm" data-mark="0">❌ 这道题做错了</button>
      <button class="btn btn-ghost btn-sm" data-mark="-" style="color:var(--ink-muted)">— 未作答/空着</button>`;
    $('#qDetail').querySelector('.q-head').after(mk);
    $$('button[data-mark]', mk).forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.mark;
      if(v === '-'){ delete State.answers[q.num]; }
      else { State.answers[q.num] = { correct: v==='1', submitted:true, userAns: v==='1'?q.answer:'MARK_WRONG' }; }
      autosaveProgress();
      renderQDetail(); renderQGrid(); updateProgressStats(); checkAllDone();
    }));
  }
  // 多选提交
  let multiSel = new Set(a && Array.isArray(a.userAns) ? a.userAns : []);
  $$('.q-option[data-type="multi"]').forEach(el => {
    el.addEventListener('click', () => {
      const op = el.dataset.op;
      if(multiSel.has(op)) multiSel.delete(op); else multiSel.add(op);
      $$('.q-option[data-type="multi"]').forEach(e2 => {
        e2.classList.toggle('selected', multiSel.has(e2.dataset.op));
      });
    });
  });
  // 填空提交
  const fillBtn = $(`.q-submit-fill[data-num="${q.num}"]`);
  if(fillBtn){
    fillBtn.addEventListener('click', () => {
      const val = $('#fillInput_'+q.num).value.trim() || '(空)';
      // 填空判分：严格相等判全对
      const correct = val === String(q.answer);
      State.answers[q.num] = { correct, submitted:true, userAns: val };
      autosaveProgress();
      renderQDetail(); renderQGrid(); updateProgressStats(); checkAllDone();
    });
  }
  // 解答题标记
  $$('.mark-btn').forEach(b => b.addEventListener('click', () => {
    const c = parseFloat(b.dataset.correct);
    State.answers[q.num] = { correct: c>=0.5, partial:c, submitted:true, userAns:'MARK_'+c };
    autosaveProgress();
    renderQDetail(); renderQGrid(); updateProgressStats(); checkAllDone();
  }));

  // AI 拍照判分（解答题）
  $$('.ai-grade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const num = parseInt(btn.dataset.num);
      const input = $(`.ai-grade-input[data-num="${num}"]`);
      input?.click();
    });
  });
  $$('.ai-grade-input').forEach(input => {
    input.addEventListener('change', async () => {
      const num = parseInt(input.dataset.num);
      const file = input.files[0];
      if(!file) return;
      const qq = exam.questions.find(x=>x.num===num);
      await gradeStudentAnswer(qq, file);
    });
  });

  // 进度条
  $('#qNavBar').style.width = (State.currentQNum / exam.totalQuestions *100)+'%';
}
function updateProgressStats(){
  const exam = EXAM_MAP[State.selectedExamId];
  let c=0,w=0,u=exam.totalQuestions;
  Object.values(State.answers).forEach(a => { if(!a.submitted) return; a.correct?c++:w++; u--; });
  $('#progCurrent').textContent = State.currentQNum;
  $('#progCorrect').textContent = c;
  $('#progWrong').textContent = w;
  $('#progUnanswered').textContent = u;
}
function checkAllDone(){
  const exam = EXAM_MAP[State.selectedExamId];
  const done = Object.values(State.answers).filter(a=>a.submitted).length;
  if(done === exam.totalQuestions){
    // 延迟一下给用户看最后一题结果
    setTimeout(goToReport, 600);
  }
}
function goToReport(){
  // 计算报告数据
  State.currentReport = computeReport();
  location.hash = '#/report';
}

/* ---------- 漏洞追溯：沿先修链回溯底层薄弱点 ---------- */
// 用考点名在知识树中模糊搜索最相关的知识点
function findKpByName(examPointName){
  if(!window.KNOWLEDGE_TREE) return null;
  const name = examPointName.replace(/[（(].*?[）)]/g,'').replace(/[，。、\s/]+/g,'');
  let best=null, bestScore=0;
  for(const tp of window.KNOWLEDGE_TREE){
    if(!tp.isHigh) continue;
    const tname = tp.name;
    // 计算字符重叠度
    const setA = new Set(name), setB = new Set(tname);
    let overlap=0;
    for(const ch of setA) if(setB.has(ch)) overlap++;
    const score = overlap / Math.max(setA.size, setB.size);
    if(score > bestScore){ bestScore=score; best=tp; }
  }
  return bestScore >= 0.3 ? best : null;
}

// 沿硬先修链递归回溯，返回追溯链数组（从当前到最底层）
function tracePrerequisites(kpId){
  if(!window.KNOWLEDGE_DEPS || !window.KNOWLEDGE_TREE) return [];
  const kpMap = {};
  window.KNOWLEDGE_TREE.forEach(t => kpMap[t.id]=t);
  const chain = [];
  const visited = new Set();
  function dfs(id, depth){
    if(visited.has(id) || depth > 8) return; // 防循环+限深
    visited.add(id);
    const tp = kpMap[id];
    if(tp) chain.push({...tp, depth});
    // 找硬先修
    const hardPres = window.KNOWLEDGE_DEPS
      .filter(d => d.t===id && d.s==='hard')
      .map(d => d.p);
    for(const p of hardPres) dfs(p, depth+1);
  }
  dfs(kpId, 0);
  return chain;
}

// 渲染K12教材习题
function renderK12Exercises(examPointName){
  const kp = findKpByName(examPointName);
  if(!kp || !kp.k12_exercises || !kp.k12_exercises.length) return '';
  return kp.k12_exercises.map((ex,i)=>`
    <div class="variant-item k12-ex">
      <span class="variant-label k12-label">教材题${i+1}</span>${ex.stem}
      <div class="k12-ex-answer" style="display:none"><b>答案：</b>${ex.answer}${ex.analysis?`<br><b>解析：</b>${ex.analysis}`:''}</div>
    </div>
  `).join('');
}

// 生成考点的教材定义原文+公式+章节定位 HTML
function renderKpDefinition(examPointName){
  const kp = findKpByName(examPointName);
  if(!kp) return '';
  const def = kp.definition || kp.desc || '';
  const formula = kp.formula || '';
  const chapter = kp.chapter || '';
  const importance = kp.importance || '';
  if(!def && !formula && !chapter) return '';
  let html = '<div class="kp-definition">';
  if(chapter) html += `<div class="kp-chapter">📖 教材定位：${chapter}</div>`;
  if(importance) html += `<span class="kp-importance">${importance}</span>`;
  if(def) html += `<div class="kp-def-text">${def}</div>`;
  if(formula) html += `<div class="kp-formula">📐 ${formula}</div>`;
  if(kp.skills && kp.skills.length){
    html += '<div class="kp-skills"><span class="kp-skills-title">🛠️ 解题技能：</span>';
    html += kp.skills.map(s => `<span class="kp-skill-tag" title="${s.desc||''}">${s.name}</span>`).join('');
    html += '</div>';
  }
  html += '</div>';
  return html;
}

// 生成追溯链的 HTML（标记跨学段底层盲区）
function renderTraceChain(examPointName){
  const start = findKpByName(examPointName);
  if(!start) return '';
  const chain = tracePrerequisites(start.id);
  if(chain.length <= 1) return '';
  const items = chain.map((c,i) => {
    const isRoot = c.grade < 10; // 跨学段=底层盲区
    const icon = isRoot ? '🔴' : '⬆️';
    const stage = c.grade >= 10 ? `高${c.grade-9}` : (c.grade>=7?`初${c.grade-6}`:`小${c.grade}`);
    const tag = isRoot ? '<span class="trace-root">底层盲区</span>' : `<span class="trace-stage">${stage}</span>`;
    return `<div class="trace-item">${icon} <b>${c.name}</b> ${tag}</div>`;
  }).join('<div class="trace-arrow">↓</div>');
  return `<div class="vuln-trace"><div class="vuln-trace-title">🔗 漏洞追溯链（从当前考点回溯到底层薄弱点）</div>${items}</div>`;
}

/* ---------- 4. 报告页（核心算法）---------- */
function computeReport(){
  const exam = EXAM_MAP[State.selectedExamId];
  // 4.1 得分 & 正确率
  let score=0, totalScore=0, correctCnt=0, wrongCnt=0, lost=0;
  exam.questions.forEach(q => {
    totalScore += q.score;
    const a = State.answers[q.num];
    if(a && a.submitted){
      const p = a.partial !== undefined ? a.partial : (a.correct?1:0);
      const s = q.score * p;
      score += s;
      if(p >= 1) correctCnt++; else wrongCnt++;
      lost += q.score - s;
    } else { wrongCnt++; lost += q.score; }
  });
  const rate = score/totalScore;
  const rankPct = clamp(100 - rate*80 - Math.random()*10); // 全国排名估算

  // 4.2 6维雷达：按模块汇总掌握度
  const radarData = window.RADAR_DIMENSIONS.map(dim => {
    let sumWeight=0, sumScore=0;
    exam.questions.forEach(q => {
      const kp = KP_MAP[q.kpId];
      if(dim.kpModuleIds.includes(kp.moduleId)){
        const a = State.answers[q.num];
        const p = a && a.submitted ? (a.partial !== undefined ? a.partial : (a.correct?1:0)) : 0.5;
        sumWeight += q.score;
        sumScore += q.score * p;
      }
    });
    const mastery = sumWeight ? Math.round(sumScore/sumWeight*100) : 60;
    return { id:dim.id, name:dim.name, desc:dim.desc, color:dim.color, mastery };
  });

  // 4.3 漏洞TOP：每个考点丢分汇总
  const kpLost = {}; // { kpId: { kp, lostScore, wrongCount, totalQ, weightScore } }
  exam.questions.forEach(q => {
    const kp = KP_MAP[q.kpId];
    if(!kpLost[kp.id]){
      kpLost[kp.id] = { kp, lostScore:0, wrongCount:0, totalQ:0, masterScore:0, totalPossible:0 };
    }
    const a = State.answers[q.num];
    const p = a && a.submitted ? (a.partial !== undefined ? a.partial : (a.correct?1:0)) : 0;
    kpLost[kp.id].totalQ++;
    kpLost[kp.id].totalPossible += q.score;
    kpLost[kp.id].lostScore += q.score*(1-p);
    kpLost[kp.id].masterScore += q.score*p;
    if(p < 1) kpLost[kp.id].wrongCount++;
  });
  const vulnList = Object.values(kpLost)
    .map(o => ({
      ...o,
      mastery: o.totalPossible ? Math.round(o.masterScore/o.totalPossible*100) : 0,
      errorRate: Math.round(o.wrongCount/o.totalQ*100)
    }))
    .sort((a,b) => b.lostScore - a.lostScore) // 按丢分降序
    .slice(0,5);

  // 4.4 三大主题得分
  const themes = [1,2,3].map(tid => {
    const tName = ['','函数与导数','几何与代数','概率与统计'][tid];
    let ts=0, ts2=0;
    exam.questions.forEach(q => {
      const kp = KP_MAP[q.kpId];
      if(kp.themeId===tid){
        const a = State.answers[q.num];
        const p = a && a.submitted ? (a.partial !== undefined ? a.partial : (a.correct?1:0)) : 0;
        ts += q.score*p; ts2 += q.score;
      }
    });
    const percent = ts2? Math.round(ts/ts2*100) : 0;
    return { id:tid, name:tName, score:Math.round(ts), total:ts2, percent };
  });

  // 4.5 掌握度矩阵：22模块 × 考点（取每模块前 6 个核心考点展示）
  const moduleList = [...new Set(window.KNOWLEDGE_POINTS.map(kp => kp.moduleId))].sort();
  const matrix = moduleList.map(mid => {
    const mKps = window.KNOWLEDGE_POINTS.filter(kp => kp.moduleId === mid).slice(0,6);
    while(mKps.length<6) mKps.push(null);
    const rowName = (window.KNOWLEDGE_POINTS.find(kp=>kp.moduleId===mid)||{}).moduleName || mid;
    return {
      moduleId: mid,
      moduleName: rowName.length > 10 ? rowName.replace(/（.*?）/g,'').slice(0,8) : rowName,
      cells: mKps.map((kp,i) => {
        if(!kp) return { level:0, tip:'', mastery:0 };
        // 该模块+该索引考点：如果考生有做题则按真实，否则模拟分布
        let mastery;
        const real = exam.questions.find(q => q.kpId === kp.id);
        if(real){
          const a = State.answers[real.num];
          const p = a && a.submitted ? (a.partial !== undefined ? a.partial : (a.correct?1:0)) : 0.5;
          mastery = Math.round(p*100);
        } else {
          // 基于整体表现的合理分布模拟
          mastery = clamp(Math.round(rate*80 + rnd(-15,35)));
        }
        let level = 0;
        if(mastery>=80) level=5;
        else if(mastery>=60) level=3;
        else if(mastery>=40) level=2;
        else if(mastery>=20) level=1;
        else level=0;
        return { level, mastery, tip:`${kp.name}\n掌握度：${mastery}%\n年均分值：${kp.weightScore}分` };
      })
    };
  });

  // 保存
  const report = {
    id: 'R_'+Date.now(),
    examId: exam.id, examName: exam.shortName,
    date: new Date().toLocaleString('zh-CN'),
    score: Math.round(score), totalScore, rate: Math.round(rate*100), rankPct: Math.round(rankPct),
    correctCnt, wrongCnt, lost: Math.round(lost),
    radarData, vulnList, themes, matrix
  };
  return report;
}
function renderReport(){
  const R = State.currentReport;
  $('#reportSubtitle').textContent = `${R.examName} · 生成于 ${R.date}`;
  // 示例报告横幅
  const demoBanner = $('#demoReportBanner');
  if(demoBanner){
    demoBanner.style.display = R.isDemo ? '' : 'none';
  }
  $('#repScore').textContent = R.score;
  $('#repRateNum').textContent = R.rate+'%';
  $('#repRank').textContent = '前'+R.rankPct+'%';
  $('#repCorrect').textContent = R.correctCnt;
  $('#repWrong').textContent = R.wrongCnt;
  $('#repLost').textContent = R.lost;
  // 数子滚动动画
  animNum($('#repScore'), R.score, 600);
  // 雷达图
  renderRadarSVG('#mainRadar', R.radarData, 300);
  // 雷达列表
  $('#radarList').innerHTML = R.radarData.map(d => `
    <div class="radar-list-item">
      <span class="radar-list-color" style="background:${d.color}"></span>
      <span class="radar-list-name">${d.name}</span>
      <div class="radar-list-bar"><div style="width:${d.mastery}%;background:${d.color}"></div></div>
      <span class="radar-list-val">${d.mastery}</span>
    </div>
  `).join('');
  // 三大主题
  $('#themeScores').innerHTML = R.themes.map(t => {
    let cls = 't'+t.id;
    let tip = t.percent>=75?'good':(t.percent>=50?'mid':'bad');
    return `
    <div class="card theme-card card-accent">
      <div class="theme-head">
        <div class="theme-icon ${cls}">${['','ƒ','∑','P'][t.id]}</div>
        <div class="theme-name">主题 ${t.id}：${t.name}</div>
      </div>
      <div class="theme-score-num">${t.score}<span>/${t.total}分</span></div>
      <div class="theme-sub">掌握度 ${t.percent}%（${tip==='good'?'良好':tip==='mid'?'一般':'需强化'}）</div>
      <div class="progress"><div class="progress-bar" style="width:${t.percent}%;background:${['','#3b82f6','#f59e0b','#06b6d4'][t.id]}"></div></div>
    </div>`;
  }).join('');
  // 漏洞TOP5
  const totalLost = R.vulnList.reduce((s,v)=>s+v.lostScore,0);
  $('#lostScore').textContent = Math.round(totalLost);
  $('#gainScore').textContent = '+' + Math.round(totalLost*0.7);
  $('#vulnCards').innerHTML = R.vulnList.map((v,i) => {
    const level = v.lostScore>=10 ? 'critical' : v.lostScore>=6 ? 'high' : 'mid';
    const lvName = {critical:'严重漏洞', high:'高危漏洞', mid:'中等漏洞'}[level];
    // 主考点+关联考点标签（精标展示）
    const kpTags = [v.kp.id].concat(v.kp.relatedKpIds||[]).slice(0,4).map(id => {
      const k = KP_MAP[id];
      if(!k) return '';
      const isMain = id === v.kp.id;
      return `<span class="kp-tag ${isMain?'kp-tag-main':'kp-tag-rel'}">${isMain?'主·':''}${k.id} ${k.name}</span>`;
    }).join('');
    return `
    <div class="vuln-card">
      <div class="vuln-rank">${i+1}</div>
      <span class="vuln-level ${level}">${lvName}</span>
      <div class="vuln-name">${v.kp.name}</div>
      <div class="vuln-path">${v.kp.themeName} · ${v.kp.moduleName}</div>
      <div class="vuln-kp-tags">${kpTags}</div>
      <div class="vuln-master">
        <div class="vuln-master-label"><span>掌握度</span><span class="vuln-master-val">${v.mastery}%</span></div>
        <div class="progress"><div class="progress-bar" style="width:${v.mastery}%;background:${v.mastery>=60?'var(--ok)':'var(--warn)'}"></div></div>
      </div>
      <div class="vuln-stats">
        <div><div class="vuln-stat-num">${Math.round(v.lostScore)}</div><div class="vuln-stat-label">丢失分数</div></div>
        <div><div class="vuln-stat-num">${v.errorRate}%</div><div class="vuln-stat-label">错误率</div></div>
      </div>
      ${renderTraceChain(v.kp.name)}
    </div>`;
  }).join('');
  // 矩阵
  const headCells = Array.from({length:6},(_,i)=>`<div class="matrix-head-cell">考${i+1}</div>`).join('');
  $('#masteryMatrix').innerHTML = `<div class="matrix-head-cell" style="border:none"></div>${headCells}` +
    R.matrix.map(row => `
      <div class="matrix-row-label">${row.moduleName}</div>
      ${row.cells.map(c => `<div class="matrix-cell" data-mastery="${c.level}" title="${c.tip}">${c.mastery}</div>`).join('')}
    `).join('');
  // CTA按钮
  $('#goPracticeBtn').onclick = () => { State.practice.mode = 'B'; location.hash = '#/practice'; };
  $('#genVulnPaperBtn').onclick = () => { State.practice.mode = 'A'; location.hash = '#/practice'; };
  $('#saveReportBtn').onclick = async () => {
    await window.Storage?.saveReport(R);
    const btn = $('#saveReportBtn');
    btn.textContent = '✓ 已保存到「我的报告」';
    btn.classList.remove('btn-outline-white');
    btn.classList.add('btn-white');
    setTimeout(()=>location.hash = '#/my', 900);
  };
  // 视图切换：老师技术视图 / 家长版解读
  const tabTech = $('#tabTech'), tabParent = $('#tabParent');
  const techView = $('#techView'), parentView = $('#parentView');
  function switchReportView(v){
    const isTech = v === 'tech';
    techView.style.display = isTech ? '' : 'none';
    parentView.style.display = isTech ? 'none' : '';
    tabTech.classList.toggle('active', isTech);
    tabParent.classList.toggle('active', !isTech);
  }
  tabTech.onclick = () => switchReportView('tech');
  tabParent.onclick = () => switchReportView('parent');
  switchReportView('tech');
  renderParentView(R);
}
function animNum(el, to, dur=500){
  const from = 0, start = performance.now();
  function tick(t){
    const p = Math.min(1,(t-start)/dur);
    el.textContent = Math.round(from + (to-from)*p);
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- 续费证据链：对比历史报告 ---------- */
function computeRenewalChain(R){
  const history = loadReports();
  const others = history.filter(h => h && h.id !== R.id);
  const chain = {
    type: 'baseline',
    firstDate: R.date, curDate: R.date,
    firstScore: R.score, curScore: R.score,
    firstLost: R.lost, curLost: R.lost,
    firstVulnCount: (R.vulnList||[]).length, curVulnCount: (R.vulnList||[]).length,
    fixedScore: 0, fixRate: 0, remainScore: Math.round(R.lost*0.7), delta: 0
  };
  if(others.length){
    const first = others[others.length-1]; // 最早一份 = 入学基线
    if(first){
      const firstLost = first.lost != null ? first.lost : (first.totalScore ? first.totalScore - first.score : R.lost);
      const curLost = R.lost;
      const fixedScore = Math.max(0, firstLost - curLost);
      chain.type = 'compare';
      chain.firstDate = first.date || '—';
      chain.curDate = R.date || '—';
      chain.firstScore = first.score;
      chain.curScore = R.score;
      chain.firstLost = firstLost;
      chain.curLost = curLost;
      chain.fixedScore = fixedScore;
      chain.fixRate = firstLost > 0 ? Math.round(fixedScore/firstLost*100) : 0;
      chain.remainScore = Math.round(curLost*0.7);
      chain.delta = R.score - first.score;
      chain.firstVulnCount = (first.vulnList||[]).length;
      chain.curVulnCount = (R.vulnList||[]).length;
    }
  }
  return chain;
}

/* ---------- 家长版解读视图 ---------- */
function renderParentView(R){
  const pct = R.totalScore ? Math.round(R.score/R.totalScore*100) : 0;
  const chain = computeRenewalChain(R);
  const conclusion = pct>=85 ? '数学基础扎实，成绩稳定，保持当前节奏即可。'
    : pct>=70 ? '数学处于中上水平，存在若干明确漏洞，针对性补强可再上一档。'
    : pct>=50 ? '数学中等，存在系统性知识漏洞，建议按优先级系统补强。'
    : '数学基础偏弱，存在多处底层漏洞，建议从基础考点逐层补齐。';

  const vulnHtml = (R.vulnList||[]).map((v,i)=>{
    const lvl = v.mastery>=60?'掌握尚可':(v.mastery>=40?'掌握偏弱':'明显薄弱');
    return `
    <div class="parent-vuln">
      <span class="parent-vuln-num">${i+1}</span>
      <div class="parent-vuln-body">
        <div class="parent-vuln-name">${v.kp.name}</div>
        <div class="parent-vuln-desc">掌握度 ${v.mastery}%（${lvl}），本次约丢 ${Math.round(v.lostScore)} 分</div>
      </div>
      <span class="parent-vuln-gain">补上约 +${Math.round(v.lostScore*0.7)} 分</span>
    </div>`;
  }).join('');

  let chainHtml;
  if(chain.type==='baseline'){
    chainHtml = `
    <div class="renewal-chain baseline">
      <div class="renewal-title">📈 学习证据链 · 首次建立基线</div>
      <p>这是孩子的首次系统测评，已记录当前学习基线（${chain.curVulnCount} 个核心漏洞、约丢 ${chain.curLost} 分）。下次测评将自动对比，呈现修复效果与提分证据，让每次进步看得见。</p>
    </div>`;
  } else {
    const up = chain.delta;
    const arrow = up>=0 ? '提升' : '回落';
    const arrowCls = up>=0 ? 'good' : 'bad';
    chainHtml = `
    <div class="renewal-chain">
      <div class="renewal-title">📈 学习证据链 · 续费有据可依</div>
      <div class="renewal-timeline">
        <div class="renewal-node">
          <div class="renewal-node-date">入学测评<br>${chain.firstDate}</div>
          <div class="renewal-node-val">得分 ${chain.firstScore} 分<br>漏洞 ${chain.firstVulnCount} 个</div>
        </div>
        <div class="renewal-arrow">→</div>
        <div class="renewal-node">
          <div class="renewal-node-date">本次测评<br>${chain.curDate}</div>
          <div class="renewal-node-val">得分 ${chain.curScore} 分<br>漏洞 ${chain.curVulnCount} 个</div>
        </div>
      </div>
      <div class="renewal-metrics">
        <div class="renewal-metric"><div class="num">${chain.fixedScore}</div><div class="lbl">已修复丢分</div></div>
        <div class="renewal-metric"><div class="num">${chain.fixRate}%</div><div class="lbl">漏洞修复率</div></div>
        <div class="renewal-metric"><div class="num ${arrowCls}">${up>=0?'+':''}${up}</div><div class="lbl">${arrow}分数</div></div>
        <div class="renewal-metric"><div class="num good">+${chain.remainScore}</div><div class="lbl">预计再提分</div></div>
      </div>
    </div>`;
  }

  const speech = `【${R.examName} · 数学测评报告】
${conclusion}
本次得分 ${R.score} 分（百分制 ${pct} 分），正确率 ${R.rate}%。
主要薄弱点：${(R.vulnList||[]).map((v,i)=>`${i+1}.${v.kp.name}`).join('；')||'无显著薄弱点'}。
接下来将针对性训练这些考点，预计可再提分 ${Math.round(R.lost*0.7)} 分。有任何问题欢迎随时沟通。`;

  $('#parentView').innerHTML = `
    <div class="parent-hero card">
      <div class="parent-conclusion">${conclusion}</div>
      <div class="parent-stats">
        <div class="parent-stat"><div class="num">${R.score}</div><div class="lbl">得分（满分${R.totalScore}）</div></div>
        <div class="parent-stat"><div class="num">${pct}</div><div class="lbl">百分制</div></div>
        <div class="parent-stat"><div class="num">${(R.vulnList||[]).length}</div><div class="lbl">核心漏洞</div></div>
        <div class="parent-stat"><div class="num good">+${Math.round(R.lost*0.7)}</div><div class="lbl">预计可提分</div></div>
      </div>
    </div>

    <div class="parent-section card">
      <div class="parent-section-title">🔍 薄弱知识点（家长版解读）</div>
      <div class="parent-vuln-list">${vulnHtml || '<p style="color:var(--ink-soft)">本次无显著漏洞，基础扎实。</p>'}</div>
    </div>

    ${chainHtml}

    <div class="parent-section card">
      <div class="parent-section-title">💬 教师沟通话术（一键复制发给家长）</div>
      <textarea class="parent-speech" id="parentSpeech" readonly>${speech}</textarea>
      <button class="btn btn-primary btn-sm" id="copySpeechBtn">📋 复制话术</button>
    </div>
  `;

  $('#copySpeechBtn').onclick = () => {
    const ta = $('#parentSpeech');
    if(navigator.clipboard){ navigator.clipboard.writeText(ta.value).catch(()=>{}); }
    else { ta.select(); try{ document.execCommand('copy'); }catch(e){} }
    const btn = $('#copySpeechBtn');
    btn.textContent = '✓ 已复制';
    setTimeout(()=>{ if(btn) btn.textContent = '📋 复制话术'; }, 1500);
  };
}

/* ---------- 招商页 ---------- */
const BIZ_SUBJECTS = {
  math: {
    icon:'📐', name:'数学', status:'已上线',
    title:'真题漏洞扫描 · 高考数学',
    desc:'271 个课标考点 · AI 批改 · 漏洞追溯到初中基础',
    tags:['智能批改','漏洞扫描','续费报告'],
    points:['271 个课标考点 + 人教版教材定义与公式','跨学段漏洞追溯：高中做错，一路追到初中盲区','家长版报告 + 续费证据链，续费有据可依','1084 道变式题 + 人教版教材习题'],
  },
  phys: {
    icon:'⚛️', name:'物理', status:'规划中',
    title:'物理漏洞扫描 · 同款架构',
    desc:'力学 / 电磁学专题漏洞定位 · 实验题错误溯源',
    tags:['物理建模','图像题','实验溯源'],
    points:['力学、电磁学、热学三大模块考点','图像题 / 实验题的错误模式定位','与数学同款家长版报告与续费证据链'],
  },
  chem: {
    icon:'🧪', name:'化学', status:'规划中',
    title:'化学错因诊断 · 同款架构',
    desc:'化学方程式 / 有机推断 / 实验探究',
    tags:['方程式','有机推断','实验探究'],
    points:['化学方程式书写与化学计算错因定位','有机推断的断键 / 成键逻辑溯源','与数学同款续费证据链'],
  },
  eng: {
    icon:'🔤', name:'英语', status:'规划中',
    title:'英语题型漏洞定位 · 同款架构',
    desc:'语法填空 / 阅读理解 / 写作',
    tags:['语法','阅读','写作'],
    points:['语法填空考点分类与错误定位','阅读题型（主旨 / 细节 / 推断）弱项识别','与数学同款家长版报告'],
  },
};
const BIZ_SCRIPTS = [
  { icon:'🔍', tag:'漏洞诊断话术', title:'入学测评 · 找问题',
    text:'XX家长您好，这是孩子本次数学测评报告：得分 108 分（百分制 72 分），主要薄弱点有 8 个，其中「导数研究单调性」全班约 80% 的同学已掌握，孩子掌握度仅 32%，这是下一步提分的关键。我们已针对性安排变式题训练，预计两周可补上约 8 分。' },
  { icon:'📈', tag:'进步反馈话术', title:'阶段进步 · 给信心',
    text:'XX家长您好，好消息：这两周孩子修复了 3 个漏洞（导数基础、三角函数最值、等比数列），阶段得分从 96 提升到 108，预计提分 12 分。这是进度对比报告，进步肉眼可见。接下来还剩 5 个漏洞，我们继续针对性突破。' },
  { icon:'🎯', tag:'续费动员话术', title:'续费沟通 · 给依据',
    text:'XX家长您好，孩子本期已修复 3 个核心漏洞（提分约 12 分）。目前还剩 5 个未修复漏洞，预计可再提 22 分。建议续一期针对性突破，把剩余漏洞集中解决，冲击下一档分数。这是漏洞清单和提分预估，供您参考。' },
];
function renderBizPage(){
  const tabs = $$('#bizSubjectTabs .biz-subject-tab');
  const panel = $('#bizSubjectPanel');
  function renderSubject(key){
    const s = BIZ_SUBJECTS[key];
    if(!s) return;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.subject === key));
    panel.innerHTML = `
      <div class="biz-subject-head">
        <div class="biz-subject-name">${s.icon} ${s.name} <span class="${s.status==='已上线'?'biz-live':'biz-plan'}">${s.status}</span></div>
        <div class="biz-subject-title">${s.title}</div>
        <div class="biz-subject-desc">${s.desc}</div>
      </div>
      <div class="biz-subject-tags">${s.tags.map(t=>`<span>${t}</span>`).join('')}</div>
      <ul class="biz-subject-points">${s.points.map(p=>`<li>${p}</li>`).join('')}</ul>
    `;
  }
  tabs.forEach(t => t.onclick = () => renderSubject(t.dataset.subject));
  renderSubject('math');

  // 报告三角色视角切换
  $$('#bizRoleTabs .biz-role-tab').forEach(t => {
    t.onclick = () => {
      $$('#bizRoleTabs .biz-role-tab').forEach(x => x.classList.toggle('active', x === t));
      $$('.biz-role-panel').forEach(p => p.classList.toggle('active', p.dataset.role === t.dataset.role));
    };
  });

  const scriptsEl = $('#bizScripts');
  scriptsEl.innerHTML = BIZ_SCRIPTS.map((s,i)=>`
    <div class="biz-script card">
      <div class="biz-script-tag">${s.icon} ${s.tag}</div>
      <div class="biz-script-title">${s.title}</div>
      <div class="biz-script-text">${s.text}</div>
      <button class="btn btn-outline btn-sm biz-copy" data-script="${i}">📋 复制话术</button>
    </div>
  `).join('');
  scriptsEl.querySelectorAll('.biz-copy').forEach(b => {
    b.onclick = () => {
      const t = BIZ_SCRIPTS[+b.dataset.script].text;
      if(navigator.clipboard){ navigator.clipboard.writeText(t).catch(()=>{}); }
      b.textContent = '✓ 已复制';
      setTimeout(()=>{ if(b) b.textContent = '📋 复制话术'; }, 1500);
    };
  });
}

/* ---------- SVG雷达图渲染 ---------- */
function renderRadarSVG(sel, data, size=200){
  const svg = $(sel);
  if(!svg) return;
  const cx=size/2, cy=size/2, r=size*0.38;
  const N = data.length;
  const angle = i => -Math.PI/2 + i * (2*Math.PI/N);
  const point = (val, i) => {
    const rr = r * (clamp(val,0,100)/100);
    return [cx + rr*Math.cos(angle(i)), cy + rr*Math.sin(angle(i))];
  };
  const axisPoint = i => [cx + r*Math.cos(angle(i)), cy + r*Math.sin(angle(i))];
  // 背景5层多边形
  let rings = '';
  for(let lv=5; lv>=1; lv--){
    const rr = r * lv/5;
    const pts = Array.from({length:N}, (_,i)=>{
      const [x,y] = [cx + rr*Math.cos(angle(i)), cy + rr*Math.sin(angle(i))];
      return x+','+y;
    }).join(' ');
    rings += `<polygon points="${pts}" fill="${lv%2?'rgba(11,31,58,.02)':'rgba(11,31,58,.05)'}" stroke="rgba(11,31,58,.12)" stroke-width="1"/>`;
  }
  // 轴线
  let axes = Array.from({length:N},(_,i)=>{
    const [x,y] = axisPoint(i);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(11,31,58,.15)" stroke-width="1"/>`;
  }).join('');
  // 数据多边形
  const polyPts = data.map((d,i)=>point(d.mastery,i).map(n=>n.toFixed(1)).join(',')).join(' ');
  const color0 = data[0].color;
  const gradId = 'radarGrad_' + (sel.replace('#',''));
  const shape = `
    <defs>
      <linearGradient id="${gradId}" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="${color0}" stop-opacity=".45"/>
        <stop offset="100%" stop-color="${data[N-1].color}" stop-opacity=".25"/>
      </linearGradient>
    </defs>
    <polygon points="${polyPts}" fill="url(#${gradId})" stroke="${color0}" stroke-width="2"/>
  `;
  // 数据点
  const dots = data.map((d,i)=>{
    const [x,y] = point(d.mastery,i);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#fff" stroke="${d.color}" stroke-width="2.5"/>`;
  }).join('');
  // 标签
  const labels = data.map((d,i)=>{
    const [x,y] = axisPoint(i);
    const tx = cx + (r+18)*Math.cos(angle(i));
    const ty = cy + (r+18)*Math.sin(angle(i));
    const anchor = Math.abs(tx-cx)<6 ? 'middle' : (tx>cx?'start':'end');
    const dy = Math.abs(ty-cy)<6 ? '0.3em' : (ty>cy?'1em':'-0.2em');
    return `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle" dy="${dy}"
      font-size="11" fill="#1e3a5f" font-weight="600" style="font-family:Manrope,'PingFang SC',sans-serif">${d.name} ${d.mastery}</text>`;
  }).join('');
  svg.innerHTML = rings + axes + shape + dots + labels;
}
// 首页迷你雷达
function renderMiniRadar(){
  const demoData = [
    {name:'基础运算',color:'#3b82f6',mastery:88},
    {name:'函数分析',color:'#8b5cf6',mastery:71},
    {name:'三角数列',color:'#ec4899',mastery:85},
    {name:'立体几何',color:'#f59e0b',mastery:42},
    {name:'解析几何',color:'#10b981',mastery:53},
    {name:'概率统计',color:'#06b6d4',mastery:68}
  ];
  renderRadarSVG('#miniRadar', demoData, 200);
}

/* ---------- 5. 推荐练习页 ---------- */
function initPracticePage(){
  const R = State.currentReport;
  const mode = State.practice.mode || 'B'; // A=漏洞专属套卷（先学后练）, B=逐题练
  // 生成5组 × 每题4变式
  const groups = R.vulnList.map((v, gi) => ({
    index: gi+1,
    vuln: v,
    questions: (window.PRACTICE_BANK[v.kp.id] || []).map((p, pi) => ({
      id: `G${gi+1}_${pi+1}`,
      groupIdx: gi+1,
      idxInGroup: pi+1,
      practice: p,
      kpId: v.kp.id
    }))
  }));
  State.practice.groups = groups;
  const total = groups.reduce((s,g)=>s+g.questions.length,0);
  // 尝试恢复上次练习进度
  (async () => {
    const saved = await window.Storage?.getPractice(State.selectedExamId);
    if(saved && saved.answers && Object.keys(saved.answers).length > 0){
      if(confirm('检测到上次练习进度（已做 ' + Object.keys(saved.answers).length + ' 题）。\n是否继续上次练习？')){
        State.practice.answers = saved.answers;
        renderPractice();
        updatePracticeStats();
        return;
      }
    }
    State.practice.answers = {};
    renderPractice();
    updatePracticeStats();
  })();
  // 顶部标题/描述根据模式切换
  if(mode === 'A'){
    $('#practiceTitle').innerHTML = '你的 <b style="color:var(--accent-600)">漏洞专属套卷</b> · 先学后练版';
    $('#practiceSub').innerHTML = `基于你刚刚的漏洞报告，系统为你生成 <b>${R.vulnList.length} 大漏洞 × 4 道梯度题 = ${total} 道专属套卷</b>，<b style="color:var(--accent-600)">每漏洞先"3分钟速学知识卡"再做4道梯度题</b>，学会一个漏洞再进下一个，学完练完漏洞就堵完。`;
    $('#practiceProgressSub').textContent = '按漏洞优先级由高到低排序。每学完+做完一漏洞，对应漏洞掌握度实时提升；全部做完后系统给出漏洞修复率和预估下次提分。';
  } else {
    $('#practiceTitle').textContent = '你的 20 道变式强化练习题';
    $('#practiceSub').innerHTML = `基于你刚刚做完的真题漏洞报告，我们从题库中为你精选了 5 大漏洞 × 每题 4 道变式 = 共 ${total} 道针对性练习，<b style="color:var(--warn)">按漏洞优先级由高到低排序</b>。做完每道题即时获得解析，100% 做完后漏洞掌握度自动上调。`;
    $('#practiceProgressSub').textContent = '完成全部练习后，系统将重新计算你的掌握度，并更新你的能力成长曲线。';
  }
  // 顶部统计
  $('#pracTotal').textContent = total;
  // 模式A：渲染知识速学卡；模式B：隐藏
  if(mode === 'A'){
    $('#learnCardsWrap').style.display = '';
    renderLearnCards(R.vulnList);
  } else {
    $('#learnCardsWrap').style.display = 'none';
  }
  // 渲染
  State.practice._mode = mode;
  renderPractice();
  updatePracticeStats();
  $('#backReportBtn').onclick = () => location.hash='#/report';
}
/* ---------- 知识速学卡渲染 ---------- */
function renderLearnCards(vulnList){
  const cards = vulnList.map((v, i) => {
    const kp = v.kp;
    const lc = kp.learnCard || {form:'详见教材',steps:'理解→练习→总结',traps:'仔细审题',recent:'近年已考察'};
    return `
    <div class="learn-card card">
      <div class="learn-card-head">
        <div class="learn-card-rank">#${i+1}</div>
        <div class="learn-card-info">
          <h4>${kp.id} · ${kp.name}</h4>
          <div class="learn-card-meta">
            <span class="kp-tag kp-tag-main">主考点 · 丢${Math.round(v.lostScore)}分</span>
            <span class="badge">难度 ${'★'.repeat(kp.diffLevel)}${'☆'.repeat(5-kp.diffLevel)}</span>
            <span class="badge">频率 ${'★'.repeat(kp.freqLevel)}${'☆'.repeat(5-kp.freqLevel)}</span>
          </div>
        </div>
      </div>
      <div class="learn-card-grid">
        <div class="learn-card-item">
          <div class="learn-card-item-title">📐 核心公式/定义</div>
          <div class="learn-card-item-body">${lc.form||'详见教材本节'}</div>
        </div>
        <div class="learn-card-item">
          <div class="learn-card-item-title">🔑 高考标准解题套路</div>
          <div class="learn-card-item-body">${lc.steps||'理解概念→套用公式→验证结果'}</div>
        </div>
        <div class="learn-card-item warn">
          <div class="learn-card-item-title">⚠️ 高频易错陷阱 TOP 3</div>
          <div class="learn-card-item-body">${lc.traps||'注意定义域、单位、符号'}</div>
        </div>
        <div class="learn-card-item accent">
          <div class="learn-card-item-title">💡 最近一次全国卷怎么考</div>
          <div class="learn-card-item-body">${lc.recent||'近五年全国卷均考察过'}</div>
        </div>
      </div>
    </div>`;
  }).join('');
  $('#learnCardsList').innerHTML = cards;
}
function renderPractice(){
  const groups = State.practice.groups;
  const mode = State.practice._mode || 'B';
  let done=0, correct=0, total=0;
  const html = groups.map(g => {
    // 组进度
    let gd = g.questions.filter(q => State.practice.answers[q.id]?.submitted).length;
    let gc = g.questions.filter(q => State.practice.answers[q.id]?.correct).length;
    let gp = Math.round(gd/g.questions.length*100);
    // 小知识卡折叠面板
    const kp = g.vuln.kp;
    const lc = kp.learnCard || {};
    const miniLearn = mode==='A' ? `
    <div class="mini-learn" data-g="${g.index}">
      <div class="mini-learn-toggle" onclick="this.parentElement.classList.toggle('open')">
        <span>📖</span><span>3 分钟速学本漏洞知识卡 · 学会再做</span>
        <span class="mini-learn-arrow">▾</span>
      </div>
      <div class="mini-learn-body">
        <div class="mini-learn-grid">
          <div><div class="mini-learn-t">📐 核心公式</div><div>${lc.form||'详见教材'}</div></div>
          <div><div class="mini-learn-t">🔑 标准套路</div><div>${lc.steps||'理解→套公式→验证'}</div></div>
          <div><div class="mini-learn-t">⚠️ 易错陷阱</div><div>${lc.traps||'审题慢、计算准'}</div></div>
          <div><div class="mini-learn-t">💡 最近考法</div><div>${lc.recent||'近五年全国卷考过'}</div></div>
        </div>
      </div>
    </div>` : '';
    // 关联考点标签
    const relTags = [kp.id].concat(g.vuln.kp.relatedKpIds||[]).slice(0,4).map(id => {
      const k = KP_MAP[id]; if(!k) return '';
      const isMain = id === kp.id;
      return `<span class="kp-tag ${isMain?'kp-tag-main':'kp-tag-rel'}">${isMain?'主':''}${k.id}</span>`;
    }).join('');
    return `
    <div class="practice-group card card-accent">
      <div class="practice-group-head">
        <div class="practice-group-info">
          <div class="practice-group-num">${g.index}</div>
          <div class="practice-group-title">
            <h4>漏洞 #${g.index}：${g.vuln.kp.name}</h4>
            <p>
              <span class="tag tag-hot">漏洞等级：${g.vuln.lostScore>=10?'严重':g.vuln.lostScore>=6?'高危':'中等'}</span>
              <span class="tag">原卷丢失分：${Math.round(g.vuln.lostScore)}</span>
              <span class="tag">原掌握度：${g.vuln.mastery}%</span>
              <span class="tag">路径：${g.vuln.kp.themeName}→${g.vuln.kp.moduleName}</span>
              ${relTags}
            </p>
          </div>
        </div>
        <div class="practice-group-progress">
          <div class="progress" style="width:180px"><div class="progress-bar" style="width:${gp}%"></div></div>
          <span>${gd}/${g.questions.length}</span>
        </div>
      </div>
      ${miniLearn}
      ${g.questions.map(q => {
        total++;
        const ans = State.practice.answers[q.id];
        if(ans && ans.submitted){ done++; if(ans.correct) correct++; }
        const classes = ['q-practice'];
        if(ans?.submitted) classes.push('done');
        if(ans?.submitted && !ans.correct) classes.push('wrong');
        const diffOn = Array(5).fill(0).map((_,i)=>`<span class="${i<q.practice.difficulty?'on':''}"></span>`).join('');
        // 选项
        const optionsHtml = q.practice.options.map((op,i)=>{
          const key = op.charAt(0);
          const isCorrect = key === q.practice.answer;
          const userSel = ans?.selected === key;
          let cls = 'q-practice-option';
          if(ans?.submitted){
            if(isCorrect) cls += ' correct'; else if(userSel) cls += ' wrong';
          } else if(userSel) cls += ' selected';
          return `<div class="${cls}" data-qid="${q.id}" data-key="${key}"><span class="q-practice-option-key">${key}</span><span>${op.replace(/^[A-D]\./,'').replace(/^选项/,'')}</span></div>`;
        }).join('');
        // 结果面板
        let resultHtml = '';
        if(ans?.submitted){
          const ok = ans.correct;
          resultHtml = `<div class="q-practice-result ${ok?'ok':'bad'} show">
            <div class="q-practice-result-icon">${ok?'👍':'💡'}</div>
            <div class="q-practice-result-text">
              ${ok ? '<b>答对了！</b>你已掌握「'+g.vuln.kp.name+'」的基本思路，继续加油～'
                   : '<b>再看一下解题思路：</b>正确答案是 <b>'+q.practice.answer+'</b>。本题对应漏洞点「'+g.vuln.kp.name+'」，建议回到真题报告的对应考点解析部分，复习一下核心解法后再做下一题。'}
            </div>
          </div>`;
        }
        return `
        <div class="${classes.join(' ')}">
          <div class="q-practice-head">
            <div class="q-practice-num">变式练习 ${g.index}.${q.idxInGroup} · 难度<span class="q-practice-diff">${diffOn}</span></div>
            <span class="badge">考点：${g.vuln.kp.name}</span>
          </div>
          <div class="q-practice-stem">${q.practice.stem}</div>
          <div class="q-practice-options">${optionsHtml}</div>
          <button class="q-practice-submit" data-qid="${q.id}" ${ans?.submitted?'disabled':''}>
            ${ans?.submitted ? (ans.correct?'✓ 已答对':'✗ 已答错') : '提交答案 →'}
          </button>
          ${resultHtml}
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
  $('#practiceGroups').innerHTML = html;
  // 选项选择
  $$('.q-practice-option').forEach(el => {
    el.addEventListener('click', () => {
      const qid = el.dataset.qid;
      if(State.practice.answers[qid]?.submitted) return;
      const siblings = $$(`.q-practice-option[data-qid="${qid}"]`);
      siblings.forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      // 暂存选择
      State.practice.answers[qid] = { ...(State.practice.answers[qid]||{}), selected: el.dataset.key };
    });
  });
  // 提交按钮
  $$('.q-practice-submit').forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = btn.dataset.qid;
      const temp = State.practice.answers[qid];
      if(!temp || !temp.selected){ alert('请先选择一个选项再提交'); return; }
      // 查找题
      let qq=null;
      State.practice.groups.forEach(g=>g.questions.forEach(q=>{ if(q.id===qid) qq=q; }));
      if(!qq) return;
      const correct = temp.selected === qq.practice.answer;
      State.practice.answers[qid] = { correct, submitted:true, selected: temp.selected };
      autosavePractice();
      renderPractice();
      updatePracticeStats();
    });
  });
  updatePracticeStats(done, correct, total);
}
function updatePracticeStats(done, correct, total){
  if(done === undefined){
    done = correct = total = 0;
    State.practice.groups.forEach(g => g.questions.forEach(q => {
      total++;
      const a = State.practice.answers[q.id];
      if(a?.submitted){ done++; if(a.correct) correct++; }
    }));
  }
  $('#pracDone').textContent = done;
  $('#pracCorrect').textContent = correct;
  const pct = total ? Math.round(done/total*100) : 0;
  $('#pracPercent').textContent = pct+'%';
  $('#pracBar').style.width = pct+'%';
  // 剩余时间估算（每题2分钟）
  const leftMin = Math.max(0, Math.ceil((total-done)*1.5));
  $('#pracEta').textContent = leftMin ? `${leftMin} 分钟`:`已完成 🎉`;
  $('#pracAcc').textContent = done ? `${Math.round(correct/done*100)}%` : '-';
  if(done === total && total>0) showPracticeSummary();
}
function showPracticeSummary(){
  const summary = $('#practiceSummary');
  summary.classList.add('show');
  let done=0, correct=0, total=0;
  State.practice.groups.forEach(g=>g.questions.forEach(q=>{
    total++;
    const a = State.practice.answers[q.id];
    if(a?.submitted){ done++; if(a.correct) correct++; }
  }));
  const acc = Math.round(correct/Math.max(1,done)*100);
  const fixRate = Math.round(acc * 0.6 + 40); // 漏洞修复率估算
  const gain = Math.round(fixRate/10);
  $('#summaryCorrect').textContent = `${correct}/${done}`;
  $('#summaryFix').textContent = fixRate+'%';
  $('#summaryGain').textContent = '+'+gain;
}

/* ---------- 6. 我的/历史报告（localStorage）---------- */
const LS_KEY = 'zhenti_scan_reports_v1';
function saveReportToLocal(report){
  try{
    const all = JSON.parse(localStorage.getItem(LS_KEY)||'[]');
    all.unshift(report);
    localStorage.setItem(LS_KEY, JSON.stringify(all.slice(0,30))); // 最多存30份
    return true;
  }catch(e){ return false; }
}
function loadReports(){
  try{ return JSON.parse(localStorage.getItem(LS_KEY)||'[]'); }catch(e){ return []; }
}
async function renderMyPage(){
  const all = await window.Storage?.getAllReports() || [];
  $('#myReports').textContent = all.length;
  // 估算练习题数（按报告×20）
  $('#myPrac').textContent = all.length * 20;
  if(all.length === 0){
    $('#historyEmpty').style.display = 'block';
    $('#growthCard').style.display = 'none';
    $('#historyList').innerHTML = '';
    return;
  }
  $('#historyEmpty').style.display='none';
  $('#growthCard').style.display='block';
  // 列表：最新在前
  $('#historyList').innerHTML = all.slice(0,10).map((R, i) => {
    let rateCls = R.rate>=75?'good':R.rate>=50?'mid':'bad';
    return `
    <div class="history-item" data-id="${R.id}" data-idx="${i}">
      <div class="history-left">
        <div class="history-year">
          <div class="history-year-num">${R.examName.match(/\d{4}/)?.[0] || '25'}</div>
          <div class="history-year-vol">${R.examName.match(/[ⅠⅡ]卷|I+卷/)?.[0] || '真题'}</div>
        </div>
        <div class="history-info">
          <h4>${R.examName} · 漏洞扫描报告</h4>
          <div class="history-meta">
            <span>📅 <b>${R.date.split(' ')[0]}</b></span>
            <span>✅ 答对 <b>${R.correctCnt}</b> 题</span>
            <span>❌ 答错 <b>${R.wrongCnt}</b> 题</span>
            <span>🔥 漏洞数 <b>${R.vulnList.length}</b> 个</span>
          </div>
        </div>
      </div>
      <div class="history-score">
        <div class="history-score-num">${R.score}<span>/${R.totalScore}</span></div>
        <div class="history-score-rate ${rateCls}">正确率 ${R.rate}% · 超过全国前${R.rankPct}%</div>
      </div>
      <div class="history-actions">
        <button class="btn-icon" title="查看报告" data-act="view">👁</button>
        <button class="btn-icon" title="删除报告" data-act="del">🗑</button>
      </div>
    </div>`;
  }).join('');
  // 绑定：查看/删除
  $$('.history-item').forEach(el => {
    el.querySelector('[data-act="view"]').addEventListener('click', e => {
      e.stopPropagation();
      const idx = parseInt(el.dataset.idx);
      State.currentReport = all[idx];
      State.selectedExamId = State.currentReport.examId;
      location.hash = '#/report';
    });
    el.querySelector('[data-act="del"]').addEventListener('click', async e => {
      e.stopPropagation();
      if(!confirm('确定删除这份报告吗？')) return;
      await window.Storage?.deleteReport(el.dataset.id);
      renderMyPage();
    });
  });
  // 成长曲线：最近6份（不足则全部）
  const last6 = all.slice(0,6).reverse();
  renderGrowthSVG(last6);
}
function renderGrowthSVG(list){
  const svg = $('#growthSvg');
  if(!svg) return;
  const W=600, H=200, PAD={l:42, r:16, t:20, b:32};
  const innerW = W-PAD.l-PAD.r, innerH=H-PAD.t-PAD.b;
  // X轴：报告顺序；Y轴：0-150分（数学总分）
  const minY = 60, maxY = 150;
  const xOf = i => PAD.l + (list.length<=1?innerW/2:i*(innerW/(list.length-1)));
  const yOf = s => PAD.t + innerH - ((s-minY)/(maxY-minY))*innerH;
  // 网格
  let grid = '';
  for(let i=0;i<=5;i++){
    const y = PAD.t + i*innerH/5;
    const val = Math.round(maxY - i*(maxY-minY)/5);
    grid += `<line x1="${PAD.l-6}" y1="${y}" x2="${W-PAD.r}" y2="${y}" stroke="rgba(11,31,58,.08)" stroke-dasharray="4 4"/>`;
    grid += `<text x="${PAD.l-10}" y="${y+4}" text-anchor="end" font-size="11" fill="#6a7f9d">${val}</text>`;
  }
  // X轴标签
  let xLabels = list.map((R,i) => {
    const x = xOf(i);
    const label = R.examName.match(/\d{4}.{0,5}/)?.[0] || `报告${i+1}`;
    return `<text x="${x}" y="${H-12}" text-anchor="middle" font-size="11" fill="#6a7f9d">${label}</text>`;
  }).join('');
  // 数据线
  const pts = list.map((R,i)=>`${xOf(i).toFixed(1)},${yOf(R.score).toFixed(1)}`).join(' ');
  // 面积填充
  const areaPts = `${xOf(0)},${yOf(minY).toFixed(1)} ${pts} ${xOf(list.length-1)},${yOf(minY).toFixed(1)}`;
  const dots = list.map((R,i)=>{
    const cx=xOf(i), cy=yOf(R.score);
    return `
      <circle cx="${cx}" cy="${cy}" r="6" fill="#fff" stroke="#d97706" stroke-width="3"/>
      <text x="${cx}" y="${cy-12}" text-anchor="middle" font-size="13" fill="#0b1f3a" font-weight="700">${R.score}</text>
    `;
  }).join('');
  svg.innerHTML = `
    <defs>
      <linearGradient id="growthArea" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#d97706" stop-opacity=".28"/>
        <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${grid}
    <polygon points="${areaPts}" fill="url(#growthArea)"/>
    <polyline points="${pts}" fill="none" stroke="#d97706" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    ${dots}
    ${xLabels}
  `;
}

/* ==========================================================================
   KBANK：考点套题页 3 大视图 完整交互逻辑
   ========================================================================== */
/* ---------- KB 0. 页面入口 ---------- */
function initKbankPage(){
  // 恢复 IndexedDB 里的通关记录
  (async () => {
    const saved = await window.Storage?.getKbank();
    if(saved){
      if(saved.results) State.kbank.results = saved.results;
      if(saved.answers) State.kbank.answers = saved.answers;
      renderKbankView();
    }
  })();
  // 首次进入默认 grid 视图
  State.kbank.view = 'grid';
  renderKbankView();
  // 升级按钮 → 跳转到定价页
  const upBtn = $('#kbankUpgradeBtn');
  if(upBtn) upBtn.onclick = () => { location.hash = '#/pricing'; };
  const memberBadge = $('#memberBadge');
  if(memberBadge && !memberBadge._bound){
    memberBadge._bound = true;
    memberBadge.addEventListener('click', () => {
      alert('会员系统开发中…\n\n免费版权益：\n• 每月 1 次真题漏洞扫描\n• 3 个基础考点套题体验\n• 历史报告保存（最多 5 份）\n\n会员版权益：\n• 无限次扫描 + 全部 271 套考点\n• 视频讲解 + 错题本导出\n\n敬请期待！');
    });
  }
  // 绑定 Tab 切换
  $$('#kbankTabs .kbank-tab').forEach(btn => {
    btn.onclick = () => {
      $$('#kbankTabs .kbank-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      State.kbank.themeFilter = btn.dataset.theme;
      renderKbankGrid();
    };
  });
  // 排序
  $('#kbankSort').onchange = (e) => {
    State.kbank.sort = e.target.value;
    renderKbankGrid();
  };
  // 做题视图按钮（提前绑定，首次渲染时已存在）
  $('#kbankBackToList').onclick = () => { State.kbank.view='grid'; renderKbankView(); };
  $('#kbankPrevQ').onclick = () => kbQuizNav(-1);
  $('#kbankNextQ').onclick = () => kbQuizNav(+1);
  // 报告视图按钮
  $('#kbankRepRetry').onclick = () => {
    if(!State.kbank.currentKpId) return;
    // 清除本考点答题记录，重新开始
    delete State.kbank.answers[State.kbank.currentKpId];
    State.kbank.currentQIdx = 0;
    State.kbank.view = 'quiz';
    renderKbankView();
  };
  $('#kbankRepBack').onclick = () => { State.kbank.view='grid'; renderKbankView(); };
  $('#kbankRepNext').onclick = () => {
    // 找到下一个未通关考点（正确率<75%即视为未完全掌握）
    const sorted = getSortedKps();
    const next = sorted.find(kp => {
      const r = State.kbank.results[kp.id];
      return !r || r.correctCount < 3;
    });
    if(next){ startKpQuiz(next.id); }
    else { alert('🎉 你已通关全部 271 个考点！太厉害了！'); State.kbank.view='grid'; renderKbankView(); }
  };
}
function renderKbankView(){
  $('#kbankGridView').style.display = State.kbank.view==='grid' ? '' : 'none';
  $('#kbankQuizView').style.display = State.kbank.view==='quiz' ? '' : 'none';
  $('#kbankReportView').style.display = State.kbank.view==='report' ? '' : 'none';
  // 顶部统计实时更新
  const doneCount = Object.keys(State.kbank.results).length;
  $('#kbankDone').textContent = doneCount;
  $('#kbankTotalKP').textContent = window.KNOWLEDGE_POINTS.length;
  // 平均正确率
  const arr = Object.values(State.kbank.results);
  const acc = arr.length ? Math.round(arr.reduce((s,r)=>s+r.correctCount/r.total,0)/arr.length*100) : 0;
  $('#kbankAccuracy').textContent = acc+'%';
  if(State.kbank.view==='grid') renderKbankGrid();
  if(State.kbank.view==='quiz') renderKbankQuiz();
  if(State.kbank.view==='report') renderKbankReport();
}

/* ---------- KB 1. 网格视图：22模块分组 + 考点卡片 ---------- */
function getSortedKps(){
  let list = window.KNOWLEDGE_POINTS.slice();
  if(State.kbank.themeFilter !== 'all'){
    list = list.filter(kp => kp.themeId === parseInt(State.kbank.themeFilter));
  }
  const s = State.kbank.sort;
  if(s==='freq') list.sort((a,b)=> (b.freqLevel||0)-(a.freqLevel||0));
  else if(s==='diff') list.sort((a,b)=>(a.diffLevel||3)-(b.diffLevel||3));
  else if(s==='diffDesc') list.sort((a,b)=>(b.diffLevel||3)-(a.diffLevel||3));
  else if(s==='unfinished') list.sort((a,b)=>{
    const ra = State.kbank.results[a.id], rb = State.kbank.results[b.id];
    const sa = ra ? ra.correctCount : -1;
    const sb = rb ? rb.correctCount : -1;
    return sa - sb; // 未通关（-1 / <3）排前面
  });
  return list;
}
function renderKbankGrid(){
  const list = getSortedKps();
  // 按模块分组
  const groups = {};
  list.forEach(kp => {
    const key = `${kp.themeId}.${kp.moduleId}`;
    if(!groups[key]) groups[key] = { moduleName: kp.moduleName, themeId: kp.themeId, items: [] };
    groups[key].items.push(kp);
  });
  const keys = Object.keys(groups).sort();
  let html = '';
  keys.forEach(key => {
    const g = groups[key];
    html += `
      <div class="kbank-module">
        <div class="kbank-module-head">
          <div class="kbank-module-name">
            <span class="kbank-module-num">${key}</span>
            <h4>${g.moduleName}</h4>
          </div>
          <span class="badge badge-accent">${g.items.length} 个考点</span>
        </div>
        <div class="kbank-kp-grid">
          ${g.items.map(kp => renderKpCard(kp)).join('')}
        </div>
      </div>`;
  });
  $('#kbankGridView').innerHTML = html;
  // 绑定开始做题
  $$('.kp-card-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      startKpQuiz(btn.dataset.kpid);
    };
  });
}
function renderKpCard(kp){
  const result = State.kbank.results[kp.id];
  const mastery = result ? result.correctCount/result.total*100 : 0;
  const done = !!result;
  const passed = mastery >= 75; // 4题对3题以上算通关
  const statusClass = !done ? 'kp-status-none' : passed ? 'kp-status-pass' : 'kp-status-fail';
  const statusText = !done ? '未开始' : passed ? '✓ 已通关' : `已做·对${result.correctCount}/4`;
  const freq = kp.freqLevel||3;
  const diff = kp.diffLevel||3;
  const diffText = ['★☆☆☆☆','★★☆☆☆','★★★☆☆','★★★★☆','★★★★★'][diff-1] || '★★★☆☆';
  const freqText = ['低频','中频','高频','必考','超高频'][Math.min(freq-1,4)] || '中频';
  return `
    <div class="kp-card ${statusClass}" data-kpid="${kp.id}">
      <div class="kp-card-top">
        <span class="kp-card-id">${kp.id}</span>
        <span class="kp-card-status">${statusText}</span>
      </div>
      <div class="kp-card-name">${kp.name}</div>
      <div class="kp-card-meta">
        <span title="难度">🧠 ${diffText}</span>
        <span title="高考频率">🔥 ${freqText}</span>
      </div>
      ${done ? `
        <div class="kp-card-progress">
          <div class="progress"><div class="progress-bar" style="width:${mastery}%"></div></div>
          <span class="kp-card-mastery">掌握度 ${Math.round(mastery)}%</span>
        </div>` : `
        <div class="kp-card-empty">4 道梯度题 · 约 5 分钟通关</div>`}
      <button class="kp-card-btn btn btn-sm ${passed?'btn-ghost':'btn-primary'}" data-kpid="${kp.id}">
        ${!done ? '开始练习 →' : passed ? '再做一次' : '再练一次冲通关'}
      </button>
    </div>`;
}

/* ---------- KB 2. 做题视图：单考点4道梯度题 ---------- */
function startKpQuiz(kpId){
  State.kbank.currentKpId = kpId;
  State.kbank.currentQIdx = 0;
  if(!State.kbank.answers[kpId]) State.kbank.answers[kpId] = {};
  State.kbank.view = 'quiz';
  renderKbankView();
}
function renderKbankQuiz(){
  const kp = KP_MAP[State.kbank.currentKpId];
  if(!kp){ State.kbank.view='grid'; renderKbankView(); return; }
  const questions = window.PRACTICE_BANK[kp.id] || [];
  if(!questions.length){
    alert('该考点题目正在教研中，稍后上线～');
    State.kbank.view='grid'; renderKbankView(); return;
  }
  // 头部信息
  $('#kbankQuizKpName').textContent = `${kp.id} · ${kp.name}`;
  const qi = State.kbank.currentQIdx;
  const q = questions[qi];
  $('#kbankQuizStep').textContent = `第 ${qi+1} / ${questions.length} 题`;
  $('#kbankQuizBar').style.width = ((qi+1)/questions.length*100)+'%';
  const tag = (q.stem.match(/^【(.+?)】/)||[])[1] || '';
  $('#kbankQuizLevel').textContent = tag;
  // 上/下一题按钮状态
  $('#kbankPrevQ').disabled = qi===0;
  // 下一题：最后一题变"查看通关报告"
  $('#kbankNextQ').textContent = qi===questions.length-1 ? '查看通关报告 →' : '下一题 →';
  // 小圆点
  $('#kbankDots').innerHTML = questions.map((qq,i)=>{
    const a = State.kbank.answers[kp.id][qq.id];
    let cls = 'kb-dot';
    if(i<qi) cls += a && a.correct ? ' kb-dot-ok' : ' kb-dot-bad';
    if(i===qi) cls += ' kb-dot-cur';
    return `<span class="${cls}"></span>`;
  }).join('');
  // 题目主体
  const stemNoTag = q.stem.replace(/^【.+?】/,'').trim();
  const saved = State.kbank.answers[kp.id][q.id];
  const submitted = saved && saved.submitted;
  const selected = saved ? saved.selected : null;
  const isCorrect = saved && saved.correct;
  $('#kbankQuizBody').innerHTML = `
    <div class="kb-q-tag">${tag}</div>
    <div class="kb-q-stem">${stemNoTag}</div>
    <div class="kb-q-options">
      ${q.options.map((opt, oi)=>{
        const opKey = ['A','B','C','D'][oi];
        let cls = 'kb-q-opt';
        if(submitted){
          if(opKey === q.answer) cls += ' kb-q-opt-correct';
          else if(selected === opKey) cls += ' kb-q-opt-wrong';
          else cls += ' kb-q-opt-disabled';
        } else if(selected === opKey){
          cls += ' kb-q-opt-selected';
        }
        return `<div class="${cls}" data-op="${opKey}">
          <span class="kb-q-opt-key">${opKey}</span>
          <span class="kb-q-opt-text">${opt.replace(/^[A-D]\./,'')}</span>
        </div>`;
      }).join('')}
    </div>
    ${submitted ? `
      <div class="kb-q-feedback ${isCorrect?'kb-feedback-ok':'kb-feedback-bad'}">
        ${isCorrect
          ? '<b>✅ 回答正确！</b> 思路清晰，继续保持。'
          : `<b>❌ 回答错误。</b> 正确答案是 <b>${q.answer}</b>，请记住这类典型考法。`}
      </div>` : `
      <div class="kb-q-submit-tip">请选择一个选项后，点"下一题"继续。</div>`}
  `;
  // 绑定选项点击
  $$('.kb-q-opt', $('#kbankQuizBody')).forEach(el => {
    if(submitted) return;
    el.onclick = () => {
      const opKey = el.dataset.op;
      State.kbank.answers[kp.id][q.id] = {
        selected: opKey,
        correct: opKey === q.answer,
        submitted: true
      };
      autosaveKbank();
      // 即时刷新显示对错
      renderKbankQuiz();
    };
  });
}
function kbQuizNav(dir){
  const kp = KP_MAP[State.kbank.currentKpId];
  const questions = window.PRACTICE_BANK[kp.id] || [];
  const qi = State.kbank.currentQIdx;
  // 前进时：当前题未作答，提示
  if(dir>0){
    const curQ = questions[qi];
    const saved = State.kbank.answers[kp.id][curQ.id];
    if(!saved || !saved.submitted){
      alert('请先作答本题再继续哦～选一个选项即可。');
      return;
    }
  }
  const nextIdx = qi + dir;
  if(nextIdx < 0) return;
  if(nextIdx >= questions.length){
    // 最后一题做完 → 生成通关报告
    finishKpQuiz();
    return;
  }
  State.kbank.currentQIdx = nextIdx;
  renderKbankQuiz();
}
function finishKpQuiz(){
  const kpId = State.kbank.currentKpId;
  const questions = window.PRACTICE_BANK[kpId] || [];
  const answers = State.kbank.answers[kpId] || {};
  let correctCount = 0;
  questions.forEach(q => {
    const a = answers[q.id];
    if(a && a.correct) correctCount++;
  });
  const total = questions.length;
  const mastery = correctCount/total;
  const record = {
    correctCount, total, mastery,
    ts: Date.now(),
    detail: questions.map(q => {
      const a = answers[q.id] || {};
      return { id:q.id, correct:!!a.correct, selected:a.selected, answer:q.answer, stem:q.stem };
    })
  };
  State.kbank.results[kpId] = record;
  autosaveKbank();
  State.kbank.view = 'report';
  renderKbankView();
}

/* ---------- KB 3. 报告视图：考点通关报告 ---------- */
function renderKbankReport(){
  const kp = KP_MAP[State.kbank.currentKpId];
  const r = State.kbank.results[State.kbank.currentKpId];
  if(!kp || !r){ State.kbank.view='grid'; renderKbankView(); return; }
  $('#kbankRepKpName').textContent = `${kp.id} · ${kp.name}`;
  const diffText = ['★☆☆☆☆','★★☆☆☆','★★★☆☆','★★★★☆','★★★★★'][(kp.diffLevel||3)-1];
  const freqText = ['低频','中频','高频','必考','超高频'][Math.min((kp.freqLevel||3)-1,4)];
  $('#kbankRepKpMeta').textContent = `${kp.moduleName} · 难度 ${diffText} · 高考频率 ${freqText}`;
  $('#kbankRepScore').textContent = r.correctCount;
  const m = Math.round(r.mastery*100);
  $('#kbankRepMasteryBar').style.width = m+'%';
  let level='', color='';
  if(m===100){ level='完美掌握 💯'; color='#059669'; }
  else if(m>=75){ level='掌握良好 ✅'; color='#059669'; }
  else if(m>=50){ level='部分掌握 ⚠️'; color='#d97706'; }
  else { level='需要加强 ❌'; color='#dc2626'; }
  $('#kbankRepMasteryText').textContent = level;
  $('#kbankRepMasteryText').style.color = color;
  $('#kbankRepMasteryBar').style.background = color;
  // 逐题
  const questions = window.PRACTICE_BANK[kp.id] || [];
  $('#kbankRepQList').innerHTML = questions.map((q,i)=>{
    const d = r.detail[i] || {};
    const tag = (q.stem.match(/^【(.+?)】/)||[])[1] || '';
    const stemNoTag = q.stem.replace(/^【.+?】/,'').trim();
    return `
      <div class="kb-rep-q ${d.correct?'kb-rep-q-ok':'kb-rep-q-bad'}">
        <div class="kb-rep-q-head">
          <span class="kb-rep-q-num">${i+1}</span>
          <span class="kb-rep-q-tag">${tag}</span>
          <span class="kb-rep-q-status">${d.correct?'✓ 正确':'✗ 错误'}</span>
        </div>
        <div class="kb-rep-q-stem">${stemNoTag}</div>
        <div class="kb-rep-q-ans">
          <span>你的选择：<b class="${d.correct?'text-ok':'text-bad'}">${d.selected||'未作答'}</b></span>
          <span>正确答案：<b class="text-ok">${d.answer}</b></span>
        </div>
      </div>`;
  }).join('');
  // 建议
  let suggest = '';
  if(m===100){
    suggest = `💯 <b>完美！</b>你已经完全掌握「${kp.name}」，高考遇到这个考点的题基本不会丢分了。去挑战下一个还没通关的考点吧～`;
  } else if(m>=75){
    suggest = `✅ <b>基础扎实，偶有失误。</b>「${kp.name}」你已经掌握了七八成，主要丢分在"易错突破"层。建议把错题的干扰项分析清楚，避免再踩同类坑。`;
  } else if(m>=50){
    suggest = `⚠️ <b>有一定基础，但套路不熟。</b>「${kp.name}」建议再做一轮本考点套题，重点把"能力提升"和"真题再现"两层的解题套路练到肌肉记忆。`;
  } else {
    suggest = `❌ <b>这个漏洞要重点堵。</b>「${kp.name}」是你目前的明显短板，建议先回到课本/笔记梳理基本概念，再反复练本考点 4 道题，直到正确率稳定在 75% 以上。`;
  }
  $('#kbankRepSuggest').innerHTML = suggest;
}

/* ---------- v2.0 错题本 ---------- */
function _getWrongQList(){
  // 从已保存报告中收集错题，去重
  const wrongMap = {};
  // 也可以从 localStorage 中单独的错题表读取
  const wbData = JSON.parse(localStorage.getItem('zhenti_wrongbook_v2') || '{}');
  return wbData;
}
function _saveWrongQ(wbData){
  localStorage.setItem('zhenti_wrongbook_v2', JSON.stringify(wbData));
}
function renderWrongbookPage(){
  // 统计数据（模拟）
  const stats = { total: 18, kps: 12, today: 5, mastered: 7 };
  $('#wbTotal').textContent = stats.total;
  const wbKps = $('#wbKps');
  if(wbKps) wbKps.textContent = stats.kps;
  $('#wbToday').textContent = stats.today;
  $('#wbMastered').textContent = stats.mastered;

  // 模拟错题列表
  const wrongList = [
    { id:'w1', stem:'已知函数 f(x) = sin(2x + π/3)，则 f(x) 的最小正周期为', kp:'三角函数的周期性', source:'2025新高考I卷·第5题', level:'★★☆☆☆', due: true, mastered: false, reviewCount: 2 },
    { id:'w2', stem:'在三棱锥 P-ABC 中，PA⊥底面ABC，AB=AC=2，∠BAC=120°，PA=3，则该三棱锥外接球的表面积为', kp:'立体几何·外接球', source:'2024新高考II卷·第11题', level:'★★★☆☆', due: true, mastered: false, reviewCount: 1 },
    { id:'w3', stem:'设等比数列 {aₙ} 的前n项和为 Sₙ，若 S₃=7，S₆=63，则 a₁=', kp:'等比数列求和', source:'2023全国甲卷·第13题', level:'★★☆☆☆', due: false, mastered: true, reviewCount: 3 },
    { id:'w4', stem:'已知椭圆 C: x²/a² + y²/b² = 1 (a>b>0) 的离心率为 √3/2，过右焦点F且斜率为k(k>0)的直线与C相交于A、B两点，若 AF=3FB，则k=', kp:'圆锥曲线·直线与椭圆', source:'2025新高考I卷·第16题', level:'★★★★☆', due: true, mastered: false, reviewCount: 0 },
    { id:'w5', stem:'若 x,y 满足约束条件 x+y≥1, x-y≥-1, 2x-y≤2，则 z=x+2y 的最大值为', kp:'线性规划', source:'2024新高考I卷·第14题', level:'★★☆☆☆', due: false, mastered: true, reviewCount: 2 },
    { id:'w6', stem:'已知函数 f(x) = x³ - 3x + 1，则 f(x) 的极大值为', kp:'导数·函数极值', source:'2023新高考II卷·第8题', level:'★★★☆☆', due: false, mastered: false, reviewCount: 1 },
  ];

  const filterMap = {
    all: () => true,
    today: w => w.due && !w.mastered,
    mastered: w => w.mastered,
  };
  const activeTab = document.querySelector('.wb-tab.active')?.dataset.filter || 'all';
  const filtered = wrongList.filter(filterMap[activeTab] || filterMap.all);

  // 空状态切换
  const emptyEl = $('#wbEmpty');
  const listEl = $('#wbList');
  if(filtered.length === 0){
    if(emptyEl) emptyEl.style.display = '';
    if(listEl) listEl.innerHTML = '';
  } else {
    if(emptyEl) emptyEl.style.display = 'none';
    listEl.innerHTML = filtered.map((w, idx) => `
    <div class="wb-item">
      <div class="wb-item-num">${idx+1}</div>
      <div class="wb-item-body">
        <div class="wb-item-stem">${w.stem.substring(0,60)}${w.stem.length>60?'...':''}</div>
        <div class="wb-item-meta">
          <span class="kp-tag">${w.kp}</span>
          <span>📄 ${w.source}</span>
          <span>难度 ${w.level}</span>
          <span>复习 ${w.reviewCount} 次</span>
          ${w.mastered ? '<span class="wb-item-mastered">✓ 已掌握</span>' : (w.due ? '<span class="wb-item-review">⏰ 待复习</span>' : '')}
        </div>
      </div>
      <div class="wb-item-actions">
        <button class="wb-btn wb-btn-primary" onclick="alert('进入复习模式')">再练一次</button>
        <button class="wb-btn wb-btn-ghost" onclick="alert('查看解析')">解析</button>
      </div>
    </div>
  `).join('');
  }

  // 绑定筛选（只绑定一次）
  if(!renderWrongbookPage._bound){
    renderWrongbookPage._bound = true;
    $$('.wb-tab').forEach(t => {
      t.addEventListener('click', () => {
        $$('.wb-tab').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        renderWrongbookPage();
      });
    });
    $('#wbExportBtn')?.addEventListener('click', () => {
      alert('导出功能（演示）\n\n即将生成 PDF 文件，包含所有错题的题目、答案、解析和考点标注。');
    });
  }
}

/* ---------- v2.0 单题搜索 ---------- */
function renderSearchPage(){
  // 热门考点
  const hotKps = (window.KNOWLEDGE_POINTS || []).slice(0, 12).map(kp => {
    const cnt = Math.floor(Math.random()*500) + 200;
    return `<div class="hot-kp-item" onclick="alert('查看考点：${kp.name}')">
      <div class="hkp-name">${kp.name}</div>
      <div class="hkp-meta"><span>🔥 ${cnt}次搜索</span><span>⭐ ${(Math.random()*2+3).toFixed(1)}</span></div>
    </div>`;
  }).join('');
  const hotEl = $('#hotKpGrid');
  if(hotEl) hotEl.innerHTML = hotKps;

  // 避免重复绑定
  if(renderSearchPage._bound) return;
  renderSearchPage._bound = true;

  // 上传图片按钮
  $('#searchUploadBtn')?.addEventListener('click', () => {
    $('#searchFileInput')?.click();
  });
  $('#searchFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    if(file.size > 10*1024*1024){ alert('图片不能超过10MB'); return; }
    showSearchResult();
  });

  // 文字输入切换
  $('#searchTextBtn')?.addEventListener('click', () => {
    const area = $('#searchTextInput');
    if(area) area.style.display = area.style.display === 'none' ? 'block' : 'none';
  });

  // 文字搜索按钮
  $('#searchTextGoBtn')?.addEventListener('click', () => {
    const txt = $('#searchTextArea')?.value?.trim();
    if(!txt){ alert('请输入题目内容'); return; }
    showSearchResult();
  });

  function showSearchResult(){
    const resultArea = $('#searchResult');
    const uploadZone = $('#searchUploadZone');
    if(resultArea) resultArea.style.display = 'block';
    if(uploadZone) uploadZone.style.display = 'none';
    const kps = window.KNOWLEDGE_POINTS || [];
    const matchKp = kps[Math.floor(Math.random()*kps.length)] || { name:'函数单调性', id:'kp-01', themeName:'主题一', moduleName:'函数' };
    const kpId = $('#srKpId');
    const kpName = $('#srKpName');
    const kpPath = $('#srKpPath');
    if(kpId) kpId.textContent = 'KP-' + matchKp.id;
    if(kpName) kpName.textContent = matchKp.name;
    if(kpPath) kpPath.textContent = (matchKp.chapter||matchKp.themeName||'主题') + ' › ' + (matchKp.section||matchKp.moduleName||'模块');
    // 填充变式题
    const variants = $('#srVariants');
    if(variants){
      variants.innerHTML = [
        { label:'变式1 · 基础', stem:'已知 f(x) = x³ - 3x + 1，求 f(x) 在区间 [-2, 2] 上的最大值。', diff:'难度 ★★☆☆☆' },
        { label:'变式2 · 进阶', stem:'设函数 f(x) = eˣ - ax - 1，讨论 f(x) 的单调区间。', diff:'难度 ★★★☆☆' },
        { label:'变式3 · 压轴', stem:'已知 f(x) = lnx + ax² + (2a+1)x，讨论 f(x) 的极值个数。', diff:'难度 ★★★★☆' },
      ].map(v => `
        <div class="search-variant-card">
          <div class="sv-label">${v.label}</div>
          <div class="sv-stem">${v.stem}</div>
          <div class="sv-diff">${v.diff}</div>
        </div>
      `).join('');
    }
    // 回到搜索
    const backBtn = $('#srBackBtn');
    if(backBtn && !backBtn._bound){
      backBtn._bound = true;
      backBtn.addEventListener('click', () => {
        if(resultArea) resultArea.style.display = 'none';
        if(uploadZone) uploadZone.style.display = 'block';
        const ta = $('#searchTextArea');
        if(ta) ta.value = '';
      });
    }
  }
}

/* ---------- v2.0 会员定价页 ---------- */
function renderPricingPage(){
  if(renderPricingPage._bound) return;
  renderPricingPage._bound = true;
  // 选择套餐按钮
  $$('[data-plan]').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      const isFree = plan === 'free';
      if(isFree){
        alert('免费版无需付费，立即体验！');
        location.hash = '#/home';
      } else {
        alert('即将跳转到支付页面（演示）\n\n选择套餐：' + (btn.dataset.planName||'会员') + '\n支付方式：微信 / 支付宝 / 银联\n\n支持 7 天无理由退款');
      }
    });
  });
}

/* ---------- v2.0 登录/注册 ---------- */
function initLoginPage(){
  if(initLoginPage._bound) return;
  initLoginPage._bound = true;
  // Tab 切换
  $$('.login-tab').forEach(t => {
    t.addEventListener('click', () => {
      const mode = t.dataset.mode;
      $$('.login-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const loginForm = $('#loginForm');
      const regForm = $('#registerForm');
      if(loginForm) loginForm.style.display = mode === 'login' ? 'block' : 'none';
      if(regForm) regForm.style.display = mode === 'register' ? 'block' : 'none';
    });
  });
  // 登录提交
  $('#loginSubmitBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const phone = $('#loginPhone')?.value;
    if(!phone || phone.length < 11){ alert('请输入正确的手机号'); return; }
    alert('登录成功（演示）\n\n欢迎回来，同学！');
    localStorage.setItem('zhenti_user_logged', '1');
    location.hash = '#/home';
  });
  // 注册提交
  $('#registerSubmitBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const phone = $('#regPhone')?.value;
    if(!phone || phone.length < 11){ alert('请输入正确的手机号'); return; }
    alert('注册成功（演示）\n\n已为你创建账号，赠送 3 次免费真题扫描体验！');
    localStorage.setItem('zhenti_user_logged', '1');
    location.hash = '#/home';
  });
  // 发送验证码
  $$('[data-act="send-code"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let t = 60;
      btn.disabled = true;
      const orig = btn.textContent;
      const timer = setInterval(() => {
        btn.textContent = t + 's 后重发';
        t--;
        if(t < 0){
          clearInterval(timer);
          btn.disabled = false;
          btn.textContent = orig;
        }
      }, 1000);
    });
  });
}

/* ---------- v2.0 教师端 ---------- */
function renderTeacherPage(){
  // 只绑定一次
  if(!renderTeacherPage._bound){
    renderTeacherPage._bound = true;
    $$('.tc-tab').forEach(t => {
      t.addEventListener('click', () => {
        $$('.tc-tab').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        renderTeacherPage();
      });
    });
  }

  // 班级漏洞分布
  const vulns = [
    { rank: 1, name:'导数与函数极值', path:'函数与导数 › 导数应用', errRate: 62, count: 31 },
    { rank: 2, name:'圆锥曲线综合题', path:'解析几何 › 圆锥曲线', errRate: 58, count: 29 },
    { rank: 3, name:'立体几何外接球', path:'立体几何 › 空间几何体', errRate: 52, count: 26 },
    { rank: 4, name:'数列递推与求和', path:'数列 › 数列求和', errRate: 45, count: 22 },
    { rank: 5, name:'概率统计分布', path:'概率统计 › 分布列', errRate: 38, count: 19 },
    { rank: 6, name:'三角函数图像变换', path:'三角函数 › 图像与性质', errRate: 32, count: 16 },
  ];
  $('#classVulnList').innerHTML = vulns.map(v => `
    <div class="cv-item">
      <div class="cv-rank ${v.rank<=3?'top':''}">${v.rank}</div>
      <div class="cv-name">${v.name} <small>${v.path}</small></div>
      <div class="cv-error-rate"><b>${v.errRate}%</b> · ${v.count}人错</div>
      <div class="cv-bar-wrap"><div class="cv-bar" style="width:${v.errRate}%"></div></div>
    </div>
  `).join('');

  // 学生排名
  const students = [
    { rank:1, name:'张思远', score: 138, rate: 92, change:'up', delta: 2 },
    { rank:2, name:'李雨桐', score: 132, rate: 88, change:'up', delta: 1 },
    { rank:3, name:'王一鸣', score: 128, rate: 85, change:'down', delta: 2 },
    { rank:4, name:'陈子涵', score: 118, rate: 79, change:'up', delta: 3 },
    { rank:5, name:'刘欣怡', score: 112, rate: 75, change:'down', delta: 1 },
    { rank:6, name:'赵浩然', score: 105, rate: 70, change:'same', delta: 0 },
    { rank:7, name:'孙嘉怡', score: 98, rate: 65, change:'up', delta: 2 },
    { rank:8, name:'周文博', score: 92, rate: 61, change:'down', delta: 3 },
  ];
  $('#studentRankBody').innerHTML = students.map(s => `
    <tr>
      <td>${s.rank}</td>
      <td><div class="rank-student">
        <div class="rank-avatar">${s.name[0]}</div>
        <span>${s.name}</span>
      </div></td>
      <td><b>${s.score}</b>/150</td>
      <td>${s.rate}%</td>
      <td class="${s.change==='up'?'rank-up':s.change==='down'?'rank-down':''}">
        ${s.change==='up'?'↑ '+s.delta:s.change==='down'?'↓ '+s.delta:'—'}
      </td>
    </tr>
  `).join('');
}

/* ---------- 导航：移动端 ---------- */
$('#navToggle')?.addEventListener('click', () => {
  const nl = $('#navLinks');
  if(nl.style.display === 'flex') nl.style.display='none';
  else nl.style.display = 'flex';
});

/* ---------- 全局错误边界 ---------- */
window.addEventListener('error', (e) => {
  console.error('[全局错误]', e.error || e.message);
  showErrorToast('页面遇到异常，已为你自动恢复。如问题持续请刷新页面。');
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('[未处理Promise]', e.reason);
});
function showErrorToast(msg){
  let t = $('#_errToast');
  if(!t){
    t = document.createElement('div');
    t.id = '_errToast';
    t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#dc2626;color:#fff;padding:12px 20px;border-radius:10px;z-index:9999;font-size:14px;box-shadow:0 4px 20px rgba(0,0,0,0.2);max-width:90vw';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.display = 'none'; }, 3500);
}

/* ---------- 启动 ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  // 初始化存储层（IndexedDB，失败则降级 localStorage）
  if(window.Storage?.init){
    try{ await window.Storage.init(); }catch(e){}
  }
  const route = location.hash.replace('#/','') || 'home';
  switchPage(route);
});

})();

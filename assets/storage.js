/* ==========================================================================
   Storage · IndexedDB 持久化层（v1.1 新增）
   - 自动保存做题/练习进度
   - 历史报告存储（替换 localStorage，容量不受 5MB 限制）
   - 数据兼容迁移：从旧版 localStorage 自动导入
   - 带错误降级：IndexedDB 不可用时回退到 localStorage
   ========================================================================== */
(function(global){
  const DB_NAME = 'zhenti_scan_db';
  const DB_VERSION = 1;
  const STORE_REPORTS = 'reports';
  const STORE_PROGRESS = 'progress'; // { id, examId, currentQNum, answers, ts }
  const STORE_PRAC = 'practice';     // { id, examId, answers, groups, ts }
  const STORE_KBANK = 'kbank';       // { id, answers, results, ts }
  const STORE_SETTINGS = 'settings'; // { id, value }
  const OLD_LS_KEY = 'zhenti_scan_reports_v1';

  let db = null;
  let fallbackMode = false;

  function openDB(){
    return new Promise((resolve, reject) => {
      if(!global.indexedDB){ fallbackMode = true; resolve(null); return; }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const d = e.target.result;
        if(!d.objectStoreNames.contains(STORE_REPORTS)){
          const s = d.createObjectStore(STORE_REPORTS, { keyPath: 'id' });
          s.createIndex('ts', 'ts', { unique: false });
        }
        if(!d.objectStoreNames.contains(STORE_PROGRESS)){
          d.createObjectStore(STORE_PROGRESS, { keyPath: 'examId' });
        }
        if(!d.objectStoreNames.contains(STORE_PRAC)){
          d.createObjectStore(STORE_PRAC, { keyPath: 'examId' });
        }
        if(!d.objectStoreNames.contains(STORE_KBANK)){
          d.createObjectStore(STORE_KBANK, { keyPath: 'id' });
        }
        if(!d.objectStoreNames.contains(STORE_SETTINGS)){
          d.createObjectStore(STORE_SETTINGS, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => { db = req.result; resolve(db); };
      req.onerror = () => { fallbackMode = true; resolve(null); };
      req.onblocked = () => { fallbackMode = true; resolve(null); };
    });
  }

  function tx(store, mode='readonly'){
    if(!db) return null;
    try{ return db.transaction(store, mode).objectStore(store); }
    catch(e){ return null; }
  }

  function promisify(req){
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  // --- Reports ---
  async function saveReport(report){
    if(fallbackMode) return saveReportLS(report);
    const s = tx(STORE_REPORTS, 'readwrite');
    if(!s) return false;
    try{ await promisify(s.put(report)); return true; }
    catch(e){ return false; }
  }
  async function getAllReports(){
    if(fallbackMode) return loadReportsLS();
    const s = tx(STORE_REPORTS, 'readonly');
    if(!s) return [];
    try{
      const all = await promisify(s.getAll());
      return all.sort((a,b) => b.ts - a.ts);
    }catch(e){ return []; }
  }
  async function deleteReport(id){
    if(fallbackMode){
      const all = loadReportsLS().filter(r => r.id !== id);
      localStorage.setItem(OLD_LS_KEY, JSON.stringify(all));
      return true;
    }
    const s = tx(STORE_REPORTS, 'readwrite');
    if(!s) return false;
    try{ await promisify(s.delete(id)); return true; }
    catch(e){ return false; }
  }
  async function getReport(id){
    if(fallbackMode){ return loadReportsLS().find(r => r.id === id) || null; }
    const s = tx(STORE_REPORTS, 'readonly');
    if(!s) return null;
    try{ return await promisify(s.get(id)); }
    catch(e){ return null; }
  }

  // --- Progress (analysis page) ---
  async function saveProgress(examId, data){
    if(fallbackMode){
      try{ localStorage.setItem('zt_progress_'+examId, JSON.stringify(data)); return true; }catch(e){ return false; }
    }
    const s = tx(STORE_PROGRESS, 'readwrite');
    if(!s) return false;
    try{ await promisify(s.put({ examId, ts: Date.now(), ...data })); return true; }
    catch(e){ return false; }
  }
  async function getProgress(examId){
    if(fallbackMode){
      try{ return JSON.parse(localStorage.getItem('zt_progress_'+examId)||'null'); }catch(e){ return null; }
    }
    const s = tx(STORE_PROGRESS, 'readonly');
    if(!s) return null;
    try{ return await promisify(s.get(examId)); }
    catch(e){ return null; }
  }

  // --- Practice ---
  async function savePractice(examId, data){
    if(fallbackMode){
      try{ localStorage.setItem('zt_prac_'+examId, JSON.stringify(data)); return true; }catch(e){ return false; }
    }
    const s = tx(STORE_PRAC, 'readwrite');
    if(!s) return false;
    try{ await promisify(s.put({ examId, ts: Date.now(), ...data })); return true; }
    catch(e){ return false; }
  }
  async function getPractice(examId){
    if(fallbackMode){
      try{ return JSON.parse(localStorage.getItem('zt_prac_'+examId)||'null'); }catch(e){ return null; }
    }
    const s = tx(STORE_PRAC, 'readonly');
    if(!s) return null;
    try{ return await promisify(s.get(examId)); }
    catch(e){ return null; }
  }
  async function clearPractice(examId){
    if(fallbackMode){ localStorage.removeItem('zt_prac_'+examId); return true; }
    const s = tx(STORE_PRAC, 'readwrite');
    if(!s) return false;
    try{ await promisify(s.delete(examId)); return true; }
    catch(e){ return false; }
  }

  // --- Kbank ---
  async function saveKbank(data){
    if(fallbackMode){
      try{ localStorage.setItem('zt_kbank', JSON.stringify(data)); return true; }catch(e){ return false; }
    }
    const s = tx(STORE_KBANK, 'readwrite');
    if(!s) return false;
    try{ await promisify(s.put({ id:'main', ts: Date.now(), ...data })); return true; }
    catch(e){ return false; }
  }
  async function getKbank(){
    if(fallbackMode){
      try{ return JSON.parse(localStorage.getItem('zt_kbank')||'null'); }catch(e){ return null; }
    }
    const s = tx(STORE_KBANK, 'readonly');
    if(!s) return null;
    try{ return await promisify(s.get('main')); }
    catch(e){ return null; }
  }

  // --- Settings ---
  async function saveSetting(key, value){
    if(fallbackMode){
      try{ localStorage.setItem('zt_set_'+key, JSON.stringify(value)); return true; }catch(e){ return false; }
    }
    const s = tx(STORE_SETTINGS, 'readwrite');
    if(!s) return false;
    try{ await promisify(s.put({ id: key, value, ts: Date.now() })); return true; }
    catch(e){ return false; }
  }
  async function getSetting(key, defVal=null){
    if(fallbackMode){
      try{
        const v = localStorage.getItem('zt_set_'+key);
        return v === null ? defVal : JSON.parse(v);
      }catch(e){ return defVal; }
    }
    const s = tx(STORE_SETTINGS, 'readonly');
    if(!s) return defVal;
    try{
      const r = await promisify(s.get(key));
      return r ? r.value : defVal;
    }catch(e){ return defVal; }
  }

  // --- Fallback localStorage helpers ---
  function saveReportLS(report){
    try{
      const all = JSON.parse(localStorage.getItem(OLD_LS_KEY)||'[]');
      all.unshift(report);
      localStorage.setItem(OLD_LS_KEY, JSON.stringify(all.slice(0,30)));
      return true;
    }catch(e){ return false; }
  }
  function loadReportsLS(){
    try{ return JSON.parse(localStorage.getItem(OLD_LS_KEY)||'[]'); }
    catch(e){ return []; }
  }

  // --- Data migration from old localStorage ---
  async function migrateFromLS(){
    try{
      const old = localStorage.getItem(OLD_LS_KEY);
      if(!old) return 0;
      const list = JSON.parse(old);
      if(!Array.isArray(list) || list.length === 0) return 0;
      let count = 0;
      for(const r of list){
        if(!r.id) continue;
        const ok = await saveReport(r);
        if(ok) count++;
      }
      if(count > 0 && !fallbackMode){
        // 迁移成功后保留旧数据 30 天再清理（安全起见先不删）
      }
      return count;
    }catch(e){ return 0; }
  }

  // --- Init ---
  let initPromise = null;
  function init(){
    if(initPromise) return initPromise;
    initPromise = (async () => {
      await openDB();
      const migrated = await migrateFromLS();
      return { fallbackMode, migrated };
    })();
    return initPromise;
  }

  global.Storage = {
    init,
    isFallback: () => fallbackMode,
    saveReport, getAllReports, deleteReport, getReport,
    saveProgress, getProgress,
    savePractice, getPractice, clearPractice,
    saveKbank, getKbank,
    saveSetting, getSetting,
  };
})(window);

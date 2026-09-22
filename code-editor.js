/* ===== Éditeur multi-fichiers : coloration multi-langages + détection d'erreurs (autonome) ===== */
function hesc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
var LANG_KW={
 js:['var','let','const','function','return','if','else','for','while','do','switch','case','break','continue','new','this','typeof','instanceof','in','of','class','extends','super','try','catch','finally','throw','await','async','yield','import','export','from','default','null','undefined','true','false','void','delete','static','get','set'],
 ts:['var','let','const','function','return','if','else','for','while','do','switch','case','break','continue','new','this','typeof','class','extends','implements','interface','type','enum','public','private','protected','readonly','import','export','from','default','null','undefined','true','false','void','async','await','number','string','boolean','any','unknown','never'],
 java:['public','private','protected','class','interface','extends','implements','void','int','long','double','float','boolean','char','String','new','return','if','else','for','while','do','switch','case','break','continue','static','final','try','catch','finally','throw','throws','import','package','this','super','null','true','false','abstract','enum'],
 c:['int','long','short','char','float','double','void','unsigned','signed','struct','union','enum','typedef','const','static','return','if','else','for','while','do','switch','case','break','continue','sizeof','include','define','null','true','false','printf','scanf'],
 cpp:['int','long','short','char','float','double','void','bool','auto','class','struct','template','typename','namespace','using','public','private','protected','virtual','const','static','return','if','else','for','while','do','switch','case','break','continue','new','delete','try','catch','throw','nullptr','true','false','std','cout','cin','include'],
 csharp:['using','namespace','class','struct','interface','public','private','protected','internal','static','void','int','string','bool','double','float','var','new','return','if','else','for','foreach','while','do','switch','case','break','continue','try','catch','finally','throw','null','true','false','get','set','async','await'],
 php:['function','return','if','else','elseif','for','foreach','while','do','switch','case','break','continue','echo','print','class','extends','implements','public','private','protected','static','new','try','catch','finally','throw','null','true','false','array','use','namespace','const','require','include'],
 go:['func','package','import','var','const','type','struct','interface','map','chan','go','defer','return','if','else','for','range','switch','case','break','continue','select','nil','true','false','string','int','float64','bool','error','make','len','append'],
 rust:['fn','let','mut','const','struct','enum','impl','trait','pub','use','mod','return','if','else','for','while','loop','match','break','continue','self','Self','None','Some','Ok','Err','true','false','i32','u32','f64','usize','String','Vec','println'],
 kotlin:['fun','val','var','class','object','interface','override','return','if','else','for','while','do','when','break','continue','import','package','null','true','false','private','public','internal','data','companion','Int','String','Boolean'],
 swift:['func','let','var','class','struct','enum','protocol','extension','return','if','else','for','while','switch','case','break','continue','guard','import','nil','true','false','self','Int','String','Bool','Double','print'],
 python:['def','return','if','elif','else','for','while','in','not','and','or','import','from','as','class','try','except','finally','raise','with','lambda','yield','pass','break','continue','True','False','None','global','nonlocal','del','is','assert','print','self','range','len','int','str','float','list','dict','set','tuple'],
 ruby:['def','end','return','if','elsif','else','unless','for','while','until','do','begin','rescue','ensure','class','module','require','yield','puts','print','nil','true','false','self','attr_accessor','new','then'],
 bash:['if','then','else','elif','fi','for','while','do','done','case','esac','function','echo','return','local','export','read','in','exit','cd','then'],
 sql:['SELECT','FROM','WHERE','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','DROP','ALTER','JOIN','LEFT','RIGHT','INNER','OUTER','ON','GROUP','BY','ORDER','HAVING','LIMIT','DISTINCT','AS','AND','OR','NOT','NULL','PRIMARY','KEY','FOREIGN','REFERENCES','INDEX','COUNT','SUM','AVG','MIN','MAX','LIKE','IN','BETWEEN','UNION']
};
function canon(l){ l=(l||'').toLowerCase(); var m={htm:'html',xml:'html',svg:'html',mjs:'js',jsx:'js',javascript:'js',typescript:'ts',tsx:'ts',py:'python',rb:'ruby',sh:'bash',shell:'bash',yml:'yaml',cc:'cpp','c++':'cpp',hpp:'cpp',h:'c',cs:'csharp','c#':'csharp',kt:'kotlin',rs:'rust'}; return m[l]||l; }
function extLang(name){ return canon((String(name).split('.').pop()||'').toLowerCase()); }
function hiHtml(code){ var out='',last=0,re=/<!--[\s\S]*?-->|<\/?[A-Za-z][\w-]*|\/?>|"[^"]*"|'[^']*'|[A-Za-z_:][\w:-]*(?==)/g,m;
  while((m=re.exec(code))){ out+=hesc(code.slice(last,m.index)); last=re.lastIndex; var t=m[0];
    if(t.slice(0,4)==='<!--') out+='<span class="hc">'+hesc(t)+'</span>';
    else if(t.charAt(0)==='<'||t==='>'||t==='/>') out+='<span class="ht">'+hesc(t)+'</span>';
    else if(t.charAt(0)==='"'||t.charAt(0)==="'") out+='<span class="hs">'+hesc(t)+'</span>';
    else out+='<span class="ha">'+hesc(t)+'</span>'; }
  out+=hesc(code.slice(last)); return out; }
function hiCss(code){ var out='',last=0,re=/(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(#[0-9a-fA-F]{3,8}\b|\b\d+\.?\d*(?:px|em|rem|%|vh|vw|s|ms|deg|fr)?\b)|([.#]?[A-Za-z_][\w-]*)/g,m;
  while((m=re.exec(code))){ out+=hesc(code.slice(last,m.index)); last=re.lastIndex;
    if(m[1]) out+='<span class="hc">'+hesc(m[1])+'</span>'; else if(m[2]) out+='<span class="hs">'+hesc(m[2])+'</span>'; else if(m[3]) out+='<span class="hn">'+hesc(m[3])+'</span>';
    else { var w=m[4], nx=code.charAt(re.lastIndex); if(w.charAt(0)==='.'||w.charAt(0)==='#') out+='<span class="hsel">'+hesc(w)+'</span>'; else if(nx===':') out+='<span class="ha">'+hesc(w)+'</span>'; else out+=hesc(w); } }
  out+=hesc(code.slice(last)); return out; }
function hiJson(code){ var out='',last=0,re=/("(?:\\.|[^"\\])*")(\s*:)?|(\b-?\d+\.?\d*\b)|\b(true|false|null)\b/g,m;
  while((m=re.exec(code))){ out+=hesc(code.slice(last,m.index)); last=re.lastIndex;
    if(m[1]&&m[2]) out+='<span class="ha">'+hesc(m[1])+'</span>'+hesc(m[2]); else if(m[1]) out+='<span class="hs">'+hesc(m[1])+'</span>'; else if(m[3]) out+='<span class="hn">'+hesc(m[3])+'</span>'; else if(m[4]) out+='<span class="hk">'+hesc(m[4])+'</span>'; }
  out+=hesc(code.slice(last)); return out; }
function hiC(code, kw, bt){ var re= bt ? /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+\.?\d*\b)|([A-Za-z_$][\w$]*)/g
    : /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+\.?\d*\b)|([A-Za-z_$][\w$]*)/g;
  var out='',last=0,m; while((m=re.exec(code))){ out+=hesc(code.slice(last,m.index)); last=re.lastIndex;
    if(m[1]) out+='<span class="hc">'+hesc(m[1])+'</span>'; else if(m[2]) out+='<span class="hs">'+hesc(m[2])+'</span>'; else if(m[3]) out+='<span class="hn">'+hesc(m[3])+'</span>';
    else { var w=m[4]; if(kw.indexOf(w)>=0) out+='<span class="hk">'+hesc(w)+'</span>'; else if(code.charAt(re.lastIndex)==='(') out+='<span class="hf">'+hesc(w)+'</span>'; else out+=hesc(w); } }
  out+=hesc(code.slice(last)); return out; }
function hiHash(code, kw, triple){ var re= triple ? /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)/g
    : /(#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)/g;
  var out='',last=0,m; while((m=re.exec(code))){ out+=hesc(code.slice(last,m.index)); last=re.lastIndex;
    if(m[1]) out+='<span class="hc">'+hesc(m[1])+'</span>'; else if(m[2]) out+='<span class="hs">'+hesc(m[2])+'</span>'; else if(m[3]) out+='<span class="hn">'+hesc(m[3])+'</span>';
    else { var w=m[4]; if(kw.indexOf(w)>=0) out+='<span class="hk">'+hesc(w)+'</span>'; else if(code.charAt(re.lastIndex)==='(') out+='<span class="hf">'+hesc(w)+'</span>'; else out+=hesc(w); } }
  out+=hesc(code.slice(last)); return out; }
function hiSql(code, kw){ var re=/(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)/g;
  var out='',last=0,m; while((m=re.exec(code))){ out+=hesc(code.slice(last,m.index)); last=re.lastIndex;
    if(m[1]) out+='<span class="hc">'+hesc(m[1])+'</span>'; else if(m[2]) out+='<span class="hs">'+hesc(m[2])+'</span>'; else if(m[3]) out+='<span class="hn">'+hesc(m[3])+'</span>';
    else { var w=m[4]; if(kw.indexOf(w.toUpperCase())>=0) out+='<span class="hk">'+hesc(w)+'</span>'; else out+=hesc(w); } }
  out+=hesc(code.slice(last)); return out; }
function agHi(code, lang){ code=String(code==null?'':code); lang=canon(lang);
  if(lang==='html') return hiHtml(code);
  if(lang==='css') return hiCss(code);
  if(lang==='json') return hiJson(code);
  if(lang==='sql') return hiSql(code, LANG_KW.sql);
  if(lang==='python'||lang==='ruby') return hiHash(code, LANG_KW[lang]||[], lang==='python');
  if(lang==='bash'||lang==='yaml') return hiHash(code, LANG_KW[lang]||[], false);
  return hiC(code, LANG_KW[lang]||LANG_KW.js, (lang==='js'||lang==='ts')); }

/* ---- Détection d'erreurs (style VS Code : liste « Problèmes ») ---- */
function lineOf(code,pos){ return code.slice(0,pos).split('\n').length; }
function stripForBalance(code, lang){ // remove strings/comments to avoid false positives
  var s=code, out='', i=0, n=s.length, line=1, map=[];
  function push(ch){ out+=ch; map.push(line); if(ch==='\n') line++; }
  while(i<n){ var c=s[i], d=s[i+1];
    if((lang==='python'||lang==='ruby'||lang==='bash'||lang==='yaml') && c==='#'){ while(i<n&&s[i]!=='\n'){ if(s[i]==='\n')line++; i++; } continue; }
    if(c==='/'&&d==='/'){ while(i<n&&s[i]!=='\n') i++; continue; }
    if(c==='-'&&d==='-'&&lang==='sql'){ while(i<n&&s[i]!=='\n') i++; continue; }
    if(c==='/'&&d==='*'){ i+=2; while(i<n&&!(s[i]==='*'&&s[i+1]==='/')){ if(s[i]==='\n')line++; i++; } i+=2; continue; }
    if(c==='"'||c==="'"||c==='`'){ var q=c; i++; while(i<n&&s[i]!==q){ if(s[i]==='\\'){i+=2;continue;} if(s[i]==='\n')line++; i++; } i++; continue; }
    push(c); i++; }
  return {text:out, map:map}; }
function balance(code, lang){ var st=stripForBalance(code,lang); var t=st.text, map=st.map, stack=[]; var pairs={')':'(',']':'[','}':'{'}; var open='([{';
  for(var i=0;i<t.length;i++){ var c=t[i];
    if(open.indexOf(c)>=0) stack.push({c:c,line:map[i]||1});
    else if(pairs[c]){ if(!stack.length) return {line:map[i]||1, msg:'« '+c+' » en trop (aucune ouverture correspondante)'}; var top=stack.pop(); if(top.c!==pairs[c]) return {line:map[i]||1, msg:'« '+c+' » ne correspond pas à « '+top.c+' » (ligne '+top.line+')'}; } }
  if(stack.length){ var o=stack[stack.length-1]; return {line:o.line, msg:'« '+o.c+' » n\'est jamais fermé'}; }
  return null; }
function agLint(code, lang){ lang=canon(lang); var errs=[];
  if(lang==='js'||lang==='ts'){ try{ new Function(code); }catch(e){ var b=balance(code,lang); errs.push({line:(b?b.line:1), msg:'Erreur de syntaxe : '+String(e.message)}); return errs; } }
  else if(lang==='json'){ try{ JSON.parse(code); }catch(e){ var pm=String(e.message).match(/position (\d+)/); errs.push({line: pm? lineOf(code,+pm[1]):1, msg:String(e.message)}); return errs; } }
  var be=balance(code,lang); if(be) errs.push(be);
  return errs; }

/* ===== Aperçu combiné + ZIP autonome ===== */
function buildProject(files){
  function ct(rx){ return files.filter(function(f){ return rx.test(f.name); }); }
  var html=ct(/\.html?$/i), css=ct(/\.css$/i), js=ct(/\.(js|mjs)$/i);
  var styleTag=css.map(function(c){ return '<style>\n'+c.content+'\n</style>'; }).join('\n');
  var scriptTag=js.map(function(j){ return '<scr'+'ipt>\n'+j.content+'\n</scr'+'ipt>'; }).join('\n');
  if(html.length){ var doc=html[0].content;
    doc=doc.replace(/<link\b[^>]*>/gi, function(t){ return (/rel\s*=\s*["']?stylesheet/i.test(t) && !/https?:\/\//i.test(t))? '' : t; });
    doc=doc.replace(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>\s*<\/script>/gi, function(t,s){ return (/https?:\/\//i.test(s))? t : ''; });
    if(/<\/head>/i.test(doc)) doc=doc.replace(/<\/head>/i, styleTag+'\n</head>'); else doc=styleTag+'\n'+doc;
    if(/<\/body>/i.test(doc)) doc=doc.replace(/<\/body>/i, scriptTag+'\n</body>'); else doc=doc+'\n'+scriptTag;
    return doc; }
  return '<!doctype html><html><head><meta charset="utf-8">'+styleTag+'</head><body>'+scriptTag+'</body></html>';
}
/* mini-ZIP (stored) autonome */
function czCrc(bytes){ var c,crc=0xFFFFFFFF; for(var i=0;i<bytes.length;i++){ c=(crc^bytes[i])&0xFF; for(var k=0;k<8;k++){ c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);} crc=(crc>>>8)^c; } return (crc^0xFFFFFFFF)>>>0; }
function czBytes(files){ var te=new TextEncoder(), chunks=[],cen=[],off=0; function u16(n){return[n&255,(n>>>8)&255];} function u32(n){return[n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255];}
  files.forEach(function(f){ var data=te.encode(f.content), nm=te.encode(f.name), crc=czCrc(data);
    var lh=[].concat(u32(0x04034b50),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(nm.length),u16(0));
    var head=new Uint8Array(lh.length+nm.length); head.set(lh,0); head.set(nm,lh.length); chunks.push(head); chunks.push(data);
    var ch=[].concat(u32(0x02014b50),u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(nm.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(off));
    var cd=new Uint8Array(ch.length+nm.length); cd.set(ch,0); cd.set(nm,ch.length); cen.push(cd); off+=head.length+data.length; });
  var cdsz=cen.reduce(function(a,c){return a+c.length;},0), end=new Uint8Array([].concat(u32(0x06054b50),u16(0),u16(0),u16(files.length),u16(files.length),u32(cdsz),u32(off),u16(0)));
  var tot=off+cdsz+end.length,out=new Uint8Array(tot),pos=0; chunks.forEach(function(c){out.set(c,pos);pos+=c.length;}); cen.forEach(function(c){out.set(c,pos);pos+=c.length;}); out.set(end,pos); return out; }

/* ===== Éditeur (navigateur) : onglets multi-fichiers + overlay coloré + Problèmes ===== */
(function(){
  var LS='pb_code_files';
  var DEF=[
   {name:'index.html',content:'<!doctype html>\n<html lang="fr">\n<head>\n  <meta charset="utf-8">\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Bonjour Saad</h1>\n  <button id="b">Clique-moi</button>\n  <script src="script.js"><\/script>\n</body>\n</html>'},
   {name:'style.css',content:'body{font-family:system-ui;padding:24px;background:#0f172a;color:#e2e8f0}\nh1{color:#38bdf8}\nbutton{padding:8px 14px;border:0;border-radius:8px;background:#6c5ce7;color:#fff;cursor:pointer}'},
   {name:'script.js',content:'document.getElementById("b").addEventListener("click", function(){\n  alert("Salut Saad !");\n});'}
  ];
  var files, active=0, lintTmr=null;
  var tabsEl=document.getElementById('edTabs'), ta=document.getElementById('edTa'), hi=document.getElementById('edHi'),
      fr=document.getElementById('codeFrame'), newName=document.getElementById('edNewName'),
      probEl=document.getElementById('edProblems'), probN=document.getElementById('edProbCount');
  if(!ta||!hi||!fr) return;
  function load(){ try{ files=JSON.parse(localStorage.getItem(LS)); }catch(e){ files=null; } if(!files||!files.length) files=DEF.map(function(f){ return {name:f.name,content:f.content}; }); }
  function save(){ if(files[active]) files[active].content=ta.value; try{ localStorage.setItem(LS,JSON.stringify(files)); }catch(e){} }
  function lang(){ return extLang(files[active].name); }
  function paint(){ hi.innerHTML=agHi(ta.value,lang())+'\n'; }
  function syncScroll(){ var pre=hi.parentNode; pre.scrollTop=ta.scrollTop; pre.scrollLeft=ta.scrollLeft; }
  function loadActive(){ ta.value=files[active].content||''; paint(); syncScroll(); lintAll(); }
  /* --- Problèmes (erreurs) --- */
  function errsFor(f){ try{ return agLint(f.content||'', extLang(f.name))||[]; }catch(e){ return []; } }
  function lintAll(){ if(!probEl){ return; }
    var total=0, rows=[];
    files.forEach(function(f,fi){ var es=errsFor(f); f._err=es.length; total+=es.length;
      es.forEach(function(e){ rows.push({fi:fi, name:f.name, line:e.line, msg:e.msg}); }); });
    if(probN) probN.textContent=total?(''+total):'0';
    probEl.innerHTML='';
    if(!total){ var okr=document.createElement('div'); okr.className='ed-prob ok'; okr.innerHTML='<span class="ed-pdot ok"></span> Aucun problème détecté.'; probEl.appendChild(okr); }
    else rows.forEach(function(r){ var d=document.createElement('div'); d.className='ed-prob';
      d.innerHTML='<span class="ed-pdot"></span><b>'+hesc(r.name)+'</b> <span class="ed-pln">L'+r.line+'</span> — '+hesc(r.msg);
      d.addEventListener('click',function(){ if(r.fi!==active) switchTo(r.fi); jumpTo(r.line); }); probEl.appendChild(d); });
    // pastilles rouges sur les onglets
    Array.prototype.forEach.call(tabsEl.children,function(t,i){ if(files[i]&&files[i]._err) t.classList.add('err'); else t.classList.remove('err'); });
  }
  function scheduleLint(){ if(lintTmr) clearTimeout(lintTmr); lintTmr=setTimeout(lintAll,400); }
  function jumpTo(line){ var lines=ta.value.split('\n'), pos=0; for(var i=0;i<line-1&&i<lines.length;i++) pos+=lines[i].length+1;
    ta.focus(); try{ ta.setSelectionRange(pos,pos+(lines[line-1]?lines[line-1].length:0)); }catch(e){}
    var lh=ta.scrollHeight/Math.max(1,lines.length); ta.scrollTop=Math.max(0,(line-3)*lh); syncScroll(); }
  function renderTabs(){ tabsEl.innerHTML=''; files.forEach(function(f,i){ var t=document.createElement('div'); t.className='ed-tab'+(i===active?' on':'')+(f._err?' err':'');
      var nm=document.createElement('span'); nm.textContent=f.name; nm.addEventListener('click',function(){ switchTo(i); }); t.appendChild(nm);
      var x=document.createElement('button'); x.className='ed-x'; x.innerHTML='&times;'; x.title='Supprimer'; x.addEventListener('click',function(e){ e.stopPropagation(); if(files.length<=1) return; files.splice(i,1); if(active>=files.length) active=files.length-1; save(); renderTabs(); loadActive(); }); t.appendChild(x);
      tabsEl.appendChild(t); }); }
  function switchTo(i){ save(); active=i; renderTabs(); loadActive(); ta.focus(); }
  function addFile(nm, content){ nm=(nm||'').trim(); if(!nm) return; if(!/\./.test(nm)) nm+='.txt';
    for(var i=0;i<files.length;i++){ if(files[i].name===nm){ if(content!=null){ files[i].content=content; } switchTo(i); return; } }
    files.push({name:nm,content:content||''}); active=files.length-1; save(); renderTabs(); loadActive(); ta.focus(); }
  function run(){ save(); fr.srcdoc=buildProject(files); }
  ta.addEventListener('input',function(){ if(files[active]) files[active].content=ta.value; paint(); scheduleLint(); });
  ta.addEventListener('scroll',syncScroll);
  ta.addEventListener('keydown',function(e){ if(e.key==='Tab'){ e.preventDefault(); var s=ta.selectionStart,en=ta.selectionEnd; ta.value=ta.value.slice(0,s)+'  '+ta.value.slice(en); ta.selectionStart=ta.selectionEnd=s+2; if(files[active]) files[active].content=ta.value; paint(); scheduleLint(); } });
  var rB=document.getElementById('edRun'); if(rB) rB.addEventListener('click',run);
  var aB=document.getElementById('edAdd'); if(aB) aB.addEventListener('click',function(){ addFile(newName.value); newName.value=''; });
  if(newName) newName.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); addFile(newName.value); newName.value=''; } });
  var zB=document.getElementById('edZip'); if(zB) zB.addEventListener('click',function(){ save(); try{ var blob=new Blob([czBytes(files)],{type:'application/zip'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='projet.zip'; document.body.appendChild(a); a.click(); a.remove(); }catch(e){} });
  var cB=document.getElementById('edClear'); if(cB) cB.addEventListener('click',function(){ if(files[active]){ files[active].content=''; } ta.value=''; paint(); save(); lintAll(); });
  /* --- API : l'IA peut recharger l'éditeur après avoir écrit pb_code_files --- */
  window.PB_codeReload=function(runAfter){ load(); active=0; renderTabs(); loadActive(); if(runAfter!==false) run(); };
  load(); renderTabs(); loadActive(); run();
})();

/* ============================================================================
   Brio — Résultat du code en PLEIN ÉCRAN (bloc autonome)
   ========================================================================== */
(function(){
  function init(){
    var right=document.querySelector('.code-right'); if(!right) return;
    var tb=right.querySelector('.code-tb'); var frame=document.getElementById('codeFrame');
    if(!tb||!frame||tb.querySelector('.code-fs-btn')) return;
    if(!document.getElementById('pbCodeFsCss')){
      var st=document.createElement('style'); st.id='pbCodeFsCss';
      st.textContent=[
        '.code-tb{display:flex;align-items:center;gap:8px}',
        '.code-fs-btn{margin-left:auto;font-size:.74rem;padding:4px 11px;border:1px solid var(--border);background:transparent;color:inherit;border-radius:7px;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:5px}',
        '.code-fs-btn:hover{border-color:var(--royal,#6c5ce7);color:var(--text)}',
        '.code-right.pb-cfull{position:fixed;inset:0;z-index:2147483000;margin:0;padding:0;border-radius:0;background:var(--bg,#0d1117);display:flex;flex-direction:column;max-width:none;width:100vw;height:100vh}',
        '.code-right.pb-cfull .code-tb{padding:12px 16px;border-bottom:1px solid var(--border)}',
        '.code-right.pb-cfull iframe{flex:1;width:100%;height:auto;border:0;border-radius:0}',
        'body.pb-code-fs{overflow:hidden}'
      ].join('');
      document.head.appendChild(st);
    }
    var btn=document.createElement('button'); btn.type='button'; btn.className='code-fs-btn'; btn.innerHTML='&#10530; Plein écran';
    tb.appendChild(btn);
    function enter(){ right.classList.add('pb-cfull'); document.body.classList.add('pb-code-fs'); btn.innerHTML='&#10529; Réduire'; try{ if(window.PB_codeReload) window.PB_codeReload(true); }catch(_){} }
    function exit(){ right.classList.remove('pb-cfull'); document.body.classList.remove('pb-code-fs'); btn.innerHTML='&#10530; Plein écran'; }
    function toggle(){ right.classList.contains('pb-cfull')?exit():enter(); }
    btn.addEventListener('click',toggle);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape' && right.classList.contains('pb-cfull')) exit(); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

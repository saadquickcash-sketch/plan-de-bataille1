/* ============================================================================
   Brio — Échecs façon chess.com
   Board élégant, glisser-déposer, flèches, et « Bilan de partie » complet
   (analyse Stockfish coup par coup, classification, précision %, commentaire
   professionnel lu à voix haute).  S'appuie sur chess-lib.js (chess.js) + sf.js.
   ========================================================================== */
(function(){
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  var st=document.getElementById('chessStatus');
  if(typeof Chess==='undefined'){ if(st) st.textContent='Moteur indisponible (recharge la page).'; return; }

  /* ---------------- Moteur interne (repli hors-Stockfish) ---------------- */
  var PVAL={p:100,n:320,b:330,r:500,q:900,k:0};
  function evalWhite(g){ var b=g.board(), s=0; for(var r=0;r<8;r++)for(var c=0;c<8;c++){ var p=b[r][c]; if(!p) continue; var v=PVAL[p.type]; var cd=Math.max(Math.abs(3.5-r),Math.abs(3.5-c)); v+=(3.5-cd)*3; if(p.type==='p') v+=(p.color==='w'?(6-r):(r-1))*5; if(p.type==='n'||p.type==='b') v+=(3.5-cd)*2; s+= p.color==='w'? v : -v; } return s; }
  function relStatic(g){ var w=evalWhite(g); return g.turn()==='w'? w : -w; }
  function orderMoves(ms){ function mv(m){ var s=0; if(m.captured) s+=(PVAL[m.captured]||0); if(m.promotion) s+=800; return s; } return ms.sort(function(a,b){ return mv(b)-mv(a); }); }
  function negamax(g,depth,alpha,beta){ if(g.in_checkmate()) return -100000-depth; if(g.game_over()) return 0; if(depth<=0) return relStatic(g); var moves=orderMoves(g.moves({verbose:true})); var best=-Infinity; for(var i=0;i<moves.length;i++){ g.move(moves[i]); var sc=-negamax(g,depth-1,-beta,-alpha); g.undo(); if(sc>best) best=sc; if(best>alpha) alpha=best; if(alpha>=beta) break; } return best; }
  function bestMoveLocal(g,depth,rnd){ var moves=orderMoves(g.moves({verbose:true})); if(!moves.length) return null; var best=null,bv=-Infinity,alpha=-Infinity,beta=Infinity,ties=[]; for(var i=0;i<moves.length;i++){ g.move(moves[i]); var sc=-negamax(g,depth-1,-beta,-alpha); g.undo(); if(sc>bv){ bv=sc; best=moves[i]; ties=[moves[i]]; } else if(sc===bv){ ties.push(moves[i]); } if(bv>alpha) alpha=bv; } if(rnd&&ties.length>1) return ties[Math.floor(Math.random()*ties.length)]; return best; }

  /* ---------------- Stockfish (jeu + analyse) ---------------- */
  var sf=null, sfReady=false, sfQueue=[], sfCur=null, sfScore=null, sfBest=null;
  function onSF(line){ if(typeof line!=='string') return;
    if(line.indexOf('uciok')>=0){ sfReady=true; try{ sf.postMessage('isready'); sf.postMessage('setoption name MultiPV value 1'); }catch(e){} return; }
    var sm=line.match(/score (cp|mate) (-?\d+)/); if(sm){ sfScore={type:sm[1],val:parseInt(sm[2],10)}; }
    var bm=line.match(/^bestmove\s+(\S+)/); if(bm){ sfBest=bm[1]; if(sfCur){ var cur=sfCur; sfCur=null; if(cur._to) clearTimeout(cur._to); cur.res({best:bm[1],score:sfScore}); } sfScore=null; pump(); } }
  function pump(){ if(sfCur||!sfQueue.length||!sfReady||!sf) return; sfCur=sfQueue.shift();
    try{ if(sfCur.skill!=null) sf.postMessage('setoption name Skill Level value '+sfCur.skill); sf.postMessage('position fen '+sfCur.fen); sf.postMessage('go '+sfCur.go); }catch(e){ var c=sfCur; sfCur=null; c.res(null); return; }
    sfCur._to=setTimeout(function(){ if(sfCur){ var c=sfCur; sfCur=null; c.res(null); pump(); } }, sfCur.tmo||6000); }
  function initSF(){ try{ sf=new Worker('sf.js'); sf.onmessage=function(e){ onSF((typeof e.data==='string')?e.data:(e.data&&e.data.data)||''); }; sf.onerror=function(){ sfReady=false; sf=null; }; sf.postMessage('uci'); }catch(e){ sf=null; sfReady=false; } }
  function sfGo(fen,go,skill,tmo){ return new Promise(function(res){ if(!sfReady||!sf){ res(null); return; } sfQueue.push({fen:fen,go:go,skill:skill,tmo:tmo,res:res}); pump(); }); }
  function sfMove(fen,opt){ return sfGo(fen,'movetime '+opt.mt,opt.skill,opt.mt+4000).then(function(r){ return r? r.best: null; }); }
  function cpFromScore(score,turn){ if(!score) return null; var cp=(score.type==='mate')?(score.val>0?100000-Math.abs(score.val):-100000+Math.abs(score.val)):score.val; return turn==='w'? cp : -cp; }
  function sfEval(fen){ return sfGo(fen,'depth 12',null,5000).then(function(r){ if(!r||!r.score) return null; return cpFromScore(r.score,(fen.split(' ')[1]||'w')); }); }
  /* Analyse d'UNE position pour le bilan : renvoie {best (uci), cp (pov Blancs), mate} */
  function sfAnalyse(fen,depth){ return sfGo(fen,'depth '+(depth||14),null,9000).then(function(r){ if(!r) return null; var turn=(fen.split(' ')[1]||'w'); return { best:r.best, cp: cpFromScore(r.score,turn), mate:(r.score&&r.score.type==='mate')?r.score.val:null }; }); }
  initSF();

  var LEVELS={'1':{skill:2,mt:200,depth:1},'2':{skill:8,mt:500,depth:2},'3':{skill:14,mt:900,depth:2},'4':{skill:20,mt:1400,depth:3}};
  var GLY={ classic:{w:{p:'♙',n:'♘',b:'♗',r:'♖',q:'♕',k:'♔'},b:{p:'♟',n:'♞',b:'♝',r:'♜',q:'♛',k:'♚'}},
            plein:{w:{p:'♟',n:'♞',b:'♝',r:'♜',q:'♛',k:'♚'},b:{p:'♟',n:'♞',b:'♝',r:'♜',q:'♛',k:'♚'}} };
  function pref(){ try{ return JSON.parse(localStorage.getItem('pb_chess_pref'))||{}; }catch(e){ return {}; } }
  function savePref(o){ try{ localStorage.setItem('pb_chess_pref',JSON.stringify(o)); }catch(e){} }
  var P=pref(); var theme=P.theme||'green', pcs=P.pcs||'classic', size=P.size||'m', voiceOn=(P.voice!==false);
  var g=new Chess(), human='w', lvl='4', sel=null, flip=false, thinking=false, over=false, lastMove=null, pendPromo=null;
  var boardEl=document.getElementById('chessBoard'), movesEl=document.getElementById('chessMoves'), barEl=document.getElementById('chessEvalFill'), barTxt=document.getElementById('chessEvalTxt');

  /* Flèches & surbrillances dessinées par l'élève (clic droit), + flèches d'analyse */
  var userArrows=[], userHi=[], autoArrows=[], autoBadge=null; // autoBadge={sq,cls}

  /* ---------------- Sons de coup (Web Audio, sans fichier) ---------------- */
  var actx=null, soundOn=(P.sound!==false);
  function ensureCtx(){ if(actx) return actx; try{ actx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ actx=null; } return actx; }
  function blip(freq,t0,dur,type,vol){ var c=actx; if(!c) return; var o=c.createOscillator(), gg=c.createGain(); o.type=type||'triangle'; o.frequency.setValueAtTime(freq,t0); gg.gain.setValueAtTime(0.0001,t0); gg.gain.exponentialRampToValueAtTime(vol||0.25,t0+0.008); gg.gain.exponentialRampToValueAtTime(0.0001,t0+dur); o.connect(gg); gg.connect(c.destination); o.start(t0); o.stop(t0+dur+0.03); }
  function noise(t0,dur,vol,cut){ var c=actx; if(!c) return; var n=c.createBufferSource(); var buf=c.createBuffer(1,Math.max(1,Math.floor(c.sampleRate*dur)),c.sampleRate); var d=buf.getChannelData(0); for(var i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2); n.buffer=buf; var gg=c.createGain(); gg.gain.value=vol||0.2; var f=c.createBiquadFilter(); f.type='lowpass'; f.frequency.value=cut||2600; n.connect(f); f.connect(gg); gg.connect(c.destination); n.start(t0); n.stop(t0+dur+0.03); }
  function playSound(kind){ if(!soundOn) return; var c=ensureCtx(); if(!c) return; if(c.state==='suspended'){ try{c.resume();}catch(e){} } var t=c.currentTime+0.001;
    if(kind==='capture'){ noise(t,0.10,0.28,2200); blip(150,t,0.13,'sawtooth',0.20); }
    else if(kind==='castle'){ blip(300,t,0.07,'triangle',0.17); blip(300,t+0.11,0.08,'triangle',0.17); }
    else if(kind==='check'){ blip(780,t,0.10,'square',0.15); blip(1050,t+0.10,0.13,'square',0.16); }
    else if(kind==='mate'){ blip(523,t,0.16,'sawtooth',0.20); blip(392,t+0.15,0.18,'sawtooth',0.20); blip(261,t+0.32,0.4,'sawtooth',0.22); }
    else { blip(320,t,0.075,'triangle',0.18); blip(190,t+0.016,0.09,'sine',0.12); }
  }
  function soundFor(m){ if(!m) return 'move'; var s=m.san||''; if(s.indexOf('#')>=0) return 'mate'; if(s.indexOf('+')>=0) return 'check'; if(m.captured||(m.flags&&m.flags.indexOf('e')>=0)) return 'capture'; if(m.flags&&(m.flags.indexOf('k')>=0||m.flags.indexOf('q')>=0)) return 'castle'; if(s==='O-O'||s==='O-O-O') return 'castle'; return 'move'; }

  /* ---------------- Styles (façon chess.com) ---------------- */
  (function injectCss(){ if(document.getElementById('pbChessCss')) return;
    var s=document.createElement('style'); s.id='pbChessCss';
    s.textContent=[
      '.chess-wrap-rel{position:relative;display:inline-block;touch-action:none}',
      '.chess-board{touch-action:none}',
      '.chess-arrows{position:absolute;inset:0;pointer-events:none;z-index:5}',
      '.sq .hi{position:absolute;inset:0;background:rgba(235,97,80,.55);pointer-events:none}',
      '.pc{pointer-events:none;position:relative;z-index:2;transition:transform .06s}',
      '.pc.drag{opacity:.25}',
      '.pc-ghost{position:fixed;z-index:99999;pointer-events:none;transform:translate(-50%,-50%);filter:drop-shadow(0 6px 8px rgba(0,0,0,.4));line-height:1}',
      '.sq.tgtx::before{content:"";position:absolute;inset:0;box-shadow:inset 0 0 0 4px rgba(255,255,255,.55);border-radius:4px}',
      /* badges de classification sur la case d\'arrivée */
      '.mv-badge{position:absolute;top:-9px;right:-9px;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 13px system-ui;color:#fff;z-index:6;box-shadow:0 2px 5px rgba(0,0,0,.35)}',
      '.cl-brilliant{background:#26c2a3}.cl-great{background:#5c8bb0}.cl-best{background:#7ea82a}.cl-excellent{background:#81b64c}.cl-good{background:#95a75c}.cl-book{background:#a88865}.cl-inacc{background:#f0c15c;color:#3a2f0b}.cl-mistake{background:#e08b2f}.cl-blunder{background:#ca3431}.cl-miss{background:#c0392b}.cl-forced{background:#9aa0a6}',
      /* panneau bilan */
      '.rev-panel{margin-top:14px;border:1px solid var(--border);border-radius:14px;background:var(--card);overflow:hidden}',
      '.rev-hd{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(135deg,#3a2f6b,#4b3fa7);color:#fff}',
      '.rev-hd b{font-family:Newsreader,serif;font-size:1.05rem}',
      '.rev-acc{display:flex;gap:10px;padding:12px 14px}',
      '.acc-card{flex:1;border:1px solid var(--border);border-radius:11px;padding:10px 12px;text-align:center;background:var(--surface,var(--card))}',
      '.acc-card .who{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}',
      '.acc-card .val{font:800 1.7rem/1.1 Newsreader,serif;margin-top:2px}',
      '.acc-w .val{color:#111}.acc-b .val{color:#111}',
      ':root[data-theme="dark"] .acc-w .val,:root:not([data-theme="light"]) .acc-w .val{color:#f4f2ff}',
      ':root[data-theme="dark"] .acc-b .val,:root:not([data-theme="light"]) .acc-b .val{color:#f4f2ff}',
      '.rev-graph{height:74px;padding:6px 10px}',
      '.rev-graph svg{width:100%;height:100%;overflow:visible}',
      '.rev-nav{display:flex;gap:6px;justify-content:center;align-items:center;padding:8px}',
      '.rev-nav button{width:40px;height:36px;border:1px solid var(--border);background:var(--surface,var(--card));border-radius:9px;cursor:pointer;font-size:1rem;color:inherit}',
      '.rev-nav button:hover{border-color:var(--royal)}',
      '.rev-nav .rev-play.on{background:var(--royal);color:#fff;border-color:var(--royal)}',
      '.rev-cur{padding:0 14px 14px}',
      '.rev-move{display:flex;align-items:center;gap:8px;font-weight:700;margin-bottom:6px}',
      '.rev-move .lab{font-size:1.02rem}',
      '.rev-badge{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:20px;color:#fff;font-size:.8rem;font-weight:700}',
      '.rev-comment{font-size:.95rem;line-height:1.55;background:var(--surface,var(--card));border:1px solid var(--border);border-left:3px solid var(--royal);border-radius:0 10px 10px 0;padding:10px 13px}',
      '.rev-comment .best{color:var(--royal);font-weight:700}',
      ':root[data-theme="dark"] .rev-comment .best,:root:not([data-theme="light"]) .rev-comment .best{color:var(--accent)}',
      '.rev-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}',
      '.rev-actions button{font-size:.82rem;padding:7px 12px;border-radius:9px;border:1px solid var(--border);background:var(--surface,var(--card));color:inherit;cursor:pointer}',
      '.rev-actions .spk.on{background:var(--royal);color:#fff;border-color:var(--royal)}',
      '.mv-list{max-height:160px;overflow:auto;font-family:JetBrains Mono,monospace;font-size:.8rem;line-height:1.9;padding:4px 2px}',
      '.mv-list .mv{cursor:pointer;padding:1px 5px;border-radius:5px}',
      '.mv-list .mv:hover{background:var(--surface-2,rgba(140,130,210,.12))}',
      '.mv-list .mv.on{background:var(--royal);color:#fff}',
      '.mv-list .ic{display:inline-block;width:14px;text-align:center}',
      '.rev-progress{height:6px;background:var(--surface-2,#eee);border-radius:6px;overflow:hidden;margin:4px 14px 12px}',
      '.rev-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#7c5cff,#4b3fa7);transition:width .2s}'
    ].join('');
    document.head.appendChild(s);
  })();

  /* ---------------- Board geometry ---------------- */
  function ranks(){ return flip?['1','2','3','4','5','6','7','8']:['8','7','6','5','4','3','2','1']; }
  function files(){ return flip?['h','g','f','e','d','c','b','a']:['a','b','c','d','e','f','g','h']; }
  function kingSq(color){ var b=g.board(); for(var r=0;r<8;r++)for(var c=0;c<8;c++){ var p=b[r][c]; if(p&&p.type==='k'&&p.color===color) return 'abcdefgh'[c]+(8-r); } return null; }
  var SIZES={s:'360px',m:'480px',l:'620px'};
  function applyStyle(){ if(!boardEl) return; boardEl.className='chess-board thb-'+theme+' pcs-'+pcs; boardEl.style.setProperty('--bs','min(94vw,'+(SIZES[size]||SIZES.m)+')'); }
  function glyphs(){ return pcs==='plein'?GLY.plein:GLY.classic; }
  /* colonne/rangée visuelles (0..7) d'une case, en tenant compte du retournement */
  function sqToXY(sq){ var f='abcdefgh'.indexOf(sq[0]), r=parseInt(sq[1],10)-1; var x=flip?(7-f):f; var y=flip?r:(7-r); return {x:x,y:y}; }

  var wrapEl=null, arrowsSvg=null, dragGhost=null, dragging=null;
  function ensureWrap(){
    if(wrapEl) return;
    // enrobe le plateau pour y superposer les flèches
    var parent=boardEl.parentNode;
    wrapEl=document.createElement('div'); wrapEl.className='chess-wrap-rel';
    parent.insertBefore(wrapEl,boardEl); wrapEl.appendChild(boardEl);
    arrowsSvg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    arrowsSvg.setAttribute('class','chess-arrows'); arrowsSvg.setAttribute('viewBox','0 0 8 8'); arrowsSvg.setAttribute('preserveAspectRatio','none');
    wrapEl.appendChild(arrowsSvg);
  }

  function render(){ if(!boardEl) return; applyStyle(); ensureWrap();
    boardEl.innerHTML=''; var b=g.board(); var tg= sel? g.moves({square:sel,verbose:true}).map(function(m){return m.to;}):[]; var chk=g.in_check()?kingSq(g.turn()):null; var rk=ranks(), fl=files(); var G=glyphs();
    rk.forEach(function(rank,ri){ fl.forEach(function(file,ci){ var sq=file+rank; var r=8-parseInt(rank,10), c='abcdefgh'.indexOf(file); var p=b[r][c];
      var cell=document.createElement('div'); cell.className='sq '+(((r+c)%2===0)?'lt':'dk'); cell.setAttribute('data-sq',sq);
      if(lastMove&&(lastMove.from===sq||lastMove.to===sq)) cell.classList.add('lm');
      if(userHi.indexOf(sq)>=0){ var hi=document.createElement('span'); hi.className='hi'; cell.appendChild(hi); }
      if(p){ var s=document.createElement('span'); s.className='pc '+(p.color==='w'?'pw':'pb'); s.textContent=G[p.color][p.type]; cell.appendChild(s); }
      if(sel===sq) cell.classList.add('sel'); if(tg.indexOf(sq)>=0) cell.classList.add(p&&p.color!==g.turn()?'tgtx':'tgt'); if(chk===sq) cell.classList.add('chk');
      if(autoBadge && autoBadge.sq===sq){ var bd=document.createElement('span'); bd.className='mv-badge cl-'+autoBadge.cls.key; bd.textContent=autoBadge.cls.icon; cell.appendChild(bd); }
      if(ci===0){ var rl=document.createElement('span'); rl.className='co rl'; rl.textContent=rank; cell.appendChild(rl); }
      if(ri===7){ var cl=document.createElement('span'); cl.className='co cl'; cl.textContent=file; cell.appendChild(cl); }
      boardEl.appendChild(cell); }); });
    drawArrows(); status(); updateBar(); }

  /* ---------------- Flèches (SVG) ---------------- */
  function arrowLine(from,to,color,op){ var a=sqToXY(from), b=sqToXY(to); var x1=a.x+0.5,y1=a.y+0.5,x2=b.x+0.5,y2=b.y+0.5;
    var dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy)||1; var ux=dx/len, uy=dy/len; var head=0.32; var x2b=x2-ux*head, y2b=y2-uy*head;
    var ns='http://www.w3.org/2000/svg'; var gEl=document.createElementNS(ns,'g'); gEl.setAttribute('opacity',op||0.85);
    var ln=document.createElementNS(ns,'line'); ln.setAttribute('x1',x1);ln.setAttribute('y1',y1);ln.setAttribute('x2',x2b);ln.setAttribute('y2',y2b); ln.setAttribute('stroke',color);ln.setAttribute('stroke-width',0.16);ln.setAttribute('stroke-linecap','round'); gEl.appendChild(ln);
    var px=-uy, py=ux; var w=0.2; var tip='M '+x2+' '+y2+' L '+(x2b+px*w)+' '+(y2b+py*w)+' L '+(x2b-px*w)+' '+(y2b-py*w)+' Z';
    var tri=document.createElementNS(ns,'path'); tri.setAttribute('d',tip); tri.setAttribute('fill',color); gEl.appendChild(tri); return gEl; }
  function drawArrows(){ if(!arrowsSvg) return; arrowsSvg.innerHTML='';
    autoArrows.forEach(function(a){ arrowsSvg.appendChild(arrowLine(a.from,a.to,a.color||'#7ea82a',0.9)); });
    userArrows.forEach(function(a){ arrowsSvg.appendChild(arrowLine(a.from,a.to,'#f0a020',0.8)); }); }

  /* ---------------- Pointer : glisser-déposer + clic + flèches ---------------- */
  var down=null;
  function sqUnder(x,y){ var el=document.elementFromPoint(x,y); if(!el) return null; var s=el.closest?el.closest('.sq'):null; return s?s.getAttribute('data-sq'):null; }
  function pieceAt(sq){ var b=g.board(); var r=8-parseInt(sq[1],10), c='abcdefgh'.indexOf(sq[0]); return b[r][c]; }
  function startGhost(sq,x,y){ var p=pieceAt(sq); if(!p) return; var G=glyphs(); dragGhost=document.createElement('div'); dragGhost.className='pc-ghost '+(p.color==='w'?'pw':'pb'); dragGhost.textContent=G[p.color][p.type];
    var bs=boardEl.getBoundingClientRect(); dragGhost.style.fontSize=(bs.width/9.2)+'px'; document.body.appendChild(dragGhost); moveGhost(x,y);
    var cell=boardEl.querySelector('.sq[data-sq="'+sq+'"] .pc'); if(cell) cell.classList.add('drag'); }
  function moveGhost(x,y){ if(dragGhost){ dragGhost.style.left=x+'px'; dragGhost.style.top=y+'px'; } }
  function endGhost(){ if(dragGhost){ dragGhost.remove(); dragGhost=null; } var d=boardEl.querySelector('.pc.drag'); if(d) d.classList.remove('drag'); }

  var reviewStep=function(d){};
  function onDown(e){ try{ var _c=ensureCtx(); if(_c&&_c.state==='suspended') _c.resume(); }catch(_){}
    var sq=sqUnder(e.clientX,e.clientY);
    if(reviewMode){ down={rev:true,x:e.clientX,y:e.clientY}; try{ wrapEl.setPointerCapture(e.pointerId); }catch(_){}; return; }
    if(e.button===2){ if(sq){ down={sq:sq,btn:2}; } e.preventDefault(); try{ wrapEl.setPointerCapture(e.pointerId); }catch(_){}; return; }
    // clic/tap gauche : efface flèches/surbrillances de l'élève
    if(userArrows.length||userHi.length){ userArrows=[]; userHi=[]; drawArrows(); render(); }
    if(thinking||over||pendPromo||g.turn()!==human){ return; }
    if(!sq) return;
    // NB : on ne change PAS la sélection ici ; le tap est traité au relâchement,
    // le glisser démarre dès qu'on bouge. Cela évite de sélectionner puis désélectionner.
    down={sq:sq,btn:0,x:e.clientX,y:e.clientY,moved:false};
    try{ wrapEl.setPointerCapture(e.pointerId); }catch(_){}
  }
  function onMove(e){ if(!down||down.rev||down.btn!==0) return; var dx=e.clientX-down.x, dy=e.clientY-down.y;
    if(!down.moved && (Math.abs(dx)>5||Math.abs(dy)>5)){ var p=pieceAt(down.sq); if(p&&p.color===human){ down.moved=true; sel=down.sq; render(); startGhost(down.sq,e.clientX,e.clientY); } }
    if(down.moved){ moveGhost(e.clientX,e.clientY); if(e.cancelable) e.preventDefault(); } }
  function onUp(e){ if(!down) return; var upSq=sqUnder(e.clientX,e.clientY);
    if(down.rev){ var dx=e.clientX-down.x, dy=e.clientY-down.y; if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){ reviewStep(dx<0?1:-1); } down=null; return; }
    if(down.btn===2){ if(upSq&&upSq!==down.sq){ toggleArrow(down.sq,upSq); } else if(upSq){ toggleHi(upSq); } down=null; return; }
    var wasDrag=down.moved; var src=down.sq; endGhost();
    if(wasDrag){ if(upSq && upSq!==src){ tryMove(src,upSq); } else { sel=null; render(); } down=null; return; }
    if(upSq){ clickSquare(upSq); }
    down=null;
  }
  function toggleArrow(from,to){ for(var i=0;i<userArrows.length;i++){ if(userArrows[i].from===from&&userArrows[i].to===to){ userArrows.splice(i,1); drawArrows(); return; } } userArrows.push({from:from,to:to}); drawArrows(); }
  function toggleHi(sq){ var i=userHi.indexOf(sq); if(i>=0) userHi.splice(i,1); else userHi.push(sq); render(); }
  function clickSquare(sq){ if(thinking||over||pendPromo||g.turn()!==human) return; var p=pieceAt(sq);
    if(sel){ if(sq===sel){ sel=null; render(); return; } var legal=g.moves({square:sel,verbose:true}).filter(function(m){return m.to===sq;}); if(legal.length){ tryMove(sel,sq); return; } if(p&&p.color===human){ sel=sq; render(); return; } sel=null; render(); return; }
    if(p&&p.color===human){ sel=sq; render(); } }
  function tryMove(from,to){ var legal=g.moves({square:from,verbose:true}).filter(function(m){return m.to===to;}); if(!legal.length){ sel=null; render(); return; } if(legal[0].promotion){ askPromo(from,to); return; } doMove({from:from,to:to}); }

  function bindPointer(){ ensureWrap(); wrapEl.style.touchAction='none'; boardEl.style.touchAction='none';
    wrapEl.addEventListener('contextmenu',function(e){ e.preventDefault(); });
    wrapEl.addEventListener('pointerdown',onDown);
    wrapEl.addEventListener('pointermove',onMove);
    wrapEl.addEventListener('pointerup',onUp);
    wrapEl.addEventListener('pointercancel',function(){ endGhost(); down=null; });
  }

  /* ---------------- Coups, promotion, IA ---------------- */
  function doMove(mo){ var m=g.move(mo); if(!m) return; lastMove={from:m.from,to:m.to}; sel=null; userArrows=[]; userHi=[]; render(); playSound(soundFor(m)); setTimeout(aiMove,150); }
  function askPromo(from,to){ pendPromo={from:from,to:to}; var ov=document.getElementById('promoPick'); if(!ov){ doMove({from:from,to:to,promotion:'q'}); pendPromo=null; return; } ov.hidden=false; }
  function aiMove(){ if(over||g.turn()===human) return; thinking=true; status(); var opt=LEVELS[lvl]||LEVELS['4']; var fen=g.fen();
    Promise.resolve().then(function(){ return sfReady? sfMove(fen,opt): null; }).then(function(uci){ var applied=false, mvObj=null;
      if(uci && uci.length>=4 && uci!=='(none)'){ var from=uci.slice(0,2),to=uci.slice(2,4),promo=uci.slice(4,5); var legal=g.moves({verbose:true}).some(function(m){return m.from===from&&m.to===to;}); if(legal){ var mo={from:from,to:to}; if(promo) mo.promotion=promo; try{ mvObj=g.move(mo); lastMove={from:from,to:to}; applied=true; }catch(e){} } }
      if(!applied){ var m=bestMoveLocal(g,opt.depth,opt.depth<2); if(m){ mvObj=g.move(m); lastMove={from:m.from,to:m.to}; applied=true; } }
      thinking=false; sel=null; render(); if(mvObj) playSound(soundFor(mvObj)); }); }
  function newGame(){ exitReview(); g=new Chess(); sel=null; over=false; thinking=false; lastMove=null; pendPromo=null; userArrows=[]; userHi=[]; autoBadge=null; autoArrows=[]; var ov=document.getElementById('promoPick'); if(ov) ov.hidden=true; if(sfReady){ try{ sf.postMessage('ucinewgame'); }catch(e){} } render(); if(g.turn()!==human) setTimeout(aiMove,300); }

  /* ---------------- Barre d'évaluation ---------------- */
  function setBar(cp){ if(!barEl) return; var pct=100/(1+Math.exp(-cp/350)); barEl.style.height=pct.toFixed(1)+'%'; if(barTxt){ if(Math.abs(cp)>=99000){ barTxt.textContent=(cp>0?'+M':'-M'); } else { var v=cp/100; barTxt.textContent=(v>=0?'+':'')+v.toFixed(1); } } }
  var barSeq=0;
  function updateBar(){ if(!barEl) return; var seq=++barSeq; if(sfReady && !reviewMode){ var fen=g.fen(); sfEval(fen).then(function(cp){ if(seq!==barSeq) return; setBar(cp==null?evalWhite(g):cp); }); setBar(evalWhite(g)); } else if(!reviewMode){ setBar(evalWhite(g)); } }

  function status(){ if(reviewMode) return; var s='';
    if(g.in_checkmate()){ over=true; s=(g.turn()===human?'Échec et mat — tu as perdu 😅 (rejoue !)':'Échec et mat — tu as gagné ! 🎉'); }
    else if(g.in_stalemate()){ over=true; s='Pat — partie nulle.'; }
    else if(g.insufficient_material()){ over=true; s='Nulle (matériel insuffisant).'; }
    else if(g.in_draw()){ over=true; s='Partie nulle.'; }
    else { over=false; s=(g.turn()===human?('À toi de jouer'+(g.in_check()?' — échec !':'')):('L\'ordinateur réfléchit'+(sfReady?' (Stockfish)':'')+'…')); }
    if(st) st.textContent=s; renderMoves();
    if(over && g.history().length>=2) offerReview();
  }
  function renderMoves(){ if(!movesEl) return; var h=g.history(); var o=''; for(var i=0;i<h.length;i+=2){ o+=(i/2+1)+'. '+h[i]+' '+(h[i+1]||'')+'   '; } movesEl.textContent=o||'La partie commence.'; }

  /* review functions defined in part 2 (declared with var to hoist reference) */
  var reviewMode=false;
  var offerReview=function(){}, exitReview=function(){};

  /* ---------------- Contrôles ---------------- */
  var bN=document.getElementById('chessNew'); if(bN) bN.addEventListener('click',newGame);
  var bU=document.getElementById('chessUndo'); if(bU) bU.addEventListener('click',function(){ if(thinking||reviewMode)return; g.undo(); if(g.turn()!==human){ g.undo(); } over=false; sel=null; lastMove=null; render(); });
  var bF=document.getElementById('chessFlip'); if(bF) bF.addEventListener('click',function(){ flip=!flip; render(); });
  var dL=document.getElementById('chessDiff'); if(dL) dL.addEventListener('change',function(){ lvl=dL.value||'4'; });
  var cC=document.getElementById('chessColor'); if(cC) cC.addEventListener('change',function(){ human=cC.value; flip=(human==='b'); newGame(); });
  var tS=document.getElementById('chessTheme'); if(tS){ tS.value=theme; tS.addEventListener('change',function(){ theme=tS.value; var o=pref(); o.theme=theme; savePref(o); render(); }); }
  var pS=document.getElementById('chessPieces'); if(pS){ pS.value=pcs; pS.addEventListener('change',function(){ pcs=pS.value; var o=pref(); o.pcs=pcs; savePref(o); render(); }); }
  var zS=document.getElementById('chessSize'); if(zS){ zS.value=size; zS.addEventListener('change',function(){ size=zS.value; var o=pref(); o.size=size; savePref(o); render(); }); }
  var pp=document.getElementById('promoPick'); if(pp){ Array.prototype.forEach.call(pp.querySelectorAll('button[data-p]'),function(btn){ btn.addEventListener('click',function(){ var pr=btn.getAttribute('data-p'); pp.hidden=true; if(pendPromo){ var m=pendPromo; pendPromo=null; doMove({from:m.from,to:m.to,promotion:pr}); } }); }); }

  bindPointer();
  render(); if(g.turn()!==human) setTimeout(aiMove,400);

  /* expose pour la partie 2 (bilan) */
  window.__PBchess={ get g(){return g;}, set g(v){g=v;}, Chess:Chess, render:function(){render();}, sfAnalyse:sfAnalyse, sfReady:function(){return sfReady;}, bestMoveLocal:bestMoveLocal, evalWhite:evalWhite,
    setBar:setBar, boardEl:boardEl, get flip(){return flip;}, sqToXY:sqToXY, glyphs:glyphs,
    setAuto:function(arrows,badge){ autoArrows=arrows||[]; autoBadge=badge||null; },
    setLastMove:function(lm){ lastMove=lm; }, getHuman:function(){return human;},
    get theme(){return theme;}, get pcs(){return pcs;},
    setReview:function(v){ reviewMode=v; }, isReview:function(){return reviewMode;},
    st:st, movesEl:movesEl,
    get voiceOn(){return voiceOn;}, set voiceOn(v){ voiceOn=v; var o=pref(); o.voice=v; savePref(o); },
    sound:playSound, soundFor:soundFor,
    onReviewHooks:function(o){ offerReview=o.offer; exitReview=o.exit; if(o.step) reviewStep=o.step; }
  };
})();

/* ============================================================================
   Partie 2 — BILAN DE PARTIE (analyse Stockfish, classification chess.com,
   précision %, graphe d'évaluation, navigation, commentaire pro + voix)
   ========================================================================== */
(function(){
  var API=window.__PBchess; if(!API) return;
  var Chess=API.Chess;
  var an=document.getElementById('chessAnalysis'); if(!an) return;
  var PV={p:100,n:300,b:300,r:500,q:900,k:99999};
  var PIECE_FR={p:'le pion',n:'le cavalier',b:'le fou',r:'la tour',q:'la dame',k:'le roi'};

  /* ---- classification ---- */
  var CLASS={
    brilliant:{key:'brilliant',label:'Brillant',icon:'✦',col:'#26c2a3'},
    best:{key:'best',label:'Meilleur',icon:'★',col:'#7ea82a'},
    excellent:{key:'excellent',label:'Excellent',icon:'✓',col:'#81b64c'},
    good:{key:'good',label:'Bon',icon:'✓',col:'#95a75c'},
    book:{key:'book',label:'Théorie',icon:'♞',col:'#a88865'},
    forced:{key:'forced',label:'Forcé',icon:'■',col:'#9aa0a6'},
    inacc:{key:'inacc',label:'Imprécision',icon:'?!',col:'#f0c15c'},
    mistake:{key:'mistake',label:'Erreur',icon:'?',col:'#e08b2f'},
    miss:{key:'miss',label:'Occasion manquée',icon:'⊘',col:'#c0392b'},
    blunder:{key:'blunder',label:'Gaffe',icon:'??',col:'#ca3431'}
  };
  function winPct(cp){ cp=Math.max(-2000,Math.min(2000,cp)); return 50+50*(2/(1+Math.exp(-0.00368208*cp))-1); }
  function fmtEval(cpW){ if(cpW>=99000) return '#'; if(cpW<=-99000) return '#'; var v=cpW/100; return (v>=0?'+':'')+v.toFixed(1); }

  function uciToSan(fen,uci){ if(!uci||uci.length<4) return null; try{ var t=new Chess(fen); var m=t.move({from:uci.slice(0,2),to:uci.slice(2,4),promotion:uci.slice(4,5)||undefined}); return m?m.san:null; }catch(e){ return null; } }
  function isSac(fen,mv){ try{ var t=new Chess(fen); var m=t.move({from:mv.from,to:mv.to,promotion:mv.promotion}); if(!m) return false; var mvVal=PV[m.piece]; if(mvVal<300) return false; var caps=t.moves({verbose:true}).filter(function(x){return x.to===m.to && x.captured;}); return caps.some(function(x){ return PV[x.piece] < mvVal; }); }catch(e){ return false; } }

  function classify(before, after, bestUci, played, mover, ply, legalCount){
    var bestForMover = mover==='w'? before : -before;
    var playedForMover = mover==='w'? after : -after;
    var cpl = Math.max(0, bestForMover - playedForMover);
    var isBest = bestUci && (played.from+played.to)===(bestUci.slice(0,2)+bestUci.slice(2,4));
    var cl;
    if(legalCount===1){ cl=CLASS.forced; }
    else if(isBest && bestForMover>=40 && isSac(played._fenBefore, played)){ cl=CLASS.brilliant; }
    else if(ply<10 && cpl<25){ cl=CLASS.book; }
    else if(bestForMover>=200 && cpl>=150){ cl=CLASS.miss; }
    else if(isBest){ cl=CLASS.best; }
    else if(cpl<=20){ cl=CLASS.excellent; }
    else if(cpl<=55){ cl=CLASS.good; }
    else if(cpl<=110){ cl=CLASS.inacc; }
    else if(cpl<=260){ cl=CLASS.mistake; }
    else { cl=CLASS.blunder; }
    return {cl:cl, cpl:Math.round(cpl), isBest:isBest, bestForMover:bestForMover, playedForMover:playedForMover};
  }
  function accuracy(winBefore,winAfter){ var d=Math.max(0,winBefore-winAfter); var a=103.1668*Math.exp(-0.04354*d)-3.1669; return Math.max(0,Math.min(100,a)); }

  /* ---- commentaire type entraîneur GM (FR, développé) ---- */
  function pieceName(t){ return {p:'le pion',n:'le cavalier',b:'le fou',r:'la tour',q:'la dame',k:'le roi'}[t]||'la pièce'; }
  function sideName(mv){ return mv==='w'?'les Blancs':'les Noirs'; }
  function povEval(row){ return row.mover==='w'?row.afterW:-row.afterW; }
  function evalTxtWhite(cpW){ if(cpW>=99000) return 'mat pour les Blancs'; if(cpW<=-99000) return 'mat pour les Noirs'; var v=cpW/100; return (v>=0?'+':'')+v.toFixed(1)+' pour '+(cpW>=0?'les Blancs':'les Noirs'); }
  function assessWord(pov){ if(pov>=350) return 'gagnante'; if(pov>=140) return 'nettement à ton avantage'; if(pov>=45) return 'légèrement meilleure'; if(pov>-45) return 'équilibrée'; if(pov>-140) return 'un peu inconfortable'; if(pov>-350) return 'difficile'; return 'quasi perdue'; }
  function countPieces(fen){ var bd=(fen||'').split(' ')[0]; return (bd.match(/[nbrqNBRQ]/g)||[]).length; }
  function phaseOf(row){ if(row.idx<14) return "l'ouverture"; return countPieces(row.fenAfter)<=6 ? 'la finale' : 'le milieu de partie'; }
  function pick(arr,seed){ return arr[Math.abs(seed|0)%arr.length]; }
  function actionPhrase(m,mv){
    if(m.san==='O-O') return "roquent du petit côté, mettent le roi à l'abri et activent la tour";
    if(m.san==='O-O-O') return 'roquent du grand côté et centralisent la tour';
    var who=pieceName(m.piece);
    if(m.captured) return 'capturent '+pieceName(m.captured)+' en '+m.to;
    if(m.promotion) return 'poussent le pion et le promeuvent en dame en '+m.to;
    var back=(mv==='w'&&m.from[1]==='1')||(mv==='b'&&m.from[1]==='8');
    if((m.piece==='n'||m.piece==='b')&&back) return 'développent '+who+' en '+m.to;
    if(m.piece==='p'&&['e4','d4','e5','d5','c4','c5','d6','e6'].indexOf(m.to)>=0) return 'renforcent le centre avec '+who+' en '+m.to;
    if(m.piece==='r'&&(m.to[0]==='d'||m.to[0]==='e')) return "installent "+who+" sur une colonne centrale ("+m.to+")";
    if(m.piece==='q') return 'activent '+who+' en '+m.to;
    if(m.piece==='k') return 'déplacent '+who+' en '+m.to;
    return 'jouent '+who+' en '+m.to;
  }
  function comment(row){ var m=row.played; var cl=row.cl.key; var best=row.bestSan?('<span class="best">'+esc(row.bestSan)+'</span>'):'';
    var side=sideName(row.mover); var Side=side.charAt(0).toUpperCase()+side.slice(1); var pov=povEval(row); var evW=evalTxtWhite(row.afterW); var ph=phaseOf(row); var act=actionPhrase(m,row.mover);
    var check=(m.san.indexOf('+')>=0), mate=(m.san.indexOf('#')>=0);
    if(row.san==null) row.san=m.san;
    if(mate) return 'Échec et mat ! '+Side+' '+act+' et concluent la partie. Une finition nette : la coordination des pièces a fait la différence.';
    var head=Side+' '+act+(check?', avec échec':'')+'.';
    if(cl==='book') return head+' '+pick(["Un coup d'ouverture connu, dans les grands principes : contrôle du centre, développement rapide et sécurité du roi.","Coup de théorie : on développe les pièces mineures et on prépare le roque plutôt que de sortir la dame trop tôt.","Entrée d'ouverture classique — priorité à un développement harmonieux et à la lutte pour le centre."], row.idx);
    if(cl==='forced') return head+" Coup forcé : c'était l'unique réponse pour parer la menace et rester dans la partie.";
    if(cl==='brilliant') return 'Coup brillant ! '+Side+' '+act+'. '+pick(["Un sacrifice audacieux que le moteur valide : le matériel donné est largement compensé par l'initiative et l'attaque sur le roi.","Une idée de grand maître — on rend du matériel pour ouvrir les lignes et prendre l'adversaire de vitesse."], row.idx)+' La position reste '+assessWord(pov)+' ('+evW+').';
    if(cl==='best') return head+' '+pick(["C'est précisément le meilleur coup : il suit le plan logique de la position et ne laisse aucune contre-chance.","Le choix d'un maître : ce coup améliore ta pièce la moins active tout en maintenant la pression.","Coup de premier ordre — il allie sécurité et activité, exactement ce que réclame "+ph+"."], row.idx)+' La position est '+assessWord(pov)+' ('+evW+').';
    if(cl==='excellent') return head+' '+pick(["Excellent : tu restes fidèle au plan et gardes toutes tes options ouvertes.","Un très bon coup, dans l'esprit de la position, qui conserve l'harmonie de tes pièces."], row.idx)+' Évaluation : '+evW+'.';
    if(cl==='good') return head+' Un coup solide qui ne gâche rien. '+pick(["Tu pourrais viser un peu plus d'activité, mais la position reste saine.","Bon réflexe ; pense toujours à améliorer ta pièce la moins bien placée."], row.idx)+' ('+evW+').';
    if(cl==='inacc') return head+' Petite imprécision : '+pick(['cela relâche un peu la pression.',"tu perds une nuance dans l'ordre des coups.","un temps précieux s'échappe."], row.idx)+(best?(' Plus précis était '+best+", qui gardait davantage l'initiative."):'')+' La position devient '+assessWord(pov)+' ('+evW+').';
    if(cl==='miss') return head+" Occasion manquée : tu étais en mesure de prendre un avantage décisif. "+(best?(''+best+' était bien plus fort'):'Une ressource plus énergique existait')+" — après ce coup l'avantage retombe ("+evW+"). Quand tu domines, cherche toujours le coup le plus forçant.";
    if(cl==='mistake') return head+' Erreur : '+pick(["ce coup dégrade ta position et offre du contre-jeu à l'adversaire.",'tu laisses passer une menace adverse importante.','la coordination de tes pièces en souffre.'], row.idx)+(best?(' Il fallait jouer '+best+', qui gardait le contrôle.'):'')+' La position est désormais '+assessWord(pov)+' ('+evW+').';
    if(cl==='blunder') return head+' Grave erreur : '+pick(['ce coup coûte du matériel ou permet une attaque décisive.',"l'adversaire dispose d'une réponse très forte.",'une tactique renverse complètement l\'évaluation.'], row.idx)+(best?(' Il fallait absolument '+best+'.'):'')+" L'évaluation chute à "+evW+'. Avant de jouer, vérifie systématiquement les échecs, les prises et les menaces adverses.';
    return head+' '+evW+'.';
  }

  /* ---- voix (français) : voix serveur /api/tts (fiable sur mobile) + repli navigateur ---- */
  var synth=window.speechSynthesis, ttsAudio=null;
  function browserSpeak(text){ try{ if(!synth) return; synth.cancel(); var u=new SpeechSynthesisUtterance(text); u.lang='fr-FR'; u.rate=1.0; var vs=synth.getVoices()||[]; var v=vs.filter(function(x){return /^fr/i.test(x.lang);}); var gg=v.filter(function(x){return /google/i.test(x.name);})[0]; if(gg)u.voice=gg; else if(v[0])u.voice=v[0]; synth.speak(u); }catch(e){} }
  function speak(text){ if(!API.voiceOn) return; text=String(text==null?'':text).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim(); if(!text) return; stopVoice();
    try{ ttsAudio=new Audio('/api/tts?lang=fr&text='+encodeURIComponent(text.slice(0,650)));
      ttsAudio.onerror=function(){ browserSpeak(text); };
      var pr=ttsAudio.play(); if(pr&&pr.catch) pr.catch(function(){ browserSpeak(text); });
    }catch(e){ browserSpeak(text); } }
  function stopVoice(){ try{ if(ttsAudio){ ttsAudio.pause(); ttsAudio=null; } }catch(e){} try{ if(synth) synth.cancel(); }catch(e){} }

  /* ---- état bilan ---- */
  var rows=[], evalsW=[], wpW=[], curIdx=0, autoTimer=null, realPGN=null;
  function stdev(a){ if(a.length<2) return 0; var m=a.reduce(function(x,y){return x+y;},0)/a.length; var v=a.reduce(function(s,y){return s+(y-m)*(y-m);},0)/a.length; return Math.sqrt(v); }

  /* ---- barre de navigation FIXE (toujours visible, aucun défilement, tous appareils) ---- */
  (function(){ if(document.getElementById('pbRevCss'))return; var s=document.createElement('style'); s.id='pbRevCss'; s.textContent=[
    '.rev-fixed{position:fixed;left:0;right:0;bottom:0;z-index:120;background:var(--card,#fff);border-top:1px solid var(--border);box-shadow:0 -8px 26px rgba(0,0,0,.20);padding:8px 10px calc(8px + env(safe-area-inset-bottom,0px));display:none}',
    '.rev-fixed.on{display:block;animation:rfUp .18s ease}',
    '@keyframes rfUp{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}',
    '.rev-fixed .rf-in{max-width:640px;margin:0 auto}',
    '.rf-top{display:flex;align-items:center;gap:8px;margin-bottom:6px}',
    '.rf-move{font-weight:800;font-size:.95rem;white-space:nowrap}',
    '.rf-badge{display:inline-flex;align-items:center;gap:5px;padding:2px 9px;border-radius:20px;color:#fff;font-size:.74rem;font-weight:700;white-space:nowrap}',
    '.rf-spk{border:1px solid var(--border);background:var(--surface,var(--card));border-radius:9px;height:30px;min-width:38px;padding:0 8px;cursor:pointer;font-size:.9rem;color:inherit;margin-left:auto}',
    '.rf-spk.on{background:var(--royal);color:#fff;border-color:var(--royal)}',
    '.rf-cmt{font-size:.84rem;line-height:1.4;color:var(--muted);max-height:2.9em;overflow:hidden;margin-bottom:7px}',
    '.rf-cmt .best{color:var(--royal);font-weight:700}',
    '.rf-nav{display:flex;gap:6px;justify-content:center}',
    '.rf-nav button{flex:1;max-width:96px;height:44px;border:1px solid var(--border);background:var(--surface,var(--card));border-radius:11px;font-size:1.2rem;color:inherit;cursor:pointer}',
    '.rf-nav button:hover{border-color:var(--royal)}.rf-nav button:active{transform:scale(.95)}',
    '.rf-nav .rf-play.on{background:var(--royal);color:#fff;border-color:var(--royal)}',
    '@media(min-width:900px){.rev-fixed{left:auto;right:22px;bottom:22px;width:430px;border:1px solid var(--border);border-radius:16px}}',
    'body.rev-open{padding-bottom:160px}'
  ].join(''); document.head.appendChild(s); })();
  var fixedEl=null;
  function buildFixedBar(){ if(fixedEl) return; fixedEl=document.createElement('div'); fixedEl.className='rev-fixed';
    fixedEl.innerHTML='<div class="rf-in"><div class="rf-top"><span class="rf-move" id="rfMove"></span><span class="rf-badge" id="rfBadge"></span><button class="rf-spk" id="rfSpk" title="Voix">🔊</button></div>'
      +'<div class="rf-cmt" id="rfCmt"></div>'
      +'<div class="rf-nav"><button data-n="0" title="Début">⇤</button><button data-n="-1" title="Précédent (←)">‹</button><button class="rf-play" id="rfPlay" title="Lecture (espace)">▶</button><button data-n="1" title="Suivant (→)">›</button><button data-n="99999" title="Fin">⇥</button></div></div>';
    document.body.appendChild(fixedEl); document.body.classList.add('rev-open');
    fixedEl.querySelectorAll('.rf-nav button[data-n]').forEach(function(b){ b.addEventListener('click',function(){ var d=parseInt(b.getAttribute('data-n'),10); if(d===0) goTo(0); else if(d===99999) goTo(rows.length-1); else goTo(curIdx+d); }); });
    fixedEl.querySelector('#rfPlay').addEventListener('click',togglePlay);
    fixedEl.querySelector('#rfSpk').addEventListener('click',function(){ API.voiceOn=!API.voiceOn; if(!API.voiceOn) stopVoice(); updateFixedBar(); if(API.voiceOn&&rows[curIdx]) speak(comment(rows[curIdx])); });
    setTimeout(function(){ if(fixedEl) fixedEl.classList.add('on'); },10);
  }
  function updateFixedBar(){ if(!fixedEl) return; var r=rows[curIdx]; if(!r) return; var num=Math.floor(curIdx/2)+1; var side=(r.mover==='w')?(num+'. '):(num+'… ');
    fixedEl.querySelector('#rfMove').textContent=side+r.san;
    var bd=fixedEl.querySelector('#rfBadge'); bd.textContent=r.cl.icon+' '+r.cl.label; bd.style.background=r.cl.col; bd.style.color=(r.cl.key==='inacc'?'#3a2f0b':'#fff');
    fixedEl.querySelector('#rfCmt').innerHTML=comment(r);
    var sp=fixedEl.querySelector('#rfSpk'); sp.classList.toggle('on',API.voiceOn);
    var pl=fixedEl.querySelector('#rfPlay'); pl.classList.toggle('on',!!autoTimer); pl.textContent=autoTimer?'❙❙':'▶';
  }
  function removeFixedBar(){ if(fixedEl){ fixedEl.remove(); fixedEl=null; } document.body.classList.remove('rev-open'); }
  document.addEventListener('keydown',function(e){ if(!API.isReview()||!rows.length) return; if(e.key==='ArrowLeft'){ goTo(curIdx-1); e.preventDefault(); } else if(e.key==='ArrowRight'){ goTo(curIdx+1); e.preventDefault(); } else if(e.key==='Home'){ goTo(0); e.preventDefault(); } else if(e.key==='End'){ goTo(rows.length-1); e.preventDefault(); } else if(e.key===' '){ togglePlay(); e.preventDefault(); } });

  function offerReview(){ if(API.isReview()) return; if(document.getElementById('revStart')) return;
    an.innerHTML='<div style="text-align:center;padding:12px"><button id="revStart" class="btn ask" style="font-size:.95rem;padding:10px 18px">✦ Voir le bilan de la partie</button><div class="src-note" style="margin-top:6px">Analyse complète coup par coup, comme sur chess.com.</div></div>';
    document.getElementById('revStart').addEventListener('click',startReview);
  }
  function exitReview(){ stopVoice(); if(autoTimer){clearInterval(autoTimer);autoTimer=null;} API.setReview(false); API.setAuto([],null); removeFixedBar(); }

  function startReview(){
    var g=API.g; var hist=g.history({verbose:true}); if(hist.length<2){ an.innerHTML='<div class="src-note">Joue quelques coups, puis lance le bilan.</div>'; return; }
    try{ realPGN=g.pgn(); }catch(e){ realPGN=null; }
    // positions FEN 0..n
    var sim=new Chess(); var fens=[sim.fen()]; hist.forEach(function(m){ sim.move({from:m.from,to:m.to,promotion:m.promotion}); fens.push(sim.fen()); });
    an.innerHTML='<div class="rev-panel"><div class="rev-hd"><b>✦ Bilan de la partie</b></div><div class="rev-progress"><i id="revBar"></i></div><div class="src-note" style="padding:0 14px 12px" id="revMsg">Analyse par Stockfish… 0%</div></div>';
    var A=new Array(fens.length), k=0;
    var useSF=API.sfReady();
    var RDEPTH = fens.length>60?11:(fens.length>36?12:14); // profondeur adaptée à la longueur
    function analyseNext(){
      if(k>=fens.length){ done(); return; }
      var fen=fens[k];
      var pr = useSF ? API.sfAnalyse(fen,RDEPTH) : Promise.resolve(localAnalyse(fen));
      pr.then(function(res){
        if(!res){ res=localAnalyse(fen); }
        A[k]=res; k++;
        var pc=Math.round(k/fens.length*100); var b=document.getElementById('revBar'); if(b)b.style.width=pc+'%'; var m=document.getElementById('revMsg'); if(m)m.textContent='Analyse par '+(useSF?'Stockfish':'le moteur')+'… '+pc+'%';
        setTimeout(analyseNext, 0);
      });
    }
    function localAnalyse(fen){ var t=new Chess(fen); var mover=t.turn(); var bm=API.bestMoveLocal(t,2,false); var best=bm?(bm.from+bm.to+(bm.promotion||'')):null; var cpW=API.evalWhite(t); return {best:best, cp:cpFromLocal(t)}; }
    function cpFromLocal(t){ return API.evalWhite(t); }
    analyseNext();

    function done(){
      rows=[]; evalsW=[]; for(var q=0;q<A.length;q++){ evalsW.push(A[q]?A[q].cp:0); } wpW=evalsW.map(function(cp){return winPct(cp);});
      for(var j=0;j<hist.length;j++){
        var before=A[j]?A[j].cp:0, after=A[j+1]?A[j+1].cp:0; var mover=(j%2===0)?'w':'b';
        var fenBefore=fens[j]; var legalCount=(function(){ try{ return new Chess(fenBefore).moves().length; }catch(e){ return 2; } })();
        var played=hist[j]; played._fenBefore=fenBefore;
        var bestUci=A[j]?A[j].best:null; var bestSan=bestUci?uciToSan(fenBefore,bestUci):null;
        var info=classify(before,after,bestUci,played,mover,j,legalCount);
        var winB=winPct(info.bestForMover), winA=winPct(info.playedForMover);
        rows.push({idx:j, mover:mover, san:played.san, played:played, cl:info.cl, cpl:info.cpl, isBest:info.isBest,
                   bestUci:bestUci, bestSan:bestSan, beforeW:before, afterW:after, acc:accuracy(winB,winA), fenAfter:fens[j+1]});
      }
      API.setReview(true);
      drawPanel();
      buildFixedBar();
      try{ API.boardEl.scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){}
      goTo(rows.length-1);
    }
  }

  /* Précision façon chess.com/lichess : moyenne pondérée par la volatilité ET moyenne
     harmonique (les gaffes pèsent bien plus, la note ne reste pas artificiellement haute). */
  function sideAccuracy(color){
    var idxs=[]; for(var i=0;i<rows.length;i++){ if(rows[i].mover===color) idxs.push(i); }
    if(!idxs.length) return 100;
    var accs=idxs.map(function(i){ return Math.max(0,Math.min(100,rows[i].acc)); });
    var weights=idxs.map(function(i){ var a=Math.max(0,i-2), b=Math.min(wpW.length-1,i+3); var win=[]; for(var k=a;k<=b;k++) win.push(wpW[k]); return Math.max(0.5,Math.min(12,stdev(win))); });
    var sw=0,swa=0; for(var j=0;j<accs.length;j++){ sw+=weights[j]; swa+=accs[j]*weights[j]; }
    var weighted = sw>0 ? swa/sw : (accs.reduce(function(x,y){return x+y;},0)/accs.length);
    var harm = accs.length / accs.reduce(function(s,a){ return s + 1/Math.max(1,a); }, 0);
    return Math.round(((weighted+harm)/2)*10)/10;
  }
  function counts(color){ var c={}; rows.filter(function(r){return r.mover===color;}).forEach(function(r){ c[r.cl.key]=(c[r.cl.key]||0)+1; }); return c; }

  function drawPanel(){
    var accW=sideAccuracy('w'), accB=sideAccuracy('b');
    var h='<div class="rev-panel">';
    h+='<div class="rev-hd"><b>✦ Bilan de la partie</b><span class="src-note" style="color:#e8e4ff;margin-left:auto">'+rows.length+' coups analysés</span></div>';
    h+='<div class="rev-acc"><div class="acc-card acc-w"><div class="who">Blancs</div><div class="val">'+accW.toFixed(1)+'</div><div class="who">précision</div></div>'
      +'<div class="acc-card acc-b"><div class="who">Noirs</div><div class="val">'+accB.toFixed(1)+'</div><div class="who">précision</div></div></div>';
    h+='<div class="rev-graph">'+evalGraph()+'</div>';
    h+='<div class="rev-nav"><button data-nav="0" title="Début">⇤</button><button data-nav="-1" title="Précédent">‹</button>'
      +'<button class="rev-play'+(0?' on':'')+'" id="revPlay" title="Lecture">▶</button>'
      +'<button data-nav="1" title="Suivant">›</button><button data-nav="99999" title="Fin">⇥</button></div>';
    h+='<div class="rev-cur" id="revCur"></div>';
    h+='<div class="mv-list" id="revList"></div>';
    h+='<div style="text-align:center;padding:8px 14px 14px"><button class="btn" id="revExit">Quitter le bilan</button></div>';
    h+='</div>';
    an.innerHTML=h;
    an.querySelectorAll('.rev-nav button[data-nav]').forEach(function(b){ b.addEventListener('click',function(){ var d=parseInt(b.getAttribute('data-nav'),10); if(d===0) goTo(0); else if(d===99999) goTo(rows.length-1); else goTo(Math.max(0,Math.min(rows.length-1,curIdx+d))); }); });
    document.getElementById('revPlay').addEventListener('click',togglePlay);
    document.getElementById('revExit').addEventListener('click',function(){ exitReview(); if(realPGN){ try{ var ng=new Chess(); ng.load_pgn(realPGN); API.g=ng; }catch(e){} } var last=rows[rows.length-1]; API.setLastMove(last?{from:last.played.from,to:last.played.to}:null); API.render(); offerReview(); });
    drawList();
  }

  function evalGraph(){ var n=evalsW.length; if(n<2) return ''; var W=100,H=40; var pts=[]; for(var i=0;i<n;i++){ var cp=Math.max(-800,Math.min(800,evalsW[i])); var x=(i/(n-1))*W; var y=H/2 - (cp/800)*(H/2); pts.push(x.toFixed(1)+','+y.toFixed(1)); }
    var area='0,'+(H/2)+' '+pts.join(' ')+' '+W+','+(H/2);
    return '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none"><defs><linearGradient id="revg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f3ec"/><stop offset="1" stop-color="#9aa0a6" stop-opacity="0.15"/></linearGradient></defs>'
      +'<line x1="0" y1="'+(H/2)+'" x2="'+W+'" y2="'+(H/2)+'" stroke="#8884" stroke-width="0.5"/>'
      +'<polyline points="'+pts.join(' ')+'" fill="none" stroke="#7c5cff" stroke-width="1.2"/>'
      +'<circle id="revDot" r="1.8" fill="#4b3fa7" cx="0" cy="'+(H/2)+'"/></svg>'; }

  function drawList(){ var el=document.getElementById('revList'); if(!el) return; var h='';
    for(var i=0;i<rows.length;i++){ var r=rows[i]; var num=Math.floor(i/2)+1; var side=(r.mover==='w')?(num+'.'):(num+'…');
      h+='<span class="mv'+(i===curIdx?' on':'')+'" data-i="'+i+'"><span class="ic" style="color:'+r.cl.col+'">'+r.cl.icon+'</span> '+side+' '+esc(r.san)+'</span> '; }
    el.innerHTML=h;
    el.querySelectorAll('.mv').forEach(function(b){ b.addEventListener('click',function(){ goTo(parseInt(b.getAttribute('data-i'),10)); }); });
  }

  function goTo(i){ if(!rows.length) return; curIdx=Math.max(0,Math.min(rows.length-1,i)); var r=rows[curIdx];
    // position du plateau APRÈS le coup courant
    try{ API.g=new Chess(r.fenAfter); }catch(e){}
    API.setLastMove({from:r.played.from,to:r.played.to});
    var autoAr=[{from:r.played.from,to:r.played.to,color:'#3b82f6'}];
    if(r.bestUci && !r.isBest){ autoAr.push({from:r.bestUci.slice(0,2),to:r.bestUci.slice(2,4),color:'#7ea82a'}); }
    API.setAuto(autoAr, {sq:r.played.to, cls:r.cl});
    API.render(); API.setBar(r.afterW>=99000?99000:(r.afterW<=-99000?-99000:r.afterW));
    try{ API.sound(API.soundFor(r.played)); }catch(e){}
    // curseur du graphe
    var dot=document.getElementById('revDot'); if(dot){ var x=(curIdx+1)/(evalsW.length-1)*100; var cp=Math.max(-800,Math.min(800,evalsW[curIdx+1]||0)); dot.setAttribute('cx',x.toFixed(1)); dot.setAttribute('cy',(20-(cp/800)*20).toFixed(1)); }
    // fiche du coup
    var cur=document.getElementById('revCur'); if(cur){ var num=Math.floor(curIdx/2)+1; var side=(r.mover==='w')?(num+'. ') : (num+'… ');
      cur.innerHTML='<div class="rev-move"><span class="lab">'+side+esc(r.san)+'</span> <span class="rev-badge" style="background:'+r.cl.col+(r.cl.key==='inacc'?';color:#3a2f0b':'')+'">'+r.cl.icon+' '+r.cl.label+'</span></div>'
        +'<div class="rev-comment">'+comment(r)+'</div>'
        +'<div class="rev-actions"><button class="spk'+(API.voiceOn?' on':'')+'" id="revSpk">🔊 Voix '+(API.voiceOn?'activée':'coupée')+'</button>'
        +'<button id="revDeep">🧠 Explication approfondie (IA)</button></div>';
      document.getElementById('revSpk').addEventListener('click',function(){ API.voiceOn=!API.voiceOn; if(!API.voiceOn) stopVoice(); this.classList.toggle('on',API.voiceOn); this.textContent='🔊 Voix '+(API.voiceOn?'activée':'coupée'); if(API.voiceOn) speak(comment(r)); });
      document.getElementById('revDeep').addEventListener('click',function(){ var q='Explique ce coup d\'échecs comme un entraîneur professionnel, en 3-4 phrases. Position (FEN) avant le coup : '+r.played._fenBefore+'. Coup joué : '+r.san+(r.bestSan?('. Le moteur préférait : '+r.bestSan):'')+'. Donne l\'idée, l\'erreur éventuelle et le meilleur plan.'; if(window.PB_ASK) window.PB_ASK(q); }); }
    // liste
    var el=document.getElementById('revList'); if(el){ el.querySelectorAll('.mv').forEach(function(b){ b.classList.toggle('on', parseInt(b.getAttribute('data-i'),10)===curIdx); }); var on=el.querySelector('.mv.on'); if(on){ try{ var lr=el.getBoundingClientRect(), er=on.getBoundingClientRect(); el.scrollTop += (er.top-lr.top) - lr.height/2 + er.height/2; }catch(e){} } }
    // barre fixe + voix
    updateFixedBar();
    speak(comment(r));
  }
  function setPlayBtn(){ var btn=document.getElementById('revPlay'); if(btn){ btn.classList.toggle('on',!!autoTimer); btn.textContent=autoTimer?'❙❙':'▶'; } updateFixedBar(); }
  function togglePlay(){ if(autoTimer){ clearInterval(autoTimer); autoTimer=null; setPlayBtn(); return; }
    if(curIdx>=rows.length-1) curIdx=-1;
    autoTimer=setInterval(function(){ if(curIdx>=rows.length-1){ clearInterval(autoTimer); autoTimer=null; setPlayBtn(); return; } goTo(curIdx+1); }, 3600);
    setPlayBtn(); goTo(curIdx+1);
  }

  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // bouton "Analyser la partie" existant -> lance le bilan
  var bA=document.getElementById('chessAnalyze'); if(bA){ bA.textContent='✦ Bilan de la partie'; bA.addEventListener('click',startReview); }
  API.onReviewHooks({offer:offerReview, exit:exitReview, step:function(d){ goTo(curIdx+d); }});
  // pré-charge les voix
  try{ if(window.speechSynthesis){ window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged=function(){}; } }catch(e){}
})();

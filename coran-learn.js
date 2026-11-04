/* ===================================================================
   Brio — Espace d'apprentissage du Coran (سورة يوسف)
   Rend la page plus vivante et pédagogique :
     • suivi de progression + points (راجعت / اختبار)،
     • وضع الحفظ : إخفاء الكلمات وكشفها تدريجياً لاختبار الحفظ،
     • اختبار فهمٍ قصير لكل مقطع (اختيار من متعدّد).
   Autonome, respectueux du RTL, dégrade proprement si النص لم يُحمَّل.
   =================================================================== */
(function () {
  'use strict';
  var secs = document.querySelectorAll('.ysec');
  if (!secs.length) return;

  /* ---------------- اختبارات الفهم (مقطع تلو الآخر) ---------------- */
  var QUIZ = {
    1:   { q: "بأيِّ وصفٍ وصف اللهُ قصةَ يوسف في مطلع السورة؟", o: ["أحسن القصص", "أعجب الأخبار", "أصدق الحديث"], a: 0, e: "قال تعالى: «نحن نقصُّ عليك أحسن القصص»." },
    4:   { q: "كم كوكباً رآها يوسفُ ساجدةً له مع الشمس والقمر؟", o: ["سبعة", "أحد عشر", "تسعة"], a: 1, e: "رأى أحدَ عشرَ كوكباً والشمسَ والقمرَ ساجدين له." },
    7:   { q: "ماذا فعل إخوةُ يوسفَ به بدافع الحسد؟", o: ["طردوه من البيت", "ألقوه في غيابة الجُبّ", "تركوه في السوق"], a: 1, e: "ألقوه في الجُبّ ثم زعموا أن الذئبَ أكله." },
    19:  { q: "من الذي اشترى يوسفَ حين وصل إلى مصر؟", o: ["ملكُ مصر", "عزيزُ مصر", "كبيرُ التجار"], a: 1, e: "اشتراه عزيزُ مصر وأوصى امرأتَه بإكرام مثواه." },
    23:  { q: "بمَ ثبتت براءةُ يوسفَ من تهمة المراودة؟", o: ["قميصُه قُدَّ من دُبُر", "شهادةُ الخدم", "اعترافُها فوراً"], a: 0, e: "شهد شاهدٌ: إن كان قميصُه قُدَّ من دُبُر فهي الكاذبة — وقد قُدَّ من دُبُر." },
    30:  { q: "ماذا اختار يوسفُ حين دُعي إلى المعصية؟", o: ["الهربَ من المدينة", "السجنَ", "مجاراتهنّ"], a: 1, e: "قال: «السجنُ أحبُّ إليَّ مما يدعونني إليه»." },
    35:  { q: "إلامَ دعا يوسفُ صاحبَيِ السجن قبل تأويل رؤياهما؟", o: ["الصبرِ", "توحيدِ الله", "الصلحِ مع الملك"], a: 1, e: "دعاهما إلى عبادة الله وحده قبل أن يؤوّل رؤياهما." },
    43:  { q: "ماذا رأى الملكُ في رؤياه؟", o: ["سبعَ بقراتٍ سمانٍ يأكلهنّ سبعٌ عِجاف", "نهراً يفيض", "جبلاً ينهار"], a: 0, e: "أوّلها يوسفُ: سبعُ سنين رخاءٍ تعقبها سبعُ سنين شدّة." },
    50:  { q: "ماذا طلب يوسفُ أن يُولَّى بعد ثبوت براءته؟", o: ["قيادةَ الجيش", "خزائنَ الأرض", "إمارةَ المدينة"], a: 1, e: "قال: «اجعلني على خزائن الأرض إني حفيظٌ عليم»." },
    58:  { q: "ما الذي اشترطه يعقوبُ لإرسال ابنه مع إخوته؟", o: ["مالاً", "موثقاً من الله", "شاهداً"], a: 1, e: "لم يرسله حتى يؤتوه موثقاً من الله ليأتُنَّه به." },
    69:  { q: "ماذا جعل يوسفُ في رحل أخيه ليُبقيَه عنده؟", o: ["ذهباً", "صُواعَ الملك", "كتاباً"], a: 1, e: "جعل السقايةَ (صُواعَ الملك) في رحل أخيه بتدبيرٍ ألهمه اللهُ إياه." },
    80:  { q: "بمَ قابل يوسفُ إخوتَه حين عرفوه؟", o: ["بالعقاب", "بالعفو: «لا تثريبَ عليكم»", "بالطرد"], a: 1, e: "عفا عنهم وقال: «لا تثريبَ عليكم اليومَ يغفر اللهُ لكم»." },
    93:  { q: "بمَ ارتدَّ بصرُ يعقوبَ بصيراً؟", o: ["بالدعاء فقط", "بإلقاء قميص يوسفَ على وجهه", "بعد لقائه مباشرة"], a: 1, e: "أُلقي قميصُ يوسفَ على وجهه فارتدَّ بصيراً." },
    102: { q: "لِمن جعل اللهُ في قصة يوسفَ عبرةً وذكرى؟", o: ["لأولي الألباب", "للأغنياء", "للملوك"], a: 0, e: "«لقد كان في قصصهم عبرةٌ لأولي الألباب»." }
  };

  /* ---------------- التخزين المحلي للتقدّم ---------------- */
  var LSK = 'brio_coran_v1';
  var prog = load();
  function load() { try { var p = JSON.parse(localStorage.getItem(LSK)); if (p && p.reviewed) { p.quiz = p.quiz || {}; return p; } } catch (e) {} return { reviewed: {}, quiz: {}, points: 0 }; }
  function save() { try { localStorage.setItem(LSK, JSON.stringify(prog)); } catch (e) {} }
  function secFrom(sec) { var a = sec.querySelector('.ayat'); if (a && a.dataset.from) return +a.dataset.from; var y = sec.querySelector('.yplay'); return y ? +y.dataset.from : 0; }

  injectCss();
  buildToolbar();
  buildRepeater();
  Array.prototype.forEach.call(secs, enhance);
  updateProgress();

  /* ---------------- التكرار للحفظ (قراءة آيات ومعاودتها n مرة) ---------------- */
  function buildRepeater() {
    var main = document.querySelector('main.wrap'); if (!main) return;
    var card = document.createElement('div'); card.className = 'yrep'; card.dir = 'rtl';
    card.innerHTML =
      '<div class="yrep-ttl">🔁 التكرار للحفظ</div>'
      + '<div class="yrep-sub">اختر مجال الآيات وعددَ مرات التكرار؛ تُتلى تلقائياً بصوت القارئ المختار في الأعلى، وتُعاد حتى ترسَخ في الحفظ.</div>'
      + '<div class="yrep-row">'
      + '<label>من الآية<input type="number" id="yrFrom" min="1" max="111" value="1" inputmode="numeric"></label>'
      + '<label>إلى الآية<input type="number" id="yrTo" min="1" max="111" value="10" inputmode="numeric"></label>'
      + '<label>مرات التكرار<input type="number" id="yrReps" min="1" max="99" value="3" inputmode="numeric"></label>'
      + '<button class="ylbtn yrep-go" id="yrGo" type="button">▶ ابدأ التكرار</button>'
      + '<button class="ylbtn" id="yrStop" type="button">⏹ إيقاف</button>'
      + '</div><div class="yrep-msg" id="yrMsg"></div>';
    var tb = main.querySelector('.ycard');
    if (tb && tb.parentNode === main) main.insertBefore(card, tb.nextSibling);
    else main.insertBefore(card, main.firstChild);

    function clamp(v, lo, hi, dflt) { v = parseInt(v, 10); if (isNaN(v)) v = dflt; return Math.max(lo, Math.min(hi, v)); }
    var msg = card.querySelector('#yrMsg');
    card.querySelector('#yrGo').addEventListener('click', function () {
      var f = clamp(card.querySelector('#yrFrom').value, 1, 111, 1);
      var t = clamp(card.querySelector('#yrTo').value, 1, 111, f);
      var r = clamp(card.querySelector('#yrReps').value, 1, 99, 1);
      if (t < f) { var x = f; f = t; t = x; }
      card.querySelector('#yrFrom').value = f; card.querySelector('#yrTo').value = t; card.querySelector('#yrReps').value = r;
      if (typeof window.PB_coranPlay !== 'function') { msg.textContent = 'تعذّر تشغيل التلاوة على هذه الصفحة.'; return; }
      try { window.PB_coranPlay(f, t, r); } catch (e) {}
      msg.innerHTML = '▶ تُتلى الآيات <b>' + f + '</b> إلى <b>' + t + '</b>، مكرَّرةً <b>' + r + '</b> مرّة — بصوت القارئ المختار. يتطلّب اتصالاً بالإنترنت.';
    });
    card.querySelector('#yrStop').addEventListener('click', function () {
      try { if (window.PB_coranStop) window.PB_coranStop(); } catch (e) {}
      msg.textContent = 'أُوقفت التلاوة.';
    });
  }

  /* ---------------- شريط التقدّم العلوي ---------------- */
  function buildToolbar() {
    var main = document.querySelector('main.wrap'); if (!main) return;
    var card = document.createElement('div'); card.className = 'ycard'; card.dir = 'rtl';
    card.innerHTML =
      '<div class="yc-top"><div><div class="yc-ttl">📚 رحلة تعلّم سورة يوسف</div>'
      + '<div class="yc-sub">راجِع كلَّ مقطع، اختبِر حفظك وفهمك، واجمَع النقاط. تقدّمُك محفوظٌ على جهازك.</div></div>'
      + '<div class="yc-pts"><div class="yc-pts-n" id="ycPts">0</div><div class="yc-pts-l">نقطة</div></div></div>'
      + '<div class="yc-bar"><div class="yc-fill" id="ycFill"></div></div>'
      + '<div class="yc-stat" id="ycStat"></div>';
    var note = main.querySelector('.note');
    if (note && note.parentNode === main) main.insertBefore(card, note.nextSibling);
    else main.insertBefore(card, main.firstChild);
  }
  function updateProgress() {
    var total = secs.length, rev = 0;
    Array.prototype.forEach.call(secs, function (s) { if (prog.reviewed[secFrom(s)]) rev++; });
    var pct = total ? Math.round(rev / total * 100) : 0;
    var fill = document.getElementById('ycFill'); if (fill) fill.style.width = pct + '%';
    var pts = document.getElementById('ycPts'); if (pts) pts.textContent = prog.points || 0;
    var stat = document.getElementById('ycStat');
    if (stat) stat.innerHTML = 'راجعتَ <b>' + rev + '</b> من <b>' + total + '</b> مقاطع · أجبتَ بنجاحٍ عن <b>' + Object.keys(prog.quiz).length + '</b> اختبارِ فهم';
  }

  /* ---------------- تحسين كل مقطع ---------------- */
  function enhance(sec) {
    var from = secFrom(sec);
    var btns = sec.querySelector('.ybtns'); if (!btns) return;
    var wrap = document.createElement('div'); wrap.className = 'ylrn'; wrap.dir = 'rtl';

    var rev = document.createElement('button'); rev.type = 'button';
    function paintRev() { rev.className = 'ylbtn' + (prog.reviewed[from] ? ' done' : ''); rev.textContent = prog.reviewed[from] ? '✓ تمّت المراجعة' : '✅ راجعتُ هذا المقطع'; }
    paintRev();
    rev.addEventListener('click', function () {
      prog.reviewed[from] = !prog.reviewed[from];
      prog.points = Math.max(0, (prog.points || 0) + (prog.reviewed[from] ? 1 : -1));
      save(); paintRev(); updateProgress();
    });

    var mem = document.createElement('button'); mem.type = 'button'; mem.className = 'ylbtn'; mem.textContent = '🧠 اختبر حفظي';
    mem.addEventListener('click', function () { toggleMemo(sec, mem); });

    var qz = document.createElement('button'); qz.type = 'button'; qz.className = 'ylbtn'; qz.textContent = '❓ اختبر فهمي';
    if (!QUIZ[from]) qz.style.display = 'none';
    qz.addEventListener('click', function () { toggleQuiz(sec, from, qz); });

    wrap.appendChild(rev); wrap.appendChild(mem); wrap.appendChild(qz);
    btns.parentNode.insertBefore(wrap, btns.nextSibling);
  }

  /* ---------------- وضع الحفظ : إخفاء/كشف الكلمات ---------------- */
  function toggleMemo(sec, btn) {
    var ayat = sec.querySelector('.ayat'); if (!ayat) return;
    if (ayat.classList.contains('ymemo')) { exitMemo(sec, btn); return; }
    if (!ayat.querySelector('.aya')) { flashNote(sec, 'يتطلّب وضعُ الحفظ تحميلَ نصِّ الآيات (اتصال بالإنترنت).'); return; }
    ayat._orig = ayat.innerHTML;
    Array.prototype.forEach.call(ayat.querySelectorAll('.aya'), function (aya) {
      var frag = document.createDocumentFragment();
      Array.prototype.forEach.call(aya.childNodes, function (node) {
        if (node.nodeType === 3) {
          var parts = node.textContent.split(/(\s+)/);
          parts.forEach(function (w) {
            if (w === '' ) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            var s = document.createElement('span'); s.className = 'cw masked'; s.textContent = w;
            s.addEventListener('click', function () { s.classList.toggle('masked'); });
            frag.appendChild(s);
          });
        } else { frag.appendChild(node.cloneNode(true)); }
      });
      aya.innerHTML = ''; aya.appendChild(frag);
    });
    ayat.classList.add('ymemo');
    var ctr = document.createElement('div'); ctr.className = 'ymemo-ctr'; ctr.dir = 'rtl';
    ctr.innerHTML = '<span class="ymc-h">🧠 وضع الحفظ: الكلماتُ مخفية — اقرأ من حفظك ثم اكشِفْ للتأكّد (انقر أيَّ كلمة لكشفها).</span>'
      + '<span class="ymc-btns"><button class="ylbtn ymc" data-a="word">كشف كلمة</button>'
      + '<button class="ylbtn ymc" data-a="all">كشف الكل</button>'
      + '<button class="ylbtn ymc" data-a="hide">إخفاء الكل</button></span>';
    ayat.parentNode.insertBefore(ctr, ayat.nextSibling);
    ctr.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return; var a = b.getAttribute('data-a');
      if (a === 'all') Array.prototype.forEach.call(ayat.querySelectorAll('.cw'), function (x) { x.classList.remove('masked'); });
      else if (a === 'hide') Array.prototype.forEach.call(ayat.querySelectorAll('.cw'), function (x) { x.classList.add('masked'); });
      else if (a === 'word') { var m = ayat.querySelector('.cw.masked'); if (m) m.classList.remove('masked'); }
    });
    btn.textContent = '🧠 إنهاء الحفظ'; btn.classList.add('done');
  }
  function exitMemo(sec, btn) {
    var ayat = sec.querySelector('.ayat'); if (!ayat) return;
    if (ayat._orig != null) ayat.innerHTML = ayat._orig;
    ayat.classList.remove('ymemo');
    var ctr = sec.querySelector('.ymemo-ctr'); if (ctr) ctr.remove();
    if (btn) { btn.textContent = '🧠 اختبر حفظي'; btn.classList.remove('done'); }
  }
  function flashNote(sec, msg) {
    var n = document.createElement('div'); n.className = 'ymemo-note'; n.dir = 'rtl'; n.textContent = msg;
    var b = sec.querySelector('.ylrn') || sec.querySelector('.ybtns'); b.parentNode.insertBefore(n, b.nextSibling);
    setTimeout(function () { if (n.parentNode) n.parentNode.removeChild(n); }, 4000);
  }

  /* ---------------- اختبار الفهم ---------------- */
  function toggleQuiz(sec, from, btn) {
    var ex = sec.querySelector('.yquiz'); if (ex) { ex.remove(); btn.classList.remove('done'); return; }
    var q = QUIZ[from]; if (!q) return;
    var box = document.createElement('div'); box.className = 'yquiz'; box.dir = 'rtl';
    var h = '<div class="yq-q">' + q.q + '</div><div class="yq-opts">';
    q.o.forEach(function (o, i) { h += '<button class="yq-opt" data-i="' + i + '">' + o + '</button>'; });
    h += '</div><div class="yq-exp"></div>';
    box.innerHTML = h;
    sec.appendChild(box);
    var done = false;
    var opts = box.querySelectorAll('.yq-opt');
    Array.prototype.forEach.call(opts, function (b) {
      b.addEventListener('click', function () {
        if (done) return; done = true;
        var i = +b.getAttribute('data-i');
        Array.prototype.forEach.call(opts, function (x) { x.classList.add('dim'); });
        opts[q.a].classList.add('ok'); opts[q.a].classList.remove('dim');
        if (i !== q.a) { b.classList.add('bad'); b.classList.remove('dim'); }
        box.querySelector('.yq-exp').innerHTML = (i === q.a ? '✅ أحسنت! ' : '❌ الإجابة الصحيحة مُبيّنة. ') + q.e;
        if (i === q.a && !prog.quiz[from]) { prog.quiz[from] = true; prog.points = (prog.points || 0) + 1; save(); updateProgress(); btn.classList.add('done'); }
      });
    });
  }

  /* ---------------- الأنماط ---------------- */
  function injectCss() {
    if (document.getElementById('coranLearnCss')) return;
    var s = document.createElement('style'); s.id = 'coranLearnCss';
    s.textContent =
      '.ycard{background:linear-gradient(135deg,#1f3a5f,#2f6ca8);color:#fff;border-radius:18px;padding:18px 20px;margin:0 0 18px;box-shadow:0 12px 30px rgba(20,40,70,.28)}'
      + '.yc-top{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap}'
      + '.yc-ttl{font-family:Amiri,serif;font-size:1.35rem;font-weight:700}'
      + '.yc-sub{opacity:.92;font-size:.9rem;margin-top:3px;max-width:60ch}'
      + '.yc-pts{text-align:center;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);border-radius:14px;padding:9px 16px;min-width:78px}'
      + '.yc-pts-n{font-size:1.8rem;font-weight:800;line-height:1}.yc-pts-l{font-size:.72rem;opacity:.85;margin-top:2px}'
      + '.yc-bar{height:12px;background:rgba(255,255,255,.22);border-radius:8px;overflow:hidden;margin:14px 0 8px}'
      + '.yc-fill{height:100%;width:0;background:linear-gradient(90deg,#f4d03f,#2fd08a);border-radius:8px;transition:width .6s ease}'
      + '.yc-stat{font-size:.86rem;opacity:.96}'
      + '.yrep{background:var(--surface,var(--card));border:1px solid var(--border);border-right:5px solid var(--royal,#2f6ca8);border-radius:16px;padding:16px 18px;margin:0 0 18px}'
      + '.yrep-ttl{font-family:Amiri,serif;font-size:1.25rem;font-weight:700;color:var(--royal,#2f6ca8)}'
      + '.yrep-sub{font-size:.88rem;color:var(--muted);margin:4px 0 12px;line-height:1.6}'
      + '.yrep-row{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end}'
      + '.yrep-row label{display:flex;flex-direction:column;gap:5px;font-size:.82rem;font-weight:700;color:var(--muted)}'
      + '.yrep-row input{width:92px;padding:9px 11px;border:1px solid var(--border);border-radius:10px;font-size:1rem;font-family:inherit;background:var(--card);color:var(--text);text-align:center}'
      + '.yrep-go{background:var(--royal,#2f6ca8)!important;color:#fff!important;border:0!important}'
      + '.yrep-go:hover{filter:brightness(1.1)}'
      + '.yrep-msg{margin-top:11px;font-size:.9rem;line-height:1.6;color:var(--text);min-height:1.1em}'
      + '.ylrn{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}'
      + '.ylbtn{font-family:inherit;font-size:.86rem;font-weight:700;padding:8px 14px;border-radius:10px;border:1px solid var(--border);background:var(--surface,var(--card));color:var(--text);cursor:pointer;transition:.15s}'
      + '.ylbtn:hover{border-color:var(--royal,#2f6ca8);transform:translateY(-1px)}'
      + '.ylbtn.done{background:rgba(47,208,138,.15);border-color:var(--good,#2fd08a);color:var(--good,#1f9d55)}'
      + '.ymemo-ctr{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin:10px 0;background:var(--surface,var(--card));border:1px dashed var(--royal,#2f6ca8);border-radius:12px;padding:10px 14px}'
      + '.ymc-h{font-size:.86rem;color:var(--muted);flex:1;min-width:200px}'
      + '.ymc-btns{display:flex;gap:7px;flex-wrap:wrap}.ymc{font-size:.8rem;padding:6px 11px}'
      + '.ayat.ymemo{line-height:2.5}'
      + '.cw{cursor:pointer;border-radius:5px;padding:0 3px;transition:.12s;display:inline-block}'
      + '.cw.masked{background:var(--border);color:transparent;box-shadow:inset 0 0 0 1px var(--border);border-radius:5px}'
      + '.cw.masked:hover{background:var(--muted,#9aa0c8);opacity:.6}'
      + '.ymemo-note{margin:8px 0;padding:10px 14px;background:rgba(255,207,107,.12);border:1px solid #c79a3a;border-radius:10px;font-size:.88rem;color:var(--text)}'
      + '.yquiz{margin-top:12px;background:var(--surface,var(--card));border:1px solid var(--border);border-radius:14px;padding:16px}'
      + '.yq-q{font-family:Amiri,serif;font-weight:700;font-size:1.12rem;margin-bottom:12px;line-height:1.6}'
      + '.yq-opts{display:flex;flex-direction:column;gap:8px}'
      + '.yq-opt{text-align:right;font-family:inherit;font-size:1rem;padding:11px 15px;border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:10px;cursor:pointer;transition:.15s;font-weight:600}'
      + '.yq-opt:hover{border-color:var(--royal,#2f6ca8)}'
      + '.yq-opt.ok{background:rgba(47,208,138,.16);border-color:var(--good,#2fd08a)}'
      + '.yq-opt.bad{background:rgba(214,69,69,.14);border-color:#d64545}'
      + '.yq-opt.dim{opacity:.55}'
      + '.yq-exp{margin-top:12px;font-size:.96rem;line-height:1.7;color:var(--muted)}';
    document.head.appendChild(s);
  }
})();

/* ===================================================================
   Brio — Académie des Échecs (apprendre depuis zéro)
   Un parcours progressif, interactif et ludique pour débutants complets.
   Réutilise window.Chess (chess.js) pour la légalité et la validation.
   Autonome : ne touche pas au mode « Jouer ».
   =================================================================== */
(function () {
  'use strict';
  var mount = document.getElementById('learnMode');
  if (!mount) return;
  var Chess = window.Chess;

  /* --------- glyphes : on utilise le MÊME jeu plein pour les deux couleurs,
     et c'est le CSS (remplissage + contour) qui distingue blancs/noirs. Ainsi
     la police du système ne peut pas rendre une pièce (ex. le roi noir ♚) en
     contour clair et la faire passer pour une pièce blanche. ︎ force le
     rendu « texte » (jamais emoji). --------- */
  var SOLID = { p: '♟︎', n: '♞︎', b: '♝︎', r: '♜︎', q: '♛︎', k: '♚︎' };
  var GLY = { w: SOLID, b: SOLID };

  /* ====================================================================
     NOTATION — anglais (interne chess.js) → français (affichage & voix)
     K→Roi, Q→Dame, R→Tour, B→Fou, N→Cavalier. Ex. Nc5 → Cc5 → « Cavalier c 5 ».
  ==================================================================== */
  var EN2FR = { K: 'R', Q: 'D', R: 'T', B: 'F', N: 'C' };
  var FRWORD = { R: 'Roi', D: 'Dame', T: 'Tour', F: 'Fou', C: 'Cavalier' };
  // regex d'un coup (SAN) : roque, prise de pion, ou coup de pièce/pion
  var MOVE_RE = /(O-O-O|O-O|[a-h]x[a-h][1-8](?:=[A-Za-z])?[+#]?|[KQRBNRDTFC]?x?[a-h][1-8](?:=[A-Za-z])?[+#]?)/g;

  // Affichage : convertit un texte contenant du SAN anglais en notation française.
  function sanEnToFr(text) {
    if (text == null) return '';
    return String(text).replace(MOVE_RE, function (tok) {
      if (tok === 'O-O' || tok === 'O-O-O') return tok;
      tok = tok.replace(/^([KQRBN])/, function (_, p) { return EN2FR[p] || p; });
      tok = tok.replace(/=([KQRBN])/, function (_, p) { return '=' + (EN2FR[p] || p); });
      return tok;
    });
  }
  // Voix : transforme la notation française en mots prononçables.
  function frMoveToSpeech(tok) {
    if (tok === 'O-O') return 'petit roque';
    if (tok === 'O-O-O') return 'grand roque';
    var suf = '', body = tok;
    if (/#$/.test(body)) { suf = ' échec et mat'; body = body.slice(0, -1); }
    else if (/\+$/.test(body)) { suf = ' échec'; body = body.slice(0, -1); }
    var promo = ''; var pm = /=([RDTFC])$/.exec(body);
    if (pm) { promo = ', promotion ' + (FRWORD[pm[1]] || pm[1]); body = body.replace(/=[RDTFC]$/, ''); }
    var m;
    // prise de pion : exd5 → « pion e prend d 5 »
    if ((m = /^([a-h])x([a-h])([1-8])$/.exec(body))) return 'pion ' + m[1] + ' prend ' + m[2] + ' ' + m[3] + promo + suf;
    // coup de pièce : Cf3 / Cxd4
    if ((m = /^([RDTFC])(x?)([a-h])([1-8])$/.exec(body))) return (FRWORD[m[1]] || m[1]) + (m[2] ? ' prend ' : ' ') + m[3] + ' ' + m[4] + promo + suf;
    // coup / case de pion : e4, e8
    if ((m = /^([a-h])(x?)([a-h])?([1-8])$/.exec(body))) {
      if (m[2] && m[3]) return 'pion ' + m[1] + ' prend ' + m[3] + ' ' + m[4] + promo + suf;
      return m[1] + ' ' + m[4] + promo + suf;
    }
    return tok;
  }
  function notationToSpeech(text) {
    return String(text == null ? '' : text).replace(MOVE_RE, function (tok) { return ' ' + frMoveToSpeech(tok) + ' '; });
  }
  function stripHtml(h) { try { var d = document.createElement('div'); d.innerHTML = h || ''; return d.textContent || d.innerText || ''; } catch (e) { return String(h || '').replace(/<[^>]+>/g, ' '); } }

  /* ---------- voix : lecture automatique des leçons (moteur Brio) ---------- */
  var voiceOn = true; try { voiceOn = (localStorage.getItem('brio_echecs_voice') !== '0'); } catch (e) {}
  function lessonSpeechText(ls) {
    var parts = [];
    if (ls.intro) parts.push(stripHtml(ls.intro));
    if (ls.task) parts.push(stripHtml(ls.task));
    if (ls.quiz && ls.quiz.q) parts.push(stripHtml(ls.quiz.q));
    return notationToSpeech(parts.join('. '));   // le texte est déjà en notation française
  }
  function speakText(htmlOrText, btn) { speakNow(notationToSpeech(stripHtml(htmlOrText)), btn || null); }
  // hideBar:true → on lit à voix haute SANS afficher l'encart (le texte est déjà à l'écran)
  function speak(text, btn) { try { if (voiceOn && window.brioRead && text) window.brioRead(text, 'fr', btn || null, { hideBar: true }); } catch (e) {} }
  function speakNow(text, btn) { try { if (window.brioRead && text) window.brioRead(text, 'fr', btn || null, { hideBar: true }); } catch (e) {} }
  function stopSpeak() { try { if (window.brioStop) window.brioStop(); } catch (e) {} }
  try { window.__ACAD = { sanEnToFr: sanEnToFr, notationToSpeech: notationToSpeech, frMoveToSpeech: frMoveToSpeech,
    getFen: function () { try { return chess ? chess.fen() : ''; } catch (e) { return ''; } },
    bestMateMove: function (fen, n) { try { var c = new Chess(); if (!c.load(fen)) return null; var ms = c.moves({ verbose: true });
      for (var i = 0; i < ms.length; i++) { c.move(ms[i]); var good = false; if (c.in_checkmate()) good = (n === 1); else if (n > 1) { var rp = c.moves({ verbose: true }); if (rp.length) { var all = true; for (var j = 0; j < rp.length; j++) { c.move(rp[j]); var ok = matesRec(c, n - 1); c.undo(); if (!ok) { all = false; break; } } good = all; } } c.undo(); if (good) return { from: ms[i].from, to: ms[i].to }; } return null; } catch (e) { return null; } } }; } catch (e) {}

  /* =====================================================================
     LE PROGRAMME — 8 niveaux, du plateau aux premières tactiques.
     Types de leçon :
       info      : explication + plateau illustratif, bouton « J'ai compris »
       click     : clique la bonne case (target)
       move      : amène/joue la pièce — solution = liste de coups SAN acceptés
       goal      : atteins un objectif ('check' | 'mate') par n'importe quel coup
       quiz      : question à choix multiple
     Chaque position (fen) a les deux rois pour être 100% légale.
  ===================================================================== */
  var LEVELS = [
    {
      id: 'l1', icon: '🧭', title: "L'échiquier",
      sub: "Les cases, les colonnes et les coordonnées",
      lessons: [
        { id: 'l1a', type: 'info', title: "Le plateau de jeu",
          fen: 'start',
          intro: "Bienvenue ! Les échecs se jouent sur un plateau de <b>64 cases</b> : 8 sur 8, alternant cases claires et foncées. Chaque joueur commence avec <b>16 pièces</b>. Les <b>Blancs</b> jouent toujours en premier. Règle d'or pour poser le plateau : la <b>case blanche est toujours en bas à droite</b>." },
        { id: 'l1b', type: 'info', title: "Colonnes, rangées, coordonnées",
          fen: '8/8/8/8/8/8/8/8 w - - 0 1', coords: true,
          intro: "Chaque case a une « adresse ». Les <b>colonnes</b> vont de <b>a</b> à <b>h</b> (de gauche à droite), les <b>rangées</b> de <b>1</b> à <b>8</b> (du bas vers le haut). On nomme une case par sa colonne puis sa rangée : la case en bas à gauche est <b>a1</b>, celle en haut à droite <b>h8</b>. Le centre, ce sont les cases <b>d4, e4, d5, e5</b>." },
        { id: 'l1c', type: 'click', title: "Trouve la case e4",
          fen: '8/8/8/8/8/8/8/8 w - - 0 1', coords: true, target: 'e4',
          task: "Clique sur la case <b>e4</b> — une des quatre cases du centre.",
          hint: "Colonne <b>e</b> (la 5<sup>e</sup> en partant de la gauche), rangée <b>4</b> (la 4<sup>e</sup> en partant du bas).",
          done: "Parfait ! e4 est au cœur de l'échiquier — une case très importante." },
        { id: 'l1d', type: 'quiz', title: "Petit test : les cases",
          fen: '8/8/8/8/8/8/8/8 w - - 0 1', coords: true,
          quiz: { q: "De quelle couleur est la case <b>a1</b> (en bas à gauche) ?",
                  options: ["Foncée", "Claire"], answer: 0,
                  explain: "a1 est foncée. Astuce : la case blanche est toujours en bas à droite (h1), donc a1 à l'opposé est foncée." } }
      ]
    },
    {
      id: 'l2', icon: '♟️', title: "Les pièces bougent",
      sub: "Apprends le déplacement de chaque pièce",
      lessons: [
        { id: 'l2a', type: 'move', title: "La Tour — en lignes droites",
          fen: '7k/8/8/8/8/8/8/R6K w - - 0 1', preselect: 'a1', target: 'a5',
          intro: "La <b>Tour</b> ♖ se déplace en <b>lignes droites</b> : horizontalement ou verticalement, d'autant de cases qu'elle veut, tant que la route est libre. Elle vaut <b>5 points</b>.",
          task: "Fais monter la Tour jusqu'à la case marquée <b>a5</b>.",
          solution: ['Ra5'], hint: "La Tour est en a1. Monte tout droit sur la colonne a jusqu'à a5.",
          done: "Bravo ! La Tour adore les colonnes et les rangées ouvertes." },
        { id: 'l2b', type: 'move', title: "Le Fou — en diagonale",
          fen: '7k/8/8/8/8/8/8/2B4K w - - 0 1', preselect: 'c1', target: 'h6',
          intro: "Le <b>Fou</b> ♗ se déplace en <b>diagonale</b>, autant de cases qu'il veut. Chaque Fou garde la couleur de sa case de départ toute la partie. Il vaut <b>3 points</b>.",
          task: "Glisse le Fou en diagonale jusqu'à la case marquée <b>h6</b>.",
          solution: ['Bh6'], hint: "Depuis c1, la diagonale montante vers la droite passe par d2, e3, f4, g5, h6.",
          done: "Joli ! Les Fous sont redoutables sur les grandes diagonales." },
        { id: 'l2c', type: 'move', title: "La Dame — la plus puissante",
          fen: '7k/8/8/8/8/8/8/3Q3K w - - 0 1', preselect: 'd1', target: 'd6',
          intro: "La <b>Dame</b> ♕ combine la Tour <b>et</b> le Fou : lignes droites <b>et</b> diagonales. C'est la pièce la plus forte, elle vaut <b>9 points</b>. Attention : puissante, mais à protéger !",
          task: "Avance la Dame tout droit jusqu'à la case marquée <b>d6</b>.",
          solution: ['Qd6'], hint: "Monte sur la colonne d, de d1 à d6.",
          done: "Superbe ! La Dame contrôle énormément de cases." },
        { id: 'l2d', type: 'move', title: "Le Cavalier — le saut en L",
          fen: '7k/8/8/8/8/8/8/6NK w - - 0 1', preselect: 'g1', target: 'f3',
          intro: "Le <b>Cavalier</b> ♘ se déplace en <b>« L »</b> : deux cases dans une direction puis une sur le côté. C'est la seule pièce qui <b>saute</b> par-dessus les autres ! Il vaut <b>3 points</b>.",
          task: "Saute le Cavalier jusqu'à la case marquée <b>f3</b>.",
          solution: ['Nf3'], hint: "Depuis g1 : deux cases vers le haut… puis une vers la gauche → f3.",
          done: "Excellent ! Le Cavalier déroute souvent les débutants — et les adversaires." },
        { id: 'l2e', type: 'move', title: "Le Roi — une case à la fois",
          fen: 'k7/8/8/8/4K3/8/8/8 w - - 0 1', preselect: 'e4', target: 'e5',
          intro: "Le <b>Roi</b> ♔ se déplace d'<b>une seule case</b> dans toutes les directions. On ne le capture jamais : le but du jeu est de le piéger (échec et mat). Deux rois ne peuvent jamais se toucher.",
          task: "Avance le Roi d'une case jusqu'à la case marquée <b>e5</b>.",
          solution: ['Ke5'], hint: "Le Roi est en e4 : monte d'une seule case vers e5.",
          done: "Parfait ! En finale, le Roi devient une pièce active et précieuse." },
        { id: 'l2f', type: 'move', title: "Le Pion — avance et capture",
          fen: '7k/8/8/8/8/8/4P3/7K w - - 0 1', preselect: 'e2', target: 'e4',
          intro: "Le <b>Pion</b> ♙ avance <b>tout droit</b> d'une case. Nouveauté : depuis sa case de départ, il peut avancer de <b>deux cases</b> d'un coup. Il ne recule jamais. Il capture <b>en diagonale</b> (tu verras ça juste après). Il vaut <b>1 point</b>.",
          task: "Profite du départ : avance le pion de <b>deux cases</b>, de e2 à <b>e4</b>.",
          solution: ['e4'], hint: "Clique le pion e2 : deux cases sont proposées (e3 et e4). Choisis e4.",
          done: "Très bien ! Avancer les pions centraux de deux cases, c'est déjà bien jouer." }
      ]
    },
    {
      id: 'l3', icon: '⚔️', title: "Capturer",
      sub: "Prendre les pièces adverses… intelligemment",
      lessons: [
        { id: 'l3a', type: 'info', title: "Comment on capture",
          fen: '7k/8/8/3p4/8/3R4/8/7K w - - 0 1',
          intro: "On <b>capture</b> en allant sur la case d'une pièce adverse : elle quitte le plateau et la tienne prend sa place. Toutes les pièces capturent comme elles se déplacent — <b>sauf le pion</b>, qui avance tout droit mais <b>capture en diagonale</b>." },
        { id: 'l3b', type: 'move', title: "Capture avec la Tour",
          fen: '7k/p7/8/8/8/8/8/R6K w - - 0 1', preselect: 'a1', target: 'a7',
          intro: "Rien de plus simple : amène ta pièce sur la case ennemie pour la prendre.",
          task: "Capture le pion noir en <b>a7</b> avec ta Tour.",
          solution: ['Rxa7'], hint: "Monte la Tour sur la colonne a jusqu'au pion en a7.",
          done: "Capturé ! Une pièce en moins pour l'adversaire." },
        { id: 'l3c', type: 'move', title: "La capture du pion (en diagonale)",
          fen: '7k/8/8/3p4/4P3/8/8/7K w - - 0 1', preselect: 'e4', target: 'd5',
          intro: "Le pion est spécial : il <b>capture en diagonale</b>, d'une case. Ton pion e4 peut donc prendre une pièce en d5 ou f5.",
          task: "Avec le pion e4, capture le pion noir en <b>d5</b>.",
          solution: ['exd5'], hint: "Le pion e4 capture en diagonale vers la gauche : e4 prend d5.",
          done: "Exactement ! Le pion avance droit mais mange de biais." },
        { id: 'l3d', type: 'quiz', title: "La valeur des pièces",
          fen: '8/8/8/8/8/8/8/8 w - - 0 1', coords: true,
          quiz: { q: "Classe la force : laquelle vaut le plus de points ?",
                  options: ["Le Fou (3)", "La Tour (5)", "La Dame (9)"], answer: 2,
                  explain: "Repères : Pion = 1, Cavalier = 3, Fou = 3, Tour = 5, Dame = 9. Le Roi n'a pas de valeur chiffrée (il est sans prix). Ces points t'aident à décider quels échanges sont bons." } },
        { id: 'l3e', type: 'move', title: "Choisis la meilleure capture",
          fen: '7k/8/8/8/3q3p/5N2/8/7K w - - 0 1', preselect: 'f3',
          intro: "Ton Cavalier peut capturer <b>deux</b> choses : un pion (1 point) en h4, ou la <b>Dame</b> (9 points) en d4. Vu la valeur des pièces, le choix est évident !",
          task: "Capture la pièce la <b>plus précieuse</b> avec ton Cavalier.",
          solution: ['Nxd4'], hint: "La Dame vaut 9, le pion seulement 1. Prends la Dame en d4 !",
          done: "Excellent réflexe ! Toujours comparer la valeur avant d'échanger." }
      ]
    },
    {
      id: 'l4', icon: '👑', title: "Échec et mat",
      sub: "Le but du jeu : piéger le Roi",
      lessons: [
        { id: 'l4a', type: 'goal', title: "Donne un échec",
          fen: '7k/8/8/8/8/8/8/R6K w - - 0 1', preselect: 'a1', goal: 'check',
          intro: "Quand une pièce <b>attaque le Roi</b> adverse, on dit « <b>échec</b> ». Le joueur en échec doit <b>obligatoirement</b> y répondre au coup suivant. Mettre en échec, c'est menacer le Roi.",
          task: "Mets le Roi noir (en h8) en <b>échec</b> avec ta Tour.",
          hint: "Place la Tour sur la même rangée que le Roi : monte en a8 pour attaquer toute la 8ᵉ rangée.",
          done: "Échec ! Le Roi noir est attaqué et doit réagir." },
        { id: 'l4b', type: 'info', title: "Répondre à un échec",
          fen: '6k1/8/8/8/8/8/5PPP/4r1K1 w - - 0 1',
          intro: "Face à un échec, il y a <b>trois</b> réponses possibles : <b>1)</b> déplacer le Roi sur une case sûre, <b>2)</b> <b>capturer</b> la pièce qui donne l'échec, ou <b>3)</b> <b>interposer</b> une pièce entre l'attaquant et le Roi. Si aucune n'est possible… c'est échec et <b>mat</b> !" },
        { id: 'l4c', type: 'goal', title: "Mat du couloir (en 1 coup)",
          fen: '6k1/5ppp/8/8/8/8/8/R6K w - - 0 1', preselect: 'a1', goal: 'mate',
          intro: "Le <b>Roi enfermé</b> par ses propres pions sur la dernière rangée est vulnérable : c'est le fameux <b>mat du couloir</b> (back-rank). La Tour arrive sur la rangée… et c'est fini.",
          task: "Donne <b>échec et mat</b> en un seul coup avec la Tour.",
          hint: "Amène la Tour en a8 : le Roi noir est bloqué par ses pions f7, g7, h7 et ne peut pas s'échapper.",
          done: "ÉCHEC ET MAT ! 🎉 Tu viens de réaliser le mat le plus courant chez les débutants." },
        { id: 'l4d', type: 'goal', title: "Mat de la Dame soutenue",
          fen: '7k/5Q2/6K1/8/8/8/8/8 w - - 0 1', preselect: 'f7', goal: 'mate',
          intro: "La Dame est mortelle quand elle est <b>protégée</b> par le Roi. Ici, ton Roi en g6 soutient ta Dame : approche-la du Roi noir pour l'étouffer.",
          task: "Mate en un coup : amène la Dame tout près du Roi noir (en g7).",
          hint: "Dg7 : la Dame contrôle h8, h7 et g8 ; elle est protégée par ton Roi en g6. Mat !",
          done: "Magnifique ! Dame + Roi, c'est le duo gagnant des finales." },
        { id: 'l4e', type: 'quiz', title: "Mat ou pat ?",
          fen: '8/8/8/8/8/8/8/8 w - - 0 1', coords: true,
          quiz: { q: "Un joueur n'est <b>pas</b> en échec, mais il ne peut jouer <b>aucun</b> coup légal. Que se passe-t-il ?",
                  options: ["Il a perdu (échec et mat)", "Partie nulle (pat)", "Il passe son tour"], answer: 1,
                  explain: "C'est le <b>pat</b> : pas d'échec + aucun coup légal = partie nulle. Attention quand tu domines : ne laisse pas l'adversaire au pat, tu perdrais ta victoire !" } }
      ]
    },
    {
      id: 'l5', icon: '✨', title: "Les coups spéciaux",
      sub: "Roque, promotion, prise en passant",
      lessons: [
        { id: 'l5a', type: 'move', title: "Le roque (mettre le Roi à l'abri)",
          fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1', preselect: 'e1',
          intro: "Le <b>roque</b> est le seul coup qui bouge <b>deux</b> pièces : le Roi et une Tour, en un seul mouvement. Le Roi se décale de deux cases vers la Tour, qui saute de l'autre côté. Il <b>sécurise ton Roi</b> — à faire tôt ! (Possible si Roi et Tour n'ont jamais bougé et que la route est libre.)",
          task: "Effectue le <b>petit roque</b> (côté roi) : clique le Roi puis la case g1.",
          solution: ['O-O'], hint: "Sélectionne le Roi en e1, puis joue vers g1 : la Tour h1 saute automatiquement en f1.",
          done: "Roque réussi ! Ton Roi est maintenant bien protégé dans son coin." },
        { id: 'l5b', type: 'move', title: "La promotion du pion",
          fen: '7k/4P3/8/8/8/8/8/7K w - - 0 1', preselect: 'e7', target: 'e8',
          intro: "Un pion qui atteint la <b>dernière rangée</b> se transforme en la pièce de ton choix — presque toujours en <b>Dame</b> ! Un simple pion devient la pièce la plus forte : c'est souvent décisif.",
          task: "Avance le pion en <b>e8</b> et transforme-le en Dame.",
          solution: ['e8=Q', 'e8=Q+'], promote: 'q', hint: "Pousse le pion de e7 à e8 : il devient automatiquement une Dame.",
          done: "Nouvelle Dame sur l'échiquier ! Les pions passés valent de l'or." },
        { id: 'l5c', type: 'info', title: "La prise en passant",
          fen: '7k/8/8/3pP3/8/8/8/7K w - d6 0 1',
          intro: "Coup rare mais réglementaire : si un pion adverse avance de <b>deux cases</b> et se place <b>juste à côté</b> du tien, tu peux le capturer « <b>en passant</b> », comme s'il n'avait avancé que d'une case — mais <b>seulement au coup suivant</b>. Ici, ton pion e5 pourrait prendre le pion d5 en allant en d6." }
      ]
    },
    {
      id: 'l6', icon: '🚀', title: "Bien démarrer",
      sub: "Les 3 principes d'ouverture",
      lessons: [
        { id: 'l6a', type: 'move', title: "Principe 1 — occupe le centre",
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', preselect: 'e2', target: 'e4',
          intro: "Les 10 premiers coups décident souvent de la partie. <b>Principe n°1 :</b> prends le <b>centre</b> (cases d4-e4-d5-e5) avec tes pions. Le centre donne de l'espace et de la mobilité à tes pièces.",
          task: "Joue le meilleur premier coup : avance le pion-roi en <b>e4</b>.",
          solution: ['e4'], hint: "Avance le pion e2 de deux cases vers e4 : le coup d'ouverture le plus populaire au monde.",
          done: "Classique et excellent ! 1.e4 ouvre des lignes pour la Dame et le Fou." },
        { id: 'l6b', type: 'move', title: "Principe 2 — développe tes pièces",
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', preselect: 'g1', target: 'f3',
          intro: "<b>Principe n°2 :</b> sors tes <b>Cavaliers et Fous</b> vers le centre dès le début (« développer »). Ne joue pas dix fois la même pièce : active une nouvelle pièce à chaque coup.",
          task: "Développe ton Cavalier vers le centre : joue-le en <b>f3</b> (il attaque aussi le pion e5).",
          solution: ['Nf3'], hint: "Le Cavalier g1 va naturellement en f3 : actif, central, et il met la pression sur e5.",
          done: "Parfait développement ! Cavalier en f3, une des meilleures cases du jeu." },
        { id: 'l6c', type: 'quiz', title: "Principe 3 — la sécurité du Roi",
          fen: '8/8/8/8/8/8/8/8 w - - 0 1', coords: true,
          quiz: { q: "Une fois tes pièces légères sorties, quelle est la priorité ?",
                  options: ["Sortir la Dame très tôt pour attaquer", "Roquer pour mettre le Roi à l'abri", "Avancer tous ses pions"], answer: 1,
                  explain: "<b>Roque tôt !</b> Un Roi au centre est en danger. Évite de sortir la Dame trop tôt (elle se fait chasser) et de pousser trop de pions (ça affaiblit ton Roi)." } }
      ]
    },
    {
      id: 'l7', icon: '🎯', title: "Tactiques de base",
      sub: "Les pièges qui gagnent du matériel",
      lessons: [
        { id: 'l7a', type: 'info', title: "La fourchette",
          fen: '3qk3/8/8/4N3/8/8/8/4K3 w - - 0 1',
          intro: "Une <b>fourchette</b>, c'est <b>une pièce qui en attaque deux (ou plus) en même temps</b>. L'adversaire ne peut en sauver qu'une. Le <b>Cavalier</b> est le roi de la fourchette ! Ici, le Cavalier en e5 pourrait sauter en d7… et attaquer à la fois le Roi et la Dame." },
        { id: 'l7b', type: 'move', title: "À toi la fourchette !",
          fen: '3q3k/8/8/6N1/8/8/8/7K w - - 0 1', preselect: 'g5',
          intro: "Trouve le <b>coup double</b> : un échec au Roi qui attaque aussi la Dame. Après l'échec, le Roi bouge… et tu prends la Dame au coup d'après !",
          task: "Joue la fourchette du Cavalier qui met en échec <b>et</b> vise la Dame (case f7).",
          solution: ['Nf7+'], hint: "Cf7+ : le Cavalier donne échec au Roi en h8 et attaque la Dame en d8. Imparable !",
          done: "Fourchette gagnante ! Le Roi s'écarte, et Cxd8 rafle la Dame. 🍴" },
        { id: 'l7c', type: 'info', title: "Le clouage",
          fen: '4k3/8/8/8/8/4r3/8/4RK2 w - - 0 1',
          intro: "Le <b>clouage</b> immobilise une pièce : elle ne peut pas bouger car elle protège une pièce plus précieuse (souvent le Roi) <b>juste derrière</b>. Ici la Tour noire en e3 est « clouée » sur son Roi en e8 : si elle bouge, le Roi serait en échec. Tu peux alors l'attaquer tranquillement." },
        { id: 'l7d', type: 'info', title: "L'enfilade",
          fen: '7q/6k1/8/8/8/8/1B6/2K5 b - - 0 1',
          intro: "L'<b>enfilade</b> est l'inverse du clouage : tu mets en échec une pièce de <b>grande</b> valeur (ici le Roi en g7, attaqué par le Fou b2), et quand elle s'écarte, elle <b>expose</b> la pièce placée <b>derrière</b> elle sur la même ligne (la Dame en h8). Le Roi doit bouger… et le Fou capture la Dame. Une pièce à longue portée (Fou, Tour, Dame) aligne les deux cibles et gagne du matériel." },
        { id: 'l7e', type: 'goal', title: "Mat en 1 — mets tout en pratique",
          fen: '7k/6pp/8/8/8/8/8/3R2RK w - - 0 1', preselect: 'd1', goal: 'mate',
          intro: "Dernier défi de l'Académie : le Roi noir est muré par ses pions g7 et h7. Tu as deux Tours — mais une seule peut frapper. Trouve le coup qui conclut <b>immédiatement</b>.",
          task: "Donne <b>échec et mat</b> en un coup.",
          hint: "La Tour g1 est bloquée par le pion g7. Mais la colonne d est libre : amène la Tour d1 en <b>d8</b>. Elle contrôle toute la 8ᵉ rangée, et le Roi n'a aucune fuite. Mat !",
          done: "ÉCHEC ET MAT ! 🏆 Tu maîtrises les bases — te voilà prêt à jouer de vraies parties." }
      ]
    },
    {
      id: 'l8', icon: '🧠', title: "Combinaisons gagnantes",
      sub: "Des pièges plus difficiles pour gagner du matériel",
      lessons: [
        { id: 'l8a', type: 'info', title: "Comment trouver une combinaison",
          fen: '8/8/8/8/8/8/8/8 w - - 0 1', coords: true,
          intro: "On monte en niveau ! Pour repérer un coup gagnant, examine toujours les <b>coups forcés</b>, dans cet ordre : <b>1) les échecs</b>, <b>2) les prises</b>, <b>3) les menaces</b>. Les meilleurs joueurs calculent d'abord ces coups-là. Dans les leçons qui suivent, cherche le coup qui met en échec, capture, ou menace <b>deux cibles à la fois</b>." },
        { id: 'l8b', type: 'move', title: "Fourchette royale",
          fen: '6k1/8/2q5/3N4/8/8/8/K7 w - - 0 1', preselect: 'd5',
          intro: "La <b>fourchette</b> du Cavalier est l'arme la plus redoutable : une seule pièce en attaque deux, et l'adversaire ne peut en sauver qu'une.",
          task: "Trouve le saut de Cavalier qui met le Roi en échec tout en attaquant la Dame.",
          solution: ['Ne7+'], hint: "Ce7+ : le Cavalier saute en e7, échec au Roi en g8 — et il attaque la Dame en c6. Au coup suivant, Cxc6 gagne la Dame.",
          done: "Fourchette gagnante ! Le Roi doit bouger, puis tu rafles la Dame. 🍴" },
        { id: 'l8c', type: 'move', title: "L'enfilade",
          fen: '2q5/8/8/8/2k5/8/8/5RK1 w - - 0 1', preselect: 'f1',
          intro: "L'<b>enfilade</b> : tu mets en échec une pièce, et quand elle s'écarte, tu captures la pièce alignée <b>derrière</b> elle. Une pièce à longue portée (Tour, Fou, Dame) adore ça.",
          task: "Donne un échec qui aligne le Roi et la Dame sur la même colonne.",
          solution: ['Rc1+'], hint: "Tc1+ : la Tour met le Roi noir en échec sur la colonne c. Le Roi doit s'écarter, puis Txc8 capture la Dame.",
          done: "Enfilade réussie ! Le Roi s'écarte et la Dame tombe." },
        { id: 'l8d', type: 'move', title: "L'attaque à la découverte",
          fen: '4k3/1q6/8/8/4N3/8/8/4R1K1 w - - 0 1', preselect: 'e4',
          intro: "L'<b>attaque à la découverte</b> : une pièce se déplace et <b>démasque</b> l'attaque d'une pièce derrière elle. Ici, ta Tour en e1 vise déjà le Roi noir — il suffit que le Cavalier s'écarte en gagnant quelque chose au passage.",
          task: "Bouge le Cavalier pour découvrir l'échec de la Tour tout en attaquant la Dame.",
          solution: ['Nd6+', 'Nc5+'], hint: "Cd6+ (ou Cc5+) : le Cavalier quitte la colonne e — la Tour met le Roi en échec — et le Cavalier attaque la Dame en b7. Imparable.",
          done: "Découverte gagnante ! Le Roi pare l'échec, puis le Cavalier prend la Dame." },
        { id: 'l8e', type: 'move', title: "La double attaque de la Dame",
          fen: 'r5k1/8/8/7n/8/8/8/3Q2K1 w - - 0 1', preselect: 'd1',
          intro: "Grâce à sa portée, la Dame peut attaquer <b>deux pièces non protégées</b> d'un seul coup. Repère deux cibles sans défense, puis trouve la case qui vise les deux.",
          task: "Place la Dame sur la case qui attaque à la fois la Tour en a8 et le Cavalier en h5.",
          solution: ['Qd5'], hint: "Dd5 : la Dame attaque la Tour a8 (en diagonale) et le Cavalier h5 (sur la rangée 5). L'adversaire n'en sauve qu'une.",
          done: "Double attaque ! Tu gagnes une pièce au coup suivant." }
      ]
    },
    {
      id: 'l9', icon: '🏅', title: "Mats à trouver",
      sub: "Des échecs et mats en 1 coup… mais bien cachés",
      lessons: [
        { id: 'l9a', type: 'goal', title: "Le mat étouffé",
          fen: '6rk/6pp/7N/8/8/8/8/7K w - - 0 1', preselect: 'h6', goal: 'mate',
          intro: "Le <b>mat étouffé</b> : le Roi est si entouré de ses propres pièces qu'il ne peut plus bouger. Seul le Cavalier peut l'achever, car il saute par-dessus tout.",
          task: "Donne échec et mat en un coup avec le Cavalier.",
          hint: "Cf7 : le Cavalier met le Roi en échec. Aucune fuite — la Tour en g8 et les pions g7 et h7 étouffent le Roi. Mat !",
          done: "Mat étouffé ! 🤯 L'un des plus beaux mats des échecs." },
        { id: 'l9b', type: 'goal', title: "Deux pièces coordonnées",
          fen: '6k1/5p1p/8/8/8/8/1B6/4R1K1 w - - 0 1', preselect: 'e1', goal: 'mate',
          intro: "Souvent, le mat naît de la <b>coopération</b> de deux pièces : l'une donne l'échec, l'autre coupe la fuite. Ici, ton Fou en b2 surveille la grande diagonale — dont la case de fuite g7.",
          task: "Mate le Roi en un coup avec la Tour, pendant que le Fou garde la sortie.",
          hint: "Te8 : la Tour donne échec sur la dernière rangée. Le Roi ne peut pas fuir en g7 (ton Fou b2 le contrôle), ni ailleurs. Mat !",
          done: "Superbe coordination ! La Tour mate, le Fou verrouille la sortie." },
        { id: 'l9c', type: 'goal', title: "Le mat arabe",
          fen: '7k/1R6/5N2/8/8/8/8/6K1 w - - 0 1', preselect: 'b7', goal: 'mate',
          intro: "Le <b>mat arabe</b> (l'un des plus anciens connus) associe la <b>Tour et le Cavalier</b> : le Cavalier garde les cases de fuite, la Tour donne le mat juste à côté du Roi.",
          task: "Trouve le coup de Tour qui mate le Roi dans le coin, soutenu par le Cavalier.",
          hint: "Th7 : la Tour mate le Roi en h8, protégée par le Cavalier en f6 (qui contrôle g8). Le Roi est pris au piège. Mat !",
          done: "Mat arabe ! ⚔️ Tour + Cavalier, un duo vieux de mille ans." }
      ]
    },
    {
      id: 'l10', icon: '🔥', title: "Mat en 2 coups",
      sub: "Le défi suprême : calcule deux coups à l'avance",
      lessons: [
        { id: 'l10a', type: 'mate2', title: "Mat étouffé — sacrifice de Dame",
          fen: '5r1k/6pp/7N/8/8/1Q6/8/6K1 w - - 0 1',
          intro: "Le plus beau coup des échecs : un <b>sacrifice de Dame</b> pour forcer le mat étouffé. Le Roi noir est presque enfermé — il ne manque qu'à boucher sa dernière case de fuite… avec une pièce ennemie !",
          task: "Trouve le premier coup qui force le mat en 2 coups. (Indice : ose sacrifier !)",
          hint: "Dg8+ !! La Tour est obligée de prendre (Txg8), ce qui bouche la case g8. Ensuite, Cf7 est mat : le Roi est totalement étouffé.",
          done: "CHEF-D'ŒUVRE ! 🎇 Sacrifice de Dame puis mat étouffé — le coup le plus célèbre des échecs." },
        { id: 'l10b', type: 'mate2', title: "Mater avec la Dame et le Roi",
          fen: '4k3/8/4K3/8/8/8/3Q4/8 w - - 0 1',
          intro: "Savoir mater avec <b>Dame + Roi</b> contre Roi seul est <b>indispensable</b> : c'est la fin de partie la plus fréquente. L'idée : la Dame confine le Roi au bord, ton Roi l'épaule, et c'est mat.",
          task: "Trouve un coup qui enferme le Roi adverse pour mater au coup suivant.",
          hint: "Rapproche la Dame pour contrôler les cases de fuite — par exemple Dd7, qui cloue le Roi sur sa rangée. Au coup suivant, c'est mat.",
          done: "Technique maîtrisée ! Tu sais désormais convertir Dame + Roi en victoire. 👑" },
        { id: 'l10c', type: 'mate2', title: "Fais travailler ton Roi",
          fen: '8/8/8/8/KQ6/8/8/k7 w - - 0 1',
          intro: "Erreur classique du débutant : vouloir mater avec la Dame <b>seule</b>. Impossible ! Le <b>Roi doit aider</b>. Ici, la Dame tient déjà le Roi noir ; c'est à ton Roi d'avancer pour porter le coup final.",
          task: "Trouve le coup qui prépare le mat en 2… ce n'est pas un coup de Dame !",
          hint: "Rb3 : ton Roi s'approche pour soutenir la Dame. Le Roi noir se retrouve totalement bloqué, et tu mates au coup suivant.",
          done: "Bravo ! Tu as compris la clé des finales : le Roi est aussi une pièce d'attaque. 🏁" }
      ]
    },
    {
      id: 'l11', icon: '📖', title: "Les ouvertures",
      sub: "Bien démarrer : principes et premières ouvertures",
      lessons: [
        { id: 'l11a', type: 'info', title: "Les 3 règles d'or (+ 2 pièges)",
          fen: 'start',
          intro: "On passe au niveau supérieur. Une bonne ouverture tient en <b>3 règles</b> : <b>1)</b> occupe le <b>centre</b> avec un pion (e4 ou d4) ; <b>2)</b> <b>développe</b> tes pièces légères (Cavaliers puis Fous) vers le centre ; <b>3)</b> mets ton <b>Roi en sécurité</b> en roquant tôt. Deux pièges mortels à éviter : <b>ne sors pas ta Dame trop tôt</b> (l'adversaire la chasse en développant ses pièces et gagne du temps), et <b>ne joue pas dix fois la même pièce</b> — active une pièce nouvelle à chaque coup." },
        { id: 'l11b', type: 'move', title: "L'Ouverture Italienne",
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 3 3', preselect: 'f1',
          intro: "Après <b>1.e4 e5 2.Cf3 Cc6</b>, l'une des ouvertures les plus anciennes et les plus saines : l'<b>Italienne</b>. On développe le Fou sur la case <b>c4</b>, d'où il vise directement le point <b>f7</b> — la case la plus faible du camp adverse (défendue seulement par le Roi).",
          task: "Développe ton Fou de f1 vers la case marquée <b>c4</b>.",
          solution: ['Bc4'], hint: "Fc4 : le Fou file en diagonale de f1 à c4, pointé sur f7. Une pièce développée, active et agressive.",
          done: "Fc4 ! Fou développé, centre tenu, pression sur f7 — une ouverture de maître." },
        { id: 'l11c', type: 'move', title: "Roquer tôt (règle n°3)",
          fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', preselect: 'e1',
          intro: "Tes pièces légères du côté roi sont sorties : il est temps d'appliquer la <b>règle n°3</b> — la <b>sécurité du Roi</b>. Le petit roque met le Roi à l'abri dans son coin et <b>active la Tour</b> vers le centre. Règle simple : <b>roque dans les 10 premiers coups.</b>",
          task: "Effectue le <b>petit roque</b> : clique le Roi, puis la case g1.",
          solution: ['O-O'], hint: "Sélectionne le Roi en e1 et joue-le en g1 : la Tour h1 saute automatiquement en f1. Roi en sécurité !",
          done: "Roque réussi ! Roi à l'abri, Tour activée — tu joues déjà comme un vrai joueur de club." },
        { id: 'l11d', type: 'move', title: "Développer avec un but",
          fen: 'rnbqkbnr/ppp2ppp/8/3pp3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3', preselect: 'b1',
          intro: "Chaque coup d'ouverture doit <b>développer</b> une pièce vers le centre, idéalement en créant une menace. Sors tes Cavaliers vers c3 et f3 : ils contrôlent les cases centrales d4, e5, d5, e4.",
          task: "Développe ton Cavalier de b1 vers la case marquée <b>c3</b> (il attaque le pion d5 et contrôle le centre).",
          solution: ['Nc3'], hint: "Cc3 : le Cavalier sort au centre, attaque d5 et prépare la suite. Développement parfait.",
          done: "Cc3 ! Deux Cavaliers au centre, tu domines les cases clés." },
        { id: 'l11e', type: 'info', title: "Quelques ouvertures célèbres",
          fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
          intro: "Tu n'as pas besoin de tout mémoriser : les <b>principes</b> suffisent. Mais connais les grandes idées : l'<b>Espagnole / Ruy Lopez</b> (ci-dessus, 1.e4 e5 2.Cf3 Cc6 3.Fb5) met la pression sur le Cavalier c6 ; la <b>Sicilienne</b> (1.e4 c5) est la défense la plus combative des Noirs ; la <b>Française</b> (1.e4 e6) est solide ; le <b>Gambit Dame</b> (1.d4 d5 2.c4) lutte pour le centre. Un <b>gambit</b>, c'est <b>offrir un pion</b> pour prendre de l'avance en développement et ouvrir des lignes vers le Roi adverse." }
      ]
    },
    {
      id: 'l12', icon: '🗺️', title: "Le milieu de jeu",
      sub: "Les plans stratégiques qui gagnent les parties",
      lessons: [
        { id: 'l12a', type: 'info', title: "Avoir un plan + l'activité",
          fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
          intro: "L'ouverture finie, place à la <b>stratégie</b>. La règle d'or du milieu de jeu : <b>une pièce active vaut bien plus qu'une pièce passive.</b> Avant chaque coup, demande-toi : « Quelle est ma pièce la moins active ? Comment l'améliorer ? » Place tes pièces sur des cases où elles contrôlent beaucoup de cases centrales et visent le camp adverse. Un plan simple et clair bat toujours des coups joués au hasard." },
        { id: 'l12b', type: 'move', title: "Les colonnes ouvertes → les Tours",
          fen: 'r3k3/ppp2ppp/8/8/8/8/PPP2PPP/R3K3 w - - 0 1', preselect: 'a1',
          intro: "Les <b>Tours</b> sont maladroites au début, mais deviennent surpuissantes sur les <b>colonnes ouvertes</b> (sans pions). Une Tour sur une colonne ouverte pénètre dans le camp adverse (7ᵉ rangée !) et attaque. Ici, la <b>colonne d</b> est entièrement ouverte.",
          task: "Empare-toi de la colonne ouverte : amène ta Tour de a1 en <b>d1</b>.",
          solution: ['Rd1'], hint: "Td1 : la Tour prend la colonne ouverte d. De là, elle vise tout le camp adverse. C'est le bon plan.",
          done: "Td1 ! Tu contrôles la colonne ouverte — un avantage stratégique durable." },
        { id: 'l12c', type: 'move', title: "L'avant-poste du Cavalier",
          fen: 'r1bqkb1r/ppp2ppp/2n2n2/3p4/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 1', preselect: 'f3',
          intro: "Le Cavalier adore les <b>avant-postes</b> : une case avancée (souvent au centre, en d5/e5/d4/e4) où il est <b>protégé par un pion</b> et ne peut plus être chassé par un pion adverse. Un Cavalier bien posté au cœur de la position vaut parfois une Tour !",
          task: "Installe ton Cavalier au centre : joue-le de f3 en <b>e5</b>, soutenu par ton pion d4.",
          solution: ['Ne5'], hint: "Ce5 : le Cavalier s'installe au centre, protégé par le pion d4. Un avant-poste dominant.",
          done: "Ce5 ! Cavalier central et protégé — il gêne tout le jeu adverse." },
        { id: 'l12d', type: 'info', title: "Le bon et le mauvais Fou",
          fen: 'r1bqk2r/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1',
          intro: "Un <b>Fou</b> ne se déplace que sur une couleur de cases. Si <b>tes propres pions</b> sont bloqués sur cette même couleur, ton Fou est enfermé derrière eux : c'est un <b>« mauvais Fou »</b>. Garde tes pions sur la couleur <b>opposée</b> à ton Fou pour qu'il reste actif. Règle pratique : si ton Fou est mauvais, cherche à l'échanger ou à le sortir hors de la chaîne de pions." },
        { id: 'l12e', type: 'info', title: "La structure de pions",
          fen: 'r3k2r/pp3ppp/2p5/3p4/3P4/2P5/PP3PPP/R3K2R w KQkq - 0 1',
          intro: "Les pions ne reculent jamais : leur structure décide souvent de la partie. Les faiblesses à connaître : le <b>pion isolé</b> (sans pion ami sur les colonnes voisines — difficile à défendre), les <b>pions doublés</b> (deux pions sur la même colonne — ils se gênent), et surtout le <b>pion passé</b> (aucun pion adverse ne peut l'arrêter) : c'est une arme, pousse-le vers la promotion ! Vise les pions faibles de l'adversaire, protège les tiens." },
        { id: 'l12f', type: 'move', title: "Pousser un pion passé",
          fen: '8/8/4P1k1/8/8/8/6K1/8 w - - 0 1', preselect: 'e6',
          intro: "Un <b>pion passé</b> (plus aucun pion adverse devant lui ni sur les colonnes voisines) est une menace permanente : chaque pas le rapproche de la <b>promotion</b> en Dame. « Un pion passé doit être poussé ! »",
          task: "Fais avancer ton pion passé de e6 vers <b>e7</b> — une case de plus vers la Dame.",
          solution: ['e7'], hint: "e7 : le pion avance vers la promotion. Soutenu par ton Roi, il deviendra Dame.",
          done: "e7 ! Encore un pas et c'est une nouvelle Dame. Les pions passés gagnent les finales." }
      ]
    },
    {
      id: 'l13', icon: '🧩', title: "Tactiques avancées",
      sub: "Les combinaisons des joueurs confirmés",
      lessons: [
        { id: 'l13a', type: 'info', title: "Enlever le défenseur",
          fen: '3r2k1/5ppp/8/8/8/8/8/3R2K1 w - - 0 1',
          intro: "Une case ou une pièce n'est forte que si elle est <b>défendue</b>. L'idée maîtresse : <b>élimine le défenseur</b> (capture-le ou chasse-le), et la cible tombe. Ici, la Tour noire en d8 est le <b>seul défenseur</b> de la dernière rangée. Supprime-la… et c'est le mat !" },
        { id: 'l13b', type: 'goal', title: "Applique : enlève le défenseur",
          fen: '3r2k1/5ppp/8/8/8/8/8/3R2K1 w - - 0 1', preselect: 'd1', goal: 'mate',
          intro: "La Tour noire en d8 garde la 8ᵉ rangée. Débarrasse-t'en, et le Roi muré par ses pions est perdu.",
          task: "Donne <b>échec et mat</b> en un coup.",
          hint: "Txd8 : ta Tour capture l'unique défenseur en d8 et donne échec sur la dernière rangée. Le Roi, enfermé par f7/g7/h7, n'a aucune fuite. Mat !",
          done: "Txd8 mat ! 🎯 Supprimer le défenseur : une idée qui gagne des centaines de parties." },
        { id: 'l13c', type: 'info', title: "La déviation",
          fen: '6k1/5ppp/8/q7/8/8/5PPP/R5K1 w - - 0 1',
          intro: "La <b>déviation</b> force une pièce adverse à <b>quitter</b> une tâche importante (défendre une case, bloquer une colonne, protéger le Roi). On l'attire ailleurs avec une menace ou un sacrifice, puis on frappe là où elle ne garde plus. « Occupe le gardien, puis cambriole la maison. »" },
        { id: 'l13d', type: 'info', title: "L'attraction (par sacrifice)",
          fen: '5rk1/5p1p/8/8/8/8/8/4R1K1 w - - 0 1',
          intro: "L'<b>attraction</b> est l'inverse : au lieu d'éloigner une pièce, tu l'<b>attires</b> (souvent le Roi) sur une case fatale — généralement par un <b>sacrifice</b>. Le Roi attiré au centre ou sur une mauvaise case tombe ensuite dans une fourchette, un échec double ou un mat. Les plus beaux coups des échecs sont des attractions." },
        { id: 'l13e', type: 'info', title: "Le coup intermédiaire (Zwischenzug)",
          fen: 'r2q1rk1/ppp2ppp/2n2n2/3p4/3P4/2N2N2/PPP2PPP/R2Q1RK1 w - - 0 1',
          intro: "Le <b>Zwischenzug</b> (« coup intermédiaire ») est une arme de maître : au lieu de reprendre immédiatement une pièce, tu glisses d'abord un <b>coup plus fort</b> (souvent un échec ou une grosse menace) — l'adversaire doit y répondre, et <b>ensuite</b> seulement tu reprends, avec un gain en plus. Avant de reprendre « automatiquement », demande-toi toujours : « Ai-je un coup encore plus fort ? »" },
        { id: 'l13f', type: 'info', title: "L'interférence",
          fen: '3r2k1/5ppp/8/8/8/2B5/5PPP/6K1 w - - 0 1',
          intro: "L'<b>interférence</b> consiste à <b>couper la communication</b> entre deux pièces adverses en interposant (souvent en sacrifiant) une pièce sur la ligne qui les relie. Le défenseur est soudain séparé de ce qu'il protégeait, et la cible tombe. Rare, spectaculaire — la marque des joueurs forts." }
      ]
    },
    {
      id: 'l14', icon: '⏳', title: "Les finales",
      sub: "Savoir conclure quand il reste peu de pièces",
      lessons: [
        { id: 'l14a', type: 'info', title: "Active ton Roi !",
          fen: '8/8/4k3/8/8/4K3/8/8 w - - 0 1',
          intro: "Changement de mentalité : en <b>finale</b> (peu de pièces), le Roi n'est plus une cible à cacher — il devient une <b>pièce forte et active</b> ! Un Roi au centre vaut environ autant qu'un Fou. Règle d'or des finales : <b>avance ton Roi vers le centre et vers les pions.</b> Le joueur dont le Roi est le plus actif gagne souvent." },
        { id: 'l14b', type: 'info', title: "L'opposition",
          fen: '8/8/8/3k4/8/3K4/3P4/8 w - - 0 1',
          intro: "L'<b>opposition</b> est LA clé des finales de pions : quand les deux Rois se font face, séparés d'<b>une seule case</b> (ici Rd3 et Rd5), celui qui <b>n'a PAS le trait</b> a « l'opposition » et contrôle le duel — il force l'autre Roi à reculer. Pour faire passer ton pion, prends d'abord l'opposition avec ton Roi, puis avance. Maîtriser l'opposition, c'est gagner (ou sauver) d'innombrables finales." },
        { id: 'l14c', type: 'info', title: "La règle du carré",
          fen: '7k/8/8/8/P7/8/8/K7 w - - 0 1',
          intro: "Un pion passé court vers la promotion : le Roi adverse peut-il le rattraper <b>sans calculer</b> ? Trace le <b>carré</b> dont un côté va du pion à sa case de promotion. <b>Si le Roi adverse peut entrer dans ce carré</b> (à son tour de jouer), il attrape le pion ; sinon, le pion passe et fait Dame. Une astuce visuelle qui t'évite de compter case par case." },
        { id: 'l14d', type: 'goal', title: "Mater avec la Dame et le Roi",
          fen: '7k/5Q2/6K1/8/8/8/8/8 w - - 0 1', preselect: 'f7', goal: 'mate',
          intro: "La finale la plus fréquente : <b>Dame + Roi contre Roi</b>. La méthode : la Dame pousse le Roi adverse au <b>bord</b>, le Roi blanc vient l'épauler, et on mate. Ton Roi en g6 soutient déjà la Dame — conclus !",
          task: "Donne échec et mat en un coup.",
          hint: "Dg7 : la Dame se place juste à côté du Roi noir, protégée par ton Roi en g6. Le Roi en h8 n'a aucune case. Mat !",
          done: "Dame + Roi, c'est mat ! 👑 Tu sais désormais convertir cette finale essentielle." },
        { id: 'l14e', type: 'info', title: "Finales de Tours : les 2 à connaître",
          fen: '8/8/4k3/8/8/4K3/4P3/4R1r1 w - - 0 1',
          intro: "Les finales de <b>Tours</b> sont les plus fréquentes du jeu — connais ces deux positions clés. La <b>position de Lucena</b> (« construire un pont ») : le camp fort fait Dame grâce à un abri créé pour son Roi avec la Tour — c'est une <b>victoire</b>. La <b>position de Philidor</b> : le camp faible tient la <b>nulle</b> en gardant sa Tour active sur la 6ᵉ rangée, puis en donnant des échecs par derrière. Règle d'or : en finale de Tour, garde ta <b>Tour active</b> (jamais passive) et place-la <b>derrière</b> le pion passé." }
      ]
    },
    {
      id: 'l15', icon: '💥', title: "L'attaque sur le Roi",
      sub: "Mener l'assaut contre le Roi adverse",
      lessons: [
        { id: 'l15a', type: 'info', title: "Ouvrir les lignes vers le Roi",
          fen: 'r1bq1rk1/ppp2ppp/2n5/8/8/2N5/PPP2PPP/R1BQ1RK1 w - - 0 1',
          intro: "Pour attaquer un Roi roqué, il faut des <b>lignes ouvertes</b> (colonnes et diagonales) qui mènent jusqu'à lui. Trois leviers : <b>dirige tes pièces</b> vers le roque adverse (Dame, Tours, Fous), <b>ouvre une colonne</b> devant son Roi (par un échange ou une poussée de pion), et attaque avec le <b>nombre</b> : il faut plus d'attaquants que de défenseurs. Compte tes attaquants, compte ses défenseurs." },
        { id: 'l15b', type: 'goal', title: "Le sacrifice classique (Dame soutenue)",
          fen: '7k/6pp/7Q/8/8/8/1B6/6K1 w - - 0 1', preselect: 'h6', goal: 'mate',
          intro: "L'arme la plus belle de l'attaque : la <b>Dame qui se glisse à côté du Roi</b>, <b>protégée</b> par un Fou sur la grande diagonale. Ton Fou en b2 tient la case g7 ; le Roi noir est presque étouffé par ses pions.",
          task: "Donne échec et mat en un coup avec la Dame.",
          hint: "Dxg7 : la Dame prend le pion g7 et met le Roi en échec, <b>protégée par le Fou b2</b>. Le Roi ne peut pas la capturer, et il n'a aucune fuite. Mat !",
          done: "Dxg7 mat ! 💥 Dame + Fou sur la grande diagonale : un schéma d'attaque dévastateur." },
        { id: 'l15c', type: 'info', title: "Le sacrifice grec (Fou en h7)",
          fen: 'r1bq1rk1/ppp1bppp/2n5/3p4/3P4/2NB4/PPP2PPP/R1BQ1RK1 w - - 0 1',
          intro: "Le <b>sacrifice grec</b> (ou « Greek gift ») est le sacrifice d'attaque le plus célèbre : <b>Fxh7+ !</b> On donne le Fou en h7 pour <b>attirer le Roi</b> à découvert (…Rxh7), puis <b>Cg5+</b> et la <b>Dame arrive</b> (Dh5) pour mater. Il fonctionne quand ton Fou vise h7, qu'un Cavalier peut sauter en g5 et que la Dame peut rejoindre l'attaque. Un motif à reconnaître des deux côtés !" },
        { id: 'l15d', type: 'info', title: "La tempête de pions",
          fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3P4/2P1PN2/PP1NBPPP/R1BQ1RK1 w - - 0 1',
          intro: "Quand les deux Rois ont roqué du <b>même côté</b>, on attaque avec les pièces. Mais s'ils ont roqué de <b>côtés opposés</b>, place à la <b>tempête de pions</b> : lance tes pions devant le Roi adverse (g4-g5, h4-h5…) pour <b>ouvrir des colonnes</b> à tes Tours. Celui qui arrive le premier gagne la course. Ne crains pas d'avancer tes propres pions du roque : ton Roi est à l'opposé." },
        { id: 'l15e', type: 'info', title: "Attirer le Roi au centre",
          fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
          intro: "Un Roi qui n'a <b>pas roqué</b> et reste au centre est une cible rêvée : ouvre le centre (poussées et échanges de pions) pour exposer ce Roi aux Tours et à la Dame. Punir un adversaire qui néglige le roque est l'une des façons les plus rapides de gagner — et c'est pourquoi toi, tu roques tôt !" }
      ]
    },
    {
      id: 'l16', icon: '🏆', title: "Penser comme un maître",
      sub: "La stratégie supérieure et la bonne méthode",
      lessons: [
        { id: 'l16a', type: 'info', title: "La prophylaxie",
          fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
          intro: "Le secret des grands joueurs : la <b>prophylaxie</b>. Avant de jouer ton plan, demande-toi toujours : « Que veut faire mon adversaire ? Quelle est SA menace ? » — puis <b>empêche-la</b> d'abord. Un maître ne pense pas seulement à son propre jeu : il anticipe et neutralise les idées adverses avant qu'elles n'arrivent. Un coup qui améliore ta position <b>et</b> gêne l'adversaire est un coup parfait." },
        { id: 'l16b', type: 'info', title: "Évaluer une position",
          fen: 'r2q1rk1/pp2bppp/2n1pn2/2pp4/3P4/2PBPN2/PP1N1PPP/R1BQ1RK1 w - - 0 1',
          intro: "Pour choisir un plan, <b>évalue</b> la position selon 5 critères : <b>1) le matériel</b> (qui a plus de pièces ?), <b>2) la sécurité des Rois</b>, <b>3) l'activité des pièces</b> (qui est mieux développé, mieux placé ?), <b>4) la structure de pions</b> (faiblesses, pions passés), <b>5) le centre et l'espace</b>. Celui qui mène sur la plupart de ces points est mieux — et doit jouer pour attaquer. Celui qui est moins bien doit défendre et simplifier." },
        { id: 'l16c', type: 'info', title: "Quand échanger (et convertir)",
          fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
          intro: "Savoir <b>échanger</b> au bon moment est un art. Règles sûres : quand tu as <b>plus de matériel</b>, <b>échange les pièces</b> (pas les pions !) — moins il reste de pièces, plus ton avantage se voit, et plus la finale est facile à gagner. Quand tu <b>attaques</b>, garde au contraire tes attaquants. Échange tes pièces <b>passives</b> contre les pièces <b>actives</b> de l'adversaire. Convertir un avantage, c'est simplifier vers une finale gagnante, sans précipitation." },
        { id: 'l16d', type: 'goal', title: "Toujours chercher le mat !",
          fen: 'r5k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1', preselect: 'a1', goal: 'mate',
          intro: "La leçon finale, celle qu'oublient même les joueurs avancés : <b>avant de gagner du matériel, cherche TOUJOURS s'il y a un mat.</b> Ici, on pourrait jouer tranquillement… mais il y a bien mieux. Examine les <b>échecs</b> d'abord !",
          task: "Trouve l'échec et mat en un coup.",
          hint: "Txa8 : ta Tour capture la Tour adverse ET donne échec sur la dernière rangée. Le Roi, muré par f7/g7/h7, est mat. Toujours vérifier les échecs d'abord !",
          done: "Txa8 mat ! 🏆 Tu as terminé l'Académie — du plateau vide jusqu'à la pensée de maître. Félicitations, champion !" },
        { id: 'l16e', type: 'info', title: "Les erreurs classiques à bannir",
          fen: 'start',
          intro: "Pour franchir un palier, élimine ces erreurs fréquentes : jouer <b>trop vite</b> (vérifie toujours si ton coup laisse une pièce en prise, ou s'il rate l'échec adverse) ; <b>oublier le plan de l'adversaire</b> (prophylaxie !) ; <b>attaquer sans avoir développé</b> ; <b>échanger sans raison</b> sa bonne pièce ; et <b>abandonner trop tôt</b> — beaucoup de parties se sauvent par un pat ou une astuce. Avant chaque coup : « Est-ce que ça laisse quelque chose en prise ? Quelle est sa menace ? »" },
        { id: 'l16f', type: 'info', title: "Devenir fort : la méthode",
          fen: 'start',
          intro: "Tu connais désormais tout : pièces, tactiques, stratégie, finales, attaque. Pour continuer à progresser, la méthode des maîtres est simple : <b>1)</b> résous des <b>problèmes de tactique</b> chaque jour (c'est ce qui fait gagner le plus de points) ; <b>2)</b> <b>joue</b> des parties, puis <b>analyse</b>-les (sers-toi du mode « Jouer » et du bilan de partie de Brio) ; <b>3)</b> <b>rejoue les parties des grands maîtres</b> pour nourrir ton intuition ; <b>4)</b> apprends une ou deux ouvertures que tu aimes. Régularité + curiosité = progrès. Et pour t'entraîner comme sur les grands sites : passe aux <b>problèmes de mat</b> ci-dessous ! ♟️" }
      ]
    },
    {
      id: 'l17', icon: '🎖️', title: "Entraînement au mat en 2",
      sub: "Des problèmes multi-coups : joue toute la combinaison",
      lessons: [
        { id: 'l17a', type: 'mate', mateIn: 2, title: "Le mat étouffé (sacrifice)",
          fen: '5r1k/6pp/7N/8/2Q5/8/8/6K1 w - - 0 1',
          intro: "Bienvenue dans l'<b>entraînement au mat</b>, façon grands sites d'échecs : ici tu joues <b>toute la combinaison</b>, et l'adversaire répond tout seul. Pour commencer, un classique spectaculaire : un <b>sacrifice de Dame</b> qui force le mat étouffé.",
          task: "Trouve le <b>mat en 2 coups</b>. (Indice : ose sacrifier !)",
          hint: "Dg8+ !! La Tour est obligée de prendre (Txg8), ce qui bouche la dernière case de fuite. Puis Cf7 est mat : le Roi est totalement étouffé.",
          done: "Sacrifice de Dame + mat étouffé ! 🎇 Le plus beau mat des échecs, exécuté à la perfection." },
        { id: 'l17b', type: 'mate', mateIn: 2, title: "La technique Dame + Roi (1)",
          fen: '8/8/8/7k/8/5K2/8/Q7 w - - 0 1',
          intro: "La finale <b>Dame + Roi contre Roi seul</b> est à maîtriser absolument — tu la rencontreras souvent. La <b>technique</b> : garde ta Dame à un <b>saut de Cavalier</b> du Roi adverse pour le pousser vers le bord, amène ton Roi, puis mate. Ici, c'est un mat en 2.",
          task: "Trouve le <b>mat en 2 coups</b>.",
          hint: "Confine d'abord le Roi noir tout au bord avec ta Dame (Dg7 le colle à la dernière rangée), puis mate au coup suivant.",
          done: "Technique maîtrisée ! Dame + Roi, c'est un mat forcé." },
        { id: 'l17c', type: 'mate', mateIn: 2, title: "La technique Dame + Roi (2)",
          fen: '8/8/8/8/8/2K5/Q7/4k3 w - - 0 1',
          intro: "Même thème, autre position. Souviens-toi : la Dame <b>seule</b> ne peut pas mater — ton Roi doit l'épauler. Place ta Dame pour réduire la cage du Roi adverse, sans jamais le laisser s'échapper (ni le mettre au pat !).",
          task: "Trouve le <b>mat en 2 coups</b>.",
          hint: "Rapproche la Dame (Dg2) pour enfermer le Roi sur la dernière rangée, en gardant ton Roi en soutien. Mat au coup suivant.",
          done: "Parfait ! Tu convertis Dame + Roi en victoire sans hésiter." },
        { id: 'l17d', type: 'mate', mateIn: 2, title: "Fais avancer ton Roi",
          fen: '8/8/1Q6/8/k7/8/2K5/8 w - - 0 1',
          intro: "Dernier entraînement au mat en 2 : parfois le bon premier coup n'est <b>pas</b> un coup de Dame, mais un pas de <b>Roi</b> pour fermer la dernière case de fuite. Pense « équipe » : la Dame tient, le Roi s'approche.",
          task: "Trouve le <b>mat en 2 coups</b>.",
          hint: "Avance ton Roi (Rc3 ou Rc2 selon la position) pour contrôler les cases de fuite : le Roi noir se retrouve coincé, et la Dame mate.",
          done: "Bravo ! Le Roi est une pièce d'attaque — tu l'as compris et appliqué. 🎖️" }
      ]
    },
    {
      id: 'l18', icon: '🥇', title: "Mat en 3 — niveau maître",
      sub: "Calcule trois coups à l'avance, comme un grand maître",
      lessons: [
        { id: 'l18a', type: 'mate', mateIn: 3, title: "Mat en 3 (1)",
          fen: '8/8/8/8/2K5/8/Q7/4k3 w - - 0 1',
          intro: "Le vrai test du calcul : le <b>mat en 3 coups</b>. Tu dois prévoir ta manœuvre ET les réponses de l'adversaire, trois coups à l'avance. Applique la technique Dame + Roi : <b>resserre la cage</b> pas à pas, avance ton Roi, et conclus. Chaque coup doit garder le mat <b>forcé</b>.",
          task: "Mate le Roi noir en <b>3 coups</b> — joue la combinaison complète.",
          hint: "Rapproche la Dame pour limiter le Roi à quelques cases, amène ton Roi pour le soutien, puis donne le mat. Vérifie à chaque coup que le mat reste inévitable.",
          done: "Mat en 3 trouvé ! 🥇 Tu calcules déjà comme un joueur confirmé." },
        { id: 'l18b', type: 'mate', mateIn: 3, title: "Mat en 3 (2)",
          fen: '7Q/8/8/8/8/2K5/8/4k3 w - - 0 1',
          intro: "La Dame est loin : il faut la rapprocher avec <b>précision</b>, puis coordonner avec le Roi. Pense d'abord à la <b>case de mat</b> finale, puis remonte le fil : quels coups y mènent en forçant l'adversaire ?",
          task: "Mate le Roi noir en <b>3 coups</b>.",
          hint: "Approche la Dame d'un saut de Cavalier du Roi adverse pour le confiner, fais avancer ton Roi, puis mate. L'adversaire n'a aucune échappatoire.",
          done: "Encore un mat en 3 maîtrisé ! Ta vision se précise, coup après coup." },
        { id: 'l18c', type: 'mate', mateIn: 3, title: "Mat en 3 (3) — le diplôme",
          fen: 'Q7/8/8/7k/8/4K3/8/8 w - - 0 1',
          intro: "L'épreuve finale de l'Académie. Le Roi noir est au large, ta Dame à l'autre bout : à toi de l'<b>encercler</b> méthodiquement et de le mater en trois coups précis. Réussis, et tu auras parcouru tout le chemin — du plateau vide jusqu'à la technique de maître.",
          task: "Mate le Roi noir en <b>3 coups</b> et décroche ton diplôme !",
          hint: "Pas à pas : réduis l'espace du Roi avec la Dame (sans pat !), approche ton Roi, puis assène le mat. Pense à la position finale et remonte.",
          done: "🏆 DIPLÔME DE MAÎTRE ! Tu as terminé toute l'Académie — des règles de base jusqu'au mat en 3 calculé. Bravo, champion. Continue à t'entraîner et à jouer : le meilleur reste à venir !" }
      ]
    },

    /* ================== NIVEAU 19 — OUVERTURES EN BLANCS ================== */
    {
      id: 'l19', icon: '📘', title: "Ouvertures — avec les Blancs",
      sub: "Jouer l'ouverture coup par coup, et comprendre chaque coup",
      lessons: [
        { id: 'l19a', type: 'info', title: "Les 3 principes de l'ouverture",
          fen: 'start',
          intro: "Une bonne ouverture tient en <b>trois principes</b> : <b>1) occuper le centre</b> (les pions e et d), <b>2) développer</b> ses pièces légères (Cavaliers et Fous) vers des cases actives, <b>3) mettre le Roi à l'abri</b> par le roque. À partir d'ici, tu <b>joues toi-même</b> les coups de la théorie : glisse ou clique la pièce, et l'adversaire répondra. Chaque coup est expliqué." },
        { id: 'l19b', type: 'line', orient: 'w', title: "La partie Italienne",
          fen: 'start',
          intro: "L'<b>Italienne</b> est l'ouverture idéale pour apprendre : chaque pièce va à sa place naturelle et les trois principes sont respectés.",
          task: "Joue les coups des <b>Blancs</b>. L'adversaire répond tout seul.",
          done: "Italienne maîtrisée ! Développement harmonieux et Roi à l'abri.",
          line: [
            { san: 'e4',  note: "On occupe le centre et on ouvre les lignes du Fou f1 et de la Dame." },
            { san: 'e5',  note: "Les Noirs contestent le centre symétriquement." },
            { san: 'Nf3', note: "On attaque le pion e5 tout en développant un Cavalier vers le centre." },
            { san: 'Nc6', note: "Les Noirs défendent e5 en développant à leur tour." },
            { san: 'Bc4', note: "Le Fou vise f7, la case la plus fragile du camp noir." },
            { san: 'Bc5', note: "Les Noirs imitent : Fou actif pointé vers f2." },
            { san: 'c3',  note: "On prépare d4 pour bâtir un grand centre de pions." },
            { san: 'Nf6', note: "Les Noirs se développent et attaquent e4." },
            { san: 'd3',  note: "On soutient solidement e4 (le calme « Giuoco Pianissimo »)." },
            { san: 'd6',  note: "Les Noirs soutiennent e5 de la même manière." },
            { san: 'O-O', note: "Le petit roque : priorité en ouverture, le Roi est en sécurité." },
            { san: 'O-O', note: "Les Noirs roquent aussi. Développement terminé des deux côtés !" }
          ] },
        { id: 'l19c', type: 'line', orient: 'w', title: "L'Espagnole (Ruy López)",
          fen: 'start',
          intro: "La <b>Ruy López</b> est l'une des ouvertures les plus respectées : les Blancs mettent une pression durable sur le pion e5 via le Cavalier c6.",
          task: "Joue les coups des <b>Blancs</b> de l'Espagnole.",
          done: "Espagnole jouée comme un livre ! Une pression saine et durable.",
          line: [
            { san: 'e4',  note: "Le centre, d'abord." },
            { san: 'e5',  note: "Réponse classique au centre." },
            { san: 'Nf3', note: "On attaque e5 immédiatement." },
            { san: 'Nc6', note: "Les Noirs défendent e5." },
            { san: 'Bb5', note: "L'Espagnole : le Fou attaque le Cavalier qui défend e5 (clouage indirect)." },
            { san: 'a6',  note: "Le coup Morphy : les Noirs questionnent le Fou." },
            { san: 'Ba4', note: "On maintient la pression en gardant la diagonale vers c6." },
            { san: 'Nf6', note: "Les Noirs se développent et attaquent e4." },
            { san: 'O-O', note: "On roque : la sécurité d'abord, e4 est défendable ensuite." },
            { san: 'Be7', note: "Les Noirs préparent leur propre roque." },
            { san: 'Re1', note: "La Tour soutient e4 et occupe la colonne e." },
            { san: 'b5',  note: "Les Noirs repoussent le Fou avant de consolider." },
            { san: 'Bb3', note: "Le Fou se replie sur la diagonale a2-g8, toujours braqué vers f7." },
            { san: 'd6',  note: "Les Noirs consolident e5 : position espagnole typique." }
          ] },
        { id: 'l19d', type: 'line', orient: 'w', title: "Le Gambit Dame (refusé)",
          fen: 'start',
          intro: "Le <b>Gambit Dame</b> est une ouverture de pion dame : on offre temporairement le pion c4 pour dominer le centre. Ici les Noirs le <b>refusent</b> (Gambit Dame Refusé).",
          task: "Joue les coups des <b>Blancs</b>.",
          done: "Gambit Dame maîtrisé ! Un centre solide et une pression sur d5.",
          line: [
            { san: 'd4',  note: "On prend le centre côté dame." },
            { san: 'd5',  note: "Les Noirs occupent le centre symétriquement." },
            { san: 'c4',  note: "Le Gambit Dame : on offre c4 pour dévier d5 et dominer le centre." },
            { san: 'e6',  note: "Gambit refusé : les Noirs renforcent d5 et libèrent leur Fou f8." },
            { san: 'Nc3', note: "On développe en ajoutant une attaque sur d5." },
            { san: 'Nf6', note: "Les Noirs défendent d5 et se développent." },
            { san: 'Bg5', note: "On cloue le Cavalier f6 pour accentuer la pression sur d5." },
            { san: 'Be7', note: "Les Noirs brisent le clouage en soutenant le Cavalier." },
            { san: 'e3',  note: "On ouvre la voie au Fou f1 et on consolide le pion d4." },
            { san: 'h6',  note: "Les Noirs questionnent le Fou g5." },
            { san: 'Bh4', note: "On garde le clouage : le Fou reste actif." },
            { san: 'O-O', note: "Les Noirs mettent le Roi à l'abri. Position classique et saine." }
          ] }
      ]
    },

    /* ================== NIVEAU 20 — OUVERTURES EN NOIRS ================== */
    {
      id: 'l20', icon: '📙', title: "Ouvertures — avec les Noirs",
      sub: "Répondre à 1.e4 : l'échiquier se retourne, tu joues les Noirs",
      lessons: [
        { id: 'l20a', type: 'info', title: "Jouer avec les Noirs",
          fen: 'start', orient: 'b',
          intro: "Avec les <b>Noirs</b>, on a un temps de retard : l'objectif est d'abord d'<b>égaliser</b> en contestant le centre, puis de contre-attaquer. L'échiquier est maintenant <b>vu de ton côté</b> (les Noirs en bas). Tu vas apprendre trois réponses solides à 1.e4." },
        { id: 'l20b', type: 'line', orient: 'b', title: "La Sicilienne",
          fen: 'start',
          intro: "La <b>Sicilienne</b> est la réponse la plus combative à 1.e4 : au lieu d'imiter, les Noirs attaquent le centre de biais et jouent pour gagner.",
          task: "Joue les coups des <b>Noirs</b>. Les Blancs commencent.",
          done: "Sicilienne Najdorf — une arme redoutable entre tes mains !",
          line: [
            { san: 'e4',   note: "Les Blancs prennent le centre." },
            { san: 'c5',   note: "La Sicilienne : on conteste d4 de biais, sans symétrie. L'ouverture la plus ambitieuse des Noirs." },
            { san: 'Nf3',  note: "Les Blancs développent et préparent d4." },
            { san: 'd6',   note: "On contrôle e5 et on prépare la sortie du Cavalier f6." },
            { san: 'd4',   note: "Les Blancs ouvrent le centre." },
            { san: 'cxd4', note: "On échange un pion de l'aile dame contre un pion central : un atout stratégique durable." },
            { san: 'Nxd4', note: "Les Blancs reprennent, Cavalier bien centralisé." },
            { san: 'Nf6',  note: "On attaque e4 et on se développe." },
            { san: 'Nc3',  note: "Les Blancs défendent e4." },
            { san: 'a6',   note: "Le coup Najdorf : on contrôle b5 et on prépare ...e5 ou ...b5. Flexibilité maximale." }
          ] },
        { id: 'l20c', type: 'line', orient: 'b', title: "La Française",
          fen: 'start',
          intro: "La <b>Française</b> est une ouverture solide : les Noirs préparent ...d5 pour frapper le centre blanc. Seul bémol, le Fou de cases claires devra être activé plus tard.",
          task: "Joue les coups des <b>Noirs</b>.",
          done: "Française maîtrisée — une structure solide comme un roc.",
          line: [
            { san: 'e4',   note: "Les Blancs occupent le centre." },
            { san: 'e6',   note: "La Française : on prépare ...d5 pour attaquer e4." },
            { san: 'd4',   note: "Les Blancs bâtissent un grand centre." },
            { san: 'd5',   note: "On frappe e4 : les Blancs doivent se décider." },
            { san: 'Nc3',  note: "Les Blancs défendent e4 en développant." },
            { san: 'Nf6',  note: "On remet la pression sur e4." },
            { san: 'Bg5',  note: "Les Blancs clouent le Cavalier f6." },
            { san: 'Be7',  note: "On défait le clouage et on prépare le roque." },
            { san: 'e5',   note: "Les Blancs gagnent de l'espace en fermant le centre." },
            { san: 'Nfd7', note: "Le Cavalier recule pour frapper le centre blanc par ...c5 et ...f6." }
          ] },
        { id: 'l20d', type: 'line', orient: 'b', title: "La Caro-Kann",
          fen: 'start',
          intro: "La <b>Caro-Kann</b> ressemble à la Française, mais résout son défaut : on développe le Fou de cases claires <b>hors</b> de la chaîne de pions. Solide et sans faiblesse.",
          task: "Joue les coups des <b>Noirs</b>.",
          done: "Caro-Kann jouée parfaitement : position saine, bon Fou, aucun point faible.",
          line: [
            { san: 'e4',   note: "Les Blancs prennent le centre." },
            { san: 'c6',   note: "La Caro-Kann : on prépare ...d5, mais sans enfermer le Fou c8." },
            { san: 'd4',   note: "Grand centre blanc." },
            { san: 'd5',   note: "On frappe e4 avec un soutien solide." },
            { san: 'Nc3',  note: "Les Blancs défendent e4." },
            { san: 'dxe4', note: "On clarifie le centre en capturant." },
            { san: 'Nxe4', note: "Les Blancs reprennent, Cavalier centralisé." },
            { san: 'Bf5',  note: "Le coup-clé : on sort le Fou AVANT ...e6. C'est tout l'intérêt de la Caro-Kann." },
            { san: 'Ng3',  note: "Les Blancs attaquent le Fou." },
            { san: 'Bg6',  note: "Le Fou se place sur une bonne diagonale : les Noirs ont une position saine et harmonieuse." }
          ] }
      ]
    },

    /* ================== NIVEAU 21 — PIÈGES D'OUVERTURE ================== */
    {
      id: 'l21', icon: '🎣', title: "Pièges d'ouverture",
      sub: "Punir les erreurs de l'adversaire par un calcul profond",
      lessons: [
        { id: 'l21a', type: 'info', title: "Punir les erreurs",
          fen: 'start',
          intro: "Quand l'adversaire néglige les principes ou devient gourmand, une erreur d'ouverture peut se punir <b>immédiatement</b>. Ces pièges reposent sur un <b>calcul précis</b> : chaque coup de l'adversaire est forcé jusqu'au mat. À utiliser avec discernement — un bon joueur ne tombera pas dedans." },
        { id: 'l21b', type: 'line', orient: 'w', title: "Le mat du Berger",
          fen: 'start',
          intro: "Le plus célèbre des pièges : la Dame et le Fou s'unissent pour fondre sur <b>f7</b>. Il ne marche que si l'adversaire ne voit pas la menace — mais il faut le connaître pour s'en défendre !",
          task: "Joue les <b>Blancs</b> et punis l'erreur noire par le mat.",
          done: "Mat du Berger ! La Dame soutenue par le Fou mate sur f7 : le Roi n'a aucune fuite.",
          line: [
            { san: 'e4',   note: "On ouvre le centre." },
            { san: 'e5',   note: "Réponse symétrique." },
            { san: 'Bc4',  note: "Le Fou braque déjà f7 : chez les Noirs, seul le Roi défend cette case." },
            { san: 'Nc6',  note: "Les Noirs développent — un coup correct." },
            { san: 'Qh5',  note: "On menace Dxf7 mat ! Agressif : sans la menace vue, ...g6 ou ...De7 défendrait." },
            { san: 'Nf6',  note: "L'erreur ! Les Noirs attaquent la Dame mais oublient le mat en f7." },
            { san: 'Qxf7', note: "Échec et mat du Berger ! La Dame capture f7, soutenue par le Fou c4." }
          ] },
        { id: 'l21c', type: 'line', orient: 'w', title: "Le mat de Légal",
          fen: 'start',
          intro: "Le <b>mat de Légal</b> est un chef-d'œuvre : on <b>sacrifie la Dame</b> pour mater avec trois pièces légères. Il punit un clouage mal évalué par les Noirs.",
          task: "Joue les <b>Blancs</b>. Ose le sacrifice de Dame — le mat est forcé !",
          done: "Mat de Légal ! Dame sacrifiée, trois pièces légères matent : le plus élégant des pièges.",
          line: [
            { san: 'e4',   note: "Le centre." },
            { san: 'e5',   note: "Symétrie." },
            { san: 'Nf3',  note: "On attaque e5." },
            { san: 'Nc6',  note: "Les Noirs défendent e5." },
            { san: 'Bc4',  note: "Le Fou vise f7." },
            { san: 'd6',   note: "Les Noirs soutiennent e5 (défense Philidor)." },
            { san: 'Nc3',  note: "On développe tranquillement." },
            { san: 'Bg4',  note: "Les Noirs clouent le Cavalier f3 sur la Dame — cela semble fort." },
            { san: 'h3',   note: "On questionne le Fou : il part ou il reste ?" },
            { san: 'Bh5',  note: "L'erreur : les Noirs maintiennent un clouage qui n'est qu'apparent." },
            { san: 'Nxe5', note: "Le sacrifice ! On prend e5 : si ...Fxd1, le mat suit. (Si ...Cxe5, on regagne la pièce par Dxh5.)" },
            { san: 'Bxd1', note: "Les Noirs prennent la Dame — l'appât. C'est perdant." },
            { san: 'Bxf7', note: "Échec ! Le Fou prend f7." },
            { san: 'Ke7',  note: "Seule case : le Roi doit avancer." },
            { san: 'Nd5',  note: "Échec et mat de Légal ! Les trois mineures matent le Roi au centre." }
          ] },
        { id: 'l21d', type: 'line', orient: 'b', title: "Le piège Blackburne-Shilling",
          fen: 'start',
          intro: "Côté <b>Noirs</b> : un traquenard contre un adversaire gourmand. On tend un appât en e5 ; si les Blancs mordent, leur Roi s'effondre. À réserver aux joueurs trop pressés de gagner du matériel.",
          task: "Joue les <b>Noirs</b> et punis la gourmandise blanche.",
          done: "Piège Blackburne-Shilling ! Mat étouffé : le Roi blanc est enfermé par ses propres pièces.",
          line: [
            { san: 'e4',   note: "Les Blancs ouvrent." },
            { san: 'e5',   note: "On conteste le centre." },
            { san: 'Nf3',  note: "Les Blancs attaquent e5." },
            { san: 'Nc6',  note: "On défend e5." },
            { san: 'Bc4',  note: "Le Fou vise f7." },
            { san: 'Nd4',  note: "Le piège ! On ignore e5 pour tendre un traquenard. À jouer contre un adversaire gourmand." },
            { san: 'Nxe5', note: "Les Blancs mordent à l'appât et menacent f7 — mais c'est l'erreur." },
            { san: 'Qg5',  note: "Double attaque : sur le Cavalier e5 ET sur le pion g2." },
            { san: 'Nxf7', note: "Les Blancs cherchent la fourchette Dame-Tour… en oubliant leur Roi." },
            { san: 'Qxg2', note: "On prend g2 et on attaque la Tour h1." },
            { san: 'Rf1',  note: "Les Blancs sauvent la Tour." },
            { san: 'Qxe4', note: "Échec ! On récupère tout en gardant l'attaque : le Roi blanc est à nu." },
            { san: 'Be2',  note: "Les Blancs bloquent l'échec — forcé." },
            { san: 'Nf3',  note: "Échec et mat ! Mat étouffé : le Roi blanc est enfermé par ses propres pièces." }
          ] }
      ]
    },

    /* ================== NIVEAU 22 — FINALE : DAME + ROI ================== */
    {
      id: 'l22', icon: '♛', title: "Finale : Dame + Roi",
      sub: "La technique de mat la plus utile : Dame et Roi contre Roi",
      lessons: [
        { id: 'l22a', type: 'info', title: "La méthode Dame + Roi",
          fen: '8/8/8/3k4/8/8/8/1Q2K3 w - - 0 1',
          intro: "Avec <b>Dame + Roi contre Roi</b>, on mate en repoussant le Roi adverse vers un <b>bord</b>. Méthode : la Dame se place à un <b>saut de Cavalier</b> du Roi ennemi pour l'enfermer, on <b>amène son propre Roi</b>, puis on mate sur le bord. <b>Attention au pat</b> : ne bloque jamais toutes les cases du Roi sans lui donner échec !" },
        { id: 'l22b', type: 'mate', mateIn: 2, title: "Dame + Roi : mat en 2",
          fen: '2Q5/8/2K5/k7/8/8/8/8 w - - 0 1',
          intro: "Le Roi noir est déjà au bord, ton Roi tout proche. Un coup précis de Dame, et c'est mat au coup suivant.",
          task: "Mate le Roi noir en <b>2 coups</b> avec la Dame.",
          hint: "Approche la Dame pour confiner le Roi sur la colonne a, en gardant ton propre Roi comme soutien. Évite le pat !",
          done: "Parfait ! Dame qui enferme + Roi qui soutient = mat au bord." },
        { id: 'l22c', type: 'mate', mateIn: 2, title: "Dame + Roi : amène ton Roi",
          fen: '8/8/8/k2K4/7Q/8/8/8 w - - 0 1',
          intro: "Ici c'est l'approche du <b>Roi</b> qui compte : sans lui, la Dame seule ne mate pas. Rapproche-le et le mat tombe.",
          task: "Mate en <b>2 coups</b> — pense à faire travailler ton Roi.",
          hint: "Un pas de Roi vers le Roi ennemi prépare le mat de la Dame au bord.",
          done: "Excellent ! La règle d'or : la Dame enferme, mais c'est le Roi qui mate." }
      ]
    },

    /* ================== NIVEAU 23 — FINALE : TOUR + ROI ================== */
    {
      id: 'l23', icon: '♜', title: "Finale : Tour + Roi",
      sub: "Mater avec la Tour : la technique de l'escalier",
      lessons: [
        { id: 'l23a', type: 'info', title: "La méthode Tour + Roi",
          fen: '8/8/8/3k4/8/8/8/R3K3 w - - 0 1',
          intro: "<b>Tour + Roi contre Roi</b> : la Tour seule ne peut pas mater au centre — il faut repousser le Roi adverse vers un bord. Les deux Rois se font face (<b>l'opposition</b>), la Tour donne échec pour pousser le Roi d'une rangée, et on recommence : c'est <b>l'escalier</b>. Mat quand le Roi ennemi atteint le bord." },
        { id: 'l23b', type: 'mate', mateIn: 2, title: "Tour + Roi : mat en 2",
          fen: '8/8/5K2/7k/8/8/1R6/8 w - - 0 1',
          intro: "Les Rois sont presque en opposition, le Roi noir près du bord. La Tour va donner le coup décisif.",
          task: "Mate le Roi noir en <b>2 coups</b> avec la Tour.",
          hint: "Prends l'opposition avec ton Roi ou coupe une rangée avec la Tour, puis mate sur le bord.",
          done: "Bravo ! La Tour mate toujours en repoussant le Roi contre un bord." },
        { id: 'l23c', type: 'mate', mateIn: 2, title: "Tour + Roi : l'opposition",
          fen: '8/8/8/6R1/2K5/8/8/k7 w - - 0 1',
          intro: "Le Roi noir est coincé dans le coin. À toi de trouver le filet de mat en deux coups.",
          task: "Mate en <b>2 coups</b>.",
          hint: "Amène ton Roi pour ôter les cases de fuite, puis la Tour donne l'échec et mat.",
          done: "Technique maîtrisée — un atout pour toutes tes finales !" }
      ]
    },

    /* ================== NIVEAU 24 — FINALE : LES DEUX FOUS ================== */
    {
      id: 'l24', icon: '♝', title: "Finale : les deux Fous",
      sub: "Mater avec deux Fous : pousser le Roi dans un coin",
      lessons: [
        { id: 'l24a', type: 'info', title: "La méthode des deux Fous",
          fen: '8/8/8/3k4/8/2B5/2B5/4K3 w - - 0 1',
          intro: "<b>Deux Fous + Roi contre Roi</b> mate dans <b>n'importe quel coin</b>. Les Fous, placés <b>côte à côte</b>, forment un mur qui repousse le Roi ennemi ; le Roi blanc l'escorte jusqu'au coin où arrive le mat. C'est une finale gagnante, un peu technique mais très logique." },
        { id: 'l24b', type: 'mate', mateIn: 2, title: "Deux Fous : mat en 2",
          fen: 'k7/2K5/B7/8/8/8/8/2B5 w - - 0 1',
          intro: "Le Roi noir est dans le coin, tes Fous contrôlent les fuites. Le mat est à deux coups.",
          task: "Mate le Roi noir en <b>2 coups</b> avec les deux Fous.",
          hint: "Un Fou donne l'échec pendant que l'autre, soutenu par ton Roi, ferme la dernière case.",
          done: "Superbe ! Deux Fous coordonnés sont une machine à mater dans le coin." },
        { id: 'l24c', type: 'mate', mateIn: 3, title: "Deux Fous : mat en 3",
          fen: 'k7/2K5/8/8/BB6/8/8/8 w - - 0 1',
          intro: "Un peu plus loin du mat : il faut d'abord resserrer le filet avec les Fous, puis conclure dans le coin.",
          task: "Mate en <b>3 coups</b> précis.",
          hint: "Rapproche un Fou pour contrôler les cases de fuite, puis construis le mat dans le coin avec l'aide de ton Roi.",
          done: "Excellent calcul ! Tu maîtrises la finale des deux Fous." }
      ]
    },

    /* ================== NIVEAU 25 — FINALE : FOU + CAVALIER ================== */
    {
      id: 'l25', icon: '♞', title: "Finale : Fou + Cavalier",
      sub: "Le mat le plus difficile — dans le coin de la couleur du Fou",
      lessons: [
        { id: 'l25a', type: 'info', title: "La méthode Fou + Cavalier",
          fen: '8/8/8/3k4/8/2B5/3N4/4K3 w - - 0 1',
          intro: "<b>Fou + Cavalier + Roi contre Roi</b> est le mat élémentaire le plus <b>difficile</b> : il ne marche que dans l'un des deux coins de la <b>couleur du Fou</b>. On repousse le Roi vers ce bon coin ; si l'adversaire file vers le mauvais coin, on le redirige par la fameuse <b>manœuvre en « W »</b> du Cavalier. Patience et précision !" },
        { id: 'l25b', type: 'mate', mateIn: 2, title: "Fou + Cavalier : mat en 2",
          fen: 'k7/2K5/B7/8/8/N7/8/8 w - - 0 1',
          intro: "Le Roi noir est dans le bon coin (celui de la couleur du Fou). Fou et Cavalier vont conclure en deux coups.",
          task: "Mate le Roi noir en <b>2 coups</b> avec le Fou et le Cavalier.",
          hint: "Le Fou contrôle la grande diagonale, le Cavalier vient fermer la dernière case de fuite près du coin.",
          done: "Bravo ! Même le mat le plus dur n'a plus de secret pour toi." },
        { id: 'l25c', type: 'mate', mateIn: 3, title: "Fou + Cavalier : mat en 3",
          fen: 'k1B5/2K5/8/8/4N3/8/8/8 w - - 0 1',
          intro: "Trois coups à calculer, avec le Cavalier qui doit trouver la bonne case pour verrouiller le coin.",
          task: "Mate en <b>3 coups</b> — précision maximale.",
          hint: "Pense à la position de mat finale dans le coin, puis amène le Cavalier et le Fou pour y parvenir.",
          done: "🏅 Finale Fou + Cavalier réussie — un vrai signe de maîtrise technique !" }
      ]
    },

    /* ================== NIVEAU 26 — TACTIQUES : L'ARSENAL ================== */
    {
      id: 'l26', icon: '🎯', title: "Tactiques : l'arsenal",
      sub: "Les motifs qui gagnent du matériel — trouve le coup décisif",
      lessons: [
        { id: 'l26a', type: 'info', title: "Les motifs tactiques",
          fen: '6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
          intro: "Une <b>tactique</b> est une courte suite de coups forcés qui gagne du matériel ou mate. Les grands motifs : la <b>fourchette</b> (une pièce en attaque deux), le <b>clouage</b> (une pièce ne peut pas bouger sans exposer plus précieux derrière), l'<b>enfilade</b> (le clouage à l'envers), l'<b>attaque double</b>, l'<b>échec à la découverte</b>. Entraîne l'œil à les repérer !" },
        { id: 'l26b', type: 'move', title: "Fourchette de Cavalier",
          fen: 'r4rk1/5p1p/6p1/3q4/4N3/8/PPP2PPP/R4RK1 w - - 0 1',
          intro: "Le Cavalier adore attaquer <b>deux pièces à la fois</b>. Ici, une case lui permet de viser le Roi <b>et</b> la Dame en même temps.",
          task: "Trouve la <b>fourchette</b> qui gagne la Dame noire.",
          solution: ['Nf6+'],
          hint: "Un bond de Cavalier qui fait échec au Roi g8 tout en attaquant la Dame d5.",
          done: "Fourchette ! Après l'échec, le Roi bouge et tu prends la Dame : pièce gagnée." },
        { id: 'l26c', type: 'move', title: "Le clouage gagnant",
          fen: '3k4/3q4/8/1B6/8/8/8/3RK3 w - - 0 1',
          intro: "La Dame noire est <b>clouée</b> : elle protège son Roi et ne peut pas quitter la colonne d. Une pièce clouée est une cible immobile.",
          task: "Exploite le clouage et <b>gagne la Dame</b>.",
          solution: ['Rxd7', 'Bxd7'],
          hint: "Capture la Dame clouée : elle est attaquée deux fois et ne peut pas fuir.",
          done: "Clouage exploité ! Une pièce clouée finit souvent par tomber." },
        { id: 'l26d', type: 'move', title: "L'enfilade",
          fen: 'q7/8/8/8/k7/8/6PP/1R4K1 w - - 0 1',
          intro: "L'<b>enfilade</b> (ou « brochette ») est l'inverse du clouage : on fait échec au Roi, il doit s'écarter, et on capture la pièce qui était <b>derrière</b> lui.",
          task: "Donne l'échec qui <b>embroche</b> le Roi et la Dame.",
          solution: ['Ra1+'],
          hint: "Une Tour qui fait échec au Roi sur la colonne a : quand il s'écarte, la Dame derrière tombe.",
          done: "Enfilade ! Le Roi s'écarte, la Tour prend la Dame : matériel gagné." },
        { id: 'l26e', type: 'move', title: "L'attaque double de la Dame",
          fen: '6k1/1r6/8/8/8/8/6PP/3QK3 w - - 0 1',
          intro: "La Dame peut créer une <b>attaque double</b> : faire échec au Roi <b>et</b> viser une pièce non défendue dans le même coup.",
          task: "Trouve l'<b>attaque double</b> qui gagne la Tour.",
          solution: ['Qd5+'],
          hint: "Place la Dame pour faire échec au Roi g8 en attaquant la Tour b7 sur la même diagonale/rangée.",
          done: "Attaque double ! Le Roi pare l'échec, puis tu croques la Tour." }
      ]
    },

    /* ================== NIVEAU 27 — COMBINAISONS À CALCULER ================== */
    {
      id: 'l27', icon: '🧮', title: "Combinaisons à calculer",
      sub: "Des problèmes qui demandent de vraiment calculer",
      lessons: [
        { id: 'l27a', type: 'move', title: "Échec à la découverte",
          fen: '3qk3/8/8/4N3/8/4R3/8/4K3 w - - 0 1',
          intro: "Dans un <b>échec à la découverte</b>, on déplace une pièce pour <b>démasquer</b> l'échec d'une autre derrière elle. Le coup joue donc sur deux tableaux à la fois.",
          task: "Déplace le Cavalier pour <b>découvrir</b> l'échec de la Tour et gagner la Dame.",
          solution: ['Nc6+'],
          hint: "Le Cavalier quitte la colonne e (démasquant la Tour qui fait échec) en attaquant la Dame d8.",
          done: "Découverte ! L'échec force le Roi, et le Cavalier emporte la Dame." },
        { id: 'l27b', type: 'move', title: "Le mat du couloir",
          fen: '6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1',
          intro: "Le <b>mat du couloir</b> (ou « back-rank ») punit un Roi enfermé par ses propres pions sur la dernière rangée. Une Tour ou une Dame qui atteint cette rangée délivre le mat.",
          task: "Donne le <b>mat du couloir</b> en un coup.",
          solution: ['Ra8'],
          hint: "La Tour file sur la 8ᵉ rangée : le Roi, bloqué par ses pions f7-g7-h7, ne peut pas fuir.",
          done: "Mat du couloir ! Pense toujours à créer une « lucarne » pour ton propre Roi afin d'éviter ce mat." },
        { id: 'l27c', type: 'move', title: "Le coup intermédiaire (zwischenzug)",
          fen: 'r2q1rk1/ppp2ppp/2n5/3Pp3/1b6/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 1',
          intro: "Le <b>zwischenzug</b> (« coup intermédiaire ») consiste à intercaler un coup plus fort <b>avant</b> la reprise que l'adversaire attend. Ici, au lieu de défendre, on frappe d'abord.",
          task: "Trouve le <b>coup intermédiaire</b> qui gagne une pièce.",
          solution: ['dxc6'],
          hint: "Ton Cavalier c3 est attaqué par le Fou b4, mais tu as mieux : capture d'abord en c6, et c'est toi qui gagnes du matériel.",
          done: "Zwischenzug ! Ne réponds pas toujours « du tac au tac » : cherche le coup intermédiaire le plus fort." },
        { id: 'l27d', type: 'mate', mateIn: 2, title: "Calcule le mat en 2 (1)",
          fen: '5k2/Q7/8/5K2/8/8/8/8 w - - 0 1',
          intro: "À toi de calculer : le Roi noir est au bord, ton Roi soutient. Trouve la séquence de mat en deux coups.",
          task: "Mate le Roi noir en <b>2 coups</b>.",
          hint: "Prépare le mat en rapprochant ton Roi ou en confinant le Roi noir, sans provoquer le pat.",
          done: "Bien calculé ! La vision du mat en 2 devient un réflexe." },
        { id: 'l27e', type: 'mate', mateIn: 2, title: "Calcule le mat en 2 (2)",
          fen: '8/8/8/R7/8/8/4K3/7k w - - 0 1',
          intro: "Une dernière pour la route : Tour et Roi contre un Roi acculé dans le coin. Deux coups suffisent.",
          task: "Mate en <b>2 coups</b> et termine l'Académie en beauté.",
          hint: "Amène ton Roi au contact ou prends l'opposition, puis la Tour conclut sur la 1ʳᵉ rangée.",
          done: "🎓 Bravo ! Tactiques et finales : tu disposes maintenant d'un vrai arsenal de joueur complet." }
      ]
    },

    /* ================== NIVEAU 28 — MAT EN 3 : POSITIONS DE MAÎTRE ================== */
    {
      id: 'l28', icon: '🧠', title: "Mat en 3 : positions de maître",
      sub: "De vrais problèmes à calculer, avec pièces et défenses",
      lessons: [
        { id: 'l28a', type: 'info', title: "Calculer en profondeur",
          fen: '6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
          intro: "À partir d'ici, on <b>calcule</b> comme un joueur de club avancé. Ces positions ont des <b>défenses</b> (pions, pièces) : il faut trouver la séquence <b>forcée</b> qui mate en trois coups. Méthode : cherche les coups les plus <b>forçants</b> (échecs, prises, menaces), imagine la réponse adverse, puis le coup suivant. Le moteur valide : tant que ton coup garde le mat forcé, il est accepté." },
        { id: 'l28b', type: 'mate', mateIn: 3, title: "Mat en 3 — attaque Dame-Tour (1)",
          fen: 'k7/4bppp/2R5/2Q5/8/8/8/5K2 w - - 0 1',
          intro: "Le Roi noir est enfermé dans le coin, protégé par ses pions et un Fou. Trouve la combinaison qui mate en trois.",
          task: "Mate le Roi noir en <b>3 coups</b>.",
          hint: "Cherche l'échec qui réduit l'espace du Roi, prévois la seule défense, puis conclus. Les coups forçants d'abord !",
          done: "Superbe calcul ! Tu as vu à travers la défense noire." },
        { id: 'l28c', type: 'mate', mateIn: 3, title: "Mat en 3 — attaque Dame-Tour (2)",
          fen: '7k/4bpp1/4R3/4Q3/8/8/8/5K2 w - - 0 1',
          intro: "Même matériel, autre filet de mat. La colonne e est ta grande alliée.",
          task: "Mate en <b>3 coups</b>.",
          hint: "La Tour et la Dame sur la colonne e : un sacrifice ou un échec bien placé ouvre le mat.",
          done: "Excellent ! La coordination Dame + Tour est dévastatrice." },
        { id: 'l28d', type: 'mate', mateIn: 3, title: "Mat en 3 — le Roi exposé",
          fen: '8/5pkp/5r1R/8/3Q1B2/8/8/2K5 w - - 0 1',
          intro: "Le Roi noir en g7 a l'air protégé… mais ta Dame, ta Tour et ton Fou visent tous son abri. Calcule le mat.",
          task: "Mate en <b>3 coups</b> précis.",
          hint: "Un sacrifice pour démolir le bouclier de pions, puis la Dame et le Fou concluent.",
          done: "Du grand art ! Démolir l'abri du Roi est une arme de maître." },
        { id: 'l28e', type: 'mate', mateIn: 3, title: "Mat en 3 — brise la défense",
          fen: '8/5pkp/4Bn1R/8/7Q/8/8/2K5 w - - 0 1',
          intro: "Le Cavalier f6 défend le Roi. À toi de trouver les trois coups qui percent malgré lui.",
          task: "Mate en <b>3 coups</b>.",
          hint: "Les coups forçants d'abord : échec ou prise qui désorganise la défense, puis le mat.",
          done: "Maîtrise totale du mat en 3. Ton calcul atteint un vrai niveau de club." }
      ]
    },

    /* ================== NIVEAU 29 — CALCUL PROFOND : MAT EN 4 ================== */
    {
      id: 'l29', icon: '🎯', title: "Calcul profond : mat en 4",
      sub: "Des combinaisons forcées de quatre coups — niveau expert",
      lessons: [
        { id: 'l29a', type: 'info', title: "Voir quatre coups à l'avance",
          fen: '6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
          intro: "Les <b>mats en 4</b> séparent les joueurs forts des autres : il faut tenir toute la séquence <b>forcée</b> dans sa tête. Ici tu <b>joues chaque coup toi-même</b> (les coups blancs) ; l'adversaire répond par sa meilleure défense. Chaque coup est validé : ces combinaisons sont <b>exactes</b> (mat forcé prouvé par Stockfish). Prends ton temps, visualise, et exécute." },
        { id: 'l29b', type: 'line', orient: 'w', title: "Mat en 4 — le filet tranquille",
          fen: '3B2k1/5ppp/8/3R3Q/8/8/8/4K3 w - - 0 1',
          intro: "Dame, Tour et Fou contre un Roi roqué. La clé n'est pas un échec immédiat, mais un coup <b>calme</b> qui prépare un mat imparable.",
          task: "Joue les <b>Blancs</b> et mate en 4 coups forcés.",
          done: "Mat en 4 maîtrisé ! Un coup tranquille suivi d'une attaque imparable — pensée de maître.",
          line: [
            { san: 'Be7', note: "Coup calme et mortel : le Fou verrouille f8 et prépare l'assaut. (Toutes les menaces ne sont pas des échecs !)" },
            { san: 'h6',  note: "Les Noirs font de l'air à leur Roi — mais c'est trop tard." },
            { san: 'Rd8+', note: "La Tour cloue le Roi sur la 8ᵉ rangée." },
            { san: 'Kh7', note: "Seule case disponible." },
            { san: 'Qf5+', note: "La Dame rejoint l'attaque avec échec." },
            { san: 'g6',  note: "Forcé : le pion doit bloquer." },
            { san: 'Qxf7#', note: "Échec et mat ! La Dame mate en f7, le Fou e7 et la Tour d8 scellent toute fuite." }
          ] },
        { id: 'l29c', type: 'line', orient: 'w', title: "Mat en 4 — la chasse au Roi",
          fen: '4R3/5pkp/1n1Q4/8/8/8/8/5K2 w - - 0 1',
          intro: "Ici on <b>traque</b> le Roi à découvert avec la Dame et la Tour, échec après échec, jusqu'au filet final.",
          task: "Joue les <b>Blancs</b> : mate en 4 par une chasse forcée.",
          done: "Chasse au Roi réussie ! Dame et Tour qui se relaient : un classique du calcul.",
          line: [
            { san: 'Qg3+', note: "On lance la chasse avec échec." },
            { san: 'Kf6',  note: "Le Roi doit avancer vers le danger." },
            { san: 'Qe5+', note: "La Dame resserre le filet." },
            { san: 'Kg6',  note: "Forcé." },
            { san: 'Rg8+', note: "La Tour entre avec échec et coupe la fuite." },
            { san: 'Kh6',  note: "Le Roi est acculé au bord." },
            { san: 'Qg5#', note: "Échec et mat ! Dame et Tour en parfaite coordination." }
          ] },
        { id: 'l29d', type: 'line', orient: 'w', title: "Mat en 4 — double sacrifice",
          fen: '4r1k1/5ppp/3Q4/4N1R1/8/8/8/5K2 w - - 0 1',
          intro: "La combinaison la plus spectaculaire : un coup calme, puis <b>deux sacrifices</b> pour ouvrir le Roi et mater au Cavalier.",
          task: "Joue les <b>Blancs</b> : trouve le mat en 4 par sacrifices.",
          done: "🔥 Chef-d'œuvre ! Dame et Tour sacrifiées, le Cavalier donne le mat : du pur calcul de maître.",
          line: [
            { san: 'Qf6', note: "Coup calme et écrasant : on menace le mat en g7/f7." },
            { san: 'g6',  note: "Les Noirs cherchent une défense." },
            { san: 'Qxf7+', note: "Premier sacrifice : la Dame force le Roi dans le coin." },
            { san: 'Kh8', note: "Forcé." },
            { san: 'Rxg6', note: "Second sacrifice : la Tour ouvre la colonne g." },
            { san: 'hxg6', note: "Forcé, sinon le mat tombe tout de suite." },
            { san: 'Nxg6#', note: "Échec et mat du Cavalier ! Un final en feu d'artifice." }
          ] }
      ]
    },

    /* ================== NIVEAU 30 — VISION DE GRAND MAÎTRE : MAT EN 5 ================== */
    {
      id: 'l30', icon: '🏆', title: "Vision de grand maître : mat en 5",
      sub: "Cinq coups forcés — le sommet du calcul",
      lessons: [
        { id: 'l30a', type: 'info', title: "La vision du grand maître",
          fen: '6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
          intro: "Le <b>mat en 5</b> est le sommet de cette académie : une séquence <b>entièrement forcée</b> de cinq coups, que les grands maîtres voient d'un coup d'œil. Tu joues les coups blancs, l'adversaire se défend au mieux. Ces combinaisons sont <b>prouvées exactes</b> par Stockfish. Visualise toute la ligne avant de jouer : c'est ainsi que l'on calcule au plus haut niveau." },
        { id: 'l30b', type: 'line', orient: 'w', title: "Mat en 5 — la traque totale",
          fen: '4RQ2/4np1k/8/8/8/8/8/4K3 w - - 0 1',
          intro: "Le Roi noir va être pourchassé <b>d'un bord à l'autre</b> de l'échiquier. Cinq échecs forcés, aucune échappatoire.",
          task: "Joue les <b>Blancs</b> : mate en 5 par une traque forcée.",
          done: "🏆 Traque magistrale ! Pourchasser le Roi sur tout l'échiquier : une vraie vision de grand maître.",
          line: [
            { san: 'Qxf7+', note: "On ouvre la chasse par une prise avec échec." },
            { san: 'Kh6',   note: "Le Roi fuit vers le bord." },
            { san: 'Qf6+',  note: "La Dame poursuit sans répit." },
            { san: 'Kh5',   note: "Toujours plus loin." },
            { san: 'Rh8+',  note: "La Tour entre dans la chasse." },
            { san: 'Kg4',   note: "Le Roi file vers le centre." },
            { san: 'Rh4+',  note: "Échec ! Le filet se resserre." },
            { san: 'Kg3',   note: "Dernière case libre." },
            { san: 'Qf2#',  note: "Échec et mat ! Une traque d'un bout à l'autre de l'échiquier." }
          ] },
        { id: 'l30c', type: 'line', orient: 'w', title: "Mat en 5 — la rafale décisive",
          fen: '5b2/6kp/4R3/3Q1B2/8/8/8/5K2 w - - 0 1',
          intro: "Une cascade d'échecs et de prises où la Dame et la Tour ne laissent jamais respirer le Roi noir.",
          task: "Joue les <b>Blancs</b> : mate en 5 coups forcés.",
          done: "🏆 Diplôme de grand calcul ! Tu as parcouru toute l'Académie — des règles de base jusqu'au mat en 5 forcé. Félicitations, champion !",
          line: [
            { san: 'Qd7+',  note: "Échec qui force la défense." },
            { san: 'Be7',   note: "Les Noirs interposent le Fou." },
            { san: 'Qxe7+', note: "On capture l'interposition, toujours avec échec." },
            { san: 'Kg8',   note: "Forcé." },
            { san: 'Qxh7+', note: "La Dame ramasse un pion et chasse le Roi." },
            { san: 'Kf8',   note: "Le Roi revient." },
            { san: 'Rf6+',  note: "La Tour entre avec un échec décisif." },
            { san: 'Ke8',   note: "Seule case." },
            { san: 'Qd7#',  note: "Échec et mat ! Dame et Tour en coordination parfaite — bravo !" }
          ] }
      ]
    }
  ];

  /* =====================================================================
     PROGRESSION (localStorage) + petite API d'audience
  ===================================================================== */
  var LS = 'brio_echecs_academy_v1';
  var prog = load();
  function load() { try { return JSON.parse(localStorage.getItem(LS)) || { done: {}, xp: 0 }; } catch (e) { return { done: {}, xp: 0 }; } }
  function save() { try { localStorage.setItem(LS, JSON.stringify(prog)); } catch (e) {} }
  var allLessons = []; LEVELS.forEach(function (lv) { lv.lessons.forEach(function (ls) { ls._lv = lv; allLessons.push(ls); }); });
  function isDone(id) { return !!prog.done[id]; }
  function levelDoneCount(lv) { return lv.lessons.filter(function (l) { return isDone(l.id); }).length; }
  function levelComplete(lv) { return levelDoneCount(lv) === lv.lessons.length; }
  function levelUnlocked(i) { if (i === 0) return true; return levelComplete(LEVELS[i - 1]); }
  function lessonUnlocked(lv, idx) {
    var li = LEVELS.indexOf(lv); if (!levelUnlocked(li)) return false;
    if (idx === 0) return true; return isDone(lv.lessons[idx - 1].id);
  }
  function totalDone() { return allLessons.filter(function (l) { return isDone(l.id); }).length; }
  function markDone(id) {
    if (!prog.done[id]) { prog.done[id] = true; prog.xp = (prog.xp || 0) + 10; save();
      try { if (window.PB_track) window.PB_track('chess_academy_lesson'); } catch (e) {} }
  }

  /* =====================================================================
     RENDU
  ===================================================================== */
  var view = 'road';          // 'road' | 'lesson'
  var curLv = null, curIdx = 0, chess = null, sel = null, solved = false, usedHint = false, locked = false, matesLeft = 0, lastMove = null;
  var lineStep = 0, dragFrom = null;   // leçons « ligne » (ouvertures/pièges) + glisser-déposer

  // le joueur joue les pièces de la couleur « orient » ; l'adversaire (= l'autre couleur) est automatique
  function orientOf(ls) { return (ls && ls.orient === 'b') ? 'b' : 'w'; }
  // glisser-déposer activé dès que le niveau grimpe (à partir du 11ᵉ niveau et pour tout contenu avancé)
  function dragEnabled() { try { return LEVELS.indexOf(curLv) >= 10; } catch (e) { return false; } }

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function sqName(f, r) { return 'abcdefgh'[f] + (r + 1); }

  function render() { view === 'lesson' ? renderLesson() : renderRoad(); }

  /* ---------- carte du parcours ---------- */
  function renderRoad() {
    var done = totalDone(), total = allLessons.length, pct = Math.round(done / total * 100);
    var h = '';
    h += '<div class="ac-hero">'
       + '<div class="ac-hero-txt"><div class="ac-eyebrow">Académie Brio</div>'
       + '<h2>Apprendre les échecs… depuis zéro</h2>'
       + '<p>Un parcours pas à pas, interactif et ludique : tu joues directement sur l\'échiquier. Termine chaque leçon pour débloquer la suivante et grimper les niveaux.</p></div>'
       + '<div class="ac-hero-badge"><div class="ac-xp">'+ (prog.xp || 0) +'</div><div class="ac-xp-l">points d\'XP</div></div></div>';
    h += '<div class="ac-prog"><div class="ac-prog-top"><span><b>'+ done +'</b> / '+ total +' leçons terminées</span><span>'+ pct +'%</span></div>'
       + '<div class="ac-prog-bar"><div class="ac-prog-fill" style="width:'+ pct +'%"></div></div></div>';

    LEVELS.forEach(function (lv, i) {
      var unlocked = levelUnlocked(i), dc = levelDoneCount(lv), lc = levelComplete(lv);
      h += '<div class="ac-level'+ (unlocked ? '' : ' locked') + (lc ? ' complete' : '') +'">';
      h += '<div class="ac-level-head"><span class="ac-level-ic">'+ (lc ? '✅' : (unlocked ? lv.icon : '🔒')) +'</span>'
         + '<div class="ac-level-ti"><div class="ac-level-t">Niveau '+ (i + 1) +' — '+ esc(lv.title) +'</div>'
         + '<div class="ac-level-s">'+ esc(lv.sub) +'</div></div>'
         + '<div class="ac-level-count">'+ dc +'/'+ lv.lessons.length +'</div></div>';
      if (unlocked) {
        h += '<div class="ac-chips">';
        lv.lessons.forEach(function (ls, idx) {
          var lu = lessonUnlocked(lv, idx), d = isDone(ls.id);
          h += '<button class="ac-chip'+ (d ? ' done' : '') + (lu ? '' : ' locked') +'" data-lv="'+ lv.id +'" data-idx="'+ idx +'"'+ (lu ? '' : ' disabled') +'>'
             + '<span class="ac-chip-ic">'+ (d ? '★' : (lu ? typeIcon(ls.type) : '🔒')) +'</span>'
             + '<span class="ac-chip-t">'+ esc(ls.title) +'</span></button>';
        });
        h += '</div>';
      } else {
        h += '<div class="ac-locked-note">Termine le niveau '+ i +' pour débloquer ce niveau.</div>';
      }
      h += '</div>';
    });
    mount.innerHTML = h;
    mount.querySelectorAll('.ac-chip:not(.locked)').forEach(function (b) {
      b.addEventListener('click', function () { openLesson(b.getAttribute('data-lv'), +b.getAttribute('data-idx')); });
    });
  }
  function typeIcon(t) { return t === 'quiz' ? '❓' : (t === 'info' ? '📖' : '♟'); }

  function openLesson(lvId, idx) {
    curLv = LEVELS.filter(function (l) { return l.id === lvId; })[0]; curIdx = idx;
    view = 'lesson'; startLesson();
  }

  /* ---------- une leçon ---------- */
  function startLesson() {
    var ls = curLv.lessons[curIdx];
    sel = null; solved = false; usedHint = false; locked = false; lastMove = null; matesLeft = mateInOf(ls);
    lineStep = 0; dragFrom = null;
    if (ls.type === 'quiz' || !ls.fen || ls.fen === 'start') {
      chess = new Chess(); if (ls.fen && ls.fen !== 'start') { try { chess.load(ls.fen); } catch (e) {} }
    } else {
      chess = new Chess(); var ok = chess.load(ls.fen);
      if (!ok) { chess = new Chess(); }
    }
    if (ls.preselect) sel = ls.preselect;
    // leçon « ligne » : joue d'emblée les coups de l'adversaire qui précèdent le 1ᵉʳ coup du joueur
    if (ls.type === 'line') linePlayAutos(ls, true);
    renderLesson();
  }

  function renderLesson() {
    var ls = curLv.lessons[curIdx];
    var h = '<div class="ac-lesson">';
    h += '<button class="ac-back">← Retour au parcours</button>';
    h += '<div class="ac-lesson-grid">';
    // colonne plateau
    h += '<div class="ac-boardcol"><div class="ac-board thb-brown" id="acadBoard"></div>'
       + '<div class="ac-fb" id="acadFb"></div></div>';
    // colonne texte
    h += '<div class="ac-txtcol">';
    h += '<div class="ac-l-tag">Niveau '+ (LEVELS.indexOf(curLv) + 1) +' · '+ esc(curLv.title) +'</div>';
    h += '<h3 class="ac-l-title">'+ esc(ls.title) +'</h3>';
    h += '<div class="ac-voice"><button class="ac-vbtn" id="acSpeak" type="button">🔊 Écouter</button>'
       + '<button class="ac-vtog" id="acVmute" type="button" title="Lecture automatique à voix haute">'+ (voiceOn ? '🔈 Voix : ON' : '🔇 Voix : OFF') +'</button></div>';
    if (ls.intro) h += '<div class="ac-l-intro">'+ ls.intro +'</div>';
    if (ls.task) h += '<div class="ac-l-task"><span class="ac-l-task-ic">🎯</span><div>'+ ls.task +'</div></div>';
    if (ls.type === 'quiz') h += '<div class="ac-quiz" id="acadQuiz"></div>';
    if (ls.type === 'line') h += '<div class="ac-line"><div class="ac-line-h">📋 La ligne, coup par coup'
       + ' <span class="ac-line-side">(tu joues les '+ (orientOf(ls) === 'b' ? 'Noirs ♚' : 'Blancs ♔') +')</span></div>'
       + '<ol class="ac-line-list" id="acLineMoves"></ol></div>';
    h += '<div class="ac-l-actions" id="acadActions"></div>';
    h += '</div></div></div>';
    mount.innerHTML = h;

    mount.querySelector('.ac-back').addEventListener('click', function () { stopSpeak(); view = 'road'; renderRoad(); });

    if (ls.type === 'quiz') { buildQuiz(ls); }
    else { drawBoard(); }
    if (ls.type === 'line') renderLineMoves(ls);
    buildActions(ls);
    wireVoice(ls);
  }

  function wireVoice(ls) {
    var sp = document.getElementById('acSpeak');
    var tg = document.getElementById('acVmute');
    if (sp) sp.addEventListener('click', function () { speakNow(lessonSpeechText(ls), sp); });
    if (tg) tg.addEventListener('click', function () {
      voiceOn = !voiceOn; try { localStorage.setItem('brio_echecs_voice', voiceOn ? '1' : '0'); } catch (e) {}
      tg.innerHTML = voiceOn ? '🔈 Voix : ON' : '🔇 Voix : OFF';
      if (!voiceOn) stopSpeak(); else speakNow(lessonSpeechText(ls), sp);
    });
    // lecture automatique à l'ouverture (déclenchée par le clic d'ouverture → autoplay autorisé)
    if (voiceOn) setTimeout(function () { speak(lessonSpeechText(ls), document.getElementById('acSpeak')); }, 350);
  }

  function buildActions(ls) {
    var box = document.getElementById('acadActions'); if (!box) return;
    var h = '';
    if (ls.type === 'info') {
      h += '<button class="ac-btn primary" id="acDone">J\'ai compris ✓</button>';
    } else if (ls.type !== 'quiz') {
      if (ls.type === 'line') h += '<button class="ac-btn ghost" id="acHint">💡 Quel coup ?</button>';
      else if (ls.hint) h += '<button class="ac-btn ghost" id="acHint">💡 Indice</button>';
      h += '<button class="ac-btn ghost" id="acReset">↻ Recommencer</button>';
    }
    box.innerHTML = h;
    var d = document.getElementById('acDone'); if (d) d.addEventListener('click', function () { succeed(ls, "Leçon comprise — continue comme ça !"); });
    var hi = document.getElementById('acHint'); if (hi) hi.addEventListener('click', function () {
      usedHint = true;
      if (ls.type === 'line') {
        var exp = lineExpected(ls);
        var t = exp ? ('Joue ' + sanEnToFr(exp.san) + (exp.note ? ' — ' + exp.note : '')) : 'La ligne est terminée.';
        feedback('💡 ' + t, 'hint'); speakText(t); return;
      }
      var ht = ls.hint || "Observe bien les cases proposées."; feedback(ht, 'hint'); speakText(ht);
    });
    var rs = document.getElementById('acReset'); if (rs) rs.addEventListener('click', function () { startLesson(); });
  }

  function navAfter() {
    var box = document.getElementById('acadActions'); if (!box) return;
    var hasNext = !(LEVELS.indexOf(curLv) === LEVELS.length - 1 && curIdx === curLv.lessons.length - 1);
    box.innerHTML = '<button class="ac-btn ghost" id="acRoad">Parcours</button>'
      + (hasNext ? '<button class="ac-btn primary" id="acNext">Leçon suivante →</button>'
                 : '<button class="ac-btn primary" id="acRoad2">🏁 Terminer le parcours</button>');
    var n = document.getElementById('acNext'); if (n) n.addEventListener('click', goNext);
    var r = document.getElementById('acRoad'); if (r) r.addEventListener('click', function () { stopSpeak(); view = 'road'; renderRoad(); });
    var r2 = document.getElementById('acRoad2'); if (r2) r2.addEventListener('click', function () { stopSpeak(); view = 'road'; renderRoad(); });
  }
  function goNext() {
    stopSpeak();
    if (curIdx < curLv.lessons.length - 1) { curIdx++; }
    else { var i = LEVELS.indexOf(curLv); if (i < LEVELS.length - 1) { curLv = LEVELS[i + 1]; curIdx = 0; } }
    startLesson();
  }

  /* ---------- quiz ---------- */
  function buildQuiz(ls) {
    var box = document.getElementById('acadQuiz'); if (!box) return;
    var q = ls.quiz;
    var h = '<div class="ac-q">'+ q.q +'</div><div class="ac-opts">';
    q.options.forEach(function (o, i) { h += '<button class="ac-opt" data-i="'+ i +'">'+ o +'</button>'; });
    h += '</div><div class="ac-q-explain" id="acQexp"></div>';
    box.innerHTML = h;
    box.querySelectorAll('.ac-opt').forEach(function (b) {
      b.addEventListener('click', function () {
        if (solved) return;
        var i = +b.getAttribute('data-i');
        box.querySelectorAll('.ac-opt').forEach(function (x) { x.classList.add('dim'); });
        if (i === q.answer) {
          b.classList.add('ok'); b.classList.remove('dim');
          document.getElementById('acQexp').innerHTML = '✅ ' + q.explain;
          succeed(ls, null, true);
        } else {
          b.classList.add('bad'); b.classList.remove('dim');
          box.querySelectorAll('.ac-opt')[q.answer].classList.add('ok');
          box.querySelectorAll('.ac-opt')[q.answer].classList.remove('dim');
          document.getElementById('acQexp').innerHTML = '❌ Pas tout à fait. ' + q.explain;
          succeed(ls, null, true); // on explique et on valide quand même (apprentissage)
        }
      });
    });
  }

  /* ---------- plateau interactif ---------- */
  function drawBoard() {
    var el = document.getElementById('acadBoard'); if (!el) return;
    var ls = curLv.lessons[curIdx];
    var board = chess.board(); // rangée 8 -> 1
    var targets = sel ? chess.moves({ square: sel, verbose: true }).map(function (m) { return m.to; }) : [];
    var chkSq = chess.in_check() ? kingSquare(chess.turn()) : null;
    var showCoords = ls.coords;
    var flip = orientOf(ls) === 'b';                 // vue des Noirs (ouvertures en noir)
    var canDrag = dragEnabled() && ls.type !== 'info' && ls.type !== 'quiz' && !solved;
    var ranks = flip ? [0,1,2,3,4,5,6,7] : [7,6,5,4,3,2,1,0];
    var files = flip ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7];
    var html = '';
    for (var ri = 0; ri < 8; ri++) {
      var r = ranks[ri];
      for (var fi = 0; fi < 8; fi++) {
        var f = files[fi];
        var sq = sqName(f, r);
        var piece = board[7 - r][f];
        var light = (f + r) % 2 === 1;
        var cls = 'sq ' + (light ? 'lt' : 'dk');
        if (sq === sel) cls += ' sel';
        if (targets.indexOf(sq) >= 0) cls += ' tgt';
        if (ls.target === sq && !isDone(ls.id)) cls += ' goalsq';
        if (lastMove && (sq === lastMove.from || sq === lastMove.to)) cls += ' lastmv';
        if (sq === chkSq) cls += ' chk';
        html += '<button class="'+ cls +'" data-sq="'+ sq +'">';
        if (showCoords) {
          if (fi === 0) html += '<span class="co rl">'+ (r + 1) +'</span>';
          if (ri === 7) html += '<span class="co cl">'+ 'abcdefgh'[f] +'</span>';
        }
        if (piece) {
          var drag = canDrag && piece.color === chess.turn();
          html += '<span class="pc '+ (piece.color === 'w' ? 'pw' : 'pb') +'"'+ (drag ? ' draggable="true"' : '') +' data-sq="'+ sq +'">'+ GLY[piece.color][piece.type] +'</span>';
        }
        html += '</button>';
      }
    }
    el.innerHTML = html;
    el.querySelectorAll('.sq').forEach(function (s) {
      s.addEventListener('click', function () { onSquare(s.getAttribute('data-sq')); });
      s.addEventListener('dragover', function (e) { if (dragFrom) e.preventDefault(); });
      s.addEventListener('drop', function (e) { e.preventDefault(); if (dragFrom) { var from = dragFrom; dragFrom = null; onDrop(from, s.getAttribute('data-sq')); } });
    });
    if (canDrag) el.querySelectorAll('.pc[draggable="true"]').forEach(function (p) {
      p.addEventListener('dragstart', function (e) { dragFrom = p.getAttribute('data-sq'); sel = dragFrom; try { e.dataTransfer.setData('text/plain', dragFrom); e.dataTransfer.effectAllowed = 'move'; } catch (er) {} highlightTargets(); });
      p.addEventListener('dragend', function () { dragFrom = null; });
    });
  }

  function kingSquare(color) {
    var b = chess.board();
    for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) { var p = b[r][f]; if (p && p.type === 'k' && p.color === color) return sqName(f, 7 - r); }
    return null;
  }

  function onSquare(sq) {
    if (solved || locked) return;
    var ls = curLv.lessons[curIdx];
    if (ls.type === 'info') return;   // les leçons « explication » sont illustratives (plateau non interactif)

    // leçon « clique la bonne case »
    if (ls.type === 'click') {
      if (sq === ls.target) { flashSquare(sq, true); succeed(ls); }
      else { flashSquare(sq, false); feedback("Ce n'est pas la bonne case. " + (usedHint ? '' : 'Besoin d\'un indice ?'), 'bad'); }
      return;
    }

    var piece = chess.get(sq);
    // sélection d'une pièce du joueur (Blancs)
    if (sel === null) {
      if (piece && piece.color === chess.turn()) { sel = sq; drawBoard(); }
      return;
    }
    if (sq === sel) { sel = null; drawBoard(); return; }
    // reclique sur une autre de ses pièces
    if (piece && piece.color === chess.turn()) { sel = sq; drawBoard(); return; }

    // tentative de coup sel -> sq
    var legal = chess.moves({ square: sel, verbose: true });
    var mv = null; for (var i = 0; i < legal.length; i++) { if (legal[i].to === sq) { mv = legal[i]; break; } }
    if (!mv) { feedback("Déplacement illégal pour cette pièce. Clique une case en surbrillance.", 'bad'); return; }

    var opts = { from: sel, to: sq };
    if (mv.promotion) opts.promotion = ls.promote || 'q';
    var done = chess.move(opts);
    sel = null;
    if (done) lastMove = { from: done.from, to: done.to };
    drawBoard();
    if (!done) return;
    if (ls.type === 'line') evaluateLine(ls, done); else evaluateMove(ls, done);
  }

  /* ---- Solveur de mat (move/undo pour la vitesse) : l'attaquant au trait force-t-il un mat en <= n ? ---- */
  function matesRec(c, n) {
    var ms = c.moves({ verbose: true });
    for (var i = 0; i < ms.length; i++) {
      c.move(ms[i]); var res = false;
      if (c.in_checkmate()) res = true;
      else if (n > 1) {
        var rp = c.moves({ verbose: true });
        if (rp.length) { var all = true; for (var j = 0; j < rp.length; j++) { c.move(rp[j]); var ok = matesRec(c, n - 1); c.undo(); if (!ok) { all = false; break; } } res = all; }
      }
      c.undo(); if (res) return true;
    }
    return false;
  }
  // après le coup de l'élève (trait à l'adversaire), le mat est-il forcé en <= k coups ?
  function defenderMatedIn(pos, k) {
    try {
      var c = new Chess(); if (!c.load(pos.fen())) return false;
      var rp = c.moves({ verbose: true }); if (!rp.length) return false;
      for (var j = 0; j < rp.length; j++) { c.move(rp[j]); var ok = matesRec(c, k); c.undo(); if (!ok) return false; }
      return true;
    } catch (e) { return false; }
  }
  function mateInOf(ls) { return ls.mateIn || ((ls.type === 'mate2' || ls.goal === 'mate2') ? 2 : 0); }
  // l'adversaire répond : on choisit la défense qui RÉSISTE le plus longtemps (la plus naturelle).
  function autoReplyBlack() {
    try {
      var r = chess.moves({ verbose: true }); if (!r.length) return;
      var pick = r[0];
      // préfère une réponse qui n'est pas mat au prochain coup si possible (défense coriace)
      for (var i = 0; i < r.length; i++) {
        chess.move(r[i]); var mate1 = matesRec(chess, 1); chess.undo();
        if (!mate1) { pick = r[i]; break; }
      }
      chess.move({ from: pick.from, to: pick.to, promotion: pick.promotion || 'q' });
      lastMove = { from: pick.from, to: pick.to };
    } catch (e) {}
  }

  /* =====================================================================
     LEÇONS « LIGNE » — ouvertures (Blancs/Noirs) & pièges, coup par coup.
     Le joueur joue les coups de la couleur « orient » ; l'adversaire (les
     coups du livre, ou son erreur dans un piège) est joué automatiquement,
     chaque coup étant expliqué.
  ===================================================================== */
  // joue les coups automatiques (adversaire) tant que ce n'est pas au tour du joueur
  function linePlayAutos(ls) {
    var played = [];
    while (lineStep < ls.line.length && chess.turn() !== orientOf(ls)) {
      var step = ls.line[lineStep];
      var m = chess.move(step.san, { sloppy: true });
      if (!m) break;
      lastMove = { from: m.from, to: m.to };
      played.push(lineStep); lineStep++;
    }
    return played;
  }
  function lineExpected(ls) { return (lineStep < ls.line.length) ? ls.line[lineStep] : null; }
  function lineFinished(ls) { return lineStep >= ls.line.length; }
  function lineFinish(ls) {
    if (chess.in_checkmate()) succeed(ls, ls.done || 'Échec et mat — ligne maîtrisée ! 🎯');
    else succeed(ls, ls.done || 'Ligne terminée — bien joué !');
  }
  function renderLineMoves(ls) {
    var box = document.getElementById('acLineMoves'); if (!box) return;
    var h = '';
    for (var i = 0; i < ls.line.length; i++) {
      var st = ls.line[i], played = i < lineStep;
      var you = ((i % 2 === 0 ? 'w' : 'b') === orientOf(ls));
      h += '<li class="' + (played ? 'done' : 'todo') + (you ? ' you' : ' opp') + '">'
         + '<span class="ac-mv">' + (played ? sanEnToFr(st.san) : '…') + '</span>'
         + (played && st.note ? '<span class="ac-nt">' + st.note + '</span>' : '')
         + '</li>';
    }
    box.innerHTML = h;
  }
  function evaluateLine(ls, mv) {
    var exp = lineExpected(ls);
    var strip = function (s) { return String(s || '').replace(/[+#]+$/, ''); };
    if (!exp || strip(exp.san) !== strip(mv.san)) {
      locked = true;
      var tip = exp ? ('Dans cette ligne, on joue <b>' + sanEnToFr(exp.san) + '</b>.' + (exp.note ? ' ' + exp.note : '')) : '';
      feedback("Ce n'est pas le coup prévu ici. " + tip + "<br>J'annule — rejoue le bon coup 💪", 'bad');
      if (tip) speakText(tip);
      setTimeout(function () { chess.undo(); lastMove = null; locked = false; sel = null; drawBoard(); }, 1150);
      return;
    }
    lineStep++;
    renderLineMoves(ls);
    if (lineFinished(ls)) { lineFinish(ls); return; }         // le joueur a joué le dernier coup
    // bon coup → on explique, puis l'adversaire répond automatiquement
    feedback('<b>✓ ' + sanEnToFr(exp.san) + '</b> — ' + (exp.note || ''), 'ok');
    speakText(sanEnToFr(exp.san) + '. ' + (exp.note || ''));
    locked = true;
    setTimeout(function () {
      var autos = linePlayAutos(ls);
      locked = false; sel = null; drawBoard(); renderLineMoves(ls);
      if (autos.length) {
        var la = ls.line[autos[autos.length - 1]];
        feedback('<b>' + sanEnToFr(la.san) + '</b> — ' + (la.note || ''), '');
        speakText(sanEnToFr(la.san) + '. ' + (la.note || ''));
      }
      if (lineFinished(ls)) lineFinish(ls);
    }, (exp.note ? 1250 : 700));
  }

  /* glisser-déposer : on rejoue la même logique de coup que le clic */
  function highlightTargets() {
    var el = document.getElementById('acadBoard'); if (!el || !sel) return;
    var targets = chess.moves({ square: sel, verbose: true }).map(function (m) { return m.to; });
    el.querySelectorAll('.sq').forEach(function (s) {
      var sq = s.getAttribute('data-sq');
      s.classList.toggle('sel', sq === sel);
      s.classList.toggle('tgt', targets.indexOf(sq) >= 0);
    });
  }
  function onDrop(from, to) {
    if (solved || locked) return;
    var ls = curLv.lessons[curIdx];
    if (ls.type === 'info' || ls.type === 'quiz') return;
    if (ls.type === 'click') { onSquare(to); return; }
    if (from === to) { sel = null; drawBoard(); return; }
    var legal = chess.moves({ square: from, verbose: true });
    var mv = null; for (var i = 0; i < legal.length; i++) { if (legal[i].to === to) { mv = legal[i]; break; } }
    if (!mv) { sel = null; drawBoard(); feedback("Déplacement illégal pour cette pièce.", 'bad'); return; }
    var opts = { from: from, to: to }; if (mv.promotion) opts.promotion = ls.promote || 'q';
    var done = chess.move(opts); sel = null;
    if (done) lastMove = { from: done.from, to: done.to };
    drawBoard();
    if (!done) return;
    if (ls.type === 'line') evaluateLine(ls, done); else evaluateMove(ls, done);
  }

  function evaluateMove(ls, mv) {
    // ---- mat forcé en N coups (validation en direct par le moteur, l'adversaire répond) ----
    var mateIn = mateInOf(ls);
    if (mateIn > 0) {
      if (chess.in_checkmate()) { succeed(ls); return; }
      // coup juste s'il mène toujours à un mat forcé dans les coups restants
      if (defenderMatedIn(chess, matesLeft - 1)) {
        matesLeft -= 1;
        feedback('<b>✓ Bien joué !</b> ' + (matesLeft > 1 ? ('Il reste ' + matesLeft + ' coups — trouve la suite !') : 'Encore un coup pour mater !'), 'ok');
        locked = true;
        setTimeout(function () { autoReplyBlack(); locked = false; drawBoard(); }, 750);
      } else {
        locked = true;
        feedback("Ce coup ne mène pas au mat forcé. J'annule — cherche mieux 💪", 'bad');
        setTimeout(function () { chess.undo(); lastMove = null; locked = false; drawBoard(); }, 950);
      }
      return;
    }
    var ok = false;
    if (ls.goal === 'mate') ok = chess.in_checkmate();
    else if (ls.goal === 'check') ok = chess.in_check();
    else if (ls.solution) {
      // on compare SANS les symboles d'échec/mat : « Dd5 » accepte aussi « Dd5+ », etc.
      var stripSan = function (s) { return String(s || '').replace(/[+#]+$/, ''); };
      var mvN = stripSan(mv.san);
      ok = ls.solution.some(function (s) { return stripSan(s) === mvN; });
    }
    else ok = true;

    if (ok) { succeed(ls); }
    else {
      // mauvais coup : on annule et on encourage
      locked = true;
      feedback("Bonne tentative, mais ce n'est pas le coup attendu. J'annule — réessaie 💪", 'bad');
      setTimeout(function () { chess.undo(); if (ls.preselect) sel = ls.preselect; locked = false; drawBoard(); }, 950);
    }
  }

  function feedback(msg, kind) {
    var fb = document.getElementById('acadFb'); if (!fb) return;
    fb.className = 'ac-fb show ' + (kind || '');
    fb.innerHTML = msg;
  }

  function succeed(ls, overrideMsg, isQuiz) {
    if (solved) return; solved = true;
    markDone(ls.id);
    var msg = overrideMsg != null ? overrideMsg : (ls.done || "Bravo, leçon réussie !");
    if (!isQuiz) {
      feedback('<span class="ac-win">🎉 ' + (msg || 'Bravo !') + '</span>', 'ok');
      if (voiceOn) speakText(msg);
      burst();
    } else {
      // le quiz affiche déjà son explication ; on ajoute juste la validation
      var exp = document.getElementById('acQexp'); if (exp && msg) exp.innerHTML += '<div class="ac-win" style="margin-top:8px">🎉 '+ msg +'</div>';
      burst();
    }
    navAfter();
  }

  /* petite animation de réussite (confettis CSS) */
  function burst() {
    try {
      var host = document.getElementById('acadBoard') || mount;
      var c = document.createElement('div'); c.className = 'ac-confetti';
      var cols = ['#f4d03f', '#7a5cff', '#2fd08a', '#ff6b8b', '#4aa3ff', '#ff9f43'];
      for (var i = 0; i < 26; i++) {
        var p = document.createElement('i');
        p.style.left = (Math.random() * 100) + '%';
        p.style.background = cols[i % cols.length];
        p.style.animationDelay = (Math.random() * 0.25) + 's';
        p.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        c.appendChild(p);
      }
      host.appendChild(c);
      setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 1600);
    } catch (e) {}
  }

  function flashSquare(sq, good) {
    var el = mount.querySelector('.sq[data-sq="' + sq + '"]'); if (!el) return;
    el.classList.add(good ? 'flash-ok' : 'flash-bad');
    setTimeout(function () { el.classList.remove('flash-ok', 'flash-bad'); }, 600);
  }

  /* =====================================================================
     BASCULE Apprendre / Jouer
  ===================================================================== */
  function setupToggle() {
    var seg = document.getElementById('echMode'); if (!seg) return;
    var playEl = document.getElementById('playMode');
    function set(mode, remember) {
      var learn = mode === 'learn';
      if (!learn) stopSpeak();
      mount.hidden = !learn;
      if (playEl) playEl.hidden = learn;
      seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-m') === mode); });
      if (remember) { try { localStorage.setItem('brio_echecs_mode', mode); } catch (e) {} }
      if (learn && !mount.dataset.built) { mount.dataset.built = '1'; render(); }
      if (learn) { try { if (window.PB_track) window.PB_track('chess_academy_open'); } catch (e) {} }
    }
    seg.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () { set(b.getAttribute('data-m'), true); });
    });
    var saved = null; try { saved = localStorage.getItem('brio_echecs_mode'); } catch (e) {}
    // Débutants d'abord : par défaut on ouvre l'Académie (sauf si l'utilisateur a déjà choisi « Jouer »).
    set(saved || 'learn', false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupToggle);
  else setupToggle();
})();

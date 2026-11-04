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

  /* --------- glyphes (identiques au plateau de jeu) --------- */
  var GLY = { w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
              b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' } };

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
  try { window.__ACAD = { sanEnToFr: sanEnToFr, notationToSpeech: notationToSpeech, frMoveToSpeech: frMoveToSpeech }; } catch (e) {}

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
          fen: '7k/8/8/8/8/1q6/8/B6K w - - 0 1',
          intro: "L'<b>enfilade</b> est l'inverse du clouage : tu attaques une pièce de <b>grande</b> valeur qui, en s'écartant, expose une pièce <b>derrière</b> elle. Une pièce à longue portée (Fou, Tour, Dame) aligne les deux cibles et gagne du matériel." },
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
  var curLv = null, curIdx = 0, chess = null, sel = null, solved = false, usedHint = false, locked = false, phase = 1;

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
    sel = null; solved = false; usedHint = false; locked = false; phase = 1;
    if (ls.type === 'quiz' || !ls.fen || ls.fen === 'start') {
      chess = new Chess(); if (ls.fen && ls.fen !== 'start') { try { chess.load(ls.fen); } catch (e) {} }
    } else {
      chess = new Chess(); var ok = chess.load(ls.fen);
      if (!ok) { chess = new Chess(); }
    }
    if (ls.preselect) sel = ls.preselect;
    renderLesson();
  }

  function renderLesson() {
    var ls = curLv.lessons[curIdx];
    var h = '<div class="ac-lesson">';
    h += '<button class="ac-back">← Retour au parcours</button>';
    h += '<div class="ac-lesson-grid">';
    // colonne plateau
    h += '<div class="ac-boardcol"><div class="ac-board thb-brown pcs-classic" id="acadBoard"></div>'
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
    h += '<div class="ac-l-actions" id="acadActions"></div>';
    h += '</div></div></div>';
    mount.innerHTML = h;

    mount.querySelector('.ac-back').addEventListener('click', function () { stopSpeak(); view = 'road'; renderRoad(); });

    if (ls.type === 'quiz') { buildQuiz(ls); }
    else { drawBoard(); }
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
      if (ls.hint) h += '<button class="ac-btn ghost" id="acHint">💡 Indice</button>';
      h += '<button class="ac-btn ghost" id="acReset">↻ Recommencer</button>';
    }
    box.innerHTML = h;
    var d = document.getElementById('acDone'); if (d) d.addEventListener('click', function () { succeed(ls, "Leçon comprise — continue comme ça !"); });
    var hi = document.getElementById('acHint'); if (hi) hi.addEventListener('click', function () {
      usedHint = true; var ht = ls.hint || "Observe bien les cases proposées."; feedback(ht, 'hint'); speakText(ht);
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
    var html = '';
    for (var r = 7; r >= 0; r--) {
      for (var f = 0; f < 8; f++) {
        var sq = sqName(f, r);
        var piece = board[7 - r][f];
        var light = (f + r) % 2 === 1;
        var cls = 'sq ' + (light ? 'lt' : 'dk');
        if (sq === sel) cls += ' sel';
        if (targets.indexOf(sq) >= 0) cls += ' tgt';
        if (ls.target === sq && !isDone(ls.id)) cls += ' goalsq';
        if (sq === chkSq) cls += ' chk';
        html += '<button class="'+ cls +'" data-sq="'+ sq +'">';
        if (showCoords) {
          if (f === 0) html += '<span class="co rl">'+ (r + 1) +'</span>';
          if (r === 0) html += '<span class="co cl">'+ 'abcdefgh'[f] +'</span>';
        }
        if (piece) html += '<span class="pc '+ (piece.color === 'w' ? 'pw' : 'pb') +'">'+ GLY[piece.color][piece.type] +'</span>';
        html += '</button>';
      }
    }
    el.innerHTML = html;
    el.querySelectorAll('.sq').forEach(function (s) { s.addEventListener('click', function () { onSquare(s.getAttribute('data-sq')); }); });
  }

  function kingSquare(color) {
    var b = chess.board();
    for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) { var p = b[r][f]; if (p && p.type === 'k' && p.color === color) return sqName(f, 7 - r); }
    return null;
  }

  function onSquare(sq) {
    if (solved || locked) return;
    var ls = curLv.lessons[curIdx];

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
    sel = null; drawBoard();
    if (!done) return;
    evaluateMove(ls, done);
  }

  // la position (trait aux Noirs) force-t-elle un mat au prochain coup blanc ?
  function forcesMate(pos) {
    try {
      var fen = pos.fen();
      var tmp = new Chess(); tmp.load(fen);
      var replies = tmp.moves({ verbose: true });
      if (!replies.length) return false;
      for (var i = 0; i < replies.length; i++) {
        var u = new Chess(); u.load(fen); u.move({ from: replies[i].from, to: replies[i].to, promotion: replies[i].promotion || 'q' });
        var wm = u.moves({ verbose: true }), ok = false;
        for (var j = 0; j < wm.length; j++) {
          var v = new Chess(); v.load(u.fen()); v.move({ from: wm[j].from, to: wm[j].to, promotion: wm[j].promotion || 'q' });
          if (v.in_checkmate()) { ok = true; break; }
        }
        if (!ok) return false;
      }
      return true;
    } catch (e) { return false; }
  }
  function autoReplyBlack() {
    try {
      var r = chess.moves({ verbose: true }); if (!r.length) return;
      var m = r[0];
      chess.move({ from: m.from, to: m.to, promotion: m.promotion || 'q' });
    } catch (e) {}
  }

  function evaluateMove(ls, mv) {
    // ---- mat en 2 coups (validation en direct par le moteur) ----
    if (ls.type === 'mate2' || ls.goal === 'mate2') {
      if (phase === 1) {
        if (chess.in_checkmate()) { succeed(ls); return; }
        if (forcesMate(chess)) {
          phase = 2;
          feedback('<b>✓ Bien vu !</b> Le Roi est pris au piège… maintenant, <b>mate-le</b> !', 'ok');
          locked = true;
          setTimeout(function () { autoReplyBlack(); locked = false; drawBoard(); }, 850);
        } else {
          locked = true;
          feedback("Ce coup ne force pas le mat. J'annule — cherche le coup qui enferme le Roi 💪", 'bad');
          setTimeout(function () { chess.undo(); locked = false; drawBoard(); }, 950);
        }
      } else {
        if (chess.in_checkmate()) { succeed(ls); }
        else {
          locked = true;
          feedback("Presque ! Ce n'est pas encore mat. J'annule — retrouve le coup qui mate 💪", 'bad');
          setTimeout(function () { chess.undo(); locked = false; drawBoard(); }, 950);
        }
      }
      return;
    }
    var ok = false;
    if (ls.goal === 'mate') ok = chess.in_checkmate();
    else if (ls.goal === 'check') ok = chess.in_check();
    else if (ls.solution) ok = ls.solution.indexOf(mv.san) >= 0;
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

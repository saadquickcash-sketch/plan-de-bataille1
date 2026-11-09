/* ===================================================================
   Brio — Devoirs surveillés scientifiques (1ère Bac Sciences Maths)
   Maths (coef 9) · Physique-Chimie (coef 7) · SVT (coef 3)

   Même format que les examens régionaux : le moteur de examens.html
   les affiche, les chronomètre, corrige la copie par IA sur le barème
   et alimente le carnet d'erreurs.

   Notation : mathématiques en UNICODE (x², √5, ⁻¹, ₙ…) comme le reste
   du site — aucun délimiteur LaTeX, donc un rendu correct même hors
   ligne. Toutes les valeurs numériques ont été vérifiées par calcul.
   =================================================================== */
(function () {
  var E = (window.PB_EXAMS = window.PB_EXAMS || []);

  E.push(

  /* ================= MATHS — DEVOIR SURVEILLÉ N°1 ================= */
  {
    id: 'ds-maths-1', subject: 'maths', matiere: 'Mathématiques', coef: 9,
    official: false, kind: 'devoir surveillé', session: 'Devoir surveillé',
    label: 'Devoir surveillé n°1 — Logique, ensembles et fonctions',
    durationMin: 120, total: 20,
    consignes: "Devoir surveillé de mathématiques, 1ère année du baccalauréat Sciences Maths. Durée : 2 h. Le soin, la rigueur du raisonnement et la clarté de la rédaction seront pris en compte. La calculatrice n'est pas autorisée.",
    sections: [
      { titre: "Exercice 1 — Notions de logique", points: 6, questions: [
        { q: "Donner la négation de la proposition : (∀x ∈ ℝ) : x² + x + 1 > 0.", points: 1.5, lines: 3,
          correction: "La négation d'une proposition universelle est une proposition existentielle, et la négation de « > » est « ≤ » :<br><b>(∃x ∈ ℝ) : x² + x + 1 ≤ 0</b>.<br><i>Remarque :</i> la proposition de départ est vraie (discriminant Δ = 1 − 4 = −3 < 0), donc sa négation est fausse." },
        { q: "Démontrer par récurrence que pour tout entier naturel n ≥ 1 : 1 + 2 + … + n = n(n+1)/2.", points: 2, lines: 8,
          correction: "<b>Initialisation (n = 1) :</b> le membre de gauche vaut 1 et le membre de droite 1×2/2 = 1. La propriété est vraie au rang 1.<br><b>Hérédité :</b> supposons 1 + 2 + … + n = n(n+1)/2 pour un entier n ≥ 1. Alors<br>1 + 2 + … + n + (n+1) = n(n+1)/2 + (n+1) = (n+1)(n/2 + 1) = (n+1)(n+2)/2,<br>qui est bien la formule au rang n+1.<br><b>Conclusion :</b> par récurrence, la propriété est vraie pour tout n ≥ 1." },
        { q: "Soit n ∈ ℕ. Démontrer par contraposée que : si n² est impair, alors n est impair.", points: 1.5, lines: 6,
          correction: "La contraposée de « n² impair ⇒ n impair » est : <b>« n pair ⇒ n² pair »</b>.<br>Supposons n pair : il existe k ∈ ℕ tel que n = 2k. Alors n² = 4k² = 2(2k²), qui est pair.<br>La contraposée étant vraie, la proposition initiale est vraie." },
        { q: "La proposition (∃x ∈ ℝ)(∀y ∈ ℝ) : x + y = 0 est-elle vraie ou fausse ? Justifier.", points: 1, lines: 4,
          correction: "Elle est <b>fausse</b>. Soit x un réel fixé quelconque ; en choisissant y = −x + 1, on obtient x + y = 1 ≠ 0. Aucun réel x ne convient donc pour <i>tous</i> les y.<br><i>Attention :</i> la proposition (∀y ∈ ℝ)(∃x ∈ ℝ) : x + y = 0 est, elle, vraie (il suffit de prendre x = −y). L'ordre des quantificateurs est essentiel." }
      ]},
      { titre: "Exercice 2 — Ensembles et applications", points: 6, questions: [
        { q: "Soit A = { x ∈ ℝ : |x − 1| ≤ 2 }. Écrire A sous forme d'intervalle.", points: 1.5, lines: 4,
          correction: "|x − 1| ≤ 2 ⟺ −2 ≤ x − 1 ≤ 2 ⟺ −1 ≤ x ≤ 3.<br>Donc <b>A = [−1 ; 3]</b>." },
        { q: "On pose B = [0 ; 4[. Déterminer A ∩ B, A ∪ B et A privé de B.", points: 1.5, lines: 5,
          correction: "Avec A = [−1 ; 3] et B = [0 ; 4[ :<br><b>A ∩ B = [0 ; 3]</b> (les éléments communs) ;<br><b>A ∪ B = [−1 ; 4[</b> ;<br><b>A privé de B = [−1 ; 0[</b> (éléments de A qui ne sont pas dans B)." },
        { q: "Soit f : ℝ → ℝ définie par f(x) = 2x − 3. Montrer que f est bijective et déterminer sa réciproque.", points: 1.5, lines: 6,
          correction: "<b>Injectivité :</b> si f(a) = f(b) alors 2a − 3 = 2b − 3, donc a = b.<br><b>Surjectivité :</b> soit y ∈ ℝ ; en posant x = (y + 3)/2, on a f(x) = 2·(y+3)/2 − 3 = y.<br>f est donc <b>bijective</b> et <b>f⁻¹(y) = (y + 3)/2</b>." },
        { q: "Déterminer l'image directe f([−1 ; 3]).", points: 1.5, lines: 4,
          correction: "f est affine de coefficient directeur 2 > 0, donc strictement croissante sur ℝ. L'image d'un intervalle fermé est l'intervalle fermé des images des bornes :<br>f(−1) = −5 et f(3) = 3, d'où <b>f([−1 ; 3]) = [−5 ; 3]</b>." }
      ]},
      { titre: "Exercice 3 — Généralités sur les fonctions numériques", points: 8, questions: [
        { q: "Soit f la fonction définie par f(x) = (2x − 1)/(x + 1). Déterminer son ensemble de définition Df.", points: 1, lines: 3,
          correction: "La fonction est définie si le dénominateur est non nul : x + 1 ≠ 0, c'est-à-dire x ≠ −1.<br><b>Df = ℝ privé de {−1}</b>, soit ]−∞ ; −1[ ∪ ]−1 ; +∞[." },
        { q: "Montrer que pour tout x de Df : f(x) = 2 − 3/(x + 1).", points: 1.5, lines: 4,
          correction: "On réduit au même dénominateur :<br>2 − 3/(x+1) = (2(x+1) − 3)/(x+1) = (2x + 2 − 3)/(x+1) = (2x − 1)/(x+1) = f(x). ✓" },
        { q: "En utilisant la forme précédente, étudier le sens de variation de f sur ]−∞ ; −1[ puis sur ]−1 ; +∞[.", points: 2, lines: 8,
          correction: "Soient x₁ < x₂ appartenant au même intervalle. Alors x₁ + 1 < x₂ + 1 et ces deux nombres sont de même signe, donc 1/(x₁+1) > 1/(x₂+1).<br>En multipliant par −3 < 0 : −3/(x₁+1) < −3/(x₂+1), puis en ajoutant 2 : f(x₁) < f(x₂).<br>Donc f est <b>strictement croissante sur ]−∞ ; −1[</b> et <b>strictement croissante sur ]−1 ; +∞[</b>.<br><i>Attention :</i> on ne peut pas dire que f est croissante sur Df tout entier (elle n'est pas définie en −1)." },
        { q: "Résoudre dans Df l'équation f(x) = 1.", points: 1.5, lines: 4,
          correction: "Pour x ≠ −1 : (2x − 1)/(x + 1) = 1 ⟺ 2x − 1 = x + 1 ⟺ x = 2.<br>La valeur 2 appartient bien à Df, donc <b>S = {2}</b>." },
        { q: "Montrer que le point I(−1 ; 2) est centre de symétrie de la courbe de f.", points: 2, lines: 7,
          correction: "On montre que pour tout h ≠ 0 : f(−1 + h) + f(−1 − h) = 2 × 2.<br>f(−1 + h) = 2 − 3/h et f(−1 − h) = 2 − 3/(−h) = 2 + 3/h.<br>Leur somme vaut 4 = 2 × 2, soit deux fois l'ordonnée de I.<br>Donc <b>I(−1 ; 2) est centre de symétrie</b> de la courbe." }
      ]}
    ]
  },

  /* ================= MATHS — DEVOIR SURVEILLÉ N°2 ================= */
  {
    id: 'ds-maths-2', subject: 'maths', matiere: 'Mathématiques', coef: 9,
    official: false, kind: 'devoir surveillé', session: 'Devoir surveillé',
    label: 'Devoir surveillé n°2 — Suites, limites et dérivation',
    durationMin: 120, total: 20,
    consignes: "Devoir surveillé de mathématiques, 1ère année du baccalauréat Sciences Maths. Durée : 2 h. Toute réponse doit être justifiée. La qualité de la rédaction est notée.",
    sections: [
      { titre: "Exercice 1 — Suites numériques", points: 7, questions: [
        { q: "Soit la suite (uₙ) définie par u₀ = 1 et, pour tout n ∈ ℕ, uₙ₊₁ = (1/2)uₙ + 3. Calculer u₁ et u₂.", points: 1.5, lines: 4,
          correction: "u₁ = (1/2)×1 + 3 = 7/2 = <b>3,5</b>.<br>u₂ = (1/2)×(7/2) + 3 = 7/4 + 3 = 19/4 = <b>4,75</b>." },
        { q: "On pose vₙ = uₙ − 6. Montrer que (vₙ) est géométrique et préciser sa raison et son premier terme.", points: 2, lines: 6,
          correction: "vₙ₊₁ = uₙ₊₁ − 6 = (1/2)uₙ + 3 − 6 = (1/2)uₙ − 3 = (1/2)(uₙ − 6) = (1/2)vₙ.<br>Donc (vₙ) est <b>géométrique de raison q = 1/2</b>, de premier terme v₀ = u₀ − 6 = <b>−5</b>." },
        { q: "Exprimer vₙ puis uₙ en fonction de n.", points: 1.5, lines: 4,
          correction: "vₙ = v₀ × qⁿ = <b>−5 × (1/2)ⁿ</b>.<br>Comme uₙ = vₙ + 6 : <b>uₙ = 6 − 5(1/2)ⁿ</b>.<br><i>Vérification :</i> u₁ = 6 − 2,5 = 3,5 ✓ et u₂ = 6 − 1,25 = 4,75 ✓." },
        { q: "En déduire la limite de la suite (uₙ).", points: 2, lines: 4,
          correction: "Comme −1 < 1/2 < 1, on a (1/2)ⁿ → 0 quand n → +∞.<br>Donc uₙ = 6 − 5(1/2)ⁿ → 6 − 0 = 6.<br><b>lim uₙ = 6</b> : la suite converge vers 6." }
      ]},
      { titre: "Exercice 2 — Limites d'une fonction numérique", points: 6, questions: [
        { q: "Calculer la limite, quand x tend vers 2, de (x² − 4)/(x − 2).", points: 2, lines: 4,
          correction: "Il s'agit d'une forme indéterminée 0/0. On factorise le numérateur :<br>x² − 4 = (x − 2)(x + 2), donc pour x ≠ 2 : (x² − 4)/(x − 2) = x + 2.<br>D'où la limite : <b>2 + 2 = 4</b>." },
        { q: "Calculer la limite, quand x tend vers +∞, de (3x² − x + 1)/(x² + 5).", points: 2, lines: 4,
          correction: "Forme indéterminée ∞/∞. On factorise par le terme de plus haut degré :<br>(3x² − x + 1)/(x² + 5) = x²(3 − 1/x + 1/x²) / x²(1 + 5/x²).<br>Quand x → +∞, 1/x → 0 et 1/x² → 0, donc la limite vaut <b>3</b>.<br><i>Méthode rapide :</i> limite du quotient des termes de plus haut degré, 3x²/x² = 3." },
        { q: "Calculer la limite, quand x tend vers +∞, de √(x² + x) − x.", points: 2, lines: 6,
          correction: "Forme indéterminée ∞ − ∞. On multiplie par l'expression conjuguée :<br>√(x² + x) − x = ((x² + x) − x²) / (√(x² + x) + x) = x / (√(x² + x) + x).<br>Pour x > 0, on factorise par x : = 1 / (√(1 + 1/x) + 1).<br>Quand x → +∞, 1/x → 0, donc la limite vaut <b>1/2</b>." }
      ]},
      { titre: "Exercice 3 — Dérivation", points: 7, questions: [
        { q: "Soit f(x) = x³ − 3x + 2 définie sur ℝ. Calculer f ′(x) et la factoriser.", points: 1.5, lines: 4,
          correction: "f ′(x) = 3x² − 3 = 3(x² − 1) = <b>3(x − 1)(x + 1)</b>." },
        { q: "Étudier le signe de f ′(x) et dresser le tableau de variations de f.", points: 2, lines: 8,
          correction: "f ′(x) = 3(x − 1)(x + 1) est un trinôme de racines −1 et 1, de coefficient dominant positif : il est <b>positif</b> sur ]−∞ ; −1[, <b>négatif</b> sur ]−1 ; 1[, <b>positif</b> sur ]1 ; +∞[.<br>Donc f est croissante sur ]−∞ ; −1], décroissante sur [−1 ; 1], croissante sur [1 ; +∞[.<br>Maximum local : f(−1) = −1 + 3 + 2 = <b>4</b>. Minimum local : f(1) = 1 − 3 + 2 = <b>0</b>." },
        { q: "Déterminer une équation de la tangente (T) à la courbe de f au point d'abscisse 0.", points: 1.5, lines: 4,
          correction: "f(0) = 2 et f ′(0) = −3.<br>L'équation de la tangente est y = f ′(0)(x − 0) + f(0), soit <b>y = −3x + 2</b>." },
        { q: "Vérifier que f(x) = (x − 1)²(x + 2), puis résoudre l'équation f(x) = 0.", points: 2, lines: 6,
          correction: "Développement : (x − 1)²(x + 2) = (x² − 2x + 1)(x + 2) = x³ + 2x² − 2x² − 4x + x + 2 = x³ − 3x + 2 = f(x) ✓.<br>f(x) = 0 ⟺ (x − 1)²(x + 2) = 0 ⟺ x = 1 (racine double) ou x = −2.<br><b>S = {−2 ; 1}</b>." }
      ]}
    ]
  },

  /* ============ MATHS — DEVOIR DE SYNTHÈSE ============ */
  {
    id: 'ds-maths-3', subject: 'maths', matiere: 'Mathématiques', coef: 9,
    official: false, kind: 'devoir surveillé', session: 'Devoir de synthèse',
    label: 'Devoir de synthèse — Arithmétique, dénombrement, géométrie et fonctions',
    durationMin: 150, total: 20,
    consignes: "Devoir de synthèse de mathématiques, 1ère année du baccalauréat Sciences Maths. Durée : 2 h 30. Les quatre exercices sont indépendants et peuvent être traités dans l'ordre de votre choix.",
    sections: [
      { titre: "Exercice 1 — Arithmétique dans ℤ", points: 5, questions: [
        { q: "Déterminer pgcd(252 ; 198) par l'algorithme d'Euclide, en détaillant les divisions successives.", points: 1.5, lines: 6,
          correction: "252 = 198 × 1 + 54<br>198 = 54 × 3 + 36<br>54 = 36 × 1 + 18<br>36 = 18 × 2 + 0<br>Le dernier reste non nul est 18, donc <b>pgcd(252 ; 198) = 18</b>." },
        { q: "En déduire ppcm(252 ; 198).", points: 1.5, lines: 4,
          correction: "On utilise la relation pgcd(a ; b) × ppcm(a ; b) = a × b :<br>ppcm = (252 × 198)/18 = 49 896/18 = <b>2 772</b>.<br><i>Vérification :</i> 2 772 = 252 × 11 = 198 × 14 ✓." },
        { q: "Montrer que pour tout n ∈ ℕ, 3²ⁿ − 1 est divisible par 8.", points: 2, lines: 7,
          correction: "On remarque que 3²ⁿ = (3²)ⁿ = 9ⁿ. Il s'agit donc de montrer que 9ⁿ − 1 est divisible par 8.<br><b>Méthode 1 (factorisation) :</b> 9ⁿ − 1ⁿ = (9 − 1)(9ⁿ⁻¹ + 9ⁿ⁻² + … + 1) = 8k avec k entier.<br><b>Méthode 2 (récurrence) :</b> vrai pour n = 0 (1 − 1 = 0 = 8×0). Si 9ⁿ − 1 = 8k, alors 9ⁿ⁺¹ − 1 = 9×9ⁿ − 1 = 9(8k + 1) − 1 = 72k + 8 = 8(9k + 1) ✓." }
      ]},
      { titre: "Exercice 2 — Dénombrement", points: 4, questions: [
        { q: "Une urne contient 5 boules rouges et 3 boules vertes, indiscernables au toucher. On tire simultanément 3 boules. Combien y a-t-il de tirages possibles ?", points: 1, lines: 3,
          correction: "Un tirage simultané de 3 boules parmi 8 est une <b>combinaison</b> (l'ordre n'intervient pas) :<br>C(8 ; 3) = (8 × 7 × 6)/(3 × 2 × 1) = <b>56</b> tirages possibles." },
        { q: "Combien de tirages contiennent exactement 2 boules rouges ?", points: 1.5, lines: 4,
          correction: "On choisit 2 rouges parmi 5 <i>et</i> 1 verte parmi 3 :<br>C(5 ; 2) × C(3 ; 1) = 10 × 3 = <b>30</b> tirages." },
        { q: "Combien de tirages contiennent au moins une boule verte ?", points: 1.5, lines: 4,
          correction: "On passe par l'événement contraire (aucune verte, donc 3 rouges) :<br>C(5 ; 3) = 10 tirages sans verte.<br>D'où 56 − 10 = <b>46</b> tirages contenant au moins une verte." }
      ]},
      { titre: "Exercice 3 — Produit scalaire et cercle", points: 5, questions: [
        { q: "Le plan est rapporté à un repère orthonormé. On donne A(1 ; 2) et B(5 ; 4). Calculer la distance AB.", points: 1, lines: 3,
          correction: "Le vecteur AB a pour coordonnées (5 − 1 ; 4 − 2) = (4 ; 2).<br>AB = √(4² + 2²) = √20 = <b>2√5</b>." },
        { q: "Déterminer une équation cartésienne du cercle (C) de diamètre [AB].", points: 1.5, lines: 5,
          correction: "Le centre est le milieu I de [AB] : I((1+5)/2 ; (2+4)/2) = I(3 ; 3).<br>Le rayon vaut AB/2 = √5.<br>Équation : <b>(x − 3)² + (y − 3)² = 5</b>." },
        { q: "Vérifier que le point M(1 ; 4) appartient à (C).", points: 1.5, lines: 3,
          correction: "(1 − 3)² + (4 − 3)² = 4 + 1 = 5, qui est bien égal au carré du rayon.<br>Donc <b>M appartient à (C)</b>." },
        { q: "Calculer le produit scalaire des vecteurs MA et MB, puis interpréter le résultat.", points: 1, lines: 5,
          correction: "MA = (1 − 1 ; 2 − 4) = (0 ; −2) et MB = (5 − 1 ; 4 − 4) = (4 ; 0).<br>MA · MB = 0×4 + (−2)×0 = <b>0</b>.<br><b>Interprétation :</b> les vecteurs sont orthogonaux, donc le triangle AMB est rectangle en M. C'est cohérent : tout point du cercle de diamètre [AB] voit [AB] sous un angle droit." }
      ]},
      { titre: "Exercice 4 — Étude d'une fonction", points: 6, questions: [
        { q: "Soit f définie sur ]0 ; +∞[ par f(x) = x + 1/x. Déterminer les limites de f en 0 par valeurs supérieures et en +∞.", points: 1, lines: 5,
          correction: "Quand x → 0⁺ : x → 0 et 1/x → +∞, donc <b>lim f(x) = +∞</b> (asymptote verticale d'équation x = 0).<br>Quand x → +∞ : x → +∞ et 1/x → 0, donc <b>lim f(x) = +∞</b>." },
        { q: "Calculer f ′(x) et étudier son signe sur ]0 ; +∞[.", points: 1.5, lines: 6,
          correction: "f ′(x) = 1 − 1/x² = (x² − 1)/x².<br>Comme x² > 0, le signe de f ′(x) est celui de x² − 1 = (x − 1)(x + 1). Sur ]0 ; +∞[, le facteur x + 1 est positif, donc le signe est celui de x − 1 :<br>f ′(x) < 0 sur ]0 ; 1[ et f ′(x) > 0 sur ]1 ; +∞[." },
        { q: "Dresser le tableau de variations de f et en déduire son minimum.", points: 1.5, lines: 6,
          correction: "f est <b>décroissante sur ]0 ; 1]</b> puis <b>croissante sur [1 ; +∞[</b>.<br>Elle admet donc un <b>minimum en x = 1</b>, qui vaut f(1) = 1 + 1 = <b>2</b>.<br>On en déduit que pour tout x > 0 : x + 1/x ≥ 2." },
        { q: "Montrer que la droite (D) d'équation y = x est asymptote oblique à la courbe de f en +∞, et préciser la position relative de la courbe et de (D).", points: 2, lines: 6,
          correction: "f(x) − x = 1/x.<br>Quand x → +∞, 1/x → 0 : la droite <b>y = x est donc asymptote oblique</b> à la courbe en +∞.<br><b>Position :</b> pour tout x > 0, f(x) − x = 1/x > 0, donc la courbe est <b>au-dessus</b> de l'asymptote sur ]0 ; +∞[." }
      ]}
    ]
  },

  /* ============== PHYSIQUE-CHIMIE — DEVOIR SURVEILLÉ N°1 ============== */
  {
    id: 'ds-pc-1', subject: 'pc', matiere: 'Physique-Chimie', coef: 7,
    official: false, kind: 'devoir surveillé', session: 'Devoir surveillé',
    label: 'Devoir surveillé n°1 — Travail, énergie cinétique et énergie mécanique',
    durationMin: 90, total: 20,
    consignes: "Devoir surveillé de physique, 1ère année du baccalauréat Sciences Maths. Durée : 1 h 30. On prendra g = 10 N·kg⁻¹. Les résultats doivent être donnés avec leur unité, et les expressions littérales établies avant toute application numérique.",
    sections: [
      { titre: "Exercice 1 — Travail et puissance d'une force", points: 6, questions: [
        { q: "Un solide de masse m = 2 kg est tiré sur un plan horizontal par une force constante F = 20 N faisant un angle α = 30° avec le déplacement. Le déplacement vaut d = 10 m. Calculer le travail de la force F.", points: 1.5, lines: 5,
          correction: "Le travail d'une force constante vaut W(F) = F × d × cos(α).<br>W(F) = 20 × 10 × cos(30°) = 200 × (√3/2) = 100√3 ≈ <b>173 J</b>.<br>Ce travail est positif : la force est <b>motrice</b>." },
        { q: "Calculer le travail du poids et celui de la réaction normale du support au cours de ce déplacement. Justifier.", points: 1.5, lines: 5,
          correction: "Le déplacement est <b>horizontal</b>, alors que le poids (vertical, vers le bas) et la réaction normale (verticale, vers le haut) lui sont <b>perpendiculaires</b>.<br>L'angle vaut 90° et cos(90°) = 0 :<br><b>W(P) = 0 J</b> et <b>W(R) = 0 J</b>." },
        { q: "Le déplacement dure Δt = 5 s. Calculer la puissance moyenne développée par la force F.", points: 1.5, lines: 4,
          correction: "P(moyenne) = W(F)/Δt = 173/5 ≈ <b>34,6 W</b>." },
        { q: "Rappeler la différence entre un travail moteur et un travail résistant, puis préciser la nature du travail de F.", points: 1.5, lines: 5,
          correction: "Un travail est <b>moteur</b> lorsqu'il est <b>positif</b> (la force favorise le mouvement, l'angle est aigu) et <b>résistant</b> lorsqu'il est <b>négatif</b> (la force s'oppose au mouvement, l'angle est obtus).<br>Ici W(F) ≈ +173 J > 0 : le travail de F est <b>moteur</b>." }
      ]},
      { titre: "Exercice 2 — Théorème de l'énergie cinétique", points: 7, questions: [
        { q: "Une voiture de masse m = 1000 kg roule à la vitesse v₀ = 72 km/h. Convertir cette vitesse en m·s⁻¹.", points: 1, lines: 3,
          correction: "On divise par 3,6 : v₀ = 72/3,6 = <b>20 m·s⁻¹</b>." },
        { q: "Calculer son énergie cinétique initiale.", points: 1.5, lines: 4,
          correction: "Ec = (1/2)mv₀² = 0,5 × 1000 × 20² = 0,5 × 1000 × 400 = <b>200 000 J = 200 kJ</b>." },
        { q: "Le conducteur freine et la voiture s'arrête après une distance d = 50 m. En appliquant le théorème de l'énergie cinétique, calculer le travail de la force de freinage.", points: 2, lines: 6,
          correction: "Théorème de l'énergie cinétique : ΔEc = somme des travaux des forces extérieures.<br>Le poids et la réaction normale ne travaillent pas (déplacement horizontal) ; il reste la force de freinage f :<br>Ec(finale) − Ec(initiale) = W(f), soit 0 − 200 000 = W(f).<br><b>W(f) = −200 000 J</b> : travail <b>résistant</b> (négatif), ce qui est logique pour un freinage." },
        { q: "En supposant la force de freinage constante et opposée au déplacement, calculer son intensité.", points: 1.5, lines: 4,
          correction: "La force étant opposée au déplacement, W(f) = −f × d, donc f = |W(f)|/d.<br>f = 200 000/50 = <b>4 000 N</b>." },
        { q: "Si la vitesse initiale était doublée (la force de freinage restant la même), quelle serait la distance d'arrêt ? Commenter.", points: 1, lines: 5,
          correction: "L'énergie cinétique est proportionnelle au <b>carré</b> de la vitesse : en doublant v, Ec est multipliée par 4.<br>Comme Ec = f × d, la distance est elle aussi multipliée par 4 : d′ = 4 × 50 = <b>200 m</b>.<br><b>Commentaire :</b> doubler la vitesse quadruple la distance d'arrêt — d'où l'importance des limitations de vitesse." }
      ]},
      { titre: "Exercice 3 — Énergie mécanique", points: 7, questions: [
        { q: "Une bille de masse m = 100 g est lâchée sans vitesse initiale d'une hauteur h = 5 m. Les frottements sont négligés et l'énergie potentielle de pesanteur est nulle au sol. Calculer l'énergie mécanique initiale.", points: 1.5, lines: 5,
          correction: "m = 100 g = 0,1 kg. À l'instant initial la vitesse est nulle, donc Ec = 0.<br>Epp = mgh = 0,1 × 10 × 5 = 5 J.<br><b>Em = Ec + Epp = 0 + 5 = 5 J</b>." },
        { q: "Que peut-on dire de l'énergie mécanique au cours de la chute ? Justifier.", points: 1.5, lines: 4,
          correction: "Les frottements étant négligés, la bille n'est soumise qu'à son poids, qui est une force conservative.<br>L'énergie mécanique <b>se conserve</b> : elle reste égale à <b>5 J</b> pendant toute la chute. L'énergie potentielle se convertit progressivement en énergie cinétique." },
        { q: "En déduire la vitesse de la bille juste avant son arrivée au sol.", points: 2, lines: 5,
          correction: "Au sol, h = 0 donc Epp = 0 et toute l'énergie est cinétique :<br>(1/2)mv² = 5, d'où v² = (2 × 5)/0,1 = 100 et <b>v = 10 m·s⁻¹</b>." },
        { q: "Calculer l'énergie cinétique et la vitesse de la bille lorsqu'elle se trouve à la hauteur h′ = 2 m du sol.", points: 2, lines: 6,
          correction: "Epp(h′) = mgh′ = 0,1 × 10 × 2 = 2 J.<br>Par conservation : Ec = Em − Epp = 5 − 2 = <b>3 J</b>.<br>v = √((2 × Ec)/m) = √((2 × 3)/0,1) = √60 ≈ <b>7,75 m·s⁻¹</b>." }
      ]}
    ]
  },

  /* ============== PHYSIQUE-CHIMIE — DEVOIR SURVEILLÉ N°2 ============== */
  {
    id: 'ds-pc-2', subject: 'pc', matiere: 'Physique-Chimie', coef: 7,
    official: false, kind: 'devoir surveillé', session: 'Devoir surveillé',
    label: 'Devoir surveillé n°2 — Chimie : mole, conductimétrie et avancement',
    durationMin: 90, total: 20,
    consignes: "Devoir surveillé de chimie, 1ère année du baccalauréat Sciences Maths. Durée : 1 h 30. Données : M(Na) = 23 g·mol⁻¹ ; M(Cl) = 35,5 g·mol⁻¹ ; M(Zn) = 65 g·mol⁻¹ ; volume molaire Vm = 24 L·mol⁻¹. Toute application numérique doit être précédée de l'expression littérale.",
    sections: [
      { titre: "Exercice 1 — Grandeurs liées à la quantité de matière", points: 7, questions: [
        { q: "On dissout une masse m = 11,7 g de chlorure de sodium NaCl dans de l'eau pour obtenir V = 500 mL de solution. Calculer la masse molaire de NaCl.", points: 1.5, lines: 3,
          correction: "M(NaCl) = M(Na) + M(Cl) = 23 + 35,5 = <b>58,5 g·mol⁻¹</b>." },
        { q: "Calculer la quantité de matière de NaCl dissoute.", points: 1.5, lines: 4,
          correction: "n = m/M = 11,7/58,5 = <b>0,2 mol</b>." },
        { q: "En déduire la concentration molaire c de la solution.", points: 1.5, lines: 4,
          correction: "V = 500 mL = 0,5 L.<br>c = n/V = 0,2/0,5 = <b>0,4 mol·L⁻¹</b>." },
        { q: "Écrire l'équation de dissolution du chlorure de sodium et déterminer les concentrations des ions en solution.", points: 1.5, lines: 5,
          correction: "Équation de dissolution : NaCl(s) → Na⁺(aq) + Cl⁻(aq).<br>D'après les coefficients stœchiométriques (1 pour 1) :<br><b>[Na⁺] = [Cl⁻] = c = 0,4 mol·L⁻¹</b>." },
        { q: "On prélève 50 mL de cette solution. Quelle quantité de matière de NaCl ce prélèvement contient-il ?", points: 1, lines: 4,
          correction: "La concentration est la même dans tout le volume prélevé :<br>n = c × V = 0,4 × 0,050 = <b>0,02 mol</b>." }
      ]},
      { titre: "Exercice 2 — Conductance et conductivité", points: 6, questions: [
        { q: "Une solution de chlorure de potassium KCl a pour concentration c = 10⁻² mol·L⁻¹. Données : λ(K⁺) = 7,35 mS·m²·mol⁻¹ et λ(Cl⁻) = 7,63 mS·m²·mol⁻¹. Calculer la conductivité σ de la solution.", points: 2, lines: 6,
          correction: "La loi de Kohlrausch donne σ = λ(K⁺)×[K⁺] + λ(Cl⁻)×[Cl⁻], avec les concentrations exprimées en <b>mol·m⁻³</b>.<br>Conversion : c = 10⁻² mol·L⁻¹ = 10 mol·m⁻³, et [K⁺] = [Cl⁻] = 10 mol·m⁻³.<br>σ = (7,35 + 7,63)×10⁻³ × 10 = 14,98×10⁻³ × 10 ≈ <b>0,15 S·m⁻¹</b>." },
        { q: "La cellule de mesure possède deux plaques de surface S = 1 cm² distantes de L = 1 cm. Calculer la conductance G de la portion de solution.", points: 2, lines: 6,
          correction: "G = σ × S/L, avec S = 1 cm² = 10⁻⁴ m² et L = 1 cm = 10⁻² m.<br>G = 0,1498 × (10⁻⁴/10⁻²) = 0,1498 × 10⁻² ≈ 1,5×10⁻³ S,<br>soit <b>G ≈ 1,5 mS</b>." },
        { q: "On dilue cette solution 10 fois. Que devient la conductivité ? Justifier.", points: 2, lines: 5,
          correction: "Pour une solution diluée, la conductivité est <b>proportionnelle à la concentration</b> des ions.<br>Si la concentration est divisée par 10, la conductivité l'est aussi :<br>σ′ = 0,1498/10 ≈ <b>0,015 S·m⁻¹</b>." }
      ]},
      { titre: "Exercice 3 — Suivi d'une transformation chimique", points: 7, questions: [
        { q: "On introduit m = 0,65 g de zinc dans V = 100 mL de solution d'acide chlorhydrique de concentration c = 0,2 mol·L⁻¹. L'équation de la réaction est : Zn + 2H₃O⁺ → Zn²⁺ + H₂ + 2H₂O. Calculer les quantités de matière initiales de zinc et d'ions H₃O⁺.", points: 1.5, lines: 5,
          correction: "n(Zn) = m/M = 0,65/65 = <b>0,01 mol</b>.<br>n(H₃O⁺) = c × V = 0,2 × 0,100 = <b>0,02 mol</b>." },
        { q: "Dresser le tableau d'avancement de la réaction et déterminer le réactif limitant ainsi que l'avancement maximal.", points: 2, lines: 8,
          correction: "<b>Tableau d'avancement</b> (en mol) :<br>— état initial : Zn : 0,01 ; H₃O⁺ : 0,02 ; Zn²⁺ : 0 ; H₂ : 0<br>— en cours : Zn : 0,01 − x ; H₃O⁺ : 0,02 − 2x ; Zn²⁺ : x ; H₂ : x<br>Le zinc s'épuise pour 0,01 − x = 0, soit x = 0,01 ;<br>les ions H₃O⁺ s'épuisent pour 0,02 − 2x = 0, soit x = 0,01.<br>Les deux réactifs disparaissent <b>simultanément</b> : le mélange est <b>stœchiométrique</b> (aucun réactif limitant au sens strict) et <b>x(max) = 0,01 mol</b>." },
        { q: "Calculer le volume de dihydrogène dégagé à l'état final.", points: 1.5, lines: 4,
          correction: "D'après le tableau, n(H₂) = x(max) = 0,01 mol.<br>V(H₂) = n × Vm = 0,01 × 24 = 0,24 L = <b>240 mL</b>." },
        { q: "Calculer la concentration des ions Zn²⁺ dans la solution à l'état final (le volume est supposé constant).", points: 2, lines: 5,
          correction: "n(Zn²⁺) = x(max) = 0,01 mol et V = 0,100 L.<br>[Zn²⁺] = n/V = 0,01/0,100 = <b>0,1 mol·L⁻¹</b>." }
      ]}
    ]
  },

  /* ==================== SVT — DEVOIR SURVEILLÉ N°1 ==================== */
  {
    id: 'ds-svt-1', subject: 'svt', matiere: 'SVT', coef: 3,
    official: false, kind: 'devoir surveillé', session: 'Devoir surveillé',
    label: 'Devoir surveillé n°1 — Géologie : sédimentation et stratigraphie',
    durationMin: 90, total: 20,
    consignes: "Devoir surveillé de SVT, 1ère année du baccalauréat Sciences Maths. Durée : 1 h 30. Les réponses doivent être rédigées, précises, et illustrées par des schémas lorsque c'est utile.",
    sections: [
      { titre: "Exercice 1 — Sédimentation et roches sédimentaires", points: 7, questions: [
        { q: "Définir les termes suivants : sédimentation, diagenèse.", points: 2, lines: 6,
          correction: "<b>Sédimentation :</b> processus de dépôt des particules (sédiments) transportées par l'eau, le vent ou la glace, dans un milieu de dépôt (bassin sédimentaire), généralement en couches successives horizontales.<br><b>Diagenèse :</b> ensemble des transformations physico-chimiques (compaction, déshydratation, cimentation) qui transforment un sédiment meuble en une roche sédimentaire cohérente." },
        { q: "Citer, dans l'ordre, les étapes de la formation d'une roche sédimentaire détritique à partir d'une roche mère.", points: 2, lines: 6,
          correction: "1) <b>Altération</b> de la roche mère (physique, chimique, biologique) puis <b>érosion</b> ;<br>2) <b>Transport</b> des particules (eau, vent, glace, gravité) ;<br>3) <b>Sédimentation</b> : dépôt des particules dans le bassin ;<br>4) <b>Diagenèse</b> (compaction et cimentation) donnant la roche sédimentaire." },
        { q: "Citer deux exemples de roches sédimentaires détritiques et deux exemples de roches carbonatées.", points: 1.5, lines: 4,
          correction: "<b>Détritiques :</b> le grès, l'argile (ou le conglomérat, le sable).<br><b>Carbonatées :</b> le calcaire, la craie (ou la dolomie)." },
        { q: "Comment reconnaître expérimentalement une roche calcaire au laboratoire ? Décrire le test et son résultat.", points: 1.5, lines: 5,
          correction: "On réalise le <b>test à l'acide chlorhydrique dilué</b> : on dépose quelques gouttes de HCl sur la roche.<br><b>Résultat :</b> une <b>effervescence</b> apparaît, due à un dégagement de dioxyde de carbone CO₂ (qui trouble l'eau de chaux). Cela traduit la présence de carbonate de calcium CaCO₃ : la roche est calcaire." }
      ]},
      { titre: "Exercice 2 — Principes de la stratigraphie", points: 7, questions: [
        { q: "Énoncer les principes fondamentaux de la stratigraphie (au moins quatre).", points: 2, lines: 8,
          correction: "<b>Principe de superposition :</b> dans une série non déformée, une couche est plus récente que celle qu'elle recouvre et plus ancienne que celle qui la recouvre.<br><b>Principe de continuité :</b> une même couche a le même âge sur toute son étendue.<br><b>Principe d'identité paléontologique :</b> deux couches contenant les mêmes fossiles stratigraphiques ont le même âge.<br><b>Principe de recoupement :</b> une structure (faille, filon) qui en recoupe une autre lui est postérieure." },
        { q: "Qu'est-ce qu'un fossile stratigraphique (fossile marqueur) ? Citer ses caractéristiques.", points: 2, lines: 6,
          correction: "C'est un fossile qui permet de <b>dater</b> relativement une couche et de la corréler avec d'autres.<br><b>Caractéristiques :</b> une <b>large répartition géographique</b>, une <b>courte durée d'existence</b> à l'échelle des temps géologiques (évolution rapide), une <b>grande abondance</b> et une bonne conservation." },
        { q: "Classer les ères géologiques suivantes dans l'ordre chronologique, de la plus ancienne à la plus récente : Mésozoïque, Précambrien, Cénozoïque, Paléozoïque.", points: 1.5, lines: 4,
          correction: "Dans l'ordre du plus ancien au plus récent :<br><b>Précambrien → Paléozoïque (Primaire) → Mésozoïque (Secondaire) → Cénozoïque (Tertiaire et Quaternaire)</b>." },
        { q: "Sur un document, une couche sédimentaire A est recoupée par une faille F. Lequel des deux est le plus ancien ? Sur quel principe s'appuie-t-on ?", points: 1.5, lines: 5,
          correction: "La couche <b>A est plus ancienne</b> que la faille F : la faille n'a pu se former qu'après le dépôt de la couche qu'elle affecte.<br>On s'appuie sur le <b>principe de recoupement</b> : toute structure qui en recoupe une autre lui est postérieure." }
      ]},
      { titre: "Exercice 3 — Carte géologique et coupe", points: 6, questions: [
        { q: "Définir : carte géologique, coupe géologique, échelle d'une carte.", points: 2, lines: 6,
          correction: "<b>Carte géologique :</b> représentation, sur un fond topographique, de la nature et de la répartition des terrains (formations géologiques) affleurant en surface, à l'aide de figurés et de couleurs conventionnels.<br><b>Coupe géologique :</b> représentation verticale (en profondeur), selon une direction donnée, de la disposition des couches.<br><b>Échelle :</b> rapport entre une distance mesurée sur la carte et la distance réelle correspondante sur le terrain (par exemple 1/50 000)." },
        { q: "Sur une carte, les limites des couches géologiques sont parallèles aux courbes de niveau. Que peut-on en déduire sur la disposition des couches ?", points: 2, lines: 5,
          correction: "Lorsque les limites des couches suivent (sont parallèles à) les courbes de niveau, cela signifie que les couches sont <b>horizontales</b> : elles n'ont été ni basculées ni plissées.<br>Chaque limite se situe alors à une altitude constante." },
        { q: "Expliquer comment déterminer l'ordre de dépôt des couches sur une coupe géologique.", points: 2, lines: 5,
          correction: "On applique le <b>principe de superposition</b> : dans une série sédimentaire non renversée, la couche située <b>en dessous est la plus ancienne</b> et celle située au-dessus est la plus récente.<br>On vérifie d'abord que la série n'a pas été renversée (plissement), puis on classe les couches de bas en haut, de la plus ancienne à la plus récente." }
      ]}
    ]
  },

  /* ==================== SVT — DEVOIR SURVEILLÉ N°2 ==================== */
  {
    id: 'ds-svt-2', subject: 'svt', matiere: 'SVT', coef: 3,
    official: false, kind: 'devoir surveillé', session: 'Devoir surveillé',
    label: "Devoir surveillé n°2 — L'information génétique et le génie génétique",
    durationMin: 90, total: 20,
    consignes: "Devoir surveillé de SVT, 1ère année du baccalauréat Sciences Maths. Durée : 1 h 30. Les réponses doivent être rédigées et justifiées ; les séquences demandées seront écrites dans le bon sens de lecture.",
    sections: [
      { titre: "Exercice 1 — La nature de l'information génétique : l'ADN", points: 7, questions: [
        { q: "Donner la composition d'un nucléotide et citer les quatre bases azotées de l'ADN.", points: 2, lines: 6,
          correction: "Un nucléotide est formé de trois éléments :<br>— un <b>groupement phosphate</b> (acide phosphorique) ;<br>— un <b>sucre</b> à 5 atomes de carbone : le <b>désoxyribose</b> ;<br>— une <b>base azotée</b>.<br><b>Les quatre bases :</b> l'adénine (A), la thymine (T), la guanine (G) et la cytosine (C)." },
        { q: "Énoncer la règle de complémentarité des bases. Un brin d'ADN a pour séquence ATGCCA : écrire la séquence du brin complémentaire.", points: 2, lines: 5,
          correction: "<b>Règle de complémentarité :</b> l'adénine s'apparie toujours à la thymine (A–T, 2 liaisons hydrogène) et la guanine à la cytosine (G–C, 3 liaisons hydrogène).<br>Brin donné : A T G C C A<br>Brin complémentaire : <b>T A C G G T</b>." },
        { q: "Une molécule d'ADN contient 30 % d'adénine. Calculer le pourcentage de chacune des trois autres bases. Justifier.", points: 1.5, lines: 6,
          correction: "Par complémentarité, le pourcentage de A est égal à celui de T, et celui de G à celui de C.<br>Si A = 30 %, alors T = 30 % et A + T = 60 %.<br>Il reste 100 − 60 = 40 % à partager équitablement entre G et C :<br><b>T = 30 % ; G = 20 % ; C = 20 %</b>." },
        { q: "Citer une expérience historique ayant permis de montrer que l'ADN est le support de l'information génétique.", points: 1.5, lines: 5,
          correction: "L'<b>expérience de transformation chez le pneumocoque</b> : Griffith (1928) montre qu'une souche R non virulente devient virulente au contact de bactéries S tuées ; Avery, MacLeod et McCarty (1944) identifient ensuite que le <b>principe transformant est l'ADN</b> (la transformation disparaît si l'on détruit l'ADN par une ADNase).<br><i>On accepte aussi :</i> l'expérience de Hershey et Chase (1952) sur le bactériophage." }
      ]},
      { titre: "Exercice 2 — L'expression de l'information génétique", points: 7, questions: [
        { q: "Définir la transcription et la traduction, en précisant le lieu de chacune dans une cellule eucaryote.", points: 2, lines: 6,
          correction: "<b>Transcription :</b> synthèse d'une molécule d'ARN messager à partir du brin transcrit de l'ADN. Elle a lieu dans le <b>noyau</b>.<br><b>Traduction :</b> synthèse d'une protéine (enchaînement d'acides aminés) à partir de l'ARN messager, selon le code génétique. Elle a lieu dans le <b>cytoplasme</b>, au niveau des <b>ribosomes</b>." },
        { q: "Le brin transcrit d'un fragment d'ADN a pour séquence : TAC GGA TTA. Écrire la séquence de l'ARN messager correspondant.", points: 2, lines: 5,
          correction: "Lors de la transcription on applique la complémentarité, la thymine étant remplacée par l'<b>uracile (U)</b> : T → A, A → U, G → C, C → G.<br>Brin transcrit : TAC GGA TTA<br>ARN messager : <b>AUG CCU AAU</b>." },
        { q: "À l'aide du code génétique, donner les acides aminés correspondants et préciser le rôle du premier codon.", points: 1.5, lines: 5,
          correction: "<b>AUG</b> → <b>Méthionine</b> ; <b>CCU</b> → <b>Proline</b> ; <b>AAU</b> → <b>Asparagine</b>.<br>Le codon <b>AUG est le codon d'initiation</b> : il marque le début de la traduction (et code la méthionine)." },
        { q: "Définir le code génétique et citer deux de ses propriétés.", points: 1.5, lines: 6,
          correction: "<b>Définition :</b> système de correspondance entre les codons (triplets de nucléotides de l'ARN messager) et les acides aminés de la protéine.<br><b>Propriétés (deux au choix) :</b><br>— <b>universel</b> : le même code est utilisé par presque tous les êtres vivants ;<br>— <b>redondant (dégénéré)</b> : un même acide aminé peut être codé par plusieurs codons ;<br>— <b>non chevauchant</b> : les codons sont lus les uns après les autres, sans chevauchement ;<br>— <b>non ambigu</b> : un codon ne code qu'un seul acide aminé." }
      ]},
      { titre: "Exercice 3 — Le génie génétique et ses applications", points: 6, questions: [
        { q: "Définir : génie génétique, transgénèse, OGM.", points: 2, lines: 6,
          correction: "<b>Génie génétique :</b> ensemble des techniques permettant d'isoler, de modifier et de transférer des gènes d'un organisme à un autre.<br><b>Transgénèse :</b> transfert d'un gène (transgène) d'un organisme donneur vers un organisme receveur, qui l'exprime.<br><b>OGM :</b> organisme génétiquement modifié, dont le patrimoine génétique a été modifié par génie génétique." },
        { q: "Décrire les principales étapes de la production d'insuline humaine par une bactérie.", points: 2, lines: 8,
          correction: "1) <b>Isolement du gène</b> de l'insuline humaine, découpé par des <b>enzymes de restriction</b> ;<br>2) <b>Ouverture d'un plasmide</b> bactérien (le vecteur) par la même enzyme de restriction ;<br>3) <b>Insertion du gène dans le plasmide</b> et soudure par l'<b>ADN ligase</b> : on obtient un plasmide recombiné ;<br>4) <b>Introduction du plasmide</b> dans la bactérie (transformation) ;<br>5) <b>Multiplication des bactéries</b> (clonage) qui expriment le gène et <b>produisent l'insuline</b>, ensuite extraite et purifiée." },
        { q: "Citer deux applications du génie génétique en médecine et deux en agriculture.", points: 2, lines: 6,
          correction: "<b>En médecine :</b> production d'<b>insuline</b> humaine, d'<b>hormone de croissance</b>, de <b>vaccins</b> recombinants, <b>thérapie génique</b>, diagnostic des maladies génétiques.<br><b>En agriculture :</b> plantes <b>résistantes aux insectes</b> (maïs Bt) ou <b>aux herbicides</b>, amélioration des <b>rendements</b> et de la qualité nutritionnelle (riz doré), résistance à la sécheresse." }
      ]}
    ]
  }

  );
})();

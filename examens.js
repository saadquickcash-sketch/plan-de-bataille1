/* ===== Espace d'examen — Régional 1ère Bac (programme marocain) =====
   Sujets officiels : texte support, questions, barème et corrigé officiels.
   Extraits littéraires reproduits à des fins strictement pédagogiques (courts extraits, usage scolaire),
   avec attribution à l'œuvre et à l'auteur.

   ┌───────────────────────────────────────────────────────────────────────────┐
   │  POUR AJOUTER UN EXAMEN (toutes matières / années / régions)                │
   │  Copie ce modèle et remplis-le. Le CORRECTEUR INTELLIGENT fonctionne tout   │
   │  seul pour chaque question : il note sur le barème, explique pourquoi c'est  │
   │  faux et donne la mention — rien d'autre à coder.                            │
   │                                                                             │
   │  window.PB_EXAMS.push({                                                      │
   │    id:"maths-casa-2023",          // identifiant unique                      │
   │    subject:"maths",               // clé matière : maths, pc, svt, francais, │
   │                                   //   arabe, philo, hg, anglais, islam…     │
   │    matiere:"Mathématiques",       // libellé affiché                         │
   │    region:"Casablanca-Settat",    // région (pour le filtre)                 │
   │    annee:2023, session:"Ordinaire", // année + session (pour le filtre)      │
   │    coef:7, official:true, label:"Régional Casablanca 2023 — officiel",       │
   │    durationMin:120, total:20,                                               │
   │    consignes:"…",                                                           │
   │    texte:{ titre:"…", html:"<p>…</p>", source:"…" },   // facultatif         │
   │    sections:[                                                                │
   │      { titre:"Exercice 1", points:4, questions:[                             │
   │        { q:"Énoncé de la question…", points:2, lines:4,                      │
   │          correction:"Réponse/barème officiel (le correcteur s'y compare)." },│
   │        …                                                                     │
   │      ]},                                                                     │
   │      …                                                                       │
   │    ]                                                                         │
   │  });                                                                         │
   │  Champs question : q, points, lines? (hauteur zone réponse),                 │
   │     redaction?:true (sujet de rédaction), correction (corrigé officiel).     │
   └───────────────────────────────────────────────────────────────────────────┘ */
window.PB_EXAMS = window.PB_EXAMS || [];

/* ---------- Français — Régional Fès-Meknès 2024 (session ordinaire) ---------- */
window.PB_EXAMS.push({
  id:"fr-fesmeknes-2024", subject:"francais", matiere:"Français", coef:4, official:true,
  region:"Fès-Meknès", annee:2024, session:"Ordinaire",
  label:"Régional Fès-Meknès 2024 — officiel",
  durationMin:120, total:20,
  consignes:"Examen régional unifié, 1ère année du baccalauréat, Académie Fès-Meknès (session ordinaire 2024). Durée : 2 h. Lis attentivement le texte, puis traite l'étude de texte et la production écrite. Attribue-toi les points à la fin en te comparant au corrigé officiel.",
  texte:{
    titre:"Texte",
    html:"<p>Le soir, je revins à la maison mort de fatigue, mais très fier de ma journée.</p>"
      +"<p>Devant mes parents je me vantai de mes multiples exploits. Je réussis à les convaincre que sans moi aucun résultat sérieux n'aurait été obtenu. Mon père me félicita. Il dit à ma mère que je devenais vraiment un homme. Je me mis au lit.</p>"
      +"<p>Pendant mon sommeil, il m'arriva de me mettre sur mon séant<sup>1</sup>, de hurler des ordres, de distribuer des injures. Ma mère me recouchait avec des gestes tendres, des phrases affectueuses.</p>"
      +"<p>Le matin, je me préparai pour partir à l'école, ma mère m'en empêcha. Elle m'expliqua qu'elle avait besoin de moi pour l'accompagner à la <i>kissaria</i>, le marché des tissus. Il était temps de songer à mes habits de fête. J'applaudis avec enthousiasme.</p>"
      +"<p>— Est-ce que j'aurai une chemise neuve ?<br>— Tu auras une chemise neuve.<br>— Est-ce que je porterai un gilet avec des soutaches ?<br>— Tu porteras un gilet avec des soutaches. […]</p>"
      +"<p>Je me dressai de toute ma taille, je bombai le torse<sup>2</sup> ; j'esquissai même quelques pas d'une danse barbare. Je ne me livrais à de telles excentricités<sup>3</sup> que dans des circonstances exceptionnelles. J'allais même pousser un ou deux hululements quand ma mère me rappela à plus de dignité.</p>"
      +"<p>Fatma Bziouya riait à gorge déployée. Son rire ne me choquait pas.</p>"
      +"<p class=\"fn\"><sup>1</sup> De m'asseoir tout d'un coup. &nbsp; <sup>2</sup> La poitrine. &nbsp; <sup>3</sup> Comportements bizarres.</p>",
    source:"Ahmed Sefrioui, « La Boîte à merveilles » (1954) — support de l'examen régional (Fès-Meknès, 2024)."
  },
  sections:[
    { titre:"I. Étude de texte", points:10, questions:[
      { q:"Recopie et complète le tableau suivant par les informations qui conviennent : Nom de l'auteur — Titre de l'œuvre — Date de publication — Nom du narrateur. (0,25×4)", points:1, lines:3,
        correction:"<b>Ahmed Sefrioui</b> (0,25) · <b>La Boîte à merveilles</b> (0,25) · <b>1954</b> (0,25) · <b>Sidi Mohamed</b> (0,25)." },
      { q:"Pour situer ce texte dans l'œuvre : a) De quelle activité le fqih avait-il chargé ses élèves pour se préparer à la fête de l'Achoura ? (0,5)  b) De quel rôle avait-il chargé le narrateur ? (0,5)", points:1, lines:3,
        correction:"a) <b>Le nettoyage du Msid</b> (accepter toute formulation allant dans ce sens). b) Il a été chargé du rôle de <b>chef des frotteurs</b>." },
      { q:"a) Dans quel état physique le narrateur se trouve-t-il à son retour à la maison ? (0,5)  b) Quelle figure de style emploie-t-il pour mettre en valeur l'intensité de cet état physique ? (0,5)", points:1, lines:3,
        correction:"a) Il était <b>fatigué / épuisé</b> (« mort de fatigue ») (accepter toute formulation allant dans ce sens). b) Il s'agit d'une <b>hyperbole</b>." },
      { q:"« Le petit enfant est épuisé ; il est très content de sa journée. » Relie les deux propositions en employant « bien que ».", points:0.5, lines:2,
        correction:"<b>Bien que</b> le petit enfant <b>soit</b> épuisé, il est très content de sa journée. (ou : Le petit enfant est très content de sa journée bien qu'il soit épuisé.) — On exige le subjonctif après « bien que »." },
      { q:"Recopie et complète le tableau d'après ta compréhension du texte (0,5×3) : ligne 1 — Sentiment : « Fierté » / Raison : … / Geste : « hurle des ordres » ou « distribue des injures » ; ligne 2 — Sentiment : … / Raison : « Achat de nouveaux vêtements » / Geste : « … ».", points:1.5, lines:4,
        correction:"Ligne 1 — Raison de la fierté : <b>participation au nettoyage comme chef des frotteurs</b> (0,5). Ligne 2 — Sentiment : <b>Enthousiasme / Joie</b> (accepter tout synonyme) (0,5) ; Geste : « <b>applaudit</b> » ou « se dresse de toute sa taille » ou « bombe le torse » ou « esquisse une danse barbare » (0,5)." },
      { q:"L'enfant demanda à sa mère : « Est-ce que je porterai un gilet avec des soutaches ? » Refais cette phrase au discours indirect.", points:1, lines:2,
        correction:"L'enfant demanda à sa mère <b>s'il porterait</b> un gilet avec des soutaches. (« Est-ce que » → « si » ; « je porterai » → « il porterait ».)" },
      { q:"a) Relève dans le texte l'équivalent en français du mot marocain « la kissaria ». (0,5)  b) À quel lecteur le narrateur s'adresse-t-il en utilisant cet équivalent ? (0,5)", points:1, lines:3,
        correction:"a) « la kissaria » = <b>le marché des tissus</b>. b) Il s'adresse à un lecteur <b>étranger</b> (non marocain / francophone)." },
      { q:"D'après ta compréhension du texte, quelle est la tonalité (le registre littéraire) qui y domine ?", points:1, lines:2,
        correction:"La tonalité dominante est <b>lyrique</b> (expression des sentiments et des émotions du narrateur)." },
      { q:"Pour exprimer ses sentiments, l'enfant se livre à des comportements que sa mère qualifie d'indignes. Selon toi, a-t-elle raison de le rappeler à l'ordre ? (0,5) Justifie ta réponse par un argument pertinent. (0,5)", points:1, lines:4,
        correction:"On accepte <b>tout jugement personnel</b> (0,5) justifié d'une manière <b>pertinente</b> (0,5)." },
      { q:"Comme le fait le père du narrateur dans le texte, aimes-tu, toi aussi, être félicité(e) et valorisé(e) par tes parents ? (0,5) Justifie ta réponse par un argument personnel. (0,5)", points:1, lines:4,
        correction:"On accepte <b>toute réponse valable</b> (0,5) justifiée de façon <b>adéquate</b> (0,5)." }
    ]},
    { titre:"II. Production écrite", points:10, questions:[
      { q:"Sujet : « Aujourd'hui, certains lycéens et lycéennes se plaignent de plus en plus de l'École et s'y ennuient : programmes trop chargés, activités d'épanouissement et de créativité rares ou absentes, nombre souvent épuisant de contrôles, etc. Ils rêvent, au contraire, d'une école capable de répondre à leurs besoins, à leurs attentes et à leurs espoirs. » Et toi, partages-tu l'avis de ces élèves ? Rédige un texte dans lequel tu justifies ton point de vue en t'appuyant sur des arguments pertinents et des exemples précis.", points:10, redaction:true, lines:18,
        correction:"<b>Barème officiel de la production écrite (10 pts).</b><br><u>Critères d'évaluation du discours (5 pts)</u> : Conformité à la consigne d'écriture : 1 pt · Cohérence de l'argumentation (emploi des connecteurs) : 1 pt · Structure du texte (1 pt) et progression des idées (2 pts) : 3 pts.<br><u>Critères d'évaluation de la langue (5 pts)</u> : Vocabulaire (termes précis et variés) : 1 pt · Syntaxe (phrases correctes) : 1 pt · Ponctuation adéquate : 1 pt · Orthographe d'usage et grammaticale : 1 pt · Conjugaison (emploi des temps) : 1 pt.<br><br><b>Conseils.</b> Prends clairement position dès l'introduction (d'accord / pas d'accord / nuancé). Développe 2 ou 3 arguments, chacun illustré d'un exemple précis, reliés par des connecteurs (d'abord, de plus, en effet, par exemple, enfin). Conclus en résumant ton point de vue. Soigne la langue : c'est la moitié de la note." }
    ]}
  ]
});

/* ---------- Français — Régional Fès-Meknès 2023 (session ordinaire) ---------- */
window.PB_EXAMS.push({
  id:"fr-fesmeknes-2023", subject:"francais", matiere:"Français", coef:4, official:true,
  region:"Fès-Meknès", annee:2023, session:"Ordinaire",
  label:"Régional Fès-Meknès 2023 — officiel",
  durationMin:120, total:20,
  consignes:"Examen régional unifié, 1ère année du baccalauréat, Académie Fès-Meknès (session ordinaire 2023). Durée : 2 h. Lis attentivement le texte, puis traite l'étude de texte et la production écrite. Attribue-toi les points à la fin en te comparant au corrigé officiel.",
  texte:{
    titre:"Texte",
    html:"<p><b>CRÉON</b>, <i>la secoue soudain, hors de lui</i> :</p>"
      +"<p>Mais, bon Dieu ! Essaie de comprendre une minute, toi aussi, petite idiote ! J'ai bien essayé de te comprendre, moi. Il faut pourtant qu'il y en ait qui disent oui. Il faut pourtant qu'il y en ait qui mènent la barque. Cela prend de l'eau de toutes parts, c'est plein de crimes, de bêtise, de misère… et le gouvernail<sup>1</sup> est là qui ballotte<sup>2</sup>. L'équipage ne veut plus rien faire, il ne pense qu'à piller<sup>3</sup> la cale<sup>4</sup> et les officiers sont déjà en train de se construire un petit radeau<sup>5</sup> confortable, rien que pour eux, avec toute la provision d'eau douce pour tirer au moins leurs os de là. Et le mât<sup>6</sup> qui craque, et le vent siffle et les voiles vont se déchirer, et toutes ces brutes vont crever toutes ensemble, parce qu'elles ne pensent qu'à leur peau, à leur précieuse peau et à leurs petites affaires.</p>"
      +"<p>Crois-tu, alors, qu'on a le temps de faire le raffiné<sup>7</sup>, de savoir s'il faut dire « oui » ou « non », de se demander s'il ne faudra pas payer trop cher un jour et si on pourra encore être un homme après ? On prend le bout de bois, on redresse devant la montagne d'eau, on gueule un ordre et on tire dans le tas, sur le premier qui s'avance. Dans le tas ! Cela n'a pas de nom. C'est comme la vague qui vient de s'abattre sur le pont devant vous ; le vent qui vous gifle, et la chose qui tombe dans le groupe n'a pas de nom. C'est peut-être celui qui t'avait donné du feu en souriant la veille. Il n'a pas de nom. Et toi non plus, tu n'as plus de nom, cramponné à la barre. Il n'y a plus que le bateau qui ait un nom et la tempête. Est-ce que tu le comprends, cela ?</p>"
      +"<p class=\"fn\"><sup>1</sup> Appareil pour conduire un bateau. &nbsp; <sup>2</sup> Qui se balance dans tous les sens. &nbsp; <sup>3</sup> Détruire et voler. &nbsp; <sup>4</sup> Partie basse de l'intérieur d'un navire pour mettre les marchandises. &nbsp; <sup>5</sup> Assemblage de pièces de bois utilisé pour le sauvetage en cas de naufrage. &nbsp; <sup>6</sup> Pièce qui porte la voile. &nbsp; <sup>7</sup> S'intéresser trop aux détails.</p>",
    source:"Jean Anouilh, « Antigone » — support de l'examen régional (Fès-Meknès, 2023)."
  },
  sections:[
    { titre:"I. Étude de texte", points:10, questions:[
      { q:"Recopie et complète le tableau suivant par les informations qui conviennent : Nom de l'auteur — Titre de la pièce — Son genre théâtral — Siècle de sa parution. (0,25×4)", points:1, lines:3,
        correction:"<b>Jean Anouilh</b> (0,25) · <b>Antigone</b> (0,25) · <b>tragédie (moderne)</b> (0,25) · <b>20ᵉ siècle</b> (0,25)." },
      { q:"Pour situer cet extrait par rapport à la pièce : a) À quelle nécessité religieuse Antigone obéit-elle pour enterrer le cadavre de son frère ? (0,5)  b) Quelle autre nécessité Créon oppose-t-il à celle d'Antigone ? (0,5)", points:1, lines:3,
        correction:"a) Antigone tient à ce que son frère soit enterré <b>pour que son âme ne soit pas suspendue entre ciel et terre / pour qu'elle retrouve le repos</b> (accepter toute réponse allant dans ce sens). b) Créon oppose le <b>devoir politique de faire respecter la loi / le devoir de gouverner Thèbes</b>." },
      { q:"Quel sentiment Créon éprouve-t-il dans la première didascalie ?", points:1, lines:2,
        correction:"<b>La colère</b> (accepter tout synonyme : la fureur, l'exaspération…)." },
      { q:"Voici en désordre les idées développées par Créon dans sa tirade ; recopie-les selon leur ordre dans le texte : (A) « Pour Créon, seule la cité de Thèbes compte et tout sentiment personnel doit disparaître. » — (B) « Créon fait comprendre à Antigone qu'en situation de crise, il faut quelqu'un qui doit gouverner le pays. » — (C) « Dans une situation de crise, un roi n'a pas le temps de poser des questions ou de réfléchir. »", points:1, lines:4,
        correction:"Ordre correct : <b>B → C → A</b>, c'est-à-dire : 1) « Créon fait comprendre à Antigone qu'en situation de crise, il faut quelqu'un qui doit gouverner le pays » ; 2) « Dans une situation de crise, un roi n'a pas le temps de poser des questions ou de réfléchir » ; 3) « Pour Créon, seule la cité de Thèbes compte et tout sentiment personnel doit disparaître ». <b>NB : en cas d'une seule erreur de classement, aucun point n'est accordé.</b>" },
      { q:"a) Choisis la bonne réponse (0,5). Dans ce texte, pour expliquer à Antigone la situation difficile dans laquelle il se trouve, Créon : (1) lui donne des informations sur un bateau se trouvant au port de Thèbes et menacé de naufrage ; (2) lui donne l'image d'un capitaine qui doit sauver son bateau menacé de naufrage ; (3) lui raconte comment l'équipage a réussi à sauver, sans son capitaine, le bateau menacé de naufrage.  b) Pour mieux expliquer son rôle, emploie-t-il : une comparaison, une métaphore ou une hyperbole ? (0,5)", points:1, lines:3,
        correction:"a) Bonne réponse : <b>(2)</b> — Créon lui donne l'image d'un capitaine qui doit sauver son bateau menacé de naufrage. b) Il emploie une <b>métaphore</b>." },
      { q:"a) Dans le premier paragraphe, Créon affirme qu'il doit protéger le royaume contre les comportements dangereux de certains citoyens de Thèbes ; cite deux exemples de ces comportements dangereux. (0,5×2)  b) Relève dans le même paragraphe un mot dévalorisant par lequel il désigne ces citoyens. (0,5)", points:1.5, lines:4,
        correction:"a) Deux exemples au choix, tirés de la 1ʳᵉ partie de la tirade : « l'équipage ne veut plus rien faire » ; « il ne pense qu'à piller la cale » ; « les officiers se construisent un petit radeau confortable, rien que pour eux » ; « ne pensent qu'à leur peau… et à leurs petites affaires ». (0,5×2). b) Le mot dévalorisant : « <b>brutes</b> » (0,5)." },
      { q:"« Crois-tu qu'on a le temps de faire le raffiné ? » demanda Créon à Antigone. Refais cette phrase au discours indirect en effectuant les transformations nécessaires.", points:1, lines:2,
        correction:"Créon demanda à Antigone <b>si</b> (0,25) <b>elle</b> (0,25) <b>croyait</b> (0,25) qu'on <b>avait</b> (0,25) le temps de faire le raffiné." },
      { q:"D'après sa tirade, Créon se présente-t-il comme un chef d'État : souple, flexible ou exigeant ?", points:0.5, lines:2,
        correction:"Créon se présente comme un chef d'État <b>exigeant</b>." },
      { q:"Créon a-t-il raison de vouloir sacrifier même les personnes qui lui sont proches pour faire respecter la loi à Thèbes ? (0,5) Justifie ta réponse par un argument pertinent. (0,5)", points:1, lines:4,
        correction:"On accepte <b>tout point de vue</b> (0,5) justifié d'une manière <b>pertinente</b> (0,5)." },
      { q:"À ton avis, faut-il placer nos intérêts personnels avant l'intérêt général (l'intérêt de la société) ? (0,5) Justifie ta réponse par un argument personnel. (0,5)", points:1, lines:4,
        correction:"On accepte <b>tout point de vue personnel</b> (0,5) justifié de façon <b>adéquate</b> (0,5)." }
    ]},
    { titre:"II. Production écrite", points:10, questions:[
      { q:"Sujet : « Dans La Boîte à merveilles, Ahmed Sefrioui évoque plusieurs métiers artisanaux (tisserand, babouchier, fabricant de charrue, …) ; aujourd'hui, d'autres métiers modernes ont vu le jour (médecin, informaticien, responsable de marketing, youtubeur, etc.). » Et toi, quel métier préférerais-tu exercer à l'avenir ? Rédige un texte dans lequel tu développes ton point de vue à l'aide d'arguments pertinents et d'exemples précis.", points:10, redaction:true, lines:18,
        correction:"<b>Barème officiel de la production écrite (10 pts).</b><br>Respect de la consigne : 1 pt · Structure du texte (introduction, développement, conclusion) : 1 pt · Cohérence et pertinence de l'argumentation : qualité des arguments (2 pts) + connecteurs logiques (1 pt) : 3 pts · Correction de la langue (grammaire, conjugaison, orthographe, lexique, ponctuation…) : 5 pts.<br><br><b>Conseils.</b> Annonce clairement le métier choisi dès l'introduction. Donne 2 ou 3 raisons de ce choix, chacune avec un exemple concret (goûts, utilité sociale, débouchés…), reliées par des connecteurs. Termine par une conclusion. La moitié de la note porte sur la langue : relis-toi." }
    ]}
  ]
});

/* ---------- Français — Régional Fès-Meknès 2022 (session normale) ---------- */
window.PB_EXAMS.push({
  id:"fr-fesmeknes-2022", subject:"francais", matiere:"Français", coef:4, official:true,
  region:"Fès-Meknès", annee:2022, session:"Ordinaire",
  label:"Régional Fès-Meknès 2022 — officiel",
  durationMin:120, total:20,
  consignes:"Examen régional unifié, 1ère année du baccalauréat, Académie Fès-Meknès (session ordinaire 2022). Durée : 2 h. Lis attentivement le texte, puis traite l'étude de texte et la production écrite.",
  texte:{
    titre:"Texte",
    html:"<p><i>Les gardes sont sortis, précédés par le petit page. Créon et Antigone sont seuls l'un en face de l'autre.</i></p>"
      +"<p>- <b>CRÉON</b> : Avais-tu parlé de ton projet à quelqu'un ?<br>- <b>ANTIGONE</b> : Non.<br>- <b>CRÉON</b> : As-tu rencontré quelqu'un sur ta route ?<br>- <b>ANTIGONE</b> : Non, personne.<br>- <b>CRÉON</b> : Tu es bien sûre ?<br>- <b>ANTIGONE</b> : Oui.</p>"
      +"<p>- <b>CRÉON</b> : Alors, écoute : tu vas rentrer chez toi, te coucher, dire que tu es malade, que tu n'es pas sortie depuis hier. Ta nourrice dira comme toi. Je ferai disparaître ces trois hommes.<br>- <b>ANTIGONE</b> : Pourquoi ? Puisque vous savez bien que je recommencerai.</p>"
      +"<p style=\"text-align:center\"><i>Un silence. Ils se regardent.</i></p>"
      +"<p>- <b>CRÉON</b> : Pourquoi as-tu tenté d'enterrer ton frère ?<br>- <b>ANTIGONE</b> : Je le devais.<br>- <b>CRÉON</b> : Je l'avais interdit.</p>"
      +"<p>- <b>ANTIGONE</b>, <i>doucement</i> : Je le devais tout de même. Ceux qu'on n'enterre pas errent éternellement sans jamais trouver de repos. Si mon frère vivant était rentré harassé<sup>1</sup> d'une longue chasse, je lui aurais enlevé ses chaussures, je lui aurais fait à manger, je lui aurais préparé son lit... Polynice aujourd'hui a achevé sa chasse. Il rentre à la maison où mon père et ma mère, et Étéocle aussi, l'attendent. Il a droit au repos.</p>"
      +"<p>- <b>CRÉON</b> : C'était un révolté et un traître, tu le savais.<br>- <b>ANTIGONE</b> : C'était mon frère.<br>- <b>CRÉON</b> : Tu avais entendu proclamer l'édit aux carrefours, tu avais lu l'affiche sur tous les murs de la ville ?<br>- <b>ANTIGONE</b> : Oui.<br>- <b>CRÉON</b> : Tu savais le sort qui était promis à celui, quel qu'il soit, qui oserait lui rendre les honneurs funèbres ?<br>- <b>ANTIGONE</b> : Oui, je le savais.</p>"
      +"<p>- <b>CRÉON</b> : Tu as peut-être cru que d'être la fille d'Œdipe, la fille de l'orgueil d'Œdipe, c'était assez pour être au-dessus de la loi.<br>- <b>ANTIGONE</b> : Non. Je n'ai pas cru cela.</p>"
      +"<p class=\"fn\"><sup>1</sup> Très fatigué.</p>",
    source:"Jean Anouilh, « Antigone » — support de l'examen régional (Fès-Meknès, 2022)."
  },
  sections:[
    { titre:"I. Étude de texte", points:10, questions:[
      { q:"Recopiez puis complétez la présentation suivante par les informations qui conviennent (0,25×4) : « Jean Anouilh est un dramaturge français qui a vécu au (…) siècle. Sa pièce intitulée (…) est une mise en scène la confrontation tragique de deux nécessités : celle d'(…) son frère pour Antigone, et celle pour (…), de faire respecter la loi. »", points:1, lines:4,
        correction:"<b>XXᵉ (20ᵉ)</b> siècle (0,25) · <b>Antigone</b> (0,25) · d'<b>enterrer</b> (0,25) · pour <b>Créon</b> (0,25)." },
      { q:"a) Cette scène se situe-t-elle après que : – Antigone a été surprise par la nourrice ? – Hémon a été surpris par Antigone ? – Antigone a été surprise par les gardes ? (Recopiez la bonne réponse.) (0,5)  b) Combien de fois Antigone a-t-elle tenté de couvrir le cadavre de Polynice ? (0,5)", points:1, lines:3,
        correction:"a) Cette scène se situe après qu'<b>Antigone a été surprise par les gardes</b>. (0,5)  b) Antigone l'a tenté <b>deux fois</b>. (0,5)" },
      { q:"a) Relevez la didascalie (l'indication scénique) montrant qu'il s'agit d'une nouvelle scène. (0,5)  b) Par ses premières questions adressées à Antigone, Créon est-il : inquiet ? hésitant ? furieux ? (0,5)", points:1, lines:3,
        correction:"a) La didascalie est : « <b>Les gardes sont sortis,</b> (0,25) <b>précédés par le petit page.</b> » (0,25)  b) Créon est <b>inquiet</b>. (0,5)" },
      { q:"Répondez par « vrai » ou « faux » en justifiant votre réponse à partir du texte (0,25×4). Pour chaque affirmation du tableau : a) Antigone ne veut pas que le cadavre de son frère soit dévoré par les bêtes. b) Créon rappelle à sa nièce la peine à laquelle elle s'expose en accomplissant un tel acte.", points:1, lines:4,
        qHtml:"<table><thead><tr><th>Affirmation</th><th>Vrai</th><th>Faux</th><th>Justification du texte</th></tr></thead><tbody><tr><td>a) Antigone ne veut pas que le cadavre de son frère soit dévoré par les bêtes.</td><td><input class=\"tcell\" data-cell=\"a) Vrai\" aria-label=\"a) Vrai\"></td><td><input class=\"tcell\" data-cell=\"a) Faux\" aria-label=\"a) Faux\"></td><td><textarea class=\"tcell\" data-cell=\"a) Justification\" rows=\"2\" aria-label=\"a) Justification\"></textarea></td></tr><tr><td>b) Créon rappelle à sa nièce la peine à laquelle elle s'expose en accomplissant un tel acte.</td><td><input class=\"tcell\" data-cell=\"b) Vrai\" aria-label=\"b) Vrai\"></td><td><input class=\"tcell\" data-cell=\"b) Faux\" aria-label=\"b) Faux\"></td><td><textarea class=\"tcell\" data-cell=\"b) Justification\" rows=\"2\" aria-label=\"b) Justification\"></textarea></td></tr></tbody></table>",
        correction:"a) <b>Faux</b>. (0,25) Justification : « Ceux qu'on n'enterre pas errent éternellement sans jamais trouver de repos. » ou « Il a droit au repos. » (0,25)<br>b) <b>Vrai</b>. (0,25) Justification : « Tu avais entendu proclamer l'édit aux carrefours. » ou « tu avais lu l'affiche sur tous les murs de la ville ? » ou « Tu savais le sort qui était promis à celui, quel qu'il soit, qui oserait lui rendre les honneurs funèbres ? » (0,25)" },
      { q:"Que veut savoir Créon juste après la 2ᵉ didascalie ? Répondez au discours indirect à cette question en commençant par : « Créon voulait savoir … »", points:1.5, lines:2,
        correction:"Créon voulait savoir <b>pourquoi</b> (0,25) <b>elle/Antigone</b> (0,25) <b>avait tenté</b> (0,25) <b>d'enterrer son</b> (0,25) <b>frère</b> (0,25). <i>(NB : + 0,5 pour la bonne réponse de sens.)</i>" },
      { q:"La réplique d'Antigone : « Je le devais » et celle de Créon : « Je l'avais interdit » illustrent bien la confrontation de deux nécessités principales ; précisez lesquelles. (0,5×2)", points:1, lines:3,
        correction:"La 1ʳᵉ nécessité : le <b>devoir fraternel, familial / religieux</b>, etc. (0,5)  La 2ᵉ nécessité : le <b>devoir politique / la raison d'État / le respect de la loi</b>, etc. (0,5) <i>(Acceptez toute autre formulation allant dans ce sens.)</i>" },
      { q:"Dans l'énoncé de sa tirade allant de « Si… » à « …son lit », la figure de style employée par Antigone pour prouver à Créon sa fidélité inconditionnelle et totale à la mémoire de son frère est-elle : – une métaphore ? – une énumération ? – une personnification ? (0,5)", points:0.5, lines:2,
        correction:"La figure de style employée dans cet énoncé est : l'<b>énumération</b>. (0,5)" },
      { q:"a) Les courtes répliques d'Antigone sont-elles : exclamatives, impératives ou déclaratives ? (0,5)  b) Quel trait de caractère d'Antigone ce type de phrase met-il en valeur ? (0,5)", points:1, lines:3,
        correction:"a) Les courtes répliques d'Antigone sont : <b>déclaratives</b>. (0,5)  b) Ce type de phrases exprime : sa <b>détermination / son intransigeance / sa ténacité / son obstination</b>, etc. (0,5) <i>(Accepter tout synonyme ou formulation du même sens.)</i>" },
      { q:"Dans ce face-à-face entre les deux personnages, aimeriez-vous être à la place de Créon ou plutôt à la place d'Antigone ? (0,5) Justifiez votre réponse par un argument pertinent. (0,5)", points:1, lines:4,
        correction:"<b>Accepter tout point de vue</b> (0,5) justifié de façon <b>pertinente</b> (0,5)." },
      { q:"Pour mieux convaincre quelqu'un, faut-il, selon vous, parler peu ou parler beaucoup ? (0,5) Justifiez votre opinion par un argument personnel. (0,5)", points:1, lines:4,
        correction:"<b>Accepter tout point de vue</b> (0,5) justifié de façon <b>adéquate</b> (0,5)." }
    ]},
    { titre:"II. Production écrite", points:10, questions:[
      { q:"Sujet : « Lors de leur célèbre face à face, Antigone défend une conception du bonheur tout à fait différente de celle que lui propose son oncle Créon. » Et vous, à votre avis, qu'est-ce qui pourrait vous rendre heureux ou heureuse ? Rédigez un texte dans lequel vous développerez votre point de vue à l'aide d'arguments pertinents et d'exemples appropriés.", points:10, redaction:true, lines:18,
        correction:"<b>Barème officiel de la production écrite (10 pts).</b><br>A – Respect de la consigne (ne traiter que ce qui est demandé dans le sujet) : 1 pt · B – Organisation et cohérence de l'argumentation : 2 pts · C – Qualité et pertinence des arguments : 2 pts · D – Correction de la langue (construction des phrases, orthographe, vocabulaire approprié…) : 5 pts.<br><br><b>Conseils.</b> Prends clairement position dès l'introduction (ce qui pourrait te rendre heureux). Développe 2 ou 3 arguments, chacun illustré d'un exemple précis, reliés par des connecteurs (d'abord, de plus, en effet, par exemple, enfin). Conclus en résumant ton point de vue. La moitié de la note porte sur la langue : relis-toi." }
    ]}
  ]
});

/* ---------- العربية — الامتحان الجهوي فاس-مكناس 2022 (الدورة العادية) ---------- */
window.PB_EXAMS.push({
  id:"ar-fesmeknes-2022", subject:"arabe", matiere:"اللغة العربية", coef:2, official:true,
  region:"Fès-Meknès", annee:2022, session:"Ordinaire", lang:"ar",
  label:"الجهوي فاس-مكناس 2022 — رسمي",
  durationMin:120, total:20,
  consignes:"الامتحان الجهوي الموحّد للباكالوريا، السنة الأولى من سلك البكالوريا، الأكاديمية الجهوية فاس-مكناس (الدورة العادية 2022). مدة الإنجاز: ساعتان. اقرأ النص قراءة متأنية، ثم أجب عن أسئلة المجالات الآتية.",
  texte:{
    titre:"نص الانطلاق — الشباب والتنمية",
    html:"<p>إن التحدّيات العالمية التي تواجه جهود التنمية كثيرة، وبشكل خاص تلك التي تواجه الأطفال والشباب، فقد تم إحراز تقدّم كبير، على مدى العقود القليلة الماضية، في مجالات الحدّ من الفقر وحقوق الإنسان والتنمية. إلا أنّه لا تزال هناك تحدّيات عميقة، نتجت عن السعي لتحقيق الأهداف التنموية، التي أدّت إلى تحقيق تقدّم ملموس، ولكنه غير كافٍ. فالعديد من الشباب في جميع أنحاء العالم لا يزالون عُرضةً لأشكالٍ مُختلفة من التمييز، ويُعانون من مستويات مرتفعة من الفقر، وكذلك محدودية الوصول إلى خدمات الرعاية الصحّية الأساسية أو التعليم الجيّد، وهو بمُجمله يُؤثّر سَلبا في فرص العمل المتاحة لهم. يوجد في العالم اليوم أكبر جيل من الشباب من حيث العدد على مرّ التاريخ، حيث يبلغ عددهم 1.8 مليار شاب تتراوح أعمارهم بين عشرة وأربعة وعشرين عاما، ويمثّلون حوالي 24% من سكان العالم. وفي العالم العربي وحده، حيث يمثّل الشباب الفئة السكانية الأسرع نموّا، يتجاوز الذين هم تحت سن ثلاثين عاما نسبة 60% من عدد السكان.</p>"
      +"<p>واعترافا بإمكانيات الشباب في قدرتهم على تنفيذ «برنامج التنمية المستدامة»، وضعت الأمم المتحدة عام 2018 استراتيجية للشباب بعنوان «شباب 2030»، تهدف هذه الاستراتيجية الطموحة إلى توسيع نطاق الإجراءات الوطنية والإقليمية والعالمية، من أجل مساعدة الشباب على تلبية احتياجاتهم، وضمان حقوقهم وتسخير طاقاتهم ومواهبهم وقدراتهم لتحقيق الأهداف المنشودة التي تتمثّل في الوصول إلى عالم أكثر ازدهارا وتنمية بحلول عام 2030. وتؤكّد خطة أهداف التنمية المستدامة 2030 على دور الشباب في إحداث التغيير وتحقيق التنمية الشاملة، خاصة إذا ما تمّ تمكينهم من التعليم المناسب والوظائف وفرص تنظيم المشاريع.</p>"
      +"<p>إن تحقيق أهداف التنمية المستدامة غاية منشودة لكل الدول، لأنها تشكّل تحدّيا كبيرا لجهودها المبذولة، لذلك يجب أن يتجاوز دور الشباب مجرّد الوقوف موقف المتفرّج وانتظار نتائج برنامج «شباب 2030»، إلى المشاركة بفعالية في تنفيذ مشاريع هذا البرنامج. إن الشباب اليوم قادر بالفعل على التفكير والإبداع وصنع التغيير، إذ يُمكنهم المساهمة في بناء مشروع التنمية الشاملة الذي نحلم به، من خلال فسح المجال أمامهم لإبراز طاقاتهم وإبداعاتهم.</p>",
    source:"تقرير مركز الشباب العربي: «الشباب العربي والاستدامة»، الإمارات العربية المتحدة، 2019، ص 16 وما بعدها (بتصرّف)."
  },
  sections:[
    { titre:"أولا: مجال درس النصوص", points:10, questions:[
      { q:"حدّد علاقة مضمون الفقرة الثالثة من النص بالعنوان. (1ن)", points:1, lines:3,
        correction:"علاقة مضمون الفقرة الثالثة بعنوان النص: علاقة <b>توضيح / تفسير</b>… <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"حدّد القضية المحورية التي يعالجها النص. (1ن)", points:1, lines:3,
        correction:"القضية المحورية التي يعالجها النص: <b>دور الشباب في تحقيق التنمية</b>… <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"اشرح، في حدود ثلاثة أسطر، القولة الآتية الواردة في النص: «… فالعديد من الشباب في جميع أنحاء العالم لا يزالون عُرضةً لأشكالٍ مختلفة من التمييز ويُعانون من مستويات مرتفعة من الفقر». (1ن)", points:1, lines:4,
        correction:"<i>يُقبل كل جواب بيّن فيه المترشّح فهمه للقولة مع الالتزام بالحجم المطلوب.</i> (الفكرة: معاناة فئة واسعة من الشباب عبر العالم من مختلف أشكال التمييز ومن الفقر، مما يحدّ من فرصهم.)" },
      { q:"استخرج من النص عبارتين دالّتين على حقل الشباب، وعبارتين دالّتين على حقل التنمية، ثم حدّد العلاقة بينهما مستعينا بالجدول الآتي. (1.5ن)", points:1.5, lines:4,
        qHtml:"<table><thead><tr><th>عبارتان دالّتان على الشباب (0.5ن)</th><th>عبارتان دالّتان على التنمية (0.5ن)</th><th>العلاقة بين الحقلين (0.5ن)</th></tr></thead><tbody><tr><td><textarea class=\"tcell\" data-cell=\"عبارتان على الشباب\" rows=\"2\" aria-label=\"عبارتان على الشباب\"></textarea></td><td><textarea class=\"tcell\" data-cell=\"عبارتان على التنمية\" rows=\"2\" aria-label=\"عبارتان على التنمية\"></textarea></td><td><textarea class=\"tcell\" data-cell=\"العلاقة بين الحقلين\" rows=\"2\" aria-label=\"العلاقة بين الحقلين\"></textarea></td></tr></tbody></table>",
        correction:"<b>عبارتان دالّتان على الشباب</b> (0.5): «يوجد في العالم اليوم أكبر جيل من الشباب»؛ «من أجل مساعدة الشباب على تلبية احتياجاتهم».<br><b>عبارتان دالّتان على التنمية</b> (0.5): «تنفيذ برنامج التنمية المستدامة»؛ «الوصول إلى عالم أكثر ازدهارا وتنمية».<br><b>العلاقة بين الحقلين</b> (0.5): علاقة <b>سببية / تكامل</b>… <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"حدّد، انطلاقا من النص، هدفين أساسيين لبرنامج «شباب 2030». (1ن)", points:1, lines:3,
        correction:"هدفان أساسيان لبرنامج «شباب 2030»:<br>• توسيع نطاق الإجراءات الوطنية والإقليمية والعالمية من أجل مساعدة الشباب على تلبية احتياجاتهم (0.5)؛<br>• ضمان حقوقهم وتسخير طاقاتهم ومواهبهم وقدراتهم لتحقيق الأهداف المنشودة (0.5). <i>(يُحدّد المترشّح هدفين اثنين.)</i>" },
      { q:"تهيمن على النص لغة تقريرية مباشرة، مَثّل لها بمثالين من النص وأبرز وظيفتها. (1.5ن) — المثال الأول: … — المثال الثاني: … — الوظيفة: …", points:1.5, lines:4,
        correction:"<b>المثال الأول</b>: «إن التحدّيات العالمية التي تواجه جهود التنمية كثيرة»؛<br><b>المثال الثاني</b>: «يبلغ عددهم 1.8 مليار شاب تتراوح أعمارهم بين 10 و24 عاما»؛<br><b>الوظيفة</b>: <b>تفسيرية / إقناعية</b>." },
      { q:"اكتب فقرة مركّزة تلخّص فيها قضايا النص، مبديا رأيك الشخصي في دور الشباب في تحقيق التنمية. (3ن)", points:3, redaction:true, lines:10,
        correction:"<b>سلّم التنقيط (3ن).</b> يُراعى في كتابة الفقرة المركّزة وإبداء الرأي الشخصي:<br>• تلخيص قضايا النص؛<br>• حضور الرأي الشخصي حول دور الشباب في التنمية؛<br>• سلامة اللغة والالتزام بالحجم المطلوب." }
    ]},
    { titre:"ثانيا: مكوّن علوم اللغة", points:4, questions:[
      { q:"استخرج من النص جملتين: الأولى لمُمَيَّز ملفوظ (تمييز مفرد)، والثانية لمُمَيَّز ملحوظ (تمييز جملة)، مع ملء الجدول بما يناسب. (2ن)", points:2, lines:3,
        qHtml:"<table><thead><tr><th>الجملة</th><th>التمييز</th><th>نوعه</th><th>حكمه الإعرابي</th></tr></thead><tbody><tr><td><textarea class=\"tcell\" data-cell=\"الجملة 1\" rows=\"2\" aria-label=\"الجملة 1\"></textarea></td><td><input class=\"tcell\" data-cell=\"التمييز 1\" aria-label=\"التمييز 1\"></td><td><input class=\"tcell\" data-cell=\"نوعه 1\" aria-label=\"نوعه 1\"></td><td><input class=\"tcell\" data-cell=\"الإعراب 1\" aria-label=\"الإعراب 1\"></td></tr><tr><td><textarea class=\"tcell\" data-cell=\"الجملة 2\" rows=\"2\" aria-label=\"الجملة 2\"></textarea></td><td><input class=\"tcell\" data-cell=\"التمييز 2\" aria-label=\"التمييز 2\"></td><td><input class=\"tcell\" data-cell=\"نوعه 2\" aria-label=\"نوعه 2\"></td><td><input class=\"tcell\" data-cell=\"الإعراب 2\" aria-label=\"الإعراب 2\"></td></tr></tbody></table>",
        correction:"<b>1</b> — الجملة: «تتراوح أعمارهم بين عشرة وأربعة وعشرين عاما» (أو «هم تحت سن ثلاثين عاما») · التمييز: <b>عاما</b> · نوعه: <b>تمييز مفرد (ذات/عدد)</b> · حكمه الإعرابي: <b>النصب</b>.<br><b>2</b> — الجملة: «الوصول إلى عالم أكثر ازدهارا وتنمية» · التمييز: <b>ازدهارا / تنمية</b> · نوعه: <b>تمييز جملة (نسبة)</b> · حكمه الإعرابي: <b>النصب</b>." },
      { q:"ركّب جملتين مفيدتين، من إنتاجك الشخصي، تتضمّن الأولى نهيا يفيد النصح والإرشاد، والثانية استفهاما بأداة تفيد التصوّر. (2ن) — الجملة الأولى: … — الجملة الثانية: …", points:2, lines:3,
        correction:"<i>يُنتج المترشّح جملتين مفيدتين تتضمّن كلٌّ منهما الظاهرة اللغوية المطلوبة:</i><br>• الأولى: <b>نهي يفيد النصح والإرشاد</b> (مثال: لا تُهملْ دراستَك)؛<br>• الثانية: <b>استفهام بأداة تفيد التصوّر</b> (مثال: أمجتهدٌ أنت أم كسولٌ؟)." }
    ]},
    { titre:"ثالثا: مجال التعبير والإنشاء", points:6, questions:[
      { q:"«… تمثّل فئةُ الشباب مستقبلَ التنمية في المغرب، لِما تتوفّر عليه من طاقات ومواهب …». انطلق من هذه الفكرة، واكتب موضوعا منسجما تستثمر فيه مكتسباتك في مهارة «توسيع فكرة»، وذلك في ما لا يقل عن عشرة أسطر، مراعيا: الالتزام بالمطلوب وتوظيف تقنيات المهارة؛ تسلسل الأفكار وترابطها؛ سلامة اللغة ووضع علامات الترقيم المناسبة.", points:6, redaction:true, lines:18,
        correction:"<b>سلّم التنقيط (6ن).</b> يُراعى في تقويم الإنجاز:<br>• الالتزام بالمطلوب وتوظيف تقنيات مهارة «توسيع فكرة»: 3ن؛<br>• تسلسل الأفكار وترابطها: 1ن؛<br>• سلامة اللغة ووضع علامات الترقيم المناسبة: 1.5ن؛<br>• الالتزام بالحجم المطلوب: 0.5ن.<br><br><b>نصيحة.</b> وسّع الفكرة بالشرح والتمثيل والتعليل والمقارنة، مع مقدمة وعرض وخاتمة." }
    ]}
  ]
});

/* ---------- التاريخ والجغرافيا — الجهوي فاس-مكناس 2024 (الدورة العادية) ---------- */
window.PB_EXAMS.push({
  id:"hg-fesmeknes-2024", subject:"hg", matiere:"التاريخ والجغرافيا", coef:2, official:true,
  region:"Fès-Meknès", annee:2024, session:"Ordinaire", lang:"ar",
  label:"الجهوي فاس-مكناس 2024 — رسمي",
  durationMin:120, total:20,
  consignes:"الامتحان الجهوي الموحّد لنيل شهادة البكالوريا، السنة الأولى من سلك البكالوريا، الأكاديمية الجهوية فاس-مكناس (الدورة العادية 2024). مادة: التاريخ والجغرافيا. مدة الإنجاز: ساعتان. أولا: مادة التاريخ (الاشتغال بالوثائق) 10 نقط. ثانيا: مادة الجغرافيا (الموضوع المقالي) 10 نقط.",
  texte:{
    titre:"الوثائق (مادة التاريخ)",
    html:"<div class=\"docn\">الوثيقة رقم 1:</div>"
      +"<p>كانت إيطاليا قد انضمّت إلى الحلفاء في الحرب على أمل تحقيق المغانم الاستعمارية التي تصبو إليها، إلا أن الحلفاء عاملوها كشريك صغير… وبالإضافة إلى الإحساس بالظلم للمعاملة غير المتكافئة من جانب الحلفاء، فإن الحرب كانت قد خلفت تركة مثقلة. فقد ارتفعت أسعار المواد الغذائية، وازدادت الضرائب، وندر الوقود، واضمحلت التجارة في الداخل والخارج. وفي الوقت نفسه ساد جو من عدم الاستقرار في الحكم، إذ تعاقبت على إيطاليا خمس وزارات في أربع سنوات، لم تكن لأي منها سياسة مرسومة في الداخل أو الخارج. وتفشت البطالة، وفشل الجنود العائدون في العثور على عمل لهم، وتراكمت ديون الحكومة. وفي هذا الجو العاصف… كثرت المظاهرات التي تطوف الشوارع، وحدثت بإيطاليا عدة حركات ثورية خطيرة… وفي عام 1920م تقدم عمال المناجم في «وادي البو» بمطالب رفضها أرباب العمل، فقاموا بالإضراب، وأجاب أرباب العمل بإغلاق المصانع، فاحتل أكثر من نصف مليون عامل من العمال الاشتراكيين مئات المصانع في المدن، بقصد إدارتها بأنفسهم ولحسابهم… وارتكب الاشتراكيون الديمقراطيون (الشيوعيون) خطأهم عندما رفضوا الاستيلاء على الحكم بالقوة… وفي ذلك الحين تقدم اليمين المتطرف ممثلا في موسوليني للاستيلاء على الحكم.</p>"
      +"<p class=\"fn\">المصدر: عبد العظيم رمضان، تاريخ أوروبا والعالم الحديث من ظهور البورجوازية إلى الحرب الباردة، الجزء الثالث، الهيئة المصرية العامة للكتاب، ص ص: 67-69 (بتصرّف).</p>"
      +"<div class=\"docn\">الوثيقة رقم 2:</div>"
      +"<p>في عام 1929م وقعت أزمة اقتصادية عالمية حادة، وقد بدأت الأزمة في الولايات المتحدة الأمريكية، حيث حدث انهيار اقتصادي كبير في بورصة «وول ستريت»… وامتدت الأزمة بشكل سريع إلى أوربا، ثم أخذت تتفاقم بصورة فجائية وصارت الكارثة الاقتصادية تنتقل من بلد إلى بلد، وذلك بسبب الترابط الاقتصادي والمالي بين دول العالم، والدور الذي كانت تلعبه الولايات المتحدة الأمريكية في الاقتصاد العالمي؛ حيث كانت تحتل المرتبة الأولى في الإنتاج الصناعي العالمي، إذ كانت تمثل 45,5% من مجمل الإنتاج الدولي في الفترة 1925-1929.</p>"
      +"<p>وبما أن ألمانيا كانت تؤلف ثاني أكبر دولة رأسمالية في العالم، فإن تأثرها بالأزمة الاقتصادية كان مفجعا، ففي سنوات الأزمة أشهرت 68 مؤسسة رأسمالية إفلاسها، واضطرت المصارف الكبرى إلى طلب الشرطة لتحميها من جماهير المودعين الذين بدأوا يخشون مصيرهم ودائعهم… ولتوضيح أبعاد المأساة أكثر، لا بد من الإشارة إلى أعداد العاطلين عن العمل في البلاد، فقد ارتفعت نسبة العاطلين في عام 1932 إلى أكثر من 5 ملايين عاطل، أي بنسبة 44% من مجموع الألمان القادرين على العمل. وكانت حكومة فايمار في هذه الفترة تواجه سلسلة من الهجمات العنيفة… وأدرك هتلر أن فرصته قد حانت بأسرع مما يتخيل، فقدم هتلر لملايين الشعب في عاصفة دعائية ما بدا لهم في هذا الجو من الشقاء الذي يحيونه شيئا من الأمل.</p>"
      +"<p class=\"fn\">المصدر: محمود محمد صبيح، «الأزمة الاقتصادية العالمية وتأثيرها على ألمانيا (1929-1933م)»، مجلة التاريخ والمستقبل، المجلد 34، عدد 68، يوليو 2020م، ص ص: 182-192 (بتصرّف).</p>"
      +"<div class=\"docn\">الوثيقة رقم 3: المساهمة الفلاحية للمغرب خلال الحرب العالمية الثانية.</div>"
      +"<table><thead><tr><th>المنتجات الفلاحية</th><th>الإنتاج الكلي (طن)</th><th>المساهمة (طن)</th><th>نسبة المساهمة</th></tr></thead><tbody>"
      +"<tr><td>البواكر</td><td>1.573.540</td><td>354.000</td><td>22,50 %</td></tr>"
      +"<tr><td>الخضر الجافة</td><td>582.901</td><td>384.740</td><td>66 %</td></tr>"
      +"<tr><td>الحوامض</td><td>927.720</td><td>150.000</td><td>16,16 %</td></tr>"
      +"<tr><td>الصوف</td><td>48.839</td><td>20.000</td><td>41 %</td></tr>"
      +"<tr><td>اللحم المجمد</td><td>29.714</td><td>21.518</td><td>72,40 %</td></tr>"
      +"<tr><td>رؤوس الأغنام (بالرأس)</td><td>300.296</td><td>88.110</td><td>29,34 %</td></tr>"
      +"</tbody></table>"
      +"<p class=\"fn\">المصدر: حبيبة التركاوي وحسن ادجوز، «المغرب في الاستراتيجية الاقتصادية الفرنسية خلال الحرب العالمية الثانية»، مجلة الدراسات الاستراتيجية والعسكرية، العدد 12، الطبعة الأولى، المركز العربي الديمقراطي، برلين، سبتمبر 2021م، ص: 163 (بتصرّف).</p>"
      +"<div class=\"docn\">الوثيقة رقم 4:</div>"
      +"<p>اتجهت الصناعة إلى خدمة حاجيات الميتروبول بتصدير المواد المعدنية على شكل مواد خام، ولم تكن السياسة الاستعمارية ترمي إلى القيام بتصنيع يوفر إمكانيات واسعة لتشغيل اليد العاملة المغربية… فلقد كرّس الاستعمار كل جهوده لإرساء صناعة تمكنه من نهب خيراتنا وربط اقتصادنا بالسوق الرأسمالية العالمية. ولقد شهدت التجارة الخارجية المغربية تطورا كبيرا بعد توقيع معاهدة الحماية سنة 1912 نتيجة تدفق المهاجرين الأوربيين، وتجهيز الموانئ والطرق والسكك الحديدية تجهيزا حديثا… إلا أن المغرب ظل يلعب دور المستهلك للبضائع والمنتجات الفرنسية، كما كان يزودها بحاجياتها المختلفة.</p>"
      +"<p>وعرف المغرب في بداية الثلاثينيات تطور الهجرة الداخلية نحو المدن… وانتشرت الأحياء القصديرية في الدار البيضاء، والرباط، والقنيطرة… وقد عمّ الفقر والبؤس داخل هذه الأحياء بعد أن تدهورت القوة الشرائية للمواطنين، كما كانت تحفل بالأوبئة والأمراض المختلفة، وساهمت هذه العوامل في بروز ظواهر اجتماعية ومهن وضيعة…</p>"
      +"<p class=\"fn\">المصدر: حمادي اشبهان، «انعكاسات الأزمة الاقتصادية 1929م على المغرب»، مجلة أبحاث، مركز الدراسات والأبحاث في العلوم الاجتماعية، المغرب، ع 27، ص ص: 48-49 (بتصرّف).</p>"
  },
  sections:[
    { titre:"أولا: مادة التاريخ (الاشتغال بالوثائق)", points:10, questions:[
      { q:"ضع (ي) الوثائق في سياقها التاريخي: الزمن – المكان – الموضوع. (1ن)", points:1, lines:4,
        correction:"<b>السياق التاريخي للوثائق الأربع</b> (تقبل الصبغتين المفككة والمركبة):<br>• <b>الزمن</b>: من 1912 إلى 1945م، أو النصف الأول من القرن 20م.<br>• <b>المكان</b>: الولايات المتحدة الأمريكية – أوربا – المغرب.<br>• <b>الموضوع</b>: تدهور الأوضاع بإيطاليا ونتائجها السياسية – أزمة 1929م وانعكاساتها على ألمانيا – الاستغلال الاستعماري للمغرب وآثاره على المغاربة." },
      { q:"اشرح (ي) المصطلحين/المفهومين التاريخيين التاليين: حكومة فايمار؛ معاهدة فاس. (2ن)", points:2, lines:5,
        correction:"<b>حكومة فايمار</b> (1ن): أول حكومة قامت بألمانيا فور انتهاء الحرب العالمية الأولى، والتي تم فرضها على الألمان من طرف الدول المنتصرة، وتُنسب إلى مدينة فايمار شرق مدينة إرفورت.<br><b>معاهدة فاس</b> (1ن): معاهدة وُقّعت بين سفير فرنسا رينو والسلطان المغربي المولى عبد الحفيظ بتاريخ 30 مارس 1912، وتم بموجبها إقرار نظام استعماري غير مباشر بالمغرب يقوم على أساس الاحتفاظ بنظام الحكم المحلي وإلى جانبه نظام استعماري." },
      { q:"استخرج (ي) من الوثائق المعطيات التاريخية التالية (3ن): أ) من الوثيقة 1: مظاهر تدهور الأوضاع في إيطاليا بعد الحرب العالمية الأولى، ودورها في وصول موسوليني إلى الحكم. ب) من الوثيقة 2: عوامل انتقال الأزمة الاقتصادية لسنة 1929م من الولايات المتحدة الأمريكية إلى أوربا، ومظاهرها بألمانيا. ت) من الوثيقتين 3 و4: مظاهر الاستغلال الاستعماري بالمغرب في المجالات الاقتصادية، وانعكاساته الاجتماعية على المغاربة.", points:3, lines:12,
        correction:"<b>أ) مظاهر تدهور الأوضاع بإيطاليا بعد الحرب العالمية الأولى</b> (0.5): إخفاق إيطاليا في تحقيق المغانم الاستعمارية المنشودة جراء المعاملة غير المتكافئة من طرف الحلفاء – المعاناة من المخلفات الثقيلة للحرب (ارتفاع أسعار المواد الغذائية، ازدياد الضرائب، ندرة الوقود، اضمحلال التجارة، سيادة جو من عدم الاستقرار، تفشي البطالة، تراكم ديون الحكومة، كثرة المظاهرات والحركات الثورية والإضرابات).<br><b>دورها في وصول موسوليني</b> (0.5): عدم الاستقرار السياسي وفشل الحكومات المتعاقبة في حل المشاكل المتراكمة مهّد الطريق أمام موسوليني للاستيلاء على الحكم.<br><br><b>ب) عوامل انتقال أزمة 1929 إلى أوربا</b> (0.5): الترابط الاقتصادي والمالي بين دول العالم – الدور الذي كانت تلعبه أمريكا في الاقتصاد العالمي (المرتبة الأولى في الإنتاج الصناعي، 45,5% من مجمل الإنتاج الدولي 1925-1929).<br><b>مظاهرها بألمانيا</b> (0.5): إفلاس 68 مؤسسة رأسمالية – اضطرار المصارف الكبرى لطلب الشرطة لحمايتها من المودعين – ارتفاع نسبة العاطلين سنة 1932 إلى أكثر من 5 ملايين عاطل (44% من القادرين على العمل) – اندلاع سلسلة من الهجمات العنيفة في عهد حكومة فايمار.<br><br><b>ت) مظاهر الاستغلال الاقتصادي بالمغرب</b> (0.5): <u>فلاحيا</u> تسخير الفلاحة المغربية لتموين فرنسا (72,40% من اللحم المجمد، 66% من الخضر الجافة، 41% من الصوف، 29,34% من رؤوس الأغنام، 22,50% من البواكر، 16,16% من الحوامض) مع التركيز على المنتجات التسويقية؛ <u>صناعيا</u> خدمة حاجيات الميتروبول بتصدير المواد المعدنية الخام وغياب سياسة تصنيع حقيقية وربط الاقتصاد بالسوق الرأسمالية؛ <u>تجاريا</u> استغلال ثروات المجال المغربي لتزويد فرنسا وتحول المغرب إلى بلد مستهلك أكثر منه مصدّر.<br><b>انعكاساته الاجتماعية</b> (0.5): تطور الهجرة الداخلية نحو المدن – انتشار الأحياء القصديرية بعدة مدن (الدار البيضاء، الرباط، القنيطرة) – انتشار الفقر والبؤس وتدهور القدرة الشرائية – تفشي الأوبئة والأمراض – بروز ظواهر اجتماعية ومهن وضيعة." },
      { q:"ركّب (ي) الفكرة الأساس التي تربط بين الوثائق. (2ن)", points:2, lines:5,
        correction:"(تقبل كل فكرة تفيد الآتي): <b>تطور الأوضاع بكل من إيطاليا وألمانيا خلال فترة ما بين الحربين، وبعض مظاهر الاستغلال الاستعماري للمغرب في ظل نظام الحماية وانعكاساته على المغاربة.</b>" },
      { q:"اعتمادا على مكتسباتك المعرفية، اكتب (ي) فقرة تبرز فيها مطالب الحركة الوطنية بالمغرب خلال فترة الثلاثينيات. (2ن)", points:2, redaction:true, lines:8,
        correction:"(تقبل الأفكار التي تفيد الآتي) شملت مطالب الحركة الوطنية عدة مجالات:<br><b>إدارية وسياسية</b>: احترام مضمون معاهدة الحماية – احترام حدود الدولة المغربية – إلغاء الإدارة المباشرة – تكوين حكومة مغربية – إقرار حرية التعبير والصحافة – إلغاء وسائل التعذيب.<br><b>اقتصادية ومالية</b>: إلغاء الاستيطان الرسمي – المساواة في الضرائب بين المغاربة والأجانب – حماية الصناعة المحلية من المنافسة – تأميم مصادر الطاقة والمعادن والسكك الحديدية – إلغاء الرسوم بين المناطق المغربية الثلاث.<br><b>اجتماعية</b>: إصلاح التعليم وإجباريته في المرحلة الابتدائية – إنشاء مدارس حرة – تشييد المستشفيات – محاربة البطالة – تحديد ساعات العمل اليومية." }
    ]},
    { titre:"ثانيا: مادة الجغرافيا (الموضوع المقالي)", points:10, questions:[
      { q:"اكتب (ي) في أحدِ الموضوعين التاليين: ● الموضوع الأول: «يبذل المغرب مجهودات كبيرة بهدف التخفيف من التباينات المجالية وتحقيق تنمية مندمجة ومستدامة». اكتب موضوعا مقاليا تعالج فيه: مفهوم سياسة إعداد التراب الوطني والمبادئ الموجهة لها؛ مظاهر أزمة المدينة بالمغرب والعوامل المفسّرة لها؛ تدابير التهيئة الحضرية لمعالجة مشاكل التعمير بالمدن المغربية. ● الموضوع الثاني: «إذا كان الاتحاد الأوربي قد قطع أشواطا كبيرة على مستوى الاندماج بين دوله الأعضاء، فإن الصين تمثّل قوة اقتصادية صاعدة في العالم». اكتب موضوعا مقاليا تعالج فيه: مظاهر الاندماج بين دول الاتحاد الأوربي على المستوى الاجتماعي والمقومات المساعدة على ذلك؛ مظاهر نمو القوة الصناعية للصين ودور المقومات التنظيمية في ذلك؛ التحديات المجالية التي تعرقل اندماج الاتحاد الأوربي ونمو الاقتصاد الصيني.", points:10, redaction:true, lines:22,
        correction:"<b>سلّم التنقيط (10ن)</b> — يُقوَّم الموضوع المقالي وفق ثلاثة مستويات:<br><b>المستوى المنهجي (2ن)</b>: مقدمة مناسبة (تأطير الموضوع وطرح الأسئلة الملائمة) 1ن؛ تصميم/عرض تحليلي منطقي 0.5ن؛ خاتمة مناسبة (استخلاص أو فتح الموضوع على امتدادات) 0.5ن.<br><b>المستوى المعرفي (7ن)</b>: استحضار العناصر الأساسية المطلوبة دون التقيد بالجزئيات.<br>— <u>الموضوع الأول</u>: مفهوم سياسة إعداد التراب الوطني ومبادئها (تدعيم الوحدة الترابية، تأمين التوازن بين المجالات، التنمية الاقتصادية والاجتماعية، المحافظة على البيئة، إشراك السكان في التسيير)؛ مظاهر أزمة المدينة (اقتصاديا، اجتماعيا، على مستوى التجهيزات والخدمات، بيئيا) والعوامل المفسّرة لها (التزايد السريع للساكنة الحضرية والهجرة القروية…)؛ تدابير التهيئة الحضرية (قانونية، مؤسساتية، تقنية).<br>— <u>الموضوع الثاني</u>: مظاهر الاندماج الاجتماعي بالاتحاد الأوربي والمقومات المساعدة (تاريخية، جغرافية، سياسية، تنظيمية، بشرية)؛ مظاهر نمو القوة الصناعية للصين ودور المقومات التنظيمية (مرحلة البناء الاشتراكي، مرحلة الانفتاح على اقتصاد السوق)؛ المشاكل والتحديات المجالية التي يعاني منها كل من الاتحاد الأوربي والصين.<br><b>المستوى الشكلي (1ن)</b>: لغة سليمة من الأخطاء، خط واضح ومقروء، شكل مقبول في تقديم المنتوج." }
    ]}
  ]
});

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

/* ---------- التربية الإسلامية — الجهوي فاس-مكناس 2022 (الدورة العادية) ---------- */
window.PB_EXAMS.push({
  id:"isl-fesmeknes-2022", subject:"islam", matiere:"التربية الإسلامية", coef:2, official:true,
  region:"Fès-Meknès", annee:2022, session:"Ordinaire", lang:"ar",
  label:"الجهوي فاس-مكناس 2022 — رسمي",
  durationMin:90, total:20,
  consignes:"الامتحان الجهوي الموحّد للبكالوريا، السنة الأولى من سلك البكالوريا، الأكاديمية الجهوية فاس-مكناس (الدورة العادية 2022). مادة: التربية الإسلامية — جميع الشعب العلمية والتقنية. مدة الإنجاز: ساعة ونصف. المعامل: 2. تأمّل سياق الوضعية وأسنادها ثم أنجز المهامّ التالية.",
  texte:{
    titre:"الوضعية التقويمية وأسنادها",
    html:"<div class=\"docn\">سياق الوضعية:</div>"
      +"<p>أثناء متابعة أفراد أسرتك لنشرة الأخبار في تغطية مباشرة لأحداث حرب سابقة، علّق الأخ الأكبر - المعروف بتسرّعه وشدّة انفعاله - الذي كان سببا في طلاق زوجته التي بلغت سن اليأس طلقة واحدة، قائلا: إن حسم المعارك والنزاعات اليوم يقوم على امتلاك العلم وحيازة الأسلحة المدمّرة من أجل فرض الأمر الواقع وتحقيق المصالح الخاصة، مدّعيا أن التفاوض والتشاور مجرّد ضياع للوقت وتأخير للحسم في هذه النزاعات.</p>"
      +"<p>فردّ عليه الأخ الأصغر - الناجح في عمله، والمستقرّ في زواجه، والحريص على رعاية أطفاله - قائلا: إن ما قلته يا أخي يتعارض مع هدي الأنبياء عليهم السلام، الذين دعوا إلى الإيمان والصبر والعفو والتسامح، كما حدث مع الرسول صلى الله عليه وسلم في صلح الحديبية وفتح مكة، ومع سيدنا يوسف في تدبيره للأزمات والمخاطر في مصر. أعتقد أن حسم الخلافات والنزاعات ينبغي أن يكون بالحكمة وإعمال العقل وترجيح كفّة التعايش والسلم على النزوع للحرب، لأنها تخلّف ضحايا وخرابا وتفكّكا للأسر وانتشارا للجهل والفواحش في المجتمع.</p>"
      +"<div class=\"docn\">الأسناد:</div>"
      +"<p><b>السند رقم 1</b> — قال تعالى: ﴿قَالَ تَزْرَعُونَ سَبْعَ سِنِينَ دَأَبًا فَمَا حَصَدْتُمْ فَذَرُوهُ فِي سُنْبُلِهِ إِلَّا قَلِيلًا مِمَّا تَأْكُلُونَ ۝ ثُمَّ يَأْتِي مِنْ بَعْدِ ذَٰلِكَ سَبْعٌ شِدَادٌ يَأْكُلْنَ مَا قَدَّمْتُمْ لَهُنَّ إِلَّا قَلِيلًا مِمَّا تُحْصِنُونَ﴾ سورة يوسف/الآيتان 47 و48.</p>"
      +"<p><b>السند رقم 2</b> — قال تعالى: ﴿قَالَ اجْعَلْنِي عَلَىٰ خَزَائِنِ الْأَرْضِ إِنِّي حَفِيظٌ عَلِيمٌ﴾ سورة يوسف/الآية 55.</p>"
      +"<p><b>السند رقم 3</b> — «ألستم تعلمون أن رسول الله صلى الله عليه وسلم قال: مَن حفر رومة فله الجنة، فحفرتُها» صحيح البخاري.</p>"
      +"<p><b>السند رقم 4</b> — عن عبد الله بن عمر رضي الله عنهما أنه سمع رسول الله صلى الله عليه وسلم يقول: «كلّكم راعٍ ومسؤول عن رعيّته» متفق عليه.</p>"
      +"<p><b>السند رقم 5</b> — «إن كان فعل الفلسفة ليس شيئا أكثر من النظر في الموجودات من جهة دلالتها على الصانع (الخالق).. فإن الموجودات إنما تدلّ على الصانع (الخالق) بمعرفة صنعتها، وأنه كلّما كانت المعرفة بصنعتها أتمّ كانت المعرفة بالصانع (الخالق) أتمّ». فصل المقال فيما بين الحكمة والشريعة، لأبي الوليد بن رشد، دراسة وتحقيق د. محمد عمارة، دار المعارف، ط.3، ص 22.</p>"
  },
  sections:[
    { titre:"الوضعية التقويمية", points:20, questions:[
      { q:"استخرج المشكلة التي تعالجها الوضعية. (0.5ن)", points:0.5, lines:3,
        correction:"<b>المشكلة التي تعالجها الوضعية</b>: الاختلاف بين الأخ الأكبر والأخ الأصغر حول كيفية تدبير المخاطر وحسم النزاعات. <i>(يُقبل كل جواب يؤدّي إلى نفس المعنى.)</i>" },
      { q:"حدّد المواقف الموجودة في الوضعية موظّفا الجدول التالي. (1.5ن)", points:1.5, lines:3,
        qHtml:"<table><thead><tr><th>الموقف</th><th>صاحبه</th><th>التعليل من الوضعية التقويمية</th></tr></thead><tbody>"
          +"<tr><td><textarea class=\"tcell\" data-cell=\"الموقف 1\" rows=\"2\" aria-label=\"الموقف 1\"></textarea></td><td><input class=\"tcell\" data-cell=\"صاحب الموقف 1\" aria-label=\"صاحب الموقف 1\"></td><td><textarea class=\"tcell\" data-cell=\"تعليل الموقف 1\" rows=\"2\" aria-label=\"تعليل الموقف 1\"></textarea></td></tr>"
          +"<tr><td><textarea class=\"tcell\" data-cell=\"الموقف 2\" rows=\"2\" aria-label=\"الموقف 2\"></textarea></td><td><input class=\"tcell\" data-cell=\"صاحب الموقف 2\" aria-label=\"صاحب الموقف 2\"></td><td><textarea class=\"tcell\" data-cell=\"تعليل الموقف 2\" rows=\"2\" aria-label=\"تعليل الموقف 2\"></textarea></td></tr>"
          +"</tbody></table>",
        correction:"<b>الموقف 1</b>: حسم النزاعات والأزمات بالقوة والسلاح · <b>صاحبه</b>: الأخ الأكبر · <b>التعليل</b>: أن التفاوض والتشاور مجرّد مضيعة للوقت.<br><b>الموقف 2</b>: حلّ النزاعات وتدبير الاختلاف بالتشاور والتفاوض وبالطرق السلمية · <b>صاحبه</b>: الأخ الأصغر · <b>التعليل</b>: إعمال الرسول صلى الله عليه وسلم للقواعد السلمية في تدبير الاختلاف، والقواعد اليوسفية في تدبير الأزمات والمخاطر. <i>(0.5ن لكل خانة مكتملة.)</i>" },
      { q:"اشرح المفهومين التاليين: التفاوض؛ رعاية الأطفال. (1ن)", points:1, lines:4,
        correction:"<b>التفاوض</b>: أسلوب من أساليب حلّ النزاعات وتسوية الخلافات بين طرفين مختلفين للوصول إلى تفاهم مشترك.<br><b>رعاية الأطفال</b>: الحرص على حماية الأطفال ممّا يضرّهم وتوفير حاجاتهم وصيانة حقوقهم. <i>(0.5ن لكل مفهوم.)</i>" },
      { q:"تأمّل السند رقم 1 واستنبط بعض أسس الخطة الاقتصادية لسيدنا يوسف عليه السلام في إنقاذ مصر وأهلها من الأزمة الاقتصادية. (1ن)", points:1, lines:4,
        correction:"من معالم المشروع الاقتصادي لسيدنا يوسف عليه السلام انطلاقا من السند:<br>• مبادرته لتفسير رؤيا الملك بدون تردّد وبعلم؛<br>• دعوته إلى الجدية والإتقان في العمل (تزرعون سبع سنين دأبا)؛<br>• الادّخار والتوسّط والاعتدال في الاستهلاك (فذروه في سنبله)، وجودة تدبير الشأن الاقتصادي والتخطيط للمستقبل." },
      { q:"الأصل في حسم الخلافات والنزاعات يكون بالحكمة وإعمال العقل؛ اعتمادا على السند رقم 5 وعلى ما درسته، كيف تردّ على من يدّعي أن الفلسفة تتعارض مع الإيمان؟ (1.5ن)", points:1.5, lines:5,
        correction:"على المترشّح أن يشير إلى <b>تكامل الفلسفة الراشدة والإيمان الحق</b>، فلا تعارض بينهما؛ وأن يؤكّد - اعتمادا على السند - أن النظر الفلسفي الموضوعي في الموجودات من جهة دلالتها على الصانع (الخالق) للمنهج الفلسفي الموضوعي أثر بالغ في ترسيخ الإيمان وتعميقه، لأن معرفة صنعة الكون تقود إلى معرفة أتمّ بالخالق سبحانه." },
      { q:"جاء في الوضعية أن الأخ الأكبر طلّق زوجته التي بلغت سن اليأس طلقة واحدة؛ املأ الجدول أسفله بما يناسب. (1.5ن)", points:1.5, lines:3,
        qHtml:"<table><thead><tr><th>نوع الطلاق من حيث آثاره</th><th>مدة العدة</th><th>دليل العدة</th></tr></thead><tbody>"
          +"<tr><td><input class=\"tcell\" data-cell=\"نوع الطلاق\" aria-label=\"نوع الطلاق\"></td><td><input class=\"tcell\" data-cell=\"مدة العدة\" aria-label=\"مدة العدة\"></td><td><textarea class=\"tcell\" data-cell=\"دليل العدة\" rows=\"3\" aria-label=\"دليل العدة\"></textarea></td></tr>"
          +"</tbody></table>",
        correction:"<b>نوع الطلاق من حيث آثاره</b>: طلاق بائن بينونة صغرى (لبلوغها سنّ اليأس) · <b>مدة العدة</b>: ثلاثة أشهر (عدّة الآيسة) · <b>دليل العدة</b>: قال تعالى: ﴿وَاللَّائِي يَئِسْنَ مِنَ الْمَحِيضِ مِنْ نِسَائِكُمْ إِنِ ارْتَبْتُمْ فَعِدَّتُهُنَّ ثَلَاثَةُ أَشْهُرٍ﴾ سورة الطلاق/الآية 4. <i>(0.5ن لكل خانة.)</i>" },
      { q:"«دعا الأنبياء إلى الإيمان والصبر والحياء والعفة»؛ استدلّ من سورة يوسف على: ● عفة يوسف عليه السلام ورفضه ارتكاب الفاحشة مع امرأة العزيز التي راودته عن نفسه (1.5ن)؛ ● صبر يعقوب عليه السلام على فقد ابنه يوسف عليه السلام (1.5ن).", points:3, lines:8,
        correction:"<b>عفة يوسف عليه السلام</b> (1.5): قال تعالى: ﴿وَرَاوَدَتْهُ الَّتِي هُوَ فِي بَيْتِهَا عَنْ نَفْسِهِ وَغَلَّقَتِ الْأَبْوَابَ وَقَالَتْ هَيْتَ لَكَ ۚ قَالَ مَعَاذَ اللَّهِ إِنَّهُ رَبِّي أَحْسَنَ مَثْوَايَ إِنَّهُ لَا يُفْلِحُ الظَّالِمُونَ﴾ سورة يوسف/الآية 23.<br><b>صبر يعقوب عليه السلام</b> (1.5): قال تعالى: ﴿قَالَ بَلْ سَوَّلَتْ لَكُمْ أَنْفُسُكُمْ أَمْرًا ۖ فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ﴾ سورة يوسف/الآية 18." },
      { q:"اعتمادا على السند رقم 2، أتمم الجدول التالي. (1ن)", points:1, lines:3,
        qHtml:"<table><thead><tr><th>القيمتان</th><th>ما يدلّ عليهما في السند</th></tr></thead><tbody>"
          +"<tr><td><input class=\"tcell\" data-cell=\"القيمة 1\" aria-label=\"القيمة 1\"></td><td><input class=\"tcell\" data-cell=\"ما يدل عليها 1\" aria-label=\"ما يدل عليها 1\"></td></tr>"
          +"<tr><td><input class=\"tcell\" data-cell=\"القيمة 2\" aria-label=\"القيمة 2\"></td><td><input class=\"tcell\" data-cell=\"ما يدل عليها 2\" aria-label=\"ما يدل عليها 2\"></td></tr>"
          +"</tbody></table>",
        correction:"<b>القيمة 1</b>: الأمانة · <b>ما يدلّ عليها</b>: «حَفِيظٌ».<br><b>القيمة 2</b>: العلم · <b>ما يدلّ عليها</b>: «عَلِيمٌ». <i>(0.5ن لكل خانة.)</i>" },
      { q:"قال الأخ الأكبر: «إن التفاوض والتشاور مجرّد ضياع للوقت». أ) ما رأيك في هذا القول؟ (0.5ن) ب) بيّن دور التفاوض والتشاور في الحدّ من ظاهرة الطلاق. (1ن)", points:1.5, lines:6,
        correction:"<b>أ) الرأي</b> (0.5): أُعارض هذا القول.<br><b>ب) دور التفاوض والتشاور في الحدّ من ظاهرة الطلاق</b> (1): يُعدّ التفاوض والتشاور وسيلتين مهمّتين في الحفاظ على استقرار مؤسسة الأسرة وحمايتها من التفكّك وصيانة العلاقة الزوجية؛ فعندما تظهر المشاكل يُعتمد التفاوض للوصول إلى تفاهمات ترضي الطرفين، واللجوء إلى التشاور مع أهل الرأي والاختصاص (قضاة، لجان الصلح، فقهاء…) من أجل اتخاذ قرارات صائبة تحدّ من تفشّي ظاهرة الطلاق." },
      { q:"ورد في الوضعية أن «حسم المعارك والنزاعات اليوم يقوم على امتلاك العلم وحيازة الأسلحة المدمّرة من أجل فرض الأمر الواقع وتحقيق المصالح الخاصة»؛ اعتمادا على السند رقم 2 وعلى ما درسته، انتقد هذا القول معلّلا جوابك. (1.5ن)", points:1.5, lines:6,
        correction:"على المترشّح بيان أن (مع التعليل المناسب):<br>• التمكّن من العلم يجب أن يُسهم في الحفاظ على مصالح الأفراد والمجتمعات لا في تدميرها؛<br>• التمكّن من العلم يجعل صاحبه قادرا على تحمّل المسؤولية وأداء الأمانة على أحسن وجه (إنّي حفيظ عليم)؛<br>• التمكّن من العلم يؤدّي إلى توظيف الكفاءة فيما يفيد البشرية وينفعها، لا في الاستئثار بالمصالح الخاصة على حساب الآخرين." },
      { q:"بناء على ما جاء في السند رقم 4 وعلى ما درسته، وضّح أهمية تحمّل المسؤولية في تحصين المجتمع من شيوع الفاحشة، مستدلّا بدليل شرعي. (2ن)", points:2, lines:7,
        correction:"<b>أهمية تحمّل المسؤولية في تحصين المجتمع من شيوع الفاحشة</b> (1):<br>• تقوية الروابط الأسرية في المجتمع؛<br>• تحصين النفس وعفّتها وبناء علاقات أسرية إنسانية راقية؛<br>• زرع المحبة بين أفراد الأسرة والمجتمع وغرس قيم الرحمة والمودة والحياء؛<br>• حلّ المشاكل بالتي هي أحسن.<br><b>الدليل الشرعي المناسب</b> (1): «كلّكم راعٍ وكلّكم مسؤول عن رعيّته»؛ أو قوله تعالى: ﴿إِنَّ الَّذِينَ يُحِبُّونَ أَنْ تَشِيعَ الْفَاحِشَةُ فِي الَّذِينَ آمَنُوا لَهُمْ عَذَابٌ أَلِيمٌ فِي الدُّنْيَا وَالْآخِرَةِ﴾ النور/19." },
      { q:"من هو الصحابي الذي يتحدّث عنه السند رقم 3، واستنبط صفة مميّزة له؟ (1ن)", points:1, lines:3,
        qHtml:"<table><thead><tr><th>الشخصية</th><th>الصفة المميّزة</th></tr></thead><tbody>"
          +"<tr><td><input class=\"tcell\" data-cell=\"الشخصية\" aria-label=\"الشخصية\"></td><td><input class=\"tcell\" data-cell=\"الصفة\" aria-label=\"الصفة\"></td></tr>"
          +"</tbody></table>",
        correction:"<b>الشخصية</b>: عثمان بن عفّان رضي الله عنه (0.5) · <b>الصفة المميّزة</b>: الإنفاق / البذل / العطاء / التصدّق في سبيل الله (0.5)." },
      { q:"معلوم أن «حسم الخلافات والنزاعات يكون بالتفاوض والحوار وترجيح كفّة التعايش والسلم على النزوع للحرب»؛ بيّن أهمية الطرق السلمية في حلّ النزاعات وتفادي الحروب، موظّفا بعض المفاهيم والقيم التالية: التفاوض، تحمّل المسؤولية، العلم، العفو، التسامح، معزّزا جوابك بنموذج من السيرة النبوية. (3ن)", points:3, redaction:true, lines:10,
        correction:"<b>سلّم التنقيط (3ن):</b> يحرّر المترشّح فقرة في حدود ستة أسطر، مع عدم إغفال أن آليتي التفاوض وتحمّل المسؤولية وسيلتان مهمّتان لحلّ النزاعات من خلال: التوصّل إلى تفاهمات بين المتنازعين؛ تقريب وجهات النظر؛ تحقيق حلول ترضي الطرفين؛ الوفاء بالعهود والالتزامات؛ حلّ الخلافات وفق توجيهات الشرع.<br><b>نموذج من السيرة النبوية</b>: صلح الحديبية.<br><i>التوزيع: استدعاء المعارف 0.5، تحليلها 0.5، تركيبها 0.5، اتّخاذ موقف 0.5، تعليله بنموذج من السيرة النبوية 1.</i>" }
    ]}
  ]
});

/* ---------- التربية الإسلامية — الجهوي فاس-مكناس 2024 (الدورة العادية) ---------- */
window.PB_EXAMS.push({
  id:"isl-fesmeknes-2024", subject:"islam", matiere:"التربية الإسلامية", coef:2, official:true,
  region:"Fès-Meknès", annee:2024, session:"Ordinaire", lang:"ar",
  label:"الجهوي فاس-مكناس 2024 — رسمي",
  durationMin:90, total:20,
  consignes:"الامتحان الجهوي الموحّد لنيل شهادة البكالوريا، السنة الأولى من سلك البكالوريا، الأكاديمية الجهوية فاس-مكناس (الدورة العادية 2024). مادة: التربية الإسلامية — جميع الشعب الأدبية والعلمية والتقنية. مدة الإنجاز: ساعة ونصف. المعامل: 2. تمعّن في سياق الوضعية وأسنادها، ثم أجب عن الأسئلة التالية بتركيز.",
  texte:{
    titre:"الوضعية التقويمية وأسنادها",
    html:"<div class=\"docn\">سياق الوضعية:</div>"
      +"<p>اتّفق عبد النور وسعيد على توظيف مهاراتهما الرقمية في إنشاء قناة على اليوتيوب، للتعريف بالمؤهّلات السياحية لمنطقتهما القروية، لشعورهما بمسؤولية المشاركة في التنمية المحلية، وبعد نشرهما لحلقات رائعة، استحسن المتابعون من أهل القرية وغيرهم هذه المبادرة الإيجابية، وزاد عدد المشاهدات، فعرضت عليهم إحدى الشركات التجارية طلب الدعاية لمنتوجها في إعلانات إشهارية بقناتهما بمقابل مالي كبير.</p>"
      +"<p>وأثناء الحوار والتشاور بينهما، قال عبد النور: منتوج هذه الشركة فيه إشهار لا يراعي قيم العفة والحياء الأصيلة في مجتمعنا، وحماية القيم مسؤولية جماعية؛ أما صديقه سعيد فقال: نعم إن حماية قيم الحياء والعفة هي مسؤولية، ولكنها مسألة ذاتية وحرية شخصية، وليس فيما نحن فيه اعتداء على أحد؛ قال عبد النور: المُوافقة على هذا الإشهار يُسهم في الإفساد في الأرض وإشاعة الفواحش، خصوصا بين الشباب؛ قال سعيد: إن لم نقبل بهذه الفرصة فسيأخذها غيرنا، وتحرم أنفسنا من أموال كثيرة، أنا أحتاج جزءا منها الآن لإكمال مقدار الصداق وإتمام زواجي؛ فقال عبد النور: يا صديقي كيف تقبل أن تبدأ حياتك الأسرية والمهنية بمال كسبته من طريق غير مشروع؟</p>"
      +"<div class=\"docn\">الأسناد الداعمة:</div>"
      +"<p><b>السند الأول</b> — قال تعالى: ﴿قَالَتْ فَذَٰلِكُنَّ الَّذِي لُمْتُنَّنِي فِيهِ ۖ وَلَقَدْ رَاوَدْتُهُ عَنْ نَفْسِهِ فَاسْتَعْصَمَ ۖ وَلَئِنْ لَمْ يَفْعَلْ مَا آمُرُهُ لَيُسْجَنَنَّ وَلَيَكُونًا مِنَ الصَّاغِرِينَ ۝ قَالَ رَبِّ السِّجْنُ أَحَبُّ إِلَيَّ مِمَّا يَدْعُونَنِي إِلَيْهِ ۖ وَإِلَّا تَصْرِفْ عَنِّي كَيْدَهُنَّ أَصْبُ إِلَيْهِنَّ وَأَكُنْ مِنَ الْجَاهِلِينَ﴾ سورة يوسف: 32-33.</p>"
      +"<p><b>السند الثاني</b> — عن معاذ بن جبل رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: «لا تزول قدما عبدٍ يوم القيامة حتى يُسأل عن أربع: عن عمره فيما أفناه، وعن شبابه فيما أبلاه، وعن ماله من أين اكتسبه وفيما أنفقه، وعن علمه ماذا عمل به» المدخل إلى السنن الكبرى للإمام البيهقي.</p>"
      +"<p><b>السند الثالث</b> — «الإيمان لا يبيح لأهله اكتساب المال بأيّ طريق أرادوا، بل يميّز لهم بين الطرق المشروعة وغير المشروعة لاكتساب المعاش، نظرا إلى المصلحة الجماعية؛ وهذا التفريق يقوم على مبدأ وهو: أن جميع الطرق لاكتساب المال التي لا تُحصّل منفعة الفرد إلا بخسارة غيره غير مشروعة، وأن الطرق التي يتبادل فيها الأفراد المنفعة فيما بينهم بالتراضي والعدل والمسؤولية مشروعة». من كتاب «الحلال والحرام» للدكتور يوسف القرضاوي، ص 129.</p>"
      +"<p><b>السند الرابع</b> — «بما أن الإعلام يُسهم إسهاما فعليا في التعليم والتربية وتشكيل الوعي الأخلاقي وتعليم الناس الخير، فإن واجب وسائل الإعلام اليوم، وفي زمن شيوع الجهل بالدين والانحراف الأخلاقي بين فئات مختلفة، أن تعمل بوعي وبصيرة من أجل تربية المجتمع على الإيمان وإعلاء القيم الدينية، وأن تتحمّل مسؤوليتها في تربية شاملة ودائمة للصغار والمراهقين والشباب، وتوعية جادّة بهذا الدين، دون الفصل بين عقيدته وشريعته وأخلاقه وسلوكه (...) للسلامة من التحريف والانحراف». «الإعلام ودوره في التواصل الديني»، د. جميلة زيان، مجلة دعوة الحق، العدد 416، 1437هـ/2016م، ص 158 (بتصرّف).</p>"
  },
  sections:[
    { titre:"الوضعية التقويمية", points:20, questions:[
      { q:"ما المشكلة التي تثيرها الوضعية؟ (1ن)", points:1, lines:3,
        correction:"<b>المشكلة التي تثيرها الوضعية</b>: الاختلاف بين الصديقين حول التخلّي عن قيمتي العفة والحياء مقابل المال؛ وهل حماية العفة والحياء مسؤولية ذاتية أم جماعية؛ وهل يصحّ الموافقة على نشر إشهار منافٍ لقيم الحياء والعفة مقابل الحصول على المال؟ <i>(يُقبل كل جواب يؤدّي المعنى.)</i>" },
      { q:"قارن بين موقف عبد النور وموقف سعيد من حماية قيمتي العفة والحياء. — وجه التشابه؛ — وجه الاختلاف. (1ن)", points:1, lines:4,
        correction:"<b>وجه التشابه</b> (0.25): كلاهما يرى حماية العفة والحياء مسؤولية.<br><b>وجه الاختلاف</b> (0.75): عبد النور يراها مسؤولية جماعية، بينما يراها سعيد مسؤولية ذاتية وحرية شخصية." },
      { q:"ساعد عبد النور على تحديد المعنى الشرعي للعفة والمسؤولية. — العفة؛ — المسؤولية. (2ن)", points:2, lines:5,
        correction:"<b>العفة</b> (1): الامتناع عن المحرّمات — بإرادة ذاتية — دافعها الإيمان.<br><b>المسؤولية</b> (1): القيام بالتكليف — مع الاستعداد للمحاسبة — وتحمّل التبعات." },
      { q:"استخرج من سياق الوضعية ما يدلّ على إسهام الصديقين في عمارة الأرض. (1ن)", points:1, lines:4,
        correction:"ما يدلّ على إسهام الصديقين في عمارة الأرض (0.25ن لكل مؤشّر صحيح في حدود أربعة):<br>• المشاركة في تحقيق التنمية المحلية؛<br>• المبادرة الإيجابية التي استحسنها أهل القرية؛<br>• توظيف مهاراتهما في إنشاء قناة واستغلالها بشكل إيجابي؛<br>• التعريف بالمؤهّلات السياحية لمنطقتهم؛<br>• الإحساس بالمسؤولية وواجب المؤمن في عمارة الأرض وإصلاحها." },
      { q:"يريد سعيد تحصيل المال حتى وإن كان بطريق مخالف للحياء والعفة؛ انتقد رأيه انطلاقا من معاني السند الثالث. (1.5ن)", points:1.5, lines:5,
        correction:"<i>(0.25 للتعبير عن الرأي بتخطئة سعيد، و1.25 لباقي المؤشّرات.)</i><br>• يعبّر صراحة عن النقد ببيان خطأ رأي سعيد؛<br>• يشير إلى أنه ليست كلّ الطرق مشروعة لاكتساب المال؛<br>• يميّز بين الطريق المشروع وغير المشروع؛<br>• يبيّن أن الإيمان هو المميّز بين الطريقين؛<br>• يبرز أن المصلحة الجماعية محدِّد للطريق المشروع لكسب المال." },
      { q:"يرى عبد النور أن إشهار الشركة فيه إشاعة للفاحشة؛ ما رأيك في موقفه هذا، معزّزا جوابك ببيان سبب واحد لانتشار الفواحش وأسلوبين للوقاية منها؟ (1.5ن)", points:1.5, lines:6,
        correction:"<i>(0.25 للتعبير عن الموافقة، 0.25 لذكر السبب، 0.5 لكل أسلوب من أسلوبي الوقاية.)</i><br>• يعبّر عن موافقته لموقف عبد النور؛<br>• <b>سبب انتشار الفواحش</b>: منافاة الحياء نتيجة ضعف إجلال الله تعالى وتعظيمه؛<br>• <b>أساليب الوقاية</b>: تربية إيمانية على قيم الحياء والمحافظة على الصلاة التي تنهى عن الفحشاء والمنكر؛ تربية أخلاقية على الصبر والعفة؛ تربية اجتماعية بتيسير سبيل الزواج والرفقة الصالحة. <i>(يُقبل كل أسلوب مناسب.)</i>" },
      { q:"باعتمادك معاني السند الرابع، وضّح لسعيد أهمية الإيمان والالتزام بالقيم في تعديل موقفه من هذا الإشهار المُخلّ بالحياء، وفي استثمار قناتهما الإعلامية لأجل خدمة المجتمع؟ (1.5ن)", points:1.5, lines:6,
        correction:"<i>(0.25 للتركيب واللغة، 0.5 لاستثمار السند، 0.75 لباقي المؤشّرات.)</i><br>• يوضّح أن الإيمان والقيم تحمي من الإخلال بالحياء؛<br>• يبيّن أن الإيمان يجعل سعيدا يرفض الإشهار المذكور؛<br>• يستفيد من السند الرابع أن الإيمان والقيم الدينية والمسؤولية من موجّهات القناة الإعلامية من أجل تربية شاملة ودائمة للصغار والمراهقين والشباب وتوعية جادّة بهذا الدين." },
      { q:"تتضمّن سورة يوسف مواقف ومشاهد رائعة في الالتزام بالقيم الإيمانية؛ استعن بالجدول لإظهار بعض ذلك. (3ن)", points:3, lines:3,
        qHtml:"<table><thead><tr><th>المشاهد والمواقف</th><th>الآيات من سورة يوسف</th></tr></thead><tbody>"
          +"<tr><td>تلقّي النبي يعقوب عليه السلام خبر فقدان يوسف بالصبر واليقين.</td><td><textarea class=\"tcell\" data-cell=\"آيات المشهد 1\" rows=\"3\" aria-label=\"آيات المشهد 1\"></textarea></td></tr>"
          +"<tr><td>حرص يوسف عليه السلام على الدعوة إلى التوحيد بمنهج عقلي بالرغم من وجوده في السجن.</td><td><textarea class=\"tcell\" data-cell=\"آيات المشهد 2\" rows=\"3\" aria-label=\"آيات المشهد 2\"></textarea></td></tr>"
          +"<tr><td><textarea class=\"tcell\" data-cell=\"المشهد 3\" rows=\"3\" aria-label=\"المشهد 3\"></textarea></td><td>قال تعالى: «قَالُوا تَاللَّهِ لَقَدْ آثَرَكَ اللَّهُ عَلَيْنَا وَإِنْ كُنَّا لَخَاطِئِينَ قَالَ لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ يَغْفِرُ اللَّهُ لَكُمْ وَهُوَ أَرْحَمُ الرَّاحِمِينَ» سورة يوسف، الآيتان 91-92.</td></tr>"
          +"</tbody></table>",
        correction:"<b>المشهد 1</b> (تلقّي يعقوب خبر فقدان يوسف بالصبر واليقين) → الآيات: قال تعالى: ﴿وَجَاءُوا عَلَىٰ قَمِيصِهِ بِدَمٍ كَذِبٍ ۚ قَالَ بَلْ سَوَّلَتْ لَكُمْ أَنْفُسُكُمْ أَمْرًا ۖ فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ﴾ (يوسف 18).<br><b>المشهد 2</b> (حرص يوسف على الدعوة إلى التوحيد في السجن) → الآيات: من قوله تعالى: ﴿يَا صَاحِبَيِ السِّجْنِ أَأَرْبَابٌ مُتَفَرِّقُونَ خَيْرٌ أَمِ اللَّهُ الْوَاحِدُ الْقَهَّارُ﴾ إلى قوله: ﴿وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يَعْلَمُونَ﴾ (يوسف 39-40).<br><b>المشهد 3</b> (الآيات المعطاة 91-92) → الموقف: اعتراف إخوة يوسف بإساءتهم وأخطائهم، وعفو يوسف عنهم ودعاؤه لهم. <i>(1ن لكل خانة؛ يُراعى المعنى التام في الخانة الثالثة: اعتراف الإخوة + عفو يوسف.)</i>" },
      { q:"يريد سعيد في الوضعية إتمام الزواج، وذلك بتحقّق أركانه وتوفّر شروطه وانعدام موانعه؛ صنّف المعطيات التالية حسب المطلوب في الجدول: (المرأة في فترة العدة – أهلية الزوجين – سماع العدلين للصيغة وتوثيقها – الصداق – تحديد قدر الصداق – الإيجاب والقبول). (1.5ن)", points:1.5, lines:3,
        qHtml:"<table><thead><tr><th>أركان الزواج</th><th>شروطه</th><th>موانعه</th></tr></thead><tbody>"
          +"<tr><td><textarea class=\"tcell\" data-cell=\"أركان الزواج\" rows=\"3\" aria-label=\"أركان الزواج\"></textarea></td><td><textarea class=\"tcell\" data-cell=\"شروط الزواج\" rows=\"3\" aria-label=\"شروط الزواج\"></textarea></td><td><textarea class=\"tcell\" data-cell=\"موانع الزواج\" rows=\"3\" aria-label=\"موانع الزواج\"></textarea></td></tr>"
          +"</tbody></table>",
        correction:"<b>أركان الزواج</b>: الإيجاب والقبول؛ الصداق.<br><b>شروطه</b>: أهلية الزوجين؛ سماع العدلين للصيغة وتوثيقها.<br><b>موانعه</b>: المرأة في فترة العدة.<br><i>ملاحظة: «تحديد قدر الصداق» لا يدخل في أيّ صنف، وإدخاله في صنف يُعدّ سوء ضبط (تُخصم 0.25 لخلطه).</i>" },
      { q:"سيدنا عثمان بن عفّان رضي الله عنه من الصحابة الذين يقتدي بهم عبد النور في التعامل مع المال؛ اذكر ثلاثة تصرّفات لعثمان رضي الله عنه تدلّ على بذله وحسن تصرّفه في المال. (1.5ن)", points:1.5, lines:5,
        correction:"<b>ثلاثة من تصرّفات عثمان رضي الله عنه</b> (0.5ن لكل تصرّف):<br>• إنفاقه في تجهيز جيش العُسرة للجهاد في سبيل الله؛<br>• إنفاقه في توسعة المسجد النبوي؛<br>• إنفاقه في سقي الماء حين اشترى بئر رومة وتصدّق بها؛<br>• (أو) إنفاقه في زمن الشدّة والمجاعة في خلافة أبي بكر الصديق." },
      { q:"تدبّر السند الأول من سورة يوسف، ثم استخرج منه مظاهر غياب الحياء ومظاهر حضوره عند امرأة العزيز وعند يوسف عليه السلام. (2ن)", points:2, lines:3,
        qHtml:"<table><thead><tr><th>مظاهر غياب الحياء</th><th>مظاهر استحضار الحياء</th></tr></thead><tbody>"
          +"<tr><td><textarea class=\"tcell\" data-cell=\"غياب الحياء 1\" rows=\"2\" aria-label=\"غياب الحياء 1\"></textarea></td><td><textarea class=\"tcell\" data-cell=\"استحضار الحياء 1\" rows=\"2\" aria-label=\"استحضار الحياء 1\"></textarea></td></tr>"
          +"<tr><td><textarea class=\"tcell\" data-cell=\"غياب الحياء 2\" rows=\"2\" aria-label=\"غياب الحياء 2\"></textarea></td><td><textarea class=\"tcell\" data-cell=\"استحضار الحياء 2\" rows=\"2\" aria-label=\"استحضار الحياء 2\"></textarea></td></tr>"
          +"</tbody></table>",
        correction:"<b>مظاهر غياب الحياء</b> (عند امرأة العزيز): إصرارها على المراودة ودفاعها عن نفسها؛ تهديدها يوسف بالسجن والإذلال.<br><b>مظاهر استحضار الحياء</b> (عند يوسف عليه السلام): دعاؤه ربّه؛ عفّته وتفضيله السجن على الفاحشة. <i>(0.5ن لكل عنصر.)</i>" },
      { q:"لحلّ مشكلة الوضعية، قدّم للصديقين نصيحة تدعوهما فيها إلى المحافظة على القناة في اليوتيوب مع البحث عن الربح المالي دون الإخلال بالقيم، مستحضرا ما يلي: أولا: ضرورة توظيف المفاهيم والقيم التالية (الاستخلاف – العلم – المسؤولية – الحياء)؛ ثانيا: الاستعانة بمعاني السند الثاني التي تفيدك في نصيحتك. (2.5ن)", points:2.5, redaction:true, lines:10,
        correction:"<b>سلّم التنقيط (2.5ن)</b> — سؤال المهمة الكلية (محطة إدماجية) يُحرَّر في فقرة تعبيرية: التركيب وحسن الصياغة 0.5؛ حسن توظيف القيم والمفاهيم 1.5؛ حسن الاستفادة من السند 0.5.<br><b>المؤشّرات</b>:<br>• يكتب بعبارة سليمة من الأخطاء في الأسلوب والمعنى؛<br>• يبيّن أن الحياء أساس الجمع بين نجاح القناة وإمكان تحصيل الربح الحلال من خلال إنتاج محتوى إعلامي إيجابي؛<br>• يبيّن أن مبدأ الاستخلاف يجعل القناة أمانة يجب المحافظة عليها من أجل الإسهام في التنمية؛<br>• يستفيد من السند الثاني أن مراعاة معنى المسؤولية أمام الله تجعل صاحب القناة يُحسن استخدام شبابه ووقته، ويعمل بعلمه ومهاراته فيما ينفع، كي يكسب المال وينفقه بطرق حلال." }
    ]}
  ]
});

/* ---------- التاريخ والجغرافيا — الجهوي فاس-مكناس 2022 (الدورة العادية) ---------- */
window.PB_EXAMS.push({
  id:"hg-fesmeknes-2022", subject:"hg", matiere:"التاريخ والجغرافيا", coef:2, official:true,
  region:"Fès-Meknès", annee:2022, session:"Ordinaire", lang:"ar",
  label:"الجهوي فاس-مكناس 2022 — رسمي",
  durationMin:120, total:20,
  consignes:"الامتحان الجهوي الموحّد لنيل شهادة البكالوريا، السنة الأولى من سلك البكالوريا، الأكاديمية الجهوية فاس-مكناس (الدورة العادية 2022). مادة: التاريخ والجغرافيا. مدة الإنجاز: ساعتان. أولا: مادة الجغرافيا (الاشتغال بالوثائق) 10 نقط. ثانيا: مادة التاريخ (الموضوع المقالي) 10 نقط.",
  texte:{
    titre:"الوثائق (مادة الجغرافيا)",
    html:"<div class=\"docn\">الوثيقة رقم 1: درجات التهديد بالتصحّر للأراضي المغربية.</div>"
      +"<table><thead><tr><th>درجات التهديد</th><th>النسبة المئوية %</th></tr></thead><tbody>"
      +"<tr><td>منخفضة</td><td>27</td></tr>"
      +"<tr><td>متوسطة</td><td>18</td></tr>"
      +"<tr><td>عالية</td><td>8</td></tr>"
      +"<tr><td>مناطق صحراوية شديدة الجفاف</td><td>47</td></tr>"
      +"</tbody></table>"
      +"<p class=\"fn\">المصدر: التقرير الرابع حول حالة البيئة بالمغرب 2020 - النسخة الكاملة، ص 169 (وزارة التحول الطاقي والتنمية المستدامة - قطاع البيئة).</p>"
      +"<div class=\"docn\">الوثيقة رقم 2:</div>"
      +"<p>تؤثّر ظاهرة التصحّر بالمغرب على مساحات شاسعة، وتتزايد خطورتها في ظل المناخ الجاف الذي يتميّز بدورات جفاف متكرّرة وطويلة، وتربة فقيرة قابلة بشدّة للتعرية. ينضاف إلى ذلك الاستغلال المفرط الذي تتعرّض له الموارد الطبيعية من طرف ساكنة العالم القروي لتلبية حاجياتها اليومية في ظل ما تعيشه من هشاشة، مما يزيد من تدهور الأوساط. أمام هذا الوضع وما يخلّفه من تداعيات سوسيو-اقتصادية وبيئية، فإن المغرب ومنذ أمد بعيد بادر إلى القيام بمجهودات جبّارة بغية عكس مسار هذه الظاهرة والتخفيف من حدّتها، وتشمل على وجه الخصوص الإنجازات المادية المرتبطة بتوفير المياه، واستصلاح الأراضي الفلاحية، وتهيئة المراعي، والمحافظة على الموارد الغابوية وتنميتها. بالنسبة لقطاع المياه والغابات فقد همّت إنجازاته بشكل أساسي المحافظة على المياه والتربة، وذلك عبر مخطّطات التهيئة المندمجة للأحواض المائية، ومحاربة زحف الرمال عبر تثبيت الكثبان الرملية، وتحسين المراعي، ومكافحة الحرائق والقيام بعمليات التشجير.</p>"
      +"<p class=\"fn\">المصدر: http://www.eauxetforets.gov.ma (بتصرّف).</p>"
      +"<div class=\"docn\">الوثيقة رقم 3:</div>"
      +"<p>تعتبر ظاهرة التصحّر في مقدّمة المعوقات التي تحدّ من تطوير الموارد الأرضية الزراعية في الدول العربية، حيث تقع معظم الأراضي ضمن المناطق الجافة وشبه الجافة، مما يعرّضها لعوامل التدهور والزحف العمراني. وتقدّر مساحة الأراضي الصحراوية في الدول العربية حسب تقديرات المنظمة العربية للتنمية الزراعية بنحو 8.9 مليون كلم²، أي حوالي ثلاثة أرباع المساحة الإجمالية للدول العربية... وتتفاوت حدّة التصحّر في الدول العربية، حيث توجد أكبر المساحات المتصحّرة في كلّ من ليبيا ومصر والأردن، كما تعتبر الإمارات وقطر والكويت والبحرين من أكثر الدول العربية التي تعاني من زحف التصحّر، في حين تعتبر الصومال وتونس وسورية من أقل الدول من حيث المساحات التي تشهد تصحّرا. وترجع أسباب ظاهرة التصحّر في الدول العربية إلى مناخها الجاف والى نظم الري التقليدي وضعف الإدارة المتكاملة للموارد المائية والرعي الجائر وقطع الأشجار وانجراف التربة، إلى جانب العوامل البيئية والمناخية. يعتبر تعزيز التعاون العربي في مجال حماية الغابات والمراعي، ودعم الهيئات التي تعنى بالمحافظة على البيئة، واستصلاح الأراضي وصيانتها، وتحسين أساليب الري، ووضع البرامج والخطط التقنية الهادفة لاستغلال الموارد الزراعية والتشجير من أنجع السبل لإيقاف تمدّد هذه الظاهرة.</p>"
      +"<p class=\"fn\">المصدر: التقرير الاقتصادي العربي الموحّد 2021، ص 65 (بتصرّف).</p>"
  },
  sections:[
    { titre:"أولا: مادة الجغرافيا (الاشتغال بالوثائق)", points:10, questions:[
      { q:"حوّل (ي) معطيات الوثيقة رقم 1 إلى مبيان قطاعي. (3ن)", points:3, redaction:true, lines:6,
        correction:"<b>تحويل معطيات الوثيقة 1 إلى مبيان قطاعي</b> (دائرة أو نصف دائرة) مع احترام معايير الإنجاز:<br>• دقّة الإنجاز وصحّته (تحويل النسب إلى زوايا: 1% ≈ 3.6° في الدائرة)؛<br>• العنوان، المقياس/المفتاح.<br><i>النسب: منخفضة 27%، متوسطة 18%، عالية 8%، مناطق صحراوية شديدة الجفاف 47%.</i>" },
      { q:"صِف (ي) انطلاقا من المبيان المنجز أبعاد ظاهرة التصحّر على المجال المغربي. (1ن)", points:1, lines:4,
        correction:"أبعاد مجالية تتجلّى في <b>اتّساع المجال الصحراوي</b> (47% مناطق صحراوية شديدة الجفاف) <b>واحتمالات امتداده مستقبلا</b> (يطال التهديد حوالي 26% ما بين درجة التهديد المنخفضة والمتوسطة والعالية)." },
      { q:"استخلص (ي) من الوثيقتين رقم 2 و3: أ) الأبعاد السوسيو-اقتصادية لظاهرة التصحّر بالمغرب وبالعالم العربي. (1ن)", points:1, lines:4,
        correction:"<b>الأبعاد السوسيو-اقتصادية</b>: الحدّ من تطوير الموارد الأرضية الزراعية، والتأثير في التنمية، وتعميق الهشاشة الاجتماعية والاقتصادية لساكنة العالم القروي." },
      { q:"ب) العوامل المفسّرة لتنامي ظاهرة التصحّر بالمغرب وبالعالم العربي. (1.5ن)", points:1.5, lines:5,
        correction:"<b>العوامل المفسّرة لتنامي التصحّر</b>:<br>• <u>طبيعية</u>: سيادة المناخ الجاف وتكرار دورات الجفاف، والتربة الفقيرة المهدّدة بالتعرية والانجراف؛<br>• <u>بشرية</u>: الاستغلال المفرط للموارد الطبيعية (قطع الغابة، الري التقليدي، الرعي الجائر)، إضافة إلى الزحف العمراني." },
      { q:"ج) الجهود المبذولة لمواجهة التصحّر بالمغرب وبالعالم العربي. (1.5ن)", points:1.5, lines:6,
        correction:"<b>في المغرب</b>: توفير المياه واستصلاح الأراضي والحدّ من زحف الرمال؛ تهيئة المراعي والمحافظة على الموارد الغابوية وتنميتها (التشجير، مكافحة الحرائق)؛ التخطيط والتهيئة المندمجة للأحواض المائية.<br><b>في العالم العربي</b>: تعزيز التعاون بين الدول العربية في الموضوع؛ دعم الهيئات التي تعنى بالمحافظة على البيئة واستصلاح الأراضي وصيانتها وتحسين أساليب الري؛ وضع الخطط التقنية لاستغلال الموارد الطبيعية." },
      { q:"أكتب (ي) فقرة توضّح من خلالها الاختيارات المجالية لسياسة إعداد التراب الوطني. (2ن)", points:2, redaction:true, lines:8,
        correction:"<b>سلّم التنقيط (2ن)</b> — تُنتظر الإشارة إلى المجالات السبعة وغاياتها:<br>• الأقاليم الشمالية والشرقية: تدعيم البعد الأورومتوسطي وتأهيل المجالات الحدودية؛<br>• المناطق الجبلية: المحافظة على الموارد الطبيعية وتحقيق التضامن المجالي؛<br>• البحر والساحل: تعزيز الانفتاح على الخارج وتدبير الموارد البحرية والحفاظ عليها؛<br>• المناطق الصحراوية: تحقيق الاندماج الجهوي وتدبير المجالات الهشّة؛<br>• المدارات السقوية: كسب رهان الأمن الغذائي وتحدّيات الانفتاح على الأسواق الخارجية؛<br>• مناطق البور: تحقيق الفعالية الاقتصادية والتوازنات المجالية؛<br>• الشبكة الحضرية: تأهيل المجالات الحضرية بإقرار تنمية شاملة مندمجة." }
    ]},
    { titre:"ثانيا: مادة التاريخ (الموضوع المقالي)", points:10, questions:[
      { q:"اكتب (ي) في أحد الموضوعين التاليين: ● الموضوع الأول: «عرفت الأوضاع الاجتماعية والفكرية بالعالم الرأسمالي خلال القرن 19، ومطلع القرن 20 عدّة تحوّلات». اكتب موضوعا مقاليا تبيّن من خلاله: التحوّلات الاجتماعية في العالم الرأسمالي خلال القرن 19م؛ التحوّلات الفكرية وبروز الحركة العمالية والنقابية؛ النتائج الاجتماعية للحرب العالمية الأولى. ● الموضوع الثاني: «تزامنت صيرورة اليقظة الفكرية بالمشرق العربي مع محاولات الإصلاحات التي عرفها المغرب خلال القرن 19م، لمواجهة الأطماع الأجنبية». اكتب موضوعا مقاليا تبيّن من خلاله: تعريف اليقظة الفكرية ودوافعها؛ إبراز أفكار التيار السلفي؛ تعريف إصلاحات المخزن المغربي وتفسير محدوديتها.", points:10, redaction:true, lines:22,
        correction:"<b>سلّم التنقيط (10ن)</b> — يُقوَّم الموضوع المقالي وفق ثلاثة مستويات:<br><b>المستوى المنهجي (2ن)</b>: مقدمة مناسبة 1ن؛ تصميم/عرض تحليلي منطقي 0.5ن؛ خاتمة مناسبة 0.5ن.<br><b>المستوى المعرفي (7ن)</b> — استحضار العناصر الأساسية دون التقيّد بالجزئيات:<br>— <u>الموضوع الأول</u>: التحوّلات الاجتماعية (النمو الديمغرافي والحضري وظهور المدن المليونية؛ خروج المرأة والأطفال للعمل ومعاناتهم من ظروف صعبة؛ الصراع الطبقي بين البورجوازية والطبقة العاملة)؛ التحوّلات الفكرية (المذهب الليبرالي الكلاسيكي، المذاهب الاشتراكية: الطوباوية والفوضوية ثم الاشتراكية العلمية مع ماركس وإنجلز) وبروز الحركة العمالية والنقابية ومكاسبها؛ النتائج الاجتماعية للحرب العالمية الأولى (خسائر بشرية حوالي 15 مليون، المعطوبون، ارتفاع كلفة الرعاية، تدهور الأوضاع المعيشية، الأرامل واليتامى، تراجع الفئة النشيطة).<br>— <u>الموضوع الثاني</u>: تعريف اليقظة الفكرية ودوافعها (سياسية: الحملة الفرنسية على مصر، إصلاحات محمد علي؛ ثقافية: البعثات الطلابية والجمعيات والمطبعة؛ اجتماعية: نمو طبقة وسطى والشعور القومي ضد التتريك)؛ أفكار التيار السلفي (الأفغاني، محمد عبده، الكواكبي: العودة إلى الكتاب والسنة، العدالة الاجتماعية وتعليم المرأة، نظام سياسي شوري والوحدة ضد الاستعمار)؛ إصلاحات المخزن المغربي (عسكرية وإدارية ومالية لسلاطين المغرب) وتفسير محدوديتها (داخليا: رفض الأعيان والعلماء وغياب نخبة متنوّرة؛ خارجيا: الكلفة المالية والاقتراض والغرامات وعرقلة الدول الأوربية).<br><b>المستوى الشكلي (1ن)</b>: لغة سليمة، خط واضح ومقروء، شكل مقبول في تقديم المنتوج." }
    ]}
  ]
});

/* ---------- التاريخ والجغرافيا — الجهوي فاس-مكناس 2021 (الدورة العادية) ---------- */
window.PB_EXAMS.push({
  id:"hg-fesmeknes-2021", subject:"hg", matiere:"التاريخ والجغرافيا", coef:2, official:true,
  region:"Fès-Meknès", annee:2021, session:"Ordinaire", lang:"ar",
  label:"الجهوي فاس-مكناس 2021 — رسمي",
  durationMin:120, total:20,
  consignes:"الامتحان الجهوي الموحّد للبكالوريا، السنة الأولى من سلك البكالوريا، الأكاديمية الجهوية فاس-مكناس (الدورة العادية 2021). مادة: التاريخ والجغرافيا. مدة الإنجاز: ساعتان. أولا: مادة التاريخ (الاشتغال بالوثائق) 10 نقط. ثانيا: مادة الجغرافيا (الموضوع المقالي) 10 نقط.",
  texte:{
    titre:"الوثائق (مادة التاريخ)",
    html:"<div class=\"docn\">الوثيقة رقم 1: إنتاج الصلب ببعض الدول الأوربية ما بين 1870م و1913م (بألف طن).</div>"
      +"<table><thead><tr><th>الدولة</th><th>1870</th><th>1890</th><th>1913</th></tr></thead><tbody>"
      +"<tr><td>أنجلترا</td><td>220</td><td>3580</td><td>7660</td></tr>"
      +"<tr><td>ألمانيا</td><td>130</td><td>2100</td><td>17320</td></tr>"
      +"<tr><td>فرنسا</td><td>80</td><td>670</td><td>4210</td></tr>"
      +"</tbody></table>"
      +"<p class=\"fn\">المصدر: أحمد حسن البرعي، «الثورة الصناعية وآثارها الاجتماعية والقانونية»، دار الفكر العربي، القاهرة 1982، ص 41 (بتصرّف).</p>"
      +"<div class=\"docn\">الوثيقة رقم 2:</div>"
      +"<p>...لقد أدّى تقدّم الثورة الصناعية إلى تطوّر النزعة الاستعمارية تطوّرا حادا جعل من تصريف البضائع والحصول على المواد الأولية وتوظيف رؤوس الأموال قضية من القضايا الأوربية الملحّة التي لم يجد رجال السياسة حلا لها إلا عن طريق امتلاك المستعمرات، فكان لابد من التصادم والنزاع بين القوى المستعمرة ذاتها، كذلك كان النزاع حول السيطرة على البحار خاصة بين بريطانيا التي تعتبر سيدة البحار وألمانيا الموحّدة التي طوّرت أسطولها بسرعة فائقة... أدّى التنافس الشديد بين القوى الأوربية من أجل توسيع مجالها الاستعماري إلى عقد اتفاقيات سرية وإقامة تحالفات عسكرية، فكانت كل من إنجلترا وفرنسا تبعا للوفاق الودّي عام 1904م قد تحالفتا، كما كان التحالف الثلاثي بين ألمانيا وإمبراطورية النمسا المجر وإيطاليا... وقد أفضت هذه التحالفات إلى سباق نحو التسلّح وتمديد فترة الخدمة العسكرية وزيادة عدد القوات المسلحة في كل من ألمانيا وفرنسا وروسيا...</p>"
      +"<p class=\"fn\">المصدر: الحسيني الحسيني معدّي، «موسوعة الحرب العالمية الأولى والثانية»، مطبعة دار الحرم للتراث، 2011، ص ص 6-7 (بتصرّف).</p>"
      +"<div class=\"docn\">الوثيقة رقم 3:</div>"
      +"<p>...لم يعد المخزن في صراعه مع الدول المتنافسة، يقوى على مراقبة تسرّب العنصر الأوربي بسبب الامتيازات الممنوحة لهم... فتحت معاهدة 1856 باب المنافسة على مصراعيه، ذلك أن كلا من فرنسا وإسبانيا صارتا تبحثان عن امتيازات مماثلة، لما حصلت عليه بريطانيا في المغرب. ولعل المجابهة مع إسبانيا في حرب تطوان 1860 تأتي في هذا السياق... لقد وضعت حرب تطوان حدا لهيبة المغرب، وأضيفت إلى هزيمة إيسلي العسكرية، الأمر الذي شجّع إسبانيا على توقيع اتفاقية تجارية وفرض شروطها عام 1861، ومن بين ما تضمّنته: تأكيد حق استيراد بضائع المغرب وصيد الأسماك على السواحل المغربية. كانت المعاهدة والاتفاقية الموقّعتان آنفا مع المغرب حافزا لفرنسا على المطالبة بالمثل... ووقعت معه تسوية (بيكلار) في 19 غشت 1863...</p>"
      +"<p class=\"fn\">المصدر: محمد العربي القبلي، «المغرب الأقصى في عهد السلطان الحسن الأول»، دار الغرب الإسلامي، ط1، 1989، ص ص 39-40 (بتصرّف).</p>"
      +"<div class=\"docn\">الوثيقة رقم 4:</div>"
      +"<p>...أولى المولى الحسن الأول عناية خاصة للزيادة في أعداد الجند وإجراء التداريب والبحث عن التكوين بهدف التحديث، كما أمر ببناء معملين للسلاح أحدهما في فاس والثاني بمراكش... وحرص على إيفاد البعثات الطلابية إلى الخارج قصد تكوين كفاءات مغربية... امتدّت الإصلاحات إلى الكثير من الميادين مثل المجال الفلاحي عبر تجربة زراعة القطن والحرير وقصب السكر، والمجال الصناعي بالتنقيب عن المعادن وتصفيتها، بالإضافة إلى إنشاء بعض المعامل مثل معمل السكر بمراكش والاهتمام بشق الطرق ومدّ الجسور وتنظيم البريد لتسهيل المواصلات... لكن كل هذه الإصلاحات مطوّقة بمختلف الصعوبات والعراقيل، لأسباب خارجية تكمن في الاعتماد على الوسائل والخبرات الأجنبية وعرقلتها لكل إصلاح، ولأسباب داخلية تكمن في انهيار البنية الديمغرافية بسبب الكوارث الطبيعية... زيادة على تحفّظ العلماء ورفضهم للإصلاحات لأن أغلبها كان محل انتقادهم في سياق تصديهم لكل بدعة محدثة، لأنهم كانوا يعتبرون أنها لا تخدم سوى المصالح الأجنبية...</p>"
      +"<p class=\"fn\">المصدر: محمد القبلي (إشراف وتقديم) «تاريخ المغرب، تحيين وتركيب»، منشورات المعهد الملكي للبحث في تاريخ المغرب، الرباط 2011، ص ص 488-495-496 (بتصرّف).</p>"
  },
  sections:[
    { titre:"أولا: مادة التاريخ (الاشتغال بالوثائق)", points:10, questions:[
      { q:"ضع (ي) الوثيقتين 1 و2 في سياقهما التاريخي (الزمن – المكان – الحدث). (1ن)", points:1, lines:4,
        correction:"<b>السياق التاريخي للوثيقتين 1 و2</b> (تُقبل الصيغتان المفكّكة والمدمجة):<br>• <b>الزمن</b>: القرن التاسع عشر ومطلع القرن العشرين؛<br>• <b>المكان</b>: أوربا؛<br>• <b>الموضوع/الحدث</b>: التحوّلات الصناعية وعلاقتها بالتنافس الإمبريالي." },
      { q:"اشرح (ي) المصطلحات التالية شرحا تاريخيا: الفكر الاشتراكي – السلفية – النازية – حرب تطوان. (2ن)", points:2, lines:6,
        correction:"<b>الفكر الاشتراكي</b>: الفكر الذي ظهر بأوربا خلال القرن 19 وتبنّى الدفاع عن الطبقة العاملة، ومن أشهر تياراته الاشتراكية العلمية.<br><b>السلفية</b>: تيار فكري ظهر بالمشرق العربي في القرن 19 ذو مرجعية دينية إسلامية يتوخّى إصلاح الأوضاع بالرجوع إلى الكتاب والسنة والاقتداء بالسلف الصالح، من أشهر روّاده جمال الدين الأفغاني ومحمد عبده.<br><b>النازية</b>: حركة متطرّفة ديكتاتورية ظهرت في ألمانيا شعارها الشعب الواحد والدولة الواحدة والقائد الواحد، تزعّمها هتلر، وكانت سببا في اندلاع الحرب العالمية الثانية.<br><b>حرب تطوان</b>: اندلعت بين إسبانيا والمغرب بين 1859-1860م وانتهت بهزيمة المغرب واحتلال تطوان. <i>(0.5ن لكل مصطلح.)</i>" },
      { q:"استخرج (ي) من الوثائق ما يلي: أ) من الوثيقتين 1 و2: مظاهر الثورة الصناعية والانعكاسات المترتبة عنها. (1ن)", points:1, lines:5,
        correction:"<b>مظاهر الثورة الصناعية</b>: ارتفاع الإنتاج الصناعي من الصلب بالبلدان الأوربية (أنجلترا، ألمانيا، فرنسا) ما بين 1870 و1913.<br><b>الانعكاسات المترتبة عنها</b>: رغبة البلدان الأوربية في امتلاك المستعمرات واحتدام التنافس الاستعماري بينها خاصة بين إنجلترا وألمانيا وفرنسا، وتكوين التحالفات العسكرية." },
      { q:"ب) من الوثيقة 3: الضغوط الممارسة على المغرب خلال القرن 19 وتصنيفها. (1ن)", points:1, lines:5,
        correction:"<b>الضغوط الممارسة على المغرب وتصنيفها</b>:<br>• <b>الضغط العسكري</b>: معركة إيسلي وحرب تطوان؛<br>• <b>الضغط الاقتصادي</b>: المعاهدة التجارية المغربية البريطانية 1856م، والاتفاقية الإسبانية المغربية 1861م؛<br>• <b>الضغط الدبلوماسي/السياسي</b>: اتفاقية بيكلار 1863م." },
      { q:"ج) من الوثيقة 4: الإصلاحات التي قام بها السلطان الحسن الأول وأسباب محدوديتها. (1ن)", points:1, lines:6,
        correction:"<b>الإصلاحات</b>: <u>عسكرية</u> (الزيادة في أعداد الجند وتسليحهم وتكوينهم، بناء معملين للسلاح بفاس ومراكش، إرسال البعثات الطلابية إلى الخارج)؛ <u>اقتصادية</u> (إدخال زراعة القطن والحرير وقصب السكر، التنقيب عن المعادن وتصفيتها، إحداث معمل السكر)؛ <u>أخرى</u> (شق الطرق، مدّ الجسور، تنظيم البريد).<br><b>أسباب محدوديتها</b>: <u>خارجية</u> (الاعتماد على الوسائل والخبرات الأجنبية ودسائس الدول الأجنبية وعرقلتها لكل إصلاح)؛ <u>داخلية</u> (انهيار البنية الديمغرافية بسبب الكوارث الطبيعية، تحفّظ العلماء ورفضهم للإصلاحات)." },
      { q:"ركّب (ي) الفكرة الأساس الرابطة بين الوثيقتين 3 و4. (2ن)", points:2, lines:5,
        correction:"<i>(تُقبل كل فكرة تفيد الآتي)</i>: <b>الضغوط الاستعمارية الأوربية على المغرب خلال القرن التاسع عشر ومحاولات الإصلاح التي قام بها المخزن لمواجهتها.</b>" },
      { q:"اكتب (ي) انطلاقا من مكتسباتك المعرفية فقرة تبرز (ين) عوامل بروز اليقظة الفكرية بالمشرق العربي خلال القرن 19م. (2ن)", points:2, redaction:true, lines:8,
        correction:"<b>عوامل بروز اليقظة الفكرية بالمشرق العربي</b> (تُقبل الأفكار التي تفيد الآتي):<br>• <b>عوامل سياسية</b>: تأثير الحملة الفرنسية على مصر، وإسهام محمد علي في اليقظة الفكرية بمصر؛<br>• <b>عوامل اجتماعية</b>: نمو طبقة اجتماعية وسطى، وتزايد الشعور القومي ضد سياسة التتريك، وتعليم المرأة؛<br>• <b>عوامل ثقافية</b>: البعثات الطلابية إلى الغرب، وظهور المدارس والمطبعة، وظهور الجمعيات الثقافية." }
    ]},
    { titre:"ثانيا: مادة الجغرافيا (الموضوع المقالي)", points:10, questions:[
      { q:"اكتب (ي) في واحد من الموضوعين التاليين حسب اختيارك: ● الموضوع الأول: «تواجه الموارد الطبيعية في كلّ من العالم العربي والمجال المغربي عدّة إكراهات استوجبت اتخاذ مجموعة من التدابير». اكتب موضوعا مقاليا بمقدمة وعرض وخاتمة تبرز (ين) فيه: تعريف المجال المغربي والموارد الطبيعية؛ وضعية الموارد الغابوية والبحرية بالمجال المغربي وأساليب تدبيرها؛ مظاهر مشكل الماء بالعالم العربي والعوامل المفسّرة له. ● الموضوع الثاني: «تواجه المدن والأرياف المغربية أزمات مختلفة، تعدّدت أشكال تدخّل الدولة لمعالجتها». اكتب موضوعا مقاليا تبرز (ين) فيه: مظاهر أزمة المدن والأرياف المغربية في المجالين الاقتصادي والاجتماعي؛ العوامل المفسّرة لأزمة المدينة المغربية؛ دور التدخّلات القطاعية وسياسة إعداد التراب الوطني في التخفيف من مشاكل الأرياف المغربية.", points:10, redaction:true, lines:22,
        correction:"<b>سلّم التنقيط (10ن)</b> — يُقوَّم وفق ثلاثة مستويات:<br><b>المنهجي (2ن)</b>: مقدمة 1ن؛ تصميم/عرض 0.5ن؛ خاتمة 0.5ن.<br><b>المعرفي (7ن)</b> — استحضار العناصر الأساسية دون التقيّد بالجزئيات:<br>— <u>الموضوع الأول</u>: تعريف المجال المغربي والموارد الطبيعية؛ وضعية الموارد الغابوية (التنوّع، ضعف المجال الغابوي، تراجع الغابة بـ31000 هكتار/سنة، تهديدات الاجتثاث والرعي الجائر والحرائق) وأساليب تدبيرها (مؤسساتية وقانونية، تقنية، تحسيسية)؛ وضعية الموارد البحرية (أكثر من 3500 كلم سواحل، تنوّع المنتجات، تهديد الاستنزاف) وأساليب تدبيرها؛ مظاهر مشكل الماء بالعالم العربي (موارد محدودة 0.5% من المياه المتجددة، تراجع نصيب الفرد) والعوامل المفسّرة له (طبيعية، ديمغرافية، اقتصادية، سياسية).<br>— <u>الموضوع الثاني</u>: مظاهر أزمة المدن (اقتصاديا واجتماعيا) والأرياف (اقتصاديا واجتماعيا)؛ العوامل المفسّرة لأزمة المدينة (ارتفاع وتيرة التمدين، ضعف النسيج الاقتصادي، سوء التدبير الحضري)؛ دور التدخّلات القطاعية (برامج التنمية القروية، المبادرة الوطنية للتنمية البشرية، الكهربة والماء الصالح للشرب والطرق القروية) وسياسة إعداد التراب الوطني في التخفيف من مشاكل الأرياف.<br><b>الشكلي (1ن)</b>: لغة سليمة، التعبير التاريخي/الجغرافي، شكل التقديم." }
    ]}
  ]
});

/* ---------- اللغة العربية — الجهوي فاس-مكناس 2024 (الدورة العادية) ---------- */
window.PB_EXAMS.push({
  id:"ar-fesmeknes-2024", subject:"arabe", matiere:"اللغة العربية", coef:2, official:true,
  region:"Fès-Meknès", annee:2024, session:"Ordinaire", lang:"ar",
  label:"الجهوي فاس-مكناس 2024 — رسمي",
  durationMin:120, total:20,
  consignes:"الامتحان الجهوي الموحّد للبكالوريا، السنة الأولى من سلك البكالوريا، الأكاديمية الجهوية فاس-مكناس (الدورة العادية 2024). مادة: اللغة العربية — جميع الشعب العلمية والتقنية. مدة الإنجاز: ساعتان. المعامل: 2. اقرأ النص قراءة متأنية، ثم أجب عن أسئلة المجالات الآتية.",
  texte:{
    titre:"نص الانطلاق — التواصل المباشر",
    html:"<p>في عصرنا الحالي، أصبحنا نتبادل كمّا هائلا من المحتويات التواصلية مثل الرسائل النصية القصيرة، والاتصالات الهاتفية، والتعليقات على محتويات مواقع التواصل الاجتماعي، و«الإعجاب» بما يروج فيها أو «المشاركة»...، لكن في المقابل، تراجعت الزيارات العائلية وجلسات الأهل والأصدقاء المتحلّقين حول كؤوس الشاي الساخن.</p>"
      +"<p>وأذكر أنني كنت أتلقّى صبيحة يوم العيد، عشرات الرسائل النصية من الأهل والأصدقاء وزملاء العمل تهنّئني بالعيد، أما رسائل التهنئة الإلكترونية، فتنطلق قبل العيد، وتمتلئ مواقع التواصل الاجتماعي ببطاقات التهنئة جميلة الأشكال والألوان، وكأنها نوع من إبراء الذمة، والتكفير عن ذنب عدم الزيارة المباشرة، فالكلّ أصبح يلقي اللوم على الوقت الذي لا يكفي لصلة الرحم واللقاء المباشر، دون أن نشعر أن المجتمع يعرف تحوّلا من نوع جديد، يغذّيه الحضور المتزايد لتكنولوجيا الاتصال؛ فقبل وسائل الاتصال الحديثة، كان الموظف البعيد يستغرق يوما أو يومين في السفر، ليشارك أهله فرحة العيد ثم يغادر صوب عمله في مساء اليوم نفسه!</p>"
      +"<p>وقبل بضع سنوات، أذكر إشهارا تلفزيونيا كان يُبثّ بكثرة حينها في الإعلام العمومي، عن خدمة جديدة لتحويل الأموال من خلال الهاتف المنتقل، ويُعرض فيه جرفيّ يحكي أنه كان يسافر صوب والديه مرّة كل شهر، وأنه الآن بفضل الخدمة الجديدة يُحوّل لهما النقود بكل سهولة، وفي أي وقت. وينتهي الإشهار بهذا الحلّ السحري، وكأنّ صلات التراحم تُختزل في إعطاء مبلغ مالي وتقديم تهنئة أو غيرها. وبالتالي، فلا داعي للسفر وزيارة الوالدين.</p>"
      +"<p>وتصاعد الأمر ليشمل مختلف مجالات الحياة اليومية؛ فخدمات الهاتف الذكي تتمّ كلّها بشكل آلي، أو عن طريق الاتصال بخدمة الزبائن الأوتوماتيكية، وكذلك حجوزات السفر بالطائرات أو القطارات، أو استخراج جوازات السفر، وأصبحنا لا نتوجّه إلى الإدارات والمصالح إلا في حالات عدم الرضا وتقديم الشكايات. ولا يتوقف الأمر عند هذا الحدّ، بل أصبح الفرد يكتفي بالاطمئنان على أهله هاتفيا، ولا يضطرّ إلى الحضور الفعلي إلا في حالة المشاكل العائلية أو الوفاة.</p>"
      +"<p>لقد أتاحت تكنولوجيا الاتصال للإنسان المعاصر إمكانيات تواصلية هائلة، لكن تجربة التواصل الإنساني المباشر غير قابلة للتعويض أو الاختزال؛ فالحضور الجسدي مفعم بالدلالات الإنسانية والعاطفية، التي تشيع الألفة ولو في غياب الكلمات: أحيانا يكون الصمت الإنساني، أكثر بلاغة ودفئا من الاتصال الآلي!</p>",
    source:"هشام المكّي: «حينما يكثر الاتصال ويقلّ اللقاء: تأمّلات في الحضور المتزايد لتكنولوجيا الاتصال»، مجلة أفكار، الرباط، العدد 6، ماي 2016، ص 29 وما بعدها (بتصرّف)."
  },
  sections:[
    { titre:"أولا: مجال درس النصوص", points:10, questions:[
      { q:"حدّد علاقة مضمون الفقرة الأخيرة من النص بالعنوان. (1ن)", points:1, lines:3,
        correction:"علاقة مضمون الفقرة الأخيرة بعنوان النص: علاقة <b>توضيح / تفسير</b>… <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"حدّد القضية المحورية التي يعالجها النص. (1ن)", points:1, lines:3,
        correction:"القضية المحورية التي يعالجها النص: <b>أهمية الحفاظ على التواصل الإنساني المباشر في عصر التكنولوجيا</b>… <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"اشرح، في حدود ثلاثة أسطر، القولة الآتية الواردة في الفقرة الثانية: «… فالكلّ أصبح يلقي اللوم على الوقت الذي لا يكفي لصلة الرحم واللقاء المباشر، دون أن نشعر أن المجتمع يعرف تحوّلا من نوع جديد …». (1ن)", points:1, lines:4,
        correction:"<i>يُقبل كل جواب يبيّن فيه المترشّح فهمه للقولة مع الالتزام بالحجم المطلوب.</i> (الفكرة: رغم انشغال الناس بحجّة ضيق الوقت عن صلة الرحم واللقاء المباشر، فإن المجتمع يشهد تحوّلا جديدا يغذّيه الاعتماد المتزايد على تكنولوجيا الاتصال على حساب العلاقات الإنسانية المباشرة.)" },
      { q:"استخرج من النص ثلاث عبارات دالّة على حقل التواصل الإنساني المباشر، وثلاث عبارات دالّة على حقل التواصل التكنولوجي، مستعينا بالجدول الآتي. (1.5ن)", points:1.5, lines:3,
        qHtml:"<table><thead><tr><th>التواصل الإنساني المباشر</th><th>التواصل التكنولوجي</th></tr></thead><tbody>"
          +"<tr><td><input class=\"tcell\" data-cell=\"مباشر 1\" aria-label=\"مباشر 1\"></td><td><input class=\"tcell\" data-cell=\"تكنولوجي 1\" aria-label=\"تكنولوجي 1\"></td></tr>"
          +"<tr><td><input class=\"tcell\" data-cell=\"مباشر 2\" aria-label=\"مباشر 2\"></td><td><input class=\"tcell\" data-cell=\"تكنولوجي 2\" aria-label=\"تكنولوجي 2\"></td></tr>"
          +"<tr><td><input class=\"tcell\" data-cell=\"مباشر 3\" aria-label=\"مباشر 3\"></td><td><input class=\"tcell\" data-cell=\"تكنولوجي 3\" aria-label=\"تكنولوجي 3\"></td></tr>"
          +"</tbody></table>",
        correction:"<b>التواصل الإنساني المباشر</b>: الحضور الجسدي؛ الزيارات العائلية؛ جلسات الأهل؛ الأصدقاء المتحلّقون (حول كؤوس الشاي)؛ صلة الرحم.<br><b>التواصل التكنولوجي</b>: الرسائل النصية القصيرة؛ رسائل التهنئة الإلكترونية؛ الاتصالات الهاتفية؛ التعليقات على محتويات مواقع التواصل. <i>(0.25ن لكل عبارة صحيحة؛ ثلاث عبارات لكل حقل.)</i>" },
      { q:"بيّن، انطلاقا من النص، أهمية التواصل الإنساني المباشر. (1ن)", points:1, lines:4,
        correction:"<b>أهمية التواصل الإنساني المباشر</b> (تُقبل كل إجابة مناسبة): الحضور الجسدي مفعم بالدلالات الإنسانية والعاطفية، يشيع الألفة ولو في غياب الكلمات، وهو تجربة غير قابلة للتعويض أو الاختزال، وأحيانا يكون الصمت الإنساني أبلغ وأدفأ من الاتصال الآلي." },
      { q:"استخدم النص مجموعة من الوسائل الحجاجية، من بينها التأكيد والتمثيل، مثّل لكلّ منهما بمثال من النص، وأبرز وظيفتهما. (1.5ن) — التأكيد: … — التمثيل: … — الوظيفة: …", points:1.5, lines:5,
        correction:"<b>التأكيد</b>: «لقد أتاحت تكنولوجيا الاتصال للإنسان المعاصر إمكانيات تواصلية هائلة…» (توكيد باللام و«قد»)؛<br><b>التمثيل</b>: «مثل الرسائل النصية القصيرة، والاتصالات الهاتفية، والتعليقات على محتويات مواقع التواصل الاجتماعي…»؛<br><b>الوظيفة</b>: <b>تفسيرية / إقناعية (حجاجية)</b>." },
      { q:"اكتب فقرة مركّزة، في حدود خمسة أسطر، تلخّص فيها قضايا النص، مبديا رأيك الشخصي في موقف الكاتب من التواصل التكنولوجي. (3ن)", points:3, redaction:true, lines:10,
        correction:"<b>سلّم التنقيط (3ن).</b> يُراعى في كتابة الفقرة المركّزة وإبداء الرأي الشخصي:<br>• تلخيص قضايا النص؛<br>• حضور الرأي الشخصي حول موقف الكاتب من التواصل التكنولوجي؛<br>• سلامة اللغة والالتزام بالحجم المطلوب." }
    ]},
    { titre:"ثانيا: مجال علوم اللغة", points:4, questions:[
      { q:"املأ الجدول الآتي بما يناسب مع الشكل (ضبط النسب). (2ن)", points:2, lines:3,
        qHtml:"<table><thead><tr><th>المنسوب إليه</th><th>المنسوب</th><th>التغيير الطارئ</th></tr></thead><tbody>"
          +"<tr><td>الإشهار</td><td><input class=\"tcell\" data-cell=\"منسوب الإشهار\" aria-label=\"منسوب الإشهار\"></td><td><textarea class=\"tcell\" data-cell=\"تغيير الإشهار\" rows=\"2\" aria-label=\"تغيير الإشهار\"></textarea></td></tr>"
          +"<tr><td>العائلة</td><td><input class=\"tcell\" data-cell=\"منسوب العائلة\" aria-label=\"منسوب العائلة\"></td><td><textarea class=\"tcell\" data-cell=\"تغيير العائلة\" rows=\"2\" aria-label=\"تغيير العائلة\"></textarea></td></tr>"
          +"</tbody></table>",
        correction:"<b>الإشهار</b> → المنسوب: <b>الإشهاريّ</b> · التغيير الطارئ: زيادة ياء مشدّدة في آخر الاسم وكسر ما قبلها.<br><b>العائلة</b> → المنسوب: <b>العائليّ</b> · التغيير الطارئ: حذف تاء التأنيث وزيادة ياء مشدّدة وكسر ما قبلها. <i>(0.5ن لكل خانة.)</i>" },
      { q:"إيتِ بمصدر الفعلين (أَسْهَمَ – غَادَرَ) ثم ركّب المصدرين في جملتين مفيدتين. (2ن)", points:2, lines:3,
        qHtml:"<table><thead><tr><th>الفعل</th><th>مصدره</th><th>تركيبه في جملة مفيدة</th></tr></thead><tbody>"
          +"<tr><td>أَسْهَمَ</td><td><input class=\"tcell\" data-cell=\"مصدر أسهم\" aria-label=\"مصدر أسهم\"></td><td><textarea class=\"tcell\" data-cell=\"جملة أسهم\" rows=\"2\" aria-label=\"جملة أسهم\"></textarea></td></tr>"
          +"<tr><td>غَادَرَ</td><td><input class=\"tcell\" data-cell=\"مصدر غادر\" aria-label=\"مصدر غادر\"></td><td><textarea class=\"tcell\" data-cell=\"جملة غادر\" rows=\"2\" aria-label=\"جملة غادر\"></textarea></td></tr>"
          +"</tbody></table>",
        correction:"<b>أَسْهَمَ</b> → مصدره: <b>إِسْهام</b> · يُنتج المترشّح جملة مفيدة تتضمّن المصدر «إسهام».<br><b>غَادَرَ</b> → مصدره: <b>مُغادَرة</b> · يُنتج المترشّح جملة مفيدة تتضمّن المصدر «مغادرة». <i>(0.5ن لكل خانة.)</i>" }
    ]},
    { titre:"ثالثا: مجال التعبير والإنشاء", points:6, questions:[
      { q:"«لقد أتاحت تكنولوجيا الاتصال للإنسان المعاصر إمكانيات تواصلية هائلة، لكن تجربة التواصل الإنساني المباشر غير قابلة للتعويض أو الاختزال …». انطلق من هذه الفكرة، واكتب موضوعا منسجما تستثمر فيه مكتسباتك في مهارة «توسيع فكرة»، وذلك في ما لا يقلّ عن عشرة أسطر، مراعيا: الالتزام بالمطلوب وتوظيف تقنيات المهارة؛ تسلسل الأفكار وترابطها؛ سلامة اللغة ووضع علامات الترقيم المناسبة.", points:6, redaction:true, lines:18,
        correction:"<b>سلّم التنقيط (6ن).</b> يُراعى في تقويم الإنجاز:<br>• الارتباط بالموضوع وتوظيف تقنيات مهارة «توسيع فكرة»: 3ن؛<br>• تسلسل الأفكار والربط المنطقي بين الجمل والفقرات: 1.5ن؛<br>• سلامة اللغة ووضع علامات الترقيم المناسبة: 1ن؛<br>• احترام الحجم المطلوب: 0.5ن.<br><br><b>نصيحة.</b> وسّع الفكرة بالشرح والتمثيل والتعليل والمقارنة، مع مقدمة وعرض وخاتمة." }
    ]}
  ]
});

/* ---------- اللغة العربية — الجهوي فاس-مكناس 2023 (الدورة العادية) ---------- */
window.PB_EXAMS.push({
  id:"ar-fesmeknes-2023", subject:"arabe", matiere:"اللغة العربية", coef:2, official:true,
  region:"Fès-Meknès", annee:2023, session:"Ordinaire", lang:"ar",
  label:"الجهوي فاس-مكناس 2023 — رسمي",
  durationMin:120, total:20,
  consignes:"الامتحان الجهوي الموحّد للبكالوريا، السنة الأولى من سلك البكالوريا، الأكاديمية الجهوية فاس-مكناس (الدورة العادية 2023). مادة: اللغة العربية — جميع الشعب العلمية والتقنية. مدة الإنجاز: ساعتان. المعامل: 2. اقرأ النص قراءة متأنية، ثم أجب عن أسئلة المجالات الآتية.",
  texte:{
    titre:"نص الانطلاق — دعم الإبداع",
    html:"<p>الإبداع بشكل عام هو «اكتشاف تطبيقات وموضوعات جديدة لم تكن من قبل»، ولكي يتحقّق الإبداع لا بد من اعتماد استراتيجية تضمن توفير بيئة مشجّعة على الإبداع والتفكير الإبداعي منذ التنشئة الأولى للإنسان في الأسرة والمدرسة والجامعة، بما يضمن الانتقال إلى مجتمع داعم للإبداع والمبدعين وقادر على توفير الشروط الضرورية لتمكين المبدعين من إثبات ذواتهم وتحقيق أحلامهم في مجال الإبداع والابتكار. وبدون توفّر البيئة الداعمة للإبداع، تبقى معظم المجهودات المبذولة في تطوير البنيات العلمية والإدارية والاجتماعية فاقدة لأثرها الجوهري والعميق في تطوير المجتمعات والدول. فعندما نقوم بتدريب أطر وعاملين في مجالات علمية وبحثية وإدارية في العالم العربي، من قِبل خبراء وباحثين في مؤسسات علمية ومختبرات بحث متطوّرة عالميا، لاكتساب مهارات وقدرات علمية عالية، فإن تطبيق ما تعلّموه وتدرّبوا عليه يصطدم بعدم وجود بيئة داعمة للإبداع، وبعد فترة زمنية يصبح ما تدرّبوا عليه وتعلّموه شيئا قديما لا يظهرُ أثرُه في أماكن العمل.</p>"
      +"<p>لهذا، ولكي تصبح لدينا بيئة مبدعة، لا بد أن تكون هناك ثقافة إبداعية في المجتمع، ولا بد من توفّر ما يسمى «رعاية الإبداع والابتكار» في كل المجتمعات. فالعالم العربي يزخر بالطاقات المبدعة، لكن عدم اعتماد سياسة تضمن توفير بيئة مُشجعة على الإبداع والتفكير الإبداعي يؤدي إلى ما يُسمى «نزيف الأدمغة»، فنسبة كبيرة من المبدعين في العالم العربي عندما لا يجدون البيئة المشجعة والداعمة للإبداع، ولا تتوفّر لهم فرص لتنفيذ مشاريعهم وابتكاراتهم، يضطرون للهجرة والبحث عن بيئة تساعدهم على الإبداع.</p>"
      +"<p>إن الحلّ لمواجهة ضياع ثروة العالم العربي من المبدعين والمبتكرين يتمثّل في دعم البحث العلمي ورعاية الموهوبين والباحثين المتميزين من قِبل الحكومات والشركات الخاصة، بتخصيص جزء من الأرباح للاستثمار في مجال رعاية الإبداع والابتكار، وتغيير ثقافة المجتمع في التعامل مع الإبداع والمبدعين باعتماد سياسة حكومية مُحفّزة للطاقات الواعدة، وقادرة على توفير مناخ داعم للإبداع في المدارس والجامعات. هذا بالإضافة إلى اعتماد سياسة مشجّعة للطاقات المبدعة والعقول المهاجرة للعودة إلى بلدانها الأصلية، وذلك بتبنّي مشاريعها وتمويلها وتقديم كل المساعدات الضرورية لتنفيذها.</p>",
    source:"ليلى حسام شاكر: «الإبداع بين الحماية والضياع»، مجلة الأمن والحياة، جامعة نايف العربية للعلوم الأمنية، الرياض، السعودية، العدد 391، 2014، ص 60 وما بعدها (بتصرّف)."
  },
  sections:[
    { titre:"أولا: مجال درس النصوص", points:10, questions:[
      { q:"حدّد علاقة مضمون الفقرة الثالثة بعنوان النص. (1ن)", points:1, lines:3,
        correction:"علاقة مضمون الفقرة الثالثة بعنوان النص: علاقة <b>تفسير / توضيح</b>… <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"حدّد القضية المحورية التي يعالجها النص. (1ن)", points:1, lines:3,
        correction:"القضية المحورية التي يعالجها النص: <b>أهمية توفير البيئة الداعمة للإبداع لتحقيق ثقافة إبداعية تشجّع على الإبداع والابتكار</b>… <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"اشرح، في حدود ثلاثة أسطر، القولة الآتية الواردة في النص: «… وبدون توفّر البيئة الداعمة للإبداع تبقى معظم المجهودات المبذولة في تطوير البنيات العلمية والإدارية والاجتماعية فاقدة لأثرها الجوهري والعميق في تطوير المجتمعات والدول». (1ن)", points:1, lines:4,
        correction:"<i>يُقبل كل جواب يبيّن فيه المترشّح فهمه للقولة مع الالتزام بالحجم المطلوب.</i> (الفكرة: بدون بيئة حاضنة وداعمة للإبداع، تفقد الجهود المبذولة في تطوير البنيات العلمية والإدارية والاجتماعية قيمتها وأثرها الحقيقي والعميق في تنمية المجتمعات والدول.)" },
      { q:"استخرج من النص عبارتين دالّتين على الإبداع، وعبارتين دالّتين على البيئة الداعمة للإبداع، ثم حدّد العلاقة بينهما مستعينا بالجدول الآتي. (1.5ن)", points:1.5, lines:4,
        qHtml:"<table><thead><tr><th>حقل الإبداع (0.5ن)</th><th>حقل البيئة الداعمة للإبداع (0.5ن)</th><th>العلاقة بين الحقلين (0.5ن)</th></tr></thead><tbody><tr><td><textarea class=\"tcell\" data-cell=\"عبارتان على الإبداع\" rows=\"3\" aria-label=\"عبارتان على الإبداع\"></textarea></td><td><textarea class=\"tcell\" data-cell=\"عبارتان على البيئة الداعمة\" rows=\"3\" aria-label=\"عبارتان على البيئة الداعمة\"></textarea></td><td><textarea class=\"tcell\" data-cell=\"العلاقة بين الحقلين\" rows=\"3\" aria-label=\"العلاقة بين الحقلين\"></textarea></td></tr></tbody></table>",
        correction:"<b>حقل الإبداع</b> (0.5): «اكتشاف تطبيقات وموضوعات جديدة لم تكن من قبل»؛ «الإبداع والتفكير الإبداعي»؛ «تحقيق أحلامهم في مجال الإبداع والابتكار».<br><b>حقل البيئة الداعمة للإبداع</b> (0.5): «اعتماد استراتيجية تضمن توفير بيئة مشجّعة على الإبداع»؛ «رعاية الإبداع والابتكار»؛ «دعم البحث العلمي ورعاية الموهوبين».<br><b>العلاقة بين الحقلين</b> (0.5): علاقة <b>ترابط / تكامل</b>… <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"أبرز، من خلال النص، الآثار السلبية لعدم وجود بيئة داعمة للإبداع في العالم العربي. (1ن)", points:1, lines:4,
        correction:"<b>الآثار السلبية لعدم وجود بيئة داعمة للإبداع</b>: «نزيف الأدمغة» وهجرة العقول من العالم العربي في اتجاه الدول المشجّعة للإبداع والمبدعين؛ وضياع ثروة العالم العربي من المبدعين والمبتكرين. <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"وظّف الكاتب مجموعة من الوسائل الحجاجية في النص، من بينها «التعريف» و«التأكيد»؛ استخرج مثالا لكل أسلوب ثم بيّن وظيفتهما. (1.5ن) — أسلوب التعريف: … — أسلوب التأكيد: … — الوظيفة: …", points:1.5, lines:5,
        correction:"<b>أسلوب التعريف</b>: «الإبداع بشكل عام هو اكتشاف تطبيقات وموضوعات جديدة لم تكن من قبل»؛<br><b>أسلوب التأكيد</b>: «إن الحلّ لمواجهة ضياع ثروة العالم العربي من المبدعين والمبتكرين يتمثّل في دعم البحث العلمي…» (توكيد بـ«إنّ»)؛<br><b>الوظيفة</b>: <b>إقناعية / تفسيرية</b>. <i>(تُقبل كل إجابة مناسبة)</i>." },
      { q:"اكتب فقرة مركّزة تلخّص فيها قضايا النص، مبديا رأيك الشخصي في أهمية دعم الإبداع والمبدعين، وذلك في حدود خمسة أسطر. (3ن)", points:3, redaction:true, lines:10,
        correction:"<b>سلّم التنقيط (3ن).</b> يُراعى في كتابة الفقرة المركّزة وإبداء الرأي الشخصي:<br>• تلخيص قضايا النص؛<br>• حضور الرأي الشخصي حول أهمية دعم الإبداع والمبدعين؛<br>• سلامة اللغة والالتزام بالحجم المطلوب." }
    ]},
    { titre:"ثانيا: مجال علوم اللغة", points:4, questions:[
      { q:"استخرج من الفقرة الأولى اسمين منسوبين، ثم املأ الجدول الآتي مع الشكل. (2ن)", points:2, lines:3,
        qHtml:"<table><thead><tr><th>الاسم المنسوب (0.5ن)</th><th>الاسم المنسوب إليه (0.25ن)</th><th>التغيير الطارئ (0.25ن)</th></tr></thead><tbody>"
          +"<tr><td><input class=\"tcell\" data-cell=\"المنسوب 1\" aria-label=\"المنسوب 1\"></td><td><input class=\"tcell\" data-cell=\"المنسوب إليه 1\" aria-label=\"المنسوب إليه 1\"></td><td><textarea class=\"tcell\" data-cell=\"التغيير 1\" rows=\"2\" aria-label=\"التغيير 1\"></textarea></td></tr>"
          +"<tr><td><input class=\"tcell\" data-cell=\"المنسوب 2\" aria-label=\"المنسوب 2\"></td><td><input class=\"tcell\" data-cell=\"المنسوب إليه 2\" aria-label=\"المنسوب إليه 2\"></td><td><textarea class=\"tcell\" data-cell=\"التغيير 2\" rows=\"2\" aria-label=\"التغيير 2\"></textarea></td></tr>"
          +"</tbody></table>",
        correction:"<b>1</b> — الاسم المنسوب: <b>الإبداعيّ</b> · المنسوب إليه: الإبداع · التغيير الطارئ: زيادة ياء مشدّدة في آخر الاسم وكسر ما قبلها.<br><b>2</b> — الاسم المنسوب: <b>عِلْميّة</b> · المنسوب إليه: عِلم · التغيير الطارئ: زيادة ياء مشدّدة وكسر ما قبلها (مع تاء التأنيث). <i>(تُقبل كل نسبة صحيحة من الفقرة الأولى.)</i>" },
      { q:"ركّب جملتين مفيدتين، من إنتاجك الشخصي، بحيث تتضمّن الأولى أمرا بصيغة فعل مضارع مقترن بلام الأمر، والثانية استعارة تصريحية. (2ن) — الجملة الأولى: … — الجملة الثانية: …", points:2, lines:4,
        correction:"<i>يُنتج المترشّح جملتين مفيدتين تتضمّن كلٌّ منهما الظاهرة اللغوية المطلوبة:</i><br>• الأولى: <b>أمر بصيغة فعل مضارع مقترن بلام الأمر</b> (مثال: لِنعمَلْ على دعم المبدعين)؛<br>• الثانية: <b>استعارة تصريحية</b> (مثال: رأيتُ بدرا يُلقي محاضرة — بتصريح المشبّه به «بدرا» وحذف المشبّه «العالِم»)." }
    ]},
    { titre:"ثالثا: مجال التعبير والإنشاء", points:6, questions:[
      { q:"«لقد مكّن الإبداعُ الإنسانَ من قدرة كبيرة للسيطرة على الطبيعة ويسّر له العيش بشكل أفضل وأكثر سعادة …». انطلق من هذه الفكرة، واكتب موضوعا منسجما تستثمر فيه مكتسباتك في مهارة «توسيع فكرة»، وذلك في ما لا يقلّ عن عشرة أسطر، مراعيا: الالتزام بالمطلوب وتوظيف تقنيات المهارة؛ تسلسل الأفكار وترابطها؛ سلامة اللغة ووضع علامات الترقيم المناسبة.", points:6, redaction:true, lines:18,
        correction:"<b>سلّم التنقيط (6ن).</b> يُراعى في تقويم الإنجاز:<br>• الالتزام بالمطلوب وتوظيف تقنيات مهارة «توسيع فكرة»: 3ن؛<br>• تسلسل الأفكار وترابطها: 1ن؛<br>• سلامة اللغة ووضع علامات الترقيم المناسبة: 1.5ن؛<br>• الالتزام بالحجم المطلوب: 0.5ن.<br><br><b>نصيحة.</b> وسّع الفكرة بالشرح والتمثيل والتعليل والمقارنة، مع مقدمة وعرض وخاتمة." }
    ]}
  ]
});

/* ---------- التربية الإسلامية — الجهوي فاس-مكناس 2023 (الدورة العادية) ---------- */
window.PB_EXAMS.push({
  id:"isl-fesmeknes-2023", subject:"islam", matiere:"التربية الإسلامية", coef:2, official:true,
  region:"Fès-Meknès", annee:2023, session:"Ordinaire", lang:"ar",
  label:"الجهوي فاس-مكناس 2023 — رسمي",
  durationMin:90, total:20,
  consignes:"الامتحان الجهوي الموحّد للبكالوريا، السنة الأولى من سلك البكالوريا، الأكاديمية الجهوية فاس-مكناس (الدورة العادية 2023). مادة: التربية الإسلامية — جميع الشعب العلمية والتقنية. مدة الإنجاز: ساعة ونصف. المعامل: 2. تمعّن في سياق الوضعية وأسنادها، ثم أجب عن الأسئلة التالية بتركيز.",
  texte:{
    titre:"الوضعية التقويمية وأسنادها",
    html:"<div class=\"docn\">سياق الوضعية:</div>"
      +"<p>وجّه «عمر» دعوة لصديقه الفرنسي «دافيد»، لزيارته في بلده المغرب؛ وبعد مرور أيام، وبينما هما يتجوّلان في شوارع المدينة؛</p>"
      +"<p>قال «دافيد»: لاحظتُ أنّك غيرُ مرتبط بأيّ فتاة؟ فردّ «عمر» قائلا: لم تتيسّر لي ظروف الزواج بعدُ، والفتاة المناسبة؛ قال «دافيد»: أنا لا أرى الزواج ضروريا، ما دام بإمكاني أن أُشبع غريزتي الجنسية، بدون عقد زواج؛ قال «عمر»: أنتم جعلتم العلاقة الجنسية غاية، ونحن نراها وسيلة لبناء الأسرة، ونعتقد أن الزواج يحفظ حق الغير، وخاصة المرأة والأطفال، ويحفظ حق الله في حماية المجتمع من الفواحش؛ قال «دافيد»: هذه كلها مسؤوليات زائدة، وأنا يكفيني مسؤوليتي على نفسي، ولا أعترف بشيء اسمه حق الله، وأنا لا تسؤوني بالفواحش؛ قال «عمر»: نحن المسلمين يرشدنا الإيمان إلى أن الحياة الدنيا حياة ابتلاء واختبار، وأن تحمّل الأمانة والمسؤولية من الإيمان؛ والزواج من أسس عمارة الأرض وإصلاحها.</p>"
      +"<div class=\"docn\">الأسناد الداعمة:</div>"
      +"<p><b>السند الأول</b> — قال تعالى في سورة يوسف: ﴿قَالَ هَلْ عَلِمْتُمْ مَا فَعَلْتُمْ بِيُوسُفَ وَأَخِيهِ إِذْ أَنْتُمْ جَاهِلُونَ ۝ قَالُوا أَإِنَّكَ لَأَنْتَ يُوسُفُ ۖ قَالَ أَنَا يُوسُفُ وَهَٰذَا أَخِي ۖ قَدْ مَنَّ اللَّهُ عَلَيْنَا ۖ إِنَّهُ مَنْ يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ﴾ (الآيتان 89-90).</p>"
      +"<p><b>السند الثاني</b> — «إنّ التوحيد (الإيمان) الإسلامي، ليس مجرّد تصوّر فلسفي لعلاقة الإنسان بالخالق، وإنما هو ثورة تحريرية، تُعتق الإنسان بكل طاقاته، من العبودية لكل الأشياء؛ إنه التحقيق الكامل لانتماء هذا الإنسان إلى الله، وهو الانتماء الذي يعصم الإنسان من كل أنواع الضعف، فإذا غاب هذا المفهوم للتوحيد، فلا عاصم للإنسان من عبادة اللذة والشهوات والذات والمال، كما هو حال الحضارة الغربية اليوم». (معالم المنهج الإسلامي، د. محمد عمارة، ص 33، دار السلام).</p>"
      +"<div class=\"docn\">السند الثالث: تطوّر ولادات الأمهات العازبات في بعض الدول الأوروبية بالنسبة المئوية ما بين 1980 و2007 (%).</div>"
      +"<table><thead><tr><th>الدولة</th><th>1980 (%)</th><th>2007 (%)</th></tr></thead><tbody>"
      +"<tr><td>إيسلندا</td><td>40</td><td>66</td></tr>"
      +"<tr><td>السويد</td><td>40</td><td>55</td></tr>"
      +"<tr><td>النرويج</td><td>15</td><td>54</td></tr>"
      +"<tr><td>فرنسا</td><td>11</td><td>50</td></tr>"
      +"<tr><td>الدانمارك</td><td>12</td><td>44</td></tr>"
      +"<tr><td>إنجلترا</td><td>18</td><td>40</td></tr>"
      +"<tr><td>أمريكا</td><td>4</td><td>40</td></tr>"
      +"<tr><td>إيرلندا</td><td>5</td><td>33</td></tr>"
      +"<tr><td>ألمانيا</td><td>12</td><td>30</td></tr>"
      +"<tr><td>كندا</td><td>13</td><td>30</td></tr>"
      +"</tbody></table>"
      +"<p class=\"fn\">المصدر: CDC/National Center for Health Statistics، مايو 2009. مؤرشف من الأصل في 28-04-2019. اطّلع عليه بتاريخ 24-09-2011.</p>"
      +"<p><b>السند الرابع</b> — «المثل الأعلى الذي يلائم طبيعة الإنسان، يتكوّن من عنصرين رئيسين: غاية للحياة، ووسيلة لتحقيق تلك الغاية؛ والإنسان يشعر باللذة والسعادة حين تتكامل في وجوده الغاية والوسيلة، ولكنه يفقد السعادة ويشعر بالشقاء إذا حصل على الوسيلة دون الغاية، فالأسرة وإنجاب الأبناء، هي بعض مكوّنات الغاية، والوسيلة إلى هذه الغاية هي الزواج». (د. ماجد الكيلاني، فلسفة التربية الإسلامية، ص 114، دار الريان).</p>"
  },
  sections:[
    { titre:"الوضعية التقويمية", points:20, questions:[
      { q:"ما هي المشكلة التي تثيرها الوضعية؟ (1ن)", points:1, lines:3,
        correction:"<b>المشكلة التي تثيرها الوضعية</b>: الاختلاف بين الصديقين حول العلاقة الجنسية بغير عقد زواج (هل عقد الزواج ضروري في العلاقة بين الجنسين؟). <i>(تُقبل العبارة الدالة على المشكلة بشرط مراعاة الهدف.)</i>" },
      { q:"لخّص بأسلوبك الخاص موقف الصديق الفرنسي من الزواج مع تعليلاته، في سياق ردوده على «عمر»؟ (1ن)", points:1, lines:4,
        correction:"يلخّص المترشّح موقف الفرنسي مبرزا أهم عناصره الحجاجية:<br>• أن الزواج غير ضروري في العلاقة الجنسية؛<br>• أن الزواج فيه مسؤولية زائدة؛<br>• أن العلاقة الجنسية شيء عادي بالنسبة له؛<br>• أنه لا يعترف بما يسمى حق الله وحق الغير والفواحش. <i>(0.25 للعبارة السليمة، و0.25 لكل عنصر من عناصر الحجاج.)</i>" },
      { q:"أكّد عمر على ضرورة الزواج الشرعي؛ بيّن المفهوم الاصطلاحي للزواج في الإسلام؟ (1ن)", points:1, lines:4,
        correction:"<b>المفهوم الاصطلاحي للزواج</b>: ميثاق تراضٍ وترابط شرعي بين رجل وامرأة على وجه الدوام، غايته الإحصان والعفاف وإنشاء أسرة مستقرة، برعاية الزوجين. <i>(0.25 للعبارة السليمة، و0.75 للعناصر مكتملة.)</i>" },
      { q:"استخرج من كلام المتحاورَيْن كلّ ما يدخل في عمارة الأرض وكلّ ما يدخل في إفسادها؟ (1.5ن)", points:1.5, lines:3,
        qHtml:"<table><thead><tr><th>ما يدخل في عمارة الأرض وإصلاحها</th><th>ما يدخل في إفساد الأرض</th></tr></thead><tbody>"
          +"<tr><td><input class=\"tcell\" data-cell=\"عمارة 1\" aria-label=\"عمارة 1\"></td><td><input class=\"tcell\" data-cell=\"إفساد 1\" aria-label=\"إفساد 1\"></td></tr>"
          +"<tr><td><input class=\"tcell\" data-cell=\"عمارة 2\" aria-label=\"عمارة 2\"></td><td><input class=\"tcell\" data-cell=\"إفساد 2\" aria-label=\"إفساد 2\"></td></tr>"
          +"<tr><td><input class=\"tcell\" data-cell=\"عمارة 3\" aria-label=\"عمارة 3\"></td><td><input class=\"tcell\" data-cell=\"إفساد 3\" aria-label=\"إفساد 3\"></td></tr>"
          +"</tbody></table>",
        correction:"<b>ما يدخل في عمارة الأرض وإصلاحها</b>: الزواج الشرعي؛ حفظ حق الله؛ حفظ حق الغير؛ منع تفشّي الفواحش؛ الأمانة والمسؤولية.<br><b>ما يدخل في إفساد الأرض</b>: الحرية المطلقة؛ إنكار حق الله؛ عدم إنكار الفواحش؛ المسؤولية الفردية. <i>(0.25ن لكل عنصر في حدود ستة عناصر.)</i>" },
      { q:"قال عمر: «الحياة الدنيا حياة ابتلاء واختبار»؛ اذكر مشهدين من مشاهد الابتلاء التي عاشها يوسف وأبوه يعقوب عليهما السلام، متمّما الآيات الدالة عليها حسب الجدول الآتي. (2.5ن)", points:2.5, lines:3,
        qHtml:"<table><thead><tr><th>عنوان المشهد</th><th>ما يدلّ عليه من سورة يوسف (أتمّ الآية)</th></tr></thead><tbody>"
          +"<tr><td><input class=\"tcell\" data-cell=\"عنوان المشهد 1\" aria-label=\"عنوان المشهد 1\"></td><td>«وَرَاوَدَتْهُ الَّتِي هُوَ فِي بَيْتِهَا … <textarea class=\"tcell\" data-cell=\"إتمام الآية 1\" rows=\"2\" aria-label=\"إتمام الآية 1\"></textarea> … المُخْلَصِينَ»</td></tr>"
          +"<tr><td><input class=\"tcell\" data-cell=\"عنوان المشهد 2\" aria-label=\"عنوان المشهد 2\"></td><td>«وَجَاءُوا أَبَاهُمْ عِشَاءً … <textarea class=\"tcell\" data-cell=\"إتمام الآية 2\" rows=\"2\" aria-label=\"إتمام الآية 2\"></textarea> … تَصِفُونَ»</td></tr>"
          +"</tbody></table>",
        correction:"<b>المشهد 1</b>: دعوة إلى الفاحشة (مراودة امرأة العزيز ليوسف) → ﴿وَرَاوَدَتْهُ الَّتِي هُوَ فِي بَيْتِهَا عَنْ نَفْسِهِ وَغَلَّقَتِ الْأَبْوَابَ وَقَالَتْ هَيْتَ لَكَ … إِنَّهُ مِنْ عِبَادِنَا الْمُخْلَصِينَ﴾ (يوسف 23-24).<br><b>المشهد 2</b>: فقدان يعقوب لابنه يوسف → ﴿وَجَاءُوا أَبَاهُمْ عِشَاءً يَبْكُونَ … قَالَ بَلْ سَوَّلَتْ لَكُمْ أَنْفُسُكُمْ أَمْرًا فَصَبْرٌ جَمِيلٌ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ﴾ (يوسف 16-18). <i>(1ن على إكمال الآية، 0.25ن لذكر المشهد؛ تُخصم ربع نقطة لكل خطأ تقديم أو تأخير أو ترك كلمة.)</i>" },
      { q:"احتجّ الفرنسي بأن الزواج مسؤولية زائدة؛ استنبط من خلال السند الأول، القيم التي تجعل المسلم يتحمّل المسؤولية التي كُلّف بها، مبيّنا له آثارها؟ (1.5ن)", points:1.5, lines:6,
        correction:"يستنبط المترشّح من السند قيم: <b>التقوى والصبر والإحسان</b>؛ ويبيّن آثارها في ثبات المسلم وتحمّله للمسؤولية وعدم تضييع الله لأجر المحسنين. <i>(0.25 للعبارة والأسلوب، 0.50 للقيم المستنبطة، 0.50 لبيان آثار القيم.)</i>" },
      { q:"قال «عمر»: نحن نعتقد أن الزواج يحفظ حق الغير، وخاصة حقوق الأطفال والمجتمع؛ اذكر منها ثلاثة حقوق يأمُر الإسلام بحفظها؟ (1.5ن)", points:1.5, lines:3,
        qHtml:"<table><thead><tr><th>حقوق الأطفال</th><th>حقوق المجتمع</th></tr></thead><tbody>"
          +"<tr><td><input class=\"tcell\" data-cell=\"حق الأطفال 1\" aria-label=\"حق الأطفال 1\"></td><td><input class=\"tcell\" data-cell=\"حق المجتمع 1\" aria-label=\"حق المجتمع 1\"></td></tr>"
          +"<tr><td><input class=\"tcell\" data-cell=\"حق الأطفال 2\" aria-label=\"حق الأطفال 2\"></td><td><input class=\"tcell\" data-cell=\"حق المجتمع 2\" aria-label=\"حق المجتمع 2\"></td></tr>"
          +"<tr><td><input class=\"tcell\" data-cell=\"حق الأطفال 3\" aria-label=\"حق الأطفال 3\"></td><td><input class=\"tcell\" data-cell=\"حق المجتمع 3\" aria-label=\"حق المجتمع 3\"></td></tr>"
          +"</tbody></table>",
        correction:"<b>حقوق الأطفال</b>: حق التعليم – حق النفقة – حق النسب.<br><b>حقوق المجتمع</b>: الوقاية من الفواحش – صيانة الأنساب – الحدّ من ظاهرة الأطفال المتخلّى عنهم – تكوين أسرة التي هي نواة المجتمع. <i>(0.25ن لكل حق في حدود ثلاثة حقوق لكل طرف.)</i>" },
      { q:"يرى الفرنسي أنه بإمكانه إشباع غريزته خارج إطار الزواج، دون اعتراف بحق الله ولا بخطورة الفواحش؛ انتقد هذا الرأي باعتمادك على السند الثاني والثالث؟ (2ن)", points:2, lines:7,
        correction:"يكتب المترشّح فقرة سليمة؛ يستفيد من <b>السند الثاني</b> أن التوحيد/الإيمان تحريرٌ للإنسان من عبودية الأشياء، وأن الانتماء إلى الله يعصمه من كل أنواع الضعف، وأن غياب هذا المفهوم يجعله عبدا للذة والشهوات؛ ويستنتج من إحصائيات <b>السند الثالث</b> خطورة الحرية في العلاقات الجنسية من خلال ارتفاع ظاهرة الولادات غير الشرعية بالدول الأوروبية ما بين 1980 و2007، وما فيها من ضياع لحقوق الطفل والأبوّة والأسرة المستقرة. <i>(0.25 للسلامة اللغوية، 0.50 لكل مؤشّر من المؤشّرات الخمسة، 0.50 على الالتزام باستثمار السندين.)</i>" },
      { q:"يقتدي المسلم برسول الله صلى الله عليه وسلم في جميع شؤونه؛ ادعم تعليل عمَر لموقفه من تحمّل مسؤولية الزواج بتوظيف ما تعرفه من قيم في حياة النبي صلى الله عليه وسلم؟ (2ن)", points:2, lines:7,
        correction:"يستحضر المترشّح مكتسباته من درس «الرسول صلى الله عليه وسلم في بيته»؛ ويذكر القيم التي يبرزها الدرس ومنها: <b>الرحمة واللطف والتعاون والعدل</b>؛ كما يمكنه استحضار قيمة <b>التشاور</b> من درس التفاوض والتشاور؛ مع بيان علاقة هذه القيم بتحمّل المسؤولية في الزواج. <i>(0.25 عن كل قيمة، و1ن لباقي المؤشّرات.)</i>" },
      { q:"ساندْ «عمر» في ردّه على قول «دافيد»: «إن الزواج ليس ضروريا في العلاقة بين الجنسين»؛ معتمدا السند الرابع؟ (1.5ن)", points:1.5, lines:6,
        correction:"يكتب المترشّح فقرة سليمة؛ ويستفيد من السند الرابع أن طبيعة الإنسان تقتضي أن يجمع بين الغاية والوسيلة، وأن سعادته في طلب الغاية بالوسيلة المشروعة، وأن بناء الأسرة وحفظ الحقوق هي الغاية الأسمى، فالزواج هو الوسيلة الشرعية لتحقيقها؛ مع الالتزام بمضامين السند. <i>(0.25 للعبارة والتركيب، و1.25 لباقي المؤشّرات.)</i>" },
      { q:"لو أراد «عمر» أن يتزوّج واستشارك في بعض أحكام الزواج، بماذا تجيبه؟ (2ن)", points:2, lines:3,
        qHtml:"<table><thead><tr><th>موضوع الاستشارة</th><th>مقبول / غير مقبول شرعا</th><th>تعليل جوابك</th></tr></thead><tbody>"
          +"<tr><td>نظرا لأخلاقه الحسنة قرّرت المرأة أن تعقد الزواج به بدون صداق.</td><td><input class=\"tcell\" data-cell=\"حكم 1\" aria-label=\"حكم 1\"></td><td><textarea class=\"tcell\" data-cell=\"تعليل 1\" rows=\"2\" aria-label=\"تعليل 1\"></textarea></td></tr>"
          +"<tr><td>المرأة التي اختارها للزواج تُوفّي زوجها قبل شهر، وهي حامل في شهرها التاسع، وأراد أن يخطبها بعد الوضع بيومين.</td><td><input class=\"tcell\" data-cell=\"حكم 2\" aria-label=\"حكم 2\"></td><td><textarea class=\"tcell\" data-cell=\"تعليل 2\" rows=\"2\" aria-label=\"تعليل 2\"></textarea></td></tr>"
          +"</tbody></table>",
        correction:"<b>1</b> — <b>غير مقبول شرعا</b> · التعليل: الصداق ركن من أركان الزواج ويجب ألّا يتّفقا على إسقاطه.<br><b>2</b> — <b>مقبول شرعا</b> · التعليل: لأن عدّتها تكتمل بوضع الحمل (عدّة الحامل أن تضع حملها)، فيجوز خطبتها بعد الوضع. <i>(1ن عن كل جواب صحيح بتعليله؛ لا يُقبل الجواب بدون تعليل.)</i>" },
      { q:"اكتب في حدود ستة أسطر موقفك من النقاش الذي دار بين عمر وصديقه: أ- موظّفا المفاهيم والقيم التالية: عمارة الأرض – الإيمان بالغيب – الزواج – الحياء؛ ب- مستشهدا على قيمة واحدة منها بما يدلّ عليها من سورة يوسف. (2.5ن)", points:2.5, redaction:true, lines:10,
        correction:"<b>سلّم التنقيط (2.5ن)</b> — يكتب المترشّح فقرة سليمة وخالية من الأخطاء:<br>• يبيّن أن الزواج ضروري للعلاقة بين الجنسين؛<br>• يبيّن أثر قيمة الحياء على الإنسان؛<br>• يبيّن أن عمارة الأرض مقصد إيماني ويذكر بعض أسسه؛<br>• يبيّن أن الإيمان بالغيب هو ما يدفع الإنسان إلى البحث عن السعادة الخالدة، وأن الحياة الدنيا للابتلاء لا للجزاء؛<br>• يستشهد بما يناسب من سورة يوسف.<br><i>(0.25 للعبارة والتركيب، 1ن لذكر الاستشهاد المناسب - تُخصم 0.25 عن كل خطأ في الآية، 1.25 لباقي المؤشّرات.)</i>" }
    ]}
  ]
});

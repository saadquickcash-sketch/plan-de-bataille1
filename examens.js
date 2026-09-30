/* ===== Espace d'examen — Régional 1ère Bac (programme marocain) =====
   Sujets officiels (Académie Fès-Meknès) : questions, barème et corrigé officiels intégrés fidèlement.
   Les TEXTES SUPPORTS, quand ce sont des extraits d'œuvres protégées, ne sont pas reproduits ici
   (droits d'auteur) : l'élève les lit dans son manuel / le PDF officiel. Correction = corrigé officiel.
   Schéma : { id, subject, matiere, coef, label, official, durationMin, total, consignes,
     texte:{titre, html, note, source}?, sections:[ {titre, points, questions:[ {q, points, lines?, redaction?, correction} ] } ] } */
window.PB_EXAMS = window.PB_EXAMS || [];

/* ---------- Français — Régional Fès-Meknès 2024 (session ordinaire) ---------- */
window.PB_EXAMS.push({
  id:"fr-fesmeknes-2024", subject:"francais", matiere:"Français", coef:4, official:true,
  label:"Régional Fès-Meknès 2024 — officiel",
  durationMin:120, total:20,
  consignes:"Examen régional unifié, 1ère année du baccalauréat, Académie Fès-Meknès (session ordinaire 2024). Durée : 2 h. Lis d'abord le texte support (dans ton manuel ou le PDF officiel), puis traite l'étude de texte et la production écrite. Attribue-toi les points à la fin en te comparant au corrigé officiel.",
  texte:{
    titre:"Texte support — « La Boîte à merveilles », Ahmed Sefrioui",
    html:"<p><b>📖 Extrait à lire dans ton manuel ou le PDF officiel du sujet.</b></p><p>Le narrateur, <b>Sidi Mohamed</b>, raconte comment, après avoir dirigé le nettoyage du <i>Msid</i> pour préparer la fête de l'<b>Achoura</b>, il rentre à la maison épuisé mais très fier de sa journée. Il se vante de ses exploits devant ses parents, puis se réjouit à l'idée d'avoir bientôt de nouveaux habits de fête. Les questions et le corrigé ci-dessous portent sur ce passage.</p>",
    note:"Extrait d'une œuvre protégée (La Boîte à merveilles, A. Sefrioui, 1954) — non reproduit ici pour des raisons de droits d'auteur. Compose avec le passage sous les yeux (manuel ou PDF officiel).",
    source:"Sujet officiel — Examen régional, Académie régionale Fès-Meknès, session ordinaire 2024."
  },
  sections:[
    { titre:"I. Étude de texte", points:10, questions:[
      { q:"Recopie et complète le tableau suivant par les informations qui conviennent : Nom de l'auteur — Titre de l'œuvre — Date de publication — Nom du narrateur. (0,25×4)", points:1, lines:3,
        correction:"<b>Ahmed Sefrioui</b> (0,25) · <b>La Boîte à merveilles</b> (0,25) · <b>1954</b> (0,25) · <b>Sidi Mohamed</b> (0,25)." },
      { q:"Pour situer ce texte dans l'œuvre : a) De quelle activité le fqih avait-il chargé ses élèves pour se préparer à la fête de l'Achoura ? (0,5)  b) De quel rôle avait-il chargé le narrateur ? (0,5)", points:1, lines:3,
        correction:"a) <b>Le nettoyage du Msid</b> (accepter toute formulation allant dans ce sens). b) Il a été chargé du rôle de <b>chef des frotteurs</b>." },
      { q:"a) Dans quel état physique le narrateur se trouve-t-il à son retour à la maison ? (0,5)  b) Quelle figure de style emploie-t-il pour mettre en valeur l'intensité de cet état physique ? (0,5)", points:1, lines:3,
        correction:"a) Il était <b>fatigué / épuisé</b> (accepter toute formulation allant dans ce sens). b) Il s'agit d'une <b>hyperbole</b>." },
      { q:"« Le petit enfant est épuisé ; il est très content de sa journée. » Relie les deux propositions en employant « bien que ».", points:0.5, lines:2,
        correction:"<b>Bien que</b> le petit enfant <b>soit</b> épuisé, il est très content de sa journée. (ou : Le petit enfant est très content de sa journée bien qu'il soit épuisé.) — On exige le subjonctif après « bien que »." },
      { q:"Recopie et complète le tableau d'après ta compréhension du texte (0,5×3) : ligne 1 — Sentiment : « Fierté » / Raison : … / Geste : « hurle des ordres » ou « distribue des injures » ; ligne 2 — Sentiment : … / Raison : « Achat de nouveaux vêtements » / Geste : « … ».", points:1.5, lines:4,
        correction:"Ligne 1 — Raison de la fierté : <b>participation au nettoyage comme chef des frotteurs</b> (0,5). Ligne 2 — Sentiment : <b>Enthousiasme / Joie</b> (accepter tout synonyme) (0,5) ; Geste correspondant : « <b>applaudit</b> » ou « se dresse de toute sa taille » ou « bombe le torse » ou « esquisse une danse barbare » (0,5)." },
      { q:"L'enfant demanda à sa mère : « Est-ce que je porterai un gilet avec des soutaches ? » Refais cette phrase au discours indirect.", points:1, lines:2,
        correction:"L'enfant demanda à sa mère <b>s'il porterait</b> un gilet avec des soutaches. (Transformation : « Est-ce que » → « si » ; « je porterai » → « il porterait ».)" },
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
        correction:"<b>Barème officiel de la production écrite (10 pts).</b><br><u>Critères d'évaluation du discours (5 pts)</u> : Conformité de la production à la consigne d'écriture : 1 pt · Cohérence de l'argumentation (emploi des connecteurs) : 1 pt · Structure du texte (1 pt) et progression des idées (2 pts) : 3 pts.<br><u>Critères d'évaluation de la langue (5 pts)</u> : Vocabulaire (termes précis et variés) : 1 pt · Syntaxe (phrases correctes) : 1 pt · Ponctuation adéquate : 1 pt · Orthographe d'usage et grammaticale : 1 pt · Conjugaison (emploi des temps) : 1 pt.<br><br><b>Conseils.</b> Prends clairement position (d'accord / pas d'accord / nuancé) dès l'introduction. Développe 2 ou 3 arguments, chacun illustré d'un exemple précis, reliés par des connecteurs (d'abord, de plus, en effet, par exemple, enfin). Conclus en résumant ton point de vue. Soigne la langue : c'est la moitié de la note." }
    ]}
  ]
});

/* ---------- Français — Régional Fès-Meknès 2023 (session ordinaire) ---------- */
window.PB_EXAMS.push({
  id:"fr-fesmeknes-2023", subject:"francais", matiere:"Français", coef:4, official:true,
  label:"Régional Fès-Meknès 2023 — officiel",
  durationMin:120, total:20,
  consignes:"Examen régional unifié, 1ère année du baccalauréat, Académie Fès-Meknès (session ordinaire 2023). Durée : 2 h. Lis d'abord le texte support (dans ton manuel ou le PDF officiel), puis traite l'étude de texte et la production écrite. Attribue-toi les points à la fin en te comparant au corrigé officiel.",
  texte:{
    titre:"Texte support — « Antigone », Jean Anouilh",
    html:"<p><b>📖 Extrait à lire dans ton manuel ou le PDF officiel du sujet.</b></p><p>Il s'agit de la célèbre <b>tirade de Créon</b> : la scène débute par la didascalie « Créon, la secoue soudain, hors de lui ». Pour justifier à Antigone la dureté nécessaire du pouvoir, Créon compare le gouvernement de Thèbes à la conduite d'un <b>navire pris dans la tempête</b>, où le capitaine doit agir sans hésiter, sacrifier s'il le faut, pour sauver l'équipage et le bateau. Les questions et le corrigé ci-dessous portent sur ce passage.</p>",
    note:"Extrait d'une œuvre protégée (Antigone, J. Anouilh) — non reproduit ici pour des raisons de droits d'auteur. Compose avec le passage sous les yeux (manuel ou PDF officiel).",
    source:"Sujet officiel — Examen régional, Académie régionale Fès-Meknès, session ordinaire 2023."
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
        correction:"a) Deux exemples au choix, tirés de la 1ʳᵉ partie de la tirade, par ex. « l'équipage ne veut plus rien faire » et « les officiers se construisent déjà un petit radeau confortable, rien que pour eux » (etc.) — (0,5×2). b) Le mot dévalorisant : « <b>brutes</b> » (0,5)." },
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
        correction:"<b>Barème officiel de la production écrite (10 pts).</b><br>Respect de la consigne (se conformer à ce qui est demandé) : 1 pt · Structure du texte (introduction, développement, conclusion) : 1 pt · Cohérence et pertinence de l'argumentation : qualité des arguments (2 pts) + connecteurs logiques (1 pt) : 3 pts · Correction de la langue (grammaire, conjugaison, orthographe, lexique approprié, ponctuation…) : 5 pts.<br><br><b>Conseils.</b> Annonce clairement le métier choisi dès l'introduction. Donne 2 ou 3 raisons de ce choix, chacune avec un exemple concret (goûts, utilité sociale, débouchés…), reliées par des connecteurs. Termine par une conclusion. La moitié de la note porte sur la langue : relis-toi." }
    ]}
  ]
});

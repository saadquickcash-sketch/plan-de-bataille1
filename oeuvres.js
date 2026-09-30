/* ===== Dossiers d'œuvres — Français 1ère Bac (programme marocain) =====
   Contenu original rédigé pour Brio (résumés, analyses, fiches) : PAS le texte intégral des œuvres.
   Sert de base structurée pour les cours de Français, le Tuteur IA (contexte/RAG), les QCM et les flashcards.
   Clé = titre EXACT du chapitre (window.EDU_SUBJECTS.francais.chapters).
   Schéma : { titre, auteur, genre, publication, cadre, narration, contexte,
     resume:[{ch,titre,texte}], personnages:[{nom,role}], themes:[{t,d}], citations:[{c,note}], methodo:[..] } */
window.PB_OEUVRES = window.PB_OEUVRES || {};
Object.assign(window.PB_OEUVRES, {
"Œuvre : La Boîte à Merveilles (étude et thèmes)": {
  titre:"La Boîte à merveilles",
  auteur:"Ahmed Sefrioui",
  genre:"Roman autobiographique",
  publication:"1954",
  cadre:"Fès (médina), dans les années 1920, autour de Dar Chouafa.",
  narration:"Récit à la 1ʳᵉ personne : un narrateur adulte se souvient de son enfance et prête sa voix à l'enfant de six ans qu'il était, Sidi Mohamed. Double regard : celui de l'enfant (naïf, sensible) et celui de l'adulte (nostalgique, lucide).",
  contexte:"Œuvre fondatrice de la littérature marocaine d'expression française. Sefrioui y peint la vie populaire de la médina de Fès et le monde de l'enfance, sans revendication politique explicite : c'est une autobiographie romancée, centrée sur la mémoire, la solitude et le merveilleux.",
  resume:[
    {ch:1, titre:"La solitude et Dar Chouafa", texte:"Le narrateur adulte évoque sa solitude d'enfant et ouvre le récit sur son refuge : sa boîte à merveilles. Il présente <b>Dar Chouafa</b>, la maison où il habite avec ses parents : au rez-de-chaussée vit la <b>Chouafa</b> (une voyante), au premier <b>Rahma</b> et sa famille, et la famille du narrateur au deuxième. Scène du <b>bain maure</b> (hammam) avec sa mère : un lieu de vapeur, de cris et d'angoisse pour l'enfant."},
    {ch:2, titre:"Le Msid et le fqih", texte:"Présentation de l'<b>école coranique (le Msid)</b> et du <b>fqih</b>, maître sévère qui fait apprendre le Coran par cœur. Sidi Mohamed, enfant chétif et rêveur, décrit ses camarades, la discipline et la peur des châtiments. La journée est rythmée par le Msid et la maison."},
    {ch:3, titre:"Les voisines et les querelles", texte:"La vie collective de Dar Chouafa : les <b>disputes de femmes</b> (notamment entre Rahma et Fatma Bziouya à propos d'une broutille). L'enfant observe le monde des adultes. Visites et bavardages ; apparition de <b>Lalla Aïcha</b>, l'amie de la mère (Lalla Zoubida)."},
    {ch:4, titre:"Préparatifs de l'Achoura — la maladie", texte:"Le Msid se prépare à la fête de l'<b>Achoura</b> ; l'enfant participe au nettoyage. Il tombe <b>malade (fièvre, délire)</b> ; sa mère le veille avec tendresse. Le merveilleux et les visions accompagnent la fièvre."},
    {ch:5, titre:"La fête de l'Achoura", texte:"Guérison et joie : achat des <b>habits neufs</b> (la chemise, le gilet à soutaches), la fête, les tambours, les cadeaux. Bonheur intense de l'enfant, fier et heureux. (C'est de ce chapitre qu'est tiré le texte du régional 2024.)"},
    {ch:6, titre:"Lalla Aïcha et les malheurs de Moulay Larbi", texte:"Visite chez <b>Lalla Aïcha</b> : on évoque son mari <b>Moulay Larbi</b>, fabricant de babouches, en conflit avec son associé <b>Abdelkader</b>. Les récits des adultes ouvrent l'enfant sur les difficultés du monde."},
    {ch:7, titre:"Zineb perdue et retrouvée", texte:"<b>Zineb</b>, la fille de Rahma, se <b>perd</b> lors d'une sortie ; angoisse générale et recherches. On la <b>retrouve</b> saine et sauve. Pour remercier Dieu, Rahma organise un <b>repas de charité (offrande)</b> partagé par le voisinage."},
    {ch:8, titre:"La vie de la médina et le travail du père", texte:"Portrait du père, <b>Maâlem Abdeslam</b>, <b>tisserand</b> honnête et pieux. La vie quotidienne se poursuit ; Moulay Larbi tente de rebondir. L'enfant continue le Msid et ses rêveries."},
    {ch:9, titre:"La ruine du père et son départ", texte:"Coup dur : le père <b>perd son capital</b> (son argent). Pour refaire ses économies, il décide de partir travailler <b>à la campagne (la moisson)</b>, loin de Fès. <b>Départ du père</b> : la maison se vide de sa présence rassurante."},
    {ch:10, titre:"L'absence du père — la seconde épouse de Moulay Larbi", texte:"En l'absence du père, la <b>mère et l'enfant vivent modestement</b> ; solidarité et débrouille. Chez Lalla Aïcha, drame : <b>Moulay Larbi prend une seconde épouse</b>, ce qui bouleverse Lalla Aïcha. L'enfant mesure la fragilité des adultes."},
    {ch:11, titre:"Le retour du père", texte:"Le père <b>revient</b>, ayant gagné de l'argent : soulagement et retour de la sécurité. La vie reprend son cours ; retrouvailles émues."},
    {ch:12, titre:"Retour à l'ordre — la boîte à merveilles", texte:"Apaisement final : <b>réconciliation de Moulay Larbi et de Lalla Aïcha</b>, la vie de la médina retrouve son équilibre. Le récit se referme sur l'enfant et sa <b>boîte à merveilles</b>, son trésor et son refuge imaginaire contre la solitude."}
  ],
  personnages:[
    {nom:"Sidi Mohamed", role:"Le narrateur-enfant (6 ans), fils unique, sensible, rêveur et solitaire. Sa boîte à merveilles est son refuge. C'est aussi le narrateur adulte qui se souvient."},
    {nom:"Lalla Zoubida", role:"La mère : superstitieuse, bavarde, aimante et protectrice ; elle rythme la vie du foyer et croit aux forces occultes."},
    {nom:"Maâlem Abdeslam", role:"Le père : tisserand, homme pieux, droit et travailleur. Sa ruine puis son départ à la campagne structurent l'intrigue."},
    {nom:"Lalla Aïcha", role:"Amie de la mère, épouse de Moulay Larbi. Ses malheurs conjugaux (l'associé, puis la seconde épouse) forment une intrigue secondaire."},
    {nom:"Moulay Larbi", role:"Mari de Lalla Aïcha, fabricant de babouches ; ses échecs et sa seconde union illustrent les épreuves du monde adulte."},
    {nom:"La Chouafa", role:"Voyante qui occupe le rez-de-chaussée de Dar Chouafa ; incarne le monde de la superstition et du merveilleux populaire."},
    {nom:"Rahma", role:"Voisine (1ᵉʳ étage), mère de Zineb ; l'épisode de Zineb perdue puis retrouvée la met en avant."},
    {nom:"Le fqih", role:"Maître du Msid (école coranique), sévère ; représente l'éducation religieuse traditionnelle."},
    {nom:"Fatma Bziouya", role:"Voisine, épouse d'Allal le jardinier ; participe à la vie collective et aux querelles de Dar Chouafa."}
  ],
  themes:[
    {t:"L'enfance et la solitude", d:"L'enfant, unique et incompris, se réfugie dans l'imaginaire et dans sa boîte à merveilles. La solitude est le fil conducteur du récit."},
    {t:"Le merveilleux et la superstition", d:"Voyance, amulettes, croyances populaires, visions de la fièvre : le réel se mêle sans cesse au surnaturel dans le regard de l'enfant et le monde des femmes."},
    {t:"La vie populaire de la médina de Fès", d:"Peinture ethnographique : Dar Chouafa, le hammam, le Msid, les souks, l'Achoura, les métiers artisanaux. Sefrioui fixe un patrimoine et un art de vivre."},
    {t:"La famille et les liens", d:"Tendresse maternelle, dignité du père, solidarité et querelles du voisinage : la cellule familiale et la communauté soutiennent l'enfant."},
    {t:"L'argent et l'épreuve", d:"La ruine du père, son départ pour la moisson, la gêne de la mère : le récit montre la précarité et la façon d'y faire face avec dignité."},
    {t:"La mémoire et la nostalgie", d:"Le narrateur adulte recompose son enfance : le récit est un acte de mémoire, teinté de nostalgie et de tendresse."}
  ],
  citations:[
    {c:"« Le sommeil peuple mes nuits de rêves, mes journées de fantômes. »", note:"Incipit : pose d'emblée la solitude du narrateur et l'importance du rêve/de l'imaginaire."},
    {c:"La « boîte à merveilles »", note:"Objet-titre et symbole : le coffret où l'enfant garde ses trésors (billes, boutons, clous…) est son refuge contre la solitude et la porte de son imaginaire."},
    {c:"« Dar Chouafa »", note:"La maison de la voyante : microcosme de la médina, elle réunit tous les personnages et ancre le merveilleux populaire."},
    {c:"Le « Msid »", note:"L'école coranique : lieu de l'apprentissage, de la discipline et de la peur du fqih ; cadre récurrent de la vie de l'enfant."}
  ],
  methodo:[
    "Pour situer un extrait : identifie le moment du récit (avant/après l'Achoura, avant/après le départ du père) et le lieu (Dar Chouafa, Msid, hammam, chez Lalla Aïcha).",
    "Questions fréquentes au régional : genre de l'œuvre (roman autobiographique), narrateur (Sidi Mohamed), procédés (le double regard enfant/adulte), tonalité (souvent lyrique), champ lexical des sentiments.",
    "Pour la production écrite liée à l'œuvre : appuie-toi sur les thèmes (enfance, solitude, métiers, superstition) et illustre par un exemple précis tiré du récit."
  ]
}
});

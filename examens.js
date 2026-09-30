/* ===== Espace d'examen — sujets du régional (1ère Bac, programme marocain) =====
   Sujets Brio conformes au FORMAT officiel du régional (entraînement), avec correction détaillée.
   Barèmes indicatifs, fidèles à l'esprit de l'épreuve. On peut intégrer de vrais PDF officiels ensuite.
   Schéma d'un sujet :
   { id, subject, matiere, coef, label, durationMin, total, consignes,
     texte:{titre,source,note,html}?,
     sections:[ { titre, points, rtl?, questions:[ {q, points, lines?, correction, redaction?} ] } ] } */
window.PB_EXAMS = window.PB_EXAMS || [];
window.PB_EXAMS.push({
  id:"fr-reg-01",
  subject:"francais", matiere:"Français", coef:4,
  label:"Sujet Brio · conforme au format régional",
  durationMin:120, total:40,
  consignes:"Lis attentivement le texte, puis traite les trois parties dans l'ordre. Soigne ton écriture et ton expression. La production écrite est notée sur la richesse des idées, l'organisation et la correction de la langue.",
  texte:{
    titre:"Texte support",
    source:"Texte rédigé pour cet entraînement — thème : l'attente et l'enfermement (dans l'esprit des œuvres au programme).",
    note:"Œuvres au programme : « Le Dernier Jour d'un Condamné » (V. Hugo), « La Boîte à Merveilles » (A. Sefrioui), « Antigone » (J. Anouilh).",
    html:"<p>Depuis l'aube, je compte les pas du gardien dans le couloir. Ils s'approchent, ralentissent devant ma porte, puis s'éloignent&nbsp;; et à chaque fois mon cœur se serre comme si l'on venait me chercher. Ma cellule est étroite&nbsp;: quatre murs de pierre humide, une lucarne trop haute pour le regard, une paille qui sent le renfermé. Le jour n'y entre qu'à moitié, comme s'il hésitait à me tenir compagnie.</p><p>On me dit que je serai fixé demain. Demain&nbsp;! Ce mot, hier encore si ordinaire, est devenu un gouffre. Je le répète et il me glace. Que valent, à présent, les heures qui me restent&nbsp;? Je voudrais les retenir une à une, et pourtant je les vois fuir comme l'eau entre mes doigts.</p><p>Ô vous qui êtes libres, vous qui marchez où bon vous semble, mesurez-vous seulement le prix d'un matin ordinaire&nbsp;? Moi, je donnerais tout ce que je n'ai plus pour entendre encore, une seule fois, le bruit familier de la rue et le rire des enfants sous ma fenêtre.</p>"
  },
  sections:[
    { titre:"I. Compréhension", points:14, questions:[
      { q:"Situe le passage : qui parle dans ce texte, et où se trouve-t-il ? (Réponds par une phrase complète.)", points:2,
        correction:"C'est un prisonnier (un narrateur emprisonné, un condamné qui attend son sort) qui parle. Il se trouve dans une <b>cellule de prison</b>, comme le montrent « ma cellule est étroite », « quatre murs de pierre humide », « une lucarne »." },
      { q:"Relève dans le premier paragraphe deux indices (mots ou expressions) qui montrent que le lieu est un espace fermé et pénible.", points:2,
        correction:"Deux indices parmi : « cellule est étroite », « quatre murs de pierre humide », « une lucarne trop haute », « une paille qui sent le renfermé », « le jour n'y entre qu'à moitié ». (2 réponses correctes suffisent.)" },
      { q:"Quel est l'état d'esprit du narrateur ? Justifie ta réponse par une expression relevée dans le texte.", points:2,
        correction:"Le narrateur est <b>angoissé / terrifié / rempli d'attente et d'espoir mêlés</b>. Justification possible : « mon cœur se serre », « ce mot… est devenu un gouffre », « je le répète et il me glace »." },
      { q:"« Demain ! Ce mot, hier encore si ordinaire, est devenu un gouffre. » Explique cette phrase : pourquoi le mot « demain » est-il devenu « un gouffre » pour le narrateur ?", points:2,
        correction:"« Demain » désigne le jour où il connaîtra son sort (probablement son exécution ou sa condamnation). Ce qui était un mot banal est devenu terrifiant : il représente désormais la peur de la mort, le vide, l'inconnu — d'où l'image du « gouffre » (métaphore de l'angoisse et du danger)." },
      { q:"À qui le narrateur s'adresse-t-il dans le dernier paragraphe ? Relève l'expression qui le montre.", points:2,
        correction:"Il s'adresse aux hommes <b>libres</b> (au lecteur, à ceux qui vivent en liberté). Expression : « Ô vous qui êtes libres, vous qui marchez où bon vous semble ». (Il s'agit d'une apostrophe.)" },
      { q:"Dans « Le Dernier Jour d'un Condamné », quel est le principal but visé par Victor Hugo à travers le récit d'un condamné ? (Une phrase.)", points:2,
        correction:"Victor Hugo veut <b>dénoncer la peine de mort</b> et défendre son abolition : en faisant vivre au lecteur l'angoisse d'un condamné, il cherche à émouvoir et à convaincre de l'inhumanité de ce châtiment (plaidoyer contre la peine capitale)." },
      { q:"À ton avis, pourquoi la privation de liberté est-elle une souffrance ? Réponds en deux ou trois phrases, en donnant un argument personnel.", points:2, lines:4,
        correction:"Réponse personnelle acceptée si elle est cohérente et justifiée. Éléments valorisés : la liberté permet de choisir, d'agir, de voir ses proches ; l'enfermement prive de l'espace, du temps maîtrisé, des liens humains ; il réduit l'être à l'attente et à l'impuissance. (On note l'argumentation et l'expression.)" }
    ]},
    { titre:"II. Langue et grammaire", points:6, questions:[
      { q:"Relève dans le texte deux mots ou expressions appartenant au champ lexical de la PEUR / de l'angoisse.", points:2,
        correction:"Deux éléments parmi : « mon cœur se serre », « me glace », « gouffre », « il me glace ». (Champ lexical de l'angoisse / de la peur.)" },
      { q:"« Je les vois fuir comme l'eau entre mes doigts. » Identifie la figure de style contenue dans cette phrase et explique-la brièvement.", points:2,
        correction:"C'est une <b>comparaison</b> (outil de comparaison « comme »). Le narrateur compare la fuite des heures à l'eau qui s'échappe entre les doigts : cela souligne qu'il ne peut pas retenir le temps qui passe. (Si l'élève parle de métaphore filée du temps, on accepte l'explication si elle est juste.)" },
      { q:"Transforme la phrase suivante au discours indirect : Il m'a dit : « Tu seras fixé demain. »", points:2,
        correction:"« Il m'a dit <b>que je serais fixé le lendemain</b>. » (Concordance des temps : seras → serais ; changement du repère temporel : demain → le lendemain ; pronom : tu → je.)" }
    ]},
    { titre:"III. Production écrite", points:20, questions:[
      { q:"Sujet : « La liberté est le bien le plus précieux de l'être humain. » Rédige un texte argumentatif d'une quinzaine de lignes dans lequel tu défends cette idée, à l'aide d'arguments et d'exemples précis (tu peux t'appuyer sur une œuvre étudiée).", points:20, redaction:true, lines:18,
        correction:"<b>Grille d'évaluation (indicative)</b> — Conformité à la consigne (texte argumentatif, thème respecté) : 4 pts · Richesse et pertinence des idées/arguments et exemples : 6 pts · Organisation (introduction annonçant la thèse, arguments ordonnés avec connecteurs, conclusion) : 4 pts · Correction de la langue (grammaire, orthographe, conjugaison, ponctuation) : 4 pts · Présentation et lisibilité : 2 pts.<br><br><b>Éléments de réponse attendus :</b> une <i>introduction</i> qui pose le thème et annonce la thèse (la liberté est précieuse). Des <i>arguments</i> possibles : la liberté permet de choisir sa vie et d'agir selon sa conscience ; elle est la condition de la dignité humaine ; sa privation est une grande souffrance (exemple : le condamné de Hugo, ou l'enfant enfermé dans son monde dans « La Boîte à Merveilles », ou Antigone qui préfère mourir libre plutôt que de renoncer à ses valeurs). Des <i>connecteurs logiques</i> (d'abord, de plus, en effet, par exemple, enfin). Une <i>conclusion</i> qui résume et ouvre le sujet. On valorise les exemples précis et une langue correcte." }
    ]}
  ]
});

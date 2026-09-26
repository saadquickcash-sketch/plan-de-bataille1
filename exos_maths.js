/* ===== Séries d'exercices curatées — Mathématiques 1ère Bac Sciences Maths (programme marocain) =====
   Clés = titres EXACTS des chapitres (window.EDU_SUBJECTS.maths.chapters).
   Chaque exercice : { niv:'Application'|'Moyen'|'Défi', en:énoncé, hint:indice, sol:correction } (HTML + LaTeX $…$). */
window.PB_EXOS = window.PB_EXOS || {};
Object.assign(window.PB_EXOS, {

"Notions de logique": [
 { niv:"Application",
   en:"Écrire la négation de chacune des propositions : (a) $P:\\ \\forall x\\in\\mathbb{R},\\ x^2+1>0$ ; (b) $Q:\\ \\exists n\\in\\mathbb{N},\\ 2n=n^2$. Préciser si $P$ est vraie ou fausse.",
   hint:"La négation échange $\\forall$ et $\\exists$, et nie la propriété : la négation de $>$ est $\\le$, celle de $=$ est $\\ne$.",
   sol:"(a) $\\overline{P}:\\ \\exists x\\in\\mathbb{R},\\ x^2+1\\le 0$. Comme $x^2\\ge 0$, on a $x^2+1\\ge 1>0$ pour tout réel $x$ : donc $P$ est <b>vraie</b> (et $\\overline P$ fausse).<br>(b) $\\overline{Q}:\\ \\forall n\\in\\mathbb{N},\\ 2n\\ne n^2$. ($Q$ est vraie : pour $n=0$ et $n=2$ on a $2n=n^2$.)" },
 { niv:"Application",
   en:"Montrer, à l'aide d'une table de vérité, que $(P\\Rightarrow Q)$ est équivalente à $(\\overline{P}\\ \\lor\\ Q)$.",
   hint:"Il y a 4 cas selon que $P$ et $Q$ sont vraies (V) ou fausses (F). Compare les deux dernières colonnes.",
   sol:"<table class='exo-tab'><tr><th>$P$</th><th>$Q$</th><th>$P\\Rightarrow Q$</th><th>$\\overline P\\lor Q$</th></tr><tr><td>V</td><td>V</td><td>V</td><td>V</td></tr><tr><td>V</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>V</td><td>V</td><td>V</td></tr><tr><td>F</td><td>F</td><td>V</td><td>V</td></tr></table>Les colonnes $(P\\Rightarrow Q)$ et $(\\overline P\\lor Q)$ sont identiques : les deux propositions sont donc <b>équivalentes</b>." },
 { niv:"Moyen",
   en:"Soit $n\\in\\mathbb{Z}$. Montrer, en raisonnant par contraposée, que : si $n^2$ est pair alors $n$ est pair.",
   hint:"La contraposée de « si $n^2$ pair alors $n$ pair » est « si $n$ impair alors $n^2$ impair ». Écris $n=2k+1$.",
   sol:"Contraposée : « si $n$ est impair, alors $n^2$ est impair ». Supposons $n$ impair : $n=2k+1$ avec $k\\in\\mathbb{Z}$. Alors $n^2=(2k+1)^2=4k^2+4k+1=2(2k^2+2k)+1$, qui est impair. La contraposée est vraie, donc l'implication de départ l'est aussi : si $n^2$ est pair, alors $n$ est pair." },
 { niv:"Moyen",
   en:"Démontrer par récurrence que : $\\forall n\\in\\mathbb{N}^*,\\quad 1+2+3+\\cdots+n=\\dfrac{n(n+1)}{2}.$",
   hint:"Initialisation à $n=1$. Pour l'hérédité, ajoute $(n+1)$ aux deux membres de l'hypothèse de récurrence.",
   sol:"<b>Initialisation</b> ($n=1$) : à gauche $1$ ; à droite $\\frac{1\\cdot 2}{2}=1$. Vrai.<br><b>Hérédité</b> : supposons $1+\\cdots+n=\\frac{n(n+1)}{2}$. Alors $1+\\cdots+n+(n+1)=\\frac{n(n+1)}{2}+(n+1)=(n+1)\\left(\\frac{n}{2}+1\\right)=\\frac{(n+1)(n+2)}{2}$, qui est la formule au rang $n+1$.<br>Par récurrence, la propriété est vraie pour tout $n\\in\\mathbb{N}^*$." },
 { niv:"Défi",
   en:"Montrer, par un raisonnement par l'absurde, que $\\sqrt{2}$ est irrationnel.",
   hint:"Suppose $\\sqrt2=\\frac{p}{q}$ avec la fraction $\\frac pq$ irréductible, puis montre que $p$ et $q$ sont tous deux pairs.",
   sol:"Supposons par l'absurde $\\sqrt2=\\frac pq$ avec $p,q\\in\\mathbb{N}^*$ et $\\frac pq$ <b>irréductible</b>. Alors $2=\\frac{p^2}{q^2}$, donc $p^2=2q^2$ : $p^2$ est pair, donc $p$ est pair, $p=2k$. D'où $4k^2=2q^2$, soit $q^2=2k^2$ : $q^2$ est pair, donc $q$ est pair. Ainsi $p$ et $q$ sont pairs : $\\frac pq$ n'est pas irréductible — <b>contradiction</b>. Donc $\\sqrt2\\notin\\mathbb{Q}$." }
],

"Ensembles et applications": [
 { niv:"Application",
   en:"On donne $A=\\{1,2,3,4,6\\}$ et $B=\\{2,4,5,6\\}$, parties de $E=\\{1,2,3,4,5,6\\}$. Déterminer $A\\cup B$, $A\\cap B$, $A\\setminus B$ et $\\overline{A}$ (complémentaire dans $E$).",
   hint:"$A\\setminus B$ = éléments de $A$ absents de $B$ ; $\\overline A=E\\setminus A$.",
   sol:"$A\\cup B=\\{1,2,3,4,5,6\\}$ ; $A\\cap B=\\{2,4,6\\}$ ; $A\\setminus B=\\{1,3\\}$ ; $\\overline A=\\{5\\}$." },
 { niv:"Application",
   en:"Dans une classe de $30$ élèves, $18$ étudient l'anglais, $15$ l'espagnol et $7$ les deux. Combien étudient au moins une de ces langues ? Combien n'en étudient aucune ?",
   hint:"$\\operatorname{card}(A\\cup B)=\\operatorname{card}(A)+\\operatorname{card}(B)-\\operatorname{card}(A\\cap B)$.",
   sol:"$\\operatorname{card}(A\\cup B)=18+15-7=26$ élèves étudient au moins une langue. Aucune : $30-26=4$ élèves." },
 { niv:"Moyen",
   en:"Soient $A,B,C$ trois parties d'un ensemble $E$. Démontrer que $A\\cap(B\\cup C)=(A\\cap B)\\cup(A\\cap C)$.",
   hint:"Prends $x$ quelconque et traduis « $x\\in\\ldots$ » avec $\\land$ et $\\lor$, puis utilise la distributivité logique.",
   sol:"Soit $x\\in E$. $x\\in A\\cap(B\\cup C)\\iff (x\\in A)\\land\\big((x\\in B)\\lor(x\\in C)\\big)$. Par distributivité de $\\land$ sur $\\lor$ : $\\iff\\big((x\\in A)\\land(x\\in B)\\big)\\lor\\big((x\\in A)\\land(x\\in C)\\big)\\iff x\\in (A\\cap B)\\cup(A\\cap C)$. Les deux ensembles ont les mêmes éléments, donc ils sont égaux." },
 { niv:"Moyen",
   en:"Soit $f:\\mathbb{R}\\to\\mathbb{R}$ définie par $f(x)=2x-3$. Montrer que $f$ est bijective et déterminer $f^{-1}$.",
   hint:"Résous l'équation $f(x)=y$ d'inconnue $x$ : si elle a une solution unique pour tout $y$, $f$ est bijective.",
   sol:"Soit $y\\in\\mathbb{R}$. $f(x)=y\\iff 2x-3=y\\iff x=\\frac{y+3}{2}$. Pour tout $y$ il existe un <b>unique</b> $x$ : $f$ est bijective. Sa réciproque est $f^{-1}(x)=\\frac{x+3}{2}$." },
 { niv:"Défi",
   en:"Soit $f:\\mathbb{R}\\to\\mathbb{R},\\ f(x)=x^2$. (a) $f$ est-elle injective ? surjective ? (b) Mêmes questions pour $g:[0,+\\infty[\\to[0,+\\infty[,\\ g(x)=x^2$.",
   hint:"Pour l'injectivité, cherche deux antécédents distincts ; pour la surjectivité, cherche si tout élément de l'arrivée a un antécédent.",
   sol:"(a) $f(-1)=f(1)=1$ : deux antécédents distincts $\\Rightarrow f$ <b>non injective</b>. Et $-1$ n'a pas d'antécédent ($x^2=-1$ impossible dans $\\mathbb{R}$) $\\Rightarrow f$ <b>non surjective</b>.<br>(b) Sur $[0,+\\infty[$ : si $a,b\\ge0$ et $a^2=b^2$ alors $a=b$ : $g$ est <b>injective</b>. Pour tout $y\\ge0$, $x=\\sqrt y\\ge0$ donne $g(x)=y$ : $g$ est <b>surjective</b>. Donc $g$ est <b>bijective</b>, de réciproque $g^{-1}(x)=\\sqrt x$." }
],

"Généralités sur les fonctions numériques": [
 { niv:"Application",
   en:"Déterminer l'ensemble de définition de $f(x)=\\dfrac{\\sqrt{x-1}}{x-3}$.",
   hint:"Il faut à la fois $x-1\\ge 0$ (racine) et $x-3\\ne 0$ (dénominateur).",
   sol:"Conditions : $x-1\\ge0\\iff x\\ge1$ et $x-3\\ne0\\iff x\\ne3$. Donc $D_f=[1,3[\\,\\cup\\,]3,+\\infty[$." },
 { niv:"Application",
   en:"Étudier la parité de $f(x)=x^3-x$ et de $g(x)=x^2+\\cos x$ sur $\\mathbb{R}$.",
   hint:"Calcule $f(-x)$ et $g(-x)$, puis compare à $f(x)$ et $-f(x)$.",
   sol:"$\\mathbb{R}$ est symétrique par rapport à $0$. $f(-x)=-x^3+x=-(x^3-x)=-f(x)$ : $f$ est <b>impaire</b>. $g(-x)=x^2+\\cos(-x)=x^2+\\cos x=g(x)$ : $g$ est <b>paire</b>." },
 { niv:"Moyen",
   en:"Soit $f(x)=\\dfrac{2x+1}{x-1}$ sur $]1,+\\infty[$. Étudier son sens de variation.",
   hint:"Écris $f$ sous la forme $2+\\dfrac{3}{x-1}$.",
   sol:"$f(x)=\\frac{2(x-1)+3}{x-1}=2+\\frac{3}{x-1}$. Sur $]1,+\\infty[$, $x\\mapsto x-1$ est croissante et strictement positive, donc $x\\mapsto\\frac{3}{x-1}$ est <b>décroissante</b>, donc $f$ est <b>strictement décroissante</b>. (Vérif : $f(2)=5$, $f(4)=3$.)" },
 { niv:"Moyen",
   en:"Soit $f(x)=x^2-4x+5$. Écrire $f$ sous forme canonique, puis déterminer son minimum et le point où il est atteint.",
   hint:"$x^2-4x=(x-2)^2-4$.",
   sol:"$f(x)=(x-2)^2-4+5=(x-2)^2+1$. Comme $(x-2)^2\\ge0$, on a $f(x)\\ge1$ avec égalité ssi $x=2$. Le <b>minimum</b> de $f$ vaut $\\boxed{1}$, atteint en $x=2$." },
 { niv:"Défi",
   en:"Montrer que $f(x)=\\dfrac{x}{1+x^2}$ vérifie $-\\dfrac12\\le f(x)\\le \\dfrac12$ pour tout $x\\in\\mathbb{R}$ (donc $f$ est bornée).",
   hint:"Étudie le signe de $\\dfrac12-f(x)$ et de $f(x)+\\dfrac12$ ; pense à $(1\\mp x)^2\\ge0$.",
   sol:"Pour tout $x$, $1+x^2>0$. On a $\\frac12-f(x)=\\frac{(1+x^2)-2x}{2(1+x^2)}=\\frac{(1-x)^2}{2(1+x^2)}\\ge0$, donc $f(x)\\le\\frac12$. De même $f(x)+\\frac12=\\frac{(1+x)^2}{2(1+x^2)}\\ge0$, donc $f(x)\\ge-\\frac12$. Ainsi $-\\frac12\\le f(x)\\le\\frac12$ ; les bornes sont atteintes en $x=1$ et $x=-1$." }
],

"Le barycentre dans le plan": [
 { niv:"Application",
   en:"Soient $A$ et $B$ deux points et $G$ le barycentre de $(A,2)$ et $(B,3)$. Exprimer $\\vec{AG}$ en fonction de $\\vec{AB}$.",
   hint:"Par définition $2\\vec{GA}+3\\vec{GB}=\\vec0$. Écris $\\vec{GB}=\\vec{GA}+\\vec{AB}$.",
   sol:"$2\\vec{GA}+3\\vec{GB}=\\vec0$ et $\\vec{GB}=\\vec{GA}+\\vec{AB}$, donc $5\\vec{GA}+3\\vec{AB}=\\vec0\\Rightarrow\\vec{GA}=-\\frac35\\vec{AB}$, d'où $\\vec{AG}=\\frac35\\vec{AB}$. $G$ est aux $\\frac35$ de $[AB]$ à partir de $A$." },
 { niv:"Application",
   en:"Soit $ABC$ un triangle et $G$ l'isobarycentre de $A,B,C$. Montrer que $\\vec{AG}=\\dfrac13(\\vec{AB}+\\vec{AC})$.",
   hint:"$\\vec{GA}+\\vec{GB}+\\vec{GC}=\\vec0$, puis $\\vec{GB}=\\vec{GA}+\\vec{AB}$ et $\\vec{GC}=\\vec{GA}+\\vec{AC}$.",
   sol:"$\\vec{GA}+\\vec{GB}+\\vec{GC}=\\vec0$. En remplaçant : $3\\vec{GA}+\\vec{AB}+\\vec{AC}=\\vec0\\Rightarrow\\vec{AG}=\\frac13(\\vec{AB}+\\vec{AC})$. $G$ est le <b>centre de gravité</b> du triangle." },
 { niv:"Moyen",
   en:"Réduire, pour tout point $M$ du plan, le vecteur $\\vec{u}(M)=2\\vec{MA}+3\\vec{MB}$ en faisant apparaître le barycentre $G$ de $(A,2),(B,3)$.",
   hint:"Introduis $G$ : $\\vec{MA}=\\vec{MG}+\\vec{GA}$, etc., puis utilise $2\\vec{GA}+3\\vec{GB}=\\vec0$.",
   sol:"$2\\vec{MA}+3\\vec{MB}=2(\\vec{MG}+\\vec{GA})+3(\\vec{MG}+\\vec{GB})=5\\vec{MG}+(2\\vec{GA}+3\\vec{GB})=5\\vec{MG}$. Donc $\\vec{u}(M)=5\\vec{MG}$ pour tout $M$." },
 { niv:"Moyen",
   en:"Avec $G$ le barycentre de $(A,2),(B,3)$, déterminer l'ensemble des points $M$ tels que $\\lVert 2\\vec{MA}+3\\vec{MB}\\rVert=10$.",
   hint:"Utilise la réduction de l'exercice précédent : $2\\vec{MA}+3\\vec{MB}=5\\vec{MG}$.",
   sol:"$\\lVert5\\vec{MG}\\rVert=10\\iff 5\\,MG=10\\iff MG=2$. L'ensemble cherché est le <b>cercle de centre $G$ et de rayon $2$</b>." },
 { niv:"Défi",
   en:"Soit $ABC$ un triangle, $I$ le milieu de $[BC]$ et $G$ l'isobarycentre de $A,B,C$. Montrer que $A$, $G$, $I$ sont alignés et préciser la position de $G$ sur $[AI]$.",
   hint:"$I$ est le barycentre de $(B,1),(C,1)$ ; utilise l'associativité du barycentre pour regrouper $B$ et $C$.",
   sol:"$I$ est le barycentre de $(B,1),(C,1)$. Par <b>associativité</b>, $G$ (barycentre de $(A,1),(B,1),(C,1)$) est le barycentre de $(A,1)$ et $(I,2)$. Donc $\\vec{AG}=\\frac{2}{1+2}\\vec{AI}=\\frac23\\vec{AI}$ : $A,G,I$ sont <b>alignés</b> et $G$ est aux deux tiers de $[AI]$ à partir de $A$." }
]

});

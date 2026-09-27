/* ===== Séries d'exercices curatées — Physique-Chimie 1ère Bac Sciences Maths (programme marocain) =====
   Clés = titres EXACTS des chapitres (window.EDU_SUBJECTS.pc.chapters), préfixe « Physique — » / « Chimie — » compris.
   Chaque exercice : { niv:'Application'|'Moyen'|'Défi', en, hint, sol } (HTML + LaTeX $…$).
   Les exercices « Défi » marqués 🏅 sont de niveau/format olympiades. On prend g = 9,8 N/kg sauf mention. */
window.PB_EXOS = window.PB_EXOS || {};
Object.assign(window.PB_EXOS, {

"Physique — Rotation d'un solide autour d'un axe fixe": [
 { niv:"Application",
   en:"Un disque tourne uniformément autour de son axe à la fréquence $N=300\\ \\text{tr/min}$. Calculer sa vitesse angulaire $\\omega$ en $\\text{rad/s}$.",
   hint:"$\\omega=2\\pi n$ où $n$ est la fréquence en tours par seconde : $n=\\dfrac{N}{60}$.",
   sol:"$n=\\dfrac{300}{60}=5\\ \\text{tr/s}$, donc $\\omega=2\\pi n=2\\pi\\times5=10\\pi\\approx31{,}4\\ \\text{rad/s}$." },
 { niv:"Application",
   en:"Un point $M$ d'un solide en rotation se situe à la distance $R=20\\ \\text{cm}$ de l'axe. La vitesse angulaire est $\\omega=10\\ \\text{rad/s}$. Déterminer la vitesse linéaire $v$ de $M$.",
   hint:"$v=R\\,\\omega$ avec $R$ en mètres.",
   sol:"$R=0{,}20\\ \\text{m}$, donc $v=R\\,\\omega=0{,}20\\times10=2\\ \\text{m/s}$." },
 { niv:"Moyen",
   en:"Une roue de rayon $R=30\\ \\text{cm}$ tourne uniformément ; un point de sa jante parcourt une distance de $6\\ \\text{m}$ en $2\\ \\text{s}$. Calculer la vitesse linéaire $v$, la vitesse angulaire $\\omega$ et la fréquence de rotation $f$.",
   hint:"$v=\\dfrac{d}{t}$ ; $\\omega=\\dfrac{v}{R}$ ; $f=\\dfrac{\\omega}{2\\pi}$.",
   sol:"$v=\\dfrac{6}{2}=3\\ \\text{m/s}$. $\\omega=\\dfrac{v}{R}=\\dfrac{3}{0{,}30}=10\\ \\text{rad/s}$. $f=\\dfrac{\\omega}{2\\pi}=\\dfrac{10}{2\\pi}\\approx1{,}59\\ \\text{Hz}$ (soit $\\approx95{,}5\\ \\text{tr/min}$)." },
 { niv:"Moyen",
   en:"Un solide part à l'instant $t=0$ de l'abscisse angulaire $\\theta_0=0$ et tourne uniformément à $\\omega=4\\ \\text{rad/s}$. Déterminer son abscisse angulaire $\\theta$ à $t=5\\ \\text{s}$, puis le nombre de tours effectués.",
   hint:"$\\theta=\\theta_0+\\omega t$ ; nombre de tours $=\\dfrac{\\theta}{2\\pi}$.",
   sol:"$\\theta=\\omega t=4\\times5=20\\ \\text{rad}$. Nombre de tours $=\\dfrac{20}{2\\pi}\\approx3{,}18$ tours." },
 { niv:"Défi",
   en:"🏅 <b>Type olympiades.</b> Deux poulies de rayons $R_1=10\\ \\text{cm}$ et $R_2=25\\ \\text{cm}$ sont reliées par une courroie inextensible qui ne glisse pas. La petite poulie tourne à $N_1=600\\ \\text{tr/min}$. (a) Calculer la vitesse linéaire $v$ de la courroie. (b) En déduire la vitesse angulaire $\\omega_2$ et la fréquence $N_2$ de la grande poulie.",
   hint:"La courroie impose la <b>même vitesse linéaire</b> aux deux jantes : $R_1\\omega_1=R_2\\omega_2=v$.",
   sol:"$\\omega_1=\\dfrac{2\\pi N_1}{60}=\\dfrac{2\\pi\\times600}{60}=20\\pi\\ \\text{rad/s}$. (a) $v=R_1\\omega_1=0{,}10\\times20\\pi=2\\pi\\approx6{,}28\\ \\text{m/s}$. (b) $\\omega_2=\\dfrac{v}{R_2}=\\dfrac{2\\pi}{0{,}25}=8\\pi\\ \\text{rad/s}$, et $N_2=\\dfrac{60\\,\\omega_2}{2\\pi}=\\dfrac{60\\times8\\pi}{2\\pi}=240\\ \\text{tr/min}$. (La grande poulie tourne moins vite, comme attendu.)" }
],

"Physique — Travail et puissance d'une force": [
 { niv:"Application",
   en:"Une force constante horizontale $F=50\\ \\text{N}$ déplace un objet de $d=8\\ \\text{m}$ dans sa propre direction. Calculer le travail $W$ de $\\vec F$.",
   hint:"$W=F\\,d\\cos\\alpha$, avec ici $\\alpha=0$.",
   sol:"$W=F\\,d\\cos0^\\circ=50\\times8\\times1=400\\ \\text{J}$." },
 { niv:"Application",
   en:"On soulève verticalement, à vitesse constante, une masse $m=5\\ \\text{kg}$ d'une hauteur $h=2\\ \\text{m}$. Calculer le travail du poids. (On prend $g=9{,}8\\ \\text{N/kg}$.)",
   hint:"Le poids est dirigé vers le bas et le déplacement vers le haut : le travail est <b>résistant</b>, $W=-mgh$.",
   sol:"$W(\\vec P)=-mgh=-5\\times9{,}8\\times2=-98\\ \\text{J}$ (travail résistant)." },
 { niv:"Moyen",
   en:"Un traîneau est tiré par une corde faisant un angle $\\alpha=30^\\circ$ avec l'horizontale, avec une force $F=120\\ \\text{N}$, sur une distance $d=15\\ \\text{m}$. (a) Calculer le travail de $\\vec F$. (b) Si le trajet dure $10\\ \\text{s}$, calculer la puissance moyenne.",
   hint:"$W=F\\,d\\cos\\alpha$ ; $P=\\dfrac{W}{t}$.",
   sol:"(a) $W=F\\,d\\cos30^\\circ=120\\times15\\times\\dfrac{\\sqrt3}{2}\\approx1559\\ \\text{J}$. (b) $P=\\dfrac{W}{t}=\\dfrac{1559}{10}\\approx156\\ \\text{W}$." },
 { niv:"Moyen",
   en:"Une voiture roule à vitesse constante $v=20\\ \\text{m/s}$. Le moteur exerce une force motrice $F=800\\ \\text{N}$ (dans le sens du mouvement, égale en norme aux frottements). Calculer la puissance développée.",
   hint:"Pour une force dans le sens du mouvement à vitesse $v$ : $P=F\\,v$.",
   sol:"$P=F\\,v=800\\times20=16\\,000\\ \\text{W}=16\\ \\text{kW}$." },
 { niv:"Défi",
   en:"🏅 <b>Type olympiades.</b> Un bloc de masse $m=2\\ \\text{kg}$ glisse en <b>descendant</b> un plan incliné d'angle $\\alpha=30^\\circ$, sur une longueur $L=4\\ \\text{m}$. Une force de frottement $f=3\\ \\text{N}$ s'oppose au mouvement. ($g=9{,}8\\ \\text{N/kg}$.) Calculer les travaux du poids, de la force de frottement et de la réaction normale, puis le travail total des forces.",
   hint:"La normale ne travaille pas. Le poids travaille par sa composante le long du plan : $W(\\vec P)=+mg\\,L\\sin\\alpha$ en descente.",
   sol:"Déplacement de norme $L=4\\ \\text{m}$ le long du plan. Poids : $W(\\vec P)=+mgL\\sin\\alpha=2\\times9{,}8\\times4\\times0{,}5=+39{,}2\\ \\text{J}$ (moteur). Frottement : $W(\\vec f)=-f\\,L=-3\\times4=-12\\ \\text{J}$. Réaction normale : $W(\\vec N)=0$ (perpendiculaire au déplacement). Travail total : $W_{\\text{tot}}=39{,}2-12+0=+27{,}2\\ \\text{J}$." }
],

"Physique — Travail et énergie cinétique": [
 { niv:"Application",
   en:"Une voiture de masse $m=1200\\ \\text{kg}$ roule à $v=25\\ \\text{m/s}$. Calculer son énergie cinétique.",
   hint:"$E_c=\\dfrac12 m v^2$.",
   sol:"$E_c=\\dfrac12\\times1200\\times25^2=\\dfrac12\\times1200\\times625=375\\,000\\ \\text{J}=375\\ \\text{kJ}$." },
 { niv:"Application",
   en:"Une balle de masse $m=50\\ \\text{g}$ passe de la vitesse $v_0=10\\ \\text{m/s}$ à $v=30\\ \\text{m/s}$. Calculer la variation de son énergie cinétique.",
   hint:"$\\Delta E_c=\\dfrac12 m\\,(v^2-v_0^2)$, avec $m$ en kg.",
   sol:"$m=0{,}05\\ \\text{kg}$. $\\Delta E_c=\\dfrac12\\times0{,}05\\times(30^2-10^2)=\\dfrac12\\times0{,}05\\times800=20\\ \\text{J}$." },
 { niv:"Moyen",
   en:"Une voiture de masse $m=1000\\ \\text{kg}$ freine et s'arrête sur une distance $d=50\\ \\text{m}$ en partant de $v=20\\ \\text{m/s}$. À l'aide du théorème de l'énergie cinétique, calculer la force de freinage moyenne (supposée constante et opposée au mouvement).",
   hint:"$\\Delta E_c=W(\\vec F_{\\text{frein}})=-F\\,d$.",
   sol:"$\\Delta E_c=0-\\dfrac12\\times1000\\times20^2=-200\\,000\\ \\text{J}$. Or $\\Delta E_c=-F\\,d$, donc $F=\\dfrac{200\\,000}{50}=4000\\ \\text{N}$." },
 { niv:"Moyen",
   en:"Un objet de masse $m=2\\ \\text{kg}$ est lâché sans vitesse initiale et tombe en chute libre d'une hauteur $h=5\\ \\text{m}$ (on néglige l'air, $g=9{,}8\\ \\text{N/kg}$). Déterminer sa vitesse en arrivant au sol avec le théorème de l'énergie cinétique.",
   hint:"Seul le poids travaille : $\\dfrac12 m v^2=mgh$, d'où $v=\\sqrt{2gh}$.",
   sol:"$\\dfrac12 m v^2 - 0 = W(\\vec P)=mgh$, donc $v=\\sqrt{2gh}=\\sqrt{2\\times9{,}8\\times5}=\\sqrt{98}\\approx9{,}9\\ \\text{m/s}$." },
 { niv:"Défi",
   en:"🏅 <b>Type olympiades.</b> Une bille de masse $m=0{,}2\\ \\text{kg}$ est fixée à l'extrémité d'un fil de longueur $L=1\\ \\text{m}$ ; on la lâche sans vitesse depuis la position horizontale (fil tendu). ($g=9{,}8\\ \\text{N/kg}$, frottements négligés.) (a) Déterminer la vitesse de la bille au point le plus bas. (b) En déduire la tension du fil en ce point.",
   hint:"(a) Théorème de l'énergie cinétique : $\\dfrac12 m v^2=mgL$. (b) Au point bas, la résultante est centripète : $T-mg=\\dfrac{m v^2}{L}$.",
   sol:"(a) La bille descend d'une hauteur $h=L$. $\\dfrac12 m v^2=mgL\\Rightarrow v=\\sqrt{2gL}=\\sqrt{2\\times9{,}8\\times1}\\approx4{,}43\\ \\text{m/s}$. (b) Au point le plus bas, $T-mg=\\dfrac{m v^2}{L}$ avec $v^2=2gL$, donc $T=mg+\\dfrac{m\\,(2gL)}{L}=mg+2mg=3mg=3\\times0{,}2\\times9{,}8=5{,}88\\ \\text{N}$." }
],

"Physique — Énergie potentielle de pesanteur et énergie mécanique": [
 { niv:"Application",
   en:"Un objet de masse $m=3\\ \\text{kg}$ se trouve à l'altitude $z=4\\ \\text{m}$ au-dessus du sol pris comme référence ($g=9{,}8\\ \\text{N/kg}$). Calculer son énergie potentielle de pesanteur.",
   hint:"$E_{pp}=mgz$ (référence : $E_{pp}=0$ au sol).",
   sol:"$E_{pp}=mgz=3\\times9{,}8\\times4=117{,}6\\ \\text{J}$." },
 { niv:"Application",
   en:"À un instant donné, un objet possède une énergie cinétique $E_c=10\\ \\text{J}$ et une énergie potentielle $E_{pp}=6\\ \\text{J}$. Calculer son énergie mécanique.",
   hint:"$E_m=E_c+E_{pp}$.",
   sol:"$E_m=E_c+E_{pp}=10+6=16\\ \\text{J}$." },
 { niv:"Moyen",
   en:"Un enfant descend un toboggan sans frottement, en partant sans vitesse d'une hauteur $h=2{,}5\\ \\text{m}$. ($g=9{,}8\\ \\text{N/kg}$.) Déterminer sa vitesse en bas par conservation de l'énergie mécanique.",
   hint:"Sans frottement $E_m$ se conserve : $mgh=\\dfrac12 m v^2$.",
   sol:"$mgh=\\dfrac12 m v^2\\Rightarrow v=\\sqrt{2gh}=\\sqrt{2\\times9{,}8\\times2{,}5}=\\sqrt{49}=7\\ \\text{m/s}$." },
 { niv:"Moyen",
   en:"Une bille est lancée verticalement vers le haut avec une vitesse $v_0=12\\ \\text{m/s}$ (frottements négligés, $g=9{,}8\\ \\text{N/kg}$). Déterminer la hauteur maximale atteinte par conservation de l'énergie mécanique.",
   hint:"Au sommet $v=0$, donc $\\dfrac12 m v_0^2=mg\\,h_{\\max}$.",
   sol:"$\\dfrac12 m v_0^2=mg\\,h_{\\max}\\Rightarrow h_{\\max}=\\dfrac{v_0^2}{2g}=\\dfrac{12^2}{2\\times9{,}8}=\\dfrac{144}{19{,}6}\\approx7{,}35\\ \\text{m}$." },
 { niv:"Défi",
   en:"🏅 <b>Type olympiades.</b> Un skieur de masse $m=70\\ \\text{kg}$ part du repos en haut d'une piste de hauteur $h=40\\ \\text{m}$. En bas, sa vitesse mesurée est $v=25\\ \\text{m/s}$. ($g=9{,}8\\ \\text{N/kg}$, référence en bas de piste.) (a) Calculer l'énergie mécanique en haut et en bas. (b) En déduire l'énergie dissipée par frottement, puis la force de frottement moyenne si la piste a une longueur $L=120\\ \\text{m}$.",
   hint:"Ici $E_m$ n'est pas conservée : $\\Delta E_m=W(\\vec f)=-f\\,L$.",
   sol:"(a) En haut ($v=0$) : $E_m^{\\text{haut}}=mgh=70\\times9{,}8\\times40=27\\,440\\ \\text{J}$. En bas ($z=0$) : $E_m^{\\text{bas}}=\\dfrac12 m v^2=\\dfrac12\\times70\\times25^2=21\\,875\\ \\text{J}$. (b) $\\Delta E_m=21\\,875-27\\,440=-5565\\ \\text{J}$ : l'énergie dissipée est $5565\\ \\text{J}$. Comme $|W(\\vec f)|=f\\,L$, on a $f=\\dfrac{5565}{120}\\approx46{,}4\\ \\text{N}$." }
]

});

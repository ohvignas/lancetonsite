# Lot 8 : regard client, tour 2

Date : 5 novembre 2026. Testé dans Chrome via Playwright sur `http://127.0.0.1:4339/…?apercu`, à 1440 × 900 et à 375 × 812 (DPR 2, tactile), avec le mouvement réduit, sans WebGL (`--disable-webgl --disable-3d-apis`), avec 6 tabulations et en déroulant l'appel complet de l'orbe. Pour ce tour, j'ai relu mon rapport du tour 1 (`lot-8.md`) et rien d'autre.

Résultat global : **0 erreur console, 0 requête en échec, aucun débordement horizontal** sur les 6 éléments, dans les 3 configurations. En mouvement réduit, deux captures prises à 1,2 s d'écart sont identiques pour les 6. Le focus est visible (contour plein de 3 px) sur chaque lien et chaque bouton. Tous les repères sans WebGL s'affichent.

Captures : `persona-biblio/captures-tour2-lot-8/` (`<élément>-1440.png`, `-1440-t2.png`, `-1440-tab2.png`, `-1440-reduit.png`, `-375.png`, `-1440-sans-webgl.png`, `-375-sans-webgl.png`, plus `maille-375-zoom-titre.png`, `carte-1440-zoom.png`, `orbe-parle-1.png`, `orbe-parle-2.png` et `orbe-fin.png`).

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| fonds-hero/rayons-lumiere | 77 | **86** | Oui |
| fonds-hero/remotion-maille | 81 | **87** | Oui (faute de tournage, comme le dit la fiche) |
| fonds-hero/remotion-lignes | 84 | **91** | Oui |
| elements-3d/carte-metal | 75 | **87** | Oui |
| elements-3d/orbe-voix | 68 | **80** | Pas encore |
| elements-3d/voiles-verre | 79 | **83** | Pas encore |

Barème : beauté et finition /40, utilité /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20. Comme demandé, je ne pénalise pas l'absence de vidéo de vigne ni de voix enregistrée payante.

---

## 1. rayons-lumiere : 77 → 86

**Corrections reprises**
- `aria-labelledby="titre"` pointe maintenant sur `<h1 id="titre">` (l. 46-50). **Corrigé.**
- La démo est passée à « La Nef, scène de musiques · saison 2026-2027 », avec 900 places et une création lumière : c'est le bon métier pour des faisceaux, et le nom est fictif. **Corrigé.**
- Repli : il y a un halo, des rayons à `.32` et un flou (`-1440-sans-webgl.png`). Il ressemble enfin au même produit, même s'il reste plus « soleil levant » que « projecteur ». **Corrigé en grande partie.**
- La capture « réduit » montre l'image figée du shader, avec le bouton « Relancer le fond » (`-1440-reduit.png`). **Corrigé.**
- La fiche a une section Licence (code original, Manrope OFL). **Corrigé.**

**Ce que je vois.** À 1440 comme à 375, c'est un vrai hero de salle de concert : le faisceau central est rosé, les rayons sont fins et le titre se lit très bien.

| Beauté 33/40 | Utilité 16/20 | Accessibilité 18/20 | Fiche 19/20 |
|---|---|---|---|

**25 000 € ?** Oui : je le mets sur le site d'une salle ou d'un festival sans rougir.

**Restant (gratuit)**
1. l. 51 : écrire `900&nbsp;places` et `19&nbsp;h&nbsp;30`. À 1440, « 900 » reste en bout de ligne et « places » passe à la suivante (`-1440.png`).
2. Repli l. 27 : resserrer le halo (`40% 30% at 50% -5%`, opacité `.6`) pour qu'il ressemble à la source du shader.

---

## 2. remotion-maille : 81 → 87

**Corrections reprises**
- Newsreader remplace Cormorant : l'accent de « goût » est bien posé, à 1440 comme sur le zoom à 375 (`maille-375-zoom-titre.png`). **Corrigé.**
- L'appel à une graisse 300 non chargée a disparu (`em` en 400, chargée). **Corrigé.**
- À 375, le voile passe à `.85` et le surtitre se détache bien (`-375.png`). **Corrigé.**
- La fiche dit maintenant qu'une vraie vidéo du lieu bat ce fond. **Corrigé.**

**Ce que je vois.** Le titre serif est chaud et net. Le dégradé respire, il est cuivré, et le bouton pause est discret.

| Beauté 33/40 | Utilité 16/20 | Accessibilité 19/20 | Fiche 19/20 |
|---|---|---|---|

**25 000 € ?** Oui, comme fond d'attente sans tournage. La fiche le dit honnêtement.

**Restant (gratuit)**
1. l. 37 : avec `line-height: .95` à 375, la jambe du « q » de « qui » frôle le « d » de « du » (`maille-375-zoom-titre.png`). Passer à `1` sous 767 px.

---

## 3. remotion-lignes : 84 → 91

**Corrections reprises**
- Young Serif remplace Cormorant : « imprimés » est propre, et la police a un caractère « plomb » très juste. **Corrigé.**
- « 600 g/m² » est écrit avec l'exposant. **Corrigé.**
- « Lyon 4ᵉ » est composé avec `<sup>`. **Corrigé.**
- À 375, le voile couvre 70 % de la largeur à `.96` et le chapô est propre (`-375.png`). **Corrigé.**

**Ce que je vois.** C'est l'élément le plus abouti du lot : du papier, des lignes de portée qui ondulent, un rouille d'encre sur « imprimés au plomb ». Un typographe s'y reconnaît.

| Beauté 37/40 | Utilité 16/20 | Accessibilité 19/20 | Fiche 19/20 |
|---|---|---|---|

**25 000 € ?** Oui.

**Restant (gratuit)**
1. À 375, les 40 % du haut de l'écran sont une page crème vide, avec les lignes rejetées sur le bord droit (`-375.png`). Ça peut se défendre comme du blanc, mais on pourrait réduire le `padding-top` ou laisser les lignes visibles sur le haut, puisque le voile n'est utile que derrière le texte : par exemple `linear-gradient(transparent 0 35%, var(--voile-cote) 50%)` en plus du voile latéral.

---

## 4. carte-metal : 75 → 87

**Corrections reprises**
- La gravure est en IBM Plex Mono, chargée par `document.fonts.load` (l. 85). Sur `carte-1440-zoom.png`, « CLAIRE MARCHAND », « 4821 » et « 09/29 » sont dans la bonne police. **Corrigé.**
- La texture est en 2048 avec anisotropie, et la face est nette. **Corrigé.**
- Le brossage est visible (stries horizontales), avec `metalness .9`, `roughness .22` et `iridescence .3` : on a du métal bleu, plus du plastique violet. **Corrigé.**
- Le pictogramme sans contact est présent. **Corrigé.**
- Le repli dit « DÉBIT · PRO / •••• 4821 / CLAIRE MARCHAND / 09/29 », c'est la même carte. **Corrigé.**
- « Zéro frais cachés » devient « des frais affichés, rien d’autre ». **Corrigé.**
- La fiche a une section Licence complète. **Corrigé.**

**Ce que je vois.** Un banquier signerait. La carte est crédible, nette et bien proportionnée (85,6 × 54), et elle suit le pointeur.

| Beauté 35/40 | Utilité 16/20 | Accessibilité 17/20 | Fiche 19/20 |
|---|---|---|---|

**25 000 € ?** Oui.

**Restant (gratuit)**
1. La gravure a l'air **imprimée**, pas gravée : rien n'accroche la lumière. Réutiliser le canvas des textes (texte seul, sur fond noir) comme `bumpMap` avec `bumpScale` ≈ .6 (l. 130-134).
2. Repli l. 63 : ajouter le pictogramme sans contact (trois arcs en `border-radius`). Le repli est aussi incliné dans l'autre sens que la carte 3D : aligner `transform` sur `rotation.z = -.22`.
3. À 375, la carte tombe sous la ligne de flottaison (`-375.png`). C'est acceptable, mais on peut la passer au-dessus du titre, en plus petit, sous 820 px.

---

## 5. orbe-voix : 68 → 80

**Corrections reprises**
- La voix est réelle : au clic, `speechSynthesis.speaking` vaut `true`, le libellé passe à « Arrêter l’appel », les trois répliques sont dites puis « Appel terminé : résumé envoyé par SMS à Julien. ». J'ai compté **4 annonces exactement** dans le `role="status"`, puis le bouton revient à « Écouter un appel type ». **Corrigé** (promesse tenue).
- Repli texte « Lire un appel type » quand il n'y a aucune voix française : **présent** (lu dans le code, l. 88 et 113-116).
- `aria-pressed` redondant : retiré. **Corrigé.**
- Couleurs : l'orbe est pêche et corail, avec des veines claires et un liseré bleu. On ne pense plus à une tomate. **Corrigé en grande partie.**
- Relief au repos à `.035` : la sphère est lisse au repos. **Corrigé.**
- La fiche a une section Licence. **Corrigé.**

**Ce qui bloque encore**
- **La voix choisie sur Mac est « Flo »**, l'une des voix de démonstration Eloquence. Liste réelle de la machine : Thomas, Amélie (fr-CA), Eddy, Flo, Grandma, Grandpa, Jacques, Rocko, Sandy, Shelley. Le filtre `feminine` (l. 86) retient `Flo`, `Sandy` et `Shelley`, qui sont justement les voix robotiques. Le patron d'artisan va entendre une voix de jouet pour « Margot », son futur standard. C'est l'impression qui reste.
- Quand l'orbe parle, sa silhouette devient **un octogone bosselé** (`orbe-parle-2.png`, `voix * (.06 + .05 * onde)`) : ça fait pâte molle, pas voix.
- L'orbe au repos ressemble encore à une planète marbrée (`-1440.png`) plus qu'à une présence vocale.
- Pendant l'appel, l'icône du bouton reste « ● » : pas de carré « arrêt ».

| Beauté 29/40 | Utilité 16/20 | Accessibilité 17/20 | Fiche 18/20 |
|---|---|---|---|

**25 000 € ?** Pas encore : la voix sort enfin, mais sur un Mac c'est une voix gadget, et c'est elle que le client juge.

**Restant (gratuit)**
1. l. 86 : remplacer le filtre par une liste ordonnée de voix de qualité, `["Audrey", "Aurélie", "Google français", "Microsoft Denise", "Microsoft Vivienne", "Amélie", "Thomas"]`, et exclure explicitement `/Eddy|Flo|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley|Jacques/`. Une voix masculine propre (Thomas) vaut mieux qu'une voix féminine de jouet. Dire dans la fiche que la démo s'écoute au mieux avec Audrey (voix « améliorée » de macOS).
2. l. 151 : relief en parole `voix * (.03 + .035 * onde)` et fréquences d'onde plus basses (`normal.y * 5.`), pour une respiration ronde et non une forme anguleuse.
3. l. 121 : pendant l'appel, `bouton.firstElementChild.textContent = "■"`, puis « ● » au retour.
4. Fiche : dire que l'annonce `role="status"` et la voix de synthèse se superposent pour un utilisateur de lecteur d'écran. Proposer `aria-live="off"` pendant la lecture vocale et une seule annonce finale.

---

## 6. voiles-verre : 79 → 83

**Corrections reprises**
- Verre clair (`transmission 1`, `roughness .06`, sans émission) : la réfraction se voit enfin, les rayures du fond se cassent à travers les rubans (`-1440.png`, `-1440-t2.png`). **Corrigé.**
- Le fond est un motif net (rayures obliques) à la place des taches. **Corrigé.**
- La fiche dit « 16 × 1,05 » et a une section Licence. **Corrigé.**
- La zone libre est recalculée après `document.fonts.ready` (l. 184). **Corrigé.**

**Nouveau défaut créé par la correction**
- Les rubans ont **perdu leur couleur** : ils lisent comme de la cellophane gris-noir, avec un rouge sombre presque bordeaux et de grosses taches blanches de reflet brûlé (`-1440.png`, en haut à droite et au milieu). L'orange, le violet et le turquoise de `--voile-1/2/3` ne se voient plus que dans les **bandes du fond**.
- Ces trois bandes obliques de 46 à 70 px, à 20 %, sont maintenant ce qu'on voit en premier : on a un papier peint rayé derrière les rubans, et il vole la vedette au verre. Le repli CSS (`-1440-sans-webgl.png`) est plus beau que la 3D.
- À 375 : « du 14 / mars » est coupé en fin de ligne (`-375.png`).

| Beauté 32/40 | Utilité 14/20 | Accessibilité 19/20 | Fiche 18/20 |
|---|---|---|---|

**25 000 € ?** Pas encore : c'est du verre, maintenant, mais du verre sale. Un verrier veut de la couleur dans la matière, pas sur le mur derrière.

**Restant (gratuit)**
1. l. 115-116 : rendre la teinte au verre sans le rendre opaque. `color: "#ffffff"`, `attenuationColor: couleur`, `attenuationDistance: 2.5`, `thickness: .8`, et teinte de surface légère par `sheen: .4, sheenColor: couleur`. Baisser les reflets brûlés avec `clearcoat: .4`, `envMapIntensity: .7` et `toneMappingExposure: .95` (l. 89).
2. l. 102 : bandes de couleur du fond à `globalAlpha = .07` au lieu de `.2`, et rayures blanches à `.06` (l. 100). Le motif doit se deviner à travers le verre, pas s'imposer à côté.
3. l. 62 : `du 14&nbsp;mars au 2&nbsp;juin`.
4. Fiche, prompt : reprendre ces valeurs (teinte par atténuation longue et bandes à 7 %), sinon une régénération reproduira le défaut.

---

## Bilan du lot

Les corrections du tour 1 ont été appliquées sérieusement : 4 éléments sur 6 passent le cap. **remotion-lignes (91)** est le meilleur. **carte-metal** fait le plus grand bond (+12), et **orbe-voix** aussi (+12), mais il bute sur le choix de la voix. **voiles-verre** a gagné la transparence et perdu la couleur : le prochain réglage doit être un dosage, pas un nouveau changement de cap.

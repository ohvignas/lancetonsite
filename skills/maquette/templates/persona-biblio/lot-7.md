# Lot 7 : fonds de hero (`fonds-hero/`)

Date : 5 novembre 2026. Testé dans Chrome via Playwright sur `http://127.0.0.1:4330/…/fonds-hero/<nom>.html?apercu` et en mode normal, à 1440 × 900 et 375 × 812, avec et sans `reducedMotion: 'reduce'`. J'ai survolé la page, cliqué sur le bouton pause (le libellé change, l'image se fige), fait les tabulations, défilé le hublot (6 positions), mesuré le contraste au pire cas (texte masqué, fond capturé sous chaque bloc, centiles 5 et 95) et regardé la console.
Captures de ce passage, hors bibliothèque : `/private/tmp/claude-501/-Users-antoinevigneau-Library-Application-Support-Claude-scratch-workspaces-25bcb6e3-3306-454a-a769-79fd1fb1860d-16298988-3e01-40a8-9236-6c60ffb4f0b7-scratch-2026-11-03-fbd9f4/78beada7-4659-479f-b3a5-6d5dc98033df/scratchpad/lot7/cap/`

Points communs aux 7 éléments : 0 erreur console, pas de débordement horizontal, image fixe en mouvement réduit (deux captures prises à 1,2 s d'écart sont identiques), et au clavier on atteint le bouton d'action puis le bouton pause, avec un contour de 3 px bien visible. Ce qui manque **dans toutes les fiches** : une ligne « Licence ». « Code écrit par nous » ne suffit pas à un client qui demande ce qu'il a le droit de faire.

| élément | note | 25 000 € ? | médias utiles ? |
|---|---|---|---|
| trame-points | 81 | Oui | Non |
| sphere-particules | 72 | Pas encore | Non |
| champ-etoiles | 77 | Oui | Non |
| anneau-traits | 78 | Oui | Non |
| video-boucle | 79 | Oui | Oui : la vidéo de démo contient une erreur de métier, à régénérer |
| hublot-ciel | 62 | Pas encore | Oui, beaucoup : ciel et nuages en vidéo ou en image générée |
| pave-verre | 72 | Pas encore | Oui : une vraie scène floue à la place des 6 taches |

---

## trame-points : 81/100

Beauté et finition 32/40 · utilité 15/20 · accessibilité, mouvement réduit et repli 18/20 · fiche 16/20

Sur ordinateur, c'est le plus « imprimerie » du lot : la trame en quinconce monte du bas, le titre crème est très net (contraste au 5e centile 17,7:1) et le bouton ambre est franc (`cap/trame-points-1440.png`). Le défaut est sur téléphone : le voile à 0,94 couvre 25 à 75 % de la hauteur, si bien que la trame n'existe plus que dans le dernier cinquième de l'écran. On voit un fond brun presque vide (`cap/trame-points-375.png`). La bosse sous le curseur se perd sous le voile central et ne se lit que sur les bords (`-survol.png`).

**Je l'utiliserais à 25 000 € ?** Oui. Sur ordinateur c'est du niveau agence, et le téléphone se corrige avec une ligne de CSS.

Corrections gratuites :
1. `trame-points.html` l. 27, `@media (max-width: 767px) .hero::after` : desserrer le voile, par exemple `linear-gradient(rgb(20 12 6 / .35), rgb(20 12 6 / .9) 22% 64%, rgb(20 12 6 / .1))`, et passer `.contenu` à `padding-top: 4rem` pour laisser la trame respirer en bas.
2. l. 26 : réduire le cœur du voile radial (`50% 45%` → `42% 38%`) pour que la bosse du curseur se voie autour du bouton.
3. Fiche : ajouter « Licence : code original Lancetonsite, libre d'usage sur les sites clients ».

Médias générés : non, le dessin en code est le sujet même.

## sphere-particules : 72/100

Beauté 29/40 · utilité 13/20 · accessibilité 14/20 · fiche 16/20

Sur ordinateur, c'est propre : texte à gauche, sphère à droite, rotation douce (`cap/sphere-particules-1440.png`). Mais c'est le visuel « IA » qu'on voit partout, et la sphère reste plate (densité uniforme, pas de lumière). Sur téléphone, c'est raté :
- La fiche dit « sur téléphone, la sphère passe au-dessus du titre ». C'est faux : `cy = H * .32` et `R = L * .38` la placent derrière le surtitre et le titre. Des points blancs passent entre les lettres. Au pire cas, le contraste du titre tombe à 1,09:1 et celui du surtitre à 1,7:1 (`cap/sphere-375-zoom.png`).
- Le `text-shadow` sombre posé sur `.contenu` (l. 33) se propage au bouton blanc : « Voir une démonstration » est entouré d'une bavure grise (`getComputedStyle(.btn).textShadow = rgba(4,7,13,.9) 0 1px 12px`). C'est la première chose qu'un client remarque.
- Le tirage `Math.random()` (l. 60) donne une image fixe différente à chaque visite en mouvement réduit. La fiche du champ d'étoiles, elle, utilise une graine fixe.

**Je l'utiliserais à 25 000 € ?** Pas encore : sur téléphone, le titre est illisible et le bouton a l'air sale.

Corrections gratuites :
1. l. 33 : ajouter `.btn { text-shadow: none; }`, ou ne poser l'ombre que sur `.surtitre, h1, .chapo`.
2. l. 69-70, dans `dessiner` : sur téléphone, `cy = H * .2`, `R = L * .3`. En CSS l. 33, passer `.contenu` à `padding-top: 18rem`. La sphère se retrouve vraiment au-dessus du titre, comme la fiche l'annonce.
3. l. 60 : remplacer `Math.random()` par un tirage à graine fixe (même générateur que `champ-etoiles.html` l. 60).
4. Fiche : corriger « au-dessus du titre » une fois la correction 2 faite, et ajouter la licence.

Médias générés : non. Pour une forme reconnaissable (cerveau, logo), il faut un nuage de points issu d'un modèle, pas une image.

## champ-etoiles : 77/100

Beauté 31/40 · utilité 13/20 · accessibilité 16/20 · fiche 17/20

Belle typo (Young Serif, chiffres elzéviriens), deux nébuleuses discrètes, vitesse basse comme promis : c'est un ciel qui vit, pas un tunnel (`cap/champ-etoiles-1440.png`). La graine fixe rend l'image en mouvement réduit stable, c'est bien pensé. Le défaut : les étoiles passent devant et à travers le texte, sans aucun voile. Dans « 4 000 » et près de « huit », un point blanc se lit comme une coquille (`-survol.png`, `-375.png`). Le chiffre « 4 000 étoiles » à l'œil nu dans les Pyrénées est crédible.

**Je l'utiliserais à 25 000 € ?** Oui, pour un observatoire, un gîte de nuit ou un lancement, une fois le texte protégé.

Corrections gratuites :
1. `champ-etoiles.html`, CSS : ajouter `.hero::after { content:""; position:absolute; inset:0; z-index:-1; background: radial-gradient(38% 32% at 50% 50%, rgb(3 4 10 / .85), transparent 75%); }` (le canvas est déjà en `z-index: -1` : passer le canvas à `-2`).
2. Ou, dans `dessiner` l. 85 : sauter les étoiles dont `px, py` tombent dans le rectangle de `.contenu` (mesuré dans `taille`).
3. Fiche : ajouter la licence.

Médias générés : non. Une vraie photo de ciel en ferait un autre élément.

## anneau-traits : 78/100

Beauté 34/40 · utilité 12/20 · accessibilité 16/20 · fiche 16/20

C'est le plus beau du lot sur ordinateur : 300 traits, un dégradé orange vers rouge qui s'éteint en bas, « Concerts » bien calé dans l'anneau. On dirait une affiche de salle (`cap/anneau-traits-1440.png`). Usage étroit (salle, festival, podcast). Sur téléphone, le bloc de texte est plus haut que l'anneau : les traits du haut traversent « Salle Le Fourneau · Rennes » (contraste au 5e centile 2,56:1, `cap/anneau-traits-375.png`). La fiche affirme pourtant que « les traits restent hors du texte ».

**Je l'utiliserais à 25 000 € ?** Oui, pour une salle de concert. C'est exactement ce qu'un programmateur veut voir.

Corrections gratuites :
1. l. 59 : `const R = L < 768 ? Math.min(L * .5, H * .3) : Math.min(L * .42, H * .36);`. Les traits pourront déborder un peu sur les côtés, c'est voulu.
2. CSS l. 25 : sous 768 px, passer `.contenu` à `padding: 3rem 1.5rem` et `.chapo` à `max-width: 18rem` pour que le texte tienne dans le cercle.
3. Fiche, section Accessibilité : ne garder « hors du texte » qu'après la correction 1. Ajouter la licence.

Médias générés : non.

## video-boucle : 79/100

Beauté 33/40 · utilité 19/20 · accessibilité 14/20 · fiche 13/20

C'est le composant le plus utile du lot : affiche préchargée, fichier paysage ou portrait selon l'écran, pas de téléchargement en mouvement réduit (vérifié : seule l'affiche est demandée), bouton pause qui n'apparaît qu'à la lecture. Les défauts :
- **La promesse « on attend `load` » n'est pas tenue.** Mesure : `hero-1920.mp4` est demandé à 197 ms, l'événement `load` arrive à 362 ms. C'est le premier rappel de l'`IntersectionObserver` (l. 81) qui appelle `maj()`, donc `charger()`, avant `load`.
- Le surtitre « Brume · torréfacteur à Marseille » est posé sur le volet clair : contraste de 2,39:1 au 5e centile à 1440 et 2,66:1 à 375 (`cap/video-boucle-1440.png`). Le voile latéral à 0,55 ne suffit pas à cette hauteur.
- **L'œil du torréfacteur :** dans la vidéo, le porte-filtre flotte au-dessus du verre, avec un vide d'environ un centimètre où l'on voit le filet de café (`cap/video-boucle-1440-reduit.png`). Un V60 repose sur la tasse ou la carafe. Un professionnel le voit en trois secondes.
- La fiche reprend un texte générique faux pour une vidéo : « Le dessin ne tourne… Densité de pixels plafonnée », et l'étape 1 « canvas ou calques ». Elle ne dit pas d'où vient la vidéo de démo ni sous quelle licence.
- Si l'on passe de paysage à portrait, le fichier ne change pas (`portrait` est calculé une seule fois, l. 65). C'est mineur.

**Je l'utiliserais à 25 000 € ?** Oui : c'est le fond que je prendrais le plus souvent, après deux corrections de dix minutes. La vidéo d'exemple, en revanche, ne doit pas être montrée à un torréfacteur.

Corrections gratuites :
1. l. 68 et 81-84 : ajouter `let pret = false;`, puis dans l'observer `vu = e.isIntersecting; if (pret) maj();`, et remplacer la dernière ligne par `const go = () => { pret = true; maj(); }; document.readyState === "complete" ? go() : addEventListener("load", go, { once: true });`.
2. l. 27 : renforcer le voile côté texte : `linear-gradient(90deg, rgb(14 10 8 / .7), rgb(14 10 8 / .35) 45%, transparent 70%)`, ou ajouter `.surtitre { font-weight: 600; text-shadow: 0 1px 10px rgb(14 10 8 / .8); }`.
3. `video-boucle.md`, section Performance : la réécrire (vidéo en pause hors écran et onglet caché, aucun téléchargement en mouvement réduit, poids visés). Retirer « canvas ou calques ». Ajouter « Vidéo de démo : générée pour l'exemple Brume (outil, date), licence » et la licence du code.
4. Facultatif : écouter `matchMedia("(max-width: 767px)")` en `change` pour changer de source.

Médias générés : oui. Il faut régénérer la boucle de démo (6 à 8 s, 16:9 en 1920 × 1080 et 9:16 en 1080 × 1920) : un V60 **posé** sur une carafe, sur un rebord de fenêtre marseillais, avec un versement à la bouilloire col de cygne et de la vapeur.

## hublot-ciel : 62/100

Beauté 21/40 · utilité 12/20 · accessibilité 12/20 · fiche 17/20

L'idée est forte : collé à la vitre, puis la caméra recule et le hublot se dessine. La mécanique marche (`--p` va de 0 à 1 de façon régulière, `cap/hublot-ciel-1440-scroll-0.png` → `-0.5` → `-1`). C'est le rendu qui trahit le dessin en code :
- L'aile est un coin noir plat, sans reflet ni épaisseur, et son « winglet » est un bâtonnet planté juste derrière le bouton « Préparer mon voyage ». On dirait une rampe, pas une aile.
- La « mer de nuages » est faite de pastilles roses floues, sans relief, et le soleil est caché par le texte.
- En fin de recul, le hublot (environ 500 px de large) est à peine plus large que le paragraphe : « Vols, transferts… suit » touche les bords de la vitre (`-scroll-1.png`).
- Le paragraphe blanc sur le rose a un contraste de 2,79:1 au 5e centile à 1440 et 3,39:1 à 375. C'est sous 4,5:1. Le titre, au 5e centile, est à 3,53:1 (passe pour du grand texte, de justesse).
- En mouvement réduit, la section garde 220svh : on fait défiler 120svh d'écran figé pour rien (`-reduit-scroll-0.6.png`).

La fiche, elle, est très bonne : prompt détaillé, technique expliquée, réglages.

**Je l'utiliserais à 25 000 € ?** Pas encore. Une agence de voyages qui voit cette aile pense « clipart ».

Corrections gratuites :
1. l. 122-128 : déplacer l'aile hors de l'axe du texte (pointe vers `cx + k * .35, cy + H * .3`), la remplir d'un dégradé (dessus éclairé `rgb(120 70 90)` vers bord d'attaque sombre) au lieu de `#1c1424`, ou la supprimer.
2. l. 41 : renforcer le voile derrière le texte (`34rem 20rem … .42` → `40rem 26rem … .62`) et passer `.chapo` en `font-weight: 500`.
3. l. 22 : `--hublot-hauteur: min(88svh, 124vw)` et `.contenu { max-width: 24rem }` (l. 48) pour que le texte tienne dans la vitre.
4. l. 42 : en mouvement réduit, ajouter `.hublot-scene { height: auto } .hublot-cadre { position: relative }`.
5. Fiche : ajouter la licence et la mesure de contraste réelle (pas « lisible sur le rose »).

Médias générés : oui, c'est ce qui changerait tout. Il faut une image ou une boucle vidéo d'une mer de nuages au coucher du soleil avec un bout d'aile réaliste (16:9 en 2560 × 1440 et 9:16), placée sous le hublot CSS à la place du canvas. Le recul en CSS se garde tel quel.

## pave-verre : 72/100

Beauté 26/40 · utilité 12/20 · accessibilité 18/20 · fiche 16/20

La typographie est réussie (Archivo en extra-large bordeaux, carte blanche, contraste au pire cas 5,5:1 pour le titre et 16:1 pour la carte, `cap/pave-verre-1440.png`). Mais, avec l'œil d'un architecte d'intérieur, ce n'est pas un mur de briques de verre. On voit une mosaïque de carrelage 5 × 5 avec des joints blancs de 2 px. Le biseau diagonal (blanc en haut à gauche, sombre en bas à droite, l. 104-107) donne un effet « pointes de diamant » dans le tiers haut, pas un verre bombé. Une vraie brique de verre (19 × 19 cm) a des joints de mortier gris de 8 à 10 mm, des bords arrondis et un motif ondulé ou nuagé à l'intérieur. Au survol, la bosse se voit à peine : comparez `-1440.png` et `-1440-survol.png`.

**Je l'utiliserais à 25 000 € ?** Pas encore. Le client cité en exemple (architecte, verrier) relèvera tout de suite que ce n'est pas du verre.

Corrections gratuites :
1. l. 109 : joints `rgb(200 195 188 / .9)`, `lineWidth = 3`, couleur ciment au lieu du blanc.
2. l. 104-107 : remplacer le biseau diagonal par un cadre intérieur (liseré clair de 2 px en haut et à gauche, sombre en bas et à droite, puis un dégradé radial léger au centre pour le bombé).
3. l. 102 : simuler l'ondulé en recopiant chaque pavé en 4 bandes verticales décalées de `Math.sin(bande * 1.7 + j) * 3` px.
4. l. 97-99 : renforcer la bosse du curseur (`bosse * 1.4` → `* 2.4`, décalage `* .15` → `* .3`).
5. Fiche : ajouter la licence. La performance indiquée (« environ 700 dégradés par image ») est à remesurer après la correction 3.

Médias générés : oui. Une vraie scène floue en source (photo générée d'un champ de pivoines ou d'une salle d'eau lumineuse, 16:9, 1600 × 900 suffit) à la place des 6 taches rendrait la réfraction lisible. On peut l'animer par une lente translation.

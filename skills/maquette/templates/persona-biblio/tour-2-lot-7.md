# Tour 2, lot 7 : fonds de hero (`fonds-hero/`)

Date : 5 novembre 2026. Testé dans Chrome via Playwright sur `http://127.0.0.1:4339/…/fonds-hero/<nom>.html?apercu`, ainsi qu'en mode normal. J'ai regardé chaque élément à 1440 × 900 et à 375 × 812, avec et sans `reducedMotion: 'reduce'` (deux captures à 1,2 s d'écart). J'ai aussi survolé la page en deux points, fait 6 tabulations, cliqué sur le bouton pause (libellé et image figée vérifiés), défilé le hublot sur 5 positions, chronométré la vidéo par rapport à `load`, passé la vidéo de 1440 à 390 px de large, fait des zooms ×2 sur le pavé et l'aile, et capturé le fond du hublot sous le texte masqué. Le WebGL n'est pas concerné : tous ces éléments sont en canvas 2D, en CSS ou en vidéo.
Captures : `persona-biblio/captures-tour2-lot-7/`.

Points communs, tous vérifiés : 0 erreur console et 0 ressource en échec ; pas de débordement horizontal ; le bouton pause bascule son libellé (« Mettre en pause… » ↔ « Relancer… ») et fige l'image ; le contour de focus fait 3 px. Les lignes **Licence** et **Poids** sont maintenant dans les 7 fiches, avec la police (OFL) et, pour pave-verre, l'origine de la photo (FLUX.2 Pro, date, renvoi aux NOTES). C'était le reproche commun du tour 1 : il est corrigé.

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| trame-points | 81 | **88** | Oui |
| sphere-particules | 72 | **82** | Pas encore (correct partout, mais pas assez distinctif) |
| champ-etoiles | 77 | **86** | Oui |
| anneau-traits | 78 | **87** | Oui |
| video-boucle | 79 | **87** | Oui (vidéo de démo à régénérer, hors périmètre) |
| hublot-ciel | 62 | **80** | Pas encore (un disque sombre derrière le texte) |
| pave-verre | 72 | **77** | Pas encore (on dirait des touches de clavier fumées, pas du verre) |

---

## trame-points : 81 → 88

Beauté 36/40 · utilité 16/20 · accessibilité 18/20 · fiche 18/20

Ce qui est corrigé :
- Sur téléphone, la trame occupe maintenant tout le tiers bas, avec ses points ambre qui grossissent vers le bas, et le titre reste net (`trame-points-375.png`).
- Sur ordinateur, la bosse sous le curseur se lit bien autour du bouton « Demander un devis » (`trame-points-1440-survol.png`).
- La licence est dans la fiche.

**25 000 € ?** Oui. Pour une imprimerie ou un studio graphique, c'est exactement le ton qu'il faut.

Ce qui reste (léger) : sur téléphone, le haut de l'écran (0 à 25 %) est presque vide. Une trame très fine en haut (`opacity .25`) équilibrerait l'écran, mais c'est du goût, pas un défaut.

## sphere-particules : 72 → 82

Beauté 32/40 · utilité 14/20 · accessibilité 18/20 · fiche 18/20

Ce qui est corrigé :
- Sur téléphone, la sphère est bien au-dessus du surtitre, sans aucun point entre les lettres (`sphere-particules-375.png`). La fiche dit maintenant vrai.
- Le bouton est propre : `text-shadow` du bouton mesuré à `none`.
- La graine est fixe (générateur de Park-Miller, l. 59). Deux captures en mouvement réduit dans la même session sont identiques.

Ce qui reste : à 1440, l'éclairage se voit à peine. La densité et la luminosité des points sont presque uniformes, et la sphère se lit comme un disque de poussière (`sphere-particules-1440.png`). C'est propre, mais c'est le visuel « IA » qu'on voit partout. Pour 25 000 €, je veux qu'on sente un volume.

**25 000 € ?** Pas encore. Plus rien n'est faux, mais le rendu n'est pas assez distinctif.

Corrections gratuites :
1. Dans `dessiner` : lier la taille du point à la profondeur (1 px au fond, 2,4 px devant) et son opacité à une lumière dirigée (`0.25 + 0.75 * max(0, dot(n, lumière))`, lumière en haut à gauche). Le côté sombre doit vraiment s'éteindre.
2. Ajouter un très léger halo `rgb(120 160 255 / .08)` en bord de silhouette (effet de limbe) pour détacher la sphère du fond.

## champ-etoiles : 77 → 86

Beauté 35/40 · utilité 14/20 · accessibilité 19/20 · fiche 18/20

Ce qui est corrigé : plus aucune étoile dans « 4 000 », ni près de « huit », ni dans le chapo, à 1440 comme à 375 (`champ-etoiles-1440.png`, `-375.png`). Le voile de nuit ne se voit pas comme une tache, c'est réussi. La licence est dans la fiche.

**25 000 € ?** Oui, pour un observatoire, un gîte de nuit ou un lancement.

Ce qui reste (léger) : une étoile passe derrière le bouton pause translucide (« pause le fond », à 375), sans gravité. Facultatif : faire passer `.pause` à `background: rgb(10 10 20 / .7)`.

## anneau-traits : 78 → 87

Beauté 36/40 · utilité 13/20 · accessibilité 19/20 · fiche 19/20

Ce qui est corrigé : sur téléphone, tout le texte tient dans le cercle et aucun trait ne touche « Salle Le Fourneau · Rennes » (`anneau-traits-375.png`). La fiche dit vrai, et la licence est là.

**25 000 € ?** Oui. C'est l'affiche qu'un programmateur de salle veut voir.

Ce qui reste (léger, typographie) :
1. `anneau-traits.html` l. 42 : à 375, « 600 » reste en fin de ligne et « places » passe à la ligne suivante. Pour un client, un nombre séparé de son unité, c'est une coquille. Écrire `600&nbsp;places` et `19&nbsp;h`.
2. À 1440, « bar » reste seul en fin de ligne, devant « ouvert dès 19 h. ». Écrire `bar&nbsp;ouvert`, ou passer `.chapo` (l. 28) de `text-wrap: pretty` à `balance`.

## video-boucle : 79 → 87

Beauté 33/40 (la vidéo de démo n'est pas pénalisée une deuxième fois) · utilité 19/20 · accessibilité 18/20 · fiche 17/20

Ce qui est corrigé :
- **Le chargement attend vraiment `load`** : `load` arrive à 394 ms, `hero-1920.mp4` est demandé à 397 ms. Au tour 1, la vidéo partait avant.
- **La bascule de format marche** : en passant de 1440 à 390 px, la vidéo passe à `hero-916.mp4` et continue de jouer (`video-boucle-bascule-portrait.png`).
- Le surtitre « Brume · torréfacteur à Marseille » est net sur le volet, à 1440 comme à 375.
- En mouvement réduit, seule l'affiche est chargée, pas de MP4.
- La section Performance de la fiche est juste, avec le poids réel des fichiers et la licence.

**25 000 € ?** Oui. C'est le fond que je prendrais le plus souvent. Une seule condition : remplacer la vidéo de démo (le V60 flotte au-dessus du verre) avant de la montrer à un torréfacteur. C'est noté hors périmètre.

Ce qui reste (léger) : sur téléphone, le bloc de texte recouvre le V60, si bien que le sujet de la vidéo disparaît derrière le titre (`video-boucle-375.png`). La fiche devrait le dire : le cadrage portrait doit placer le sujet dans le tiers haut.

## hublot-ciel : 62 → 80

Beauté 31/40 · utilité 13/20 · accessibilité 18/20 · fiche 18/20

C'est la plus grosse progression du lot :
- **L'aile est devenue une aile.** Elle a un extrados éclairé, un bord d'attaque clair, des lignes de volets, un winglet incliné et un feu vert en bout (`hublot-ciel-zoom-aile.png`). Le feu vert est juste pour une aile droite vue d'un hublot droit, et la flèche part bien vers l'arrière : je n'y vois pas d'erreur de métier.
- La mer de nuages a du relief, avec des nappes qui défilent et le soleil au ras de l'horizon.
- L'aile n'est plus dans l'axe du bouton.
- En fin de recul, le texte tient dans la vitre (`hublot-ciel-1440-scroll-1.png`).
- En mouvement réduit, la page fait exactement 812 px de haut à 375 : plus d'écran figé à faire défiler, on voit directement le hublot fini (`hublot-ciel-375-reduit.png`).

Ce qui empêche le « oui » :
1. **Un disque sombre derrière le texte.** Le voile `radial-gradient(closest-side, rgb(34 14 44 / .64)…)` (l. 47) dessine un cercle brun-violet bien net au milieu du ciel. Quand on masque le texte, on dirait une éclipse ou une tache sur la vitre (`hublot-ciel-fond-sous-texte.png`). Avec le texte, il reste visible comme une auréole sale au-dessus du titre (`hublot-ciel-1440-scroll-0.png`). Au premier regard, le client voit « une tache ».
   Correction : remplacer ce voile par un dégradé vertical qui épouse le ciel, `linear-gradient(rgb(34 14 44 / .55), rgb(34 14 44 / .35) 55%, transparent 75%)`, sur toute la largeur du hublot. On peut compléter par `text-shadow: 0 1px 18px rgb(34 14 44 / .6)` sur `.chapo` et `.surtitre`. Puis remesurer le contraste et l'écrire dans la fiche.
2. Sur téléphone, les coupures de ligne sont mauvaises : « …agence de voyages à » puis « Nantes » seul, et « Partez léger, on » puis « porte le reste. » (`hublot-ciel-375-scroll-0.png`). Il faut `à&nbsp;Nantes` et un `<br>` explicite après « léger, », ou `text-wrap: balance` sur `.surtitre`. À 1440, « retour. » est seul sur sa ligne : écrire `au&nbsp;retour`.
3. Sur téléphone, en fin de recul, le hublot occupe à peine les deux tiers de l'écran et l'aile devient minuscule. On pourrait monter `--hublot-hauteur` à `min(84svh, 150vw)` sous 768 px.

Note : l'anneau blanc autour de « Préparer mon voyage », sur les captures de défilement à 1440, est le contour de focus laissé par mes tabulations. Ce n'est pas un défaut.

**25 000 € ?** Pas encore. Il manque une correction : retirer la tache sombre derrière le titre. Après ça, je l'achète pour une agence de voyages.

Médias : ils ne sont plus indispensables. Une vraie boucle vidéo de ciel reste un plus, mais le dessin tient maintenant debout.

## pave-verre : 72 → 77

Beauté 28/40 · utilité 12/20 · accessibilité 19/20 · fiche 18/20

Ce qui est corrigé :
- Les joints sont de vrais joints de mortier gris, grainés et en retrait.
- Chaque brique a une bordure moulée et un panneau central, comme une vraie brique pressée.
- Il y a des bandes d'ondulation verticales, un reflet en biais et une vraie photo derrière.
- La carte blanche porte le texte (lisibilité parfaite).
- La licence et l'origine de la photo sont dans la fiche.

Ce que voit un architecte d'intérieur :
1. **Le verre est sombre et opaque.** Une brique de verre transmet la lumière : elle est plus claire que le mortier, ou presque aussi claire. Ici, la moitié basse et la moitié droite sont vert-noir, plus sombres que le joint (`pave-verre-1440.png`, `pave-verre-zoom.png`). Avec le reflet en biais et le cadre intérieur, ça se lit comme des **touches de clavier en plastique fumé** ou un bac à glaçons, pas comme du verre. En cause, l. 119 : `fillStyle = "rgb(30 46 44 / .2)"` assombrit toute la brique, puis la teinte `--pave-verre` est appliquée en `multiply` (l. 147) et assombrit encore.
   Correction : supprimer l. 119. Passer le multiply en `globalAlpha = .5`, ou utiliser `screen` avec une teinte plus claire. Ajouter un léger voile clair sur le cœur (`rgb(240 248 246 / .18)`). Un verre de cloison doit laisser une valeur moyenne au-dessus de 60 % de luminance.
2. **La loupe au survol ressemble à une lampe de poche** (un halo chaud), pas à une loupe : la scène derrière n'est pas plus grossie sous le curseur (`pave-verre-zoom-loupe.png` contre `pave-verre-zoom.png`). On peut augmenter le grossissement de la bande (l. 120 et suivantes) en fonction de `bosse`, par exemple `echelleLentille * (1 + bosse * .35)`.
3. La photo (un salon) reste illisible à travers le verre. C'est voulu (« le regard non »), mais on ne lit même pas de formes ni de couleurs franches. Moins de diffusion (l. 81 : `.22` → `.1`) laisserait deviner une silhouette, et c'est ce qui vend le principe.
4. Titre : « LA LUMIÈRE » en capitales, puis « passe, le regard non. » en petit sur la ligne suivante. La hiérarchie coupe la phrase en deux : on lit « LA LUMIÈRE » comme un nom de marque. Il faudrait garder la phrase dans un seul corps de texte, ou mettre « passe, » dans la même taille.

**25 000 € ?** Pas encore. Le mur est bien construit, mais le verre n'a pas l'air d'être du verre. Pour un verrier, c'est rédhibitoire.

Médias : la photo de scène est déjà là. Ce qui manque est du réglage de rendu (clarté, transmission), pas une génération.

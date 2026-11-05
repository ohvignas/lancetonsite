# Mot extrudé en volume

apercu: titre-extrude.html?apercu

Élément 3D · démo : [`titre-extrude.html`](titre-extrude.html) · captures : `captures/titre-extrude-1440.png`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`

- **Technique** : Three.js r170 : `TextGeometry` + `FontLoader` (police « helvetiker bold » des exemples Three.js), une maille par lettre pour les animer séparément, placée à son origine typographique et avancée selon la chasse du glyphe (`glyphs[c].ha / resolution`), avec une table d'approches de paires (`APPROCHES` : VA, AV, LV, LT, TA, AW, WA, YA, AY, LY resserrées) pour que le V et le A s'emboîtent et qu'on lise LEVAIN et non « LEV AIN » ; biseau marqué (`bevelThickness` 0,09). Croûte peinte en code sur canvas 1024² avec un tirage pseudo-aléatoire fixe : dorure en dégradé (caramélisé en haut, doré en bas), cuisson inégale, bulles du levain, craquelures fines, grigne (coup de lame courbe, mie dorée dans l'entaille, oreille brune), farinage de banneton. Une carte de hauteur peinte en même temps devient une **normal map** (dérivées calculées en JS). Deuxième matière sur le groupe biseau + flancs de `TextGeometry` : la même croûte texturée, assombrie par `--mot-croute-flanc` et en relief (`bumpMap`), comme une croûte plus cuite sur les côtés. Texture décalée d'une lettre à l'autre (UV) pour que la grigne ne se répète pas. `sheen` doré, ombres sur un `ShadowMaterial`. Les lettres sautillent en vague et le mot s'incline vers le curseur.
- **Poids** : démo 19,2 Ko (7,9 Ko gzip), aucune image (croûte peinte en code), plus three.module.min.js 171 Ko gzip + FontLoader 1,1 Ko + TextGeometry 0,6 Ko + RoomEnvironment 1,2 Ko + police helvetiker_bold.typeface.json 21,4 Ko gzip (mis en cache d'une démo à l'autre).
- **Inspiré de** : Famille « typo géante + 3D » de https://motionsites.ai/3d-websites (Go On White, Octo Studio, Michelle 3D portfolio : un mot énorme qui occupe le hero). Étude : `../etude/motionsites-3d.md`. Code, géométries et textes écrits par nous, aucun modèle ni asset repris.
- **Licence** : Police « helvetiker bold » = MgOpen Moderna, © 2004 MAGENTA Ltd., licence MgOpen (copie, modification et redistribution libres, notice à conserver ; renommer si on modifie les glyphes) : https://cdn.jsdelivr.net/npm/three@0.170.0/examples/fonts/LICENSE. Notice reprise en commentaire d'en-tête de la démo. Elle ne contient que l'ASCII : **pas d'accents** dans le mot 3D. Pour des accents, générer une police libre (licence OFL) avec facetype.js, ou prendre `droid/droid_sans_bold` (Apache 2.0, 106 Ko gzip).

## Quand l'utiliser

Nom de marque court (4 à 8 lettres) ou mot-clé du métier en ouverture : boulangerie, brasserie, studio, festival. Le vrai titre reste en HTML dessous.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de la section, l'`importmap` et le `<script type="module">`. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes fictifs par ceux de `05-contenus/` et régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
3. Une seule scène 3D par page. Garder le test WebGL avant `import("three")` : le repli ne télécharge rien.
4. Vérifier avec `../verifier-elements.cjs` (normal puis `SANS_WEBGL=1`).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--mot-fond` | `#27323b` | fond ardoise |
| `--mot-croute` | `#c98a4b` | milieu de la croûte (aussi le repli CSS) |
| `--mot-croute-clair` | `#dda65e` | bas des lettres, moins cuit |
| `--mot-croute-fonce` | `#8f5222` | haut des lettres, caramélisé |
| `--mot-croute-ombre` | `#8e5122` | relief CSS de repli |
| `--mot-croute-flanc` | `#9c6238` | teinte qui multiplie la croûte sur les flancs et le biseau (plus cuits) |
| `--mot-encre` | `#f4ede2` | textes |

Dans le script : `MOT` (majuscules sans accent), `APPROCHES` (approches de paires, en unités de police : compléter pour un autre mot, par exemple `PA`, `TO`, `VO`), `POLICE` (URL du JSON), profondeur et biseau dans `TextGeometry`, graine du tirage de la croûte (`20261105`), nombre de grignes, de nuages de farine et de bulles, force du relief (`normalScale`), largeur du mot (78 % de l'écran sur téléphone, 70 % sur ordinateur) et sa hauteur sur téléphone (`demiH * .26`, le mot reste près du titre HTML sans vide dessous), amplitude de la vague (`* .22`) et de l'inclinaison (`incl.x * .22`).

## Prompt pour le régénérer

> Écris un hero en Three.js (r170, importmap ESM) avec un mot géant en volume : `TextGeometry` chargé depuis la police libre helvetiker_bold des exemples Three.js (notice de licence en commentaire), une maille par lettre, biseau marqué, profondeur 0,34 ; avance selon la chasse de chaque glyphe (`ha`) et approches de paires respectées (V et A s'emboîtent : on lit LEVAIN, jamais « LEV AIN »). Matière de croûte de pain crédible, peinte sur canvas 1024² : dégradé caramélisé en haut et doré en bas, cuisson inégale, petites bulles de levain, craquelures fines, une grigne courbe par lettre (mie dorée dans l'entaille, oreille brune relevée), nuages de farine mats ; une carte de hauteur peinte en même temps est convertie en normal map ; flancs et biseau dans une deuxième matière : la même croûte texturée, plus sombre, en relief ; décale les UV d'une lettre à l'autre et garde-les loin de la couture haut/bas de la texture. Sheen doré, ombres douces sur un sol invisible (`ShadowMaterial`). Les lettres sautent l'une après l'autre en vague lente et le mot s'incline vers le curseur. Le mot occupe la moitié haute (78 % de la largeur sur téléphone : aucune lettre ne touche le bord ; pas de vide entre le mot et le titre), le vrai titre HTML, le chapô et deux boutons dessous. Bouton pause, arrêt hors écran et onglet caché ; mouvement réduit : image fixe. Sans WebGL : le même mot en CSS avec un relief en `text-shadow` empilés. Densité de pixels ≤ 2. `aria-pressed` sur le bouton pause. Ajoute le mode `?apercu`. Avant de rendre, vérifie l'élément avec l'œil du métier : chaque objet montré doit être juste pour un professionnel (pièce, matière, outil), et cadré entier à 375 px de large.

## Accessibilité

Le mot 3D et son repli CSS sont `aria-hidden` ; le titre accessible est le `h1` HTML. Bouton pause de 44 px, focus visible, `aria-pressed` (vrai quand le mot est en pause). Contraste texte clair sur ardoise > 11:1. Sans WebGL : affiche fixe + message discret « Aperçu fixe : la 3D n'est pas disponible sur cet appareil. »

## Mouvement réduit

Image fixe, lettres alignées, pas d'inclinaison au curseur. Vérifié avec Playwright (`reducedMotion: "reduce"`) : deux captures à 1,2 s d'écart identiques.

## Performance

Six maillages de texte (quelques milliers de triangles), une ombre 1024². La croûte se peint une fois au démarrage (environ 60 ms : canvas 1024² et calcul de la normal map), deux textures 1024² et une 256² en mémoire graphique. La police pèse plus que le code : ne charger qu'une graisse. Boucle arrêtée hors écran, onglet caché ou en pause. Densité de pixels plafonnée à 2 (`setPixelRatio(Math.min(devicePixelRatio, 2))`). Three.js r170 chargé à la demande (`import()` après le test WebGL) : rien n'est téléchargé quand le repli s'affiche.

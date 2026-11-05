# Dégradé maillé Remotion

apercu: remotion-maille.html?apercu

Fond de hero · démo : [`remotion-maille.html`](remotion-maille.html) · captures : `captures/remotion-maille-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : vidéo rendue avec Remotion (cinq `radial-gradient` animés + vignette), branchée comme `video-boucle.html` ; WebM VP9 ou MP4 H.264 choisi par `canPlayType`.
- **Poids** : démo 7 246 o (3 119 o gzip). Vidéos 7 s, 24 i/s, sans son : paysage 1920×1080 **73 214 o en WebM** / 490 247 o en MP4 ; portrait 1080×1920 **73 520 o en WebM** / 466 249 o en MP4 ; affiches JPG 22 611 o et 21 756 o. Le visiteur ne télécharge qu'un fichier vidéo et une affiche.
- **Typo de la démo** : Newsreader 500 (titre, accents bien posés en très grande taille : « goût », « été », « crû ») et Inter Tight (texte), Google Fonts, SIL Open Font License 1.1. Cormorant Garamond a été écartée : ses accents flottent au-dessus des lettres en taille d'affiche.
- **Source** : `../outillage/remotion-fonds/src/MailleRespire.tsx`, compositions `maille-paysage` et `maille-portrait`. Recette complète : `../outillage/remotion.md`.
- **Inspiré de** : les fonds « mesh gradient » courants sur les pages d'accueil (F9 de `../motionsites-etude.md` pour le branchement vidéo). Code et textes écrits par nous.
- **Licence** : nos vidéos et notre code sont libres d'usage dans le plugin. **L'outil** Remotion, lui, est gratuit seulement pour les particuliers, les entreprises de 3 personnes max, les associations et l'évaluation ; licence entreprise au-delà (détail dans `../outillage/remotion.md`). Regénérer la vidéo demande donc de vérifier la situation de l'utilisateur ; la publier, non.

## Quand l'utiliser

Hero sombre et chaleureux, sans photo : artisanat, vin, café, restaurant, cosmétique, studio. Le dégradé donne de la matière sans rien raconter, le titre porte le message. Pour une vigne, une cave ou un restaurant, une vraie vidéo du lieu (rangs de vigne, salle, cuisine) bat toujours ce fond : il sert faute de tournage. À préférer à `aurore-maillee.html` (WebGL) quand on veut zéro JavaScript lourd et le même rendu sur tous les appareils.

## Brancher dans une maquette

1. Copier `medias/remotion-maille-{paysage,portrait}.{webm,mp4,jpg}` dans le site.
2. Copier la `<section class="hero-video">`, le bloc CSS « À copier » et le `<script>`.
3. Pour les couleurs du design system : relancer le rendu avec `--props` (voir Prompt), pas de filtre CSS sur la vidéo.
4. Remplacer les textes fictifs par ceux de `05-contenus/`. Un seul fond animé par page.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `data-src` | `medias/remotion-maille-{format}.{ext}` | `{format}` = paysage / portrait (seuil 767 px), `{ext}` = webm / mp4 |
| `data-affiche` | `medias/remotion-maille-{format}.jpg` | affiche immédiate, gardée en mouvement réduit et en fond CSS de secours |
| `--fond-hero` | `#150f0c` | = `fond` de la composition, pas de flash avant l'affiche |
| `--voile-cote / --voile-bas` | `rgb(21 15 12 / .6) / .8` (`.85` sous 767 px, voile vertical) | voile de lisibilité côté texte |
| props Remotion `fond`, `couleurs[5]`, `amplitude` | brun, terre cuite, sable, prune, crème, rouille ; 1 | à changer **avant** le rendu |

## Prompt pour le régénérer

> Écris une composition Remotion 4 (TypeScript) « dégradé maillé qui respire » : un fond uni et cinq taches de couleur en `radial-gradient` qui dérivent lentement (`sin`/`cos` de k × phase avec k entier, phase = 2π × image / durée), un gonflement de 6 % une fois par boucle et une vignette fixe qui assombrit les bords. 7 s à 24 i/s, 1920×1080 et 1080×1920, couleurs en props. Rends-la, recompresse en H.264 CRF 30 `+faststart` et en VP9 CRF 40, sors l'image 0 en JPG. Puis écris le hero HTML : vidéo muette sans `autoplay`, WebM si `canPlayType('video/webm; codecs="vp9"')` sinon MP4, fichier paysage ou portrait selon la largeur, affiche préchargée, téléchargement après `load`, rien en mouvement réduit, bouton pause visible dès la lecture, arrêt hors écran et onglet caché, voile sombre côté texte.

## Accessibilité

Vidéo décorative : `aria-hidden`, `tabindex=-1`, muette. Bouton « Mettre en pause la vidéo » de 44 px, focus visible (WCAG 2.2.2). Texte crème `#fbf1e6` sur un voile sombre : contraste vérifié sur l'image la plus claire de la boucle (tache sable en haut à droite, le texte est en bas à gauche).

## Mouvement réduit

La vidéo n'est jamais téléchargée : l'affiche (image 0) reste. Le bouton n'apparaît pas. Vérifié par `verifier-elements.cjs` : deux captures à 1,2 s d'écart identiques.

## Performance

Une vidéo de 73 Ko en WebM : moins qu'une photo de hero. Décodage matériel, aucun calcul côté page hors 30 lignes de JS. La lecture ne tourne que hero visible et onglet actif. Vérification : `OK` (0 erreur console, pas de débordement à 1440 et 375, réduit fixe).

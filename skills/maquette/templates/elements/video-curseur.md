# Vidéo pilotée au curseur

apercu: video-curseur.html?apercu

Élément · démo : [`video-curseur.html`](video-curseur.html) · captures : `captures/video-curseur-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : JS (`video.currentTime` suit l’abscisse du pointeur, lissé ; repli en blob si le serveur refuse les requêtes Range) + `<input type=range>`
- **Poids** : démo 7,5 Ko (3,3 Ko gzip) + vidéo `medias/versement-960.mp4` 786 Ko (804 394 octets) + affiche `medias/versement-960.jpg` 64 Ko
- **Inspiré de** : E10 (« cursor-tracking », leçon du même nom) dans `../motionsites-etude.md`. Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. Police Inter Tight : SIL Open Font License 1.1. Vidéo et affiche : ré-encodage de `../exemples/b2c-brume/videos/hero-1920.mp4` (générée pour le kit), à remplacer par celle du client.

## Quand l'utiliser

Un geste court et réversible : verser un café, tourner une pièce, ouvrir une boîte, un visage qui tourne la tête. Vidéo de 3 à 6 s sans coupe, caméra fixe, **dont l’image de début et celle de fin sont nettement différentes** (verre vide puis plein, boîte fermée puis ouverte) : c’est la condition de l’effet. Un geste continu qui se ressemble d’un bout à l’autre (un filet de café qui coule) ne se « fait » pas sous le doigt.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `06-medias/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--vc-lissage` | `.14` | 0,05 très doux, 0,4 nerveux |
| `--vc-cadrage` | `50% 50%` | `object-position` de la vidéo et position de l’affiche : le point du sujet à garder quand le cadre est recadré (téléphone, aperçu plein écran). La démo met `72% 60%` pour garder le dripper. |

**Serveur** : se déplacer dans une vidéo demande un serveur qui accepte les requêtes `Range` (réponse `206 Partial Content`, en-tête `Accept-Ranges: bytes`). Tous les hébergeurs le font ; le serveur Python `http.server` de base non (le serveur de test du kit sur le port 4339, si). Le script vérifie `video.seekable` au chargement des métadonnées et, si la vidéo n’est pas navigable, la recharge une fois par `fetch` en `blob:` (786 Ko), où elle l’est toujours.

La vidéo doit être encodée avec des images clés rapprochées sinon le déplacement saccade : `ffmpeg -i source.mp4 -an -vf scale=960:-2 -c:v libx264 -crf 31 -g 6 -keyint_min 6 -movflags +faststart sortie.mp4`. La démo réutilise la vidéo de l’exemple Brume (aucune génération) : c’est la seule vidéo des exemples, et son geste se lit mal (le filet coule du début à la fin, le niveau du verre monte à peine). Une vidéo dédiée ferait mieux (voir ci-dessous).

## Prompt pour le régénérer

> Écris un bloc vidéo dont la lecture suit la position horizontale du pointeur : `currentTime` vise `x / largeur × durée`, approché par lissage dans une boucle `requestAnimationFrame` qui s’arrête à la cible. Un curseur `<input type="range">` visible, avec son `<label>`, pilote la même cible pour le clavier et le toucher ; une pastille « ‹ Glissez › » sur la vidéo disparaît au premier geste. Vidéo muette, chargée après l’évènement `load`, recadrée par une variable `--vc-cadrage` (object-position) qui garde le sujet dans le cadre au téléphone. Si `video.seekable` ne couvre pas toute la durée (serveur sans requêtes Range), recharge-la une fois en `blob:`. Choisis une vidéo de 3 à 6 s, caméra fixe, dont l’état de début et l’état de fin sont nettement différents. En mouvement réduit : affiche fixe, vidéo non chargée, curseur et pastille masqués par l’attribut `hidden` — avec une règle `.video-curseur [hidden] { display: none }`, sans quoi le `display: flex` du curseur l’emporte et il reste visible.

## Accessibilité

La vidéo est décorative (`aria-hidden`, hors tabulation) ; le curseur a un `<label>` et un contour de focus blanc. La pastille d’indice est `aria-hidden` (le label dit déjà quoi faire). Rien ne bouge sans action du visiteur.

## Mouvement réduit

La vidéo n’est pas chargée, curseur et pastille sont masqués (`hidden`, rendu effectif par `.video-curseur [hidden] { display: none !important }`) : l’affiche (`medias/versement-960.jpg`) reste seule.

## Performance

Préchargement différé à `load`, 786 Ko à 960 px. Ne pas dépasser 1 Mo : réduire la durée ou la largeur plutôt que la qualité. Aucune dépendance externe hors polices de la démo.

## Média qu’une génération apporterait

Une vidéo dédiée de 4 s, 16:9, caméra fixe, sujet au centre, début et fin bien distincts : une main verse l’eau d’une bouilloire col de cygne dans un V60 garni d’un filtre papier, la carafe en dessous passe de vide à pleine. Coût estimé : environ 0,40 à 1 € pour 4 s selon le modèle (non lancé : aucune génération payante dans le kit).

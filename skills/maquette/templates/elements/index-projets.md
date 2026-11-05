# Index de projets plein cadre

apercu: index-projets.html?apercu

Élément · démo : [`index-projets.html`](index-projets.html) · captures : `captures/index-projets-1440.webp`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + ScrollTrigger : scène épinglée sur (n − 0,5) écrans, `snap: "labelsDirectional"` sur les étiquettes de la timeline (un geste = un projet, jamais deux), noms masqués en `yPercent`, photos en `autoAlpha` + `scale`
- **Poids** : démo 10351 octets (3896 gzip) + GSAP 3.15.0 + ScrollTrigger (jsdelivr, versions fixées ; ≈ 46 Ko gzip, déjà chargés si la page utilise `prototype/gestes.js`)
- **Inspiré de** : composant « Scroll Index » de scrolltide.co (bibliothèque de prompts d’animations au défilement), vidéo d’aperçu publique. Prompt payant non consulté. Code, textes et réglages écrits par nous ; voir `../etude/scrolltide.md`.
- **Licence** : code Lancetonsite original (libre d’usage dans les maquettes du kit). GSAP 3.15.0 et ScrollTrigger sous licence Standard « no charge » de GreenSock/Webflow (usage commercial permis, voir `gsap-bonnes-pratiques.md` § 1 et https://gsap.com/standard-license). Photos de démo reprises de `../exemples/artisan-sablon/images/` (générées pour le kit) : à remplacer par celles du client.

## Quand l’utiliser

Portfolio, réalisations, collections : 3 à 6 projets qui méritent chacun l’écran entier. Compte comme un épinglage.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l’élément et son `<script>`. Le bloc « Démo » et les `[data-explication]` ne servent qu’à la page d’exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `06-medias/`.
3. Régler les variables ci-dessous sur le thème de la maquette (`07-maquette/prototype/theme.css`).
4. Si la page charge déjà `gestes.js`, ne pas recharger GSAP. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `.ix` background | `#12100e` | fond sous les photos |
| `.ix` color | `#fbf8f2` | noms et détails (sur voile 42 %) |
| focus des vignettes | `#f2b880` | contour clavier |

Un écran de défilement par projet, plus un demi-écran de tenue après le dernier avec une étiquette `fin` (`end: () => "+=" + (n − .5) * innerHeight`) : un grand geste vers le haut depuis la section suivante retombe sur le dernier projet au lieu de le survoler. Vignettes = les grandes photos elles-mêmes, en `object-fit: cover` (déjà chargées, même sujet que le projet). Aimantation `labelsDirectional` : mesuré, 3 crans de molette depuis un projet mènent au suivant, jamais au surlendemain. Les vignettes sont des boutons qui défilent jusqu’à l’étiquette du projet.

## Prompt pour le régénérer

> Écris un index de projets épinglé avec GSAP ScrollTrigger : chaque projet prend l’écran à son tour, photo plein cadre sous un voile sombre et nom géant au centre. Entre deux projets, le nom sortant monte et disparaît dans un masque, la nouvelle photo apparaît en fondu en dézoomant de 1,12 à 1, le nouveau nom monte depuis le bas, puis sa ligne de détail apparaît. Une timeline avec une étiquette par projet ; la dernière étiquette tombe exactement sur la fin de la timeline (ajoute la petite tenue de fin comme un tween vide, pas comme un décalage d’étiquette, sinon l’aimantation vise au-delà de `end`). Aimantation `snap: { snapTo: "labelsDirectional", duration: { min: .2, max: .5 }, delay: .15, inertia: false }` : un geste court de molette ou de doigt mène toujours au projet suivant, sans en sauter un. Le projet courant est l’étiquette la plus proche de la tête de lecture. Ajoute après le dernier projet un demi-écran de tenue avec une étiquette `fin`, pour qu’un grand geste vers le haut depuis la section suivante retombe sur le dernier projet. Une colonne de vignettes (rangée en bas sur téléphone), qui reprennent les grandes photos recadrées en `object-fit: cover`, marque le projet courant avec `aria-current` et chaque vignette est un bouton qui fait défiler jusqu’à son projet. Avec `gsap.matchMedia()` : en mouvement réduit ou sans GSAP, les projets sont simplement empilés, sans épinglage ni vignettes. Dans les textes affichés, utilise les apostrophes typographiques (’), jamais l’apostrophe droite.

## Accessibilité

Les projets inactifs sont `aria-hidden` pendant la scène ; vignettes = boutons de 44 px nommés, focus visible ; noms en `h2`.

## Mouvement réduit

Liste verticale des projets, photo et nom, rien d’épinglé. Tout passe par `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` : la classe d’état et les ScrollTrigger sont annulés d’eux-mêmes si la préférence change.

## Performance

Seuls `opacity`, `visibility` et `transform` sont animés. Images suivantes en `loading="lazy"`. `ScrollTrigger.refresh()` après le chargement des images.

# Flacon en verre

apercu: flacon-verre.html?apercu

Élément · démo : [`flacon-verre.html`](flacon-verre.html) · captures : `captures/flacon-verre-1440.webp`, `-375.png`, `-1440-reduit.png`, `-1440-sans-webgl.png`

- **Technique** : Three.js 0.170 + THREE-CustomShaderMaterial. Flacon tourné en `LatheGeometry` (profil extérieur qui monte, intérieur qui redescend : une vraie paroi), sans couture : UV retirés, sommets fusionnés par `mergeVertices` (`BufferGeometryUtils`), normales recalculées. Verre = `MeshPhysicalMaterial` (transmission 1, IOR 1,5, épaisseur, atténuation verdâtre) étendu par CSM d'un liseré de Fresnel. Liquide = corps tourné + disque de ménisque dont les sommets sont déplacés dans le shader (relèvement contre la paroi + double ondulation, normale recalculée). Dégradé de couleur selon la hauteur. Éclairage `RoomEnvironment`, fond rayé derrière pour que la réfraction se voie, ombre douce en texture. Tonalité `NeutralToneMapping` (ACES grisait le décor vu à travers le verre).
- **Paquets** : `three@0.170.0`, `three-custom-shader-material@6.4.0` (entrée `vanilla`, sans React).
- **Poids** : démo 20 563 octets (7 500 gzip). Bibliothèques : Three.js 171 Ko gzip, CSM 4,5 Ko gzip, `RoomEnvironment` 1,2 Ko gzip.
- **Inspiré de** : exemples « transmission » de three.js et README de THREE-CustomShaderMaterial. Code, profil et shaders écrits par nous.

## Licence

- **THREE-CustomShaderMaterial** : MIT, © 2024 Faraz Shaikh — https://github.com/FarazzShaikh/THREE-CustomShaderMaterial/blob/main/LICENSE.md (vérifiée sur le dépôt le 5 novembre 2026). Impose de garder la mention de copyright et la licence avec le code redistribué : mention en en-tête de la démo.
- **Three.js** : MIT — https://github.com/mrdoob/three.js/blob/dev/LICENSE.

## Quand l'utiliser

Fiche produit ou hero d'un produit liquide en flacon : sirop, huile, parfum, liqueur, cosmétique. Le visiteur change le parfum et voit la couleur dans le verre ; il change la contenance (25 cl, 50 cl, 1 L) et le flacon grandit ou rapetisse, le prix suit. Sur téléphone, le flacon passe au-dessus des choix et reste collé en haut pendant qu'on choisit. Une seule scène 3D par écran.

## Brancher dans une maquette

1. Copier l'importmap, le bloc « à copier », le `<div class="flacon-cadre">` (avec son repli CSS) et les deux scripts. Le bouton Pause est dans `.flacon-cadre`, à côté de la scène, pas dedans.
2. Adapter le profil `ext` / `int` à la silhouette du vrai flacon (rayon, hauteur ; une photo de profil suffit pour relever 10 points).
3. Brancher les choix : chaque radio de parfum porte la couleur en `value` ; chaque radio de contenance porte `data-prix` et `data-taille` (échelle visuelle). Un flacon vendu est plein : le niveau reste une variable de réglage (`--flacon-niveau`), pas un choix proposé au client.
4. Vérifier avec `../verifier-elements.cjs`, puis avec `SANS_WEBGL=1`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--flacon-liquide` | `#7a1f3d` | couleur du liquide (3D et repli CSS) |
| `--flacon-niveau` | `.86` | 0 = vide, 1 = plein (réglage de démonstration, pas un choix client) |
| `--flacon-taille` | `1` | contenance : `.86` = 25 cl, `1` = 50 cl, `1.15` = 1 L (le flacon 3D est mis à l'échelle `taille^1,6`, la caméra recule de 40 % de l'écart) |
| `--flacon-fond` | `#d5dfda` | fond du studio (et des rayures) |
| `transmission`, `ior`, `thickness` | 1 / 1,5 / 0,25 | rendu du verre |
| `RAYON`, `BAS`, `HAUT` | 0,585 / 0,1 / 1,32 | zone que le liquide peut occuper |

Après un changement de variable CSS, envoyer `flacon:maj` sur la boîte (`boite.dispatchEvent(new Event("flacon:maj"))`).

## Prompt pour le régénérer

> Écris une démo HTML autonome d'un flacon de sirop en verre avec Three.js 0.170 (importmap) et `three-custom-shader-material@6.4.0/vanilla`. Tourne le flacon en `LatheGeometry` à partir d'un profil fermé (extérieur puis intérieur) pour avoir une paroi épaisse. Le verre est un `CustomShaderMaterial` sur `MeshPhysicalMaterial` (transmission 1, IOR 1,5, faible rugosité, atténuation légèrement verte) qui ajoute un liseré de Fresnel dans `csm_Emissive`. Le liquide est opaque (sinon le verre ne le voit pas) : corps en `LatheGeometry` et ménisque en `RingGeometry` dont le vertex shader relève le bord contre la paroi et fait onduler la surface, avec la même fonction GLSL appliquée au haut du corps, et une normale recalculée par différences finies. Supprime la couture de la révolution (retire les UV, `mergeVertices`, `computeVertexNormals`). Couleur, niveau et taille viennent de variables CSS `--flacon-liquide`, `--flacon-niveau` et `--flacon-taille`, réglées par deux groupes de radios (parfum ; contenance 25 cl / 50 cl / 1 L avec prix 6,90 / 12,50 / 21 €) ; l'`aria-label` élide « de » devant voyelle (« sirop d’abricot »). Sous 860 px, le flacon passe au-dessus des choix en `position: sticky`. Éclairage `RoomEnvironment`, fond rayé derrière, `NeutralToneMapping`. Rotation lente, bouton Pause hors du `role="img"`, arrêt hors écran et onglet caché, mouvement réduit suivi en direct (`change` sur `matchMedia`), densité de pixels ≤ 2. Sans WebGL : un flacon dessiné en CSS avec la même couleur, le même niveau et la même taille. En mouvement réduit : une image fixe, redessinée seulement quand on change un réglage.

## Accessibilité

La scène est `role="img"` avec un `aria-label` mis à jour (« Flacon de sirop d’abricot, 1 L, en verre, bouchon de liège. », élision gérée). Le bouton Pause est **hors** de l'image (un enfant de `role="img"` peut être masqué aux lecteurs d'écran) : libellé visible « Pause » / « Relancer », nom accessible complet « Mettre en pause la rotation du flacon ». Parfums et contenances en boutons radio natifs (44 px, focus visible, flèches du clavier). Prix en `aria-live="polite"`.

## Mouvement réduit

Pas de rotation ni d'ondulation : une image fixe, redessinée une fois à chaque changement de parfum ou de contenance. Le bouton Pause n'est pas affiché. Le réglage est suivi en direct (pas besoin de recharger).

## Performance

La transmission rend la scène deux fois (passe des objets opaques, puis passe finale) : rester sur un seul objet transmissif. Boucle arrêtée hors écran et onglet caché. La géométrie du liquide n'est reconstruite qu'à un changement de réglage.

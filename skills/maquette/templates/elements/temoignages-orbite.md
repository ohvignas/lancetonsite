# Témoignages en orbite

apercu: temoignages-orbite.html?apercu

Élément · démo : [`temoignages-orbite.html`](temoignages-orbite.html) · captures : `captures/temoignages-orbite-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : HTML (`figure`/`blockquote` superposés en grille) + CSS (portraits en position absolue autour de la citation, recadrés sur le visage par trois variables `--fx`, `--fy`, `--z`, fond en dégradé pastel) + 15 lignes de JS
- **Poids** : démo 11 951 octets (4 093 gzip) ; portraits de démo : `../exemples/commerce-odette/`, `abonnement-sillon/`, `logiciel-miroir/`, `liberal-calade/`
- **Inspiré de** : section « testimonial » du modèle Arcfield de la bibliothèque Jiro (https://jiro.build/components/testimonial/testimonial-arcfield), vue en aperçu public. Idée relevée seulement ; code et textes écrits par nous. Voir `../etude/jiro.md`.
- **Licence** : code maison Lancetonsite, libre pour les sites clients. Police Figtree sous licence SIL OFL 1.1 (Google Fonts). Portraits de démo : images générées (FLUX.2 Pro) pour les exemples fictifs du kit, Lucie recadrée en 320 × 320 depuis `logiciel-miroir/images/equipe-1400.webp` (Odette, Claire, Lucie, Hélène : personnes inventées, voir les `NOTES.md` de chaque exemple), réservées aux démos ; en production, uniquement les vraies photos des clients, avec leur accord écrit. Technique observée sur jiro.build, code non repris.

## Quand l'utiliser

Bloc d'avis d'un cabinet, d'un service ou d'un artisan qui a 3 à 5 clients d'accord pour montrer leur visage. Les portraits autour de la citation disent « de vraies personnes » avant même la lecture. Sans vraies photos de clients, ne pas l'utiliser (des visages d'illustration détruisent la confiance).

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, la `<section class="orbite" data-orbite>` et le `<script>`.
2. Une `figure.or-citation` par avis, un portrait `.or-portrait` par avis, dans le même ordre ; deux bulles courtes au plus (`.or-bulle`). **La bulle reprend un extrait exact de la citation, au mot près** (« 4 200 € récupérés », pas « 4 200 € retrouvés ») : des guillemets qui ne citent pas, c'est grave pour un cabinet comptable ou juridique.
3. Recadrer chaque portrait sur le visage : sur l'`<img>` de `.or-visage`, `--fx` et `--fy` donnent le centre du visage dans la photo (de 0 à 1), `--z` la hauteur de la photo en nombre de diamètres du rond (visage ≈ 55 % du rond). Vérifier à 64 px que l'on voit un visage, pas une silhouette. En production, préférer des fichiers déjà recadrés, carrés, à 2× la taille affichée au minimum et 3× idéalement (192 × 192 pour un rond de 64 px). Le portrait de Lucie de la démo est un recadrage net 320 × 320 de `equipe-1400` (`medias/temoignages-lucie-320.webp`, 17 Ko).
4. Remplacer la note (« 4,9 / 5 ») par la vraie note et sa source ; vérifier avec `../verifier-elements.cjs`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--or-fond` | dégradé lavande → pêche | fond du bloc |
| `--or-encre` | `#1e1b2e` | texte |
| `--or-accent` | `#5b3fd6` | mot mis en avant, portrait actif, point actif |
| `--or-portrait` | `64px` (52 px sur mobile) | diamètre des portraits |

Positions des portraits : classes `.or-p1` à `.or-p4` (deux en haut, deux à mi-hauteur, symétriques). Recadrage de chaque portrait : `--fx`, `--fy` (centre du visage, 0 à 1) et `--z` (zoom), posés sur l'`<img>`.

## Prompt pour le régénérer

> Écris un bloc de témoignages dans une grande carte arrondie au fond pastel : au centre un surtitre, une pastille guillemet, puis une citation de 1,3 à 1,9 rem, sans guillemets dans le texte (la pastille suffit : une seule marque de citation) dont trois ou quatre mots sont mis en couleur d'accent, avec la photo, le nom et le métier du client. Autour, quatre portraits ronds bordés de blanc posés en absolu et symétriques (deux avec une bulle qui reprend mot pour mot un extrait de la citation) ; chaque portrait est un bouton `aria-pressed` qui affiche son témoignage en fondu. Chaque portrait est recadré serré sur le visage (centre du visage et zoom en variables), pour qu'on voie un visage à 64 px. En bas, flèches précédent/suivant de 44 px et points de position ; en bas à gauche une petite carte « 4,9 / 5 » avec sa source. Aucun défilement automatique. La liste des portraits est placée avant la citation dans le HTML : sur mobile, ils passent en rangée au-dessus de la citation (et l'ordre de tabulation suit l'ordre visuel), le portrait actif ne grossit que de 6 % pour ne rien toucher, et les bulles disparaissent. Mouvement réduit : pas de fondu.

## Accessibilité

Pas de rotation automatique (rien à mettre en pause). Portraits = boutons nommés par le client, état `aria-pressed` ; la zone des citations est `aria-live="polite"`. Flèches de 44 px avec `aria-label`. Anneau de focus à l'encre `#1e1b2e` (≥ 13:1 sur le fond pastel), accordé au texte. Ordre de tabulation : portraits, puis flèches, comme à l'écran sur mobile ; aucun chevauchement mesuré à 375 et 1440 px. Contraste sur le fond pastel : texte 13,7:1, mots en accent 5,5:1, textes secondaires 5,9:1.

## Mouvement réduit

Changement de témoignage instantané.

## Performance

Quatre portraits réutilisés deux fois (même fichier, pas de second téléchargement). Portraits de production : carrés, déjà recadrés sur le visage, à **2× la taille affichée au minimum, 3× idéalement** (rond de 64 px → 128 px minimum, 192 px idéalement ; 160 px pour le rond de 52 px sur mobile), soit des fichiers de 15 à 25 Ko en WebP. La démo recadre en CSS des photos de 320 à 1 000 px.

# Grille anti-« design généré par IA »

Grille écrite pour Lance ton site, inspirée des principes publiés par Impeccable
(pbakaus/impeccable, Apache-2.0) et `frontend-design` (anthropics/skills, Apache-2.0).
À utiliser quand `impeccable` n'est disponible ni en local ni via le MCP `ui-skills` — sinon, `impeccable` fait foi.

Chaque point trouvé est noté : **bloquant** (à corriger avant livraison) ou **à
justifier** (acceptable si la charte l'impose explicitement).

## Mise en page

- [ ] **Bloquant** — Le gabarit par défaut : grand titre centré + sous-titre + bouton
      arrondi + 3 cartes identiques (icône, titre, texte).
- [ ] **Bloquant** — Grille de cartes toutes identiques, cartes dans des cartes.
- [ ] À justifier — Grille parfaitement symétrique partout ; aucune tension, aucun vide
      assumé.
- [ ] **Bloquant** — Petits libellés en capitales au-dessus de chaque titre (« eyebrow »)
      qui n'apportent aucune information.
- [ ] **Bloquant** — Numéros de section 01 / 02 / 03 décoratifs.
- [ ] À justifier — Fenêtres modales par réflexe.
- [ ] **Bloquant** — Faux chiffres « héros » (« +10 000 clients satisfaits ») sans preuve.

## Couleur

- [ ] **Bloquant** — Dégradé violet-bleu ou « aurora » sans lien avec la charte.
- [ ] **Bloquant** — Texte en dégradé.
- [ ] À justifier — Fond crème + titre serif + accent terracotta (le « look éditorial IA »).
- [ ] À justifier — Fond presque noir + un seul accent acide (le « look tech IA »).
- [ ] **Bloquant** — Texte gris sur fond coloré à faible contraste.
- [ ] **Bloquant** — Une information portée par la couleur seule.

## Matière et profondeur

- [ ] **Bloquant** — Glassmorphism décoratif (flou + transparence sans fonction).
- [ ] À justifier — Ombre portée diffuse sur tout ; « carte fantôme » (bordure fine +
      grande ombre).
- [ ] À justifier — Ombres décalées dures hors d'un vrai style néo-brutaliste.
- [ ] **Bloquant** — Blobs, sphères 3D, formes organiques flottantes de remplissage.
- [ ] À justifier — Fonds à rayures ou quadrillages décoratifs.
- [ ] À justifier — Bordure latérale colorée épaisse sur les cartes.

## Typographie

- [ ] À justifier — Polices vues partout : Inter, Roboto, Open Sans, Lato, Montserrat,
      Poppins, Arial, Helvetica, Space Grotesk, Plus Jakarta Sans, Geist, Instrument
      Serif, Fraunces.
- [ ] **Bloquant** — Plus de 2 familles.
- [ ] **Bloquant** — Un mot du titre mis en couleur ou en italique « pour le style ».
- [ ] À justifier — Police monospace comme déguisement « technique ».
- [ ] **Bloquant** — Lignes de texte de plus de 80 caractères ; titres d'affichage
      au-delà de 6 rem ; interlettrage plus serré que -0,04 em.

## Icônes et images

- [ ] **Bloquant** — Emojis ou caractères Unicode utilisés comme icônes.
- [ ] **Bloquant** — Images de banque génériques, placeholders gris, rectangles vides.
- [ ] **Bloquant** — Illustrations SVG « croquis » génériques.
- [ ] À justifier — Pictogrammes clipart du métier (planche, toque, clé à molette).

## Mouvement

- [ ] **Bloquant** — Rebonds, éléments qui tournent, texte qui clignote.
- [ ] **Bloquant** — Tout apparaît en même temps au défilement, ou tout est animé.
- [ ] **Bloquant** — Pas de prise en compte de `prefers-reduced-motion`.
- [ ] À justifier — Parallaxe marquée.

## Textes dans la maquette

- [ ] **Bloquant** — Lorem ipsum, « Titre ici », textes vagues : « Libérez votre
      potentiel », « Vivez l'expérience », « Solutions innovantes ».
- [ ] **Bloquant** — Faux avis, faux logos clients, fausses statistiques.
- [ ] À justifier — Tirets cadratins à répétition, formules aphoristiques en fin de bloc.

## Qualité minimale (à vérifier, pas à justifier)

- [ ] Contraste texte ≥ 4,5:1, grand texte et interface ≥ 3:1.
- [ ] Focus clavier visible sur tout élément interactif.
- [ ] Tous les états construits : survol, focus, actif, désactivé, chargement, erreur, vide.
- [ ] Cibles tactiles ≥ 44 × 44 px.
- [ ] Sélection de texte, barres de défilement et focus aux couleurs de la marque.
- [ ] Mobile pensé d'abord, pas adapté après.
- [ ] Un titre H1 unique, hiérarchie sans saut.

## La question finale

« Si on enlève le logo, devine-t-on de quelle entreprise il s'agit ? » Si la réponse est
non, le design system est générique : revenir à la charte et à la matière du métier.

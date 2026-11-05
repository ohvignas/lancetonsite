# Persona bibliothèque, tour 2, lot 3

Date : 2026-11-05. Regard indépendant : les rapports du relecteur n'ont pas été lus ; seuls mon rapport du tour 1 (`lot-3.md`) et le résumé des corrections ont servi.
Testé dans Chrome (Playwright) sur `http://127.0.0.1:4339/.../elements/<nom>.html?apercu` et sans `?apercu`, à 1440 × 900 et 375 × 812 (tactile), puis à 1366, 1280, 1180, 1024, 880, 768, 620 et 320 px pour les deux éléments de mise en page. Mouvement réduit, 8 tabulations, survol, clic et appui, mesures image par image (`requestAnimationFrame`) des largeurs et positions.
Console : **aucune erreur, aucune ressource manquante** sur les 6 éléments, en aperçu comme en mode normal.
Captures : `persona-biblio/captures-tour2-lot-3/`.

| élément | tour 1 | tour 2 | 25 000 € ? |
|---|---|---|---|
| bouton-balayage | 80 | **88** | Oui |
| bouton-brouille | 82 | **88** | Oui |
| bouton-permute | 70 | **87** | Oui |
| bouton-chrome | 82 | **89** | Oui |
| cartes-eventail | 70 | **78** | Pas encore |
| temoignages-orbite | 73 | **86** | Oui (avec les vraies photos du client) |

Grille : beauté et finition /40, utilité réelle /20, accessibilité, mouvement réduit et repli /20, fiche et prompt /20.

---

## bouton-balayage : 80 → 88

**Vérification des corrections du tour 1**
1. État repos du principal : **corrigé**. Liseré cyan et léger halo, libellé plus clair ; le secondaire « Rapport type » reste neutre (`bouton-balayage-375.png`). Sur téléphone, on sait enfin où appuyer.
2. Copier-coller : **corrigé**. Une sélection de la rangée donne « LANCER L’AUDIT RAPPORT TYPE », sans doublon (mesuré).
3. Fiche : **corrigé**. Licence, cas du mobile et classe `discret` sont décrits, et le prompt est à jour.

Le balayage reste bien synchronisé (`-1440-survol-350ms.png`, `-survol-fin.png`). Focus cyan 3 px (`-1440-focus1.png`), ambre pour le secondaire. Pas de débordement à 375.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 36/40 | Le principal a de la présence au repos sans crier. |
| Utilité | 14/20 | Toujours un élément de niche (sites sombres et techniques). |
| Accessibilité, repli | 19/20 | Repli complet, contraste, couleurs forcées (3 px pour le principal). |
| Fiche, prompt | 19/20 | Complète. |

**25 000 € ?** Oui, pour un client en sécurité, en logiciel ou en matériel.
**Reste (léger, 0 $)** : l. 82, `aria-label="Lancer l'audit"` utilise une apostrophe droite alors que le texte visible a l’apostrophe typographique. Mettre `’` partout.

---

## bouton-brouille : 82 → 88

**Vérification** : anneau de la variante claire **corrigé**. `--br-anneau: #b98cff`, environ 8:1 sur le noir, bien lisible et séparé du bouton par l’`outline-offset` (`bouton-brouille-1440-focus-clair.png`). Variable documentée, ratio 7,1:1 corrigé dans la fiche, licence ajoutée, mise en garde sur les liens au doigt ajoutée. La démo ne cite plus de marque de jeu. Largeur toujours figée (194,9 px, écart < 0,1 px sur 120 images ; le voisin ne bouge pas).

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 33/40 | Effet net ; la variante claire reste un peu plate à côté de la sombre. |
| Utilité | 16/20 | Le second libellé apporte une vraie information (prix, délai). |
| Accessibilité, repli | 20/20 | Nom accessible fixe, anneaux ≥ 8:1, mouvement réduit propre. |
| Fiche, prompt | 19/20 | Complète, piège du `pointerenter` documenté. |

**25 000 € ?** Oui, pour un hébergeur ou un outil pour développeurs.
**Reste (léger, 0 $)** : facultatif. Donner à `.brouille.clair` une ombre interne ou une bordure de 1 px `#4c1fb0` à 30 % pour qu’elle ait autant de matière que la sombre.

---

## bouton-permute : 70 → 87

**Vérification** : le saut au survol est **corrigé, mesuré**. Sur 137 images (entrée puis sortie du survol) : largeur du bouton constante à 253,7 px, position du bouton voisin constante à 637,7 px, et le libellé glisse en continu de 56,8 à 20,2 px (`bouton-permute-1440-survol0-200ms.png`, `-survol1-fin.png`). C’est exactement le geste promis. Apostrophes typographiques dans la démo, licence et contrainte de largeur dans le prompt : faits.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 35/40 | Geste fluide et joyeux, sans à-coup ; belles couleurs. |
| Utilité | 15/20 | Appel à l’action chaleureux, sur fond clair comme sombre. |
| Accessibilité, repli | 18/20 | Focus 3 px (orange 4,4:1, anthracite 14,8:1), icônes masquées, mouvement réduit. |
| Fiche, prompt | 19/20 | Le prompt dit maintenant comment éviter le défaut. |

**25 000 € ?** Oui, pour un studio, une agence ou un artisan au ton chaleureux.
**Reste** : rien de bloquant. Facultatif : l’anneau orange (4,4:1) passerait à plus de 7:1 avec `outline-color: #7c2d12` sur fond clair.

---

## bouton-chrome : 82 → 89

**Vérification** : le dégradé conique est **défini une seule fois** (`--chr-lunette`, l. 24, utilisé l. 32). L’anneau de focus est désormais **anthracite**, `--chr-anneau: #1d1d1f`, accordé au métal (`bouton-chrome-1440-focus2.png`) : il fait bijou, pas navigateur. La marque réelle est retirée de la démo, l’apostrophe est typographique, la licence et les variables sont dans la fiche. Le reflet tourne toujours proprement au survol (`-1440-survol-450ms.png`).

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 36/40 | Très beau métal ; le focus ne casse plus la palette. |
| Utilité | 14/20 | Niche (luxe, précision), mais juste dans cette niche. |
| Accessibilité, repli | 19/20 | 16:1 et 15:1, anneau 12:1, couleurs forcées, repli sans `@property`. |
| Fiche, prompt | 20/20 | La teinte du métal se change à un seul endroit, et la fiche donne des exemples (or, bronze, titane). |

**25 000 € ?** Oui, pour un orfèvre, un horloger ou une marque audio.
**Reste** : rien.

---

## cartes-eventail : 70 → 78

**Vérification**
- Éventail centré, carte du dessus droite, légende lisible : **corrigé** (`cartes-eventail-1440-ouvert.png`).
- Légendes du dessous masquées : **corrigé** (opacité 0 mesurée sur les cartes 1 à 4).
- Légendes conformes aux photos : **corrigé**. Je les ai toutes relues en potier (`-1440-suivante1` à `4`) : assiettes plates crues, cylindre au tour, croûte au laminoir pour des plats à la plaque, grand vase, saladier au tour. Rien à redire.
- Débordement sur téléphone : **corrigé à 375 et 320 px**. Pile ouverte après un appui sur « Carte suivante », les cartes vont de 6 à 369 px et la page reste à 375 de large (`-375-suivante.png`).
- Fiche : licence Pexels et provenance des photos, consigne « la légende décrit ce qu’on voit », contrôle mobile : faits.

**Nouveau défaut, bloquant : entre 601 et 1366 px, la pile ouverte dépasse.** Le resserrement ne s’applique que sous 600 px, alors que dans la démo la pile occupe une demi-colonne à partir de 860 px. Mesures, pile ouverte :

| largeur d’écran | largeur de la page |
|---|---|
| 1280 | 1311 |
| 1180 | 1261 |
| 1024 | 1151 |
| 880 | 1043 |
| 620 | 691 |

Il y a donc un **défilement horizontal sur un portable de 13 pouces et sur une tablette**. À 1024, la carte de gauche passe aussi **sur le paragraphe** et coupe « restaura… » et « ava… » (`cartes-eventail-1024-ouvert.png`). Le tour 1 ne testait que 375 et 1440 : c’est entre les deux que ça casse.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 33/40 | Très belle à 1440, mais elle déborde sur le texte à 1024. |
| Utilité | 15/20 | Bonne alternative au carrousel pour 3 à 6 photos d’atelier. |
| Accessibilité, repli | 13/20 | Le « reflow » échoue à 620, 880, 1024 et 1280 px. Points positifs : `inert`, annonce, flèches au clavier, mouvement réduit. |
| Fiche, prompt | 17/20 | La fiche affirme « aucun défilement horizontal » mais n’a vérifié que 375 et 320 px. |

**25 000 € ?** Pas encore : sur un portable de 1280 px, la page défile de côté dès qu’on survole les photos.

**Corrections (0 $)**
1. `cartes-eventail.html` l. 16-25 : régler l’écart sur la largeur réelle du conteneur, pas sur l’écran. Ajouter `container-type: inline-size` sur un parent de `.eventail`, ou sur `.eventail` en lui donnant `width: 100%`. Puis `--ev-ecart: clamp(6px, (100cqi - var(--ev-largeur)) / 12, 26px);`, à ajuster pour que les cartes extrêmes restent dans la colonne. Si l’on ne veut pas de requête de conteneur : `--ev-ecart: min(26px, 1.6vw)` et `--ev-angle: 5deg` entre 600 et 1366 px.
2. Garde-fou demandé au tour 1 et pas appliqué : `overflow-x: clip` sur le conteneur de section de la démo, et, dans la fiche, « mettre `overflow-x: clip` sur la section parente ».
3. `cartes-eventail.md`, points de contrôle et § Accessibilité : vérifier la pile ouverte à 375, 768, 1024 et 1280 px, et pas seulement en dessous de 600 px. Ajouter « l’éventail ne doit pas couvrir la colonne de texte voisine ».

---

## temoignages-orbite : 73 → 86

**Vérification**
- Visages : **corrigé**. Recadrage `--fx/--fy/--z`, on voit un visage dans chaque rond de 64 px (`temoignages-orbite-portrait1-zoom.png` à `4`). Les quatre femmes sont distinctes et crédibles pour leur métier.
- Bulles : **corrigé**. « Tout est prêt en janvier » et « 4 200 € récupérés » sont des extraits exacts. Il n’y a plus que deux bulles, donc moins de bruit.
- Mobile : **corrigé**. Rangée de portraits au-dessus de la citation, ordre de tabulation portraits → flèches (mesuré), portrait actif à 1,06, aucun chevauchement, hauteur constante (664 px) sur les 4 avis (`-375-pleine.png`, `-375-p4.png`).
- Composition à 1440 : **corrigée**. Portraits symétriques deux par deux (`-1440-p1.png`).
- Fiche : licence (portraits générés, réservés aux démos), recadrage et bulles exactes : faits.

À 1024 et 880 px, mon script signale des recouvrements de boîtes (portraits et bloc de citation), mais à l’œil les portraits tombent dans les marges et rien ne se touche (`temoignages-orbite-1024-p3.png`). Je ne le compte pas.

| critère | note | pourquoi |
|---|---|---|
| Beauté, finition | 34/40 | Carte élégante, de vrais visages. Le portrait de Lucie (source de 192 px agrandie) est un peu mou à 3×. La pastille « “ » au-dessus d’une citation qui a déjà ses « » fait doublon. |
| Utilité | 16/20 | Très utile pour un cabinet, à condition d’avoir les vraies photos. |
| Accessibilité, repli | 18/20 | Boutons `aria-pressed`, `aria-live`, ordre logique, pas de rotation automatique. |
| Fiche, prompt | 18/20 | Juste et honnête sur les photos. |

**25 000 € ?** Oui, pour un cabinet ou un service dont les clients prêtent leur visage.
**Reste (léger, 0 $)**
1. l. 92 et 104 : utiliser une source plus grande pour Lucie (recadrer `equipe-1400` en 320 × 320 au lieu de 192). Le prompt et la fiche demandent 160 px, mais un écran 3× en veut au moins 192 ; écrire « 2× la taille affichée, 3× idéalement ».
2. l. 97 : soit retirer les « » de la citation, soit retirer la pastille guillemet. Une seule marque de citation suffit.

# Brume — exemple B2C « niveau agence »

Torréfacteur fictif de la Belle de Mai (Marseille). Page d'accueil : `index.html` + `gestes.js` + médias générés.

> **Version actuelle : refonte « immersif plein écran »** (dernière section de ce fichier). Huit écrans pleins au lieu de douze sections ; `index.html`, `brume.src.css`, `brume.css` et `gestes.js` ont été réécrits. Les sections 1 à 7 et les itérations 2 à 4 ci-dessous décrivent la version précédente (« niveau agence », 94/100) et restent comme historique : les médias, `etiquette.js` et le modèle 3D viennent d'elles.
Exemple fictif — Lance ton site. Marque, adresse, avis, lieux partenaires, contacts et prix sont inventés, mais écrits comme si la cliente (Sofia Benali) les avait fournis : la page elle-même ne porte plus de mention « exemple » (elle est dans le commentaire en tête de `index.html` et ici). Aucun formulaire n'envoie quoi que ce soit : le paiement, le coffret et la lettre sont des parcours de démonstration, branchés pour de vrai à l'étape « construire ».

## Structure du dossier

```
index.html         la page : 8 écrans pleins (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27, model-viewer 4.2.0 chargé à la demande)
brume.src.css      source Tailwind v4 (@theme + composants) → brume.css compilé, minifié (≈ 27 Ko)
etiquette.js       étiquette dessinée en canvas : texture du sachet 3D (avec la date) ; dessiner() sert aussi la carte « story » (plus utilisée par la page)
gestes.js          version « film » propre à la page (le kit templates/prototype/gestes.js n'est pas modifié)
images/            webp, deux tailles par image (pleine et -560 ou -960)
images/torref/     61 images de la séquence « torréfaction » (canvas piloté par le défilement)
videos/            hero-1920.mp4 (321 Ko, CRF 29) et hero-916.mp4 (228 Ko, recadrage vertical sur le V60), muettes, en boucle
models/            sachet.glb (397 Ko, étiquette cuite dans la texture), sachet-texture.webp, sachet-uv.png
captures/          15 captures webp de la refonte (8 écrans à 1440 × 900, 1280 × 720, 5 vues mobiles, mouvement réduit)
```

Les sources brutes (PNG 2K, MP4 originaux, 67 Mo) ne sont pas livrées dans le kit. Pour régénérer les tailles, repartir des URL fal ou des prompts du § 3.

## 1. Direction artistique

- **Lumière du Sud, matière, grain.** Soleil dur du matin qui rase en biais, ombres de persiennes, calcaire, papier kraft, verre. Pellicule moyen format (Portra 400) et grain visible, y compris un grain SVG fixe posé sur toute la page.
- **Palette** : calcaire `#E9E3D7`, pierre `#DCD3C3`, torréfié `#1A120D`, outremer `#1F3FBF` (CTA), safran `#E9A93B`, cerise `#B8321E`, olive `#4F5D3A`. Chaque café a sa couleur de sachet : Konga safran, El Mirador cerise, Kanzu outremer, Boa Vista olive. Le fond de la page passe d'une couleur à l'autre au fil des sections.
- **Typographie** : Bricolage Grotesque (axes opsz et wdth : titres serrés et denses, interface) et Newsreader (notes de dégustation en italique, citations, corps éditorial). Mise en page éditoriale sur 12 colonnes, avec beaucoup d'air, des asymétries et des chiffres en très grand.

## 2. Accroches du hero

| | Accroche | Commentaire |
|---|---|---|
| A | Le café frais du mardi, livré chez vous. | Claire, mais un concurrent pourrait la signer. |
| **B — retenue** | **Torréfié mardi à Marseille. Dans votre tasse jeudi.** | Preuve de fraîcheur concrète (2 jours), lieu, rythme. Elle structure toute la page : le chapitre « Du grain à la tasse » se lit jour par jour. |
| C | Adieu le café de supermarché. Bonjour la Belle de Mai. | Drôle et locale, mais elle part du négatif et ne dit pas ce qu'on achète. |

## 3. Journal de génération (fal, budget 3 $ ; dépensé ≈ 1,88 $)

Toutes les images partent d'une image maîtresse (le hero). Chaque autre image est un *edit* qui reprend le hero en référence, avec ce bloc de style commun :

> STYLE (same shoot as the reference image: use it only for light, film grain, color grading and materials, NOT its composition): medium format film, Kodak Portra 400, fine visible film grain, hard natural Mediterranean sunlight raking from the left with crisp long shadows, faint steam catching the light. Palette: limestone #E7E1D6, roasted brown-black #1A120D, Mediterranean ultramarine #1F3FBF, saffron #E9A93B, coffee-cherry red #B8321E. Tactile, natural, warm but crisp, never glossy advertising. No text, no logos, no labels, no letters, no recognizable faces.

| # | Fichier | Modèle | Sujet du prompt (résumé ; le bloc STYLE est ajouté à chaque fois) | Coût ≈ |
|---|---|---|---|---|
| 1 | hero-poster | fal-ai/nano-banana-2, 2K, 16:9, seed 4242 | Rebord de fenêtre en calcaire, café qui coule d'un dripper en verre dans un gobelet, vapeur dans le rayon, ombres de persiennes, toits en tuile et mer brumeuse floue, tiers gauche vide pour le texte. Sans personne ni texte. | 0,12 |
| 2 | manifeste | nano-banana-2/edit, 1K, 4:5, réf. hero | Deux mains burinées (sans visage) autour d'une tasse blanche sans anse, rayures de soleil. | 0,09 |
| 3 | sachet-jaune | idem | Sachet kraft safran mat, sans aucune étiquette, valve ronde, posé sur un bloc de calcaire devant un fond calcaire, ombre longue, trois grains de café. | 0,09 |
| 4 | etape-ferme | idem | Ferme d'altitude en Éthiopie : branche chargée de cerises rouges, une main (sans visage), collines dans la brume. | 0,09 |
| 5 | etape-torrefaction | idem | Grains qui tombent d'un torréfacteur en fonte dans le bac de refroidissement, fumée dans un rayon de soleil. | 0,09 |
| 6 | etape-envoi | idem | Vue de dessus : carton kraft emballé par deux mains, sachets jaune et bleu sans étiquette, ombres de persiennes. | 0,09 |
| 7 | etape-tasse | idem | Balcon marseillais : table bistrot en marbre, tasse fumante, sachet safran, ombres de la rambarde, mer et îles dans la brume. | 0,09 |
| 8 | atelier | nano-banana-2/edit, 2K, 16:9 | Atelier-boutique dans une ancienne manufacture de tabac : calcaire, brique, verrières, torréfacteur, sacs en jute, comptoir et bocaux. | 0,09 |
| 9 | final | idem | Corniche au petit matin : verre de café sur un parapet, Frioul dans la brume, chemin de soleil sur l'eau, grande zone calme. | 0,09 |
| 10–12 | sachet-rouge, -bleu, -vert | nano-banana-2/edit, 1K, réf. sachet-jaune | « Same photograph… only change the color of the pouch paper to » cerise `#B8321E` / outremer `#1F3FBF` / olive `#4F5D3A`. | 0,24 |
| 13 | coffret | nano-banana-2/edit, réf. sachet-jaune + hero | Coffret kraft ouvert, trois petits sachets (safran, cerise, outremer) sans texte, ruban, brin de thym, ombres de persiennes. | 0,08 |
| 14 | sachet.glb | fal-ai/trellis (image → 3D), depuis sachet-jaune | — | 0,02 |
| 15 | hero.mp4 | Kling 2.5 turbo pro, image → vidéo, 5 s, image de début = image de fin = hero (boucle) | « Static locked-off camera… a thin steady stream of coffee keeps pouring… soft steam rises… seamless loop ». Prompt négatif : mouvement de caméra, texte, personnes, scintillement. | 0,35 |
| 16 | torrefaction.mp4 → séquence de 61 images | Kling 2.5 turbo pro, image → vidéo, 5 s, depuis etape-torrefaction | « Static camera. Freshly roasted coffee beans keep cascading out of the roaster door… the stirring arm turns slowly… smoke and steam swirl ». | 0,35 |

Aucune régénération n'a été nécessaire. Le texte des étiquettes n'est pas dans les images : c'est du HTML (`.etiquette`) posé sur les sachets dans la gamme. Il reste donc lisible, traduisible et modifiable.

### Optimisation

```bash
# images : deux tailles, webp q78
cwebp -q 78 -resize 1920 0 src/atelier.png -o images/atelier-1920.webp      # + -960 (atelier, final, hero-poster)
cwebp -q 78 src/manifeste.png -o images/manifeste.webp                       # + -resize 560 0 → -560
# vidéo hero : H.264, muette, faststart
ffmpeg -i src/hero.mp4 -an -vf "scale=1920:-2,format=yuv420p" -c:v libx264 -preset slow -crf 20 -profile:v high -movflags +faststart videos/hero-1920.mp4
ffmpeg -i src/hero.mp4 -an -vf "scale=960:-2,format=yuv420p"  -c:v libx264 -preset slow -crf 23 -movflags +faststart videos/hero-960.mp4
# séquence : 12 i/s, 640 px, webp q66 → 61 images, 2,4 Mo, chargées par lots de 6
ffmpeg -i src/torrefaction.mp4 -vf "fps=12,scale=640:-2" fr/f-%04d.png && for f in fr/*.png; do cwebp -q 66 $f -o images/torref/$(basename $f .png).webp; done
```

Poids total du dossier, captures comprises : 8,5 Mo, dont 2,4 Mo de séquence chargée à la demande.

## 4. Sections et gestes

| # | Section | Gestes |
|---|---|---|
| 0 | En-tête | `data-header` : transparent sur le hero, puis plein et caché quand on descend ; CTA magnétique |
| 1 | Hero (vidéo en boucle + poster) | `data-hero-pin="shrink"` (**moment signature** : le plein cadre se resserre en carte arrondie et la vidéo zoome), titre en SplitText ligne à ligne, date de la prochaine torréfaction calculée en direct |
| — | Bande défilante | `data-marquee` mesuré en px (boucle sans à-coup) |
| 2 | Manifeste | `data-split-scrub` mot à mot, `data-image-reveal`, compteurs, persiennes en parallaxe |
| 3 | La gamme (4 cafés) | `data-hscroll` épinglé (desktop), glisser + scroll-snap natif (mobile), `data-tilt`, survol riche : teinte qui monte, sachet qui se soulève, profil révélé en clip-path, jauges qui se remplissent ; curseur « Choisir » ; « Je le veux » pré-remplit le configurateur |
| 4 | Du grain à la tasse | `data-steps` épinglé en 4 jours : volets en clip-path, barres de progression, étape 2 = canvas de 61 images joué par le défilement |
| 5 | Sachet 3D | `model-viewer[data-model-scroll]` épinglé : le sachet tourne au défilement et suit la souris, 3 notes s'allument tour à tour (valve, papier, tampon), halo safran |
| 6 | Abonnement | configurateur à tuiles (café, méthode, quantité, rythme) : prix en odomètre, total annuel, phrase récap révélée, éventail de sachets animé, conseil par méthode, confirmation sans envoi |
| 7 | Avis et presse | fond safran via `data-bg`, citation SplitText, bande défilante des titres de presse |
| 8 | Atelier | `data-grow` (carte → plein écran), parallaxe, horaires, statut « ouvert / fermé » calculé à l'heure de Paris |
| 9 | Coffret | `data-image-reveal` + tilt, formulaire (mouture, date parmi les 4 prochains jeudis), confirmation |
| 10 | FAQ | `details[data-accordion]` exclusifs (`name="faq"`), contenu qui glisse |
| 11 | Dernier appel + lettre | parallaxe, CTA magnétiques, lettre avec validation et message de confirmation (aucun envoi) |
| 12 | Pied de page | logo géant en safran révélé ; Nous suivre, Nous écrire, liens légaux (itération 2) |
| — | Mobile | barre CTA collante `data-sticky-cta`, cachée sur l'abonnement, le dernier appel et le pied de page |

Mouvement réduit (`prefers-reduced-motion`) : vidéo en pause sur son poster, chiffres à leur valeur finale, couleurs posées sur chaque section, étapes et notes 3D affichées en grille statique. Le header, l'accordéon et la barre CTA restent actifs.

## 5. gestes.js : changements à reporter dans `templates/prototype/gestes.js`

1. **Ordre des épinglages.** Tous les gestes épinglés (`[data-hero-pin]`, `[data-grow]`, `[data-steps]`, `[data-hscroll]`, `model-viewer[data-model-scroll]`) sont créés **dans l'ordre du DOM** à l'intérieur de `mm.add`, via un objet `gestesEpingles`. Bug corrigé : la frise `steps` était créée avant la galerie `hscroll`, ce qui faisait se chevaucher les débuts d'épinglage (3996 contre 4061).
2. **Nouveau `data-hero-pin="shrink"`.** Clip-path de plein cadre vers `inset(9% 5% 12% 5% round 28px)`, zoom intérieur jusqu'à 1,12, texte qui s'efface. Durée : +90 % sur desktop, +55 % sur mobile.
3. **`data-steps` enrichi.**
   - Transition en volet clip-path `inset(100% 0 0 0)` → `inset(0)`, avec un zoom de 1,18 à 1.
   - `[data-step-bar]` se remplit en scaleX.
   - Un `canvas[data-sequence]` placé dans une étape est joué par la frise.
   - Longueur : nombre d'étapes × 85 % sur desktop, × 40 % sur mobile.
4. **`data-hscroll`.** Épinglé seulement à partir de 768 px. En dessous, glisser natif avec scroll-snap en CSS. `data-hscroll="all"` force l'épinglage partout.
5. **Séquence d'images (`preparerSequence`).**
   - Taille du canvas fixée une seule fois.
   - Si une image manque, on affiche la plus proche déjà chargée.
   - Première image tout de suite, le reste par lots de 6 avec `decode()`. Cela évite les ERR_CONNECTION_RESET sur des petits serveurs.
   - Fonctionne aussi en mouvement réduit (une image fixe).
6. **model-viewer.**
   - Nouveaux attributs `data-model-start` et `data-model-phi`.
   - `[data-model-scene][data-model-pin]` épingle la scène (200 % sur desktop, 110 % sur mobile).
   - `[data-model-note]` et `[data-model-line]` apparaissent au fil de la rotation.
   - La souris ajoute ±15° sur desktop.
   - Orbite fixe en mouvement réduit.
   - **Épingler model-viewer en 4.2.0** : la 4.3.1 écrit « [$updateSource] called! » dans la console.
7. **Gestes d'interface, actifs même en mouvement réduit.**
   - `data-header="#hero"` : classes `is-solide` et `is-cache`, réapparition au focus clavier.
   - `data-sticky-cta` + `data-hide-on` : IntersectionObserver, avec bascule de `inert` et `aria-hidden`.
   - `details[data-accordion]` + `[data-accordion-body]`.
   - `window.gestes.odometre(el, "12,50")` : bandes de chiffres qui roulent (`.odo-col`, `.odo-bande`, `.odo-sep`), `aria-label` = valeur + `data-odometer-suffix`. Ajouter `font-variant-numeric: tabular-nums` et `text-align: center` dans le CSS, sinon on lit « 1 2,50 ».
8. **Branche mouvement réduit.** Ajoute la classe `motion-reduit`, met les vidéos en pause, pose les chiffres à leur valeur finale et applique en ligne les couleurs `data-bg` / `data-fg` de chaque section.
9. **Petites corrections.**
   - Lenis : `lerp: 0.1` et `anchors: { offset: -70 }` (les ancres tombent sous l'en-tête).
   - `data-split-delay`.
   - `data-reveal="0.35"` sert de délai.
   - `data-counter-sep` (format fr-FR, « 1 950 »).
   - Bande défilante : distance de boucle mesurée en px, écart compris (plus de saut).
   - Changement de fond avec `overwrite: "auto"`.
   - `play()` des vidéos avec `.catch`.
   - L'intensité du tilt vient de la valeur de `data-tilt`.
10. **Curseur.** Classes `is-pret` et `is-label`. La mise à l'échelle se fait en CSS sur l'élément intérieur `.curseur-rond`, pour ne plus se battre avec les x/y de gsap.
11. **CSS à reprendre dans le prototype.**
    - Repli en mouvement réduit pour les étapes, hors `@layer` pour passer devant Tailwind : `html:not(.motion) .steps-grille { height:auto }`, étapes empilées, médias en grille sur 2 colonnes.
    - `.motion [data-bg] { background: transparent }` / `html:not(.motion) [data-bg]` prend ses propres couleurs.
    - Ne pas mettre d'utilitaire de couleur Tailwind (`text-blanc`) sur un élément dont une classe d'état (`.is-solide`) change la couleur : l'utilitaire gagne.
12. **Images hors écran dans une piste horizontale.** Pas de `loading="lazy"` sur les visuels d'une piste en glisser natif : sur mobile, la 4ᵉ carte ne se chargeait jamais.

## 6. Vérification (Playwright + Chrome, serveur http local)

- Desktop 1440 × 900 et mobile 375 × 812, défilement progressif, 22 captures par format : **0 erreur console**, `scrollWidth == innerWidth` (1440 / 375), **toutes les images chargées**.
- Configurateur : Kanzu, espresso, 500 g, 15 jours → « 23,90 € par livraison », 621,40 € par an, confirmation affichée.
- Lettre : message d'erreur sur une adresse vide, puis confirmation.
- Mouvement réduit : classe `motion-reduit`, vidéo en pause, aucun élément resté caché, 0 erreur.
- Vidéo de défilement 1440 × 900, 26 s : produite par screencast CDP puis ffmpeg, car `recordVideo` réclame le ffmpeg de Playwright, absent de la machine.

## 7. Note sur la grille `niveau-agence.md` § 6

| Critère | /max | Note | Ce qui la justifie | Ce qui manque |
|---|---|---|---|---|
| Direction artistique | 15 | 14 | Lumière, matière, grain, 4 couleurs-produits, typo à axes variables, fond qui change | Un motif graphique propre à la marque (au-delà des persiennes) pourrait encore la signer |
| Images | 15 | 14 | 14 images d'un même « shooting », vidéo en boucle, séquence, 3D, sachets identiques recolorés | Le GLB Trellis reste un peu lisse de près, d'où le halo et l'ombre ajoutés |
| Mise en page | 15 | 14 | Grille éditoriale, asymétries, chiffres géants, rythme clair et foncé | La FAQ est plus classique que le reste |
| Mouvement | 10 | 10 | Un geste par section, moment signature (hero qui se resserre, séquence de torréfaction, sachet 3D), mouvement réduit soigné |  |
| Clarté et CTA | 15 | 14 | Promesse en 9 mots, prix dès le hero, CTA principal répété, barre mobile, configurateur qui pré-remplit | Le coffret mériterait un prix visible plus tôt dans la page |
| Preuves | 10 | 8 | Avis précis et datés, note 4,8 sur 640, presse, adresse et horaires réels, date de torréfaction calculée | Tout est fictif (c'est un exemple) ; pas de photo des fondateurs (pas de visages, par consigne) |
| Textes | 10 | 9 | Concrets, sensoriels, une pointe d'humour marseillais (« même votre beau-frère dira c'est fruité »), aucun tic d'IA repéré | Une ou deux phrases de FAQ restent fonctionnelles |
| Mobile et accessibilité | 10 | 9 | Pas de débordement, focus visible, labels, `alt`, groupes radio, `aria-live` sur le prix, barre CTA inerte quand cachée | Sur mobile, la barre CTA collante recouvre parfois la dernière ligne d'une carte |
| **Total** | **100** | **92** | | |

Première passe, estimée a posteriori : environ 84. Corrections apportées pour passer à 92 :

- ordre des épinglages ;
- en-tête illisible sur fond clair ;
- espaces parasites dans l'odomètre ;
- étapes qui se chevauchaient en mouvement réduit ;
- 3ᵉ sachet non chargé sur mobile ;
- notes 3D trop serrées sur mobile ;
- cadrage de l'image finale sur mobile ;
- avertissement de preload ;
- logs de model-viewer ;
- compteur « 1 jours » visible pendant l'animation (le compteur a été retiré de ce chiffre).

---

## Itération 2 (après la note de Sofia : 5,5/10, 62/100)

Mention « Exemple fictif — Lance ton site » : retirée du pied de page, gardée en commentaire en tête de `index.html` et en tête de ce fichier.

### Correctifs (plan `fix-plan.md`)

| FIX | Fait | Ce qui a changé | Preuve |
|---|---|---|---|
| 1 | oui | Avis : Camille, Hélène, Mehdi, Thomas (Toulouse, filtre) ; « 4,8/5 sur 212 avis, demandés une fois, après le troisième envoi ». Citation signée Sofia retirée. Bande presse remplacée par « Où boire Brume à Marseille » (Café Lumière · Cours Julien, Chez Paulette · Belle de Mai, La Tasse bleue · Le Panier, Boulangerie des Chartreux, Ourse · Endoume). « 1962 » et « neutre en carbone » retirés (« Emballé sans plastique, sachet compostable »). | grep vide sur `640 avis|Méridienne|Gazette|Carnets|1962|neutre en carbone|>Sofia<` |
| 2 | oui | Manifeste signé « Sofia Benali, torréfactrice » ; pied de page sans mention d'exemple. | `d-10-footer` |
| 3 | oui | Cartes : photos de sachets à étiquette vierge (4 éditions fal) + étiquette HTML calée dans un cadre 4:5 (`.cadre`, unités `cqi`, `multiply`, `skewY`). GLB : étiquette cuite dans la texture (projection planaire, test de profondeur, ombrage conservé), puis recomposée au chargement avec la date du dernier mardi (`etiquette.js`). | `d-02`, `d-05` ; étiquette dans le visuel sur les 4 cartes (1280 et 1440) |
| 4 | oui | « Composer mon abonnement » ouvre un `<dialog>` : 1 Votre café ✓ → 2 Récapitulatif → 3 Paiement sécurisé (« Redirection vers le paiement sécurisé… », retour possible). Variante coffret. Plus aucun « rien n'a été commandé ». | `d-07`, `d-08`, `m-03` |
| 5 | oui | Réassurance du hero révélée au chargement (`data-reveal-now` / hero). | opacité 1 à 2 s (1440, 1280, 375) |
| 6 | oui | `hero-916.mp4` recadrée sur le V60 + sa propre affiche, titre en haut, CTA en bas, voile d'en-tête. | logo : 9,36:1 (avant 1,39) ; `m-01` |
| 7 | oui | Récapitulatif en barre collante sous `lg` (prix, phrase courte, « Valider ») ; méthodes en 5 tuiles compactes, quantité et rythme en segments ; `scroll-padding-bottom` pour que la barre ne masque pas la question suivante. | section 1,44 écran (< 1,6) ; prix visible à chaque question à 812 et 667 ; tuile f-15 non recouverte |
| 8 | oui | Cartes `min(30vw, 40svh)`, visuel carré sur ordinateur, profil visible par défaut (jauges à 45 %, 100 % au survol). | 632 ≤ 648 px à 1280 × 720 ; 680 ≤ 828 px à 1440 × 900 |
| 9 | oui | Gamme en grille 2 colonnes en mouvement réduit, indice masqué. | `reduit2.js` : 4 cartes `visible: true` |
| 10 | oui | 3 épinglages (hero, gamme, étapes) ; étapes `grand ? 50 : 35` ; sachet non épinglé (rotation sur la traversée). | 1440 : 3,65 écrans épinglés ; mobile : 2 pins |
| 11 | oui | « en quatre temps », « Laissez-le respirer », « non blanchi » retiré. | grep vide |
| 12 | oui | `textarea name="message"` (180 car.) + compteur ; le mot est repris dans le récapitulatif. | « 131 caractères restants » ; « Sur la carte : « … » » |
| 13 | oui | Pied : Nous suivre (Instagram, `rel="noopener"`), Nous écrire (bonjour@brume-cafe.fr, 04 65 71 23 45, plage fictive ARCEP), 4 liens légaux ; FAQ : adresse e-mail au lieu de « espace abonné ». | test pied de page |
| 14 | oui | Cerises recadrées sur la main ; alt du coffret « brin de lavande ». | grep `brin de thym` vide |
| 15 | oui | Voile d'en-tête aussi sur ordinateur ; surtitre sur pastille `torref/55` + ombre portée. | surtitre : contraste moyen 14,6:1 (avant 3,5) ; nav 7,9:1 |
| 16 | oui | Bouton pause injecté par `gestes.js` sur chaque `[data-marquee]`. | Entrée : `aria-pressed=true`, transform figé 2 s |
| 17 | oui | Balcon remplacé par une fenêtre sur Notre-Dame-de-la-Garde (1 édition fal, ≈ 0,09 $). | `d-04` |
| 18 | oui | Pastille du curseur à `scale(0)` hors des zones `[data-cursor-label]`. | manifeste : `matrix(0,0,0,0,0,0)` |
| 19 | oui | `pattern` + regex JS ; le champ n'est vidé qu'après succès. | `sofia@brume` refusé |
| 20 | oui | Affiche choisie selon l'écran (préchargement `media`, attribut `poster` posé par script) ; Tailwind compilé (`brume.css`, 46 Ko) ; model-viewer chargé à 800 px de `#sachet` ; Newsreader sans axe `opsz` (−150 Ko) ; vidéo 1920 réencodée CRF 29 (1 199 → 321 Ko, sans perte visible). | premier écran : 971 Ko mobile (avant 2 440), 1 153 Ko desktop ; JS premier écran ≈ 190 Ko |
| 21 | oui | Fondu de fond à `top 65%`, 0,45 s, `power1.inOut`. | `d1440-transition` : pas de gris |
| 22 | oui | « Premier envoi : », « La lettre du premier mardi », un seul « pas une de plus », conseil Kanzu « Pour ceux qui aiment l'espresso qui pique. » | grep |

Limite connue : le JS total après défilement complet reste à 1 191 Ko, car model-viewer (≈ 920 Ko) est chargé à l'approche du sachet. L'objectif « JS < 700 Ko » n'est tenu que pour le premier écran.

### Gestes « waouh »

- W1 tampon encreur : « Fournée du 10/11 » qui s'imprime (scale 1,4 → 1, `back.out`, 300 ms) sur le récapitulatif ; encre usée par masque `feTurbulence`.
- W2 sachets étiquetés : cartes, récapitulatif, dialogue et modèle 3D portent la même étiquette (origine, nom, date).
- W3 carte « story » 1080 × 1920 (canvas + `etiquette.js`), via `navigator.share` ou téléchargement `mon-cafe-brume.jpg` (`w-01`).
- W4 échéance vraie : « Commandez avant lundi 23 h 59 : votre café part de la fournée du mardi 10 novembre » (« ce soir 23 h 59 » le lundi), calculée à l'heure de Paris.
- W5 hero mobile vertical.
- W6 trois titres à tester (A/B) :
  1. « Torréfié mardi à Marseille. Dans votre tasse jeudi. » (actuel)
  2. « Le café de la Belle de Mai, livré deux jours après la fournée. »
  3. « Votre café, torréfié le mardi qui précède. Pas un jour de plus. » (si retenu, retirer « Pas une de plus » de la gamme)

### Médias de l'itération 2 (fal, nano-banana-2/edit, 1K, 4:5)

| Fichier | Prompt (résumé) | Coût ≈ |
|---|---|---|
| sachet-jaune | « Same photograph… Only add one rectangular off-white matte paper label (#F4EFE6), glued flat on the front face… completely blank: no text, no logo » | 0,09 |
| sachet-rouge, -bleu, -vert | « Same photograph… keep the same blank label… Only change the color of the pouch paper » | 0,26 |
| etape-tasse | Table de bistrot, rebord de fenêtre marseillais, Notre-Dame-de-la-Garde dans la brume, tasse et sachet safran, sans texte ni personne | 0,09 |

Itération 2 : ≈ 0,44 $. Total des deux itérations : ≈ 2,32 $ (budget 3 $). Aucune régénération.

### `gestes.js` : changements à reporter dans le kit

1. Hero : les révélations dans `[data-hero-pin]` ou `[data-reveal-now]` jouent au chargement, pas au défilement.
2. Étapes épinglées : `+=${n * (grand ? 50 : 35)}%` (au lieu de 85 / 40).
3. Bandes défilantes : bouton pause injecté (`.marquee-pause`, `aria-pressed`, libellés FR, icônes pause / lecture), désactivable par `data-marquee-pause="false"` ; l'état pause est respecté par le ScrollTrigger.
4. Fonds de section : déclenchement `top 65%` / `bottom 65%`, 0,45 s, `power1.inOut`.
5. Modèle 3D : `data-model-repos` (angle de repos en mouvement réduit) ; sans `data-model-pin`, la rotation suit la traversée de la section ; recommander de ne plus épingler l'objet.
6. Curseur : pastille à `scale(0)` hors des zones étiquetées (côté CSS du kit).
7. Hors `gestes.js`, motifs à documenter dans le kit : `etiquette.js` (texture GLB recomposée au chargement via `createTexture`), chargement différé de model-viewer (IntersectionObserver, `rootMargin: 800px`), Tailwind compilé plutôt que le CDN navigateur, barre de récapitulatif collante + `scroll-padding-bottom`.

### Vérification

Playwright + Chrome : 1440 × 900, 1280 × 720, 375 × 812, 375 × 667 et mouvement réduit (1440, 375). Scripts de Sofia rejoués (`desktop.js`, `mobile.js`, `cta.js`, `poids.js`, `reduit.js`, `reduit2.js`) ; deux sélecteurs adaptés au nouveau balisage (surtitre `p.ombre-texte`, sachet non épinglé), et la fermeture du dialogue ajoutée avant le coffret. **0 erreur console, 0 requête en échec, aucun débordement horizontal.** Fluidité p95 16,7 ms (desktop et mobile).

### Note révisée (grille `niveau-agence.md` § 6, auto-évaluation)

Preuves 8 → 9 (avis datés et sobres, lieux où le boire, contacts réels) ; mobile et accessibilité 9 → 10 (barre CTA masquée sur la gamme, barre de prix, contrastes du hero, pause des bandes). Estimation : 94/100, à confirmer par la relecture de Sofia.

## Itération 3 (après la note de Sofia : 7,5/10, 80/100)

### Correctifs (plan `iteration-2/fix-plan.md`)

| R | Fait | Ce qui a changé | Preuve |
|---|---|---|---|
| 1 | oui | Méthodes en 5 colonnes `minmax(0,1fr)` sous 640 px (3 + 2 entre 640 et 768), libellés plus petits sous 400 px ; `grid-cols-1` sur le formulaire et sa colonne, `min-inline-size: 0` sur les `fieldset` (la largeur min-content du fieldset gonflait la piste à 380 px). `overflow-x: clip` sur `html, body` en filet seulement. | `sonde-largeur2` : sw 375, coupables `[]` ; `sonde-largeur` : iw 375 à 812 et 667 ; 360 × 740 : sw 360, bouton d'en-tête à 344 |
| 2 | oui | `#sachet`, `#methode`, `#rejoindre` gardent leur fond sombre sous `.motion` (le fond animé du `body` ne peut plus passer en calcaire derrière les notes). | `sonde6` notes sachet : 15,7:1 (plus clair 14,7) |
| 3 | oui | Voile mobile du bloc final renforcé en haut (`.8 → .5 → .6 → .9`). | `sonde6` titre final : moyen 6,25:1, plus clair 5,35:1 |
| 4 | oui | `CAFES` (pays, région, fiche, notes) est la seule source : cartes (titre, fiche, notes, étiquette), étiquettes du récapitulatif et du dialogue, story et configurateur sont remplis au chargement. | story Kanzu : « cassis, hibiscus, thé noir » (`w-01`) ; grep `grenade|amande grillée` vide |
| 5 | oui | Étiquettes HTML, 0 $ : enveloppe `.couv` qui reproduit `object-cover` (`container-type: size` sur la figure), étiquettes `.vignette` placées en % de l'image. Tasse : étiquette « encre » en `multiply` sur l'étiquette vierge mesurée (62–74 % × 58–73 %) ; envoi : autocollant Konga sur le sachet jaune (le bleu est sous la main) ; coffret : trois autocollants inclinés à −17°. | « brume » à 13,7 px (tasse, 1440) et 12,4 px (coffret) ; `d-03`, `d-07` |
| 6 | oui, autrement | Pas de pages séparées : bloc `#infos-legales` en bas de page, 4 `<details>` (mentions, CGV, confidentialité, cookies) à compléter ; les liens du pied ouvrent le bloc et y défilent, un lien direct `#cgv` aussi (après le recalcul des épinglages). | clic et `index.html#cgv` : bloc ouvert, visible ; `d-08`. `sonde2.js` demande encore les 4 URL `.html` : 404 attendus |
| 7 | oui | Coffret : « Modifier mon coffret », « Partager mon café » masqué. | `m-04` |
| 8 | oui | Tampon de la story = date de la fournée du client (10/11), bruit d'usure allégé (70 trous, alpha 0,1–0,4). | `w-01` |
| 9 | oui | Cerises : recadrage CSS sur la main (`scale(1.32)`, origine 74 % 44 %). Atelier : vapeur et rais de lumière retirés (1 édition fal). Séquence de torréfaction : première image tenue 0,35 s. | `d-06`, `d-03` |
| 10 | oui | Fondu entre étapes sans chevauchement : sortie 0,2 s, entrée 0,3 s après 0,05 s. | — |
| 11 | oui | Réassurance du hero sur bandeau `torref/65` (desktop), largeur ajustée au texte. | `sonde2` (texte masqué, `strong` compris) : tiers droit 8,18:1 à 1440, 7,83:1 à 1280 |
| 12 | oui | « Je le veux » sur mobile : défile pour que les 5 méthodes restent au-dessus de la barre collante. | `m-02` |
| 13 | oui | Phrase de l'étape atelier reprise mot pour mot ; « Surprenez-moi » : récapitulatif avec les 4 sachets en éventail. | grep `sachet compostable` : 0 ; `m-05` |

### Média de l'itération 3 (fal)

| Fichier | Modèle | Prompt (résumé) | Coût ≈ |
|---|---|---|---|
| atelier-1920 / -960 | nano-banana-2/edit, 2K, 16:9 | « Remove the white steam plume above the copper roaster and the hazy diagonal light rays… keep everything else exactly identical… no text, no logos, no people » | 0,12 |

Itération 3 : ≈ 0,12 $ (plafond 0,30 $). Total : ≈ 2,44 $ sur 3 $. Aucune régénération.

### `gestes.js` : changements à reporter dans le kit

1. Étapes : sortie `autoAlpha 0` en 0,2 s, entrée `fromTo` 0,3 s à `">0.05"` (jamais deux textes au-dessus de 0,3).
2. Séquence d'images : `tl.to(seq, { f: n - 1, duration: duree - 0.35 }, "<0.35")` (première image tenue).
3. Zoom du média d'étape : cible `.couv, img, canvas`, pour que l'étiquette posée sur la photo zoome avec elle.
4. Motif à documenter : `.couv` + `.vignette` (étiquette HTML calée sur une photo recadrée en `cover`), padding en `calc(var(--w) * k)` car les `cqi` du padding se rapportent au conteneur parent.

### Vérification

Scripts de Sofia rejoués (`desktop.js` 1440 et 1280, `mobile.js` 812 et 667, `cta.js`, `reduit.js`, `reduit2.js`, `sonde-largeur*.js`, `sonde2` à `sonde6`, `story.js`, `poids*.js`) + script maison 360 × 740 (animé et mouvement réduit). **Aucun débordement, 0 erreur console, 0 requête en échec** (hors les 4 `.html` légales demandées par `sonde2`). Premier écran : 984 Ko mobile, 1 166 Ko desktop.

`captures/` remplacé par les 15 vues de cette itération (les noms cités dans les itérations 1 et 2 ne sont plus présents).

## Itération 4 (après la note de Sofia : 8,5/10, 90/100)

### P1 : couleur du texte et fond de section posés ensemble

- **Cause.** Sous `.motion`, les sections `[data-bg]` étaient transparentes : le fond et la couleur du texte venaient du `body`, que `gestes.js` ne bascule qu'à `top 65%`. En entrée de section, les titres sans classe de couleur héritaient la couleur de la section précédente (texte sombre sur fond sombre, ou l'inverse). L'itération 3 avait donné un fond propre à 3 sections sombres, sans leur couleur de texte.
- **Correctif.** `brume.src.css` : `[data-bg] { background-color: var(--bg); color: var(--fg); }` pour toutes les sections, avec ou sans mouvement ; la règle `.motion [data-bg] { background: transparent !important }` est supprimée. `gestes.js` : chaque `[data-bg]` reçoit aussi `backgroundColor` et `color` en style, en mouvement normal comme en mouvement réduit. Le fondu du `body` reste, pour les marges et le rebond du défilement.
- **Preuve.** `journaux/balayage.js` (Sofia, inchangé) : `[]` à 1440 et 375. Variante plus stricte (4,5:1 pour le texte courant, 3:1 au-delà de 24 px ou 18,66 px gras ; pas de 150 px, arrêt 650 ms) : `[]` à 1440, 1280, 375 et 360.

### P2

1. Photo d'envoi : autocollant Kanzu sur le sachet bleu, dans la zone que la main ne couvre pas (`d-05`).
2. Dialogue de commande : `max-height: calc(100svh - 24px)`, défilement interne, `overscroll-behavior: contain`. Sous 768 × 740, visuel et marges compactés : à 375 × 667, le dialogue fait 592 px, sans défilement, et « Modifier / Partager » arrive à 610 px (`m-03`, `m-05`). Ces règles sont hors couche (fin de `brume.src.css`), sinon les utilitaires Tailwind du balisage les écrasent.
3. Script en ligne : `window.gestes?.odometre` est vérifié. Sans `gestes.js` (requête bloquée), le prix s'affiche (« 45,00 ») sans erreur.

### Pour le kit (`templates/prototype/`)

- `gestes.js` : une section `data-bg` pose toujours son fond **et** sa couleur de texte (`sec.style.backgroundColor` et `sec.style.color`) ; le `body` ne sert plus que de fond de transition. Ne jamais rendre les sections transparentes pour laisser le `body` piloter : leur texte hérite alors d'une couleur décalée.
- CSS du kit : `[data-bg] { background-color: var(--bg); color: var(--fg); }` hors `.motion`.
- Règles qui doivent battre des utilitaires Tailwind v4 : à écrire hors `@layer`.

### Vérification

Scripts de l'itération 3 de Sofia rejoués (`balayage.js`, `desktop.js` 1440, `mobile.js` 812 et 667, `reduit.js`, `sonde-largeur*.js`, `sonde6.js`). Résultat : aucun débordement, 0 erreur console, 0 requête en échec. Dialogue vérifié en 375 × 667, 360 × 740 et 1440 × 900. Aucun appel fal à cette itération ; le total reste ≈ 2,44 $.

---

## Refonte — immersif plein écran (après le retour du client : « toujours la même chose qu'un template, trop de texte »)

### Intention

La version « niveau agence » (94/100 pour la persona) empilait douze sections, 1 920 mots, des cartes, des chiffres, une FAQ de six questions : bien faite, mais lue comme un gabarit. La refonte part de la cible (urbains de 28-45 ans qui achètent le soir sur téléphone, veulent comprendre le goût et s'abonner en une minute) et raconte une semaine de Brume comme un court film : **huit écrans pleins**, une image par écran, un titre court par écran, une phrase au plus. La promesse du hero (« Torréfié mardi. Dans votre tasse jeudi. ») sert de scénario : la ferme, le mardi matin au tambour, le mardi soir au carton, le jeudi à la fenêtre, puis les quatre cafés, l'offre, l'atelier, le prochain mardi.

Ce qui a disparu : pastille d'en-tête, ligne de réassurance, bande défilante, cartes de gamme, chiffres, avis, lieux partenaires, coffret, lettre d'information, configurateur en section, FAQ en section. Le configurateur vit dans un `<dialog>` (« Composer mon abonnement »), les quatre questions et les mentions légales dans un tiroir.

Direction typographique : chaque titre a sa mise en scène — grotesque condensée énorme en bas à gauche (01), italique Newsreader à droite (02), minuteur géant safran et titre fin qui se recompose (03), deux répliques en diagonale sur un diptyque (04), petit italique en haut et nom du café géant en bas (05), prix géant en chiffres tabulaires (06), italique en bas à droite (07), titre centré (08).

### Les écrans

| # | Écran | Média plein cadre | Titre (mots) | Transition d'entrée | Défilement |
|---|---|---|---|---|---|
| 01 | Ouverture | `hero-1920.mp4` / `hero-916.mp4` (vertical sur téléphone) | Torréfié mardi. Dans votre tasse jeudi. (6) | titre en lignes masquées (SplitText) au chargement | 1 écran, collé (CSS `sticky`) sous l'écran 02 |
| 02 | Origine | `etape-ferme` | Cueilli à la main, quand c'est rouge. (7) | **recouvrement + fenêtre** : l'écran glisse sur l'ouverture collée, sa fenêtre arrondie `inset(16% 9% 0 9% round 36px)` s'ouvre en plein cadre, l'ouverture recule (zoom 1,1, opacité 0,35) | 1 |
| 03 | Torréfaction — **moment signature** | séquence `images/torref/` (61 images) | Mardi, 7 h. → Douze minutes au tambour. (3 → 4) | **fondu au noir** (la ferme s'éteint) puis la séquence apparaît ; le minuteur compte 00:00 → 12:00 avec le défilement, le titre **se recompose** lettre à lettre (SplitText chars), « Premier crac à 9 minutes » s'allume à 09:00 | scène épinglée 205 svh (190 sur téléphone) |
| 04 | Livraison | diptyque `etape-envoi` / `etape-tasse` (étiquettes HTML reprises) | Parti mardi soir. Chez vous jeudi. (6) | **rideau qui se lève** sur le jeudi (`clip-path inset(100% 0 0 0)` → `inset(0)`) sur ordinateur ; **fondu enchaîné** sur téléphone | scène épinglée 155 svh (160) |
| 05 | Les cafés | `sachet-jaune/-rouge/-bleu/-vert` + champ de la couleur du sachet | Quatre cafés. Pas un de plus. (6) | **fondu enchaîné épinglé** : Konga → El Mirador → Kanzu → Boa Vista ; le champ coloré, le nom et les notes changent, le titre passe du torréfié au blanc | scène épinglée 225 svh (240) |
| 06 | L'offre | sachet 3D `models/sachet.glb` sur outremer | Dès 12,50 € la livraison. (5) | **iris** : un cercle d'outremer s'ouvre (`circle(6%)` → `circle(125%)`), le sachet grandit, puis tourne au défilement (300° sur la traversée, étiquette de face au centre) | 1 |
| 07 | L'atelier | `atelier-1920` | Ça sent bon jusqu'au boulevard. (5) | **rideau inverse** : l'image tient pendant que le cadre monte (`yPercent -14 → 0`), puis **zoom lent** 1,06 → 1,16 | 1 |
| 08 | Dernier écran | `final-1920` | Mardi prochain, on torréfie pour vous. (6) | **zoom arrière lent** 1,2 → 1 et titre en lignes | 1, pied de page intégré |

Total : **8 écrans, 10,85 hauteurs d'écran** sur ordinateur, 10,9 sur téléphone. Compteur « 0n / 08 » et barre de progression dans une pastille fixe (bas gauche sur ordinateur, haut droite sur téléphone). En-tête : logo + bouton, se cache en descendant. Barre d'action mobile « Dès 12,50 € · sans engagement · Composer », cachée sur l'ouverture, l'offre et le dernier écran (`inert` + `aria-hidden` quand cachée).

L'offre en 10 secondes : prix de départ dans la phrase du hero, la barre mobile, l'écran 06 (« Dès 12,50 € la livraison », « Tous les 15 jours ou tous les mois. Sans engagement, pause en un clic. ») et le dialogue (prix qui suit la quantité : 12,50 / 23,90 / 45,00 €).

### Médias

Aucune génération. Tous les médias viennent des itérations précédentes. Utilisés : vidéos hero 1920 et vertical, affiches, ferme, séquence de 61 images, envoi, tasse, 4 sachets, sachet 3D (+ `etiquette.js`), atelier, final. **Non utilisés** : `manifeste` (mains et tasse, redondant avec le hero et la tasse), `coffret` (le coffret n'est plus sur la page : une offre de plus, à mettre sur sa propre page). Photos verticales (928 × 1152) sur écran large : jamais étirées en plein cadre, mais en diptyque (04) ou en moitié d'écran face à un champ de couleur (05) ; la séquence (640 × 794) est posée à droite en pleine hauteur avec un masque en dégradé vers le fond torréfié (03), et passe en `object-fit: cover` sur téléphone, où elle est nette.

### Technique

- `gestes.js` réécrit (version « film ») : chaque scène épinglée est une enveloppe haute + un plateau `position: sticky` (aucun pin-spacer GSAP), timelines GSAP en `scrub`. On n'anime que `opacity`, `transform` et `clip-path`, jamais `visibility`/`autoAlpha`.
- Mouvement réduit (`html.motion-reduit`, posé dans le `<head>`) : aucune scène collée, chaque plan devient une image fixe (les quatre cafés et, sur téléphone, les deux photos de la livraison s'empilent), vidéo en pause sur son affiche, séquence sur sa dernière image, minuteur à 12:00, titre final affiché.
- Séquence chargée par **lots de 3** (au lieu de 6) : avec `python3 -m http.server`, les lots de 6 + les images paresseuses dépassaient la file d'attente du serveur (ERR_CONNECTION_RESET).
- model-viewer 4.2.0 chargé à 1 200 px de l'offre ; image de repli en `slot="poster"` si le script ne charge pas.
- Compilation : `npx @tailwindcss/cli@4.3.3 -i brume.src.css -o brume.css --minify` depuis ce dossier. Si la commande répond « Can't resolve 'tailwindcss' » (aucun `node_modules` au-dessus du dossier), lancer le CLI du cache npx avec `NODE_PATH` : `D=~/.npm/_npx/<id>/node_modules; NODE_PATH=$D node $D/@tailwindcss/cli/dist/index.mjs -i brume.src.css -o brume.css --minify`.

### Compte de mots

Texte visible de la page (dialogues fermés exclus, `innerText` d'un clone : menus, compteur, barre mobile et pied de page compris) :

| | Ordinateur | Téléphone |
|---|---|---|
| Tout compris | 237 | 239 |
| Hors étiquettes peintes sur les photos de sachets (`.etiquette`, `.vignette`, 42 mots : « brume · Éthiopie · Konga · torréfié le 03/11 ») | 195 | 197 |

Avant : 1 920 mots. Les contenus cachés (dialogue de 4 questions d'abonnement, tiroir de 4 questions + mentions) ne sont pas comptés.

### Mesures (Playwright + Chrome, `python3 -m http.server 8981`)

| Taille | Écrans | Hauteurs | Erreurs console | Débordement | h1 (haut) sous l'en-tête (64 px) | Tab : atteints / attendus | Textes mesurés | Contraste mini |
|---|---|---|---|---|---|---|---|---|
| 1440 × 900 | 8 | 10,85 | 0 | non | 506 px | 11 / 11 | 98 | 5,41:1 |
| 1280 × 720 | 8 | 10,85 | 0 | non | 376 px | 11 / 11 | 98 | 5,21:1 |
| 375 × 812 | 8 | 10,9 | 0 | non | 497 px | 10 / 10 | 124 | 5,31:1 |
| 375 × 667 | 8 | 10,9 | 0 | non | 356 px | 10 / 10 | 124 | 4,68:1 |
| 360 × 740 | 8 | 10,9 | 0 | non | 433 px | 10 / 10 | 124 | 5,08:1 |
| 1440 × 900, mouvement réduit | 8 | 11 | 0 | non | 506 px | 11 / 11 | 58 | 4,84:1 |
| 375 × 812, mouvement réduit | 8 | 12 | 0 | non | 497 px | 10 / 10 | 71 | 5,52:1 |
| 360 × 740, mouvement réduit | 8 | 12 | 0 | non | 433 px | 10 / 10 | 71 | 5,25:1 |

Arrêts mesurés par taille : 12 positions (début et fin de chaque scène, milieu des cafés), défilement progressif et 1,5 s d'attente avant chaque mesure. Sur téléphone, le bouton d'en-tête est masqué (la barre d'action le remplace) : 10 éléments atteignables au lieu de 11 ; la barre est `inert` en haut de page, ce qui est voulu. Une seule requête « interrompue » vue sur certaines passes mobiles : la vidéo `hero-916.mp4` (requête de plage annulée par Chrome, sans message dans la console). Mouvement réduit : 11 à 12 hauteurs, car les quatre cafés (et sur téléphone les deux photos de la livraison) deviennent des images fixes empilées.

Captures (`captures/`, 15 webp, 756 Ko) : `d-01` à `d-08` (un par écran, 1440 × 900 ; 03 à 07:26 du minuteur, 05 sur Kanzu), `d-09` (ouverture 1280 × 720), `m-01` à `m-05` (ouverture, torréfaction et offre à 375 × 812, cafés à 360 × 740, dialogue « Composer » à 375 × 667), `r-01` (mouvement réduit, livraison).

Contraste : on rend tous les textes transparents (`color: transparent`, transitions coupées), on capture l'écran, puis on mesure sous chaque texte le **95ᵉ centile** du fond (le pixel clair le plus défavorable sous un texte clair, le 5ᵉ sous un texte foncé), et non la moyenne. Seuil appliqué partout : 4,5:1, y compris aux grands titres. Voiles locaux renforcés pour y arriver : en-tête (0,8 → 0), ouverture (dégradé bas + gauche), jeudi (0,82 en haut), atelier (radial bas droit 0,92 / 0,82), dernier écran (radial 0,86 / 0,72, dégradé vertical sur téléphone).

Dialogue « Composer » : Kanzu, espresso, 500 g, 15 jours → 23,90 € ; « Continuer » toujours visible (barre de total collante dans le dialogue, compactée sous 760 px de haut) ; Échap ferme. Tiroir : 4 questions exclusives (`details name="faq"`), mentions légales. 0 erreur, aucun débordement.

### Ce qui reste faible

- Les photos verticales sont recadrées fort sur les écrans larges (ferme agrandie 1,55 ×, un peu molle de près) ; un vrai plan horizontal de la ferme et de la livraison serait meilleur.
- Le minuteur et la séquence vont à la vitesse du défilement : un défilement brutal au trackpad fait sauter des images tant qu'elles ne sont pas chargées (lots de 3).
- Le coffret et les avis ont quitté la page : à porter sur des pages dédiées si la cliente y tient.
- Les mentions légales et les CGV du tiroir sont à compléter.
- Le dialogue d'abonnement s'arrête à « redirection vers le paiement sécurisé… » (démonstration).

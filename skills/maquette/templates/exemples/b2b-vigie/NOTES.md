# Vigie — exemple B2B (maintenance prédictive pour PMI)

**Exemple fictif — Lance ton site.** Vigie, ses clients, ses chiffres, ses numéros (04 76 52 18 40 / 41), son adresse (14 rue Ampère, Grenoble) et son SIRET (924 318 553 00014) sont inventés : à remplacer par les vrais avant toute mise en ligne. La mention n'est plus visible sur la page (itération 2) ; elle figure en commentaire HTML en tête d'`index.html`.

Page unique : `index.html` + `css/vigie.css` (Tailwind compilé) + `gestes.js` (v2) + `images/`. Ouvrir via un petit serveur local (`python3 -m http.server`), pas en `file://` : model-viewer en a besoin. **L'état décrit jusqu'à « Vérification » est celui de l'itération 1 ; voir § Itération 2 à la fin pour ce qui a changé.**

## Direction artistique

- **Idée.** La vigie d'atelier : une page de métrologie industrielle. Graphite, acier et béton, avec un seul jaune de sécurité qui signale ce qui compte, comme un capot de capteur dans l'atelier. Le rouge alarme n'apparaît que pour « sans Vigie ».
- **Couleurs.**
  - graphite `#141618`
  - acier `#1d2124` / `#2a3034`
  - béton `#e7e5df`
  - papier `#f2f1ed`
  - doux `#4a5258`
  - brume `#a9b1b6`
  - signal `#ffc21a`
  - alarme `#e5432b`
- **Typographies.**
  - Big Shoulders Display (titres, capitales serrées, esprit plaque signalétique).
  - Archivo pour le texte, en chiffres tabulaires. Les étiquettes « étroit » utilisent l'axe `wdth` 112 %.
- **Matière.**
  - Une graduation de métrologie (`.cote`) ouvre les sections claires.
  - La bande de balisage jaune et noir sert une seule fois, sur l'offre pilote.
  - Les photos ressemblent à du reportage d'atelier : grain, lumière mixte verrière + sodium.
- **Moment signature.** Le tracé de vibration piloté par le défilement (`#signature`). Huit semaines défilent, la courbe jaune monte, le SMS part à S-3 et la courbe se calme après l'intervention. Le tracé rouge « sans Vigie » explose jusqu'à la casse du mardi.

## Trois variantes de titre (hero)

1. **Retenue :** « Voyez venir la panne trois semaines avant. » Promesse et chiffre dans la même phrase, en 7 mots.
2. « La panne de mardi prochain, vous pouvez la voir aujourd'hui. »
3. « Plus jamais trois jours d'arrêt pour un roulement à 80 €. »

## Sections et gestes

| # | Section | Gestes |
|---|---|---|
| 1 | Hero `#top` | vidéo en boucle + poster (sources mobile/desktop), `data-split` lignes, `data-intro` (sous-titre, CTA, réassurance), télémétrie vivante `data-live-jitter`, `data-hero-pin` (le plein cadre devient une carte arrondie), CTA `data-magnetic` |
| 2 | Bande de preuves | `data-marquee` + `data-marquee-scroll` (suit vitesse et sens du défilement) |
| 3 | Problème `#probleme` | titre `data-split`, compteur 47 300 €, image `data-grow` + `data-parallax`, texte `data-split-scrub`, barres `data-bar`, compteur de coût qui court `data-live-rate` |
| 4 | Signature `#signature` | `data-trace` épinglé : dévoilement par `clip-path`, notes à seuils, libellé S-8 → S-0 |
| 5 | Méthode `#methode` | `data-steps` épinglé en 4 temps, barre de progression, médias empilés ; empilé sans épinglage sur téléphone |
| 6 | Capteur 3D `#capteur` | `model-viewer` qui tourne au défilement (`data-model-scroll`), légendes `data-depth`, passerelle `data-tilt`, `data-reveal-group` |
| 7 | Tableau de bord `#tableau` | écran HTML/CSS : 6 machines (onglets clavier), courbes tracées, transition `clip-path`, SMS qui entre |
| 8 | Machines `#machines` | `data-follow-list` (image qui suit le curseur ; vignettes en ligne sur téléphone) |
| 9 | Calculateur `#calcul` | 4 curseurs, résultat recalculé en direct (économie, abonnement, net, retour en mois), barres |
| 10 | Cas client `#cas` | image `data-grow`, portrait `data-image-reveal`, citation, avant/après en `data-bar` + compteurs |
| 11 | Offre `#offre` | pilote 1 490 € HT remboursé (bande de balisage), abonnement 390 € en compteur, définition d'une « alerte utile » |
| 12 | Grenoble | bandeau `data-parallax` |
| 13 | FAQ `#faq` | `details[data-accordion]` exclusifs (`name="faq"`), titre collant |
| 14 | Diagnostic `#diagnostic` | titre `data-split`, formulaire court avec validation `aria-invalid` et confirmation « C'est noté, {prénom}. » ; rien n'est envoyé |
| 15 | Pied de page | (it. 1) grand mot VIGIE ; (it. 2) adresse, téléphone, SIRET, mentions légales et confidentialité dépliables |
| — | Global | `data-header` (se cache en descendant), `data-sticky-cta` sur téléphone (après le hero, masqué sur le formulaire), Lenis avec ancres décalées |

Sous `prefers-reduced-motion` :
- aucun épinglage ni scrub ; compteurs et barres affichés à leur valeur finale ; vidéo en pause sur son poster ;
- l'accordéon, le CTA collant et l'en-tête restent fonctionnels.

## Médias : journal des générations (fal)

Bloc de style commun, ajouté au prompt hero et repris par référence dans chaque édition :

> STYLE: documentary industrial photography, full-frame camera, 35mm prime lens, natural mixed light (cool overcast daylight from skylights plus a few warm sodium work lamps), muted desaturated palette of graphite #141618, steel grey #5E6A71 and concrete #E7E5DF with safety-yellow #FFC21A accents and rare alarm-red #E5432B, fine film grain, crisp real detail, oil, swarf and wear, clean but used. No text, no logos, no readable labels, no brand names, no identifiable faces.

Méthode :
- le hero a été généré seul ;
- toutes les autres images sont des éditions `nano-banana-2/edit` avec le hero en référence, plus la photo produit du capteur quand il apparaît ;
- les prompts d'édition commencent tous par « Create a NEW photograph from the same shooting as the reference image… ».

**Aucune image n'a été régénérée.**

| Fichier | Modèle | Format | Prompt (résumé) | Coût |
|---|---|---|---|---|
| hero | fal-ai/nano-banana-2 | 16:9, 2K | Vue large d'un atelier d'usinage CNC le matin ; capteur jaune sur le carter de broche au premier plan à droite ; moitié gauche sombre pour le titre ; + bloc STYLE | ≈ 0,12 $ |
| capteur (produit) | fal-ai/nano-banana-2 | 1:1, 1K | Packshot studio du capteur : cylindre graphite moleté, capot jaune, base aimantée, fond `#D9D8D4` | 0,08 $ |
| arret | nano-banana-2/edit | 21:9, 2K | Presse à emboutir arrêtée, cadenas de consignation rouge, allée vide | ≈ 0,12 $ |
| pose | nano-banana-2/edit (+ capteur) | 4:3, 1K | Mains gantées posant le capteur sur un moteur de pompe | 0,08 $ |
| ecoute | nano-banana-2/edit (+ capteur) | 4:3, 1K | Macro du capteur sur palier de motoréducteur, LED allumée, passerelle 4G au loin | 0,08 $ |
| alerte | nano-banana-2/edit | 4:3, 1K | Bureau maintenance en mezzanine, smartphone avec notification abstraite jaune et rouge | 0,08 $ |
| intervention | nano-banana-2/edit (+ capteur) | 4:3, 1K | Changement de roulement sur établi, ancien roulement à côté du capteur | 0,08 $ |
| cas-atelier | nano-banana-2/edit (+ capteur) | 16:9, 1K | Atelier de presses à injecter, capteur sur moteur de pompe | 0,08 $ |
| cas-responsable | nano-banana-2/edit | 4:5, 1K | Responsable maintenance vu de trois quarts dos, visage dans l'ombre | 0,08 $ |
| usinage | nano-banana-2/edit | 4:5, 1K | Macro d'une fraise carbure dans l'aluminium, copeaux, gouttes de lubrifiant | 0,08 $ |
| plasturgie | nano-banana-2/edit | 4:5, 1K | Granulés gris et jaunes tombant dans une trémie | 0,08 $ |
| agro | nano-banana-2/edit (+ capteur) | 4:5, 1K | Ligne inox agroalimentaire, capteur sur motoréducteur | 0,08 $ |
| grenoble | nano-banana-2/edit | 21:9, 2K | Porte sectionnelle ouverte à l'aube sur les falaises de Chartreuse et du Vercors | ≈ 0,12 $ |
| nuit | nano-banana-2/edit (+ capteur) | 16:9, 2K | Même atelier la nuit, une seule machine allumée, LED du capteur | ≈ 0,12 $ |
| passerelle | nano-banana-2/edit (+ capteur) | 1:1, 1K | Passerelle 4G graphite sur un pilier béton, ruban de balisage | 0,08 $ |
| vidéo hero | fal-ai/kling-video/v2.5-turbo/pro/image-to-video | 5 s | Plan fixe sur trépied : brume d'huile, LED qui clignote, machiniste lointain. `tail_image_url` = image de départ pour une boucle propre ; négatif : camera movement, zoom, pan, text… | 0,35 $ |
| capteur 3D | fal-ai/trellis-2 | GLB | À partir du packshot capteur ; résolution 1024, texture 2048, décimation 60 000 | 0,05 $ |

**Total dépensé : environ 1,76 $** sur un budget de 3 $. Les rendus 2K de nano-banana-2 sont estimés à 0,12 $ ; si fal les facture 0,08 $, le total tombe à 1,60 $.

### Post-traitement

**Images.**
- `cwebp -q 78`, avec deux largeurs par image : 2200/1100 pour les pleins cadres, 1200/640 pour les autres.
- Les balises `<img>` utilisent `srcset`/`sizes`, `loading="lazy"` sous la ligne de flottaison, `width`/`height` et `alt`.

**Vidéo.**
- `ffmpeg` H.264 sans audio, `+faststart` : 1920 px en CRF 21 (716 Ko) et 960 px en CRF 24 (132 Ko).
- Posters webp. Bien sous la limite de 3 Mo.

**Objet 3D.**
- Trellis a rendu le capot orange : la texture couleur de base WebP a été décalée vers le jaune `#ffc21a` en Python. Le script lit les blocs du GLB, retouche la texture, la ramène à 1024 px et reconstruit le GLB.
- Résultat : 2,2 Mo.

**model-viewer.**
- Version **4.1.0** : la 4.3.1 écrit des `console.log` de débogage.
- La barre de progression par défaut est masquée par un `slot="progress-bar"` vide.

**Fichiers bruts.** Les originaux fal (jpg/png/mp4/glb), environ 27 Mo, sont sortis de l'exemple. Ils ne sont pas livrés.

## gestes.js v2 : changements à reporter dans `templates/prototype/gestes.js`

### 1. Corrections de bugs du kit

| Problème | Correction |
|---|---|
| Les épinglages sont créés par type de geste, pas dans l'ordre du DOM : les décalages de pin sont faux (la méthode démarrait dans la signature) | `ScrollTrigger.sort()` avant chaque `refresh()`, à la fin du script et au `load` |
| Les masques de ligne `SplitText` coupaient les accents des capitales françaises (LÂCHE lu « LACHE ») | Masques rembourrés : `paddingTop .16em / marginTop -.16em`, `paddingBottom .08em / marginBottom -.08em` |
| Avertissement GSAP « invalidateOnRefresh … Missing plugin » sur le tween du marquee | Option supprimée ; distance recalculée sur `refreshInit` |
| Distance de boucle du marquee approximative | Distance mesurée sur `offsetLeft` du premier clone |
| 1490 s'affichait sans espace | Compteurs formatés en `Intl.NumberFormat("fr-FR", { useGrouping: "always" })`, avec `data-counter-decimals`, `-prefix`, `-suffix` |
| Une transformation CSS `translateY` était lue comme `y` par GSAP et laissait la barre hors écran | `gsap.set(bar, { y: 0, yPercent: 120 })` |
| L'image de `data-follow-list` restait visible après défilement | Elle se cache au défilement quand la liste n'est plus survolée |

### 2. Robustesse

- Garde-fou si GSAP n'est pas chargé : la classe `motion-reduit` est posée et la page reste lisible.
- Anti-flash documenté (`js-attente`) et levé dans tous les cas.
- Les gestes utiles sont séparés des gestes décoratifs :
  - **toujours actifs, même en mouvement réduit :** compteurs (valeur finale), `data-live-rate`, en-tête, CTA collant, accordéon ;
  - **en mouvement réduit :** vidéos en pause, barres à leur valeur finale, puis sortie du script.
- Lenis avec `anchors: { offset: -72 }` : les ancres ne passent plus sous l'en-tête fixe.

### 3. Nouveaux gestes

| Geste | Comportement |
|---|---|
| `data-intro` | Apparition au chargement pour le contenu du premier écran, en cascade. Avant, la réassurance du hero, sous le seuil du reveal, restait invisible. |
| `data-trace` (+ `data-trace-wipe`, `data-trace-note`, `data-trace-out`, `data-trace-labels`) | Narration épinglée d'un tracé SVG : dévoilement par `clip-path`, notes à seuils, libellé courant `labels[round(p*(n-1))]`. Durée 240 % sur desktop, 140 % sur mobile. Réutilisable pour une courbe, une carte ou un plan. |
| `data-bar` | Barre de comparaison en `scaleX`, avec repli CSS `--v`. |
| `data-live-rate` | Valeur qui grimpe tant qu'elle est visible. |
| `data-live-jitter` | Mesure qui oscille autour d'une valeur. |
| `data-header` | Classe `is-defile` après le haut de page ; l'en-tête se cache en descendant et revient en remontant (avec mouvement seulement). |
| `data-sticky-cta` (+ `data-sticky-after`, `data-sticky-hide`) | CTA collé en bas sur téléphone, avec `inert` quand il est caché. |
| `details[data-accordion]` | Le contenu glisse (hauteur animée sur le conteneur, opacité sur le contenu) ; compatible `name=""` exclusif. |

### 4. Gestes améliorés

- `data-split` :
  - `data-split-delay` ;
  - l'élément repasse en `visibility: visible` au découpage.
- `data-steps` :
  - `data-steps-mobile="stack"` (pas d'épinglage sur téléphone) ;
  - `[data-step-progress]` (scaleX) et `[data-step-count]` ;
  - durée proportionnelle au nombre d'étapes ;
  - léger zoom des médias.
- `data-hero-pin` : le média passe du plein cadre à une carte arrondie (`scale .96` + rayon), `[data-hero-fade]` s'efface.
- `data-marquee-scroll` : la bande suit la vitesse et le sens de Lenis, ralentit au survol et se met en pause hors écran.
- `model-viewer` :
  - `data-model-from` et `data-model-pitch` ;
  - la rotation au défilement s'arrête dès que l'utilisateur saisit l'objet.
- `data-tilt="6"` : force réglable.
- `data-follow-list` : préchargement des images, rotation selon la vitesse, styles posés en ligne (aucun CSS à ajouter).
- `data-counter-duration`.

## Autocritique (grille niveau-agence.md § 6)

### Premier passage complet : environ 82/100

Défauts relevés :
- épinglages dans le désordre ;
- accents coupés ;
- réassurance du hero invisible ;
- tracé rouge sans enveloppe (sortait du cadre) ;
- semaine affichée décalée du tracé ;
- capot 3D orange ;
- trait de progression parasite sur model-viewer ;
- SMS du tableau de bord posé sur le texte d'alerte ;
- ligne de seuil fausse ;
- CTA collant jamais visible ;
- « 12,4 k€ » coupé sur mobile ;
- notes de la signature hors écran à 375 px ;
- 1490 sans espace ;
- image du survol de liste restée affichée.

### Après corrections

- Tracé rouge borné puis comprimé verticalement pour ne pas couvrir les notes.
- Libellé S-x en `nowrap`.
- Champ de vue 3D élargi à 35° pour dégager les légendes.
- Graduations `.cote` ajoutées au tableau de bord et à la FAQ.
- Signature compactée sur mobile.

| Critère | Note |
|---|---|
| Direction artistique | 14/15 |
| Images | 14/15 |
| Mise en page | 14/15 |
| Mouvement | 10/10 |
| Clarté | 14/15 |
| Preuves | 9/10 |
| Textes | 9/10 |
| Mobile / accessibilité | 9/10 |
| **Total** | **93/100** |

### Ce qui retient encore des points

- **Preuves.** Les preuves restent fictives : clients, chiffres et citation inventés pour l'exemple.
- **Objet 3D.** La géométrie générée par Trellis est un peu molle sur la bague moletée.
- **Signature sur mobile.** Le libellé « seuil d'alerte » touche le tracé rouge en fin de défilement.

## Vérification

Playwright (Chrome) à 1440×900, 375×812 et en mouvement réduit :
- 0 erreur console ;
- `scrollWidth == innerWidth` à chaque arrêt ;
- toutes les images chargées ;
- polices chargées ;
- model-viewer `loaded` ;
- vidéo `readyState 4`.

Interactions testées :
- onglet du tableau de bord ;
- survol de la liste machines ;
- calculateur ;
- erreurs du formulaire puis confirmation.

Livrables :
- 15 captures dans `captures/` ;
- une vidéo de défilement enregistrée hors du dossier : CDP screencast assemblé avec ffmpeg, Playwright n'ayant pas son ffmpeg.

---

## § Itération 2 (après la revue de Claire : 61/100)

Plan suivi : `test-lancetonsite/landings/vigie/iteration-1/fix-plan.md`, avec les arbitrages du coordinateur (W4 et W8 interdits : pas de vraies photos, pas de vidéo).

### Ce qui a changé, FIX par FIX

| FIX | Fait | Comment |
|---|---|---|
| 1 · h1 sous l'en-tête | oui | `--text-affiche: clamp(2.9rem, min(9.4vw, 11.5svh), 6rem)`, hero `pt-[calc(4.5rem+1.5rem)]`. Haut du h1 − bas de l'en-tête : 226 px (1440×900), 84 (1280×720), 116 (1366×768), 232 (375×812), 113 (375×667). CTA et réassurance visibles partout. |
| 2 · erreurs de métier dans les images | oui | 4 images refaites (fal) : capteur sur le carter fixe de tête de broche (hero), sur le flasque côté accouplement d'un moteur (pose), sur un palier fixe de convoyeur (écoute), centre consigné avec broche déposée sur palette (arrêt). Plus rien sur une pièce tournante. Étape 3 : SMS lisible en HTML par-dessus la photo. |
| 3 · courbe signature fausse | oui | Courbe générée en JS en mm/s eff. (axe gradué 0–12, seuil 4,5 unique), alerte à 4,6 à S-3, retour à 2,0 après intervention ; « sans Vigie » monte à 11 mm/s. Mini-spectre BPFO dans la note S-5. |
| 4 · mouvement réduit | oui | Aucun épinglage, aucun élément invisible (0 sur 1440 et 375), méthode lisible en colonne, bouton pause de la bande masqué (elle ne bouge pas). |
| 5 · chiffres sourcés | oui | Sources de la bande en commentaire HTML ; FAQ : 371 alertes confirmées sur 412 en 2025. |
| 6 · capteur 3D | oui | GLB construit en code (Python, voir plus bas) : 90 Ko au lieu de 2,1 Mo, surfaces lisses, moletage en normal map. Bouton « Voir à l'échelle 1 » : la caméra se recule pour que 52 mm = 197 px CSS (mesuré : capot 167 px = 44,4 mm), témoin pièce de 2 €. Réglet 0–80 mm sous le modèle. model-viewer chargé à 800 px du capteur. |
| 7 · SMS sur le conseil (téléphone) | oui | `relative ml-auto mt-4 md:absolute …` : recouvrement 0 px² (375×667 et 1440). |
| 8 · téléphone, adresse, mentions | oui | 3 liens `tel:` (en-tête ≥ 1280, diagnostic « Pressé ? Appelez Julien », pied), `mailto:`, adresse, SIRET, mentions légales et confidentialité en `<details>` ouverts par leurs liens. |
| 9 · preuve du cas client | oui | Photo de dos remplacée par un bon de travail GMAO en HTML (BT-2024-0417, presse n° 7, roulement 6312-C3, 84 € HT, 2 h 05, contrôle 1,9 mm/s). « Sébastien accepte d'en parler. » |
| 10 · Grenoble isolé | oui | Section supprimée, fusionnée dans `#diagnostic` (fond Grenoble + ligne « 8 analystes vibratoires certifiés ISO 18436-2 »). |
| 11 · longueur | oui | 1440×900 : 16 504 px, ≈ 18,3 écrans (23 avant). Épinglages : hero 0,8 écran, signature 1,5, méthode 1,54. |
| 12 · « ingénieur vibration » | oui | Partout « analyste vibratoire ». |
| 13 · poids | oui | Plus de vidéo (W8), plus de Tailwind navigateur : CSS compilé 37 Ko ; GLB 90 Ko ; hero en `<img>` préchargée (1100/2200/2752 w). |
| P2 | oui | Onglets `tab-0…5` + `aria-labelledby` dynamique, `role="alert"` sur les erreurs, créneaux de rappel (3 demi-journées ouvrées) nommés dans la confirmation, libellés de seuil à fond plein, « à partir de » qui passe à la ligne sur téléphone, image qui suit le curseur passe à gauche dans la moitié droite, interlettrage : 0,02 em sur `.etroit`, 0,07 em réservé à `.etiquette` (libellés courts en capitales). |

### Effets « wow » ajoutés

- **W1 · Écouter le roulement.** WebAudio, coupé par défaut, ne démarre qu'au clic. Ronronnement 50 Hz + bruit rose, chocs de bague extérieure (bruit filtré à 2,8 kHz, porté à 102,5 Hz ≈ BPFO). Le niveau suit l'avancement du tracé : inaudible à S-5, net à S-3, violent à S-0. S'arrête en quittant la section. En mouvement réduit, un clic joue un cycle automatique de 12 s.
- **W2 · Le hero bascule en alerte.** Puce de télémétrie accrochée au capot jaune de la photo (position calculée selon le cadrage `cover`), 3 états pendant l'épinglage, LED rouge, puis bulle SMS.
- **W3 · Le réglet du métrologue.** Pied à coulisse qui s'ouvre sur 47 300 € (`data-coulisse`), axe gradué de la signature (graduations tous les 0,5 mm/s), réglet en mm sous le capteur.
- **W5 · Fiche pour le comité de direction.** « Imprimer ce calcul » : fiche A4 propre (`@media print`), avec les valeurs saisies.
- **W6 · Simuler une alerte.** P-12 passe en alerte, la courbe se prolonge, le SMS arrive avec une secousse (transform seulement, rien en mouvement réduit).
- **W7 · Variantes de titre** : `?titre=2` « Votre broche va lâcher. Vigie vous dit quand. », `?titre=3` « Le SMS qui arrive trois semaines avant la casse. » (script en ligne juste après le h1, pour le test A/B).

### Médias de l'itération 2 (fal)

Toutes en `fal-ai/nano-banana-2/edit`, références : photo hero de l'itération 1 (style) + rendu produit du capteur (forme).

| Image | Prompt (résumé) | Résolution | Coût |
|---|---|---|---|
| `hero-*` | centre d'usinage vertical porte ouverte, capteur aimanté sur la face usinée du **carter fixe** de tête de broche, près du roulement avant, 15 cm au-dessus du porte-outil ; rangée de CN floue derrière | 2K | ≈ 0,12 $ |
| `arret-*` | même centre consigné (cadenas rouge sur l'interrupteur général), travée éteinte, broche déposée emballée sur palette | 2K | ≈ 0,12 $ |
| `pose-*` | main gantée qui plaque le capteur sur le flasque côté accouplement d'un moteur arrêté, au droit du roulement, axe du capteur parallèle à l'arbre ; accouplement sous carter grillagé jaune | 1K | 0,08 $ |
| `ecoute-*` | capteur sur le corps fixe d'un palier de convoyeur, arbre sous carter, passerelle 4G sur poteau | 1K | 0,08 $ |
| (rejetée) `pose2` | variante de pose : géométrie incohérente (deux arbres) | 1K | 0,08 $ |
| `cas-atelier-2400` | `fal-ai/esrgan` ×2 de l'image d'atelier existante | — | ≈ 0,01 $ |

Recadrages locaux 4:5 : `presse-640` (ancienne presse hydraulique), `palier-640` (depuis `ecoute`). Total itération 2 : **≈ 0,49 $** (plafond 0,8 $). Cumul des deux itérations : ≈ 2,25 $.

### Capteur 3D construit en code (0 $)

Script : `capteur_glb.py` (gardé hors du kit, dans le bloc-notes de session ; à verser dans `outils/` si on veut le réutiliser). Principe :
- profils (r, y) en mm tournés autour de l'axe (« lathe ») : base aimantée Ø 42 × 4,2 ; corps Ø 44 avec gorges ; bague moletée Ø 45,2 sur 10 mm ; capot jaune arrondi R 4,2 ; LED ;
- arêtes vives entre traits, normales lissées dans un trait ; 56 segments ;
- matériaux PBR : aluminium anodisé graphite (métal 1, rugosité 0,52), molette (0,46), capot jaune `#FFC21A` (rugosité 0,48), aimant noir, LED émissive ;
- moletage : normal map 96 × 48 générée (numpy), répétée 15 fois sur le tour ;
- normales quantifiées en int8 (`KHR_mesh_quantization`) : 90 Ko.

### gestes.js : changements à reporter dans le kit (`templates/prototype/gestes.js`)

1. **Événement `progression`.** `data-hero-pin` et `data-trace` émettent `progression` (detail 0 à 1) à chaque mise à jour : la page s'y branche (puce du hero, son, barre collante).
2. **Hero.** Épinglage 50 % × longueur (0,8 écran sur ordinateur) ; `[data-hero-zoom]` (ou à défaut l'image) zoome à 1,08 pendant l'épinglage.
3. **Longueurs d'épinglage.** Étapes : `n × long × 24 %` (au lieu de 42) ; tracé : 1,5 écran sur ordinateur, 1,2 sur téléphone (au lieu de 2,4 / 1,4).
4. **Bande défilante.** `[data-marquee-toggle]` (bouton pause / lecture, `aria-pressed`, libellé `[data-marquee-label]`, icônes `[data-icone]`), respecté par le ticker et par l'entrée / sortie d'écran ; bouton masqué en mouvement réduit.
5. **`data-coulisse`** (nouveau). Bec mobile `[data-coulisse-bec]` qui s'ouvre sur la largeur du chiffre ; état final direct en mouvement réduit.
6. **Image qui suit le curseur.** Passe à gauche du pointeur dans la moitié droite de l'écran (`x(e.clientX + (e.clientX > innerWidth / 2 ? -150 : 150))`).
7. **model-viewer.** L'orbite se règle par l'attribut `camera-orbit` (fonctionne même si model-viewer est chargé plus tard) ; `data-model-lock` fige la caméra (vue « taille réelle »).
8. **Barre collante.** `data-sticky-pause="#id"` : la barre s'efface pendant l'épinglage de ces sections.
9. **Kit Tailwind.** Passer du script navigateur à une CSS compilée (`css/vigie.src.css` → `css/vigie.css`, `@theme static`). Attention : `--color-*: initial` supprime `white` et `black`, à redéclarer. La compilation doit se lancer depuis un dossier où `tailwindcss` est installé (`@import "tailwindcss"` se résout depuis le fichier source).
10. **Outils de vérification.** Tailwind v4 compilé produit des couleurs `oklab()` (modificateurs d'opacité) : un script de contraste qui ne lit que `rgb()` plante. Convertir via un canvas 1 × 1. Pour les `<img srcset>`, `naturalWidth` est corrigé de la densité : comparer la largeur du fichier choisi (`currentSrc`), pas `naturalWidth`.

### Vérification (itération 2)

Playwright (Chrome), scripts de Claire adaptés au nouveau DOM (hero en image, plus de `data-live-jitter`) :
- premier écran 1280×720, 1366×768, 1440×900, 1536×864, 1920×1080, 375×667, 375×812 : h1 sous l'en-tête, CTA et réassurance visibles ;
- largeur de document = largeur d'écran partout, aucune erreur console, aucune requête en échec ;
- images à 60 i/s en défilement (médiane 16,7 ms, p95 16,7–16,8) ;
- mouvement réduit : 0 épinglage, 0 élément invisible ;
- tableau : 6 onglets au clavier, panneau étiqueté par l'onglet ; SMS ne recouvre plus le conseil ;
- calculateur juste sur 5 cas (dont « moins d'un mois » et cas défavorable) ;
- formulaire : erreurs annoncées (`role="alert"`), focus sur le premier champ fautif, confirmation avec prénom et créneau ;
- contrastes : seuls restent des faux positifs du script (texte de l'en-tête transparent au-dessus du hero sombre, titre du cas sur photo assombrie : le script remonte jusqu'au fond papier du `body`). Interlettrage > 0,05 em : uniquement les libellés `.etiquette` (≤ 25 caractères, capitales).

### Autocritique après l'itération 2 : environ 80/100

Ce qui retient encore des points :
- toutes les preuves restent fictives (crédibles et cohérentes entre elles, mais à remplacer par celles de Claire : bon de travail réel, numéro de Sébastien, sources de la bande) ;
- pas de visage de l'équipe (W4 interdit ici) : la page reste un peu impersonnelle ;
- l'échelle 1 suppose un écran à 96 ppp ; sur un Mac Retina, 1 mm CSS ≈ 0,75 mm réel (le texte le dit, la pièce de 2 € sert de contrôle) ;
- sur 375×667, la section signature est dense (description masquée pour tenir dans l'écran).

## § Itération 3 (après la revue de Claire : 85/100, « non »)

Plan suivi : `test-lancetonsite/landings/vigie/iteration-2/fix-plan.md`, R1 à R16 dans l'ordre, plus la consigne du coordinateur sur les textes sous 11 px.

### Ce qui a changé, R par R

| R | Fait |
|---|---|
| R1 · métier | Plus de « roulement changé en 2 h » sur une broche. S-2 : « Broche d'échange montée au changement d'équipe : 16 h d'arrêt planifié au lieu de 3 jours subis. Retour à 2,0 mm/s. » (bureau et téléphone). Étape 4 : « Roulement, ou broche en échange standard, réservé au tarif normal. Intervention planifiée au changement d'équipe ou le week-end. » Coût : « Broche en échange standard, livrée en express » **13 800 €** (au lieu de 6 800 €, qui couvrait un simple reconditionnement), total **54 300 €**, barres recalculées (0,442). Commentaire HTML « à valider par Claire » sur la ligne. Les « 2 h » du roulement 6312 de la pompe (étude de cas) sont conservés. |
| R2 · SMS | Bulle du tableau de bord sortie de l'écran (dans le flux, sous l'écran, `md:mr-8 md:mt-5`). Recouvrement mesuré sur tout le texte visible : 0 px² en 1440, 1366 et 1280, avant et après « Simuler une alerte ». Bulle du hero : 0 px² aussi. |
| R3 · hero net | `sizes="(max-width: 767px) calc(100svh * 1.8), 100vw"` (image et `preload`) : le téléphone charge `hero-2752`, agrandissement ×1,06 en 375×812 Retina (×2,74 avant). Recadrage mobile `object-[68%_50%]` : capot jaune à droite du titre. Image « arrêt » : `sizes` adapté (×0,81). Fond Grenoble masqué sous 768 px. Pas de version verticale : le placement JS de la puce suppose l'image 2200×1228 entière, et la bonne `sizes` suffit. |
| R4 · visages | Deux portraits générés (voir plus bas) : Julien (64→88 px, avec nom, certification ISO 18436-2 cat. II, 12 ans, téléphone) au-dessus du formulaire ; Sébastien devant la presse 7, à côté de sa citation (carré 96 px sur téléphone, 4:5 sur ordinateur). Commentaire `provisoire : vraie photo à fournir` sur chaque `<img>`. |
| R5 · courbes | Notes S-3 et « Sans Vigie » sous l'axe (`top-full mt-10`, largeurs bornées pour ne pas se toucher en 1280) ; note S-2 en haut, entre S-3 et S-2 (zone vide). Test : 200 points par courbe, 0 point dans chaque note en 1440, 1366, 1280 et sur téléphone. Règle `.note-trace` passée en `@layer base` : avant, elle écrasait les `max-w-*` des notes (couche non nommée). |
| R6 · appeler | Icône téléphone 44×44 dans l'en-tête sous 1280 px ; barre collée « Appeler » + « Réserver un diagnostic ». |
| R7 · mouvement réduit | Méthode en 2 colonnes pleine largeur, compteur « / 4 » et barre masqués : étapes 1-2 et 3-4 alignées (même `haut`). |
| R8 · SMS du téléphone | Bulle à pointe (`.sms-pointe::after`) au-dessus du téléphone de la photo, double anneau jaune qui « sonne » sur l'écran du téléphone (transform + opacity, coupé en mouvement réduit). 0 $ : pas de retouche d'image. |
| R9 · liste | Image calée en x dans la marge droite de la liste (largeur ≤ 208 px, calculée pour finir après la fin réelle de la description, masquée s'il reste moins de 120 px) ; elle ne suit que le y. Libellé du secteur survolé masqué, décalage `hover:translate-x-3` supprimé. `couvreTexte: false` à x = 400, 700, 1100. |
| R10 | « Bon de travail transmis par Plastiques Combe avec leur accord (références internes masquées). » |
| R11 | Bon de travail : alerte à 06:58 ; « 07:42 » reste 4 fois (CN-04). |
| R12 | `?titre=3` raccourcit aussi le chapeau. |
| R13 | « 52 mm. / 140 g. / Posé en 10 minutes. » sur trois lignes. |
| R14 | « mm/s eff. » `-top-5`, bloc courbe `mt-8`. |
| R15 | Sous le bouton : « Son reconstitué : le rythme des chocs suit la fréquence de défaut réelle. » (version courte sur téléphone). |
| R16 · longueur mobile | Figures de la méthode en 16:10, « arrêt » 40svh, bandeau du cas 42svh, 3D 38svh, et surtout **méthode en carrousel horizontal sur téléphone** (défilement à aimantation, carte suivante visible, « 4 étapes · faites glisser → », région focusable) : 375×812 passe de 25,9 à **23,7 écrans (19 282 px)**. |
| Textes < 11 px | « seuil 4,5 mm/s », « il y a 30 jours », « aujourd'hui », « Clôturé » passés à 12 px (`text-xs`). Les autres libellés sous 11 px (axe « mm/s eff. », semaines S-8…S-0, seuil de la signature, en-tête du SMS mobile, « Bon de travail · GMAO », réglet) remontés à 11 px. |
| Contraste trouvé à la mesure | Lien « 04 76 52 18 40 » de l'en-tête sur le hero : 2,0:1 sur le pilier clair de la photo → voile sombre de 8,5 rem en haut du hero. Chapeau du hero et ligne « Nos capteurs… » (diagnostic) passés de `papier/85` à `papier` (4,2 → > 4,5). Dégradé du titre de l'étude de cas renforcé (2,9 → > 3 en 360). |

### Portraits (fal, exception de cet exemple fictif)

| Fichier | Modèle | Format | Contenu | Coût |
|---|---|---|---|---|
| `julien-240/480.webp` | nano-banana-2/edit, référence de style du shooting | 4:5, 1K, recadré | Julien, veste de travail grise, lunettes relevées, lit un collecteur de vibrations jaune relié à un accéléromètre posé sur la broche ; de trois quarts, ne regarde pas l'objectif | 0,08 $ |
| `sebastien-400/800.webp` | idem | 4:5, 1K | Sébastien, polo marine et gilet orange, bras croisés devant une presse à capot jaune, regard hors champ | 0,08 $ |

Total itération 3 : **0,16 $** (budget 0,25 $), une génération par portrait, aucune reprise. Cumul du projet : environ 2,41 $.

**Sur un vrai projet, ces deux images doivent être de vraies photos.** Règle d'or du skill medias : jamais de faux membre de l'équipe, jamais de faux client. Ici, c'est un exemple fictif et le coordinateur a autorisé l'exception ; chaque `<img>` porte le commentaire `provisoire : vraie photo à fournir`. Photos à demander à Claire : Julien à l'atelier avec son collecteur, Sébastien devant la presse 7 (avec son accord écrit), lumière du jour, sans retouche.

### gestes.js : à reporter dans le kit

- `data-follow-list` : image calée à droite de la liste (x fixe calculé sur la fin réelle du texte de la ligne, largeur bornée, masquée faute de place), suit seulement le y ; plus de saut depuis x = 0 à la première apparition.

### Vérification (itération 3)

Playwright (Chrome) en 1440×900, 1280×720, 1366×768, 375×812, 375×667, 360×740, plus mouvement réduit (1440 et 375) :
- aucune erreur ni avertissement console ;
- aucun débordement horizontal. Le contrôle compare maintenant `max(scrollWidth, innerWidth)` à la largeur demandée : en émulation téléphone, un débordement élargit la fenêtre de mise en page et l'ancien test (`scrollWidth − innerWidth`) ne le voyait pas. Il a trouvé un débordement de 210 px créé par le carrousel (colonne de grille sans `min-w-0`), corrigé ;
- signature épinglée : tout le contenu tient dans l'écran à la fin du défilement (bas du contenu 708/720, 736/768, 830/900, 641/667, 739/740, 756/812) ; bouton « Écouter » visible ;
- longueur : 18,6 écrans en 1440, 23,7 en 375×812 ;
- **contrastes mesurés sur les pixels réels** (`verif/px.js` + `px.py` dans le scratchpad) : à chaque arrêt de défilement, on relève couleur, taille et graisse de chaque texte, puis on capture le même écran avec le texte rendu transparent ; le contraste est calculé contre les pixels du fond réellement sous chaque texte (10e centile), en ne gardant que les points où le texte est au premier plan (ni sous l'en-tête, ni sous la barre collée, ni dans un accordéon fermé). Résultat : 0 texte sous le seuil en 375×812, 375×667 et 360×740 (minimum 3,0:1 sur du grand texte). Sur ordinateur, seul reste le titre du cas pendant l'agrandissement de son image (texte découpé par le `clip-path`, donc invisible à ce moment) ; une fois l'image ouverte, il est sur le dégradé sombre (vérifié sur capture).

### Autocritique après l'itération 3 : environ 90/100

Ce qui retient encore des points :
- portraits et preuves toujours fictifs : la page n'atteint le « oui » réel qu'avec les vraies photos et le prix réel de l'échange standard (13 800 € à valider) ;
- carrousel de la méthode sur téléphone : plus court, mais l'étape 4 demande un geste de plus ;
- la signature reste dense en 360×740 (1 px de marge).

## § Itération 3 bis (finitions après le « oui » de Claire : 9/10, 93/100)

Plan suivi : `test-lancetonsite/landings/vigie/iteration-3/fix-plan.md`, FIX-1 à FIX-6. Aucune génération payante.

| FIX | Fait | Mesure |
|---|---|---|
| 1 · montants coupés | `.chiffres` passe en `white-space: nowrap` partout ; les `dd` du bloc « D'où viennent les 54 300 € » ont en plus `shrink-0 whitespace-nowrap`. Seul le `dt` se replie. | Aucun montant (€) ni aucune mesure (mm/s, °C, %) sur deux lignes, aux 6 tailles et en mouvement réduit. Le test témoin (nowrap retiré) retrouve bien « 6 984 € » et « 5,2 mm/s » coupés en 360. |
| 2 · en-tête sur le titre | Plutôt qu'ajouter du padding (la signature n'a que 10 px de marge en 1280×720), l'en-tête reste caché tant qu'il recouvrirait le titre : nouvelle option `data-header-cache-sur="#signature"` dans gestes.js. Elle prend le premier titre de la section et anticipe de 30 % d'écran pour que l'en-tête soit déjà parti quand le titre redescend. Sur téléphone, le titre est à 76 px, sous l'en-tête : celui-ci reste visible et le bouton d'appel accessible. | Recouvrement 0 px² en 1280, 1366 et 1440 (et 375, 360), en descendant, en remontant vite et en remontant lentement au milieu de l'épinglage. La première version, sans anticipation, laissait encore 3 000 à 11 000 px² pendant le glissement de l'en-tête. |
| 3 · capot / « AVANT. » | `object-[72%_50%]` testé puis abandonné : il pousse le capot **vers** le point (écart 0 px en 360). Vers la droite (64 %), le capot sort de l'écran. Correction retenue : le titre passe de 46,4 à 42,4 px (`2.65rem`) sous 400 px de large et 760 px de haut ; le cadrage reste à 68 %. | Écart entre l'encre du point et le premier pixel jaune : 21 px en 360×740, 29,5 px en 375×667, 68 px en 375×812 (avant : 0, 0, 44). |
| 4 · textes < 12 px | Tous les `text-[0.6875rem]`, `[0.7rem]` et `[0.72rem]` passent à `0.75rem` (12 px), sans exception : graduations, semaines S-8…S-0, « mm/s eff. », « Seuil d'alerte », « semaines avant la casse », en-têtes des SMS, réglet, libellés du tableau de bord, `.pastille`. Le corps du SMS mobile de l'étape 3 passe à `0.8rem` ; l'exposant de « 1er » est fixé à `.78em`. Pour compenser la ligne en plus, le bloc courbe mobile passe de `mt-8` à `mt-6`. | 0 texte rendu sous 12 px aux 6 tailles, en mouvement normal comme réduit (les éléments cachés par une animation sont comptés). Signature épinglée : bas du contenu 732/740 en 360×740 (au lieu de 739). |
| 5 · « S-8 » en mouvement réduit | Branche mouvement réduit de gestes.js : le libellé courant prend la dernière valeur de `data-trace-labels`. | « S-0 » en 1440 et en 375. |
| 6 · deux délais | Partout « sous 3 semaines » (SMS du tableau, conseil de la fiche CN-04, données JS). Le SMS est le même message à 07:42 : il ne doit dire qu'une chose. | Plus aucune occurrence de « 18 jours ». |

### gestes.js : à reporter dans le kit

- `data-header-cache-sur="#id,…"` : l'en-tête reste caché tant qu'il recouvrirait le titre de ces sections (utile pour toute section épinglée dont le titre est collé en haut).
- Mouvement réduit : `[data-trace-out]` affiche le dernier libellé, puisque le tracé est entier.

### Vérification (port 8954)

Playwright (Chrome) en 1440×900, 1280×720, 1366×768, 375×812, 375×667 et 360×740, plus mouvement réduit aux 6 tailles :
- 0 erreur et 0 avertissement console ; 0 débordement horizontal ;
- 0 px² entre les SMS et le texte ; 0 point de courbe dans les notes ;
- le bouton « Écouter » reste dans l'écran ; longueur presque inchangée (18,6 écrans en 1440 ; 23,8 en 375×812, contre 23,7) ;
- en mouvement réduit 1440 : étapes 2 par ligne, 0 épinglage, 0 élément invisible.

Scripts dans le scratchpad : `verif/bis.js` + `bis.py` (montants, textes < 12 px, écart point / capot sur les pixels réels), `verif/entete.js` (recouvrement en-tête / titre à la molette), `verif/cap.js`.

Captures refaites : `05`, `07`, `09` (le SMS du tableau dit « sous 3 semaines »). Nouvelles : `16-hero-360x740-capot-degage`, `17-montants-une-ligne-360`, `18-signature-remontee-1280`, `19-signature-mouvement-reduit-s0-1440`. Les anciennes `05`, `07` et `09` sont rangées dans le scratchpad.

Restent à la charge de Claire : les vraies photos de Julien et Sébastien (avec leur accord écrit), et la validation écrite des 13 800 €.

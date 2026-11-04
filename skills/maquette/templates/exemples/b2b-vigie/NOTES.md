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

---

## § Refonte — produit centré (novembre 2026)

Le client trouvait la page « toujours la même chose qu'un template, trop de texte, trop d'informations ». La page est refaite de zéro : `index.html`, `css/vigie.src.css`, `gestes.js` réécrits, `scene.js` nouveau. Les itérations ci-dessus restent comme historique (elles décrivent l'ancienne page, plus en ligne).

### Intention

Une page produit à la manière d'Apple : l'objet au centre, une seule phrase énorme par moment, presque rien autour. Fond graphite uni (`#0f1112`), un seul jaune de sécurité (`#ffc21a`) pour le capot, la LED, le seuil, le prix et les boutons. Archivo (largeur variable, serrée sur les grands titres) et IBM Plex Mono pour les mesures. Pas de photo d'usine plein cadre en tête, pas de badge, pas de grille de 3 cartes, pas de rangée de logos. Le capteur fait la démonstration : on le regarde tourner, se poser, s'ouvrir, écouter, prévenir.

### Les 9 moments et sections (≈ 11 à 12 écrans)

La scène `#capteur` est épinglée sur 520 % de hauteur (470 % sur téléphone ; 620 / 520 % avant le tour 1 ; **200 / 150 % depuis les corrections de la refonte 2**, voir la fin du fichier) ; `t` va de 0 à 1 sur l'épinglage.

| # | t | Phrase | Ce que fait l'objet |
|---|---|---|---|
| 0 | 0 – 0,07 | « La panne, trois semaines avant. » (h1) + lien prix | entre en tournant, flotte, LED qui clignote |
| 1 | 0,085 – 0,215 | « 140 grammes. » | tour complet, s'incline puis se redresse |
| 2 | 0,245 – 0,405 | « Posé en 10 minutes. » | le palier en fonte monte, le capteur s'y pose (ombre de contact qui se resserre) |
| 3 | 0,445 – 0,615 | « Quatre pièces. Aucun câble. » | vue éclatée coque / carte / pile / aimant, étiquettes reliées en 3D |
| 4 | 0,645 – 0,86 | « Il écoute chaque roulement, chaque heure. » | le palier s'efface ; trois ondes radio partent du capteur, la courbe franchit le seuil 4,5 mm/s sur un axe S-8 → aujourd'hui → S+3, projection « Casse probable » |
| 5 | 0,88 – 1 | « Il prévient trois semaines avant. » | écran de téléphone HTML, SMS de VIGIE (Messages), mardi 14 avril, 7:42 |
| 6 | — | `#cas` « Une broche qui casse sans prévenir coûte 54 300 €. » | photo CN-04 consignée, barre empilée unique (4 postes), calculateur compact (3 curseurs) |
| 7 | — | `#details` (sans titre) puis `#offre` « Commencez par trois machines. » | 3 gros plans rendus de la scène ; photo d'usage, 1 490 € HT, pilote 90 jours, remboursé si aucune alerte utile, sur l'axe |
| 8 | — | `#questions` + `#diagnostic` | 3 questions en accordéon ; formulaire court « Réserver un diagnostic de 30 min » (3 champs) avec Julien, sur l'axe |

### Le capteur 3D

- three.js **0.170.0** (importmap jsdelivr, import dynamique : le texte et l'épinglage marchent même si la 3D ne charge pas). Aucun modèle externe, aucune génération payante : tout est construit en code dans `scene.js` (`construire`). `images/capteur.glb` (itération 2) est conservé mais plus utilisé : un seul maillage ne permet pas la vue éclatée.
- Pièces : profils `LatheGeometry` fusionnés (arêtes vives), bague moletée (bump map dessinée sur un canvas), capot jaune avec « VIGIE » en décalque, carte électronique avec composants, pile, aimant et vis ; palier à semelle en fonte (corps tourné, bague de roulement, joint, bague de blocage à vis, bout d'arbre, bossage usiné sous le capteur, semelle et 2 boulons ; l'objet garde le nom `carter` dans le code). Remplace au tour 1 la boîte en `RoundedBoxGeometry`.
- Rendu : `RoomEnvironment` passé par PMREM pour les reflets doux, `NeutralToneMapping`, `MeshPhysicalMaterial` (anisotropie sur l'aluminium anodisé, clearcoat sur le capot), ombre de contact (plan + dégradé radial dont la taille et l'opacité suivent la hauteur), halo LED en sprite.
- Cadrage par images clés (`CLES` bureau / mobile : centre, taille, élévation) et `camera.setViewOffset` pour placer l'objet à côté ou au-dessus du texte. Rendu à la demande dans `gsap.ticker` (rien n'est redessiné quand rien ne bouge).

### Fichiers

- `gestes.js` : version allégée du kit v3 (le kit `templates/prototype/gestes.js` n'est **pas** modifié). Lenis, titres en lignes, apparitions, barre empilée, accordéon. Toutes les apparitions passent par l'opacité, jamais par `autoAlpha` / `visibility`.
- `scene.js` (module) : la scène épinglée, la courbe SVG, le téléphone, et le mouvement réduit.
- Script en ligne en bas de page : calculateur et validation du formulaire (`aria-invalid`, message `role="alert"`, focus sur le premier champ en erreur, « C'est noté, {prénom}. »).
- Mode : un script en `<head>` pose `html.motion` si le mouvement est permis. Le CSS par défaut est l'état réduit (statique).
- Mouvement réduit : pas d'épinglage et **three.js n'est plus chargé** (depuis le tour 1). La scène devient une suite d'états fixes : `images/planche-1/2/3.webp` (capteur, posé sur le palier, vue éclatée), étiquettes placées d'après `data-fx` / `data-fy`, courbe entière, téléphone avec le SMS. Ces planches et les 3 gros plans sont des rendus de la scène elle-même (voir « Boucle persona — tour 1 »).
- Compilation Tailwind v4 (depuis un dossier où `@tailwindcss/cli` est installé) : `npx @tailwindcss/cli -i css/vigie.src.css -o css/vigie.css --minify`. Si le dossier de l'exemple n'a pas de `node_modules`, copier la source à côté du CLI en réécrivant les `@source "../…"` en chemins absolus, puis compiler vers `css/vigie.css`.

### Nombre de mots visibles

321 en 1440 et 1280 / 315 sur téléphone (le numéro de l'en-tête est masqué), menu, téléphone de la scène et pied de page compris ; réponses de FAQ fermées non comptées. Cible < 350 tenue.

### Vérification (Playwright + Chrome, port 8982)

| Taille | Hauteur | Mots | Arrêts Tab | Débordement | Titre sous l'en-tête | Texte < 12 px | Contraste < 4,5 | Console |
|---|---|---|---|---|---|---|---|---|
| 1440×900 | 11,2 écrans | 321 | 21 | 0 | non (h1 52 px sous l'en-tête) | 0 | 0 | propre |
| 1280×720 | 11,8 | 321 | 21 | 0 | non (31 px) | 0 | 0 | propre |
| 375×812 | 11,5 | 315 | 19 | 0 | non | 0 | 0 | propre |
| 375×667 | 12,0 | 315 | 19 | 0 | non | 0 | 0 | propre |
| 360×740 | 12,0 | 315 | 19 | 0 | non | 0 | 0 | propre |
| 1440 réduit | 9,0 | 321 | 21 | 0 | — | 0 | 0 | propre |
| 375 réduit | 8,7 | 315 | 19 | 0 | — | 0 | 0 | propre |

- Temps de trame pendant la scène 3D en 1440 (molette tout le long de l'épinglage, Chrome headless avec GPU Metal) : médiane 16,7 ms, **p95 16,7 ms**, max 16,8 ms.
- Ordre de tabulation complet : lien d'évitement, logo, Tarifs, téléphone, bouton, lien prix, 3 curseurs, bouton de l'offre, 4 questions, téléphone de Julien, 3 champs, envoi, téléphone et mentions du pied. Un moment de la scène qui reçoit le focus fait défiler jusqu'à lui.
- Contraste : notes de la courbe passées de `gris` à `brume` (4,27 → plus de 4,5 sur le pire point du halo).

Captures (`captures/`, les 19 anciennes sont remplacées) : `01` à `07` les étapes de l'objet en 1440, `08` cas, `09` offre, `10` diagnostic, `11` à `14` téléphone (375×812, 375×667, 360×740), `15` mouvement réduit (vue éclatée fixe).

### Ce qui reste faible

- Le cas est une moyenne de 38 casses, pas un client nommé : moins incarné que l'ancien témoignage de Sébastien (retiré avec ses sections). Les 13 800 € de la broche en express attendent toujours une validation écrite.
- Le portrait de Julien reste provisoire (commentaire HTML).
- Le son « écouter » et les anciennes sections (méthode, tableau de bord, secteurs) sont abandonnés.
- Sur téléphone, le h1 est sous l'objet (choix assumé : l'objet d'abord) ; sur le premier écran 375×812, un vide d'environ 120 px reste entre le chapeau et le lien prix.
- Le rendu Retina (pixelRatio 2) et la fluidité n'ont pas été vérifiés sur un vrai GPU de téléphone : les mesures viennent de Chrome headless sur Mac.
- Les images de l'ancienne page restent dans `images/` (seules `arret`, `ecoute`, `julien`, `planche-*` et `gros-plan-*` sont utilisées ; `hero-*` ne l'est plus depuis le tour 1).

## § Boucle persona — tour 1 (77/100)

Plan appliqué : `test-lancetonsite/landings/vigie/refonte-iteration-1/fix-plan.md`. FIX-1 à FIX-14, tous à 0 $ (aucune génération d'image). FIX-15 et FIX-16 dépendent du client : voir « Ce qui manque encore ».

### Ce qui a changé, FIX par FIX

| FIX | Fait | Comment |
|---|---|---|
| 1 · photo de l'offre | oui | `hero-*` (palet plat, usinage porte ouverte) remplacée par `ecoute-*` : le capteur sur un palier de convoyeur, carter de protection en place. Recadrée en 3:2 sur ordinateur et en 1:1 sur téléphone, 48rem au plus. |
| 2 · fin de page en deux colonnes | oui | `#offre`, `#questions` et `#diagnostic` sont sur l'axe : photo d'usage, titre, prix en très grand, « Remboursé si aucune alerte utile. », une phrase, bouton. Nouvelle section `#details` avant l'offre : 3 gros plans rendus de la scène three.js (molette, carte 3 axes, aimant sur le palier), 6 à 7 mots de légende chacun. |
| 3 · « 38 casses chez nos clients » | oui | « Coût moyen de 38 casses de broche, relevé chez nos clients l'année avant Vigie. » Suivi de la conséquence : 16 h planifiées au lieu de 3 jours subis. |
| 4 · le « câble » | oui | `[data-courbe-fil]` supprimé, remplacé par 3 arcs d'ondes radio en pointillés (`[data-courbe-ondes]`), vers la droite sur ordinateur et vers le bas sur téléphone. |
| 5 · courbe sans échelle de temps | oui | Axe S-8 → aujourd'hui → S+3, repère vertical sous le point 4,6 mm/s, accolade jaune « 3 semaines » entre aujourd'hui et la casse. |
| 6 · étiquettes contre la courbe ou le bord | oui | « Seuil 4,5 mm/s » sous la ligne à droite quand la place existe, sinon au-dessus à gauche. « Casse probable » et toutes les notes sont bornées dans le cadre. Étiquettes de la vue éclatée à 16 px au moins des bords (mouvement et réduit). |
| 7 · « Casse probable » trop pâle | oui | Projection entre t = 0,775 et 0,81, donc pleine avant que le moment 4 s'efface (0,83). Couleur `#ff5a3d` (6,1:1 sur le graphite), et non `#e5432b` comme proposé : celui-ci ne fait que 4,66:1 sur le graphite et passe sous 4,5:1 sur le halo de la scène. |
| 8 · vides sur téléphone | oui | Images clés mobiles refaites (objet plus haut, plus petit pendant la courbe), textes des moments à 57-68svh, fondu ramené à 42 %, masque du téléphone à 50svh. |
| 9 · photo du cas sur téléphone | oui | 4:5 sous 768 px (cadrée sur la broche), 21:9 au-dessus. |
| 10 · le carter n'est pas un carter | oui | Palier à semelle en fonte construit en code (voir « Le capteur 3D ») : fonte grenaillée en bump map, bague, joint, bague de blocage à vis, bout d'arbre, semelle et 2 boulons. |
| 11 · SMS et date | oui | En-tête « Messages », expéditeur « VIGIE », texte de SMS, texte lu « Le SMS reçu à 7 h 42. ». Date « mardi 14 avril » (un mardi en 2026). L'icône verte de Messages est gardée : elle dit « SMS » sans un mot. |
| 12 · précisions de métier | oui | « Six capteurs (deux par machine) ». « Il écoute chaque roulement, chaque heure. » puis « 25 600 mesures par seconde. » : la mesure par salves est dite sans un mot technique. |
| 13 · mouvement réduit | oui | three.js n'est plus chargé. Les 3 planches sont des webp fixes (chargement différé, silhouette d'attente), avec un fondu en bas de l'image. Les étiquettes sont placées d'après `data-fx` / `data-fy`, puis bornées. |
| 14 · accessibilité | oui | Champ en erreur avec le focus : anneau `#ff8a75` au lieu du jaune. Téléphone du pied de page : 44 px de haut (`min-h-11`). |
| 15 · preuve terrain nommée | non | Client : voir plus bas. |
| 16 · vraies photos, chiffres validés | non | Client : voir plus bas. |

Autres écarts au plan, pour tenir le budget de mots et d'écrans :
- FAQ ramenée à 3 questions (« la pose » est retirée, le moment 2 et les gros plans la disent) ;
- bouton de l'offre raccourci en « Réserver un diagnostic » ;
- SIRET retiré des mentions (le RCS reste) ;
- épinglage ramené de 620 à 520 % (téléphone 470 %).

### Planches et gros plans : rendus de la scène (0 $)

`scene.js` exporte `charger3D()` et `rendreVues(L, noms, ratio)`. L'objet `VUES` décrit chaque image : 3 planches de 880×660 rendues au ratio 1,5 et 3 gros plans rendus au ratio 2, avec caméra, pièces et pose propres à chacun.

Pour régénérer après une retouche du capteur :
1. Ouvrir la page en mouvement permis.
2. Dans la console, lancer :
   ```js
   const s = await import('./scene.js');
   const L = await s.charger3D();
   const r = await s.rendreVues(L, ['planche-1', 'planche-2', 'planche-3'], 1.5);
   ```
   Pour les gros plans : `['gros-plan-molette', 'gros-plan-carte', 'gros-plan-aimant']`, ratio 2.
3. Enregistrer chaque `r[nom].url` (data URL webp) dans `images/` : planches en 1320 et 880 px de large, gros plans en 800 et 480 px.
4. Recopier dans `data-fx` / `data-fy` des étiquettes de `index.html` les ancres renvoyées par `planche-3` (`r['planche-3'].etiquettes`).

### Tailwind

Compilé avec `@tailwindcss/cli` 4.3.3 (l'original l'était en 4.1.14), même méthode que plus haut : source copiée à côté du CLI, `@source` réécrits en chemins absolus.

### Comptage et contrôles (Playwright + Chrome, script de `conventions.md` § 11)

FAQ et mentions ouvertes.

| Taille | Mots | Sections | Écrans | Débordement | Texte < 12 px | Cibles < 44 px | Console |
|---|---|---|---|---|---|---|---|
| 1440×900 | 347 | 6 | 11,9 | 0 | 0 | 0 | propre |
| 1280×720 | 347 | 6 | 12,9 | 0 | 0 | 0 | propre |
| 375×812 | 341 | 6 | 12,3 | 0 | 0 | 0 | propre |
| 375×667 | 341 | 6 | 13,5 | 0 | 0 | 0 | propre |
| 360×740 | 341 | 6 | 12,8 | 0 | 0 | 0 | propre |
| 1440 réduit | 394 | 6 | 10,8 | 0 | 0 | 0 | propre |
| 375 réduit | 388 | 6 | 10,6 | 0 | 0 | 0 | propre |

- **Attention, écart de comptage.** En mouvement, SplitText pose `aria-hidden` sur les lignes des titres, et le script du § 11 les retire du total. Le chiffre de 347 (même méthode que la revue : 345) sous-compte donc les titres. Le texte affiché est le même dans les deux modes, et le vrai total est celui du mode réduit : **394 mots**. C'est sous 400, mais au-dessus de la cible de la fiche 2 (250 à 350).
  - **Corrigé au tour 2 : ce 394 était faux, le vrai total était 431.** Les trois `<details name="faq">` forment un accordéon exclusif : le script les ouvrait l'un après l'autre et chacun refermait le précédent, si bien qu'une seule réponse était comptée (37 mots manquants). Le script du § 11 retire désormais `name` avant d'ouvrir.
- **Fluidité** à 1440, molette tout le long de l'épinglage, Chrome avec GPU Metal :
  - médiane 6,9 ms, **p95 7,6 ms**, max 14 ms ;
  - écran à 144 Hz.
- **Clavier.**
  - Ordre de tabulation : évitement, logo, Tarifs, téléphone, bouton, lien prix, 3 curseurs, bouton de l'offre, 3 questions, téléphone de Julien, 3 champs.
  - Aucun élément focalisé caché sous l'en-tête (seul le lien d'évitement s'affiche par-dessus, c'est voulu) ; anneau visible partout.
  - Un champ en erreur qui a le focus garde un anneau rouge de 3 px.
- **Mouvement réduit.**
  - 0 épinglage, three.js non chargé.
  - Vue éclatée entière, avec un fondu en bas.
  - Étiquettes à 16 px au moins des bords ; « Seuil » n'est pas traversé par la courbe.
- **Premier écran 375×667** : titre, chapeau et lien prix visibles.

Captures refaites sous les mêmes 15 noms dans `captures/`.

### Ce qui manque encore

- **FIX-15 (client) : une preuve terrain nommée.** Il faut un client, une usine, un chiffre, une photo, et l'accord écrit de les publier. Un directeur d'usine veut pouvoir appeler un pair : sans ce nom, le cas reste une moyenne.
- **FIX-16 (client) : vraies photos et chiffres validés.**
  - Photographier le capteur posé chez un client, pour remplacer `ecoute`, `arret` et le portrait de Julien, qui sont générés.
  - Valider par écrit les 13 800 € de broche en express et la base de 38 casses (commentaire source dans `index.html`, section `#cas`).
- **6 sections dans `<main>`**, sous la fourchette de 7 à 9 du § 11. La scène porte à elle seule 6 moments, et la revue n'avait pas pénalisé 5 sections. Ajouter une section coûterait des mots et des écrans.
- **Vrai total de mots : 431, et non 394** (FAQ en accordéon exclusif sous-comptée, voir ci-dessus). Ramené à 378 au tour 2.
- **Hauteur** : 12,9 écrans en 1280×720 et 13,5 en 375×667, au-dessus de la fourchette de 8 à 12. La règle se mesure à 1440 (11,9).
- Rendu Retina et fluidité non vérifiés sur un vrai GPU de téléphone.

## § Boucle persona — tour 2 (75/100)

Plan appliqué : `test-lancetonsite/landings/vigie/refonte-iteration-2/fix-plan.md`. FIX-1 à FIX-7, tous à 0 $ (aucune génération : les planches et gros plans sont re-rendus depuis la scène three.js). FIX-8 et FIX-9 dépendent du client : voir « Ce qui manque encore » (inchangé).

### Ce qui a changé, FIX par FIX

| FIX | Fait | Comment |
|---|---|---|
| 1 · 431 mots, budget dépassé | oui, **378** | Mentions légales sorties du pied vers `mentions-legales.html` (même CSS, `noindex`), un lien « Mentions légales » de 44 px dans le pied (−33). Légende de la barre : « Coût moyen de 38 casses de broche chez nos clients, l'année avant Vigie. Avec Vigie : 16 h planifiées, pas 3 jours subis. » (−10). FAQ « 25 ans » : « Tant mieux. Le capteur écoute la mécanique, pas l'automate. » (−12). FAQ « réseau » : « propre SIM 4G : votre informatique n'a rien à ouvrir » (−2). Aucune preuve forte retirée (371 / 412, 54 300 €, 70 %, Julien restent). |
| 2 · le lien prix ne montrait pas le prix | oui | `id="prix"` sur « Commencez par trois machines. », « Pilote 90 jours… » et « Tarifs » pointent sur `#prix` ; `#prix { scroll-margin-top: 5rem }`. `data-saut="0"` retiré (aucun code ne le lisait). Mesures après clic ci-dessous. |
| 3 · photo d'offre ≠ capteur 3D | oui, **la 3D suit la photo** | Toutes les photos existantes du capteur (`ecoute`, `palier`, `intervention`) montrent le même objet : capot jaune mince, bandeau, bague moletée, corps avec la LED, aimant. Changer de photo ne réglait rien, et recadrer `ecoute` aurait caché le capteur, son sujet. La coque de `scene.js` est donc refaite à ces proportions : capot 4,46 → 5,2 (≈ 14 % de la hauteur, bord arrondi plus serré), bandeau anodisé 3,75 → 4,46, bague moletée 2,6 → 3,75 (≈ 22 %), LED à y = 2,0 au tiers haut du corps, rainure et aimant inchangés. Décision sur la silhouette du hero : le capot reste jaune et se lit encore de haut (le hero est vu en plongée, le disque jaune « VIGIE » domine toujours, capture `01`) ; on accepte un jaune un peu moins massif de profil pour n'avoir qu'un seul objet. Planches et gros plans re-rendus (`rendreVues`), ancres d'étiquettes inchangées (0,614 / 0,292 ; 0,406 / 0,488 ; 0,575 / 0,626 ; 0,399 / 0,809). |
| 4 · focus clavier sur un bloc invisible | oui | `gestes.js` : chaque apparition `data-reveal` garde son tween ; `focusin` → `tw.progress(1)` (une fois). Contrôle à 60 ms entre deux tabulations : le téléphone de Julien (14ᵉ) et le premier champ sont à opacité 1. À reporter dans `templates/prototype/gestes.js`. |
| 5 · flou de l'en-tête perdu | oui | Lightning CSS (Tailwind 4.3.3) gardait `-webkit-backdrop-filter` seul quand la propriété standard venait d'abord. Source : `--flou: …; -webkit-backdrop-filter: var(--flou); backdrop-filter: var(--flou);` (préfixe d'abord) pour `.entete` et `.notif`. `getComputedStyle(.entete).backdropFilter` = `saturate(1.4) blur(14px)` à toutes les tailles. |
| 6 · « chaque heure » / « par seconde » | oui | « Il écoute chaque roulement, chaque heure. » puis « Une salve de 25 600 mesures par seconde. » (+2 mots). |
| 7 · gros plan molette, verbes, délai | oui | Vue `gros-plan-molette` recadrée sur la bague (cible y = 2,95, distance 9,5, élévation 8°) : capot en haut, bague au centre, LED en bas. « Se visse sur l'aimant, à la main. » Diagnostic : titre « Un diagnostic de 30 min, par téléphone. » (`30 min,` insécable), bouton de l'offre « Demander un diagnostic », envoi « Être rappelé », confirmation « Julien vous rappelle sous un jour ouvré. » Vue `gros-plan-aimant` tournée d'un demi-tour (la LED, descendue, y entrait), et `rendreVues` masque désormais la lueur quand la LED tourne le dos (le halo traversait la coque). |
| 8 · preuve terrain nommée | non (client) | Toujours ouvert, voir plus bas. |
| 9 · vraies photos, chiffres validés | non (client) | Toujours ouvert, voir plus bas. |

**Sections : 7** (6 avant). Le calculateur « Et chez vous ? » devient sa propre `<section id="calcul">`, sans un mot de plus : c'est un geste distinct du constat (le cas montre la casse moyenne, le calculateur la transpose chez le lecteur). `#cas` perd son marge basse (`pb-0`), `.section-calcul` la reprend : la page est visuellement identique. La scène épinglée n'est pas découpée (un seul épinglage, un seul cadre : la couper casserait l'épinglage).

Recompilation Tailwind : `@tailwindcss/cli` 4.3.3, source copiée à côté du CLI avec les `@source` en chemins absolus (`index.html`, `mentions-legales.html`, `gestes.js`, `scene.js`).

### Comptage et contrôles (Playwright + Chrome, script de `conventions.md` § 11 corrigé : `name` retiré avant d'ouvrir)

| Taille | Mots | Sections | Écrans | Débordement | Texte < 12 px | Cibles < 44 px | Console |
|---|---|---|---|---|---|---|---|
| 1440×900 | 377 | 7 | 11,7 – 12 | 0 | 0 | 0 | propre |
| 1440 réduit | **378** | 7 | 10,6 – 10,9 | 0 | 0 | 0 | propre |
| 1280×720 | 377 | 7 | 12,6 – 12,9 | 0 | 0 | 0 | propre |
| 1280 réduit | — | 7 | 12,5 | 0 | 0 | 0 | propre |
| 375×812 | 371 | 7 | 12 – 12,4 | 0 | 0 | 0 | propre |
| 375 réduit | 372 | 7 | 10,3 – 10,7 | 0 | 0 | 0 | propre |
| 375×667 | — | 7 | 13,1 | 0 | 0 | 0 | propre |
| 360×740 | — | 7 | 12,5 | 0 | 0 | 0 | propre |

- **Total retenu : 378 mots** (le plus grand des deux modes), contre 431 réels au tour 1. Détail (1440 réduit) : évitement 3, en-tête 10, scène 126, cas 52, calcul 27, gros plans 20, offre 43, questions 60, diagnostic 27, pied 10.
- Console : aucune erreur venant de la page. Des `ERR_CONNECTION_RESET` isolés sur une image (`gros-plan-*-480`, `julien-240`) viennent du serveur local sous charge ; ils disparaissent au rechargement.
- **Après clic sur « Pilote 90 jours » ou « Tarifs »** (haut du titre / bas du bouton, en px) :

  | Taille | Mouvement | Réduit |
  |---|---|---|
  | 1440×900 | 153 / 649 | 80 / 576 |
  | 1280×720 | 153 / 622 | 80 / 549 |
  | 375×812 | 153 / 584 | 80 / 511 |
  | 375×667, 360×740 | 153 / 584 | — |

  Titre, 1 490 €, « Remboursé si aucune alerte utile. » et le bouton tiennent dans l'écran partout. En mouvement, Lenis ajoute son décalage (72 px) à `scroll-margin-top` : le titre arrive 88 px sous l'en-tête, ce qui laisse encore de la marge.
- **Clavier** (40 tabulations, 1440 / 1280 / 375 / 360, deux modes) : évitement, logo, Tarifs, téléphone, Diagnostic, lien prix, 3 curseurs, « Demander un diagnostic », 3 questions, téléphone de Julien, 3 champs, « Être rappelé », téléphone du pied, Mentions légales. Chaque élément focalisé est à opacité 1, dans l'écran, avec l'anneau ; aucun sous l'en-tête (sauf le lien d'évitement, affiché par-dessus, voulu).
- **Mouvement réduit** : pas d'épinglage, three.js non chargé, planches re-rendues à la nouvelle forme.
- `mentions-legales.html` : 0 débordement à 1440 et 360, liens à 44 px, console propre.

Captures refaites sous les mêmes 15 noms dans `captures/` (`01` à `07` objet, `08` cas, `09` offre après clic sur le lien prix, `10` diagnostic, `11` à `14` téléphone, `15` mouvement réduit).

### Écarts au plan

- Légende de la barre : version du plan, donc « la broche d'échange se monte au changement d'équipe » disparaît (le « 16 h planifiées » reste).
- Réponse « réseau » raccourcie de 2 mots en plus du plan, pour garder une marge sous 380.
- Verbes du diagnostic : plutôt que d'allonger le bouton (« Être rappelé pour le diagnostic », +3 mots), le titre et le bouton de l'offre prennent le sens du rappel.
- FIX-3 fait côté 3D et non par génération : 0 $, et l'objet reste le même dans les trois photos.

### Ce qui manque encore

- **FIX-8 (client) : une preuve terrain nommée** (client, usine, chiffre, portrait réel, accord écrit). Penser au budget : 378 mots, il reste environ 20 mots sous 400.
- **FIX-9 (client) : vraies photos et chiffres validés** (`ecoute`, `arret`, Julien ; 13 800 € et base des 38 casses). Une vraie photo du capteur réglera la forme pour de bon : la 3D devra alors suivre l'objet réel.
- **Hauteur** : 12,6 à 12,9 écrans à 1280×720 et 13,1 à 375×667, au-dessus de 8 à 12 ; la règle se mesure à 1440 (11,7 à 12).
- Rendu Retina et fluidité non vérifiés sur un vrai GPU de téléphone.
- À reporter dans le kit : le `focusin` des apparitions (`templates/prototype/gestes.js`) et l'ordre `-webkit-backdrop-filter` puis `backdrop-filter` dans toute source Tailwind compilée.

## § Boucle persona — tour 3 (86/100, Oui)

Notes des trois tours : **77 → 75 → 86**. Tour 3, dernier tour : 86 pour un seuil de 85, verdict « Oui », sous condition de FIX-1. Selon `boucle-persona.md`, les FIX gratuits restants sont corrigés sans nouveau tour. Plan : `test-lancetonsite/landings/vigie/refonte-iteration-3/fix-plan.md`. Tout est à 0 $ : aucune génération, les planches et gros plans ne sont pas re-rendus.

### Ce qui a changé, FIX par FIX

| FIX | Fait | Comment |
|---|---|---|
| 1 · lien prix fantôme (majeur, condition du Oui) | oui | `scene.js`, boucle des moments : `a` et `button` d'un moment reçoivent `pointer-events: none` à son `data-out` et `auto` à son `data-in` (`tl.set` dans la timeline pilotée par le défilement, donc annulé quand on remonte). Au départ, un moment qui a un `data-in` est à `none`. La règle CSS `.motion .moment a { pointer-events: auto }` reste pour le cas où `scene.js` ne charge pas. |
| 2 · capteur absent du hero en mouvement réduit | oui | `html:not(.motion) [data-moment="1"]` passe en `flex-direction: column-reverse` : titre, chapeau, lien prix, puis le capteur, puis « 140 grammes. ». Aucun mot de plus. |
| 3 · mentions légales incomplètes | oui (structure) | `mentions-legales.html` : capital, contact (téléphone, e-mail), hébergeur avec adresse, RCS et téléphone publics d'OVH SAS (2 rue Kellermann, 59100 Roubaix, 1007), données personnelles (finalité, durée de conservation, droits d'accès, de rectification et d'effacement, CNIL), cookies. Les valeurs propres à la cliente sont entre crochets, en jaune, avec une phrase qui l'annonce en tête de page. Au plus 3 phrases par bloc. |
| 4 · 378 mots | oui, **363** | Légende de la barre : « Moyenne de 38 casses chez nos clients, l'année avant Vigie. » (−3). Hypothèse : « 70 % des arrêts évités (2025) » (−1). Offre : « Six capteurs posés sans arrêt, passerelle 4G et bilan avec un analyste. Puis 390 € HT par mois pour 10 capteurs. » (−4). Prix : « HT, pilote 90 jours » (−1). Fausses alertes : « En 2025, 371 alertes sur 412 confirmées machine ouverte. Un analyste relit chacune avant le SMS. » (−5 : « avant le SMS » gardé). Julien : « chiffre votre arrêt. » (−1). Aucune preuve retirée : 54 300 €, 38 casses, 70 %, 371 / 412, 1 490 €, 390 €, Julien restent. |
| 5 · palier derrière le titre du moment 4 sur téléphone | oui | `scene.js`, `etat()` : sortie du palier `seg(t, 0.585, 0.645)` au lieu de `0.615, 0.7`, et bascule montée / sortie à `t < 0.5` au lieu de `0.6` (sinon le palier sautait d'une unité à 0,6). Les planches ne changent pas (`planche-3` est à t = 0,565). |
| 6 · raccord scène / cas, « Casse probable » | oui | Le trait n'était pas le fondu : à la fin de l'épinglage, le cadre s'arrête à une fraction de pixel (80,001 px) et le halo, calque composité, est découpé à l'arrondi supérieur. Une rangée de halo (26, 30, 32) dépassait sous le cadre. La piste du plan (fondu à 100 %) ne l'enlevait pas, ni un fondu prolongé ou composité. Correctif : `clip-path: inset(0 0 2px 0)` sur `.motion .scene-cadre`, les 2 px du bas étant de toute façon dans le fondu. Contrôlé : la rangée sous le cadre vaut `#0f1112` à 200, 120 et 80 px. « Casse probable » : bord droit calé sur `X(bout[0])`, donc à 1 339 px, comme le bout de l'axe à 1440. |
| 8 · preuve terrain nommée | non (client) | Voir plus bas. |
| 9 · vraies photos, chiffres validés | non (client) | Voir plus bas. |

Recompilation Tailwind : `@tailwindcss/cli` 4.3.3, même méthode (source copiée à côté du CLI, `@source` en chemins absolus). Le flou de l'en-tête (`-webkit-backdrop-filter` puis `backdrop-filter`) est conservé.

### Comptage et contrôles (Playwright + Chrome, script de `conventions.md` § 11)

| Mode, 1440 × 900 | Mots | Sections | Écrans |
|---|---|---|---|
| Animé | 362 | 7 | 12,1 |
| **Réduit** | **363** | 7 | 10,9 |

- **Retenu : 363 mots** (le plus grand des deux), contre 378 au tour 2. C'est dans la cible de 350 à 363, et il reste 37 mots sous 400 pour la preuve client de FIX-8.
- Détail (réduit) : évitement 3, en-tête 10, scène 126, cas 49, calcul 26, gros plans 20, offre 38, questions 55, diagnostic 26, pied 10.
- **FIX-1, vérifié au clic et au toucher.**
  - À 1440 × 900 (souris) et 375 × 812 (toucher), à 600, 2 000, 2 640, 3 500 et 4 600 px : sous le centre du lien, `elementFromPoint` renvoie le canvas, le lien est en `pointer-events: none`, et le clic ou le toucher ne fait pas défiler.
  - Sur téléphone, un toucher sur la sous-phrase du moment 4, à 2 640 px, laisse la page à 2 640 px.
  - En haut de page, après un aller-retour dans la scène, le lien est cliquable : il mène au prix (titre à 153 px).
  - Au clavier, la 6ᵉ tabulation (4ᵉ sur téléphone, sans « Tarifs » ni le numéro) tombe sur le lien, visible.
- **FIX-2.** En réduit, le haut de la planche du capteur est à 503 px à 1440 × 900, à 465 px à 1280 × 720 et à 469 px à 375 × 812, juste sous le lien prix. Le capot jaune entre dans le premier écran à toutes ces tailles.
- **FIX-5.** À 375 × 812, entre 2 450 et 2 700 px (t = 0,64 à 0,71), plus de palier derrière le titre du moment 4.
- **Débordement, cibles, clavier, console.**
  - 1440 × 900, 1280 × 720, 375 × 812, 375 × 667, 360 × 740, puis 1440 et 375 en réduit : 0 px de débordement.
  - 0 cible sous 44 px.
  - 24 tabulations : chaque élément focalisé est à opacité 1, dans l'écran, jamais sous l'en-tête, avec son anneau.
  - 0 erreur console.
  - `mentions-legales.html` à 1440 et 360 : 0 débordement, liens de 44 px, console propre.
- **Le serveur de 4322.** Les contrôles de console ont tourné sur un second serveur local (même dossier, file d'attente de 128). Sur `http://localhost:4322/`, le serveur Python garde sa file par défaut de 5 connexions : quand les images sont forcées toutes à la fois, il renvoie des `ERR_CONNECTION_RESET` et `ERR_SOCKET_NOT_CONNECTED`. Ce n'est pas la page : aucune erreur JavaScript, et les mêmes fichiers répondent en 200.

Captures refaites sous les mêmes noms, dans `captures/` :
- `06` : « Casse probable » au bout de l'axe ;
- `08` : légende de la barre ;
- `09` : offre ;
- `10` : diagnostic ;
- `13` : courbe à 375 × 667.

Les autres ne changent pas.

### Écarts au plan

- **FIX-6, raccord.** `clip-path` sur le cadre plutôt que le fondu à 100 % (voir le tableau).
- **FIX-4.**
  - La réponse sur les fausses alertes garde « avant le SMS » : c'est ce qui dit qu'un humain relit avant l'envoi.
  - « (deux par machine) » part : six capteurs pour trois machines le disent déjà.
  - « pilote de 90 jours » devient « pilote 90 jours », comme le lien du premier écran.
- **FIX-1, retour sur le kit.** À ajouter aux règles de `GESTES.md`, pas fait ici : dans une scène épinglée, un lien d'un état effacé reçoit `pointer-events: none`.

### Ce qui manque encore

- **FIX-8 (client) : une preuve terrain nommée.**
  - Il faut un client, une usine, un chiffre, un portrait réel et l'accord écrit de les publier.
  - Une ligne sous la barre du cas, environ 20 mots : la page passerait à environ 383 mots, sous 400.
  - Pas de génération : un faux client serait pire que rien.
- **FIX-9 (client) : vraies photos et chiffres validés.**
  - Photographier le capteur posé chez un client, pour remplacer `ecoute`, `arret` et le portrait de Julien, qui sont générés.
  - Valider par écrit les 13 800 € de la broche en express et la base des 38 casses.
  - La 3D devra ensuite suivre l'objet réel.
- **FIX-3 (client) : les valeurs des mentions légales.**
  - Le capital social et l'adresse e-mail de contact et d'exercice des droits.
  - La durée de conservation, aujourd'hui 12 mois, à confirmer.
  - L'hébergeur réel, s'il n'est pas OVH.
- **Hauteur.** Au tour 2 : 12,6 à 12,9 écrans à 1280 × 720, et 13,1 à 375 × 667, non remesurés ici (les FIX de ce tour ne changent pas la hauteur). La règle se mesure à 1440, où la page fait 10,9 à 12,1 écrans.
- Le rendu Retina et la fluidité ne sont pas vérifiés sur un vrai GPU de téléphone.

## § Refonte 2 — retours utilisateur du 4 novembre

Source : `test-lancetonsite/retours-utilisateur-2026-11-04.md` (elle passe avant le budget de texte et les rapports persona). Nouveau budget : 10 à 13 sections, 500 à 800 mots, 3 phrases au plus par bloc. Originaux (page, CSS, scripts, NOTES, 15 anciennes captures) sauvegardés avant modification dans `/tmp/claude-501/vigie2/original/` (temporaire, hors du dossier). `mentions-legales.html` n'est pas modifiée ; revérifiée à 1440 et 360 (0 débordement, console propre). Aucun tour persona lancé ici.

### Ce qui a changé

| Retour | Fait |
|---|---|
| Nav à refaire, sans numéros | Nouvelle barre : logo, 5 liens (Comment ça marche, Clients, Intégrations, Tarifs, Ressources), un bouton « Diagnostic 30 min ». Plus aucun numéro de téléphone dans la nav. Modèle : règles « navigation » de **ui-ux-pro-max** (UI Skills n'a pas de modèle de barre : `list_skills` « nav » et « header » ne renvoient que des illustrations et de l'accessibilité). Sous 1 120 px : bouton menu rond (`aria-expanded`, `aria-controls`, libellé qui passe à « Fermer le menu »), panneau plein écran sous la barre, liens de 60 px, bouton « Réserver le diagnostic ». Échap ferme et rend le focus au bouton, un lien ferme et défile, le défilement est suspendu (Lenis arrêté). Lien actif signalé par un filet jaune (`aria-current`, IntersectionObserver). |
| « Un diagnostic de 30 min, par téléphone. » en deux colonnes | À partir de 1 024 px : à gauche titre, réassurance (« Un appel gratuit, sans engagement… »), « Pendant les 30 minutes » en 3 lignes numérotées, Julien ; à droite le formulaire (3 champs, même validation). Empilé en dessous. Numéros retirés (bloc et pied de page). |
| Structure complète | 7 → **13 sections** : scène (hero + objet), **preuves** (4 chiffres), cas 54 300 €, calculateur, **comment ça marche** (4 étapes en photo : pose, envoi, lecture, intervention), gros plans, **clients** (témoignage de Sébastien + 3 sites), **intégrations** (schéma capteur → passerelle → analyste → SMS / GMAO, 4 compatibilités), offre, **équipe** (Grenoble, Julien, les techniciens, 9 personnes en chiffres), **ressources** (3 cartes datées), questions, diagnostic. **Pied de page complet** : marque, Produit, Vigie, Contact (adresse, horaires, lien diagnostic), © et mentions légales (restées sur leur page). |
| Ressources pour un CMS | `ul[data-cms-collection="ressources"]`, une carte = `article` : image, catégorie, `<time datetime>`, titre en lien (toute la carte cliquable), temps de lecture. `data-cms-href` porte l'adresse future de l'article ; en attendant, le lien reste sur la section (pas de 404). |
| Typographie | Titres en chasse 100 % (96 % avant) et interlettrage −0,012 à −0,015 em (−0,04 à −0,055 avant) : plus aucune lettre collée, vérifié à l'œil à 1440 et 375. Prix, heure du téléphone et chiffres alignés sur la même règle. |
| Images | **0 $ dépensé.** Tout vient de `images/` : `pose`, `passerelle`, `alerte`, `intervention` (étapes), `sebastien`, `usinage`, `agro`, `presse` (clients), `grenoble`, `julien`, `intervention` (équipe), `palier`, `cas-atelier`, `plasturgie` (articles), le gros plan de la scène (schéma). Les portraits d'une technicienne et de la fondatrice ont été envisagés puis écartés : le MCP OpenRouter renvoie l'image dans la conversation sans fichier, et aucune clé n'est disponible pour le script `openrouter-image.sh`. |

Retours du contrôle de design (coordinateur) :
- **Interligne** : tout texte courant passé entre 1,45 et 1,55 (preuves, étapes, sites, personnes, liste du diagnostic, chapeau, sous-phrases, pied, SMS) ; citation 1,3 ; titres de section 1,08 ; titres d'articles 1,3. Le contrôle automatique ne signale plus que le bouton « Demander un diagnostic » (faux positif : une ligne, mais 52 px de haut pour une hauteur de ligne de 1,1).
- **Cartes dans des cartes** : la seule imbrication restante est la notification dans l'écran du téléphone (`.telephone > .notif`). Faux positif : c'est la maquette d'un écran verrouillé, la bulle du SMS doit être dessinée sur l'écran. Le bloc Julien n'est plus dans une carte ; le formulaire est la seule carte de la section.

### Titres : pistes et choix (skills `copywriting` et `ogilvy`)

Règle appliquée : promesse concrète, chiffre ou fait visible, mots de l'atelier ; on garde la plus concrète.

| Titre | Pistes | Retenu |
|---|---|---|
| Hero (h1) | 1. La panne, trois semaines avant. (avant) · 2. Votre machine vous prévient trois semaines avant de casser. · 3. **Un SMS trois semaines avant la casse.** · 4. Sachez quelle machine va casser, et quand. · 5. La casse de mardi prochain, lisez-la aujourd'hui. · 6. Plus jamais trois jours d'arrêt pour un roulement. | 3 : l'objet reçu (SMS), le délai, l'événement. Le chapeau dit désormais pour qui et « posés sans arrêter la production ». |
| Moment 5 de la scène | 1. Il prévient trois semaines avant. (avant, redit le h1) · 2. Le SMS part avant la casse. · 3. **7 h 42. La broche tourne encore.** · 4. Julien appelle à 8 h. · 5. Vous lisez, la machine tourne. | 3 : l'heure du SMS affiché et la conséquence. |
| Cas | 1. **Une broche qui casse sans prévenir coûte 54 300 €.** · 2. Une broche cassée : 54 300 €. · 3. Trois jours d'arrêt subis : 54 300 €. · 4. Ce que coûte une broche qui casse un mardi. · 5. 54 300 € : le prix moyen d'une casse. | 1, gardé. |
| Comment ça marche | 1. Comment ça marche. · 2. De la pose au coup de fil, en quatre temps. · 3. Posé lundi, il écoute mardi. · 4. Dix minutes de pose, puis Julien veille. · 5. **Du capteur aimanté au roulement changé.** | 5 : le début et la fin du trajet, en objets. |
| Clients | 1. Ils ont vu venir la panne. · 2. 62 usines l'écoutent déjà. · 3. **Un roulement à 84 €, pas trois jours d'arrêt.** · 4. Ce que nos clients ont évité en 2025. · 5. Plasturgie, usinage, agroalimentaire : même écoute. | 3 : le chiffre du bon de travail et l'arrêt évité. |
| Intégrations | 1. **Branché sur votre GMAO, pas sur votre réseau.** · 2. Rien à installer chez votre informaticien. · 3. Compatible avec ce que vous avez déjà. · 4. L'alerte arrive en bon de travail dans votre GMAO. · 5. Sa propre 4G. Votre GMAO. Aucune porte ouverte. | 1 : répond aux deux objections (GMAO, réseau). |
| Offre | 1. Commencez par trois machines. (avant) · 2. Trois machines, 90 jours, 1 490 €. · 3. **Commencez par les trois machines qui vous coûtent le plus.** · 4. Remboursé si aucune alerte utile. · 5. Le pilote : remboursé s'il ne sert à rien. | 3 : dit lesquelles choisir. |
| Équipe | 1. Un analyste lit chaque alerte avant vous. · 2. **Derrière chaque SMS, quelqu'un a lu la courbe.** · 3. Neuf personnes à Grenoble. · 4. Des techniciens, pas un algorithme seul. · 5. Julien relit la courbe avant de vous écrire. | 2 (5 aurait doublé le nom de Julien avec le diagnostic). |
| Ressources | 1. Ressources. · 2. Le carnet de l'atelier. · 3. Trois lectures pour votre prochain arrêt. · 4. Notes de terrain, une par mois. · 5. **Ce qu'on apprend en écoutant 600 machines.** | 5 : un chiffre, une source. |
| Questions | 1. **Questions d'atelier.** (avant) · 2. Ce qu'on nous demande au premier appel. · 3. Trois questions avant de signer. · 4. Réseau, vieilles machines, fausses alertes. · 5. Ce qui inquiète un responsable maintenance. | 1, gardé (relevé comme « notre voix » par le persona). |
| Diagnostic | 1. Un diagnostic de 30 min, par téléphone. (avant) · 2. 30 minutes pour savoir ce que vous coûte un arrêt. · 3. **Julien chiffre votre prochain arrêt en 30 minutes.** · 4. Un appel de 30 min, un chiffre par machine. · 5. Réservez 30 minutes avec un analyste. | 3 : une personne, un résultat, une durée. |

### Fichiers

- `index.html` : en-tête, h1, chapeau, moment 5, 6 sections nouvelles, diagnostic, pied ; script en bas de page : menu téléphone et lien actif ajoutés. `scene.js` et `gestes.js` **non modifiés** (le correctif « liens de la scène cliquables seulement quand ils sont visibles » reste en place et a été revérifié).
- `css/vigie.src.css` : typographie, barre et menu, sections ajoutées, interlignes. `css/vigie.css` recompilé (Tailwind 4.3.3, même méthode). Piège noté : le flou de l'en-tête (`backdrop-filter`) fait de l'en-tête le bloc conteneur de ses descendants `position: fixed` ; le panneau du menu est donc en `position: absolute; top: 100%; height: calc(100dvh - 4rem)`.
- FAQ, fausses alertes : « En 2025, 41 sur 412. » (371 / 412 est passé dans la bande de preuves).
- Ajouts fictifs, à remplacer : 62 usines, 600 machines, 9 personnes (3 analystes, 4 techniciens, 2 ingénieurs), les trois sites, la citation de Sébastien M., les trois articles et leurs dates, les horaires.

### Comptage et contrôles (Playwright + Chrome, script de `conventions.md` § 11)

| Taille | Mode | Mots | Sections | Écrans | Débordement | Titres coupés | Console |
|---|---|---|---|---|---|---|---|
| 1440 × 900 | animé | **715** | 13 | 17,4 | 0 | 0 | 0 erreur |
| 1440 × 900 | réduit | **715** | 13 | 16,3 | 0 | 0 | 0 |
| 1280 × 720 | animé | 715 | 13 | 19,2 | 0 | 0 | 0 |
| 768 × 1024 | animé | 708 | 13 | 15,9 | 0 | 0 | 0 |
| 375 × 812 | animé | 708 | 13 | 20,3 | 0 | 0 | 0 |
| 375 × 812 | réduit | 708 | 13 | 18,5 | 0 | 0 | 0 |
| 360 × 740 | animé | 708 | 13 | 21,4 | 0 | 0 | 0 |

- Détail (1440) : évitement 3, en-tête 11, scène 128, preuves 27, cas 49, calcul 26, comment ça marche 56, gros plans 20, clients 57, intégrations 44, offre 44, équipe 44, ressources 54, questions 52, diagnostic 56, pied 44. Aucun bloc au-dessus de 60 mots.
- « Titre coupé » : pour chaque h1, h2, h3, prix, chiffre de preuve et citation, aucun mot réparti sur deux lignes et aucun débordement de la boîte.
- Hauteur : la page passe de 11 à 12 écrans à 16 à 21 ; c'est le prix des 6 sections demandées (l'ancien plafond d'environ 10 écrans n'est plus la règle).
- **Clavier** (1440 animé et réduit, 375) : 32 tabulations à 1440 (28 sur téléphone, le menu fermé) dans l'ordre visuel, toutes visibles, à opacité 1, jamais sous l'en-tête, avec anneau. Les liens d'articles mesurent 22 à 26 px de texte mais la carte entière est la cible (lien étiré).
- **Menu téléphone** (375, 360, 768, et en réduit) : ouverture `aria-expanded="true"`, focus sur le premier lien ; Échap ferme et rend le focus au bouton ; « Clients » ferme le panneau et pose le titre à 72-73 px du haut, sous la barre.
- **Scène épinglée** : `.lien-prix` en `pointer-events: auto` à 0 px, `none` à 600, 2 000 et 3 500 px (1440 et 375). Correctif du tour 3 intact.

### Captures (`captures/`, refaites)

Les 15 anciennes sont remplacées. Premier écran à chaque taille : `01-premier-ecran-1440`, `02-…-1280x720`, `03-…-768x1024`, `04-…-375x812`, `05-…-360x740`, `06-…-1440-reduit`. Puis à 1440 : `10-preuves`, `11-cas`, `12-methode`, `13-clients`, `14-integrations`, `15-offre`, `16-equipe`, `17-ressources`, `18-questions`, `19-diagnostic`, `20-pied`. À 768 : `21-integrations-768`, `22-pied-768`. Au téléphone (375) : `30-menu`, `31-methode`, `32-clients`, `33-integrations`, `34-equipe`, `35-ressources`, `36-diagnostic`, `37-pied`.

### Ce qui reste à faire

- Vraies photos (Julien, techniciens, Sébastien et son accord écrit, sites clients) et vrais articles branchés sur le CMS.
- Liste des GMAO réellement compatibles, à valider avec Claire avant de citer des marques.
- Portraits de l'équipe au complet si la cliente les fournit (la carte « 9 personnes » tient la place).

## § Refonte 2 — corrections gratuites après le tour persona (86/100, « Oui »)

Plan : `test-lancetonsite/landings/vigie/refonte2-iteration-1/fix-plan.md`, FIX-1 à FIX-12 (les FIX-13 à 16 attendent la cliente). **0 $ dépensé** : aucune génération. Scripts et captures : `test-lancetonsite/landings/vigie/refonte2-fix/` (`verif.js`, `console.js`, `fonctions.js`, `build-css.sh`, `captures/`).

| FIX | Fait |
|---|---|
| 1 · logo à la fin de la scène | `CLES.bureau` : élévation 13° jusqu'à 0,84, puis 30° à 0,92 et 1 ; le capot se redresse pendant l'arrivée du SMS, « VIGIE » se lit sur la dernière image (1440 et 1280). Téléphone : la dernière vue de l'objet (moment 4, avant que le SMS le remplace) passe de 14° à 28°. Mouvement réduit : `planche-1` montre déjà « VIGIE » (le moment 5 n'a que le téléphone). |
| 2 · longueur d'épinglage | `end: +=200%` sur ordinateur, `+=150%` sur téléphone (520 / 470 % avant). Mesuré : 1 800 px = 2,0 écrans à 1440 × 900, 1 440 px à 1280 × 720, 2 048 px à 768 × 1024 ; 1 218 px = 1,5 écran à 375 × 812, 1 110 px à 360 × 740. Les fractions des moments et de l'objet ne changent pas : tout se compresse d'un bloc. |
| 3 · photos en double | `hero-2752.webp` (inutilisée) recadrée en deux images sans rien en commun : `broche-640/1200.webp` (capteur sur la tête de broche, article « Roulement ou broche ») et `technicien-640/900.webp` (un technicien au pupitre, carte « Quatre techniciens de pose »). `intervention` ne sert plus qu'à l'étape 04, `palier` n'est plus utilisée (l'offre garde `ecoute`). Recadrage fait avec Pillow, local. |
| 4 · pied de page | Contact : `contact@vigie.fr` (fictif). Colonne marque : « Une note de terrain par mois », champ e-mail + « Recevoir » (rien n'est envoyé, validation et confirmation). Bas : LinkedIn (adresse fictive), Confidentialité (`mentions-legales.html#donnees`), Mentions légales. Toujours aucun numéro. |
| 5 · usage des données | Sous « Être rappelé » : « Votre numéro sert seulement à ce rappel. Confidentialité ». `mentions-legales.html` : `id="donnees"` et une phrase pour l'e-mail de la note mensuelle. |
| 6 · calculateur à 768 | 768 à 1 279 px : titre, puis 3 curseurs côte à côte, puis résultat et coût (curseurs 208 px à 768, libellés sur 1 ligne). Une seule ligne à partir de 1 280 px (247 px à 1280, 267 px à 1440). |
| 7 · formulaire sur téléphone | Sous 1 024 px, `.diagnostic-texte` en `display: contents` et `order` : titre, réassurance, formulaire, puis « Pendant les 30 minutes » et Julien. Deux colonnes inchangées à partir de 1 024 px. |
| 8 · « Agroalimentaire » à 360 | Césure douce (`Agro&shy;alimentaire`) : coupe « Agro- / alimentaire » seulement quand la colonne est trop étroite. 0 débordement à 360. |
| 9 · coût de Vigie | Sous l'économie : « Vigie : 4 680 € HT par an », calculé depuis `data-prix-mois="390"` de l'offre (une seule source pour le prix). |
| 10 · transitions vides | Moment 2 sort à 0,395-0,425, le 3 entre à 0,42-0,45 ; le 4 sort à 0,845-0,875, le 5 entre à 0,87-0,9 ; le téléphone entre à 0,845-0,885 (sur téléphone, la 3D s'efface au même rythme). Plus aucun instant sans texte, ni capteur seul avec la droite vide. |
| 11 · textes et images | Alt de Julien : « dans l'atelier » (la tablette est hors du cadrage 4:3). Légende de Grenoble : « le quai de l'atelier ». Alt de l'usinage : « Foret en perçage dans un bloc d'acier, copeaux et lubrifiant. » |
| 12 · pages dédiées | « Toutes les ressources → » et « Toutes les questions → », `data-cms-href="/ressources"` et `"/questions"` (le lien reste sur la section en attendant le CMS). |

Contrôles (Playwright + Chrome) :
- **Densité** (script de `conventions.md` § 11, 1440 × 900) : **744 mots, 13 sections**, 14,4 écrans (17,4 avant : l'épinglage est plus court).
- 1440, 1280, 768, 375, 360 : `scrollWidth == clientWidth`, 0 titre qui déborde ou coupé au milieu d'un mot, 0 image cassée, 0 numéro de téléphone, nav à 5 liens + « Diagnostic 30 min ».
- Console : 0 erreur, 0 avertissement, 0 requête en échec, en animé (1440, 1280, 375, 360) et en réduit (1440), sur un serveur dédié (port 4340). Le serveur partagé du port 4322 coupe des connexions sous charge (`ERR_CONNECTION_RESET` sur deux gros plans, rechargés ensuite) : ce n'est pas la page.
- CSS recompilée (Tailwind 4.3.3) ; l'ordre `-webkit-backdrop-filter` puis `backdrop-filter` est conservé. Les liens de la scène gardent `pointer-events` coupé quand leur moment est effacé (code inchangé).
- Images réutilisées volontairement : le portrait de Julien (équipe, schéma, diagnostic : c'est la même personne) et la passerelle en pastille dans le schéma des intégrations.

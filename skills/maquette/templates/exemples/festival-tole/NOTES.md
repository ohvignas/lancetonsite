# Tôle — exemple « typographique brutaliste » (festival de musiques actuelles)

Festival fictif de trois nuits à Saint-Étienne, dans les halles d'une ancienne manufacture d'armes. Page d'accueil complète : `index.html` + `gestes.js` (copie figée du kit) + 25 images libres traitées en trichromie + une vidéo de hero provisoire.

Exemple fictif — Lance ton site. Tôle, l'association, les artistes, les horaires, les jauges, les avis, les articles, le tram de nuit et les prix sont inventés. Le lieu évoque l'ancienne manufacture d'armes de Saint-Étienne, sans lien avec un festival réel. Rien n'est vendu : panier, paiement, extraits et inscription affichent un message.

**Refonte du 4 novembre 2026** (retours de l'utilisateur, `test-lancetonsite/retours-utilisateur-2026-11-04.md`) : « un hero avec des visuels ou une vidéo, c'est un festival, il faut donner envie ; il n'y a qu'une seule photo sur tout le site, il en faut partout ». La page passe de 7 à 11 sections et de 296 à environ 740 mots ; le hero porte une vidéo des halles ; chaque section a ses photos.

Composition suivie : **typographique brutaliste** (`commun/compositions.md` § 4), élargie par la page complète de `conventions.md` § 11. La phrase de cinq mots sur toute la largeur, la grille de quatre colonnes visible par ses filets, les repères qui sont des données et le manifeste lu au défilement restent ; les photos s'alignent sur les filets, comme les textes.

## Structure du dossier

```
index.html          la page : 12 sections (11 avant le tour 1 de la refonte) (GSAP 3.15 + ScrollTrigger + SplitText, Lenis 1.3.27) ; données dans l'objet TOLE
tole.src.css        source Tailwind v4 (@theme + @layer components) → tole.css compilé, minifié
gestes.js           copie figée de templates/prototype/gestes.js (non modifiée)
images/             25 webp en trichromie (voir § 5)
video/hero.mp4      vidéo du hero, provisoire (montage de 4 photos), 1280 × 720, 13,8 s, 0,96 Mo
medias-a-generer.md les 5 médias à générer (vidéo du hero en priorité 1), prompts en anglais
captures/           1440, 1280, 768, 375, 360 ; défilement 1440 et 375 ; mouvement réduit page entière
brief.md            cible, commanditaire, objections, contraintes (lu par le client-persona)
```

## 1. Direction artistique

- **L'affiche d'usine, pas le festival de prairie.** Encre presque noire, papier gris, et une seule couleur : le **minium**, la peinture antirouille orange qu'on passe sur la tôle. Pas de dégradé, pas de vignette ronde d'artiste.
- **Palette** : encre `#0E0E0C`, papier `#E8E6E1`, minium `#EC4C26`, gris sur papier `#4A4843`, gris sur encre `#A9A59C`. Contrastes : papier sur encre 15,5:1 ; encre sur minium 5,2:1 ; gris sur papier 7,3:1 ; gris sur encre 7,9:1.
- **Photos : trichromie** encre (ombres) → minium (tons moyens) → papier (lumières), grain fixe. La première version passait tout en bichromie encre-minium : forte, mais les visages et les halles se lisaient mal. La trichromie garde l'affiche et rend la photo lisible ; toutes les images, anciennes et nouvelles, sont repassées du même geste (série cohérente).
- **Typographie** : Archivo variable, noir 900, étroite (62 à 72 %) pour les titres et les noms, large (125 %) pour le logo et le grand mot du pied ; IBM Plex Mono pour les repères, heures, halles, légendes. **Interlettrage positif partout** (+0,01 em sur les titres étroits : avant, −0,015 em).
- **La grille** : quatre colonnes dès 768 px. Les filets du hero descendent sur la vidéo jusqu'au titre ; les trois soirs, les trois avis, les trois articles, les pass et les quatre chiffres tiennent dans les mêmes filets.
- **Ce qui est évité** (fiche § 4) : pas d'ombre décalée, pas de bouton jaune, rien de tourné ; boutons rectangles pleins minium.

## 2. Titres et promesse (skills `copywriting` et `ogilvy`)

Positionnement (Ogilvy) : pour ceux qui veulent trois nuits de concerts sans la boue, le camping et le pass à 150 € des festivals de prairie. Promesse unique : **des concerts sous un toit, pas cher, et on rentre**. Le titre garde la marque et la promesse (Ogilvy : nom + promesse dans le titre) ; le chapo porte les faits (prix, horaire du dernier tram).

| | Piste de titre | Commentaire |
|---|---|---|
| A | Festival de musiques actuelles à Saint-Étienne. | La catégorie : tout festival la signe. |
| **B — retenue** | **Trois nuits sous la tôle.** | Cinq mots : la durée, le toit (réponse à la pluie avant la question), le nom. Tient sur une ligne à 1 440 et à 1 280. |
| C | Trois nuits de concerts sous un toit, pour 79 €. | La promesse la plus complète (Ogilvy, 9 mots) ; trop long pour la phrase-affiche du brutaliste, il passe dans le chapo. |
| D | 41 concerts. Un toit. Le tram jusqu'à 4 h 30. | Trois preuves sèches ; repris par les repères du hero. |
| E | Ici, la pluie tombe sur la tôle, pas sur vous. | Joli, mais une négation et une image à décoder (Ogilvy : pas de négatif dans un titre). |

Chapo retenu : « 41 concerts de rock, de rap et d'électro dans les halles couvertes d'une ancienne usine d'armes. 79 € les trois nuits, tram jusqu'à 4 h 30. » Bouton (copywriting : verbe + ce qu'on obtient) : « Prendre mon pass — 79 € ».

Titres de section (4 à 10 mots, un fait chacun) : « Trois soirs, trois halles, douze concerts annoncés » ; « Six têtes d'affiche à écouter avant juillet » ; « Une usine couverte, pas un champ boueux » (gardé : il répond à l'objection pluie) ; « 11 800 festivaliers en 2026, la pluie dehors » ; « Trois pass, sans frais de dossier » ; « Venir, rentrer, circuler en fauteuil » ; « Les nouvelles de Tôle, d'ici juillet » ; « Le 2 juillet, on rallume. »

## 3. Sections et gestes

Nav : modèle `mengto/documentary-brutalist-agency` (MCP ui-skills) : identité compacte, cinq liens (Programme, Artistes, Le lieu, Venir, Journal), un bouton « Pass 3 nuits — 79 € », un bouton « Menu » sur téléphone et tablette (liste dépliée sous la barre, non modale, `aria-expanded`, Échap et clic sur un lien la referment). Aucun numéro de téléphone.

| # | Section | Contenu | Gestes |
|---|---|---|---|
| 1 | `#hero` (encre) | **Vidéo des halles en fond** (foule, scène, charpente), voile encre à 52 % ; quatre repères (dates, lieu, pass 79 €, dernier tram 4 h 30) dont les filets descendent jusqu'au titre ; décompte J−n ; titre sur toute la largeur ; chapo ; bouton pass, lien programme, bouton « Pause vidéo » | `data-intro` ; `video autoplay muted loop playsinline` avec `poster` ; en mouvement réduit, la source n'est même pas chargée (`<source media>`) et l'affiche fixe reste |
| 2 | `#manifeste` (papier) | Le manifeste en très grand ; photo de la halle B vide, légende | **signature** : `data-split="words"` + `data-split-scrub` ; `data-image-reveal` |
| 3 | `#programme` (papier) | Trois soirs en trois colonnes : photo d'ambiance, jour et genre, quatre concerts (heure, nom, halle) ; « suite de l'affiche le 15 avril » ; bande des noms déjà annoncés | `data-reveal-group` ; `data-marquee="45"` + pause |
| 4 | `#artistes` (encre) | Six fiches : photo 4:5, soir et halle, nom, genre, « Écouter un extrait » | **galerie horizontale épinglée** `data-hscroll` dès 768 px ; glisser natif + aimantation sous 768 ; grille de 3 colonnes en mouvement réduit |
| 5 | `#lieu` (aplat minium) | « Une usine couverte, pas un champ boueux » ; 41 / 3 / 4 200 / 12 000 ; les trois halles en photo avec jauge et genre | `data-counter` × 4 ; `data-image-reveal` × 3 |
| 6 | `#public` (encre) | Preuve : 11 800 festivaliers en 2026 ; mosaïque de quatre photos de foule ; trois avis nommés | `data-reveal-group` |
| 7 | `#pass` (papier) | **Deux colonnes** : titre et trois garanties à gauche ; trois pass (choix du soir pour la nuit et le réduit), « Ajouter au panier », panier avec retrait, total, « Payer » à droite | pass tirés de `TOLE.pass` (une seule source : hero, en-tête, bouton collant, appel final ; « la troisième nuit revient à 15 € » est calculée) |
| 8 | `#pratique` (encre) | Photo du tram de nuit ; accès, retour de nuit, accessibilité, pluie | `data-image-reveal` |
| 9 | `#journal` (papier) | Trois cartes datées (photo, date, rubrique, titre, une phrase) | cartes tirées de `TOLE.journal` par `<template>` : prêtes pour un CMS |
| 10 | `#faq` (papier) | Quatre questions (pass, revente, réduit, âge) | `details[data-accordion]` |
| 11 | `#final` (aplat minium) | **Deux colonnes** : « Le 2 juillet, on rallume. », garanties et bouton pass à gauche ; alerte « la suite de l'affiche le 15 avril » (e-mail) à droite | message `role="status"`, erreur `aria-invalid` |

Hors `main` : pied de page complet (grand mot « Tôle » en minium, plan du site en deux listes, contact e-mail, réseaux, mentions, CGV, confidentialité, crédits) ; bouton collant mobile « Pass 3 nuits — 79 € ».

**Données** : un seul objet `TOLE` (`pass`, `artistes`, `journal`, date d'ouverture) et trois `<template>` (`t-pass`, `t-artiste`, `t-article`). Brancher un CMS revient à remplir cet objet. Le programme par soir reste en HTML : c'est le contenu qui doit se lire sans JavaScript.

**Retiré** : l'image qui suivait le pointeur sur le programme (`data-follow-list`). Les fiches d'artistes montrent maintenant les photos en grand ; une seconde apparition des mêmes photos au survol faisait doublon, et le contournement du préchargement (§ 9) disparaît avec.

## 4. Densité (`conventions.md` § 11)

Mesuré avec le script de § 11 (`dens-fn.js`), le 4 novembre 2026 :

| Mode | Mots | Sections | Écrans |
|---|---|---|---|
| 1440, mouvement normal | 749 | 11 | 13 |
| 1440, mouvement réduit | 747 | 11 | 13,7 |
| 375, mouvement normal | 738 | 11 | 16 |
| 375, mouvement réduit | 736 | 11 | 16,4 |

Détail à 1440 : en-tête 11, hero 57, manifeste 47, programme 84, artistes 102, lieu 45, public 48, pass 87, pratique 70, journal 63, FAQ 69, final 32, pied 31. Aucun bloc ne dépasse trois phrases ; les images occupent plus de surface que le texte dans chaque section sauf la FAQ et le pass.

Avant la refonte : 296 mots, 7 sections, 1 photo. Après : 749 mots, 11 sections, 25 photos et une vidéo.

## 5. Médias et crédits

Toutes les photos : Unsplash (licence Unsplash), provisoires, traitées d'un même geste avec ffmpeg : niveaux de gris, `eq=contrast=1.3`, courbe en S, puis `lutrgb` en trois tons (encre ≤ 140 → minium → papier), `noise=alls=12`, recadrage au ratio du gabarit, `cwebp -q 74`. Commande :

```
TRI="lutrgb=r='if(lt(val,140),14+val*222/140,236-(val-140)*4/115)':g='if(lt(val,140),14+val*62/140,76+(val-140)*154/115)':b='if(lt(val,140),12+val*26/140,38+(val-140)*187/115)'"
ffmpeg -i source.jpg -vf "scale=w=W:h=H:force_original_aspect_ratio=increase,crop=W:H,format=gray,eq=contrast=1.3:brightness=0.02,curves=all='0/0 0.3/0.22 0.7/0.8 1/1',format=rgb24,$TRI,noise=alls=12" sortie.png
```

| Fichier(s) | Photo Unsplash | Auteur |
|---|---|---|
| hero-affiche, hero-affiche-900 | **généré** — première image de la vidéo du hero | — |
| halle-vide | **généré** FLUX.2 Pro (OpenRouter, 0,06 $) — halle vide, rails, verrières | — |
| halle-scene, halle-scene-900 | **généré** FLUX.2 Pro (0,06 $) — scène centrée, charpente, murs de brique | — |
| halle-charpente (fiche Furnace Club depuis le tour 2) | `yWF2LLan-_o` — groupe sous un cadre lumineux | Yannis Papanastasopoulos |
| halle-toit | **généré** FLUX.2 Pro (0,06 $) — charpente rivetée, faisceaux rouges | — |
| journal-1 | `thm-jF3JR3w` — charpente ronde, foule | Jodie Walton |
| soir-ven | `So6YckShOVA` — guitariste, bras levés | Tijs van Leur |
| soir-sam | `NcdG9mK3PBY` — mains levées, rampe de projecteurs | Nainoa Shizuru |
| soir-dim | `SPuLUQDZp3k` — lasers sur la foule | Dominic Hampton |
| public-1 | **généré** FLUX.2 Pro (0,06 $) — foule, téléphones, pluie aux fenêtres | — |
| public-2 | **généré** FLUX.2 Pro (OpenRouter, 4 novembre 2026, FIX-16) — verrière sous la pluie, foule au sec ; un premier essai (pluie qui tombait dans la halle) a été écarté | — |
| public-3 | **généré** FLUX.2 Pro (OpenRouter, 4 novembre 2026, FIX-16) — bénévoles qui scannent les bracelets à l'entrée | — |
| public-4 (non utilisée, en réserve) | `U7HLzMO4SIY` — faisceaux sur la foule | Rachel Coyne |
| foule | `Bq5adYHDvek` — main levée dans la foule | By Topo |
| journal-2 (non utilisée : source de halle-b) ; halle-b (recadrage 4:5, halle B depuis le tour 2) | `naFHFLV5cqU` — groupe sous les projecteurs | Spencer Davis |
| journal-3 | `wnX-fXzB6Cw` — charpente ronde au-dessus d'une foule | Aaron Paul |
| tram ; journal-tram (recadrage 3:2, article du tram depuis le tour 2) | `023T4jyCRqA` — tram à l'arrêt, la nuit (Toronto) | Filip Mroz |
| prog-1 … prog-6 (artistes) | `Haxc9crpRiw`, `SLUeuL-mrRg`, `Pyn-Ao3tCjs`, `YHBGOHOwhAM`, `C3wLDSEivYM`, `iQFFN1FRmgY` | Pierre Goiffon, Austin Neill, Emmanuel Black, Casa Bele, iam_os, Pierre Goiffon |

**Vidéo du hero** (`video/hero.mp4`, 4 nov. 2026) : générée avec `bytedance/seedance-2.0-mini` via OpenRouter (texte vers vidéo, 5 s, 720p, sans son, **0,38 $**), prompt P1 de `medias-a-generer.md`. Ralentie ×1,5, boucle par fondu de 1,2 s de la fin sur le début (dernière image = première), trichromie de la page, grain animé (`noise=alls=10:allf=t`). 1280 × 720, H.264 `crf 27`, `+faststart`, 6,4 s, 1,2 Mo. `hero-affiche` (1920 × 1080) et `hero-affiche-900` (900 × 1200, recadrage centre) = première image de la boucle. L'ancien montage de photos est remplacé ; la photo de Joseph Pearson n'est plus utilisée.

**Images générées** (même jour, `black-forest-labs/flux.2-pro`, 0,06 $ chacune) : halle-vide, halle-scene (+900), halle-toit, public-1, avec les prompts P2 à P5, puis la trichromie ci-dessus.

**À générer** : `medias-a-generer.md` (5 médias : la vidéo du hero, puis la halle vide, la foule dans la halle, la halle A avec sa scène, la charpente sous la pluie). Chaque fichier garde le nom et le ratio de l'actuel.

## 6. Vérification (Playwright, Chrome)

Script Playwright (Chrome) sur `http://127.0.0.1/festival-tole/`, à 1440, 1280, 768, 375 et 360, en mouvement normal puis réduit (10 passages) :

- débordement horizontal : 0 partout ;
- console et requêtes échouées : vides partout (en mouvement réduit, la vidéo n'est plus demandée grâce à `<source media>`) ;
- titres : interlettrage ≥ 0, aucun titre qui déborde de son bloc (la piste horizontale des artistes est exclue du contrôle : elle déborde par construction) ;
- texte sous 12 px : aucun ; images cassées : aucune ;
- état final des révélations d'images vérifié à part (`clip-path: inset(0%)`, légendes alignées) : les captures de défilement peuvent tomber au milieu d'une animation.

Testé à la main dans le script : menu téléphone (ouverture, Échap, retour du focus, clic sur un lien), panier (ajout, total, retrait, « Payer » désactivé quand vide), alerte e-mail (erreur `aria-invalid`, message), bouton « Pause vidéo » (`aria-pressed`, reste en pause quand la vidéo revient à l'écran).

Captures (`captures/`) : premier écran à 1440, 1280, 768, 375, 360 ; défilement à 1440 (7) et à 375 (6) ; pages entières à 768, 375, 360 ; pages entières en mouvement réduit à 1440, 1280, 375.

## 7. Ce qui reste faible

- **Les photos ne sont pas prises dans une usine d'armes** : salles de concert, entrepôt, tram de Toronto. La trichromie les unifie, mais un œil attentif voit des lieux différents. Les médias générés (priorités 2 à 5) règlent le lieu.
- **La vidéo provisoire est un diaporama animé** : le fondu entre deux photos passe par un gris laiteux, et rien ne bouge dans l'image. La vidéo générée (priorité 1) est le vrai gain du hero.
- Les noms d'artistes sont inventés : un festivalier veut des noms qu'il connaît. Les extraits ne jouent rien.
- La galerie des artistes, épinglée, ajoute un écran de défilement horizontal ; sur une tablette en portrait (768 px), elle s'épingle aussi.
- Le décompte repose sur l'horloge du visiteur.

## 8. Boucle persona

À venir (la session principale lance les tours).

## 9. Retours sur le plugin (kit `gestes.js`)

- `video[autoplay]` : le kit met bien la vidéo en pause en mouvement réduit, mais le navigateur a déjà commencé à la charger. Ici, `<source media="(prefers-reduced-motion: no-preference)">` : rien n'est chargé. Le kit ne fournit pas de bouton pause pour une vidéo de fond (exigé au-delà de 5 s, WCAG 2.2.2) : bouton écrit dans la page, et le kit relance la vidéo quand elle revient à l'écran, ce qui annule la pause (contourné : la page la remet en pause sur `play`). Le kit pourrait lire `data-video-pause` et respecter un état « arrêté par l'utilisateur ».
- `data-hscroll` en mouvement réduit : rien n'est épinglé (correct), mais la piste garde `width: max-content` et déborde. Ici, la page la passe en grille de trois colonnes sous `.motion-reduit`. GESTES.md pourrait le dire.
- `data-header` : la barre se cache en descendant, y compris quand le menu mobile est ouvert. Ici, `.is-cache:not(.menu-ouvert)`.
- Retours de la première version, toujours valables : `data-follow-list` (arrondi et rotation en dur, image centrée sur le pointeur), préchargement en rafale qui sature `http.server`, `data-marquee` en mouvement réduit (piste en `max-content`), `data-bg` sans en-tête pris en charge.

## Tour 1 de la refonte (persona 66/100) : corrections

Plan : `boucle-persona/refonte-tour-1.md`, partie 3. FIX-1 à FIX-11 appliqués le 4 novembre 2026, sans aucune génération payante : les deux nouvelles images sont des recadrages d'images déjà étalonnées (ffmpeg + `cwebp -q 74`, même trichromie). `gestes.js` n'est pas modifié.

| FIX | Fait | Comment |
|---|---|---|
| FIX-1 interligne des titres | oui | `h1, h2, h3` à 1,12 (hero et final à 1,05 : une seule capitale accentuée par ligne) ; `sup` à 0,75 em sans interligne. Écart mesuré entre lignes (encre réelle, `measureText`) positif partout, au plus juste 1,4 px à 768 ; captures zoomées propres pour TÔLE, ANNONCÉS, ÉCOUTER, ÉLECTRO, BÉNÉVOLES, RALLUME |
| FIX-2 pluie dans la halle | oui | `public-1` retirée. Nouvelle `images/public-5.webp` : recadrage de `public-4` (`crop=672:448:300:352`, mise à 1200 × 800, grain `alls=8`), qui écarte aussi les paroles affichées sur l'écran de `public-4`. Retouches essayées et rejetées : médiane sur la pluie (briques bavées), `delogo` ou flou sur les paroles (rectangles visibles) |
| FIX-3 retour du panier | oui | Barre `.flash` fixée en bas (« Pass trois nuits ajouté · Panier 79 € », lien « Voir le panier ↓ »), visible 6 s, gardée tant qu'elle a le focus ou le survol ; le bouton dit « Ajouté ✓ » 1,8 s ; le message lu par les lecteurs d'écran reste dans le toast, masqué à l'œil. Mesuré : barre à 710–800 px sur 812 (375) et 786–876 sur 900 (1440) ; « Voir le panier » amène le titre du panier à 72 px |
| FIX-4 manifeste | oui | 3 phrases (« Le toit tient, les murs aussi. ») |
| FIX-5 contradictions | oui | Tram toutes les 15 min jusqu'à 4 h 30 partout (pratique, journal) ; « Brise-Glace mène le vendredi » ; Les Frigos retirés de la bande ; Dalle Brute en halle B, Ondes Courtes en halle A (programme et fiche) ; genres de Brise-Glace et des Rivets réécrits ; halle A « la grande scène des trois soirs » |
| FIX-6 billetterie sans image | oui | `figure.billetterie-photo` sous les garanties (`public-3`, 3:2, 4:3 dès 1024) ; colonne gauche et droite à hauteur proche, plus de `sticky` |
| FIX-7 photos à contresens | oui | Brise-Glace : alt et genre alignés sur la photo (guitare, claviers). Furnace Club : **nouvelle photo** `images/prog-7.webp`, recadrage de `foule.webp` (`crop=720:900:380:0`, 800 × 1000), plutôt qu'un simple changement de texte. Journal : alts décrits tels que vus, sans « halle C ». Mosaïque ramenée à 2 photos (`public-5`, `public-2`) ; `public-3` passe en billetterie, `foule` en fiche artiste |
| FIX-8 entre 4 h 30 et 5 h | oui, à valider | « Après, Châteaucreux est à 25 minutes à pied : premier TER pour Lyon à 5 h 12. » Hypothèse : voir plus bas |
| FIX-9 galerie des artistes | oui | Fiches plus petites dès 768 (`clamp(15rem, min(26vw, 100svh − 32rem), 26rem)`, image carrée) pour tenir dans l'écran ; déplacement épinglé porté à 886 px à 1440 (528 à 1280, 752 à 768) ; au focus clavier, la page défile jusqu'à la fiche (`lenis.scrollTo` sur la position du ScrollTrigger). Les 6 « Écouter un extrait » sont entièrement à l'écran à 1440, 1280, 768. Téléphone : `scroll-padding-inline: 1rem`, première fiche à 16 px, et à 16 px après aimantation |
| FIX-10 qui on est | oui, bloc provisoire | Nouvelle section 6 `#equipe` (papier) après le lieu : « Trois salariés, 180 bénévoles, une association », deux phrases, photo de balances (`prog-6`, recadrée en 3:2 / 4:3). La photo n'est pas l'équipe : à remplacer |
| FIX-11 microtypographie | oui | « 1<sup>er</sup> » (garantie, FAQ) ; message accordé « Pass trois nuits ajouté » ; libellés des boutons dans un seul `<span>` (plus de double espace créée par le `gap`) ; prix du chapo, de l'en-tête et des boutons lus dans `TOLE.pass` (`data-prix="trois"`) |
| FIX-12 | non (client) | Noté plus bas |

Pour tenir le budget après l'ajout de la section équipe (836 mots au premier compte) : FAQ ramenée à 3 questions (« tarif réduit » répétait la carte du pass), légendes, extraits du journal, pratique et note des artistes raccourcis.

**Densité mesurée** (script § 11, Chrome, après corrections) :

| Mode | Mots | Sections | Écrans |
|---|---|---|---|
| 1440, mouvement normal | 788 | 12 | 13,8 |
| 1440, mouvement réduit | 788 | 12 | 13,7 |
| 375, mouvement normal | 777 | 12 | 17,1 |
| 375, mouvement réduit | 777 | 12 | 17,4 |

Détail à 1440 : en-tête 11, hero 57, manifeste 47, programme 82, artistes 100, lieu 46, équipe 40, public 48, pass 95, pratique 77, journal 63, FAQ 53, final 32, pied 34. Aucun bloc au-delà de trois phrases.

**Vérifié** (Playwright, Chrome, serveur local à fils multiples) à 1440 × 900, 1280 × 800, 768 × 1024, 375 × 812, 360 × 740, en mouvement normal et réduit (10 passages) : débordement horizontal 0, console et requêtes échouées vides, images cassées 0, texte sous 12 px aucun ; vidéo demandée 1 fois en mouvement normal, 0 en réduit ; galerie en grille en mouvement réduit. Panier à 375 × 812 et 1440 × 900 ; clavier dans la galerie à 1440, 1280, 768 ; glisser et aimantation à 375.

Images désormais inutilisées : `public-1.webp` (la pluie dans la halle ; ne pas la réemployer), `public-4.webp` (source de `public-5`, paroles visibles sur l'écran). `foule.webp` sert encore de source à `prog-7`.

**Ce qui reste au client**

- FIX-12 : photos de presse des artistes, vrais avis signés de 2026, photos des halles réelles.
- FIX-10 : une vraie photo de l'équipe et des bénévoles ; vérifier les chiffres (trois salariés, 180 bénévoles, quatrième édition, association loi 1901).
- FIX-8 : la règle réelle après 4 h 30. Écrit ici : 25 minutes à pied jusqu'à Châteaucreux, premier TER pour Lyon à 5 h 12. Navette ou tram prolongé, si le festival en a un, à mettre à la place.
- Photos 1 et 3 du journal : ce ne sont pas les halles (dôme de projecteurs, coupole métallique). Elles sont décrites telles qu'elles sont, mais un festivalier qui connaît le lieu le verra.

## Tour 2 de la refonte (77/100) : corrections

Plan : `boucle-persona/refonte-tour-2.md`, partie 4. FIX-13 à FIX-21 appliqués le 4 novembre 2026, à 0 $ : aucune génération, aucun téléchargement. Les deux nouvelles images sont des recadrages d'images déjà étalonnées (ffmpeg + `cwebp -q 74`, sans nouveau grain). `gestes.js` n'est pas modifié.

| FIX | Fait | Comment |
|---|---|---|
| FIX-13 Ô coupé du pied (bloquant) | oui | `.pied-marque { padding-top: .16em }`. Avec un interligne de 0,8, le circonflexe monte à 0,15 em au-dessus de la boîte : mesuré à −11,4 px sous le filet à 1440 et à −6,9 px à 1280 (il passait dans l'aplat minium). Mesuré après correction (encre réelle, `measureText`) : la pointe est à 42,4 px sous le filet à 1440, 42,3 à 1280, 41,4 à 768, 40,7 à 375 et 40,3 à 360, en mouvement normal comme réduit. Contrôlé sur des captures zoomées ×2 |
| FIX-14 deux siècles contre 1864 | oui | « Pendant plus d'un siècle, ces halles ont fabriqué des fusils. » |
| FIX-15 photos et légendes | oui, sans génération | Furnace Club : `halle-charpente` (trois silhouettes sur leurs machines dans un cadre de néons), alt réécrit. La halle B reçoit `images/halle-b.webp`, recadrage 4:5 de `journal-2` (`crop=428:533:196:0`), un groupe sur scène, guitare en avant. Article du tram : `images/journal-tram.webp`, recadrage 3:2 de `tram` (`crop=800:533:0:140`). Légendes : « Balances de 17 h en halle B. » et « 1 h du matin, devant la scène. » |
| FIX-16 mains levées, pluie dehors | non (génération) | Voir plus bas. Seule `prog-7` (une main levée) sort de la page : on passe de huit images de mains levées à sept |
| FIX-17 retour après 4 h 30 | oui, à confirmer | « Après, Châteaucreux est à 25 minutes à pied : partez à 4 h 40 pour le premier TER vers Lyon, à 5 h 12. » 4 h 40 plutôt que 4 h 45 : on garde 7 minutes de marge sur 25 minutes de marche. **Hypothèse à confirmer** par le client, comme la solution pour ceux qui restent jusqu'à 5 h (navette, tram prolongé, TER suivant) |
| FIX-18 Les Rivets en halle B | oui | Passés en halle A le samedi à 21 h 50 (programme et fiche). La halle B reste « découvertes » |
| FIX-19 clavier sur téléphone | oui | Sous 768 px, la galerie fait défiler sa fenêtre jusqu'à la fiche qui prend le focus (script de la page, 16 px de marge). Pour le bouton collant : `scroll-margin-bottom: 5.5rem` sur les éléments focalisables **au seul `:focus-visible`**, sous 768 px. Essayé d'abord en `scroll-padding-bottom` sur `html`, puis sur tous les liens : Lenis le lit et le bouton du hero posait la billetterie 20 px trop bas. Mesuré : 46 tabulations sur 46 entièrement à l'écran, aucune sous le bouton collant, à 375 (mouvement normal et réduit), 360, 768 et 1440. Avant : fiches 2, 4 et 6 à x = 303, tabulations 21 et 23 sous le bouton |
| FIX-20 colonnes décalées | oui | Programme et journal : `column-gap: 2rem`, plus de marge intérieure, filet dessiné par `::before` au milieu de la gouttière. Les trois photos font 432 × 288 à 1440 et les titres sont à la même hauteur. Galerie : la première fiche garde sa marge intérieure et recule de `margin-left: -1rem`, avec un filet transparent : six photos de 341 px à 1440, noms alignés (avant : 358 contre 341). Même chose dans la grille du mouvement réduit (431 px). En plus, dans le lieu (≥ 1024 px), les trois photos des halles ont la même hauteur, et les légendes A, B et C sont maintenant alignées (avant : 20 px d'écart) |
| FIX-21 détails | oui | « le&nbsp;15&nbsp;avril » (LE ne reste plus seul en bout de ligne) ; FAQ « Trois questions avant de payer » ; sous 1024 px, `.billetterie-texte { display: contents }` et la photo passe après le panier (`order: 1`) ; « 41 concerts » partout (le chiffre du lieu disait « artistes ») |
| FIX-12 médias réels | non (client) | Inchangé |

**Audit de design** (texte à moins de 8 px du bord d'un conteneur bordé ou coloré ; interligne sous 1,3 sur du texte de plusieurs lignes). Vérifié en rendu, Playwright, aux 5 largeurs, avec les questions de la FAQ ouvertes et fermées :

- Vrais cas, corrigés : le pied (le Ô sortait de 7 px par le haut, FIX-13) ; `.pratique-liste dd` (texte courant de 18 à 22 px sur 2 à 6 lignes, interligne de 1,25 passé à 1,35) ; `.equipe-chapo` (1,3 arrondi, en dessous du seuil à 1280 : passé à 1,35).
- Faux positifs, laissés tels quels :
  - le dernier `details` de la FAQ : le texte mesuré est la réponse d'un accordéon fermé (hauteur nulle). Ouverte, elle a 16 px de marge au-dessus du filet ;
  - les titres d'affichage `h1`, `h2`, `h3` et les titres d'articles, entre 1,05 et 1,12 (Archivo 900 étroite, en capitales). C'est le parti brutaliste : les lignes ne se touchent pas. L'écart d'encre mesuré entre deux lignes est d'au moins 2,8 px à 1440 et 1280, 1,4 px au plus juste (titre du programme à 768) et 1,2 px (titre de l'équipe à 375 et 360) ;
  - les avis `.avis p`, à 1,08 : ce sont des citations d'affichage de 24 à 34 px en graisse 800, sur 2 ou 3 lignes. Écart d'encre d'au moins 2,9 px ;
  - `.manifeste`, à 1,0 : la phrase-signature, de 34 à 80 px, découpée en mots. Écart d'au moins 2,1 px ;
  - `.pass-prix`, à 0,9 : un prix en chiffres d'affichage, avec l'unité « la nuit » en bloc séparé. Ce n'est pas du texte courant, et rien ne se chevauche.

**Densité** (script `compte-pane.js`, Chrome) : 794 mots à 1440 en mouvement normal, 792 en réduit ; 789 à 768 ; 783 à 375 et 360 ; 12 sections ; 13,8 écrans à 1440 et 17,2 à 375. Mon comptage donne 2 mots de plus que celui du persona pour le même état de la page : je compte « 4 200 » et « 12 000 » comme deux mots chacun. Selon sa méthode, on passe de 788 à 792 mots. Détail à 1440 : manifeste 48 (+1), équipe 37 (−3), pass 94 (−1), pratique 84 (+7), le reste est inchangé. Aucun bloc ne dépasse trois phrases.

**Vérifié** (Playwright, Chrome, serveur Node statique local, arrêté à la fin) à 1440 × 900, 1280 × 800, 768 × 1024, 375 × 812 et 360 × 740, en mouvement normal et réduit : aucun débordement horizontal, console et réseau vides, aucune image cassée (une fois les images différées chargées), aucun texte sous 12 px, aucun titre qui déborde. Parcours d'achat à 1440 et 375 : barre « Pass réduit (dimanche) ajouté · Panier 414 € », « Ajouté ✓ », « Voir le panier », retrait (414 → 382 €) et message de « Payer ».

**Défauts restants**

- Sur téléphone (375 px, Playwright headless), le bouton « Prendre mon pass » du hero, qui passe par l'ancre de Lenis, pose parfois la billetterie au mauvais endroit : à 384 px du haut ou à −620 px, au lieu de 72 px. Le défaut existait avant ce tour : la version d'origine, servie à côté et testée en alternance, rate 11 essais sur 36 ; la version corrigée en rate 16 sur 26. Les deux versions ratent de la même façon, avec les mêmes valeurs. Retirer une à une les deux corrections qui touchent à la mise en page (la marge du focus et le `display: contents` de la billetterie) ne change pas le taux (4 et 5 ratés sur 8) : la cause n'est pas isolée. Hypothèse : un `ScrollTrigger.refresh` ou un chargement d'image différée pendant l'animation de Lenis (`gestes.js`, non modifié). Le bouton collant, les liens de la nav et « Voir le panier » posent la section au bon endroit. **À reproduire dans un vrai téléphone avant le prochain tour.**
- Images désormais inutilisées : `public-1` (la pluie dans la halle ; ne pas la réemployer), `public-4` (source de `public-5`), `foule` et `prog-7` (main levée), `journal-2` (source de `halle-b`). `tram` sert deux fois (pratique et journal), dans deux cadrages.
- `halle-b` fait 428 × 533 px (recadrage d'une image de 800 × 533). C'est assez pour sa taille d'affichage (au plus 340 px de large), mais la photo sera floue sur un écran ×2.

**Ce qui reste**

- **FIX-16 : fait le 4 novembre 2026** (3 générations FLUX.2 Pro 1K, 0,09 $ ; même trichromie, `crop=768:960`, `cwebp -size 75000`). `public-2` = verrière sous la pluie, `public-3` = bénévoles à l'entrée, légende « 19 h, les bénévoles à l'entrée. ». Plan d'origine : remplacer `public-2` (mosaïque) par une verrière sous la pluie, vue de l'intérieur, avec la foule au sec dessous, et `public-3` (billetterie) par l'entrée avec les bénévoles qui scannent les bracelets, la file sous la charpente. Prompts : FLUX.2 Pro, même trichromie, avec la consigne « dry interior, rain only on the outside of the glass ». Ces deux images prouveraient « la pluie dehors » et les « 180 bénévoles ». Ensuite, ajouter les prompts dans `medias-a-generer.md`.
- **FIX-12 (client)** : photos de presse des six artistes, vrais avis signés de 2026, photos réelles des halles, de l'équipe et des bénévoles.
- **FIX-17 (client)** : la règle réelle du retour après 4 h 30 et pour ceux qui restent jusqu'à 5 h (navette, tram prolongé, TER suivant). Les horaires « partez à 4 h 40 » et « TER de 5 h 12 » sont à confirmer.

## Tour 3 de la refonte : 88/100, « Oui »

Rapport : `boucle-persona/refonte-tour-3.md` (66 → 77 → 88). Tous les FIX du tour 2 sont faits, sauf FIX-16 à moitié et FIX-12 au client. Le défaut du bouton « Prendre mon pass » sur téléphone ne se reproduit pas en usage réel : 72 essais sur 72 réussis (FIX-23 : à revoir sur un vrai téléphone).

Appliqué après le tour, à 0 $ :
- **FIX-22 (majeur)** : à la souris, « Écouter un extrait » ratait environ 2 clics sur 3. Le gestionnaire `focusin` de la galerie recalait la page dès l'appui de la souris. Il ne réagit plus qu'à `:focus-visible`, donc au clavier. Mesuré avec Playwright : 12 clics sur 12 réussis à 1440, 12 sur 12 à 1280 et 14 sur 14 à 768 ; au clavier, chaque bouton atteint reste entièrement visible.
- **FIX-24 (en partie)** : l'alt de `public-3` décrit maintenant ce qu'on voit, « un bénévole scanne les bracelets » (il n'y en a qu'un, sans gilet).

Restent :
- FIX-24, la pluie sur la verrière de `public-2` qui se lit comme des paillettes, avec des mains levées en bas (régénération ≈ 0,06 $) ;
- FIX-25, la carte du journal « 180 bénévoles » montre des projecteurs ;
- FIX-26, « YouTube » mal aligné quand il passe à la ligne dans le pied à 375 et 360 ;
- FIX-17 et FIX-12, au client.

# Calade, refonte : boucle persona, tour 1

- **Date** : 4 novembre 2026
- **Page testée** : `http://127.0.0.1:4331/liberal-calade/index.html` (`index.html`, `calade.css`, `gestes.js`, `images/`)
- **Regard indépendant** : je n'ai pas lu les rapports du relecteur. Pour le contexte, j'ai lu `brief.md`, `NOTES.md`, `medias-a-generer.md`, le plan de corrections du tour 3 et les retours de l'utilisateur du 4 novembre.
- **Navigateur** : Google Chrome piloté par Playwright 1.58, avec un vrai défilement à la molette et de vrais clics, tabulations et saisies. Le formulaire n'envoie rien.
- **Captures** : `boucle-persona/refonte-tour-1-captures/` (chemins ci-dessous, relatifs à ce dossier).
- **Serveur** : le serveur du port 4331 coupe des connexions d'images sous charge (`ERR_CONNECTION_RESET` sur 2 à 8 images par chargement). J'ai donc refait tous les passages sur un second `python3 -m http.server` (port 4391, mêmes fichiers). **La console y reste vide dans tous les passages.** Le problème vient du serveur local, pas de la page.

Je suis Hélène Garcin. J'ai payé 25 000 € pour une page qui se lise comme une revue d'architecture, qui montre la matière et qui dise mes prix. Je lis aussi la page comme Claire, 54 ans, cadre à Lyon : elle vient d'acheter une grange dans le Luberon et se demande combien coûte un architecte, en vrai, comparé à un maître d'œuvre.

---

# Partie 1 : le rapport de test

## 1. Les 5 premières secondes

| Taille | Ce que je vois | Capture |
|---|---|---|
| 1440 × 900 | Un folio de revue, puis « Votre bâtisse de pierre, *habitable* toute l'année. » en Bodoni, posé sur la photo de l'escalier à la chaux. Dessous, le chapeau, le bouton « Demander la visite » et « 1 h 30 sur place, 240 € TTC, déduits si vous continuez ». En 5 secondes je sais ce qu'on vend, à qui, à quel prix et quoi faire. La composition est équilibrée, sans trou au milieu. | `premier-ecran-1440x900.png` |
| 1280 × 720 | Pareil, le titre passe sur la photo. Le bouton est à 668 px, donc visible. Le chapeau coupe « L'Isle-sur-la- / Sorgue » à la fin d'une ligne. | `premier-ecran-1280x720.png`, `premier-ecran-1280x800.png` |
| 768 × 1024 | La photo, puis le titre en 3 lignes, puis le bouton. Le titre mord de 26 px sur le bas de la photo : c'est trop peu pour avoir l'air voulu, on croirait une collision. | `premier-ecran-768x1024.png` |
| 375 × 812 | Logo, bouton Menu, « 2 chantiers ouverts au printemps 2027 », la photo, le titre en 3 lignes, le chapeau, le bouton et le prix. Tout est là. | `premier-ecran-375x812.png` |
| **375 × 667** | **Le bouton est coupé par le bas de l'écran** (636 → 693 px pour un écran de 667) et le prix n'est pas visible. La barre d'action collante n'apparaît qu'après le hero. | `premier-ecran-375x667.png` |
| 360 × 740 | Le bouton est entier (bas à 717 px), le prix est sous le pli. | `premier-ecran-360x740.png` |

Aux 7 tailles : 0 px de débordement horizontal, et aucun numéro de téléphone nulle part sur la page.

## 2. Le défilement complet

**Lentement, à 1440, à la molette** (14 captures, `defilement-1440-01.png` à `-14.png`) :

1. **Sommaire** (`-01`) : « 64 bâtisses depuis 2009. Voici les trois dernières. » Trois entrées en grand Bodoni. Au survol, la photo du chantier suit le curseur dans la colonne vide et les autres titres passent en gris (`sommaire-survol-1440.png`, `sommaire-survol-3-1440.png`). Au clic, l'entrée s'ouvre sur sa photo et sa phrase (`sommaire-ouvert-1440.png`, `sommaire-grange-ouverte-1440.png`). **C'est la signature, et elle marche.**
2. **La grange** (`-02`, `-03`) : grande photo au soleil couchant avec parallaxe, « Une grange à foin devenue maison en onze mois », deux phrases et une fiche (180 m², 11 mois). C'est un vrai article de revue.
3. **La matière** (`-04`, `-05`) : un titre fort, « frais en août, secs en janvier ». Mais trois photos sur quatre ne sont pas mon métier (voir § 6). En haut à gauche de la grille, un grand vide d'environ 600 × 250 px.
4. **La méthode** (`-05`, `-06`) : la façade générée à gauche, quatre étapes numérotées à droite. C'est propre.
5. **Les honoraires** (`-07`, `-08`) : 240 € TTC · dès 5 760 € TTC · 9 %, un exemple chiffré, puis le bouton. C'est exactement ce que je voulais.
6. **Le portrait** (`-08`, `-09`) : la photo générée est crédible (moellons calcaires, poteau de chêne, femme de 55 ans aux cheveux gris). Le titre se lit comme un bénéfice.
7. **Les témoignages** (`-09`, `-10`) : le fond passe en nuit, avec une grande citation et deux avis courts, marqués provisoires en pointillé. Aucune image.
8. **Le journal** (`-11`, `-12`) : trois cartes datées (21 octobre, 2 octobre, 12 septembre 2026) avec rubrique, photo et titre utile.
9. **Les questions** (`-12`, `-13`) : quatre questions, et ce sont celles de Claire. L'accordéon est exclusif (`faq-ouverte-1440.png`).
10. **Écrire** (`-13`, `-14`) : deux colonnes, la promesse et la réassurance à gauche, le formulaire à droite sur deux colonnes de champs.
11. **Le pied de page** (`-14`) : grand logotype, adresse et horaires, plan de la page, le cadre (Ordre, MAF), les crédits.

Pendant tout le défilement, l'en-tête reste à l'encre sur chaux : le défaut du fond nuit relevé au tour 3 est corrigé. Après chaque arrêt de 1,3 s, aucun texte ni aucune image ne reste invisible.

**Vite** : 6 crans de 1 200 px en 0,2 s. À 250 ms, deux éléments du journal sont encore en train d'apparaître. À 1,5 s, tout est en place (`defilement-rapide-1440.png`, `defilement-rapide-1440-apres-1s5.png`). Une remontée brutale revient sur une couverture intacte (`remontee-rapide-1440.png`). Rien ne saute, rien ne clignote.

**Téléphone 375 × 812**, 17 écrans (`tel-375-01.png` à `-17.png`) : une seule colonne, propre, sans titre cassé. La barre « Demander la visite · 240 € » apparaît après le hero et disparaît sur le formulaire et le pied de page. En revanche, le sommaire n'y montre **aucune image** tant qu'on ne touche pas une entrée (`tel-375-02.png`).

## 3. Le parcours de Claire jusqu'à la demande de visite

1. Elle lit le prix de la visite dès le premier écran (240 € TTC, déduits).
2. Elle clique « Honoraires » dans le menu du téléphone. Le menu se ferme et le titre arrive à 160 px du haut, sous l'en-tête (`tel-375-menu-ouvert.png`, `tel-375-apres-lien-honoraires.png`). Les liens du menu font 52 px de haut et le bouton 44 px.
3. **Les chiffres concordent** :
   - 4 800 € HT × 1,2 = **5 760 € TTC** (brief) ;
   - 9 % de 300 000 € HT = 27 000 € HT, soit **32 400 € TTC** ;
   - 5 760 + 32 400 = **38 160 € TTC**, juste.
   - Les trois mois d'études se retrouvent partout : étape 02, honoraires et FAQ. L'instruction de 3 mois en secteur protégé est exacte (2 mois + 1 en abords de monument). Les « onze mois » de la grange se retrouvent dans le titre, la fiche et la FAQ.
   - **Deux frottements**. D'abord, la colonne « 9 % » ne dit pas que les 9 % sont HT. Claire calcule 27 000 €, puis lit 32 400 € dessous, et doute. Ensuite, l'étape 04 promet le suivi « jusqu'à la levée des réserves », alors que les honoraires disent « jusqu'à la réception ».
4. **Objection n° 1, le prix face au maître d'œuvre.** La FAQ « Architecte ou maître d'œuvre : quelle différence ? » parle d'obligation et d'assurance, jamais d'argent. Claire ne sait toujours pas pourquoi payer 9 % plutôt que ce que demanderait un maître d'œuvre.
5. **Objection n° 2, perdre la main.** Elle est bien levée : une seule architecte, une visite par semaine, un compte rendu le soir même, et l'avis « suivi le chantier depuis Lyon ».
6. **Formulaire** :
   - Envoi vide : trois messages d'erreur clairs et le focus revient sur « Prénom et nom » (`formulaire-erreurs-1440.png`).
   - Envoi rempli (Claire Mercier, Goult, claire.mercier@example.com, « Achat en cours », « Grange de 160 m², toiture à reprendre… ») : « C'est noté, Claire. Hélène vous recontacte sous 48 heures pour fixer la visite. » Le bouton se désactive (`formulaire-envoye-1440.png`).
7. **Pour joindre l'atelier autrement** : il n'y a ni e-mail ni téléphone, même en petit dans le pied de page. Si Claire préfère appeler, elle n'a que l'adresse postale.

## 4. Le clavier (40 tabulations, 1440)

Dans l'ordre :
- évitement, logo, les 4 liens, le bouton de la nav ;
- le bouton du hero, les 3 entrées du sommaire, le bouton des honoraires ;
- les 4 questions, les 5 champs, l'envoi ;
- les 7 liens du pied de page, puis retour au début.

Tout est atteint et le focus est visible partout (`clavier-tab-01.png`, `-02`, `-07`, `-09`, `-12`, `-16`, `-20`, `-26`, `-32`). Le lien « Lire le chantier » n'est atteignable qu'une fois l'entrée ouverte, ce qui est normal.

## 5. Le mouvement réduit (`prefers-reduced-motion: reduce`)

Pages entières à 1440, 1280, 768, 375 et 360 : `page-entiere-reduit-1440.png`, `-1280.png`, `-768.png`, `-375.png`, `-360.png`. Les captures 768, 375 et 360 sont faites en densité 1 : en densité 2, Chrome répète des morceaux de page au-delà de 16 384 px, c'est un défaut de capture. **Aucun élément invisible, aucun débordement** : la page est complète et lisible.

## 6. L'œil du métier

**Ce qui est juste** : chaux aérienne en trois passes, chaux-chanvre, tuiles canal de réemploi, joints beurrés, moellons calcaires, Ordre régional PACA, décennale MAF, seuil des 150 m², avis des Bâtiments de France avant le dépôt, trois devis par lot. Le vocabulaire est celui de mon métier, sans aucun « espace de vie qualitatif ». Le portrait, le mas de la Roque, la grange, l'arche de Joucas, la porte vert d'eau et Gordes sont crédibles pour le Vaucluse.

**Ce qui me fait tiquer** :

| Où | Ce que je vois | Ce qu'un confrère dirait |
|---|---|---|
| Matière, niche (`images/niche-700.webp`) | une niche **en ogive**, avec un calice de terre | « c'est un riad, pas un mas ». Chez nous, les niches sont en plein cintre ou à linteau de bois. |
| Matière, lumière (`lumiere-700.webp`) | une pièce **grise et froide**, presque en noir et blanc, avec un angle de placo | hors palette, et cela contredit « Midi en décembre » sur un mur de chaux |
| Matière, enduit (`enduit-900.webp`) | une courbe **sombre, verdâtre**, assombrie dans les angles | la légende promet « ocre pâle, lumière rasante, lissé » ; on croirait une cage d'escalier en béton |
| Méthode (`methode-1000.webp`) | des volets délavés et écaillés | la légende dit « volets d'origine repeints » |
| Grange (texte l. 122) | « une menuiserie de chêne vitrée » derrière les portes | la photo ne montre que des portes rouges fermées. **Nulle part sur la page on ne voit une pièce habitée** alors que la promesse est « habitable toute l'année ». |
| Journal, chantier de Saumane (image générée) | le premier enduit est gris-vert | il fait « ciment » ; une chaux sort beige rosé. C'est léger : la charpente, les tuiles vues de dessous et le tréteau sont justes. |

**Typographie** :
- **35 apostrophes droites** (`'`) et aucune apostrophe typographique (`’`), jusque dans le titre de 100 px (« l'année », « C'est », « l'on »). Dans une revue, cela se voit.
- Les cartes du journal posent une espace **fine** avant le deux-points : « semaine 14: », « pierre: cinq », « Lourmarin: ce ». À l'œil, les signes sont collés, alors que le h2 du journal utilise correctement une espace insécable normale.
- Aucun grand titre aux lettres collées (`letter-spacing: normal` partout).

## 7. La densité (script de `conventions.md` § 11, 1440 × 900, après 3 s)

| Mesure | Mouvement réduit | Mouvement permis | Fourchette |
|---|---|---|---|
| Mots | **802** | **802** | 500 – 800 |
| Sections du `<main>` | 11 | 11 | 10 – 13 |
| Écrans | 13 | 13 | 12 – 18 |

Détail par bloc (mots / images) :

| Bloc | Mots | Images |
|---|---|---|
| lien d'évitement | 3 | 0 |
| en-tête | 9 | 0 |
| couverture | 73 | 1 |
| sommaire | 61 | 3 |
| grange | 56 | 1 |
| matière | 33 | 4 |
| méthode | 90 | 1 |
| honoraires | 79 | **0** |
| atelier | 26 | 1 |
| témoignages | 73 | **0** |
| journal | 54 | 3 |
| questions | 119 | 0 |
| écrire | 57 | 0 |
| pied de page | **69** | 0 |

`NOTES.md` annonce 794 mots. L'écart vient du pied de page, passé de 61 à 69 mots quand la mention des images générées a été ajoutée aux crédits. Aucun bloc ne dépasse trois phrases. Deux sections hors FAQ et appel final n'ont aucun visuel : les honoraires et les témoignages.

## 8. La console

Sur le serveur de contrôle (4391), elle est vide à toutes les tailles, en mouvement permis comme réduit, au défilement complet, au menu, au formulaire et à la FAQ. Sur le serveur 4331, on voit des `ERR_CONNECTION_RESET` sur des images quand plusieurs pages chargent à la suite : c'est le serveur.

## 9. Le plan du tour 3, revu en passant

| FIX du tour 3 | Aujourd'hui |
|---|---|
| FIX-1 fond nuit qui déborde | **Corrigé** : `data-bg` sur toutes les sections, en-tête lisible. |
| FIX-2 toit du mas | **Corrigé** (`tel-375-sommaire-ouvert.png`) |
| FIX-4 phrases démenties par les photos | **Corrigé** pour l'arche et les combles. **Il en reste deux** : « menuiserie de chêne vitrée » et « volets repeints ». |
| FIX-6 la grange quatre fois | **Corrigé** : deux vues, sous deux angles. |
| FIX-7 encoche du portrait | **Corrigé** |
| FIX-9 niche en ogive, lumière en noir et blanc | **Pas corrigé** |
| FIX-10 poids des images | **Corrigé** : toutes sous 245 Ko. |

---

# Partie 2 : les notes

## Les 10 points

| # | Point | Verdict | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | **Pas OK** | densité § 7 | 11 sections, toutes les sections attendues sont là. Mais **802 mots, au-dessus de 800**, et deux sections sans visuel (honoraires, témoignages). |
| 2 | Catalogue, articles | OK | `defilement-1440-11.png` | Trois cartes datées, rendues depuis l'objet `JOURNAL` et un `<template>` : c'est prêt pour un CMS. |
| 3 | Titres et promesse | OK | `premier-ecran-1440x900.png` | La promesse dit un résultat (« habitable toute l'année »). Les titres sont concrets, chiffrés, dans ma voix. |
| 4 | Typographie d'affichage | OK | `premier-ecran-375x812.png` | Interlettrage normal, rien de collé à 1440 ni à 375. Les apostrophes droites sont relevées à part (FIX-8). |
| 5 | Barre de navigation | OK | `premier-ecran-1440x900.png`, `tel-375-menu-ouvert.png` | Logo, 4 liens, un bouton ; un menu propre sur téléphone ; aucun numéro. |
| 6 | Blocs d'action, formulaires | OK | `formulaire-envoye-1440.png` | Deux colonnes sur ordinateur, réassurance chiffrée, aucun numéro en gros. |
| 7 | Hero équilibré | OK | `premier-ecran-1440x900.png`, `premier-ecran-1280x720.png` | Le texte, la photo et l'action se répondent, sans vide au milieu. Le bouton est coupé à 375 × 667 (FIX-6). |
| 8 | Responsive | OK | `premier-ecran-*`, `page-entiere-reduit-*` | 0 débordement. Aucun titre cassé ou coupé, 4 lignes au plus sur téléphone (citation et portrait à 360). |
| 9 | Images et vidéos | **Pas OK** | `defilement-1440-04.png`, § 6 | La matière montre trois images hors métier (ogive, pièce grise, enduit verdâtre). Aucun intérieur habité. Deux sections sans image. |
| 10 | 3D produit | sans objet | — | Pas d'objet 3D. |

## La grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **14** | On la reconnaît sans le logo : chaux, Bodoni, vert Sorgue, folio, légendes, filets, titre en surimpression. C'est la revue que je voulais. |
| Images | 15 | **11** | Les grandes photos ont un rythme et les trois images générées sont crédibles (le portrait surtout). Mais la section qui doit montrer la matière en montre trois fausses, on ne voit jamais une pièce habitée, et les honoraires comme les témoignages n'ont pas d'image. Plafond en médias provisoires : 12 à 13. |
| Mise en page | 15 | **13** | La composition éditoriale est suivie : asymétries, contraste d'échelle, sommaire en liste, honoraires en tableau. Il reste deux vides ratés : le haut gauche de la matière à 1440 et la droite de la méthode à 768. Le titre mord trop peu sur la photo à 768 et 375. |
| Mouvement | 10 | **8** | La signature marche : l'image suit la liste, les autres titres pâlissent. Titres en lignes, parallaxe, passage au fond nuit. Le mouvement réduit est complet. Les honoraires, le journal et la FAQ n'ont qu'un fondu d'apparition. |
| Clarté en 5 s, action | 10 | **9** | Quoi, pour qui, combien et quoi faire : tout est lisible en 5 s à 1440, 1280, 768, 375 × 812 et 360. Le bouton est coupé à 375 × 667. |
| Densité | 5 | **0** | 802 mots pour un plafond de 800, comptage fourni. |
| Preuves, objections | 10 | **7** | Honoraires chiffrés avec un exemple juste, Bâtiments de France, délais, zone, suivi à distance : c'est fort. Mais l'objection n° 1 (le prix face au maître d'œuvre) n'est pas traitée, et les avis et le chiffre de 64 bâtisses sont provisoires. Plafond en provisoire : environ 8. |
| Textes | 10 | **8** | Des titres forts, concrets et chiffrés, dans ma voix, sans phrase creuse. Je retire des points pour les 35 apostrophes droites, le « 9 % » sans HT, « réception » contre « levée des réserves », et deux phrases que la photo dément. |
| Mobile, accessibilité, légèreté | 10 | **8** | 0 débordement, titres sains aux 5 tailles, focus visible partout, cibles de 44 à 52 px, menu propre, images sous 245 Ko. Je retire des points pour le bouton coupé à 375 × 667, les images du sommaire cachées sur téléphone et un pied de page sans e-mail ni mentions légales. |
| **Sous-total** | 100 | **78** | |
| Pénalité de densité | | **−5** | Une tranche entamée de 50 mots au-delà de 800 (2 mots de trop) |
| **Total** | | **73 / 100** | |

**Note sur 10 : 7,3.**

**Seuil** : **85**, celui d'une maquette aux médias provisoires. Je suis 12 points dessous.

**Ce qu'on peut atteindre sans le vrai client** (FIX-1 à FIX-12, 0 $ et environ 0,25 $ de génération) :

| Correction | Gain |
|---|---|
| Densité ramenée sous 800 mots, la pénalité saute | +10 |
| Matière et intérieur habité refaits | +2 (Images) |
| Le prix face au maître d'œuvre | +1 (Preuves) |
| Typographie et cohérences | +1 (Textes) |
| 375 × 667 et sommaire sur téléphone | +1 (Mobile) |
| Vides de la matière | +1 (Mise en page) |

**Total visé : environ 89.** Il est au-dessus de 85. Pour 90, il faut le vrai client : ses chantiers photographiés, ses avis signés, son chiffre de bâtisses vérifié, son numéro d'Ordre et son SIRET.

> « La revue est là. Elle dit mes prix au centime près, et Claire comprend en cinq secondes ce que je fais. Mais la page dépasse de deux mots le budget fixé. Surtout, ma section matière, celle qui devait me rendre fière, montre une niche de riad, une pièce grise et un enduit verdâtre, et on ne voit jamais une pièce où l'on vit. Corrigez ça et je signe. »

**Verdict : Pas encore.** 73/100, sous le seuil de 85 : 802 mots pour 800 (pénalité automatique), et trois photos de matière sur quatre qui ne sont pas mon métier.

---

# Partie 3 : le plan de corrections

**Budget de mots.**

| | Mots |
|---|---|
| Aujourd'hui | 802 |
| FIX-1 (crédits du pied de page) | −19 |
| FIX-4 (réponse maître d'œuvre, à nombre égal) | +3 |
| FIX-5 (e-mail, mentions légales, Instagram) | +6 |
| FIX-9 (HT, réserves) | +2 |
| **Après le plan** | **≈ 794** |

Recompter avec le script de `conventions.md` § 11.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | **bloquant** | 0 $ | 802 mots : raccourcir les crédits du pied de page (−19 mots) |
| FIX-2 | majeur | génération ≈ 0,18 $ (ou photos libres à 0 $) | Matière : remplacer la niche en ogive, la pièce grise et l'enduit verdâtre |
| FIX-3 | majeur | génération ≈ 0,06 $ | Montrer une pièce habitée : le séjour de la grange, dans les témoignages |
| FIX-4 | moyen | 0 $ (chiffre à valider par le client) | FAQ : répondre au prix face au maître d'œuvre, pas seulement à l'obligation |
| FIX-5 | moyen | 0 $ · client pour les coordonnées réelles | Pied de page complet : e-mail et téléphone en petit, mentions légales, réseau |
| FIX-6 | moyen | 0 $ | 375 × 667 : le bouton du hero est coupé par le bas de l'écran |
| FIX-7 | moyen | 0 $ | Sommaire : première entrée ouverte, pour qu'il y ait une image sur téléphone |
| FIX-8 | léger | 0 $ | 35 apostrophes droites ; espace fine avant le deux-points dans les cartes du journal |
| FIX-9 | léger | 0 $ | « 9 % » sans HT ; « réception » contre « levée des réserves » |
| FIX-10 | léger | 0 $ | Deux phrases que la photo dément : « menuiserie de chêne vitrée », « volets repeints » |
| FIX-11 | léger | 0 $ | Matière à 1440 : grand vide en haut à gauche ; titre qui mord de 26 px sur la photo à 768 et 375 |
| FIX-12 | léger | 0 $ | La nav garde « Réalisations » souligné en haut de page, « Honoraires » sur le portrait |
| FIX-13 | léger | génération ≈ 0,03 $ (facultatif) | Chantier de Saumane : un enduit gris-vert qui fait « ciment » |
| FIX-14 | léger (bloque 90, pas 85) | client | Vrais chantiers, avis signés, nombre de bâtisses, Ordre, SIRET, coordonnées, promesse « toute l'année » validée |

---

## FIX-1 · bloquant · 0 $ · 802 mots pour un plafond de 800

**Quoi.** Le script compte 802 mots en mouvement réduit comme en mouvement permis. C'est le pied de page qui a fait passer la page au-dessus de 800 (61 → 69 mots), quand les images générées ont été ajoutées aux crédits. Résultat : « Densité » tombe à 0 et une pénalité de 5 points s'ajoute.

**Où.** `index.html` l. 330 (`.pied-credits`).

**Comment.** La licence Unsplash et celle de Pexels n'obligent pas à créditer, et les noms restent dans `NOTES.md` § 5. Remplacer les 27 mots par :
`Provisoires : Unsplash, Pexels ; trois images générées (FLUX.2&nbsp;Pro).` (8 mots)
On gagne 19 mots, et la page passe à 783 avant les autres FIX. Recompter, puis corriger le tableau du § 4 de `NOTES.md` (il dit 794).

## FIX-2 · majeur · génération ≈ 0,18 $ (3 × 0,06 $, FLUX.2 Pro, le même modèle que le portrait) · la matière n'est pas la mienne

**Quoi.** La section qui doit « montrer la matière » montre une niche en ogive (un riad), une pièce grise presque en noir et blanc, avec un angle de placo, et un enduit sombre et verdâtre que la légende dit « ocre pâle, lissé ». Seule la photo du calcaire de pays est juste. C'était déjà le FIX-9 du tour 3.

**Où.** `index.html` l. 135 (`niche`), 136 (`lumiere`), 137 (`enduit`). Les fichiers sont `images/niche-700/1400.webp` (2:3), `lumiere-700/1400.webp` (3:4) et `enduit-900/1800.webp` (≈ 3:2). Mêmes noms et mêmes ratios : le code ne change pas.

**Comment.** Trois prompts, chacun suivi du « style de shooting commun » de `medias-a-generer.md` :
1. *niche* : « Round-arched niche (plein cintre) set into a thick lime-rendered wall of a Provençal farmhouse, an old glazed earthenware jar from Apt inside, raking side light, warm off-white lime, vertical 2:3. »
2. *lumière* : « Rectangle of low winter midday sun on a warm off-white lime-washed wall, terracotta tomette floor, deep stone window reveal visible at the edge, vertical 3:4, warm not grey. »
3. *enduit* : « Close-up of a curved wall finished in pale ochre aerial-lime render, three coats, smooth trowelled finish with subtle cloudy texture, low raking light, horizontal 3:2. »

Puis l'étalonnage commun et `cwebp -size` aux poids actuels. Sans budget : trois photos libres, à condition qu'elles montrent une niche en plein cintre, une lumière chaude sur la chaux et un enduit clair.

## FIX-3 · majeur · génération ≈ 0,06 $ · aucune pièce habitée sur toute la page

**Quoi.** La promesse est « habitable toute l'année », la grange dit « le soleil du soir entre jusqu'au fond du séjour », et la citation dit « C'est devenu la pièce où l'on vit ». Pourtant, aucune image ne montre un intérieur vécu. Les témoignages sont en plus une des deux sections sans visuel.

**Où.** `index.html` l. 196-217 (`#temoignage`) : une figure dans `.citation-grille`, à droite de la grande citation (colonnes 8 à 12 à partir de 900 px, sous la citation sur téléphone). Ajouter une règle dans `calade.src.css` près de `.citation-grille`, puis recompiler `calade.css`.

**Comment.** Fichier `images/grange-sejour-900.webp` et `-1400.webp` (4:5), prompt : « Living room inside a converted stone barn in the Vaucluse: a low stone barrel vault, oak glazed doors set behind the old wooden barn doors, evening sun reaching the back of the room, lime-rendered walls, a linen sofa, a wood stove, terracotta floor, lived-in but uncluttered, vertical 4:5. » + style commun. Alt : « Séjour de la grange Berthier sous la voûte, porte de chêne vitrée au soleil du soir ». **Aucune légende** (0 mot de plus). Mettre `data-image-reveal`. Sur fond nuit, garder l'étalonnage commun.

## FIX-4 · moyen · 0 $ · l'objection n° 1 sans réponse

**Quoi.** Claire veut savoir pourquoi payer un architecte plus cher qu'un maître d'œuvre. La réponse actuelle parle d'obligation et d'assurance, pas d'argent. Elle laisse aussi entendre que le maître d'œuvre n'est pas assuré, ce qui est faux : il doit aussi une décennale.

**Où.** `index.html` l. 265.

**Comment.** Toujours 2 phrases, +3 mots :
« Un maître d'œuvre coûte souvent un peu moins, mais aucun diplôme n'est exigé pour l'exercer. L'architecte est diplômé, inscrit à l'Ordre, obligatoire au-delà de 150&nbsp;m², et défend vos intérêts face aux artisans. »
Si la cliente l'accepte, ajouter l'écart chiffré qu'elle constate (« 2 à 3 points de moins ») : c'est une règle commerciale, à valider.

## FIX-5 · moyen · 0 $ (coordonnées réelles : client) · un pied de page incomplet

**Quoi.** Il n'y a ni e-mail ni téléphone, même en petit. Il n'y a pas non plus de lien vers les mentions légales, alors qu'elles sont obligatoires pour une société d'architecture (n° d'Ordre, SIRET, hébergeur), ni de réseau social. La règle interdit le numéro dans la nav et en gros, **pas** dans le pied de page en corps de texte, et le brief prévoit « formulaire ou téléphone ».

**Où.** `index.html` l. 313-316 (bloc « L'atelier ») et l. 333 (`.pied-bas`).

**Comment.**
- Ajouter dans l'adresse : `<br><a href="mailto:atelier@calade.example">atelier@calade.example</a>` (+1 mot) ; le numéro en texte courant si la cliente le veut (+3 mots, à arbitrer avec le budget).
- Dans `.pied-bas` : `<a href="#">Mentions légales</a>` et `<a href="#">Instagram</a>` (+3 mots).
- Pour l'exemple, des liens morts sont à éviter : soit un `<span>` qui annonce la page, soit la cible réelle au projet.

## FIX-6 · moyen · 0 $ · le bouton coupé à 375 × 667

**Quoi.** Sur un iPhone SE ou 8, le bouton « Demander la visite » occupe 636 → 693 px dans un écran de 667 px. Il est coupé, et le prix est invisible. La barre collante n'apparaît qu'après le hero (`premier-ecran-375x667.png`).

**Où.** `calade.src.css` l. 79 (`.couverture-photo { height: clamp(14rem, 36svh, 26rem) }`) et l. 83.

**Comment.** Ajouter `@media (max-width: 899px) and (max-height: 700px) { .couverture-photo { height: 26svh; } }`. La photo perd environ 67 px, le bouton finit vers 626 px et le prix vers 654 px. Recompiler, puis refaire 375 × 667, 375 × 812 et 360 × 740.

## FIX-7 · moyen · 0 $ · le sommaire sans image sur téléphone

**Quoi.** Sur téléphone, l'image qui suit le curseur n'existe pas. La section de preuve se réduit donc à trois lignes de texte tant qu'on ne touche rien (`tel-375-02.png`). C'est contraire à « plus de visuels que de texte ».

**Où.** `index.html` l. 83.

**Comment.** Ajouter `open` au premier `<details>` (le mas de la Roque). Le script l. 393-396 range déjà l'image flottante quand une entrée est ouverte : vérifier qu'au premier survol sur ordinateur l'image flottante n'apparaît pas par-dessus l'entrée ouverte. Sinon, limiter le `open` aux écrans tactiles : `if (matchMedia("(hover: none)").matches) document.querySelector("#sommaire details").open = true;`.

## FIX-8 · léger · 0 $ · apostrophes et deux-points

**Quoi.** Le texte visible contient 35 apostrophes droites `'`, dont « l'année » dans le h1 de 100 px, et aucune `’`. Les cartes du journal posent une espace fine (U+202F) avant « : », qui paraît collée en Bodoni (« semaine 14: »).

**Où.**
- `index.html` : tout le texte visible (l. 55-334), et les titres de `JOURNAL` l. 237-239.
- La fonction `fine` l. 244.

**Comment.**
- Remplacer `'` par `’` dans le texte visible seulement : pas dans les attributs, le code ni les commentaires.
- l. 244 : poser une espace insécable normale (U+00A0) avant « : » et garder la fine avant « ; ? ! ».

## FIX-9 · léger · 0 $ · deux incohérences de chiffres et de mots

**Quoi.** « 9 % » sans HT : le lecteur calcule 27 000 €, puis lit 32 400 € plus bas. L'étape 04 dit « jusqu'à la levée des réserves », les honoraires « jusqu'à la réception ».

**Où.** `index.html` l. 174-175, l. 155, l. 178.

**Comment.**
- l. 174 : `9 % <small>HT</small>`.
- l. 175 : « jusqu'à la levée des réserves » (+2 mots), pour aligner sur l'étape 04.
- l. 178 : « 32 400 € TTC de suivi ».

## FIX-10 · léger · 0 $ · deux phrases que la photo dément

**Où et comment.**
- `index.html` l. 122 : « …posé derrière les portes une menuiserie de chêne vitrée. » La photo montre les portes fermées. Si FIX-3 est fait, la photo du séjour le montre et la phrase reste. Sinon, écrire « posé derrière les portes rouges une menuiserie de chêne vitrée, invisible de la cour » (+4 mots), ou retirer « vitrée ».
- l. 147 : « volets d'origine repeints », alors que les volets de l'image sont délavés. Écrire « volets d'origine gardés » (même nombre de mots).

## FIX-11 · léger · 0 $ · deux vides et un titre qui mord trop peu

**Où.**
- `calade.src.css` l. 138-140 (matière, ≥ 900 px) : la niche commence à 6rem et le titre est calé en bas de la colonne 1-6, ce qui laisse un rectangle vide d'environ 600 × 250 px en haut à gauche (`defilement-1440-04.png`).
- l. 81 : `margin-top: -1.6rem` sous 900 px. Le h1 mord de 26 px sur la photo : on croirait une erreur.

**Comment.**
- Matière : monter le titre (`align-self: start; padding-top: 6rem`), ou faire commencer la photo de la pierre sous le titre.
- h1 : soit l'assumer franchement (`margin-top: -3rem`, avec `mix-blend-mode: multiply` comme sur ordinateur), soit `margin-top: .5rem`. Vérifier à 768, 375 et 360.

## FIX-12 · léger · 0 $ · le lien de section en cours

**Quoi.** Après une remontée en haut, « Réalisations » reste souligné sur la couverture (`remontee-rapide-1440.png`). « Honoraires » reste souligné pendant le portrait et les témoignages, et « Journal » pendant les questions et le formulaire.

**Où.** `index.html` l. 358-367.

**Comment.** Observer aussi `#couverture`, `#atelier`, `#temoignage`, `#questions` et `#ecrire`, et retirer `aria-current` de tous les liens quand la section active n'est pas dans la nav.

## FIX-13 · léger · génération ≈ 0,03 $ (facultatif) · un enduit qui fait ciment

**Quoi.** Sur l'image générée du chantier de Saumane, le premier enduit est gris-vert : un maçon y verrait du ciment.

**Où.** `images/journal-chantier-900.webp`.

**Comment.** Reprendre le prompt P2 de `medias-a-generer.md` en ajoutant « fresh lime render, warm off-white to pale beige, not grey ».

## FIX-14 · léger pour 85, bloquant pour 90 · client

Ce que seule Hélène Garcin peut fournir :
- les photos de ses vrais chantiers, dont un intérieur habité ;
- des avis signés, avec accord écrit ;
- le nombre réel de bâtisses (64 est provisoire) ;
- le numéro d'inscription à l'Ordre, le SIRET et l'assureur ;
- l'e-mail, et le téléphone pour le pied de page ;
- l'écart de prix assumé face à un maître d'œuvre ;
- la validation de la promesse « habitable toute l'année » (isolation, chauffage, ventilation chiffrés au cas par cas).

Tout cela va dans « Ce qui manque encore ».

# Boucle persona, tour 1 : refuge de la Vire

- Date : 5 novembre 2026
- Page testée : http://localhost:4320/atelier/skills/maquette/templates/exemples/hebergement-cretes/index.html
- Regard indépendant : je n'ai pas lu les rapports du relecteur. J'ai lu seulement `brief.md` (qui tient lieu de cadrage et de marque) et `medias-a-generer.md`.
- Navigateur : Chrome (Playwright headless), WebGL actif, puis désactivé.
- Captures : `persona/tour-1-captures/`. Attention : le dossier `persona/captures/` contient des captures d'un **autre exemple** (pompes à chaleur du Luberon, `artisan-calorie`), écrites là par un autre agent. Ce ne sont pas les miennes et je n'y ai pas touché.
- Une coupure du serveur (ERR_CONNECTION_RESET sur `paysage-page.js`, puis sur trois `vue-*.webp`) a été vue deux fois. Après rechargement, la console était vide. Je ne la compte pas comme une erreur.

Ce fichier regroupe les trois livrables : le rapport de test, les notes et le plan de corrections.

---

## 1. Rapport de test

Je suis Margaux Ferrand, gardienne de la Vire. Je teste la page avec Léa et Tom en tête : ils ont 32 ans, sont à Grenoble, regardent sur leur téléphone le soir et leur grande question est « reste-t-il de la place samedi ? ».

### 1.1 Les 5 premières secondes

- **1440** (`01-1440-premier-ecran.png`) : le paysage est à l'aube, au-dessus de la brume. Le titre « Dormir à 2 140 m, au-dessus de la brume. » est énorme. Le chapeau dit 30 lits, Belledonne, 2 h 30 de marche et « demi-pension dès 58 € », avec un bouton jaune « Voir les dates libres ». En 5 secondes, on sait ce que c'est, où c'est, combien ça coûte et quoi faire. Aucun téléphone dans la barre. C'est réussi.
- **375** (`20-375-premier-ecran.png`) : même lecture, et le bouton reste visible sans défiler. La pastille « Figer la brume » est collée sous la barre de navigation, à droite, et elle y reste sur **toutes** les sections (voir 1.6).
- **768 et 1280** (`20-768-premier-ecran.png`, `20-1280-premier-ecran.png`) : rien à signaler.

### 1.2 Défilement complet (1440)

| Capture | Ce que j'ai vu |
|---|---|
| `02-1440-altitude.png` | « La route s'arrête. Le sentier commence. » avec quatre chiffres (2 140 m, 760 m, 2 h 30, 30 lits). La moitié basse de l'écran est vide : il n'y a que de la brume. |
| `03` à `06-1440-journee-*.png` | **Le moment signature fonctionne.** La section est épinglée, le ciel passe de l'aube au coucher, la grande horloge tourne et la barre jaune avance. Mais l'horloge ne suit pas la carte : elle affiche 19 h 05 sous la carte de 18 h 40, puis 21 h 03 sous celle de 20 h 47. Surtout, un lever à **7 h 52** et un coucher à **20 h 47** ne peuvent pas tomber le même jour (voir FIX-2). |
| `07-1440-nuits.png` | Quatre cartes avec leur prix (24/58, 29/63, 32/66, 45/79 €), conformes au brief, et un bouton « Choisir ». Les visuels sont **des fenêtres sur le paysage**, jamais un lit. À la question « on dort avec 14 inconnus ? », l'image ne répond pas. |
| `08-1440-table.png` | Le menu est bon (velouté, diots et polenta, tarte aux myrtilles) et Bastien est nommé. Les photos font restaurant : un velouté décoré au trait de crème et au romarin, et une assiette dressée par une main dans une salle de bistrot. Elles ne montrent pas la grande table d'un refuge. |
| `09-1440-saisons.png`, `35-1440-hiver.png`, `36-1440-encre.png` | Le bouton « Montrer l'hiver » marche, la peinture à la souris aussi. Mais l'été est déjà gris-blanc, avec un sommet enneigé : l'écart entre les deux saisons se voit à peine. Et le titre dit « Le même sentier » alors qu'aucun sentier n'est dessiné. |
| `10-1440-venir.png` | Le profil est juste : j'ai recalculé le Pré Long à 1 380 m, le lac à 1 920 m vers 4,4 km et le refuge à 2 140 m sur 6,2 km. Le trait rouge se dessine au défilement. Les quatre étapes sont claires. |
| `11-1440-avis.png` | Trois avis qui reprennent exactement les trois personas (Léa et Tom, le club de Voiron, Hélène, 61 ans). Le « 4,8 / 5 · 312 avis » n'a pas de source. |
| `12-1440-gardiens.png` | Le titre nomme Margaux et Bastien, mais **on ne voit personne**. Le refuge dessiné ressemble à un chalet en planches (lignes horizontales régulières), pas à une maison de pierre au toit de lauzes. |
| `13-1440-dates.png` | Les deux colonnes sont là. Le calendrier ouvre directement sur décembre 2026 (première date gardée, le 19) et le total vaut 232 € (2 × 2 × 58, c'est juste). Sous le total, la colonne gauche est vide sur 400 px. |
| `14-1440-questions.png`, `37-1440-faq-ouverte.png` | Quatre questions courtes. Rien sur la douche, l'eau ou les draps au dortoir, au-delà du sac à viande. |
| `15-1440-final.png` | « Ce soir, la lampe reste allumée », puis « Il reste 12 lits pour le samedi 19 décembre. » Le bouton « Réserver mes nuits » est **déformé** : c'est un ovale jaune de 135 px de haut au lieu d'une pilule de 52 px. Même chose à 375 (`21-375-11-final.png`). |
| `16-1440-pied.png` | Coordonnées, périodes de garde, plan du site, e-mail, Instagram, liens légaux et mention de l'exemple fictif. C'est complet. |

### 1.3 Le parcours de l'acheteur

- Le bouton du hero « Voir les dates libres » mène à `#dates` : la section arrive à 80 px du haut, sous la barre (`30-1440-apres-cta-hero.png`).
- « Choisir » sur la carte de la chambre double La Vire : le formulaire passe bien sur la chambre double, avec 2 personnes, et le récapitulatif se met à jour (`31-1440-apres-choisir-double.png`).
- **Le président du club**, 12 personnes au dortoir pour 1 nuit : le calendrier saute de lui-même le 19 et le 21 décembre (pas assez de lits) et propose le mardi 22 (`32-1440-club-12.png`). C'est honnête et malin. Si on tape 20 personnes, le champ redescend à 14. En revanche, aucun **prix de groupe** n'apparaît.
- **Léa et Tom**, Le Lauzet, 2 personnes, 1 nuit, juillet 2027, avec le pique-nique : le total vaut **150 €** = 2 × (66 + 9), c'est juste (`33-1440-lea-tom-juillet.png`). Les samedis de juillet affichent 3 à 4 lits libres, mais ce nombre n'existe **que dans l'aria-label** : à l'écran, il n'y a qu'un point vert ou jaune. Pour la première objection (la disponibilité), c'est trop discret.
- L'envoi à vide affiche « Il manque votre prénom, votre nom, un e-mail valide. » Avec seulement le prénom vide, le message est juste (« Il manque votre prénom. ») mais le champ **Nom** passe aussi en `aria-invalid="true"` : c'est un bug (voir FIX-10).
- L'envoi complet donne « C'est noté, Léa : … Exemple de démonstration, aucune demande n'est envoyée. » (`34-1440-confirmation.png`).
- Le montant des arrhes (30 %) n'est jamais chiffré : le total est affiché, mais pas « dont 45 € à payer maintenant ».
- Concordance d'un bloc à l'autre : les prix sont identiques entre les cartes et le total, et la saison du calendrier est cohérente avec le pied de page et la section Saisons. Le « 12 lits le samedi 19 décembre » de l'appel final est la somme des quatre chambres, ce qui est cohérent avec le calendrier chambre par chambre.

### 1.4 Clavier (45 tabulations depuis le haut)

Tout est atteint, dans l'ordre logique : lien d'évitement, « Figer la brume », logo, 4 liens, Réserver, bouton du hero, les 4 « Choisir », Montrer l'hiver, les champs, les flèches du mois, les jours, la formule, l'identité, l'envoi, les 4 questions, l'appel final, le pied de page. Le focus est un anneau jaune de 3 px, **visible à chaque pas**, et aucun élément n'est hors écran ni transparent (`40-clavier-tab-*.png`). Seul défaut : chaque jour libre est une tabulation, soit 13 pas pour traverser décembre et jusqu'à 31 en été.

### 1.5 Mouvement réduit et sans WebGL

- **Mouvement réduit** (`50-reduit-hero.png`, `51-reduit-*.png`) : plus d'épinglage (la page fait 11 789 px au lieu de 13 609) et la journée devient **quatre cartes illustrées** côte à côte, ce qui est très bien. Aucun texte ne reste invisible et la pastille « Figer la brume » est masquée. La page reste complète.
- **Sans WebGL** (`60-sansgl-hero.png`, `61-sansgl-journee.png`, `62-sansgl-avis.png`) : le repli en images fixes prend le relais, la journée défile quand même et la console est propre.

### 1.6 Téléphone (375 et 360), tablette (768)

- Aucun débordement horizontal. Seules les cartes des nuits dépassent, et c'est voulu : c'est un rail qu'on fait glisser, la carte suivante est visible en partie (`21-375-nuits-cartes.png`, `22-768-03-nuits.png`).
- Aucun mot de titre n'est coupé, à aucune taille (contrôle par plages de texte).
- Le menu plein écran est propre (`21-375-menu.png`). La barre « Voir les dates libres » apparaît en bas pendant le défilement et disparaît sur `#dates`, `#final` et le pied de page.
- Trois défauts :
  - la pastille « Figer la brume » flotte en permanence sous la barre de navigation, par-dessus les photos et les cartes (`21-375-04-table.png`, `21-375-nuits-cartes.png`) ;
  - le menu déroulant « Où dormir » est tronqué en « Les Bouquet » (`21-375-09-dates.png`) ;
  - le bouton final est déformé (`21-375-11-final.png`).
- Sur téléphone, le total est placé **au-dessus** du formulaire : quand on touche au calendrier, on ne le voit plus changer.

### 1.7 L'œil du métier (ce que la gardienne voit en trois secondes)

1. **Les horaires de la journée** : un lever à 7 h 52 tombe fin septembre ou en hiver, un coucher à 20 h 47 tombe vers la mi-août. Aucun jour n'a les deux. N'importe quel habitué le remarque.
2. **« Ce soir, la lampe reste allumée »** : ce soir, le 5 novembre, le refuge est fermé jusqu'au 19 décembre. La phrase suivante le dit d'ailleurs à demi-mot. Le titre ment pendant l'intersaison.
3. **« Ce qui monte à dos d'homme »** : un refuge à 2 140 m est ravitaillé par hélicoptère en début de saison. Monter le pain à pied, oui ; tout le reste à dos d'homme, non. Formule à vérifier avec les vrais gardiens.
4. **L'hiver** : « 2 h 30 de montée régulière » est écrit pour tout le monde. En raquettes, avec 760 m de dénivelé, comptez 3 h à 3 h 30. Il n'y a pas un mot sur la neige ou le risque d'avalanche pour Hélène, qui fait sa première sortie en raquettes.
5. **Le dessin du refuge** : le brief dit pierre et lauzes, mais le symbole se lit comme un chalet en planches.
6. **Le confort** : la douche (ou son absence), l'eau et les toilettes ne sont nommées nulle part. C'est la question n° 3 de l'acheteur.
7. Ce qui est juste et me fait plaisir : le vocabulaire (combe, lauzes, crête, sac à viande, chaussons à l'entrée, arrivée avant 18 h, soupe à 19 h), le profil du sentier exact et des prix réalistes pour Belledonne.

### 1.8 Densité (conventions § 11, à 1440)

**736 mots · 12 sections · 15,3 écrans.** Tout est dans la fourchette (500 à 800 mots, 10 à 13 sections, 12 à 18 écrans).

| Bloc | Mots |
|---|---|
| Barre de navigation et évitement | 14 |
| `arrivee` | 32 |
| `altitude` | 21 |
| `journee` | 24 |
| `nuits` | 128 |
| `table` | 49 |
| `saisons` | 34 |
| `venir` | 75 |
| `avis` | 61 |
| `gardiens` | 32 |
| `dates` | 139 |
| `questions` | 33 |
| `final` | 18 |
| pied de page | 76 |

Aucun bloc ne dépasse 3 phrases. Toutes les sections attendues par le brief sont présentes.

### 1.9 Console

Elle est vide après rechargement, dans tous les cas (1440, 1280, 768, 375, 360, mouvement réduit, sans WebGL).

---

## 2. Notes

### 2.1 Les 10 points

| # | Point | Verdict | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK | densité § 1.8 | 736 mots, 12 sections, 15,3 écrans, toutes les sections du brief |
| 2 | Catalogue | OK | `07-1440-nuits.png` | 4 chambres avec prix et « Choisir » qui remplit le formulaire |
| 3 | Titres et promesse | OK | `01-1440-premier-ecran.png` | Promesse concrète, titres de 4 à 8 mots ; réserve sur « Ce soir, la lampe… » (FIX-5) |
| 4 | Typographie d'affichage | OK | `01`, `20-375` | Aucune lettre collée, aucun titre coupé |
| 5 | Barre de navigation | OK | `01`, `21-375-menu.png` | Logo, 4 liens, Réserver, aucun téléphone, menu mobile propre |
| 6 | Bloc d'action | OK | `13-1440-dates.png` | Deux colonnes ; mais vide sous le total (FIX-6) |
| 7 | Hero équilibré | OK | `01`, `20-1280` | Texte, paysage et action se répondent |
| 8 | Responsive | OK pour les titres | `20-*`, `21-375-*` | Les titres tiennent partout ; hors titres : pastille, menu déroulant tronqué et bouton déformé (FIX-1, 8, 9) |
| 9 | Images | **Pas OK** | `07`, `08`, `12` | Aucun lit dans les chambres, aucun visage chez les gardiens, des photos de table qui font restaurant |
| 10 | 3D produit | sans objet | — | Le WebGL est un paysage, pas un produit |

### 2.2 Grille sur 100 (niveau-agence § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | 13 | Reconnaissable sans le logo : nuit ardoise, jaune balise, trait rouge, typographie large. Fidèle à la charte du brief. |
| Images | 15 | 10 | Le paysage en code est beau. Mais les chambres sans lit, les gardiens sans visage, le refuge en planches et la table de restaurant affaiblissent la crédibilité au-delà du simple « provisoire ». |
| Mise en page | 15 | 12 | La composition immersive est tenue, avec des sections opaques pour « rentrer au chaud ». Défauts : moitié vide dans `altitude`, colonne vide sous le total, bouton final déformé. |
| Mouvement | 10 | 8 | La signature marche, le mouvement réduit et le repli sans WebGL sont exemplaires. L'horloge se décale des cartes et le contraste été/hiver est faible. |
| Clarté en 5 s et action | 10 | 9 | Quoi, où, combien et quoi faire en un écran. |
| Densité | 5 | 5 | 736 mots, 12 sections, 15,3 écrans. Aucune pénalité. |
| Preuves et objections | 10 | 7 | La disponibilité, le prix total et la météo sont traités. Manquent : le nombre de lits libres visible, le confort (douche, eau), les arrhes chiffrées, un prix de groupe et la source des 312 avis. |
| Textes | 10 | 8 | Bonne voix, pas une phrase creuse. Mais des erreurs de métier : les horaires du lever et du coucher, « ce soir » pendant la fermeture, « à dos d'homme », la durée en raquettes. |
| Mobile, accessibilité, légèreté | 10 | 8 | Le clavier est parfait et le focus visible. La pastille couvre le contenu sur téléphone, le menu déroulant est tronqué et il y a le bug `aria-invalid`. |
| **Total** | **100** | **80** | |

- **Note sur 10 : 8.**
- **Seuil applicable : 85** (maquette avec médias provisoires).
- **Atteignable sans le vrai client : environ 87.** Il suffit d'appliquer les FIX à 0 $ : bouton final, horaires, « ce soir », arrhes, lits visibles, confort, pastille, menu déroulant, dessin du refuge et coupe du dortoir en code. 90 et plus demandent les vraies photos (chambres, gardiens, table) et les vrais avis.
- Phrase du client : « La montagne, vous l'avez comprise, et la réservation me fait gagner mes soirées. Mais un habitué verra qu'il n'y a jamais eu de lever à 8 h et de coucher à 21 h le même jour, et Léa ne sait toujours pas à quoi ressemble un lit chez nous. »

**Verdict : Pas encore.** Raison principale : la page ne montre ni un lit ni les gardiens, et elle contient des erreurs de métier visibles (horaires du soleil, « ce soir » alors que le refuge est fermé).

---

## 3. Plan de corrections

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | majeur | 0 $ | Bouton final étiré en ovale (1440 et 375) |
| FIX-2 | majeur | 0 $ | Horaires de la journée impossibles, et horloge décalée des cartes |
| FIX-3 | majeur | 0 $ maintenant, puis génération (~0,25 $) ou client | Chambres sans lit : l'objection du dortoir reste sans réponse |
| FIX-4 | majeur | 0 $ pour le dessin, puis client | Gardiens invisibles ; le refuge dessiné ressemble à un chalet en planches |
| FIX-5 | moyen | 0 $ | « Ce soir, la lampe reste allumée » alors que le refuge est fermé |
| FIX-6 | moyen | 0 $ | Arrhes non chiffrées ; vide sous le total ; total hors de vue sur téléphone |
| FIX-7 | moyen | 0 $ (contenu à confirmer par le client) | Confort non traité (douche, eau, draps) ; aucun prix de groupe |
| FIX-8 | moyen | 0 $ | La pastille « Figer la brume » couvre le contenu sur téléphone |
| FIX-9 | moyen | 0 $ | Menu déroulant « Où dormir » tronqué à 375 |
| FIX-10 | léger | 0 $ | `aria-invalid` posé à tort sur Nom quand seul le prénom manque |
| FIX-11 | moyen | 0 $ | Le nombre de lits libres n'est pas visible à l'écran |
| FIX-12 | léger | 0 $ | Hiver : durée en raquettes et neige non dites |
| FIX-13 | léger | 0 $ | Moitié vide sous les chiffres de `altitude` à 1440 |
| FIX-14 | léger | 0 $ | Été et hiver trop proches ; aucun sentier visible |
| FIX-15 | léger | client | Source des avis (4,8 / 312), photos réelles de la table, « à dos d'homme » |
| FIX-16 | léger | 0 $ | Calendrier : une tabulation par jour |

### FIX-1 · Bouton final déformé

- **Quoi** : `.final { grid-template-rows: 1fr auto }` donne toute la hauteur à `.final-texte`, qui est une grille sans `align-content`. Ses lignes s'étirent, et le lien `.bouton` avec elles (135 px de haut à 1440). Captures `15-1440-final.png`, `21-375-11-final.png`.
- **Où** : `cretes.css`, ligne 336 (`.final-texte`).
- **Comment** : ajouter `align-content: center;` à `.final-texte`, ou `.final .bouton { align-self: center; }`.

### FIX-2 · Horaires du soleil

- **Quoi** : un lever à 7 h 52 et un coucher à 20 h 47 ne tombent jamais le même jour. L'horloge affiche aussi 19 h 05 sous la carte de 18 h 40, et 21 h 03 sous celle de 20 h 47.
- **Où** : `index.html`, lignes 103 à 108 (horloge et 4 `.moment`), et la valeur de départ « 7 h 52 » de la ligne 84. L'interpolation de l'horloge est dans `paysage-page.js` (`data-horloge`).
- **Comment** : choisir une seule journée, par exemple mi-juillet : lever **6 h 15**, pique-nique 12 h 30, crête orange **20 h 40**, coucher **21 h 20**, soupe à 19 h 00. Puis faire passer l'horloge exactement par l'heure de la carte active, en interpolant entre les heures des cartes plutôt que sur une plage linéaire.

### FIX-3 · Montrer un lit

- **Quoi** : les quatre cartes montrent une fenêtre, jamais un lit. Or la question « on dort avec 14 inconnus ? » est l'objection n° 3. Capture `07-1440-nuits.png`.
- **Où** : `cretes.js`, lignes 11 à 26 (champ `vue`), et le gabarit de carte des lignes 61 à 71.
- **Comment** :
  - **À 0 $, tout de suite** : sous chaque fenêtre, ajouter une petite coupe en SVG de la chambre (couchettes sur deux niveaux, rideaux, casiers pour le dortoir ; lit de 140 pour La Vire), dans le même trait que le profil du sentier. Ajouter aussi une donnée chiffrée : « couchettes de 80 cm, rideau occultant ».
  - **Ensuite** : générer les 4 vues intérieures déjà décrites dans `medias-a-generer.md` (environ 0,25 $, avec l'accord de l'utilisateur), ou mieux, les vraies photos.

### FIX-4 · Les gardiens et leur refuge

- **Quoi** : le titre nomme Margaux et Bastien, mais l'image montre un paysage et une cabane. Le symbole `#refuge` se lit comme des planches horizontales régulières. Capture `12-1440-gardiens.png`.
- **Où** : `index.html`, lignes 198 à 203 (figure) et 302 à 312 (`symbol#refuge`, `.r-pierres`).
- **Comment** :
  - **À 0 $** : redessiner `.r-pierres` en joints de pierre irréguliers (décalés, de longueurs variables), donner des lauzes en écailles au toit, et poser deux silhouettes sur la terrasse.
  - **Ensuite** : le portrait réel des gardiens, la priorité n° 1 de `medias-a-generer.md` (client).

### FIX-5 · « Ce soir » pendant la fermeture

- **Quoi** : le 5 novembre, le refuge est fermé, et pourtant le titre dit « Ce soir, la lampe reste allumée ».
- **Où** : `cretes.js`, lignes 225 à 232 ; `index.html`, ligne 262.
- **Comment** : si `ouvert(aujourdhui)` est faux, remplacer le titre par « On rallume la lampe le 19 décembre » (date de la prochaine ouverture, calculée) et garder la phrase des lits. Si le refuge est ouvert ce soir, garder le titre actuel.

### FIX-6 · Arrhes, colonne gauche, total sur téléphone

- **Quoi** : le total s'affiche sans dire ce qu'on paie maintenant. Sous le total, il reste 400 px vides à 1440. Sur téléphone, le total est au-dessus du formulaire, donc hors de vue pendant qu'on choisit.
- **Où** : `cretes.js`, `majTotal`, lignes 179 à 187 ; `index.html`, lignes 212 à 217 ; `cretes.css`, ligne 277 et suivantes.
- **Comment** :
  - sous le total, ajouter « dont 45 € d'arrhes (30 %), le reste au refuge, remboursées si on ferme pour la météo » ;
  - remplir la colonne avec une ligne « 7 lits libres ce samedi aux Bouquetins » (voir FIX-11) et rendre `.dates-gauche` collante (`position: sticky`) à 1440 ;
  - sur téléphone, répéter le total dans le bouton d'envoi : « Demander ces nuits · 232 € ».

### FIX-7 · Confort et groupes

- **Quoi** : la douche, l'eau et les toilettes ne sont nommées nulle part, et le président du club ne trouve aucun prix de groupe.
- **Où** : `index.html`, FAQ des lignes 251 à 256 ; carte du dortoir dans `cretes.js`, ligne 12.
- **Comment** :
  - ajouter une 5ᵉ question : « Y a-t-il une douche ? », avec une réponse courte (par exemple : « Une douche chaude à jetons, 3 €. L'eau vient de la source : on la ménage. »). La règle réelle est à confirmer par le client ;
  - ajouter sur la carte du dortoir « Groupes : le dortoir entier se réserve » ; le tarif de groupe est fourni par le client.

### FIX-8 · Pastille « Figer la brume » sur téléphone

- **Quoi** : sous 768 px, la pastille est fixée sous la barre de navigation et couvre les images et les cartes sur toute la page (`21-375-04-table.png`).
- **Où** : `cretes.css`, ligne 62.
- **Comment** : sur téléphone, la masquer hors des sections « fenêtre » (`arrivee`, `altitude`, `journee`). Ou bien la placer dans le hero seulement, en bas à gauche, au-dessus de la barre d'action.

### FIX-9 · Menu déroulant tronqué

- **Quoi** : à 375, le menu déroulant affiche « Les Bouquet ».
- **Où** : `cretes.css`, règles de `.reservation .choix`.
- **Comment** : sous 480 px, donner toute la largeur à « Où dormir » (`grid-column: 1 / -1`) et mettre « Personnes » et « Nuits » côte à côte en dessous.

### FIX-10 · `aria-invalid` sur Nom

- **Quoi** : « votre prénom ».includes(« nom ») vaut vrai, donc Nom est marqué invalide alors que seul le prénom manque.
- **Où** : `cretes.js`, ligne 215.
- **Comment** : tenir un objet `{ prenom: !ok, nom: !ok, email: !ok }` et poser `aria-invalid` à partir de lui, au lieu de chercher dans les libellés.

### FIX-11 · Lits libres visibles

- **Quoi** : l'objection n° 1 est la disponibilité. Le nombre de lits libres existe (dans l'`aria-label` de chaque jour), mais l'écran n'affiche qu'un point de couleur.
- **Où** : `cretes.js`, lignes 171 à 175 (`dessinerCalendrier`) et 184 (récapitulatif).
- **Comment** : afficher le nombre en petit dans chaque case libre (« 7 ») et l'écrire dans le récapitulatif : « 7 lits libres le samedi 19 décembre ».

### FIX-12 · L'hiver, dit par la gardienne

- **Quoi** : « 2 h 30 de montée » est donné pour toute l'année. Rien n'est dit sur la neige pour une première sortie en raquettes.
- **Où** : `index.html`, ligne 151 (hiver) et ligne 178 (étape 3).
- **Comment** : écrire « 2 h 30 l'été, 3 h 30 en raquettes » à l'étape 3, et ajouter dans la carte Hiver « L'avant-veille, Margaux vous dit l'état de la neige et du risque d'avalanche. »

### FIX-13 · Vide dans `altitude`

- **Quoi** : à 1440, la moitié basse de l'écran est de la brume vide (`02-1440-altitude.png`).
- **Où** : `cretes.css`, règles de `.altitude`.
- **Comment** : centrer le bloc titre et chiffres verticalement, ou réduire la section à 75svh.

### FIX-14 · Été et hiver

- **Quoi** : l'été est déjà gris avec un sommet enneigé, et aucun sentier n'apparaît alors que le titre en parle (`09`, `35`).
- **Où** : `outils/plans.cjs` (rendu de `saison-ete-1400.webp`), puis `index.html`, ligne 141.
- **Comment** : rendre l'été plus vert et sans neige sur les sommets, et y tracer le sentier en rouge. Sinon, renommer le titre « La même combe, deux saisons ».

### FIX-15 · Ce que seul le client peut fournir

- La source et le lien des avis (« 4,8 / 5 · 312 avis » : sur quelle plateforme ?).
- Les photos réelles de la table : velouté servi dans la soupière, grande table en mélèze.
- La confirmation de la formule « à dos d'homme » (héliportage ?).
- Le tarif de groupe et la règle de la douche.

### FIX-16 · Calendrier au clavier

- **Quoi** : chaque jour libre est un arrêt de tabulation, jusqu'à 31 pas par mois.
- **Où** : `cretes.js`, lignes 175 et 195 à 200.
- **Comment** : `tabindex="0"` sur le jour choisi seulement, `-1` sur les autres, et navigation entre les jours avec les flèches.

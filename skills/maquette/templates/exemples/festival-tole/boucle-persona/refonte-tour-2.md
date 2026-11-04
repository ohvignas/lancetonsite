# Tôle : boucle persona, refonte, tour 2

- **Date** : 4 novembre 2026
- **Page testée** : http://127.0.0.1:4358/festival-tole/index.html (servie par un petit serveur Node statique, arrêté à la fin du test). La version testée a 12 sections, dont la nouvelle section « équipe ».
- **Navigateur** : Google Chrome piloté par Playwright 1.58. Tailles testées : 1440 × 900, 1280 × 800, 1280 × 720, 768 × 1024, 375 × 812, 375 × 667 et 360 × 740, en mouvement normal puis réduit.
- **Regard indépendant** : je n'ai pas lu les rapports du relecteur. J'ai lu `brief.md`, mon plan du tour 1 (`refonte-tour-1.md`), la section « Tour 1 de la refonte : corrections » de `NOTES.md`, les règles du plugin (`conventions.md` § 11, `niveau-agence.md` § 6, `agents/client-persona.md`) et les retours de l'utilisateur du 4 novembre.
- **Captures** : `boucle-persona/refonte-tour-2-captures/` (les noms ci-dessous sont relatifs à ce dossier).
- **Seuil** : 85 / 100 (maquette aux médias provisoires) et verdict « Oui ».

Je parle en Nadia Ferrand, directrice de l'association Tôle, qui signe le devis. Pour le parcours d'achat, je parle en Yanis, 24 ans, qui vient de Lyon avec quatre amis.

---

## Partie 1 : les FIX du tour 1, un par un

| FIX | Verdict | Ce que j'ai vérifié |
|---|---|---|
| FIX-1 interligne des titres | **Fait** | Plus aucune ligne de titre ne touche la suivante, à aucune taille. Contrôle à l'œil en ×2 : TÔLE et NUITS du hero (`zoom-375-titre-hero.png`, `zoom-768-titre-hero.png`, `zoom-360-titre-hero.png`), ANNONCÉS (`zoom-1440-titre-programme.png`), BÉNÉVOLES et SALARIÉS (`zoom-360-titre-equipe.png`), ÉCOUTER et RALLUME. Il reste un défaut que j'avais manqué au tour 1 : le grand « TÔLE » du pied de page (voir FIX-13) |
| FIX-2 pluie dans la halle | **Fait** | `public-1` a disparu de la page. `public-5` montre une foule sèche sous les faisceaux (`bureau-09-public.png`). En revanche, rien ne montre « la pluie dehors » (voir FIX-16) |
| FIX-3 retour du panier | **Fait** | Sur téléphone, la barre « Pass trois nuits ajouté · Panier 79 € » s'affiche à 710–800 px sur 812, et le bouton passe à « Ajouté ✓ » (`mobile-parcours-02-ajout-flash.png`). À 1440, la barre est à 786–876 px (`parcours-03-groupe-flash-1440.png`). « Voir le panier » amène le titre du panier à 72 px, sur les deux tailles. C'est exactement ce que je demandais |
| FIX-4 manifeste en 3 phrases | **Fait** | Plus aucun bloc ne dépasse trois phrases : le script n'en trouve aucun, et deux blocs en ont exactement trois (le manifeste et la garantie de l'appel final) |
| FIX-5 contradictions | **Fait** | Le tram est « reconduit, comme en 2026 », ce qui s'accorde avec l'avis de Mehdi. « Brise-Glace mène le vendredi ». Les Frigos ont disparu. Dalle Brute est en halle B, Ondes Courtes en halle A, et la halle A est « la grande scène des trois soirs ». Il reste un détail pour Hugo (FIX-18) |
| FIX-6 billetterie sans image | **Fait** | La photo comble la colonne de gauche, qui finit maintenant à la hauteur du panier (`bureau-10-pass.png`, `bureau-11-pratique.png`). Mais c'est une main en cornes sur fond de bokeh, avec la légende « Halle A, juillet 2026 » (FIX-15, FIX-16) |
| FIX-7 photos à contresens | **À moitié** | Brise-Glace est juste : texte et photo parlent tous deux de claviers et de guitares. Mais la nouvelle photo de Furnace Club montre **une main du public**, pas l'artiste (`bureau-05-artistes.png`). Les photos du journal ont des textes alternatifs honnêtes, mais ce ne sont toujours pas mes halles. La mosaïque est passée à deux photos, toujours deux foules aux bras levés |
| FIX-8 entre 4 h 30 et 5 h | **À moitié** | La phrase est là : « Après, Châteaucreux est à 25 minutes à pied : premier TER pour Lyon à 5 h 12. » Mais la halle C ferme à 5 h. Celui qui reste jusqu'à la clôture de Furnace Club arrive à la gare à 5 h 25 et rate le train (FIX-17) |
| FIX-9 galerie des artistes | **Fait sur ordinateur, à moitié sur téléphone** | À 1440, les tabulations 13 à 18 montrent chacune un « Écouter un extrait » entièrement à l'écran ; à 768, ce sont les tabulations 9 à 14 (`clavier-1440-tab-13.png` à `-18`). Sur téléphone, la première fiche est à 16 px, et la galerie se décale bien quand on la fait glisser. Mais au clavier, à 375, une fiche sur deux reste à moitié hors écran (FIX-19) |
| FIX-10 qui on est | **Fait (bloc provisoire)** | Une section 6 a été ajoutée : « Trois salariés, 180 bénévoles, une association » (`bureau-08-equipe.png`). La photo montre des musiciens aux balances, pas l'équipe. C'est au client de fournir la vraie |
| FIX-11 microtypographie | **Fait** | « 1<sup>er</sup> juillet » est en exposant, le message s'accorde (« Pass une nuit (samedi) ajouté »), l'espace avant le prix est égale dans « PRENDRE MON PASS — 79 € », et tous les prix sont tirés de `TOLE.pass` |
| FIX-12 médias réels | Non (client) | Rien à faire de plus de ce côté sans le client |

Bilan : neuf FIX faits, deux à moitié, un qui attend le client. Le travail a été fait sérieusement.

---

## Partie 2 : rapport de test

### 1. Les 5 premières secondes

**Ordinateur, 1440 × 900** (`00-premier-ecran-1440x900.png`). La vidéo de la halle tourne. Les quatre repères, de gauche à droite : 02—04.07.2027, Saint-Étienne, 79 €, 4 h 30. Le titre « TROIS NUITS SOUS LA TÔLE. » prend toute la largeur. En dessous, le chapo et le bouton « PRENDRE MON PASS — 79 € ». En cinq secondes, je sais quoi, où, quand, combien et comment on rentre. Le hero est composé, sans trou. Le « J−241 » ne clignote pas.

**1280 × 800 et 1280 × 720** (`00-premier-ecran-1280x720.png`) : le titre est sous l'en-tête et le bouton à 600–652 px. Tout tient dans le premier écran.

**Téléphone** (`00-premier-ecran-375x812.png`, `-375x667.png`, `-360x740.png`) : on voit le prix et le dernier tram sans défiler. Le bouton est à 547–599 px, même sur un écran de 667. Le chapeau de TÔLE ne touche plus NUITS. C'était mon reproche numéro un, il est réglé.

**768** (`00-premier-ecran-768x1024.png`) : la composition tient. Le titre est sur deux lignes, avec des espaces entre les mots très serrés, mais lisibles.

### 2. Le défilement complet

**1440, lent** : 15 captures, de `bureau-01-manifeste.png` à `bureau-15-footer.png`.

- **Manifeste** (`bureau-01`) : les mots passent du gris à l'encre au fil du défilement. La signature marche toujours. La halle B vide est juste.
- **Programme** (`bureau-03`) : trois colonnes, douze concerts, et une bande défilante qu'on peut mettre en pause. La photo du samedi est plus basse que ses voisines : 280 px contre 292, parce que la colonne du milieu est plus étroite. « SAMEDI 3 » et « RAP » tombent donc 11 px plus haut que les deux autres soirs. Le même décalage se voit dans le journal (`bureau-12-journal.png`) (FIX-20).
- **Artistes** (`bureau-04-artistes.png`, `bureau-05-artistes.png`, `bureau-06-lieu.png`) : la galerie épinglée fait maintenant un vrai chemin, et la dernière fiche finit dans l'écran. La fiche de Brise-Glace a une photo plus grande que les autres (358 px contre 341), si bien que son nom tombe plus bas (FIX-20). **La fiche de Furnace Club, qui ferme mon festival, montre une main levée du public** et pas l'artiste.
- **Le lieu** (`bureau-06`, `bureau-07`, `lieu-compteurs-fin.png`) : les compteurs finissent bien sur « 4 200 » et « 12 000 », avec l'espace. Les trois halles en photo restent mon bloc préféré.
- **Équipe** (`bureau-08-equipe.png`) : le bloc est propre et le titre est fort. La photo montre un violoncelliste vu d'en haut, avec la légende « avec l'équipe plateau ». Je ne vois aucun membre de l'équipe plateau.
- **Public** (`bureau-09-public.png`) : le titre « 11 800 festivaliers en 2026, la pluie dehors » est suivi de deux photos de foule aux bras levés, puis de trois avis. Il ne pleut plus dedans, mais **rien ne montre le dehors mouillé**, alors que c'est la promesse du titre.
- **Pass** (`bureau-10-pass.png`) : deux colonnes, les prix sont lisibles, le pass trois nuits est en minium et « La troisième nuit revient à 15 € » est juste (79 − 2 × 32). Le vide de 450 px du tour 1 a disparu.
- **Pratique** (`bureau-11-pratique.png`) : photo du tram de nuit, accès, retour, accessibilité, pluie.
- **Journal** (`bureau-12-journal.png`) : trois cartes datées. L'article « Le tram de nuit reconduit » est illustré par un groupe sur scène, pas par un tram.
- **FAQ, appel final** (`bureau-13-faq.png`, `bureau-14-footer.png`) : trois questions. « LA SUITE DE L'AFFICHE, LE / 15 AVRIL » laisse « LE » seul en bout de ligne, à 1440 comme à 375.
- **Pied de page** (`bureau-14-footer.png`, `pied-marque-1440.png`, `pied-marque-1280.png`) : **le chapeau du grand « TÔLE » minium dépasse dans l'aplat minium de l'appel final, et sa pointe disparaît, minium sur minium.** On voit un Ô dont l'accent est coupé net. Le défaut est là à 1440 et à 1280, et dans les deux modes de mouvement (`pied-marque-1440-reduit.png`). À 768, l'accent frôle le filet sans le passer (`pied-marque-768.png`). À 375 et 360, il est entier (`pied-marque-375.png`). Je vérifie dans ma capture du tour 1 (`captures-refonte-tour-1/bureau-12-FOOTER.png`) : le défaut y était déjà, et je l'ai laissé passer. Je le relève maintenant. C'est le nom de mon festival, en 300 px, à la dernière image que voit Yanis.

**1440, rapide** (`bureau-rapide-1.png` à `-4.png`) : rien ne saute, rien ne clignote, et l'action n'est jamais cachée.

**375** : 18 captures, de `mobile-01-manifeste.png` à `mobile-18-footer.png`. Aucun débordement horizontal. Le bouton collant ne masque jamais une action, et il se retire sur la billetterie. Un défaut d'ordre : à 375, la photo de la billetterie s'intercale entre les garanties et les prix (`mobile-11-pass.png`). Après avoir appuyé sur « Pass 3 nuits », Yanis voit donc un titre, trois garanties et une main en cornes, mais pas encore de prix.

### 3. Le parcours de l'acheteur (Yanis)

| Étape | Ce que j'ai fait | Ce que j'ai vu |
|---|---|---|
| 1 | Clic sur « Prendre mon pass — 79 € » dans le hero, à 1440 | La page descend à la billetterie : titre à 186 px du haut (`parcours-01-apres-clic-hero.png`) |
| 2 | Pass une nuit, « Samedi 3 », « Ajouter au panier » | Une barre fixe annonce « Pass une nuit (samedi) ajouté · Panier 32 € », et le bouton passe à « Ajouté ✓ » (`parcours-02-ajout-une-nuit-1440.png`) |
| 3 | Le groupe : 4 pass trois nuits, plus 3 nuits au tarif réduit pour l'étudiant | Panier juste : 32 + 316 + 3 × 22 = **414 €**, bouton « Payer 414 € », barre « Pass réduit (dimanche) ajouté · Panier 414 € » (`parcours-03-groupe-flash-1440.png`) |
| 4 | « Voir le panier ↓ » | Titre du panier à 72 px, puis la barre se retire (`parcours-04-voir-panier-1440.png`) |
| 5 | « Retirer » sur la ligne du samedi, puis « Payer » | Le total passe à 382 €, puis « Exemple fictif : aucune billetterie derrière ce bouton. » (`parcours-05-payer-1440.png`) |
| 6 | **Téléphone** : bouton collant, puis « Ajouter au panier » sur le pass trois nuits | Barre en bas de l'écran à 710–800 px, bouton « AJOUTÉ ✓ », bouton collant retiré (`mobile-parcours-01-apres-tap-collant.png`, `mobile-parcours-02-ajout-flash.png`). « Voir le panier » amène le panier à 72 px (`mobile-parcours-03-panier.png`). **Corrigé** |
| 7 | FAQ | Accordéon exclusif, réponses d'une phrase (`parcours-06-faq.png`) |
| 8 | Alerte du 15 avril, d'abord avec « yanis@ », puis avec « yanis.test@exemple.fr » | Erreur claire avec `aria-invalid`, puis message fictif (`parcours-07-alerte-erreur.png`) |
| 9 | Les cinq liens de la nav, à 1440 | Chaque section arrive à 72 px du haut (`parcours-08-nav-journal.png`) |
| 10 | Menu sur téléphone, puis « Venir » | Le menu s'ouvre (`aria-expanded` à true), le lien amène la section à 72 px et le menu se referme (`mobile-parcours-04-menu.png`, `mobile-parcours-05-venir.png`) |
| 11 | « Pause vidéo », descente puis remontée | La vidéo reste en pause, et le bouton dit « Lire la vidéo » |
| 12 | « Écouter un extrait » | « Extrait indisponible (exemple fictif) » |

**Les chiffres d'un bloc à l'autre.** Le prix de 79 € est le même partout : repère, nav, hero, chapo, bouton collant, billetterie, appel final. Les jauges s'additionnent (2 000 + 1 200 + 1 000 = 4 200) et l'affiche aussi (12 + 29 = 41). Trois points ne tiennent pas :

- **Le manifeste dit « Pendant deux siècles, ces halles ont fabriqué des fusils »**, et la légende juste en dessous dit « une charpente de 1864 ». Des halles de 1864 n'ont pas fabriqué de fusils pendant deux siècles. Les Stéphanois le savent : la Manufacture s'installe sur ce site en 1864 et ferme en 2001.
- **Les Rivets** sont présentés comme une des six têtes d'affiche, mais ils jouent en halle B, la halle des « découvertes ».
- **Le retour** : la halle C ferme à 5 h, et le dernier départ à pied vers le TER de 5 h 12 doit se faire vers 4 h 45. La page ne le dit pas.

### 4. Le clavier : 42 tabulations depuis le haut, à 1440, 768 et 375

- **1440** (`clavier-1440-tab-01.png` à `-42.png`). L'ordre est logique : évitement, logo, cinq liens, pass, hero, programme, pause vidéo, pause de la bande, six extraits, pass et choix du soir, trois articles, trois questions, bouton final, champ e-mail, « Me prévenir », pied de page. **42 éléments sur 42 sont entièrement à l'écran**, avec un contour de 3 px : minium sur fond clair ou encre, encre sur l'aplat minium.
- **768** : 42 sur 42 sont à l'écran et visibles.
- **375** : les fiches 2, 4 et 6 de la galerie (Monique Ferraille, Saïda K., Furnace Club) ont leur bouton à x = 303–480, à moitié hors écran, même après 1,2 s d'attente (`clavier-375-galerie-2.png`). Aux tabulations 21 et 23, le lien du journal et la première question sont **cachés sous le bouton collant** « Pass 3 nuits » (y = 750 sous une barre à 748–800). Ça ne touche que le clavier sur téléphone (FIX-19).

### 5. Le mouvement réduit

Je l'ai testé à 1440 et à 375 (`reduit-premier-ecran-1440.png`, `reduit-page-entiere-1440.png`, `reduit-premier-ecran-375.png`, `reduit-page-entiere-375.png`) :

- La vidéo n'est pas demandée (`currentSrc` vide) et l'affiche fixe reste.
- Aucun titre, paragraphe ou image ne reste caché, à opacité nulle ou invisible.
- Les artistes passent en grille de trois colonnes à 1440, et les compteurs affichent directement « 4 200 » et « 12 000 » (`lieu-compteurs-fin-reduit.png`).
- La page reste complète : 788 mots à 1440, 777 à 375, 12 sections.

### 6. L'œil du métier

Ce qui est juste : le lieu (halle B vide, halle A avec scène, charpente de la halle C), les jauges, la chaîne du retour en tram, les prix et la règle du tarif réduit. La FAQ répond aux vraies questions : ce que comprend le pass, la revente, l'âge. Le pass offert aux bénévoles, dans le journal, est un vrai détail d'association.

Ce que je ne laisserais pas partir chez l'imprimeur :

1. **Le Ô coupé du pied de page** (1440 et 1280), décrit plus haut.
2. **« Deux siècles » contre « 1864 »** : la page se contredit dans le même bloc.
3. **Furnace Club illustré par une main du public.** Hugo me dirait : « C'est notre clôture, et on ne voit pas l'artiste. »
4. **Trop de mains levées.** Sur 22 images, huit sont des bras ou des mains levés devant des projecteurs : `soir-ven`, `soir-sam`, `halle-toit`, `public-5`, `public-2`, `public-3`, `prog-7`, plus la foule de la vidéo. C'est le festival interchangeable que je ne veux pas. Il me manque une image du vestiaire, du bar, de l'entrée avec les bénévoles, de la verrière mouillée. Ce sont elles qui feraient la preuve de « la pluie dehors » et de « 180 bénévoles ».
5. **Des légendes qui affirment ce qu'on ne voit pas** : « Halle A, juillet 2026, 1 h du matin » sous une photo de banque, et « avec l'équipe plateau » sous une photo sans équipe. C'est provisoire, mais un festivalier de 2026 le verra.
6. **Le journal sur le tram montre une scène**, alors que j'ai une photo de tram de nuit dans la page.
7. **Les Rivets**, tête d'affiche en halle « découvertes ».
8. **Le retour après 4 h 45** n'est pas traité, pour ceux qui restent jusqu'à 5 h.

### 7. La densité (script de `conventions.md` § 11, Chrome, 3 s d'attente, images chargées)

| Mode | Mots | Sections | Écrans |
|---|---|---|---|
| 1440 × 900, mouvement normal | **788** | **12** | **13,8** |
| 1440 × 900, mouvement réduit | 788 | 12 | 13,7 |
| 1280 × 800 | 788 | 12 | 14,3 |
| 768 × 1024 | 783 | 12 | 12,1 |
| 375 × 812, mouvement normal | 777 | 12 | 17,1 |
| 375 × 812, mouvement réduit | 777 | 12 | 17,4 |

Détail à 1440 : évitement 3, en-tête 11, hero 57, manifeste 47, programme 82, artistes 100, lieu 46, équipe 40, public 48, pass 95, pratique 77, journal 63, FAQ 53, final 32, pied 34. Ça concorde avec `NOTES.md`.

Tout est dans la fourchette : 500 à 800 mots, 10 à 13 sections, 12 à 18 écrans. Aucun bloc ne dépasse trois phrases. Toutes les sections ont un visuel, sauf la FAQ et l'appel final : hero 2, manifeste 1, programme 3, artistes 6, lieu 3, équipe 1, public 2, pass 1, pratique 1, journal 3. Les titres de section font de 5 à 8 mots. Attention : avec 788 mots, la page n'a plus que 12 mots de marge. Toute correction de texte doit se faire à nombre de mots constant.

### 8. La console et le réseau

À chaque taille et dans chaque mode (7 tailles, plus les parcours, le clavier et le mouvement réduit), je n'ai relevé aucune erreur, aucun avertissement, aucune requête échouée et aucune image cassée. Le serveur Node à flux n'a rien coupé.

### Responsive : les titres aux 5 tailles

Aucun débordement horizontal (`scrollWidth` égal à la largeur de la fenêtre partout), aucun texte sous 12 px. Aucun titre de section n'est cassé, aucun n'a de lettres collées, et aucune ligne ne touche la suivante. Le titre le plus long sur téléphone tient en 3 lignes (« Six têtes d'affiche… », « Trois salariés… »). **Seule exception, le grand « TÔLE » du pied à 1440 et 1280.**

---

## Partie 3 : la note

### Les 10 points (`agents/client-persona.md`)

| # | Point | Verdict | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK | `reduit-page-entiere-1440.png` | 788 mots, 12 sections, 13,8 écrans, aucun bloc de plus de 3 phrases. Toutes les sections attendues sont là : hero, preuve, offre, pratique, équipe, avis, journal, tarifs, FAQ, appel final, pied complet |
| 2 | Catalogue, articles | OK | `parcours-03-groupe-flash-1440.png`, `bureau-12-journal.png` | Trois pass avec prix, choix du soir, panier, retrait et total ; trois articles datés tirés de `TOLE` |
| 3 | Titres et promesse | OK | `00-premier-ecran-1440x900.png` | « Trois nuits sous la tôle. » ; chaque titre de section porte un fait (« Une usine couverte, pas un champ boueux ») |
| 4 | Typographie d'affichage | OK | `zoom-375-titre-hero.png`, `zoom-1440-titre-programme.png` | Interlettrage positif, aucune lettre collée, lignes séparées partout |
| 5 | Barre de navigation | OK | `mobile-parcours-04-menu.png` | Logo, 5 liens, un bouton, aucun téléphone, menu propre |
| 6 | Blocs d'action | OK | `bureau-10-pass.png`, `mobile-parcours-02-ajout-flash.png` | Deux colonnes sur ordinateur, avec un retour visible à l'ajout au panier sur les deux tailles |
| 7 | Hero équilibré | OK | `00-premier-ecran-1280x720.png` | La vidéo remplit le milieu ; repères, titre et action se répondent |
| 8 | Responsive | **Pas OK** | `pied-marque-1440.png`, `pied-marque-1280.png` | Le grand « TÔLE » du pied a l'accent coupé par l'aplat minium au-dessus, à 1440 et 1280 |
| 9 | Images et vidéos | OK, avec réserve | `bureau-05-artistes.png`, `bureau-09-public.png` | Des photos dans 10 sections sur 12, plus la vidéo. Réserves : la fiche Furnace Club montre une main du public, huit photos sur 22 sont des mains levées, et la preuve « pluie dehors » n'a aucune image |
| 10 | 3D produit | Sans objet | | Pas d'objet 3D pour un festival |

### Grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **13** | Je reconnais l'affiche Tôle sans le logo : encre, papier, minium, Archivo étroit, filets de grille, trichromie. Je retire 2 points pour la série de mains levées sur fond de bokeh, qui tire la page vers le festival interchangeable que je déteste |
| Images | 15 | **12** | Une vidéo d'usine, trois images générées du lieu qui sonnent juste, une série cohérente. Je retire des points pour Furnace Club illustré par une main du public, la photo de l'équipe sans l'équipe, l'article du tram sans tram, et aucune image du dehors mouillé. 12 est le plafond des médias provisoires |
| Mise en page | 15 | **5** (plafond) | Sans plafond, la note serait de 12 : la composition brutaliste est suivie, la grille visible, les ruptures franches, le vide du pass est réglé et la galerie a du chemin. Je retirerais 1 point pour le décalage de 11 px de la colonne du milieu (programme, journal), 1 pour la fiche Brise-Glace plus grande que les autres et 1 pour le Ô coupé. **Mais un titre d'affichage coupé par son cadre à une taille de capture plafonne ce critère à 5.** Le « TÔLE » de 300 px est le plus grand texte de la page : c'est le nom de la marque, dont l'accent est coupé à 1440 et 1280 |
| Mouvement | 10 | **9** | Vidéo, manifeste lu mot à mot, galerie épinglée qui fait enfin son chemin, compteurs, bande avec pause, barre d'ajout animée ; le mouvement réduit est complet. Je retire 1 point pour la galerie au clavier sur téléphone |
| Clarté en 5 s et action | 10 | **9** | Le premier écran est parfait à toutes les tailles, et l'ajout au panier répond enfin sous le doigt. Je retire 1 point parce que sur téléphone, la photo s'intercale entre le titre de la billetterie et les prix |
| Densité | 5 | **5** | 788 mots, 12 sections, 13,8 écrans, comptage fourni, aucun bloc de plus de 3 phrases |
| Preuves et objections | 10 | **7** | Les quatre objections de Yanis ont une réponse, avec chiffres et avis nommés, et les contradictions du tour 1 sont réglées. Je retire 1 point pour la contradiction « deux siècles » / 1864 dans le même bloc, et un point de plus pour la tête d'affiche en halle « découvertes » et le retour de 5 h laissé sans réponse. Sans vraies preuves, le plafond est à 8 |
| Textes | 10 | **9** | Les titres sont forts, la voix sèche et faite de données, sans adjectif de festival. Je retire 1 point pour les légendes qui affirment ce que la photo ne montre pas, « LE / 15 AVRIL », et la FAQ « Les questions qu'on nous pose », trop générique |
| Mobile et accessibilité | 10 | **8** | Aucun débordement aux 7 tailles, contour visible sur 42 tabulations sur 3 sur 3 tailles, cibles de 44 à 52 px, console vide, vidéo non chargée en mouvement réduit. Je retire 2 points pour le focus à moitié hors écran dans la galerie et le focus caché sous le bouton collant, sur téléphone |
| **Sous-total** | 100 | **77** | |
| Pénalités | | **0** | Densité dans la fourchette |
| **Total** | | **77 / 100** | Sans le plafond du « TÔLE » coupé, la page vaudrait **84** |

**Note sur 10 : 7,7** (6,6 au tour 1).

**Seuil applicable : 85 / 100** (maquette aux médias provisoires).

**Ce qui est atteignable sans le vrai client : 87 à 89.** Voici ce que rapportent les corrections :

- FIX-13 (une ligne de CSS) lève le plafond : Mise en page passe à 13, soit +8, et la page passe à **85**.
- FIX-14, FIX-17 et FIX-18 : Preuves passe à 8 (+1).
- FIX-19 : Mobile passe à 9 (+1).
- FIX-20 : Mise en page passe à 14 (+1).
- FIX-15 et FIX-16 : Images restent à 12 ou 13, et Direction artistique passe à 14 (+1 à +2).

Pour aller jusqu'à 90, il faut le client : photos de presse des artistes, vrais avis 2026, vraies photos de l'équipe, des bénévoles et des halles, et la règle réelle du retour après 5 h.

> « Cette fois, Yanis sait ce qu'il a mis dans son panier, sur son téléphone comme sur l'ordinateur, et mon nom ne se cogne plus dans le titre. C'est presque le site que j'ai commandé. Mais en bas de page, mon TÔLE de trois cents pixels a le chapeau coupé. Et Furnace Club, qui ferme mon festival, est représenté par une main du public. Réparez le Ô, et je signe. »

Verdict : Pas encore. Le grand « TÔLE » du pied de page a l'accent coupé à 1440 et 1280. C'est un titre coupé, qui plafonne la mise en page, et la correction coûte une ligne de CSS. Sans ce défaut, la page passe le seuil (85).

---

## Partie 4 : plan de corrections (ce qui reste)

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-13 | bloquant | **0 $** | Le grand « TÔLE » du pied a l'accent coupé par l'aplat minium (1440, 1280) |
| FIX-14 | moyen | **0 $** | « Pendant deux siècles » contredit « charpente de 1864 » dans le même bloc |
| FIX-15 | moyen | **0 $** ou **génération** ≈ 0,06 $ | Photos et légendes à contresens : Furnace Club, article du tram, « équipe plateau », « Halle A, juillet 2026 » |
| FIX-16 | moyen | **génération** ≈ 0,12 à 0,18 $ (ou **client**) | Trop de mains levées ; aucune image de la « pluie dehors » ni des bénévoles |
| FIX-17 | moyen | **0 $** / **client** | Le retour pour ceux qui restent jusqu'à 5 h (halle C) n'est pas traité |
| FIX-18 | léger | **0 $** | Les Rivets, tête d'affiche, en halle B « découvertes » |
| FIX-19 | léger | **0 $** | Clavier sur téléphone : galerie à moitié hors écran, focus caché sous le bouton collant |
| FIX-20 | léger | **0 $** | Colonnes décalées : photo du milieu plus basse (programme, journal), fiche Brise-Glace plus grande |
| FIX-21 | léger | **0 $** | Détails : « LE / 15 AVRIL », titre de la FAQ, photo de la billetterie avant les prix sur téléphone |
| FIX-12 | léger | **client** | Photos de presse des artistes, vrais avis 2026, photos réelles des halles et de l'équipe |

### FIX-13 : le Ô coupé du pied de page (bloquant)

- **Quoi** : `.pied-marque` (« TÔLE » en minium, 336 px à 1440) a un interligne de 0,8. L'accent circonflexe sort de sa boîte vers le haut, passe le filet du pied et entre dans l'aplat minium de `#final`. Il y disparaît, minium sur minium. On voit un Ô à la pointe coupée à 1440 et à 1280, en mouvement normal comme réduit (`pied-marque-1440.png`, `pied-marque-1280.png`, `pied-marque-1440-reduit.png`). À 768, il frôle le filet (`pied-marque-768.png`). Le défaut existait déjà au tour 1 (`captures-refonte-tour-1/bureau-12-FOOTER.png`) et je l'avais manqué.
- **Où** : `tole.src.css` ligne 354 (`.pied-marque { … line-height: .8; … }`) et ligne 352 (`.pied { padding-block: 2.5rem 6rem }`), puis recompiler `tole.css`.
- **Comment** : laisser à l'accent la place de l'em, par exemple `.pied-marque { line-height: .8; padding-top: .16em; }` ou `line-height: 1`. Vérifier ensuite à l'œil, à 1440, 1280, 768, 375 et 360, que la pointe du chapeau reste sous le filet blanc avec au moins 8 px d'air. Refaire `pied-marque-*.png`.

### FIX-14 : « deux siècles » contre « 1864 » (moyen)

- **Quoi** : le manifeste dit « Pendant deux siècles, ces halles ont fabriqué des fusils », et la légende de la même section dit « une charpente de 1864 ». C'est faux pour ces halles, et un Stéphanois le voit tout de suite.
- **Où** : `index.html` ligne 81.
- **Comment** : « Pendant plus d'un siècle, ces halles ont fabriqué des fusils. » Le bloc garde 3 phrases et gagne un mot, ce qui fait 789 mots, toujours sous 800.

### FIX-15 : photos et légendes à contresens (moyen)

- **Quoi et où** :
  - Furnace Club (`index.html` ligne 370, `images/prog-7.webp`) : une main du public pour la tête d'affiche qui clôt le festival. À 0 $, échanger avec une photo de la série qui montre un musicien ou une table de mixage. Sinon, générer une photo de platines et de silhouette au-dessus des machines sous la charpente (≈ 0,06 $, FLUX.2 Pro), dans la même trichromie.
  - Article « Le tram de nuit reconduit » (ligne 374, `images/journal-2.webp`) : un groupe sur scène. À 0 $, mettre un recadrage horizontal de `tram.webp` (3:2), comme `prog-7` l'a été de `foule.webp`.
  - Légende « Balances de 17 h en halle B, avec l'équipe plateau. » (ligne 190) : l'équipe n'est pas sur la photo. Écrire « Balances de 17 h en halle B. » jusqu'à la vraie photo.
  - Légende « Halle A, juillet 2026, 1 h du matin. » (ligne 229) sous une photo de banque : écrire « 1 h du matin, devant la scène. », ou ne garder que l'heure.

### FIX-16 : trop de mains levées, et la pluie dehors sans image (moyen)

- **Quoi** : huit images sur 22 sont des bras ou des mains levés devant des projecteurs (`soir-ven`, `soir-sam`, `halle-toit`, `public-5`, `public-2`, `public-3`, `prog-7`, vidéo). La section « la pluie dehors » n'a aucune image du dehors, et la section équipe aucune image de personnes au travail.
- **Où** : `index.html` ligne 207 (`public-2`, deuxième photo de la mosaïque) et ligne 228 (`public-3`, photo de la billetterie).
- **Comment** : remplacer `public-2` par une verrière de la halle sous la pluie, vue de l'intérieur, avec la foule sèche en dessous. Remplacer `public-3` par l'entrée du festival : bénévoles en t-shirt qui scannent les bracelets, file sous la charpente. Il faut 2 ou 3 images générées (≈ 0,06 $ chacune, FLUX.2 Pro, même trichromie), avec la consigne « dry interior, rain only on the outside of the glass ». Les vraies photos de 2026 relèvent du **client**.

### FIX-17 : rentrer quand on reste jusqu'à 5 h (moyen)

- **Quoi** : la halle C joue jusqu'à 5 h, et Furnace Club fait « clôture à 5 h ». Or, avec 25 minutes à pied, le TER de 5 h 12 impose de partir vers 4 h 45. Yanis, qui vient de Lyon, ne sait pas quoi faire s'il reste jusqu'au bout.
- **Où** : `index.html` ligne 269 (« Retour de nuit »).
- **Comment** : à 0 $ et à nombre de mots presque constant, écrire « … Après, Châteaucreux est à 25 minutes à pied : partez à 4 h 45 pour le TER de 5 h 12. » La vraie solution pour 5 h (navette, tram prolongé, TER suivant) relève du **client** : la noter dans `NOTES.md`, « Ce qui reste au client ».

### FIX-18 : une tête d'affiche en halle « découvertes » (léger)

- **Quoi** : Les Rivets sont une des six têtes d'affiche, mais ils jouent à 21 h 50 en halle B, présentée comme « 1 200 places, découvertes ».
- **Où** : `index.html` ligne 112 (programme), ligne 367 (fiche, « Halle B ») et ligne 175 (légende de la halle B).
- **Comment** : les passer en halle A, libre le samedi à 21 h 50. Sinon, écrire pour la halle B « 1 200 places, découvertes et concerts debout ».

### FIX-19 : clavier sur téléphone (léger)

- **Quoi** : à 375, au clavier, les boutons « Écouter » des fiches 2, 4 et 6 restent à x = 303–480, à moitié hors écran (`clavier-375-galerie-2.png`). Les tabulations 21 et 23 (lien du journal, première question) tombent sous le bouton collant.
- **Où** : `index.html` ligne 499 (`if (!carte || !st) return;` : sous 768 px, rien n'est fait), et `tole.src.css` lignes 19 et 20 (`scroll-padding-top`, sans `scroll-padding-bottom`).
- **Comment** : sous 768 px, faire défiler la fenêtre : `if (!st) { carte.closest(".artistes-fenetre").scrollTo({ left: carte.offsetLeft - 16 }); return; }`. Pour le bouton collant, ajouter `scroll-padding-bottom: 5rem` sur `html` sous 768 px.

### FIX-20 : colonnes décalées (léger)

- **Quoi** : dans le programme et le journal, la colonne du milieu porte deux marges intérieures. Sa photo fait 280 px de haut contre 292 et 291, et ses titres tombent 11 px plus haut (`bureau-03-programme.png`, `bureau-12-journal.png`). Dans la galerie, la première fiche n'a pas de marge à gauche : sa photo fait 358 px contre 341, et son nom tombe plus bas (`bureau-04-artistes.png`).
- **Où** : `tole.src.css` ligne 146 (`.soir`), ligne 317 (`.article`) et ligne 176 (`.artiste:first-child`).
- **Comment** : donner la même largeur utile aux trois colonnes. Pour les soirs et les articles : `column-gap: 2rem`, aucune marge intérieure, et le filet vertical dessiné par `.soir + .soir::before` placé à −1 rem. Pour la galerie : garder `padding-left: 1rem` sur la première fiche et la décaler de `margin-left: -1rem`. Les photos ont alors toutes la même taille.

### FIX-21 : détails (léger)

- `index.html` ligne 316 : « La suite de l'affiche, le&nbsp;15&nbsp;avril », pour que « LE » ne reste pas seul en bout de ligne (1440 et 375).
- `index.html` ligne 298 : « Les questions qu'on nous pose » est le seul titre sans donnée. Écrire, par exemple, « Trois questions avant de payer » (5 mots, autant qu'avant).
- Sur téléphone, la photo de la billetterie passe avant les prix (`mobile-11-pass.png`, `tole.src.css` ligne 258). Sous 1024 px, l'envoyer après le panier, par exemple avec `display: contents` sur `.billetterie-texte` et `order` sur `.billetterie-photo`.
- Le hero dit « 41 concerts » et le lieu « 41 artistes » (lignes 67 et 163). Choisir un des deux mots.

### FIX-12 : médias réels (client)

Photos de presse des six artistes, vrais avis signés 2026, photos de l'équipe, des bénévoles et des halles, et la règle réelle du retour après 5 h. C'est ce qui sépare 87–89 de 90.

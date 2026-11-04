# Sillon : boucle persona, refonte, tour 2

- **Date** : 4 novembre 2026
- **Page testée** : `abonnement-sillon/index.html`, servie par mon propre serveur Node statique (`127.0.0.1:4359`, dossier `exemples/`, aucune image coupée). Navigateur : Chrome piloté par Playwright (`playwright-core`), sans interface.
- **Regard indépendant** : je n'ai pas lu les rapports du relecteur. J'ai lu `brief.md`, mon tour 1 (`refonte-tour-1.md`, 67 / 100, FIX-1 à FIX-13), `NOTES.md` § 10 et les retours de l'utilisateur du 4 novembre.
- **Qui parle** : Claire et Mathieu Guérin, ferme Sillon, qui paient 25 000 €. Puis Lucie, 34 ans, quartier Zola, qui ouvre la page dans le tram.
- **Captures** : `refonte-tour-2-captures/`. Les chemins ci-dessous partent de ce dossier.

---

## Partie 0 : le plan du tour 1, point par point

| FIX tour 1 | État | Ce que j'ai vérifié | Capture |
|---|---|---|---|
| FIX-1 « à 14 / km » | **Fait** | Dans le DOM après SplitText, les lignes sont « Quatre hectares / en bio, à 14 km / de Nantes » à 1440, 1280, 375 et 360, et « … à 14 km de Nantes » à 768. L'insécable survit (`textContent.includes("14 km")` = vrai, en mouvement permis comme réduit). | `section-1440-02-preuve.png`, `planche-375-a.png` |
| FIX-2 densité | **Fait** | 790 mots (785 en réduit à 375), 12 sections, 14,9 écrans. | partie 1, § 7 |
| FIX-3 grand panier | **Fait** | 7 légumes, 6 kg, 26 €, 104 € par mois, soit 4,33 €/kg contre 4,44 €/kg pour le petit (5 légumes, 3,6 kg). Tout est dans les fourchettes du brief. | `parcours-1440-02-grand-panier.png` |
| FIX-4 faits | **Fait** | S45 : « Potimarron, carottes des sables et poireaux », comme le panier. Journal : « Six tonnes, de quoi tenir jusqu'en mars ». « Le froid les rend plus doux. » L'alt et la légende du champ disent tous deux novembre. | `recit-1440-030.png`, `section-1440-10-journal.png` |
| FIX-5 photos de métier | **Fait** (réemplois : à moitié) | Fenouil dans une cagette en bois sans aucun marquage. Poireaux d'hiver à gros fût, feuilles bleu-vert, sol givré. Vraies carottes tirées, sable collé. Mais la photo des pommes de terre sert deux fois à l'identique (fiche et journal), et les courges trois fois (hero, S45, fiche recadrée). | `recit-1440-055.png`, `recit-1440-100.png`, `zoom-fiche-carottes.png` |
| FIX-6 fiche recette, voix | **Fait** (sans l'option payante) | La fiche de papier « Velouté de potimarron · 20 min · une casserole », signée Claire, est posée sur la photo S45, et on la voit aussi sur téléphone et en mouvement réduit. La citation de Claire est à la première personne. | `recit-1440-000.png`, `reduit-1440-recit.png`, `section-1440-04-ferme.png` |
| FIX-7 h2 serrés | **Fait** à 1440, **à moitié** à 1280 | À 1440 : panier, relais, prix, journal, FAQ et inscription tiennent sur 2 lignes. À 1280 : le prix et l'inscription restent sur 3 lignes, dans une colonne étroite. | `section-1280-09-prix.png`, `section-1280-12-inscription.png` |
| FIX-8 étapes à 768 | **Fait** | Une étape par ligne. « Novembre », « en pause » et « Petit · 16 € » sont entiers. | `section-768-06-comment.png` |
| FIX-9 légende rognée | **Fait** | « Les planches de Saint-Julien-de-Concelles, en novembre. » est entière. | `zoom-preuve-legende.png` |
| FIX-10 carte | **Fait** (+ client) | Onze boutons ; le survol, le focus clavier et le toucher allument le point (orange courge) et écrivent le nom sur la carte. Toucher directement un point marche aussi (Trentemoult). Malakoff est sur la rive nord, à l'est. | `parcours-1440-09-relais-survol-malakoff.png`, `clavier-1440-tab26.png`, `mobile-375-04-relais-malakoff.png`, `mobile-375-05-carte-tap-point.png` |
| FIX-11 bord du hero | **Fait** | Bord droit de la photo à 1440 / 1440 et à 1280 / 1280. | `premier-ecran-1440x900.png` |
| FIX-12 finitions | **Fait** | « 17 h », « 19 h 30 » et « ; » insécables dans la confirmation (`mobile-375-06-confirmation.png`). Étiquettes « Avis provisoires » et « Relevé provisoire du 2 novembre 2026 ». Le récit se cale en fin de piste. « Réserver mon panier » tient sur une ligne à 375. | `section-1440-08-avis.png`, `recit-1440-100.png` |
| FIX-13 client | **Pas fait** (client) | Relevés de prix réels, avis signés, adresses des relais, shooting, vrais chiffres. | |

Bilan : 11 FIX faits, 2 à moitié (réemplois de photos, h2 à 1280), 1 qui attend le client. Le travail a été fait sérieusement.

---

## Partie 1 : rapport de test

### 1. Les 5 premières secondes

| Taille | Capture | Ce que je vois |
|---|---|---|
| 1440 × 900 | `premier-ecran-1440x900.png` | Le h1 « Le panier bio cueilli la veille » sur 2 lignes, le chapô (14 km, lundi / mardi, 11 relais, dès 16 €, sans engagement), un seul bouton, la photo des potimarrons jusqu'au bord droit, la fiche du petit panier et la frise des 4 chapitres. **Bon.** |
| 1280 × 720 | `premier-ecran-1280x720.png` | Même équilibre. La fiche du panier s'arrête à **10 px** de la fin du chapô (chapô à 550 px, fiche à 560 px) : rien ne se chevauche, mais c'est serré. |
| 768 × 1024 | `premier-ecran-768x1024.png` | Texte, bouton, photo et fiche ; la frise tombe en bas de l'écran. **Bon.** |
| 375 × 812 / 667 | `premier-ecran-375x812.png`, `premier-ecran-375x667.png` | h1 de 33,6 px sur 2 lignes, chapô sur 3 lignes, bouton dans le premier écran. **Bon.** |
| 360 × 740 | `premier-ecran-360x740.png` | Chapô sur 4 lignes, bouton visible, la fiche commence. **Bon.** |

Lucie sait en 5 secondes ce qu'on vend, où, à quel prix et quoi faire. Le retour de l'utilisateur sur le hero (« texte cassé, trop long, trop grand ») est réglé à toutes les tailles.

### 2. Le défilement (1440, 1280, 768, 375, 360)

Séries : `section-1440-01-hero.png` à `section-1440-13-pied.png`, le récit à 0, 30, 55, 80 et 100 % (`recit-1440-000.png` … `recit-1440-100.png`), et les mêmes séries à 1280, 768, 375 et 360 (`section-1280-*`, `section-768-*`, `section-375-*`, `section-360-*`, `recit-1280-*`, `recit-768-*`, `recit-375-chapitre2..4.png`). Planches : `planche-375-a.png`, `planche-375-b.png`, `planche-375-recit.png`, `planche-1280-a/b.png`, `planche-768-a/b.png`, `planche-360-a/b.png`.

- **Le moment signature marche.** Le récit est épinglé de 1 621 à 5 000 px à 1440. Le fond passe de la terre brûlée au vert poireau, puis au pourpre et à l'olive, et la frise suit. La fiche recette sur la S45 est la meilleure image de la page pour Lucie : elle répond à « je ne saurai pas cuisiner ça » avant même qu'elle se pose la question. Rien ne clignote et rien ne cache l'action.
- **Fin de piste** (`recit-1440-100.png`) : la S48 est maintenant calée à gauche, mais la moitié droite de l'écran (environ 560 px) reste un aplat olive vide. Le récit s'arrête sans rien proposer, alors que c'est le moment idéal pour un « Choisir mon panier ». Léger.
- **Titres** : aucun titre n'est cassé ni ne déborde, à aucune des 5 largeurs. Interlettrage `normal` partout et aucun texte sous 12 px. À 1280, les h2 du prix (« Le même panier, / au rayon bio / du supermarché ») et de l'inscription (« Votre premier / panier, dès / mardi prochain ») font 3 lignes dans une colonne étroite. Sur ordinateur, « maraîchers » reste seul sur sa ligne dans le h2 de la ferme. Rien de cassé, juste un manque de finition.
- **Aucun débordement horizontal** à 1440, 1280, 768, 375 et 360 (`scrollWidth` = largeur de la fenêtre).
- **Pied de page** (`section-1440-13-pied.png`, `planche-360-b.png`) : « Exemple fictif · Photos Unsplash, FLUX.2 Pro ·Haut de page ». L'espace avant le lien disparaît, parce que le paragraphe est en `display: flex` (`sillon.src.css:402`). À 375 et 360, « Haut de / page » passe sur 2 lignes et le « · » reste en fin de ligne. L'adresse est coupée sur le trait d'union : « Saint-Julien- / de-Concelles » (1440 et 375).

### 3. Le parcours de Lucie jusqu'à l'inscription

1. « Choisir mon panier » amène le haut du panier à 80 px, juste sous l'en-tête (`parcours-1440-01-choisir-mon-panier.png`).
2. Petit panier : 5 fiches en couleur, le fenouil et le chou de Milan grisés avec « Grand panier seulement ». « 5 légumes · 3,6 kg », 16 €, 64 € par mois. Je bascule sur **Grand** (`parcours-1440-02-grand-panier.png`) : « 7 légumes · 6 kg », 26 €, 104 € par mois, et le bouton devient « S'abonner au grand panier ». La section prix suit (`parcours-1440-04-prix-grand.png`) : rayon bio 22,89 €, écart 3,11 €, sept lignes au relevé.
3. « S'abonner au grand panier » amène au formulaire, avec « Grand » coché (`parcours-1440-05-sabonner-grand.png`).
4. **Le défaut du parcours** : je bascule sur Grand, puis je clique sur « S'abonner » dans l'en-tête, ce que fera une Lucie pressée. Le formulaire affiche **Petit**, alors que le résumé dit toujours « Grand panier » (`parcours-1440-12-entete-sabonner-apres-grand.png`). C'est pareil si elle descend au formulaire en faisant défiler la page. La bascule ne coche la formule que via le bouton du résumé (`index.html:660` et `663-666`). Elle risque de réserver le mauvais panier.
5. Formulaire vide : trois erreurs claires, et le focus va sur le prénom (`parcours-1440-06-formulaire-erreurs.png`). Rempli (Lucie, `lucie.test@exemple.fr`, Zola) : « C'est noté, Lucie. Votre grand panier vous attend mardi au relais Zola, de 17 h à 19 h 30 ; la confirmation part à lucie.test@exemple.fr. » (`parcours-1440-07-formulaire-confirmation.png`). Rien n'est envoyé.
6. La FAQ s'ouvre, avec des réponses d'une phrase (`parcours-1440-08-faq-ouverte.png`). La lettre du lundi répond « Inscrit. Première lettre lundi prochain. »
7. Carte : au survol de Malakoff, le point devient orange et le nom s'écrit (`parcours-1440-09-relais-survol-malakoff.png`). Un clic sur Trentemoult le fige (`parcours-1440-10-relais-clic-trentemoult.png`). Le lien de frise « Betteraves » mène au bon chapitre (`parcours-1440-11-frise-betteraves.png`).
8. Téléphone (375, `mobile-375-01` à `06`) : le menu s'ouvre proprement et Échap le ferme en rendant le focus au bouton. Le bouton du hero mène au panier (80 px). La bascule marche et la barre collante se cache sur le panier, les relais et l'inscription. Toucher « Malakoff » allume le point et le nom sur la carte. Le formulaire et la confirmation sont lisibles. **À noter** : sur téléphone, le résumé (prix, « par mois », bouton) n'arrive qu'après les 7 fiches. La section fait 1 849 px, soit plus de deux écrans de fiches avant de voir le prix du panier choisi (`mobile-375-03-resume-grand.png`).

### 4. Le clavier (50 tabulations depuis le haut, 1440)

Ordre : évitement, logo, 4 liens, S'abonner, bouton du hero, amorce S45, frise du hero (4), frise du récit (4), bascule, « S'abonner au petit panier », **les 11 relais** (nouveau), « Tout le journal », 3 articles, 5 questions, prénom, e-mail, formule, relais, bouton, e-mail du pied, plan du site. **Tout est atteint, et le focus est visible partout** : contour orange de 3 px, ou rouille de 2 px dans le formulaire. Au focus, un relais allume son point et écrit son nom sur la carte (`clavier-1440-tab26.png`). Captures : `clavier-1440-tab01.png` … `clavier-1440-tab45.png`.

### 5. Mouvement réduit

`pleine-page-1440-reduit.png` (aperçu : `apercu-pleine-page-1440-reduit.png`), `pleine-page-375-reduit.png`, `reduit-1440-recit.png`, `reduit-1440-panier.png`, `reduit-375-*.png`. Le récit s'empile en 4 cartes de couleur, avec la fiche recette visible. Les seuls éléments à opacité nulle sont les 4 boutons radio natifs habillés : c'est voulu. « 14 km » tient. Hauteur : 12,0 écrans à 1440. Console vide. **Complet et lisible.**

### 6. L'œil du métier (je suis maraîcher)

Ce qui est maintenant juste, et dont je suis fier :

- Le **fenouil** est dans une cagette en bois patinée, sans marquage, posée sur la planche, avec de la terre aux bulbes (`recit-1440-100.png`). Les **poireaux d'hiver** ont de gros fûts blancs, des feuilles bleu-vert et une gelée blanche au sol (`recit-1440-055.png`). Les **carottes des sables** sont tirées à la main sur une parcelle sableuse (`zoom-fiche-carottes.png`). Plus rien ne fait « importé ».
- Les **chiffres tiennent** : petit panier à 3,6 kg pour 16 € (4,44 €/kg), grand à 6 kg pour 26 € (4,33 €/kg), donc le grand est un peu moins cher au kilo. J'ai refait le relevé du rayon à la main (1 × 3,50 + 0,8 × 2,99 + 0,6 × 5,50 + 0,7 × 2,50 + 0,5 × 3,90 = 12,89 €) : c'est exact. Six tonnes de pommes de terre pour 312 foyers jusqu'en mars, c'est le bon ordre de grandeur. La S45 du récit et la fiche du panier disent la même chose.
- **La fiche recette existe à l'écran**, signée Claire. C'est exactement ce que je voulais.
- La carte place Malakoff sur la bonne rive.

Ce qui me gêne encore (pas de faute grossière) :

1. **Le calendrier** : nous sommes le mercredi 4 novembre. La fiche du hero et le panier disent « Dans le petit panier de mardi 3 novembre » : c'était hier, et Lucie ne l'aura jamais (son premier panier, c'est « mardi prochain », le 10). Le récit raconte au passé des semaines qui ne sont pas arrivées (« Deux gelées blanches **ont** sucré poireaux et chou de Milan », S46), et le mini-calendrier marque « S46 retiré ». C'est un détail de données (`index.html:430`, `132`, `244`), mais un abonné du marché le relèverait.
2. **Le même écart au centime** : 3,11 € de différence avec le rayon bio pour le petit (16 − 12,89) **et** pour le grand (26 − 22,89). C'est arithmétiquement juste, mais ça ressemble à un chiffre arrangé. À régler avec le vrai relevé (client).
3. **Les réemplois** : le seau de pommes de terre apparaît deux fois à l'identique, dans la fiche et dans le journal (`index.html:442` et `452`), et les potimarrons trois fois (hero, S45, fiche). La fiche du chou de Milan est un recadrage du champ grossi 3,1 fois : on reconnaît bien un chou de Milan frisé, mais l'image est molle sur un écran Retina (`zoom-fiche-chou-de-milan.png`).
4. Sur le fond, rien d'autre ne me choque : bio depuis 2016 après une reprise en 2014, récolte du lundi, gelées de novembre, mâche nantaise en fin de mois, betteraves terreuses qui tiennent deux semaines.

### 7. Densité (script de `conventions.md` § 11, `/tmp/claude-501/compte-pane.js`, à 1440)

| Mesure | Valeur | Fourchette |
|---|---|---|
| Mots, mouvement permis | **790** | 500-800 ✔ |
| Mots, mouvement réduit | 790 (785 à 375) | |
| Sections dans `main` | **12** | 10-13 ✔ |
| Écrans à 1440 × 900 | **14,9** (mouvement permis), 12,0 (réduit) | 12-18 ✔ |

Détail par bloc : évitement 3, en-tête 8, hero 72, preuve 31, récit 81, ferme 55, panier 71, comment 54, relais 33, avis 57, prix 79, journal 58, questions 78, inscription 59, pied 51.

Sections attendues, cochées une à une : hero ✔, preuve ✔, offre / produits ✔ (panier avec bascule), comment ça marche ✔, qui on est ✔ (Claire, Mathieu, citation, méthode), témoignages ✔ (marqués provisoires), catalogue ✔ (fiches de la semaine) et articles ✔ (journal daté), tarifs ✔, FAQ ✔ (5 questions), appel final ✔, pied complet ✔. Aucun bloc ne dépasse 3 phrases. Chaque section a un visuel (photo, carte, mini-interface, graphique), sauf la FAQ et l'inscription, comme le prévoit la règle.

### 8. Console

Aucune erreur, aucun avertissement et aucune ressource manquante, à 1440, 1280, 768, 375 et 360, en mouvement permis comme réduit.

---

## Partie 2 : note

### Les 10 points

| # | Point | Résultat | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | **OK** | § 7 | 12 sections, 790 mots, 14,9 écrans, toutes les sections attendues, 3 phrases au plus par bloc |
| 2 | Catalogue, articles | OK | `parcours-1440-02-grand-panier.png`, `section-1440-10-journal.png` | Fiches avec poids et action, bascule petit / grand, journal daté, tout tiré de `PANIER` et `ARTICLES` |
| 3 | Titres et promesse | OK | `premier-ecran-1440x900.png` | « Le panier bio cueilli la veille » ; les h2 disent des faits (« Onze relais nantais, ouverts le mardi soir ») |
| 4 | Typographie d'affichage | OK | `premier-ecran-375x812.png` | Interlettrage 0, aucune lettre collée |
| 5 | Barre de navigation | OK | `premier-ecran-1440x900.png`, `mobile-375-01-menu-ouvert.png` | Logo, 4 liens, « S'abonner », menu propre, aucun numéro |
| 6 | Blocs d'action | OK | `section-1440-12-inscription.png` | Deux colonnes : promesse et réassurances, puis le formulaire |
| 7 | Hero équilibré | OK | `premier-ecran-1440x900.png` | Texte, photo jusqu'au bord, fiche et frise ; serré à 1280 (10 px) |
| 8 | Responsive | **OK** | planches 1280, 768, 375, 360 | Aucun titre cassé ni coupé, aucun débordement ; finitions au pied et à 1280 |
| 9 | Images et vidéos | OK | `recit-1440-055.png`, `recit-1440-100.png` | Photos partout, justes pour le métier, et une carte illustrée ; il reste quelques réemplois |
| 10 | 3D produit | Sans objet | | |

### Grille sur 100 (`niveau-agence.md` § 6)

| Critère | Points | Note | Pourquoi |
|---|---|---|---|
| Direction artistique | 15 | **14** | Le carnet kraft, la Young Serif et une couleur par chapitre, cohérents du hero au pied. La fiche recette manuscrite signée « Claire » apporte la signature propre à la ferme qui manquait au tour 1. |
| Images | 15 | **12** | Les trois photos fautives sont remplacées par des images justes : fenouil, poireaux d'hiver, carottes des sables. Les portraits et la carte sont excellents. Il reste des réemplois (pommes de terre deux fois à l'identique, potimarrons trois fois), un chou de Milan recadré et mou, et aucune vraie photo de la ferme : c'est le plafond d'une maquette. |
| Mise en page | 15 | **13** | Récit horizontal suivi, bon rythme de fonds, étapes réglées à 768, légende entière, hero jusqu'au bord. Il reste la moitié d'écran vide en fin de piste, les h2 sur 3 lignes à 1280 (prix, inscription), la fiche du hero à 10 px du chapô à 1280 et « maraîchers » seul sur sa ligne. |
| Mouvement | 10 | **9** | Épinglage, fond par chapitre, frise, odomètre, barres animées, carte réactive ; le mouvement réduit est respecté. La fin de piste ne mène nulle part. |
| Clarté en 5 s et action | 10 | **9** | Quoi, où, combien et quel geste en un écran à toutes les tailles. Mais un abonné qui choisit « Grand » puis passe par l'en-tête arrive sur un formulaire réglé sur « Petit ». |
| Densité | 5 | **5** | 790 mots, 12 sections, 14,9 écrans, comptage fourni. |
| Preuves et objections | 10 | **8** | Les 4 objections sont traitées : fiche recette visible, pause et calendrier, petit panier pour deux, prix. Les chiffres concordent d'un bloc à l'autre et le provisoire est signalé. Il manque les vrais avis et le vrai relevé (plafond de la maquette) ; l'écart identique au centime et le « mardi 3 novembre » passé coûtent en crédibilité. |
| Textes | 10 | **8** | Le h1 est fort, les titres sont factuels, la voix est directe et sans lyrisme, et Claire parle à la première personne. Le récit est au passé pour des semaines à venir, et le titre FAQ « Avant de vous abonner » reste neutre. |
| Mobile, accessibilité, légèreté | 10 | **9** | Aucun titre cassé, aucun débordement, focus visible partout, relais accessibles au clavier et au toucher, menu exemplaire, barre collante bien gérée, console vide. Petits défauts : « Haut de / page » sur 2 lignes et « Saint-Julien- / de-Concelles » coupé au trait d'union, et le prix du panier n'apparaît qu'après 7 fiches sur téléphone. |
| **Total** | 100 | **87 / 100** | soit **8,7 / 10** ; aucune pénalité de densité |

**Note de départ du tour 1** : 67. **Tour 2** : 87 (+20).

**Seuil applicable** : **85** (maquette aux médias provisoires). Il est **atteint**.

**Ce qui est atteignable sans le vrai client** : avec les FIX restants à 0 $ (synchronisation de la bascule, calendrier, fin de piste, réemplois, pied, finitions à 1280), environ **89**. Au-delà, **90 et plus demandent le client** : vraies photos de la ferme, trois avis signés, un relevé de prix daté avec tickets, les adresses des 11 relais. C'est la liste de ce qui bloque 90, à reporter dans « Ce qui manque encore ».

> « Cette fois, je reconnais ma ferme. Mon fenouil est dans une de nos cagettes, mes poireaux ont pris la gelée, et les poids et les prix tiennent quand je refais le calcul au crayon. La fiche signée Claire, c'est ce que je montrerai aux clients du marché. Il reste à corriger le formulaire qui revient sur le petit panier, et à dater la page au mardi qui vient plutôt qu'à celui d'hier. »

Verdict : Oui, ça vaut mes 25 000 €

---

## Partie 3 : plan de corrections restantes

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | moyen | 0 $ | La bascule petit / grand ne se reporte pas dans le formulaire : on choisit « Grand », on passe par l'en-tête, et on réserve « Petit » |
| FIX-2 | léger | 0 $ | Calendrier : le panier affiché est celui d'hier (3 novembre), le récit et le mini-calendrier mettent au passé des semaines à venir |
| FIX-3 | léger | 0 $ | Fin de piste du récit à 1440 : une demi-page vide, sans action |
| FIX-4 | léger | 0 $ (option génération ≈ 0,06 $) | Réemplois : pommes de terre deux fois à l'identique, potimarrons trois fois, chou de Milan recadré et mou |
| FIX-5 | léger | 0 $ | Pied : « Pro ·Haut de page », « Haut de / page » à 375 et 360, « Saint-Julien- / de-Concelles » |
| FIX-6 | léger | 0 $ | Finitions à 1280 : h2 du prix et de l'inscription sur 3 lignes, fiche du hero à 10 px du chapô ; « maraîchers » seul sur sa ligne |
| FIX-7 | léger | 0 $ | Téléphone : le prix et le bouton du panier n'arrivent qu'après les 7 fiches |
| FIX-8 | moyen | client | Ce qui bloque 90 : relevé de prix réel (et l'écart identique au centime à revoir), avis signés, adresses des relais, shooting, vrais chiffres |

### FIX-1 : la bascule ne se reporte pas dans le formulaire (moyen, 0 $)

- **Quoi** : je choisis « Grand » dans le panier, puis je clique sur « S'abonner » dans l'en-tête (ou je descends au formulaire en faisant défiler). Le formulaire est sur « Petit », alors que le résumé dit « Grand panier » (`parcours-1440-12-entete-sabonner-apres-grand.png`). Lucie peut réserver le mauvais panier sans le voir.
- **Où** : `index.html:660` (l'écouteur `change` de la bascule appelle seulement `afficher`) et `index.html:663-666` (seul le bouton du résumé coche la formule).
- **Comment** : dans l'écouteur de la ligne 660, cocher aussi `input[name="formule"][value=…]`. Faire l'inverse dans le formulaire : changer de formule met la bascule et `afficher()` à jour, pour que le relevé du prix suive. Vérifier les trois chemins : bouton du résumé, « S'abonner » de l'en-tête, défilement jusqu'au formulaire.

### FIX-2 : la page est datée d'hier (léger, 0 $)

- **Quoi** : nous sommes le 4 novembre. La fiche du hero et le panier affichent « mardi 3 novembre », un panier que Lucie n'aura pas. La S46 du récit est au passé (« Deux gelées blanches ont sucré… »), et le mini-calendrier marque « S46 retiré ».
- **Où** : `index.html:430` (`semaine: 45, retrait: "2026-11-03"`), `index.html:132` (texte S46), `index.html:244` (`cal-sem`).
- **Comment** : afficher le **prochain** retrait, avec `semaine: 46, retrait: "2026-11-10"` pour la maquette ; dans le CMS, le panier publié sera toujours celui à venir. Mettre le récit au présent ou au futur proche (« Après les premières gelées, poireaux et chou de Milan sont plus doux »). Dans le calendrier, mettre « S45 retiré · S46 à venir · S47 en pause · S48 à venir ». Garder le compte de mots.

### FIX-3 : la fin de piste ne mène nulle part (léger, 0 $)

- **Quoi** : à 1440, en fin de récit, la S48 est calée à gauche et environ 560 px d'aplat olive restent vides (`recit-1440-100.png`).
- **Où** : `sillon.src.css:170` (`padding` de fin de `.chapitres`, qui crée cet espace).
- **Comment** : soit une petite carte de clôture dans cet espace (« Décembre : panais, choux, mâche · Choisir mon panier → », 8 mots au plus pour rester sous 800), soit un padding de fin réduit pour que la S48 finisse centrée. Garder le calage des liens de frise (`arrivees`, `index.html:555`).

### FIX-4 : réemplois de photos (léger, 0 $ ; option génération ≈ 0,06 $)

- **Où** : `index.html:442` et `452` (`pommes-de-terre-640.webp` en fiche et en article, au même cadrage) ; `index.html:70`, `113` et `439` (courges) ; `index.html:445` (chou de Milan, `zoom: 3.1`).
- **Comment** : pour l'article « Les pommes de terre sont rentrées », ajouter un `cadre` (par exemple `pos: "50% 70%", zoom: 1.6`) ou reprendre la cagette `ferme-1200` recadrée sur les pommes de terre. En option (≈ 0,06 $, FLUX.2 Pro, style commun de `medias-a-generer.md`), générer un vrai chou de Milan en cagette pour la fiche. Le shooting réel remplacera de toute façon toutes ces images (FIX-8).

### FIX-5 : le pied de page (léger, 0 $)

- **Où et comment** :
  - `sillon.src.css:402` : `.pied-bas p { display: flex }` avale l'espace avant « Haut de page ». Passer en `display: block`, ou ajouter un `gap`. Mettre `white-space: nowrap` sur le lien pour que « Haut de page » tienne sur une ligne à 375 et 360.
  - `index.html:399` : « Saint-Julien-de-Concelles » est coupé sur le trait d'union. Utiliser des traits d'union insécables (U+2011) ou un `<span class="whitespace-nowrap">`.

### FIX-6 : finitions à 1280 (léger, 0 $)

- **Où** : `sillon.src.css:330` (grille du prix 6fr / 5fr), `sillon.src.css:361` (grille de l'inscription 5fr / 6fr), `sillon.src.css:105` et `:111` (hero : colonne de 50vw, fiche à `left: -2.5rem`), et le h2 `#titre-ferme`.
- **Comment** : entre 1024 et 1365 px, donner plus de place à la colonne du titre (inscription 6fr / 6fr, prix 7fr / 5fr) pour revenir à 2 lignes. Décaler la fiche du hero de 1,5 à 2 rem vers la droite à 1280, pour 30 px d'air au moins. Pour la ferme, `text-wrap: balance` sur le h2, ou une largeur de 18 à 20 ch, pour ne plus laisser « maraîchers » seul.

### FIX-7 : sur téléphone, le prix arrive tard (léger, 0 $)

- **Quoi** : à 375, la section panier fait 1 849 px. Le résumé (prix, « par mois », bouton) n'arrive qu'après 7 fiches empilées (`mobile-375-03-resume-grand.png`).
- **Où** : `sillon.src.css:230` (`.panier-grille` en une colonne sous 1024 px) et `index.html:200-209`.
- **Comment** : sous 1024 px, placer le résumé avant les fiches (`order: -1`), ou afficher sous la bascule une ligne « 26 € par semaine · 7 légumes · 6 kg ». Ne pas montrer la barre collante sur le panier (elle y est déjà cachée).

### FIX-8 : ce qui bloque 90 (moyen, client)

- Relevé réel du rayon bio, avec tickets et date, et la décision sur le parti pris « nous sommes un peu plus chers, voici pourquoi ». Le même écart de 3,11 € pour les deux paniers sera alors un vrai chiffre, ou il changera.
- Trois avis réels signés (prénom, relais, formule), à la place des avis provisoires.
- Les 11 relais : nom du commerce et adresse.
- Le shooting à la ferme en novembre : fiches légumes, récit, journal ; et Mathieu à la récolte du lundi, pour la section ferme.
- Les vrais chiffres : 312 foyers, 60 légumes, poids des paniers, 7ᵉ légume du grand panier.

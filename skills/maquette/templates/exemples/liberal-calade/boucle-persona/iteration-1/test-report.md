# Boucle persona, tour 1 : rapport de test

- **Date** : 4 novembre 2026
- **Page testée** : exemple « Atelier Calade » (éditorial magazine), http://127.0.0.1:4331/liberal-calade/
  (`index.html`, `calade.src.css`, `gestes.js`, `images/`)
- **Cadrage et marque** : `boucle-persona/brief.md`. Budget IA : 0 €. Médias provisoires (Unsplash), donc seuil **85**.
- **Outil** : Playwright + Chrome sans interface, défilement par `window.lenis.scrollTo(y, {immediate:true, force:true})` puis 1,5 s d'attente avant chaque capture.
- **Regard indépendant : les rapports du relecteur n'ont pas été lus** (ni `NOTES.md`, ni aucun autre rapport).

Je suis Hélène Garcin. J'ai fondé l'atelier en 2009, je fais de la réhabilitation de bâti
ancien en Vaucluse et j'ai payé ce site 25 000 €. Ensuite je suis Claire, 54 ans, cadre à
Lyon, qui vient d'acheter une grange près de Bonnieux et se demande combien coûte un
architecte « en vrai ».

---

## 1. Les 5 premières secondes

**Ordinateur 1440 × 900** (`captures/d-02-premier-ecran.webp`, et `d-01-premier-ecran-1s.webp` à 1,2 s : identique, rien ne saute au chargement)

- Le titre « Garder la pierre, *ouvrir* la lumière. » en Bodoni énorme chevauche la photo
  verticale de l'escalier à la chaux. Le folio porte de vraies informations (« Hiver
  2026 · L'Isle-sur-la-Sorgue · 64 bâtisses depuis 2009 · **2 chantiers ouverts au
  printemps 2027** »). C'est une couverture de revue, pas un gabarit : j'en suis fière.
- **Quoi, pour qui** : clair en une phrase (« Nous réhabilitons mas, granges et maisons
  de village du Vaucluse »).
- **Quoi faire** : bouton « Faire visiter votre bâtisse » à 728–785 px, visible.
- **À quel prix** : rien dans le premier écran. Claire ne sait pas que « faire visiter »
  est une prestation payante de 240 € ; elle peut même comprendre l'inverse (elle fait
  visiter sa maison à quelqu'un). Le prix n'arrive qu'au 5ᵉ écran.
- Détail : le bouton est posé pile sur le filet de « À la une » (bas du bouton = haut du
  filet, 785 px) ; ça colle.

**1280 × 720** (`captures/d-1280x720-premier-ecran.webp`) : le titre commence à 234 px,
sous l'en-tête, le bouton finit à 605 px. Bon.

**Téléphone 375 × 812, 375 × 667, 360 × 740** (`captures/m-375x812-premier-ecran.webp`,
`m-375x667-premier-ecran.webp`, `m-360x740-premier-ecran.webp`) : photo, titre qui la
chevauche, chapeau, bouton. Bouton en bas à 641 px sur 667 : visible sans défiler. Aucun
débordement horizontal (`scrollWidth` = largeur d'écran aux trois tailles). Le folio se
réduit à « Hiver 2026 · 2 chantiers ouverts au printemps 2027 ». Toujours pas de prix.

## 2. Le défilement complet (1440 × 900)

Série : `captures/d-serie-01-y0.webp` à `d-serie-10-y7200.webp` (pas de 800 px), plus
`d-sommaire-survol-1.webp`, `d-sommaire-survol-3.webp`, `d-sommaire-ouvert.webp`.
Page entière en mouvement réduit : `captures/r-pleine-page-1440.webp`.

1. **Sommaire** (`d-serie-02`) : quatre lignes en Bodoni, année, lieu et surface. Au
   survol, les autres titres pâlissent et la photo suit le curseur
   (`d-sommaire-survol-1`, `-3`). Le moment signature marche, il est fluide.
   - Mais à l'œil du métier, les photos qui apparaissent sont fausses (voir § 6).
   - Ligne ouverte (`d-sommaire-ouvert`) : l'image flottante reste affichée **par-dessus**
     la grande photo de la même entrée, et masque la fin du titre « …habitants ». Deux fois
     la même bergerie à l'écran, dont une penchée à coins arrondis (14 px) qui jure avec
     les angles droits de toute la page.
   - Seule la première entrée mène quelque part (« Lire le chantier »). Les trois autres
     ne mènent à rien.
2. **Article bergerie** (`d-serie-03`, `-04`) : grande photo verticale, colonne étroite,
   fiche « 165 m² · 11 mois ». La mise en page est juste. La photo, non (voir § 6).
3. **La matière** (`d-serie-04`, `-05`) : composition décalée en quatre images, légendes
   concrètes (« Enduit chaux aérienne, trois passes, taloché fin »). C'est ma voix.
   Une légende est fausse : « Midi en décembre, salon nord » avec un rectangle de soleil.
   Un salon au nord ne voit pas le soleil à midi en décembre.
4. **Honoraires** (`d-serie-06`) : 240 € / dès 4 800 € / 9 %. Enfin un architecte qui dit
   ses prix : c'est ce qui me distingue des confrères d'Avignon. Mais aucun bouton après ce
   bloc sur ordinateur, alors que c'est le bloc qui lève l'objection principale.
5. **Portrait** (`d-serie-07`) : « Hélène Garcin, architecte » sur une photo d'une jeune
   femme pieds nus dans un studio photo (fond cyclo, radiateur en fonte, fenêtres
   d'atelier industriel). Moi, j'ai fondé l'atelier il y a dix-sept ans.
6. **Citation** (`d-serie-08`) : « On voulait raser la grange. C'est devenu la pièce où
   l'on vit. » Très beau en grand. Mais la photo à côté montre une grange **non restaurée**
   au toit d'ardoise, ciel gris, herbe verte : l'inverse de ce que dit la phrase.
7. **Nous écrire** (`d-serie-09`, `-10`) : titre « Racontez-nous votre bâtisse »,
   adresse, téléphone, formulaire. Pied de page sobre.

Rien ne clignote, rien ne cache l'action ; l'en-tête se cache en descendant et revient en
remontant. Défilement rapide (pas de 800 px enchaînés) : aucune image vide, aucun saut.
Hauteur : 7 230 px, soit 8,5 écrans.

**Téléphone** (`captures/m-serie-01-y0.webp` à `m-serie-06-y7000.webp`,
`m-sommaire-ouvert.webp`, `r-pleine-page-375.webp`) : le sommaire devient un accordéon
propre (cible de 44 px), la barre « Faire visiter votre bâtisse » apparaît après la
couverture et disparaît sur le formulaire. Les quatre photos de « La matière » s'empilent
toutes en pleine largeur : le rythme décalé de l'ordinateur se perd, on fait défiler un
long mur d'images de même taille.

## 3. Le parcours de Claire jusqu'à l'action

- En-tête : « Réalisations », « Honoraires », « Nous écrire » amènent chacun la section à
  160 px du haut, sous l'en-tête (`captures/d-nav-ecrire.webp`). « À la une » et « Lire le
  chantier » mènent à l'article (`d-lire-chantier.webp`).
- Formulaire envoyé vide (`captures/d-form-erreurs.webp`) : trois messages clairs
  (« Indiquez votre nom. », « Indiquez la commune de la bâtisse. », « Un téléphone à 10
  chiffres ou un e-mail. »), focus sur le premier champ. Bien fait.
- Rempli avec des données de test (« Claire Test », « Bonnieux », « 06 12 34 56 78 »,
  « Achat en cours ») : confirmation « C'est noté, Claire. Hélène vous rappelle sous 48
  heures pour fixer la visite. » (`d-form-confirmation.webp`). Rien n'est envoyé.
  - Le titre dit « Racontez-nous votre bâtisse », mais il n'y a **aucun champ pour la
    raconter** (surface, état, ce qu'on veut en faire, budget). Claire repart avec
    l'impression d'avoir rempli une fiche d'appel.
  - Le prix de la visite (240 €) n'est rappelé ni près du bouton ni dans la
    confirmation.
  - Après envoi, le bouton est désactivé mais garde son vert plein : on croit pouvoir
    recliquer.
  - Le champ « Téléphone ou e-mail » a `autocomplete="email"` : un téléphone tapé ne sera
    pas proposé par le navigateur. Et « Hélène vous rappelle » si on a donné un e-mail.
- Les chiffres concordent d'un bloc à l'autre : « 2 chantiers ouverts au printemps 2027 »
  (folio et formulaire), 165 m² bergerie (sommaire et fiche), Gordes 2025 partout.
- Ce qui manque à Claire : combien elle va payer pour **sa** grange (9 % de 300 000 €,
  c'est 27 000 €, la page ne fait pas le calcul) ; pourquoi un architecte plutôt qu'un
  maître d'œuvre (l'argument légal des 150 m² n'est pas dit, alors que trois chantiers
  sur quatre le dépassent) ; et qui suit le chantier quand on vit à Lyon.

## 4. Le clavier (40 tabulations depuis le haut)

Relevé complet dans le script ; captures `d-clavier-tab1.webp`, `d-clavier-tab7.webp`,
`d-clavier-tab15.webp`. 18 éléments atteints dans l'ordre, puis retour au début :
lien d'évitement, logo, Réalisations, Honoraires, Nous écrire, bouton de couverture,
« À la une », les 4 lignes du sommaire, téléphone, 3 champs, liste, bouton d'envoi,
« Haut de page ». Tous visibles au focus (contour 2 px vert, ou soulignement vert pour
les champs). Aucun focus caché sous l'en-tête. Le soulignement des champs au focus
(vert 2 px à la place du noir 1,5 px) est faible : on le voit à peine
(`d-clavier-tab15.webp`).

## 5. Mouvement réduit

`reducedMotion: 'reduce'` : classe `motion-reduit`, aucun titre découpé
(`[data-split][aria-hidden]` = 0), aucun élément de texte resté à opacité 0 ou caché,
toutes les images présentes (`captures/r-pleine-page-1440.webp`,
`r-pleine-page-375.webp`). La page est complète et lisible.

## 6. L'œil du métier

Ce qui est juste : la chaux aérienne en trois passes, l'ABF, les surfaces en m², le suivi
hebdomadaire jusqu'à la réception, des lieux réels du Luberon (Gordes, Les Imberts,
Cabrières-d'Avignon, Lagnes, Ménerbes), des honoraires plausibles.

Ce qui se voit en trois secondes :

| Où | Ce que la page dit | Ce que montre la photo | Pourquoi c'est faux |
|---|---|---|---|
| Bergerie des Imberts (« À la une », sommaire, article pleine page) | bergerie de 1820 à Gordes, verrière posée dessus | une fouille archéologique sous un pavillon de musée : galets roulés, muret de **brique rouge**, **vitrine éclairée avec objets exposés** | À Gordes, c'est de la pierre calcaire, montée à sec ou à la chaux. Ni galets, ni brique, ni vitrine. Et la verrière de la photo est sur poteaux, pas « posée sur le mur ». |
| Grange Berthier, Lagnes (sommaire + citation) | grange devenue maison, 7 m sous charpente ; « la pièce où l'on vit » | grange **non restaurée**, toit d'**ardoise**, pierre grise, herbe verte, ciel bas | Une grange de Normandie ou de Bretagne. Dans le Vaucluse : tuile canal, calcaire blond. Et c'est l'« avant », pas l'« après ». |
| Mas de la Roque, Cabrières-d'Avignon | « toiture reprise en matériaux de réemploi » | toiture en **lauzes calcaires** à coyaux | Les Causses ou la Lozère. Un mas de Cabrières est couvert en tuile canal. « Matériaux de réemploi » est vague, l'inverse de ma voix (« chaux aérienne, trois passes »). |
| Portrait | Hélène Garcin, fondatrice en 2009 | jeune femme pieds nus dans un studio photo à fond cyclo | L'âge ne colle pas avec dix-sept ans d'atelier, et ce n'est pas un lieu de travail. Claire, 54 ans, ne confiera pas 400 000 € de travaux à cette image. |
| Matière | « Midi en décembre, salon nord » | rectangle de soleil sur un mur | Orientation impossible. |
| Matière | « Alcôve taillée sous l'escalier » | une chaise de poupée dans une niche de béton gravé | Une installation d'art, pas une alcôve habitée. |
| Article | « Gordes, site classé » ; « Les Bâtiments de France ont validé le permis » | — | En site classé, c'est une autorisation spéciale du préfet ou du ministre, pas l'ABF. Et l'ABF donne un accord (ou un avis) ; c'est le maire qui délivre le permis. |
| Honoraires | « Forfait HT », « 240 € » sans mention | — | Mes clients sont des particuliers : les prix s'affichent TTC. Un HT seul fait petit malin. |
| Portrait | « Elle dessine chaque projet » | — | Le mot « projet » que je déteste, ici même. |

Le témoignage des Berthier n'est pas marqué comme provisoire, alors que « 64 bâtisses »
l'est (soulignement pointillé `.provisoire`). En maquette, une preuve à venir se marque ;
elle ne se donne pas pour vraie.

## 7. La densité (conventions § 11)

Comptage à 1440 × 900, mouvement réduit (rien de découpé), accordéons ouverts, images
chargées puis 3 s d'attente :

| Bloc | Mots |
|---|---|
| lien d'évitement | 3 |
| en-tête | 6 |
| couverture | 53 |
| sommaire | 53 |
| bergerie | 52 |
| matière | 24 |
| honoraires | 56 |
| atelier (portrait) | 27 |
| témoignage | 20 |
| écrire | 50 |
| pied de page | 11 |
| **Total** | **355 mots · 8 sections · 8,5 écrans** |

Dans le budget commun (moins de 400, 7 à 9 sections, 8 à 12 écrans) et dans la cible de
la fiche magazine (320 à 390). Aucune section au-delà de 3 phrases. Il reste 35 mots de
marge pour les ajouts du plan (prix dans la couverture, argument des 150 m²).

## 8. Console

Ordinateur et mouvement réduit : aucune erreur, aucun avertissement, aucune ressource en
échec, aucune réponse HTTP ≥ 400. Poids : deux images lourdes pour leur taille,
`grange-900.webp` (278 Ko pour 900 px) et `niche-1400.webp` (609 Ko).

## 9. Ce qui est déjà au niveau

- La couverture, le folio informatif, le sommaire qui révèle les images : c'est une revue
  d'architecture, comme je l'avais demandé.
- La palette chaux / encre / vert Sorgue, le Bodoni : on me reconnaît sans le logo, et ça
  n'est pas le « crème + terracotta » de tout le monde.
- Les prix publics, en grand. Personne d'autre ne le fait à Avignon ou Cavaillon.
- Le formulaire accessible, le mouvement réduit complet, le clavier sans trou.

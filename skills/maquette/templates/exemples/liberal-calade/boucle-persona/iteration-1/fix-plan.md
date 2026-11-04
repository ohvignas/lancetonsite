# Boucle persona, tour 1 : plan de corrections

Page : exemple « Atelier Calade » · 4 novembre 2026 · note 75 / 100, seuil 85.
Budget IA : 0 €. Les FIX d'image se font d'abord à **0 $** avec une photo libre
(Unsplash, Pexels) fidèle au Vaucluse ; le prix d'une génération est donné pour mémoire,
**non lancée**. Le définitif reste au client (vraies photos).
**Budget de mots.** La page compte 355 mots ; la cible magazine plafonne à 390. Les ajouts
du plan sont donc comptés au plus juste :

| FIX | Mots |
|---|---|
| FIX-3 (une phrase sous les honoraires) | +16 |
| FIX-6 (ligne sous le bouton, bouton après honoraires, phrase de `#ecrire` remplacée) | +5, +3, −1 |
| FIX-7 (« TTC ») | +3 |
| FIX-9 (label du champ libre, ligne « Le chantier ») | +5, +2 |
| FIX-10 (liens du sommaire portés par les images, sans texte) | 0 |
| FIX-6 bis : retirer « Ouvrez une ligne pour voir le chantier. » (le « + » et le survol suffisent) | −7 |
| **Après le plan** | **≈ 381** |

Recompter après application (script de `conventions.md` § 11). Au-delà de 390, couper
d'abord dans les ajouts, jamais dans les prix.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-1 | bloquant | 0 $ (photo libre) · génération ≈ 0,10 $ non lancée · client pour le définitif | La « bergerie de Gordes » est une fouille sous un pavillon de musée (galets, brique, vitrine) : elle est vue 4 fois |
| FIX-2 | majeur | 0 $ (photo libre) · génération ≈ 0,20 $ (2 images) non lancée · client | La grange de Lagnes est une grange d'ardoise non restaurée, vue 2 fois, dont à côté de « la pièce où l'on vit » |
| FIX-3 | majeur | 0 $ | L'objection n° 1 (architecte ou maître d'œuvre) n'a pas sa réponse : dire les 150 m² et chiffrer les 9 % |
| FIX-4 | majeur | 0 $ (photo libre) · génération ≈ 0,10 $ non lancée · client | Le portrait d'Hélène Garcin montre une jeune femme pieds nus en studio, pas une fondatrice de 2009 |
| FIX-5 | moyen | 0 $ (photo libre) · génération ≈ 0,10 $ non lancée · client | Le mas de Cabrières a un toit de lauzes des Causses ; « matériaux de réemploi » est vague |
| FIX-6 | moyen | 0 $ | Pas de prix au premier écran ; « Faire visiter votre bâtisse » ne dit pas que la visite coûte 240 € ; pas d'action après les honoraires |
| FIX-7 | moyen | 0 $ | Prix affichés HT pour des particuliers : passer en TTC |
| FIX-8 | moyen | 0 $ | « Site classé » et « l'ABF a validé le permis » : procédure fausse |
| FIX-9 | moyen | 0 $ | « Racontez-nous votre bâtisse » sans champ pour la raconter ; « on n'habite pas sur place » non traité ; confirmation et autocomplétion à reprendre |
| FIX-10 | moyen | 0 $ | Sommaire : l'image flottante reste par-dessus l'entrée ouverte ; coins arrondis et rotation hors charte ; 3 entrées sur 4 sans lien |
| FIX-11 | moyen | 0 $ (client pour le vrai) | Témoignage des Berthier non marqué provisoire |
| FIX-12 | léger | 0 $ | « Midi en décembre, salon nord » : orientation impossible ; alcôve à chaise de poupée |
| FIX-13 | léger | 0 $ | « Elle dessine chaque projet » : le mot que la patronne déteste |
| FIX-14 | léger | 0 $ | Focus des champs trop discret ; bouton désactivé sans état visible ; deux images trop lourdes |
| FIX-15 | léger | 0 $ | « La matière » sur téléphone : quatre images pleine largeur à la suite, le rythme se perd |

---

## FIX-1 · bloquant · la bergerie est un musée

**Quoi.** `images/bergerie-*.webp` montre des murs de galets roulés, un muret de brique
rouge et une vitrine éclairée avec objets exposés sous un pavillon d'acier sur poteaux.
À Gordes, une bergerie est en calcaire monté à sec ou à la chaux. C'est la photo la plus
vue de la page.

**Où.** `index.html` l. 55 (vignette « À la une »), l. 68 (`data-follow-img`), l. 72
(image de l'entrée), l. 110 (article pleine page) ; capture `captures/d-serie-03-y1600.webp`.

**Comment.** Remplacer par une photo libre d'intérieur en pierre calcaire blonde sous une
verrière ou un grand vitrage (bergerie, mas, borie), sans brique ni vitrine ; recadrer en
verticale 3:4 (1800 × 2400 et 900 × 1200). Réécrire l'alt d'après la photo retenue. Si la
photo trouvée montre un vitrage posé sur poteaux et non sur le mur, adapter le titre l. 114
(« La verrière posée au-dessus des murs de 1820 »). Génération possible plus tard
(≈ 0,10 $), non lancée : budget 0 €.

## FIX-2 · majeur · la grange est normande, et pas restaurée

**Quoi.** `images/grange-900.webp` : toit d'ardoise, pierre grise, herbe verte, ciel bas,
bâtiment dans son état d'origine. Lagnes est en tuile canal et calcaire. Placée à côté de
« C'est devenu la pièce où l'on vit », elle dit l'inverse de la citation.

**Où.** `index.html` l. 86 et l. 90 (sommaire), l. 175 (citation) ;
`captures/d-sommaire-survol-3.webp`, `d-serie-08-y5600.webp`.

**Comment.** Deux images différentes : pour le sommaire, un pignon de grange en calcaire
à tuile canal (l'extérieur restauré) ; pour la citation, **l'intérieur** — une grande
pièce sous charpente de bois, murs de pierre ou chaux (c'est « la pièce où l'on vit »,
« 7 m sous charpente »). Ne plus réutiliser la même photo deux fois. Recompresser
(aujourd'hui 278 Ko pour 900 px, viser 120 Ko).

## FIX-3 · majeur · répondre à « pourquoi un architecte plutôt qu'un maître d'œuvre »

**Quoi.** C'est l'objection la plus forte de Claire. La section honoraires donne les prix
mais ne dit ni l'obligation légale, ni ce que représentent 9 % pour son budget.

**Où.** `index.html`, section `#honoraires`, après le `</ol>` l. 151.

**Comment.** Une ligne `.chapeau` sous la liste, en voix de la marque (16 mots) :
« Architecte obligatoire au-delà de 150 m². Pour 300 000 € de travaux, le suivi revient à
32 400 € TTC. » (9 % de 300 000 € = 27 000 € HT, soit 32 400 € TTC à 20 %.) Les surfaces
du sommaire (165, 180, 240 m²) font la preuve sans la dire.

## FIX-4 · majeur · le portrait n'est pas la fondatrice

**Quoi.** `images/portrait-*.webp` : une jeune femme pieds nus dans un studio photo à fond
cyclo, radiateur en fonte, fenêtres d'atelier industriel. Hélène a fondé l'atelier en
2009 ; Claire (54 ans) doit pouvoir lui confier 300 000 à 450 000 € de travaux.

**Où.** `index.html` l. 158 ; `captures/d-serie-07-y4800.webp`.

**Comment.** Photo libre d'une femme d'une cinquantaine d'années au travail : sur un
chantier en pierre, devant une table à plans, ou dans une pièce enduite à la chaux ;
habillée pour le chantier. Garder le cadrage large 3:2. Annotation : « portrait réel à
faire à l'atelier ». Au vrai projet : séance photo avec le client (coût client).

## FIX-5 · moyen · le mas a des lauzes des Causses

**Quoi.** `images/mas-900.webp` : toiture en lauzes calcaires à coyaux, typique de la
Lozère ou de l'Aveyron ; un mas de Cabrières-d'Avignon est en tuile canal. Et « Toiture
reprise en matériaux de réemploi » est vague, l'inverse de la voix (« chaux aérienne,
trois passes »).

**Où.** `index.html` l. 77, l. 81 (alt « toiture de lauzes »), l. 82 ;
`captures/m-sommaire-ouvert.webp`.

**Comment.** Photo libre d'un mas provençal en calcaire, tuile canal, génoise, volets
peints. Texte l. 82 : « Toiture reprise en tuiles canal de réemploi, quatre chambres sous
les combles. » Alt réécrit d'après la photo.

## FIX-6 · moyen · le prix et la nature de la visite dès le premier écran

**Quoi.** « À quel prix » n'a pas de réponse avant le 5ᵉ écran ; « Faire visiter votre
bâtisse » peut se lire « faire visiter ma maison à quelqu'un ». Et sur ordinateur, aucun
bouton après les honoraires, qui lèvent l'objection principale.

**Où.** `index.html` l. 51-54 (couverture) ; l. 151 (fin des honoraires).

**Comment.**
1. Sous le bouton de couverture, une ligne `.petit` (5 mots) : « Visite sur place : 240 € TTC. »
2. Après le `</ol>` des honoraires (après la phrase de FIX-3), un lien-bouton
   `<a href="#ecrire" class="bouton mt-10">Demander la visite</a>` (3 mots).
3. Dans `#ecrire` l. 185 : « Visite sur place, 240 € TTC. Réponse sous 48 heures. »
   (remplace la phrase sur les chantiers, déjà dans le folio).
4. Corriger l'écart vertical du bouton de couverture : `.couverture-pied` en
   `margin-bottom: 1.25rem` (le bas du bouton touche le filet de « À la une »).
5. (FIX-6 bis, pour le budget) Retirer l. 64 « Ouvrez une ligne pour voir le chantier. »

## FIX-7 · moyen · des prix TTC pour des particuliers

**Quoi.** Les clients sont des particuliers : les prix de prestation s'affichent TTC.
« Forfait HT » et « 9 % du montant HT » seuls donnent l'impression qu'on cache la TVA ;
« 240 € » ne dit pas s'il est HT ou TTC.

**Où.** `index.html` l. 140-149.

**Comment.** « 240 € TTC » ; « dès 5 760 € TTC » (4 800 € HT) ; garder « 9 % » avec
« du montant HT des travaux, TVA en sus ». Mettre aussi « TTC » dans la ligne de FIX-6 et
la meta description (l. 13). À faire valider par le client (règle commerciale).

## FIX-8 · moyen · la procédure ABF

**Quoi.** « Gordes, site classé » + « Les Bâtiments de France ont validé le permis au
premier passage » : en site classé, les travaux relèvent d'une autorisation spéciale du
préfet ou du ministre ; et l'architecte des Bâtiments de France donne un accord, c'est la
mairie qui délivre le permis. Une architecte ne l'écrirait pas.

**Où.** `index.html` l. 113 et l. 115.

**Comment.** l. 113 : « Gordes, abords de monument historique · 2025 » (ou « site
inscrit »). l. 115, dernière phrase : « L'architecte des Bâtiments de France a donné son
accord dès le premier dépôt. » Même nombre de phrases.

## FIX-9 · moyen · le formulaire ne laisse pas raconter, ni rassure qui vit loin

**Quoi.** Titre « Racontez-nous votre bâtisse » sans champ libre ; rien pour « on
n'habite pas sur place : qui suit le chantier ? » ; `autocomplete="email"` sur un champ
téléphone ou e-mail ; « Hélène vous rappelle » même quand on a laissé un e-mail.

**Où.** `index.html` l. 191-198 (formulaire), l. 194 (contact), l. 243 (confirmation),
l. 149 (ligne « Le chantier »).

**Comment.**
1. Après la liste « Où en êtes-vous ? », un `textarea` facultatif : label « Votre bâtisse
   en deux lignes » (5 mots), `placeholder="Surface, état, ce que vous voulez en faire"`
   (`id="bati"`, `rows="3"`, même style que `.champ input`).
2. l. 194 : `autocomplete="on"` (ou retirer l'attribut) et garder la validation.
3. l. 243 : « C'est noté, ${prenom}. Hélène vous recontacte sous 48 heures pour fixer la
   visite. »
4. l. 149 : « Du montant HT des travaux, suivi chaque semaine, compte rendu photo
   jusqu'à la réception. » (+2 mots ; c'est la réponse à « on n'habite pas sur place ».)

## FIX-10 · moyen · le sommaire, moment signature, à finir

**Quoi.** (a) Une fois une entrée ouverte, l'image flottante reste par-dessus la grande
photo de la même entrée et masque la fin du titre de section
(`captures/d-sommaire-ouvert.webp`). (b) L'image flottante a 14 px de coins arrondis et
une rotation de ± 6°, hors du langage à angles droits de la page. (c) Seule la bergerie
mène à un chantier ; la fiche demande que chaque entrée mène à sa page.

**Où.** (a, b) `gestes.js` l. 651 (`borderRadius: "14px"`), l. 656 (rotation), l. 685-692
(`pointerenter`) ; (c) `index.html` l. 82, 91, 100.

**Comment.** (a) Dans le `pointerenter`, ne pas afficher l'image si
`ligne.closest("details")?.open`, et appeler `ranger()` au `toggle` du `details`.
(b) Exposer `data-follow-radius` / `data-follow-tilt` (ou les lire en CSS) et mettre 0
pour Calade. (c) Envelopper l'image de chaque entrée ouverte dans un lien vers sa future
page (`<a href="#" aria-label="Lire le chantier : …">`, annotation « page de chantier à
construire ») : aucun mot visible en plus ; la bergerie garde son lien texte. (a) et (b) viennent du kit :
à signaler dans « Retours sur le plugin ».

## FIX-11 · moyen · le témoignage se donne pour vrai

**Quoi.** « 64 bâtisses » porte la classe `.provisoire` ; la citation des Berthier non,
alors que c'est la seule preuve client de la page.

**Où.** `index.html` l. 171-172.

**Comment.** Mettre `class="provisoire"` sur le `footer` de la citation et ajouter
l'annotation de maquette « avis réel à recueillir (nom, lieu, année, accord écrit) ».
Au vrai projet : témoignage signé fourni par le client.

## FIX-12 · léger · deux légendes de la matière

**Quoi.** « Midi en décembre, salon nord » avec un rectangle de soleil : un salon orienté
nord ne voit pas le soleil à midi en hiver. « Alcôve taillée sous l'escalier » montre une
chaise de poupée dans une niche de béton gravé.

**Où.** `index.html` l. 129 et l. 131.

**Comment.** l. 129 : « Midi en décembre, fenêtre plein sud ». l. 131 : choisir une photo
libre d'alcôve ou de banquette maçonnée à la chaux, à l'échelle humaine ; sinon retirer la
figure et élargir l'enduit (la grille garde 3 images).

## FIX-13 · léger · « projet »

**Quoi.** « Elle dessine chaque projet » : le mot que la patronne déteste.

**Où.** `index.html` l. 162.

**Comment.** « Elle dessine chaque maison et la suit jusqu'à la réception, avec deux
architectes et un conducteur de travaux. »

## FIX-14 · léger · focus, bouton désactivé, poids

**Quoi.** Au focus, les champs passent d'un trait noir de 1,5 px à un trait vert de 2 px :
peu visible (`captures/d-clavier-tab15.webp`). Après envoi, le bouton désactivé garde son
vert. `niche-1400.webp` pèse 609 Ko, `grange-900.webp` 278 Ko.

**Où.** `calade.src.css` l. 161 ; l. 44-45 (`.bouton`) ; `images/`.

**Comment.** l. 161 : `box-shadow: 0 3px 0 var(--color-sorgue)` et fond
`var(--color-chaux-2)` au focus. Ajouter `.bouton:disabled { opacity: .55; cursor: default; }`.
Recompresser les deux images (`cwebp -q 72`), viser moins de 200 Ko pour la 1400.
Recompiler `calade.css`.

## FIX-15 · léger · « La matière » sur téléphone

**Quoi.** Sous 900 px, les quatre images s'empilent en pleine largeur, à la suite : on
fait défiler un mur d'images de même taille (`captures/r-pleine-page-375.webp`).

**Où.** `calade.src.css` l. 117-119.

**Comment.** Sous 900 px : grille à 2 colonnes, l'enduit en pleine largeur
(`grid-column: 1 / -1`), niche et lumière côte à côte, alcôve à 70 % de large décalée à
droite. Légendes conservées.

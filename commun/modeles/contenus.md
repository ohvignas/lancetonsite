# Modèle : contenus (guide éditorial et textes par page)

> Livrables : `projet-site/05-contenus/guide.md` et un fichier par page
> (`05-contenus/accueil.md`…) · Étape 5 · Version courte : 8 min visées

## À quoi il sert

Deux choses. Le **guide éditorial** fixe comment la marque écrit, pour que tous les
textes, aujourd'hui et dans un an, sonnent pareil. Les **textes par page** sont les
textes finaux, prêts à intégrer, bloc par bloc, dans l'ordre du zoning, avec leurs
balises SEO. Le patron relit les textes à voix haute : s'il ne dirait pas une phrase à
un client, elle est réécrite.

Lecteur : le patron ; ensuite toute personne qui écrira pour le site (articles, e-mails).

## Sommaire type : guide éditorial

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Principes d'écriture | 3 à 4 principes (exemple : clair avant drôle, le bénéfice avant la fonction) | 4 lignes | Liste |
| 2 | Voix et ton | La voix (stable) et le ton selon la situation : accueil, erreur, relance, confirmation | 4 à 6 lignes | Tableau situation / état d'esprit du lecteur / ton / exemple |
| 3 | Vocabulaire | Mots à employer, mots interdits, termes métier et leur explication | 8 à 15 lignes | Tableau oui / non |
| 4 | Règles de forme | Tutoiement ou vouvoiement, majuscules, nombres, dates, prix (HT ou TTC), ponctuation | 6 à 10 lignes | Liste |
| 5 | Éléments web | Boutons (verbe + bénéfice), liens, messages d'erreur, champs de formulaire, textes alternatifs | 6 lignes | Tableau élément / règle / exemple |
| 6 | Anti « texte d'IA » | Tournures bannies (« dans un monde où », « n'hésitez pas », listes de trois adjectifs) | 5 à 8 lignes | Liste |

## Sommaire type : fichier d'une page

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Fiche | URL, objectif de la page, requête principale, action attendue | 4 lignes | Liste |
| 2 | Balises | Title (50 à 60 caractères), meta description (140 à 155), H1 | 3 lignes | Tableau avec nombre de caractères |
| 3 | Textes par bloc | Pour chaque bloc du zoning : surtitre, titre, texte, bouton | Selon le bloc | Titres de niveau 3 dans l'ordre du zoning |
| 4 | FAQ | 4 à 6 questions réelles du client, réponses de 2 à 3 phrases | 15 à 25 lignes | Questions en gras |
| 5 | Micro-textes | Confirmation, erreur de formulaire, état vide | 3 à 5 lignes | Tableau |
| 6 | Textes alternatifs | Un par image prévue, qui décrit ce qu'on voit et pourquoi | 1 ligne par image | Tableau |
| 7 | Sources | D'où viennent les chiffres, avis et citations | 2 à 5 lignes | Liste |

### Détails qui comptent

- Le tableau ton/situation est la pièce maîtresse des guides éditoriaux publics : le ton
  dépend de l'état d'esprit du lecteur (pressé, inquiet, content).

| Situation | Le lecteur est… | Ton | Exemple |
|---|---|---|---|
| Accueil | curieux, méfiant | direct, concret | « Vos impayés relancés à votre place, poliment. » |
| Erreur de paiement | agacé | calme, utile | « Le paiement n'est pas passé. Votre carte n'a pas été débitée. » |

- Chaque chiffre ou avis cité renvoie à une source dans la section 7. Un chiffre sans
  source se retire, ou porte `[À PROUVER : …]` dans le document (jamais en HTML).
- Un avis cité, ou un texte que le client demande de reprendre « sans réécriture »,
  se reproduit mot pour mot, sans coupe, source notée. Les limites de longueur et les
  règles de style ne s'y appliquent pas.

## Ce qui le rend « niveau agence »

1. Tous les titres de la page d'accueil réussissent le test du concurrent (ils ne
   seraient pas vrais chez un concurrent du cadrage).
2. Chaque bouton commence par un verbe et dit ce qu'on obtient (« Essayer 14 jours »,
   pas « Envoyer »).
3. Title et meta description respectent les longueurs et contiennent la requête
   principale.
4. La FAQ reprend des questions réellement posées (avis, forums, entretien), pas
   inventées pour placer des mots-clés.
5. Aucune tournure de la liste anti « texte d'IA » ne subsiste après relecture.

## Version courte (par défaut)

Temps visé : 8 min. Les pages sont écrites en parallèle (un agent par page) à partir du même
guide.

- **On garde** : guide en 1 écran (principes, tableau ton/situation, 6 mots oui/non,
  règles de forme essentielles) ; textes complets de la page d'accueil et des pages qui
  vendent ; balises de toutes les pages ; FAQ de 4 questions.
- **On reporte** : pages secondaires (à propos, blog), micro-textes détaillés, mentions
  légales (laissées à compléter, avec la liste des champs obligatoires).

```markdown
# {Page} — textes
> Étape 5 — mis à jour le JJ/MM/AAAA — statut : brouillon

- URL : · Objectif : · Requête : · Action :

| Balise | Texte | Caractères |
|---|---|---|
| Title | | |
| Meta description | | |
| H1 | | |

### Bloc 1 — Hero
Surtitre :
Titre :
Texte :
Bouton :

### FAQ
**Question ?**
Réponse.

| Image | Texte alternatif |
|---|---|
```

## Comment le publier

Markdown en artifact Docs, un document par page, plus le guide. Les textes sont écrits
dans l'ordre exact du zoning pour que la maquette les reprenne sans réinterprétation.

## Sources consultées

- Mailchimp Content Style Guide, principes d'écriture :
  https://styleguide.mailchimp.com/writing-principles/
- Mailchimp, voix et ton selon l'état d'esprit du lecteur :
  https://styleguide.mailchimp.com/voice-and-tone/
- Mailchimp, version résumée (TL;DR) et éléments web : https://styleguide.mailchimp.com/tldr/

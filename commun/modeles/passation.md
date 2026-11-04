# Modèle : passation

> Livrable : `projet-site/09-passation.md` (partie A, étape 9 : conception vers
> construction) et, à la mise en ligne, la **remise au client** (même fichier, partie B,
> étape 12) · Version courte : A fondue dans les 4 min du PRD, B 5 min

## À quoi il sert

Deux moments, un seul document :

- **A. Conception vers construction.** Tout est-il prêt pour coder ? Ce qui est validé,
  ce qui est provisoire, où sont les fichiers. C'est le « handoff » des agences entre
  l'équipe design et les développeurs.
- **B. Remise au client.** Le site est en ligne : le patron reçoit les clés (domaine,
  hébergement, accès d'administration, outils de mesure), sait modifier ses contenus et
  sait qui appeler. Une agence peut livrer un beau site et garder pourtant le contrôle du
  domaine ; ce document l'empêche.

Lecteur : A, Claude en construction ; B, le patron, qui doit pouvoir le retrouver dans
deux ans pour savoir quand le nom de domaine se renouvelle.

## Sommaire type

### Partie A : conception vers construction

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| A1 | État des étapes | Chaque livrable 1 à 8 : statut (`validé`, `validé (simulé)`, `brouillon`), date | 8 lignes | Tableau |
| A2 | Où sont les fichiers | Chemins de la maquette, du design system, des médias, des textes | 6 lignes | Liste de chemins |
| A3 | Provisoire | Médias, chiffres `[H]` et textes à remplacer, avec qui les fournit | 3 à 8 lignes | Tableau |
| A4 | Décisions à ne pas rejouer | Choix tranchés pendant la conception, pour ne pas les rediscuter | 3 à 6 lignes | Liste |
| A5 | Points d'attention | Ce que la construction risque de rater (une animation, un état mobile) | 3 à 5 lignes | Liste |

### Partie B : remise au client

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| B1 | Accès et propriété | Domaine, hébergement, administration du site, e-mail, analytics, Search Console : titulaire (doit être l'entreprise), où se connecter, double authentification, date de renouvellement. **Jamais les mots de passe dans le document** : ils vont dans un gestionnaire de mots de passe | 6 à 10 lignes | Tableau |
| B2 | Fiche technique | Stack, versions, dépôt de code, services tiers, certificat HTTPS | 6 lignes | Tableau |
| B3 | Modifier son site | Les 5 modifications courantes pas à pas (texte, image, article, prix, horaires), et ce qu'il vaut mieux confier à un pro | 10 à 20 lignes | Liste numérotée + lien vers une vidéo d'écran |
| B4 | Entretien | Qui fait les mises à jour, les sauvegardes et la surveillance, à quelle fréquence, pour quel coût | 5 lignes | Tableau tâche / qui / fréquence |
| B5 | Limites connues | Ce qui a été accepté à la mise en ligne (réserves de la recette) | 2 à 5 lignes | Liste |
| B6 | Assistance | Durée de la garantie, comment signaler un problème, ce qui est exclu | 4 lignes | Texte |
| B7 | Acceptation | Date de remise, confirmation écrite du patron | 2 lignes | Texte |

## Ce qui le rend « niveau agence »

1. L'entreprise est titulaire du domaine, de l'hébergement et des outils de mesure,
   noir sur blanc, avec les dates de renouvellement.
2. Aucun mot de passe n'apparaît dans le document ; chaque accès dit où il est rangé.
3. Les 5 modifications courantes sont expliquées assez précisément pour que le patron
   les fasse seul.
4. L'entretien a un responsable et une fréquence pour chaque tâche.
5. Tout ce qui est provisoire (partie A) ou réservé (partie B) est listé, avec un
   responsable.

## Version courte (par défaut)

Temps : 3 min pour la partie A (elle se remplit à partir de `00-etat.md`) ; la partie B
s'écrit à la mise en ligne en 5 min.

- **On garde** : A1, A2, A3 ; B1, B3 (3 modifications courantes), B4, B6.
- **On reporte** : A4 et A5 si la conception a été linéaire ; vidéo d'écran ; fiche
  technique détaillée (le dépôt de code suffit).

```markdown
# Passation — {Nom}
> mis à jour le JJ/MM/AAAA — statut : brouillon

## A. Prêt à construire
| Étape | Livrable | Statut | Date |
|---|---|---|---|
| Provisoire | Remplacé par | Fourni par |
|---|---|---|

## B. Remise au client
| Service | Titulaire | Où se connecter | 2FA | Renouvellement |
|---|---|---|---|---|
| Domaine | {Entreprise} | | oui | JJ/MM/AAAA |

### Modifier son site
1. Changer un texte : …

| Entretien | Qui | Fréquence | Coût |
|---|---|---|---|

Assistance : garantie jusqu'au JJ/MM/AAAA · signaler un problème : …
```

## Comment le publier

Markdown en artifact Docs, partageable avec le patron. La partie B est le document à
garder : le patron l'épingle ou l'exporte.

## Sources consultées

- Growth Pulse Media, liste de passation en 5 phases (accès, propriété du domaine,
  formation) : https://www.growthpulsemedia.co.za/website-design-handover-checklist/
- ChecklistLab, liste de passation (accès, documentation, formation, signature) :
  https://checklistlab.co/website-handover-checklist/
- Moonvine, contenu du dossier de remise : https://moonvine.io/guides/website-management/website-handover-checklist/

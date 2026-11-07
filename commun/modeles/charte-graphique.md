# Modèle : charte graphique

> Livrable : `projet-site/03-charte/charte.md`, `charte.html`, `charte.pdf` · Étape 3

## À quoi il sert

La charte est le mode d'emploi de l'identité : ce qui permet à n'importe qui (un
graphiste, un imprimeur, Claude à l'étape suivante) de produire un visuel juste sans
redemander au patron. Ce n'est **pas une affiche** ni une planche d'ambiance : c'est un
document de règles, avec des valeurs exactes et des interdits.

Lecteur : le patron, qui vérifie que « ça lui ressemble », et quiconque fabrique un
support. Les vraies chartes publiques (villes, États, grandes marques) font 12 à 40 pages.
Ce document se livre en entier, page par page, à l'écran et en PDF.

## Sommaire type

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | L'essentiel | Promesse et 3 traits de personnalité repris de la plateforme, ce qu'ils imposent visuellement, les 3 directions (la recommandée d'abord) et leurs planches | 8 à 12 lignes | Texte + planches de moodboard (12 à 15 images libres de banque chacune) |
| 2 | Logo | Versions (complète, symbole seul, symbole sur fond foncé, monochrome noir, monochrome blanc, favicon), zone de protection, taille minimale, fonds autorisés, les 9 interdits du modèle | 15 à 25 lignes | Tableau des versions + liste des interdits + fichiers SVG |
| 3 | Couleurs | 1 principale, 1 à 2 secondaires, 1 accent, neutres ; pour chacune : rôle, HEX, RVB, CMJN approché, proportion d'usage, contraste sur blanc et sur noir, AA oui ou non | 10 à 14 lignes | Nuancier en tableau + bloc CSS |
| 4 | Typographies | 1 à 2 familles, graisses, source (Google Fonts, licence), échelle de tailles, interlignage, usages | 10 à 15 lignes | Tableau d'échelle typo à 6 niveaux |
| 5 | Iconographie | Style (trait ou plein), épaisseur, grille, bibliothèque retenue, illustrations, motifs et textures, visualisation de données | 6 à 10 lignes | Liste + exemples |
| 6 | Direction photo | Lumière, cadrage, sujets, couleur et grain, ce qu'on ne montre jamais, 3 mots-clés | 8 à 12 lignes | Liste + tableau « oui / non » |
| 7 | Ton (rappel) | 2 paires « on dit / on ne dit pas » reprises de la plateforme | 2 lignes | Tableau |
| 8 | Supports | Les 10 supports prévus : affiche, kakémono, carte de visite, papier en-tête, enveloppes et devis, présentation, signature e-mail, réseaux sociaux, en-tête du site, objets | 1 règle par support | Blocs HTML du modèle (pas d'image générée) |
| 9 | À faire / à ne pas faire | Les 6 à 10 règles qui évitent les erreurs les plus probables pour cette marque | 6 à 10 lignes | Tableau 2 colonnes |
| 10 | Fichiers et contact | Où sont les fichiers du logo et des polices, qui valide un nouveau support | 3 lignes | Liste |

### Détails qui comptent

**Logo.** Zone de protection exprimée avec une mesure du logo lui-même (« la hauteur du
R tout autour »). Taille minimale en pixels pour l'écran (souvent 24 px de haut pour un
symbole, 80 px de large pour un logo complet) et en millimètres pour l'impression.
Interdits classiques : déformer, changer la couleur, ajouter une ombre, poser sur une
photo chargée, tourner, recomposer les éléments.

**Nuancier.** Un tableau, toujours accompagné des contrastes calculés (WCAG 2.1 : 4,5:1
pour le texte courant, 3:1 pour les grands titres et les éléments d'interface).

| Rôle | Nom | HEX | RVB | CMJN (approx.) | Usage | Sur blanc | Sur noir |
|---|---|---|---|---|---|---|---|
| Principale | Encre | `#1B2A41` | 27, 42, 65 | 58, 35, 0, 75 | 60 % : textes, fonds sombres | 14,4:1 AA | 1,5:1 non |
| Accent | Signal | `#E8590C` | 232, 89, 12 | 0, 62, 95, 9 | 10 % : boutons, alertes | 3,6:1 grands textes seulement | 5,9:1 AA |

Le CMJN est une approximation, à valider par un épreuvage chez l'imprimeur. La couleur
principale reçoit aussi une référence Pantone proche, à vérifier sur nuancier.

```css
:root {
  --couleur-principale: #1B2A41;
  --couleur-accent: #E8590C;
}
```

**Échelle typo.** Une échelle à ratio fixe (1,25 par défaut), à 6 niveaux, présentée en
tableau.

| Niveau | Famille / graisse | Taille bureau | Taille mobile | Interligne | Usage |
|---|---|---|---|---|---|
| Titre 1 | {Titre} 700 | 56 px | 36 px | 1,1 | Hero |
| Texte | {Texte} 400 | 18 px | 16 px | 1,6 | Paragraphes |

**Direction photo.** Trois mots-clés exploitables comme prompt (« lumière de fin de
journée, mains au travail, grain léger ») et un tableau de ce qu'on montre et de ce qu'on
ne montre jamais (poignée de main, sourire face caméra, open space).

**Moodboard.** Trois directions, chacune avec son dossier de 12 à 15 images libres de banque
(Unsplash, Pexels) et sa planche. Aucune image générée : à cette étape, seul le logo peut
l'être.

**Logo créé.** Trois pistes (typographique, symbole, combiné), la recommandée appliquée, les
deux autres rangées dans `logo/pistes/`.

**Supports.** Aucune image générée, aucun rendu d'affiche : le document est fait
de tableaux et de blocs HTML, avec le vrai logo et les vraies polices.

## Ce qui le rend « niveau agence »

1. Chaque couleur a son rôle, ses valeurs HEX, RVB et CMJN, sa proportion d'usage et ses
   contrastes calculés, avec la mention AA ou « grands textes seulement ».
2. Le logo a sa zone de protection, sa taille minimale et ses interdits écrits et montrés.
3. L'échelle typo donne des tailles exactes pour bureau et mobile, pas « grand / moyen ».
4. La direction photo est assez précise pour qu'un photographe ou un générateur produise
   une série cohérente sans autre consigne.
5. Les règles « à faire / à ne pas faire » sont spécifiques à cette marque : aucune
   n'apparaît dans un manuel générique.

## Comment le publier

Le document présenté est le **modèle paginé** `skills/charte/templates/document/charte.html`
(structure d'une charte d'agence : couverture, sommaire, 01 Logotype, 02 Éléments
graphiques, 03 Supports de communication). On n'y remplit que le bloc de données, avec les
dix supports. La source des décisions reste `projet-site/03-charte/charte.md`, écrit depuis
`skills/charte/templates/charte.md`. Le PDF (A4 paysage) et les valeurs CMJN sont toujours
fournis, et le PDF relu page par page. Ce rendu HTML affiche le nuancier et l'échelle typo
dans les vraies polices (du code, pas une image générée) ; il est repris tel quel par la page
de démonstration du design system.

## Sources consultées

- Digital Polo, les 7 sections d'une charte et sa longueur (12 à 40 pages) :
  https://www.digitalpolo.com/brand-guidelines-guide/
- Bynder, contenu d'une charte (logo, couleurs, typos, images, ton) :
  https://www.bynder.com/en/glossary/brand-guidelines-definition/
- État du Minnesota, charte publique 2025 (protection, tailles, accessibilité) :
  https://mn.gov/mmb-stat/branding/minnesota-state-brand-style-guide.pdf
- Brandkit, règles essentielles et exemple du logo Spotify :
  https://brandkit.com/asset-page/703216-what-to-include-in-brand-guidelines-5-essential-rules

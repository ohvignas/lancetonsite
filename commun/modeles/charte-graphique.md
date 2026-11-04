# Modèle : charte graphique

> Livrable : `projet-site/03-charte/charte.md` · Étape 3 · Version courte : 6 min

## À quoi il sert

La charte est le mode d'emploi de l'identité : ce qui permet à n'importe qui (un
graphiste, un imprimeur, Claude à l'étape suivante) de produire un visuel juste sans
redemander au patron. Ce n'est **pas une affiche** ni une planche d'ambiance : c'est un
document de règles, avec des valeurs exactes et des interdits.

Lecteur : le patron, qui vérifie que « ça lui ressemble », et quiconque fabrique un
support. Les vraies chartes publiques (villes, États, grandes marques) font 12 à 40 pages
; la version courte en garde l'essentiel en 2 à 3 pages d'écran.

## Sommaire type

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | L'essentiel | Promesse et 3 traits de personnalité repris de la plateforme, et ce qu'ils imposent visuellement | 3 lignes | Texte |
| 2 | Logo | Versions (complète, symbole seul, monochrome noir, monochrome blanc), zone de protection, taille minimale, fonds autorisés, 4 à 6 interdits | 15 à 25 lignes | Tableau des versions + liste des interdits + fichiers SVG |
| 3 | Couleurs | 1 principale, 1 à 2 secondaires, 1 accent, neutres ; pour chacune : rôle, HEX, RVB, proportion d'usage, contraste sur blanc et sur noir, AA oui ou non | 8 à 12 lignes | Nuancier en tableau + bloc CSS |
| 4 | Typographies | 1 à 2 familles, graisses, source (Google Fonts, licence), échelle de tailles, interlignage, usages | 10 à 15 lignes | Tableau d'échelle typo |
| 5 | Iconographie | Style (trait ou plein), épaisseur, grille, bibliothèque retenue | 4 à 6 lignes | Liste |
| 6 | Direction photo | Lumière, cadrage, sujets, couleur et grain, ce qu'on ne montre jamais, 3 mots-clés | 8 à 12 lignes | Liste + tableau « oui / non » |
| 7 | Ton (rappel) | 2 paires « on dit / on ne dit pas » reprises de la plateforme | 2 lignes | Tableau |
| 8 | Mises en situation | 3 applications décrites : en-tête du site, publication réseau social, signature e-mail | 3 à 6 lignes | Bloc HTML ou description précise (pas d'image générée) |
| 9 | À faire / à ne pas faire | Les 6 à 10 règles qui évitent 90 % des erreurs | 6 à 10 lignes | Tableau 2 colonnes |
| 10 | Fichiers et contact | Où sont les fichiers du logo et des polices, qui valide un nouveau support | 3 lignes | Liste |

### Détails qui comptent

**Logo.** Zone de protection exprimée avec une mesure du logo lui-même (« la hauteur du
R tout autour »). Taille minimale en pixels pour l'écran (souvent 24 px de haut pour un
symbole, 80 px de large pour un logo complet) et en millimètres pour l'impression.
Interdits classiques : déformer, changer la couleur, ajouter une ombre, poser sur une
photo chargée, tourner, recomposer les éléments.

**Nuancier.** Un tableau, toujours accompagné des contrastes calculés (WCAG 2.1 : 4,5:1
pour le texte courant, 3:1 pour les grands titres et les éléments d'interface).

| Rôle | Nom | HEX | RVB | Usage | Sur blanc | Sur noir |
|---|---|---|---|---|---|---|
| Principale | Encre | `#1B2A41` | 27, 42, 65 | 60 % : textes, fonds sombres | 14,4:1 AA | 1,5:1 non |
| Accent | Signal | `#E8590C` | 232, 89, 12 | 10 % : boutons, alertes | 3,6:1 grands textes seulement | 5,9:1 AA |

```css
:root {
  --couleur-principale: #1B2A41;
  --couleur-accent: #E8590C;
}
```

**Échelle typo.** Une échelle à ratio fixe (1,25 par défaut), présentée en tableau.

| Niveau | Famille / graisse | Taille bureau | Taille mobile | Interligne | Usage |
|---|---|---|---|---|---|
| Titre 1 | {Titre} 700 | 56 px | 36 px | 1,1 | Hero |
| Texte | {Texte} 400 | 18 px | 16 px | 1,6 | Paragraphes |

**Direction photo.** Trois mots-clés exploitables comme prompt (« lumière de fin de
journée, mains au travail, grain léger ») et un tableau de ce qu'on montre et de ce qu'on
ne montre jamais (poignée de main, sourire face caméra, open space).

## Ce qui le rend « niveau agence »

1. Chaque couleur a son rôle, sa proportion d'usage et ses contrastes calculés, avec la
   mention AA ou « grands textes seulement ».
2. Le logo a sa zone de protection, sa taille minimale et au moins 4 interdits écrits.
3. L'échelle typo donne des tailles exactes pour bureau et mobile, pas « grand / moyen ».
4. La direction photo est assez précise pour qu'un photographe ou un générateur produise
   une série cohérente sans autre consigne.
5. Les règles « à faire / à ne pas faire » sont spécifiques à cette marque : aucune
   n'apparaît dans un manuel générique.

## Version courte (par défaut)

Temps : 6 min. Aucune image générée, aucun rendu d'affiche : le document est fait de
tableaux. Le logo, s'il n'existe pas, est un logotype typographique en SVG (le nom dans
la police de titre), affiné plus tard.

- **On garde** : logo (versions, protection, taille mini, 4 interdits), nuancier avec
  contrastes, échelle typo à 6 niveaux, direction photo (3 mots + oui/non), 6 règles
  « à faire / à ne pas faire ».
- **On reporte** : iconographie détaillée, mises en situation, déclinaisons impression
  (CMJN, Pantone), signature e-mail, gabarits réseaux sociaux.

```markdown
# Charte graphique — {Nom}
> Étape 3 — mis à jour le JJ/MM/AAAA — statut : brouillon

## L'essentiel
## Logo
| Version | Fichier | Fond autorisé |
|---|---|---|
- Zone de protection :
- Taille minimale : écran {x} px · impression {x} mm
- Interdits : …
## Couleurs
| Rôle | Nom | HEX | RVB | Usage | Sur blanc | Sur noir |
|---|---|---|---|---|---|---|
## Typographies
| Niveau | Famille / graisse | Bureau | Mobile | Interligne | Usage |
|---|---|---|---|---|---|
## Direction photo
- Mots-clés :
| On montre | On ne montre jamais |
|---|---|
## À faire / à ne pas faire
| À faire | À ne pas faire |
|---|---|
```

## Comment le publier

Le document reste en Markdown (artifact Docs). Pour **voir** les couleurs et les
polices, on publie à côté un artifact HTML court qui affiche le nuancier (pastilles en
CSS) et l'échelle typo dans les vraies polices : c'est du code, pas une image générée.
Ce rendu HTML se fait en une passe ; il est repris tel quel par la page de démonstration
du design system.

## Sources consultées

- Digital Polo, les 7 sections d'une charte et sa longueur (12 à 40 pages) :
  https://www.digitalpolo.com/brand-guidelines-guide/
- Bynder, contenu d'une charte (logo, couleurs, typos, images, ton) :
  https://www.bynder.com/en/glossary/brand-guidelines-definition/
- État du Minnesota, charte publique 2025 (protection, tailles, accessibilité) :
  https://mn.gov/mmb-stat/branding/minnesota-state-brand-style-guide.pdf
- Brandkit, règles essentielles et exemple du logo Spotify :
  https://brandkit.com/asset-page/703216-what-to-include-in-brand-guidelines-5-essential-rules

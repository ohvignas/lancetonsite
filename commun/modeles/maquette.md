# Modèle : présentation de maquette

> Livrable : `projet-site/07-maquette/maquette.md` (+ pages HTML et captures)
> · Étape 7
>
> Ce modèle est le **document présenté**. La source de travail, tenue à jour au fil des
> retouches, part de `skills/maquette/templates/maquette.md`.

## À quoi il sert

La maquette elle-même est faite en HTML (canevas Claude Design ou pages animées). Ce
document est sa **présentation** : il la replace dans les objectifs, explique les choix
page par page, recueille les retours et trace ce qui a été décidé. Les agences le
savent : un client qui a le contexte et les raisons des choix donne des retours plus
vite et remet moins en cause.

Lecteur : le patron, qui doit pouvoir dire « oui, on construit ça » ou nommer
précisément ce qui ne va pas.

## Sommaire type

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Où regarder | Lien du canevas ou de la page animée, conseils de lecture (taille réelle, défiler, tester sur téléphone) | 3 lignes | Liste avec liens |
| 2 | Rappel du brief | Objectif principal, client cible, promesse, action principale | 4 lignes | Encadré |
| 3 | Les 3 partis pris | Les décisions de design qui portent tout, chacune reliée au cadrage ou à la marque | 3 à 6 lignes | Liste numérotée |
| 4 | Visite page par page | Pour chaque page, toutes les pages maquettées : capture bureau et mobile, ce que fait chaque section, pourquoi ; pour le hero, les cinq briques de `niveau-agence.md` § 2 ter et ce qui vient de la bibliothèque | 4 à 8 lignes par page | Titre par page + captures + liste |
| 5 | Mouvement et interactions | Ce qui bouge, où, pourquoi ; comportement en mouvement réduit | 4 à 6 lignes | Tableau section / geste / rôle |
| 6 | Écarts avec les étapes précédentes | Ce qui diffère du zoning ou des textes, et pourquoi | 0 à 5 lignes | Tableau |
| 7 | Ce qui est provisoire | Images générées en attente des vraies photos, chiffres `[H]`, textes à confirmer | 3 à 8 lignes | Liste |
| 8 | Questions au patron | 3 à 5 questions fermées qui débloquent la validation | 3 à 5 lignes | Liste numérotée |
| 9 | Retours et suites | Chaque retour, ce qui a été fait, date ; ce qui attend sa réponse | 1 ligne par retour | Tableau retour / décision / fait le |
| 10 | Notes des contrôles | Note du relecteur, note de chaque tour du client simulé, verdict, 3 points forts, corrections appliquées | 6 lignes | Tableau |

### Détails qui comptent

- **Partis pris** : écrire la raison, pas l'effet. « Hero en photo de camionnette plutôt
  que d'interface, parce que l'artisan s'identifie à son métier avant de s'intéresser au
  logiciel (cadrage, citations 2 et 4). »
- **Questions fermées** : « Le tutoiement du hero vous convient-il, oui ou non ? » plutôt
  que « Qu'en pensez-vous ? ».
- **Une seule direction** présentée, pas trois variantes : si une alternative est utile,
  elle se limite à un bloc précis (deux heros, par exemple).
- **Annotations** hors de la page, jamais sur le design lui-même.

## Ce qui le rend « niveau agence »

1. Chaque parti pris cite la ligne du cadrage ou de la marque qui le justifie.
2. Chaque page est montrée en bureau et en mobile, à taille réelle.
3. Ce qui est provisoire est listé ; rien de provisoire n'est caché.
4. Les questions au patron sont fermées et au plus cinq.
5. Le tableau des retours trace chaque demande jusqu'à sa décision.

## Le squelette du document

Tout le sommaire se remplit, chaque fois. Les captures sont celles de la maquette. Périmètre
« accueil seul » : la visite porte sur l'accueil, et le document le dit.

```markdown
# Maquette — {Nom}
> Étape 7 — mis à jour le JJ/MM/AAAA — statut : brouillon

## Où regarder
- Canevas : {lien} · Page animée : {lien}
- Ouvrir en plein écran, puis sur téléphone.

## Rappel
Objectif : · Client : · Promesse : · Action :

## Les 3 partis pris
1. {Décision}, parce que {ligne du cadrage}.

## Visite page par page
### Page d'accueil
(captures bureau et mobile)
- Hero : … (les cinq briques de `niveau-agence.md` § 2 ter ; pour chacune, ce qui vient de la bibliothèque)
### {Autre page}
(captures bureau et mobile)
- {Section} : ce qu'elle fait, pourquoi.

## Mouvement et interactions
| Section | Geste | Rôle | Mouvement réduit |
|---|---|---|---|

## Écarts avec les étapes précédentes
| Écart | Pourquoi |
|---|---|

## Ce qui est provisoire
- …

## Questions au patron
1. … (oui / non)

## Retours et suites
| Retour | Décision | Fait le |
|---|---|---|

## Notes des contrôles
| Contrôle | Notes | Verdict |
|---|---|---|
| Relecteur | | |
| Client simulé | 71 → 83 → 88 (exemple) | |
```

## Comment le publier

La maquette en artifact HTML (ou canevas Claude Design). Ce document en Markdown, en
artifact Docs, avec les captures **réelles** de la maquette (pas de rendu généré) et les
liens vers les pages. Une vidéo d'écran courte remplace la réunion quand le patron n'est
pas disponible.

## Sources consultées

- Mockuuups Studio, présenter des maquettes web à un client (en direct, contexte,
  raisons des choix) : https://mockuuups.studio/blog/post/how-to-present-web-design-mockups-to-clients/
- Stfalcon, comment montrer une maquette : https://stfalcon.com/en/blog/post/how-to-show-design-mockups
- Adobe, wireframes annotés et prototypes :
  https://blog.adobe.com/en/publish/2017/09/26/a-comprehensive-overview-of-ux-design-deliverables

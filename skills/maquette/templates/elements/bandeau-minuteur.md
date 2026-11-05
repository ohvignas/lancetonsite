# Bandeau d’offre avec minuteur

apercu: bandeau-minuteur.html?apercu

Élément · démo : [`bandeau-minuteur.html`](bandeau-minuteur.html) · captures : `captures/bandeau-minuteur-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS (bandeau fixe en dégradé) + JS (décompte jusqu’à une date fixe avec case jours, phrase écrite depuis la date, fermeture mémorisée par offre)
- **Poids** : démo 9,7 Ko (4,0 Ko gzip)
- **Inspiré de** : E12 (bandeau dégradé collé en bas, /unlimited) dans `../motionsites-etude.md`. Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. Police Inter Tight : SIL Open Font License 1.1. Aucune image.

## Quand l'utiliser

Une offre qui finit vraiment : inscriptions, précommande, soldes, places limitées. La date de fin est écrite dans le code (`data-echeance`, ISO 8601). Jamais de minuteur qui repart à zéro à chaque visite : c'est une fausse urgence, une pratique commerciale trompeuse.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML de l'élément et son `<script>` s'il en a un. Le bloc « Démo » ne sert qu'à la page d'exemple.
2. Remplacer les textes et images fictifs par ceux de `05-contenus/` et `07-medias/`.
3. Régler les variables ci-dessous sur les tokens du design system (`06-design-system/`).
4. Vérifier avec `../verifier-elements.cjs` (0 erreur, captures 1440 et 375, mouvement réduit).

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--bm-a / --bm-b / --bm-c` | `#3b1d5e / #7a2348 / #b8481f` | dégradé ; texte blanc ≥ 4,5:1 sur les trois |

| `data-echeance` | vide (démo : ce soir minuit) | date de fin ISO 8601, ex. `2026-12-01T23:59:00+01:00` |
| `data-offre` | `−15 %` | début de la phrase ; la suite est écrite depuis l’échéance |

La phrase n’est jamais écrite en dur : « jusqu’à ce soir minuit » ou « jusqu’à 3 h 50 aujourd’hui » le jour même, « jusqu’à demain 18 h 30 » la veille, « jusqu’au 1er décembre inclus » au-delà ; une échéance à 00:00 se dit « le 1er décembre à minuit » (la veille), pas « le 2 à 00:00 ». La case **jours** n’apparaît qu’au-delà de 24 h (heures modulo 24). À l’échéance, le bandeau disparaît. Fermé, il ne revient pas pendant la session pour cette offre (`sessionStorage`, clé `bandeau-ferme:` + échéance) : une nouvelle offre se réaffiche.

**Pied de page** : le bandeau est fixe ; ajouter au `body` un `padding-bottom` au moins égal à sa hauteur (≈ 5 rem sur ordinateur, 8 rem sur téléphone ; la démo met `7rem`), sinon il cache le bas de page. Sous 560 px, la phrase et le × tiennent sur une ligne, le décompte et le bouton sur la suivante ; quand la case jours apparaît, les secondes sont masquées : 114 px de haut avec ou sans jours, 14 % d’un écran de 812 px. La date en clair (`.sr-date`) est masquée à l’œil (la phrase la dit déjà) et lue par les lecteurs d’écran.

## Prompt pour le régénérer

> Écris un bandeau d’offre fixé en bas d’écran, centré et arrondi, en dégradé sombre à trois couleurs : une phrase d’offre écrite depuis une échéance fixe lue dans `data-echeance` (« ce soir minuit », « 3 h 50 aujourd’hui », « demain 18 h 30 », « jusqu’au 1er décembre inclus » ; une fin à 00:00 se dit « minuit » la veille), la date de fin en clair pour les lecteurs d’écran seulement (texte visuellement masqué, pour ne pas la dire deux fois), un décompte jours / heures / minutes / secondes en chiffres tabulaires (case jours seulement au-delà de 24 h, heures modulo 24), un bouton d’action et un bouton × de 44 px qui le ferme pour la session, avec une clé de mémoire liée à l’échéance. Le décompte est `aria-hidden` (les lecteurs d’écran lisent la date). Il disparaît à l’échéance. Sur téléphone, phrase et × sur une ligne, décompte et bouton dessous, secondes masquées quand il y a des jours : il tient sous 20 % de l’écran. Rappelle de réserver sa hauteur en `padding-bottom` sur le `body`. En mouvement réduit : pas d’entrée animée, pas de secondes, mise à jour à la minute.

## Accessibilité

`<aside aria-label>`, date de fin lue en clair, décompte masqué aux lecteurs d'écran (pas d'annonce chaque seconde), bouton de fermeture de 44 px avec `aria-label`, le focus revient au titre de la page après fermeture. Le bandeau se ferme : il répond à WCAG 2.2.2 pour un contenu qui se met à jour. Contraste : le texte blanc tient 5,2:1 sur le ton le plus clair (#b8481f).

## Mouvement réduit

Pas d'entrée glissée, secondes masquées, mise à jour une fois par minute. Vérifié : deux captures à 1,2 s d'écart identiques.

## Performance

Un `setInterval` d'une seconde (une minute en mouvement réduit), arrêté à la fermeture et à l'échéance. Aucune dépendance externe hors polices de la démo.

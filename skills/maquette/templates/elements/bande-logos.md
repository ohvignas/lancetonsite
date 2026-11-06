# Bande de logos

apercu: bande-logos.html?apercu

Élément · démo : [`bande-logos.html`](bande-logos.html) · captures : `captures/bande-logos-1440.webp`, `-375.webp`, `-1440-reduit.png`

- **Technique** : CSS pur pour le défilement, 3 lignes de JS pour dupliquer le lot et 2 pour le bouton pause
- **Inspiré de** : bande de logos du hero Kweeto (test du plugin, novembre 2026). Code et noms écrits par nous.

## Licence

Code original Lance ton site, sans dépendance. Marques de la démo inventées.

## Règle de vérité

**Logos fictifs seulement sur une maquette, avec une mention visible** (« Exemple : entreprises fictives »). Au lancement, la bande n'affiche que des clients qui ont donné leur accord écrit. Sans clients autorisés, on la retire : une fausse référence est une preuve inventée. Jamais de vraies marques sans cet accord, même sur une maquette. Vérifier qu'un nom inventé ne correspond pas à une vraie entreprise du même secteur.

## Quand l'utiliser

Sous un hero ou juste avant un appel à l'action, une seule fois par page, quand il y a 5 logos au moins. À 3 ou 4 logos, une rangée fixe se lit mieux.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>`, le HTML et le `<script>`.
2. Mettre les logos dans le premier `<ul>` : SVG monochromes en `currentColor`, pour une seule couleur sur toute la bande. Le script crée la seconde copie.
3. Garder le bouton pause : il est obligatoire dès qu'un mouvement dure plus de 5 secondes. Dans un hero qui a déjà un bouton pause, poser la classe `en-pause` sur `.logos` depuis ce bouton.
4. Vérifier avec `../verifier-elements.cjs`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--logos-duree` | `42s` | durée d'un tour : plus de logos, plus de durée, pour garder la vitesse |
| `--logos-ecart` | `clamp(36px, 5vw, 68px)` | écart entre logos |
| `--logos-couleur` | `currentColor` | couleur de toute la bande |

## Prompt pour le régénérer

> Écris une bande de logos en boucle sans fin en CSS : une piste `display:flex; width:max-content` qui contient deux lots identiques, animée en `translateX(-50%)` linéaire. Chaque lot a son propre padding égal à la moitié de l'écart, pour que la jointure soit invisible. La seconde copie en `aria-hidden`. Bords fondus par `mask-image`. Arrêt au survol et par un bouton pause. En mouvement réduit : pas d'animation, un seul lot, logos en lignes centrées.

## Téléphone

Même bande, elle ne déborde pas de la page. Pas d'arrêt au doigt : le bouton pause reste accessible.

## Accessibilité

Le premier lot est une vraie liste lue une fois ; la copie est masquée aux lecteurs d'écran. Chaque logo garde son nom en texte. Bouton pause avec `aria-pressed`.

## Mouvement réduit

Aucune animation, un seul lot, logos en lignes centrées.

## Performance

Seule la `transform` est animée. Aucune dépendance. Préférer des SVG en ligne à des images.

# Bouton brouillé

apercu: bouton-brouille.html?apercu

Élément · démo : [`bouton-brouille.html`](bouton-brouille.html) · captures : `captures/bouton-brouille-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : JS (35 lignes, `requestAnimationFrame` le temps du brouillage) + CSS ; police à chasse fixe
- **Poids** : démo 6 518 octets (2 951 gzip) ; démo en Oxanium + JetBrains Mono ; aucune dépendance
- **Inspiré de** : bouton « neon typing » de la bibliothèque Jiro (https://jiro.build/components/button/neon-typing-button), vu en aperçu public. Idée relevée seulement ; code et textes écrits par nous. Voir `../etude/jiro.md`.
- **Licence** : code maison Lancetonsite, libre pour les sites clients. Polices Oxanium et JetBrains Mono sous licence SIL OFL 1.1 (Google Fonts). Aucune image. Technique observée sur jiro.build, code non repris.

## Quand l'utiliser

Bouton d'un site au ton « machine » : hébergement, outils pour développeurs, jeu, cybersécurité, électronique. Il peut annoncer un second libellé plus concret au survol (« Tarifs » → « Dès 4 €/mois »). Deux boutons brouillés par écran au plus. Sur un lien, au doigt, le second libellé ne s'affiche qu'un instant avant la navigation : n'y mettez jamais une information indispensable, elle doit aussi figurer dans la page.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>` et le `<script>`.
2. Écrire `<a class="brouille" data-brouille="Démarrer" data-brouille-survol="Prêt en 60 s">Démarrer</a>` ; sans `data-brouille-survol`, le libellé se brouille et revient à lui-même.
3. Régler les variables sur les tokens, vérifier avec `../verifier-elements.cjs`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--br-fond` | `#0b0a10` | fond du bouton |
| `--br-texte` | `#d9d4ea` | libellé au repos |
| `--br-accent` | `#b98cff` | bord et libellé au survol |
| `--br-anneau` | `var(--br-accent)` | anneau de focus, à régler contre le fond de la page (≥ 3:1) ; `#b98cff` pour la variante claire sur fond noir (8:1) |

Dans le script : `signes` (caractères tirés au hasard), durée `420 + 35 ms × longueur`.

## Prompt pour le régénérer

> Écris un bouton en police à chasse fixe dont le libellé, au survol et au focus clavier, se remplit de caractères tirés au hasard puis se fige lettre après lettre de gauche à droite sur un second libellé (attribut `data-brouille-survol`), et revient au premier en sortant. Le texte animé est dans un `<span aria-hidden>` sans événements de pointeur, le nom accessible reste fixe en `aria-label`. La largeur est figée sur le plus long des deux libellés pour que le bouton ne saute pas. Mouvement réduit : le libellé change sans brouillage. Couleurs en variables, dont l'anneau de focus, réglé contre le fond de la page (≥ 3:1).

## Accessibilité

Le lecteur d'écran lit « Démarrer — Prêt en 60 s » une seule fois, jamais les caractères parasites. Focus visible ; cible de 52 px. Les caractères brouillés sont à 55 % d'opacité, le temps d'un clin d'œil ; le libellé final est contrasté (13,7:1 au repos, 7,1:1 en violet au survol sur le fond teinté). Anneau de focus à 8:1 sur le fond noir pour les deux variantes : le violet foncé de la variante claire (2:1 sur le noir) ne sert plus d'anneau.

## Mouvement réduit

Aucun brouillage : le second libellé remplace le premier directement.

## Performance

La boucle ne tourne que pendant 0,5 à 0,9 s après un survol, puis s'arrête. Piège évité : sans `pointer-events: none` sur le texte, remplacer les lettres sous le pointeur relance `pointerenter` en boucle.

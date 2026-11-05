# Bouton chromé

apercu: bouton-chrome.html?apercu

Élément · démo : [`bouton-chrome.html`](bouton-chrome.html) · captures : `captures/bouton-chrome-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : CSS pur — deux fonds empilés (`padding-box` pour la face, `border-box` pour la lunette en `conic-gradient`) et un angle déclaré avec `@property` pour pouvoir l'animer
- **Poids** : démo 4 631 octets (2 191 gzip) ; la recette tient en 20 lignes de CSS
- **Inspiré de** : boutons « metal » et « chrome bezel 3D » de la bibliothèque Jiro (https://jiro.build/components/button/metal-button), vus en aperçu public. Idée relevée seulement ; code et textes écrits par nous. Voir `../etude/jiro.md`.
- **Licence** : code maison Lancetonsite, libre pour les sites clients. Polices Instrument Sans et Instrument Serif sous licence SIL OFL 1.1 (Google Fonts). Aucune image. Technique observée sur jiro.build, code non repris.

## Quand l'utiliser

Marques de matière et de précision : orfèvrerie, horlogerie, coutellerie, audio haut de gamme, automobile. Sur fond clair ou gris perle. Deux boutons au plus par écran ; jamais sur un site qui se veut rustique.

## Brancher dans une maquette

1. Copier le bloc « à copier » du `<style>` (le `@property` compris).
2. `class="chrome"` pour la face claire, `class="chrome plein"` pour la face sombre.
3. Régler les variables ; vérifier avec `../verifier-elements.cjs`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--chr-face` | `#fdfdfc` | couleur de la face |
| `--chr-texte` | `#1d1d1f` | libellé |
| `--chr-epaisseur` | `3px` | épaisseur de la lunette |
| `--chr-duree` | `1.1s` | durée du tour de reflet |
| `--chr-angle` | `30deg` | angle de départ du reflet (`@property`) |
| `--chr-lunette` | `conic-gradient(from var(--chr-angle), …)` | dégradé de la lunette, défini une seule fois (changer la teinte du métal ici : or, bronze, titane) |
| `--chr-degrade` | dégradé blanc → face | fond de la face ; la variante `plein` ne redéfinit que lui |
| `--chr-anneau` | `#1d1d1f` | anneau de focus, accordé au métal (≥ 12:1 sur le gris perle ; sur fond sombre, prendre un argent clair) |

## Prompt pour le régénérer

> Écris un bouton pilule « métal poli » en CSS pur : une bordure transparente de 3 px laisse voir un second fond en `conic-gradient` gris, blanc et anthracite (la lunette), sous une face en dégradé vertical très léger. Déclare l'angle du dégradé conique avec `@property` pour qu'au survol et au focus il fasse un tour complet en une seconde, comme un reflet qui glisse. Ombre interne en haut, ombre portée douce, enfoncement de 1 px au clic. Une variante à face sombre. Mouvement réduit : pas de rotation. Le dégradé conique est défini une seule fois dans une variable (`--chr-lunette`) réutilisée par les deux faces. Anneau de focus anthracite accordé au métal, contraste ≥ 3:1 sur le fond. Variables pour face, texte, épaisseur, durée, lunette et anneau.

## Accessibilité

Contraste du libellé : 16:1 (face claire), 15:1 (face sombre). Focus visible : anneau anthracite de 3 px (`--chr-anneau`, 12:1 sur le gris perle), accordé au métal plutôt qu’un bleu système ; cible de 52 px ; bordure système en couleurs forcées.

## Mouvement réduit

La lunette reste immobile ; seul l'enfoncement au clic demeure (il suit un geste de l'utilisateur).

## Performance

Aucun JS. Sans `@property` (navigateurs anciens), la lunette s'affiche sans tourner : dégradation propre.

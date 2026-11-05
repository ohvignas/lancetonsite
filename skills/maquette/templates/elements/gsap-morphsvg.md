# Forme qui se transforme (MorphSVG)

apercu: gsap-morphsvg.html?apercu

Élément · démo : [`gsap-morphsvg.html`](gsap-morphsvg.html) · captures : `captures/gsap-morphsvg-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : GSAP 3.15.0 + MorphSVGPlugin (`morphSVG: { shape, type }` : `"rotational"` depuis ou vers la goutte, `"linear"` entre feuille et flamme), boucle par `gsap.delayedCall`
- **Poids** : démo 10,8 Ko (4,4 Ko gzip) + gsap 28,4 Ko et MorphSVGPlugin 9,6 Ko gzip (≈ 38 Ko)
- **Inspiré de** : skill officiel `gsap-plugins` (section MorphSVG) de [greensock/gsap-skills](https://github.com/greensock/gsap-skills) et [doc MorphSVG](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin). Tracés goutte, feuille (avec pétiole), flamme à deux langues et leurs détails dessinés à la main, code et textes écrits par nous.

## Licence

GSAP et MorphSVG (plugin payant jusqu'en 2025, gratuit depuis) : [licence standard GSAP](https://gsap.com/standard-license) (Webflow). Usage commercial gratuit ; interdit dans un outil visuel d'animation concurrent de Webflow. Voir [`gsap-bonnes-pratiques.md`](gsap-bonnes-pratiques.md).

## Quand l'utiliser

Trois métiers ou trois offres qui ont chacun un symbole simple (eau, énergie, feu ; graine, pousse, fruit). Le pictogramme est décoratif : le sens est dans les textes. Une fois par page.

## Brancher dans une maquette

1. Copier le bloc « à copier », la section `[data-meta]` et le `<script>`.
2. Remplacer `FORMES` (silhouettes fermées en `C`, même viewBox 0 0 200 200) et `COULEURS` ; un lien `data-meta-cible="i"` par forme. Les détails (reflet de la goutte, nervures de la feuille, cœur de la flamme) sont des groupes `data-meta-detail="i"` posés par-dessus la silhouette : ils ne se morphent pas, ils s'effacent avant le morph et reviennent à la fin. C'est ce qui donne des pictos dessinés plutôt que des icônes plates.
3. Garder la garde `if (!anime) return;` en tête de `relancer()` : sans elle, la sortie du survol relance la boucle en mouvement réduit.
4. Textes depuis `05-contenus/` ; variables sur `06-design-system/`.
5. Vérifier avec `../verifier-elements.cjs gsap-morphsvg`.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--meta-encre` | `#142029` | texte, bordure active |
| `--meta-papier` | `#f6f8f9` | fond des cartes (page : ardoise claire #dde4e8) |
| `--meta-filet` | `#c3ccd2` | bordures |
| `--meta-gris` | `#45525c` | descriptions (7,6:1) |

Typo de la démo : Barlow 800 et 400, une grotesque d'atelier.

JS : morph 0,9 s `power2.inOut`, une forme toutes les 2,6 s. `type: "rotational"` depuis ou vers la goutte (évite que la pointe se retourne) ; `type: "linear"` entre feuille et flamme : en rotationnel, la langue droite de la flamme tirait un fil de 1 px à mi-course. La feuille a 8 points d'ancrage pour s'apparier proprement aux 9 de la flamme. Si un fil apparaît avec vos propres tracés : changer `type`, ajouter un point au tracé le plus simple, ou fixer `shapeIndex`.

## Prompt pour le régénérer

> Écris une section HTML avec un pictogramme SVG (viewBox 200 × 200, décoratif, `aria-hidden`) et trois liens de service. Dessine des silhouettes fermées soignées (goutte à pointe fine, feuille avec pétiole, flamme à deux langues) et, par-dessus, des détails par forme (reflet, nervures, cœur clair de la flamme) qui s'effacent pendant le morph. Avec GSAP 3.15.0 et MorphSVGPlugin, le tracé passe de la goutte à la feuille puis à la flamme (`morphSVG: { shape, type }`, 0,9 s, `"rotational"` depuis ou vers la goutte, `"linear"` entre feuille et flamme pour éviter un fil à mi-course) et change de couleur : au survol ou au focus d'un service, sa forme ; laissé seul, il enchaîne les trois toutes les 2,6 s par `gsap.delayedCall`, avec un bouton pause visible (nom accessible qui contient le texte visible), arrêt hors écran (`IntersectionObserver`) et onglet caché. Mouvement réduit ou sans GSAP : pas de boucle, même après la sortie du survol (garde en tête de la fonction de relance), le survol remplace le tracé d'un coup.

## Accessibilité

Le SVG est `aria-hidden` ; le contenu est dans les liens (focus visible, cibles larges). Le focus clavier déclenche la même forme que le survol. Bouton pause de 44 px, libellé « Pause » / « Relancer » contenu dans son nom accessible. Vérifié : pause → le tracé ne bouge plus pendant 3,5 s ; relance → il repart.

## Mouvement réduit

Aucune boucle, bouton pause masqué ; survol et focus changent la forme sans transition (`d` et détails remplacés). Même chose sans GSAP. `relancer()` commence par `if (!anime) return;` : la sortie du survol ou du focus ne relance rien. Contrôle (5 novembre 2026, Playwright) : en mouvement réduit, survol de la flamme puis sortie, l'attribut `d` est identique 6 s plus tard ; CDN bloqué, même test, aucune erreur de page. Ce test « survol puis sortie » n'est pas dans `verifier-elements.cjs` (il ne fait qu'un survol) : le refaire à la main après chaque modification.

## Performance

Le morph réécrit l'attribut `d` à chaque image : réservé à un petit SVG (une forme, 4 à 9 points). Couleur de remplissage animée sur un seul tracé : coût négligeable. Boucle stoppée hors écran et onglet caché.

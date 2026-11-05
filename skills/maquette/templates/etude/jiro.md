# Étude — Jiro (jiro.build)

Visite du 5 novembre 2026, Playwright (Chrome headless, 1440 × 900 et 1280 × 800). Bibliothèque commerciale de « prompts de design » : 1 317 composants et 137 modèles de pages, à copier dans Bolt, Lovable, v0, Cursor ou via un serveur MCP.

## Licence : on ne reprend rien

- **Conditions d'utilisation** (https://jiro.build/terms-conditions, section 6) : Jiro « owns the Service and all Content — including components, templates, prompts, code ». Le droit accordé est limité, non transférable, non sous-licenciable, réservé aux abonnés qui paient, pour construire des sites finis ; il interdit de redistribuer le contenu « as a standalone product, template pack, component library » (section 3), modifié ou non, payant ou gratuit.
- **Dépôt GitHub** : `Jiro-Build/claude-plugin` est sous **licence MIT** (« Copyright (c) 2026 JIRO BUILD LLC »), mais il ne contient que deux fichiers SKILL.md et un `.mcp.json` qui pointe vers `https://mcp.jiro.build`. Aucun composant, aucun code d'interface. Le compte `jirobuild` n'a aucun dépôt public.
- **Conclusion** : licence propriétaire, et notre kit est précisément une bibliothèque de composants, donc le cas interdit. **Aucun code, prompt, texte ni média de Jiro n'est repris.** On relève idées, techniques et style vus dans les aperçus publics, puis on écrit nos propres éléments. Les fiches citent Jiro en « Inspiré de », sans section « Licence » puisqu'il n'y a pas de code tiers.

## Pages visitées

| URL | Accès | Ce qu'on y voit |
|---|---|---|
| https://jiro.build/ | libre | accueil : bandeau minuteur promo, popup « lifetime » à l'ouverture, grilles de cartes de modèles, schéma MCP, tarifs |
| https://jiro.build/terms-conditions | libre | conditions (licence ci-dessus) |
| https://jiro.build/components, `/components/background` | libre | catalogue par catégories (Header 226, Features 271, Testimonial 128… UI : Button 13, Background 28, Cards 2) ; la plupart des cartes marquées « Premium » |
| https://jiro.build/sitemap.xml, `/robots.txt` | libre | 1 500 URL ; robots autorise tout sauf compte et API |
| `https://jiro.build/preview/component/ui-components/button/…` (13 boutons) | libre (aperçu) | circle-reveal, spot-fill, jelly-explore, liquid-glass, glow-color, swap, glow, light-beam, left-to-right-scan, neon-typing, chrome-bezel-3d, electric-border, metal |
| `…/preview/component/ui-components/cards/…` (2) | libre (aperçu) | stackedcard, swiss-style-card |
| `…/preview/component/ui-components/background/…` (8) | libre (aperçu) | aurora-gradient, fluid-gradient-engine, grid-scan, light-rays, orb, silk, planet, zirobuild : **tous des MP4** sur `cdn.jiro.build` |
| `…/preview/component/marketing-blocks/…` (6) | libre (aperçu) | features/projects-kinetix, how-it-works/process-kinetix, stats-metrics/results-jake, stats-metrics/experience-kinetix, testimonial/testimonial-arcfield, features/case-study-miles |
| Bouton « Copy prompt », code source, MCP | **connexion + abonnement** | non consulté (noté et passé) |
| `/login`, `/signup`, `/pricing` (paiement) | connexion / payant | non consulté |

## Techniques et style relevés

- **Boutons comme vitrine** : la catégorie la plus travaillée. Gestes courts déclenchés au survol : balayage lumineux, libellé qui se tape ou se brouille, icône qui change de côté, lunette métallique, bordure « électrique » en canvas, remplissage circulaire depuis le point d'entrée du pointeur. Fonds de démo unis (noir, gris perle, crème) pour isoler le geste.
- **Fonds = vidéos** : les 28 « backgrounds » sont des boucles MP4 (orbe, rayons, planète, soie, aurore). Lourd (plusieurs Mo) et sans pause visible dans l'aperçu ; on peut faire mieux en shader.
- **Sections de portfolio** (modèles Kinetix, Jake, Miles) : titres condensés en capitales très serrés (« CUT SOME. FRAMED SOME… »), numérotation entre parenthèses « (05) », habillage métier (viseur de caméra, timecode, REC, clap), étapes en cartes avec pastille de durée, barres de compétences, bandes de chiffres sur aplat orange.
- **Témoignages** : citation centrale avec mots en couleur, portraits flottants autour, bulles d'une demi-phrase, carte de note en coin, fond pastel lavande-pêche.
- **Faiblesses observées** (à ne pas reproduire) : libellés au repos très peu contrastés (texte gris sur noir dans « left-to-right scan »), animations décoratives qui tournent en boucle sans pause, popup commercial à l'ouverture avec faux compte à rebours, fonds vidéo de plusieurs Mo, textes de démo en anglais avec des séquences `—` non décodées dans l'aperçu Kinetix.

## Repéré → technique → notre fichier

| Repéré chez Jiro | Notre technique | Notre fichier |
|---|---|---|
| Bouton « left-to-right scan » | double libellé + `clip-path` + barre en pseudo-élément ; libellé au repos lisible (10,6:1) | [`elements/bouton-balayage.html`](../elements/bouton-balayage.html) |
| Bouton « neon typing » | brouillage aléatoire puis recomposition lettre à lettre vers un 2ᵉ libellé, `aria-label` fixe | [`elements/bouton-brouille.html`](../elements/bouton-brouille.html) |
| Bouton « swap » | deux pastilles en `scale()`, `padding` qui bascule, ressort | [`elements/bouton-permute.html`](../elements/bouton-permute.html) |
| Boutons « metal » et « chrome bezel 3D » | `conic-gradient` en `border-box` sous une face en `padding-box`, angle animé par `@property` | [`elements/bouton-chrome.html`](../elements/bouton-chrome.html) |
| Cartes « stackedcard » | pile en grille, `calc()` sur `--i` et `--o`, rotation sans toucher au DOM | [`elements/cartes-eventail.html`](../elements/cartes-eventail.html) |
| Section « process » Kinetix | cadre `sticky` habillé en viseur, étape active au défilement, timecode lié au défilement | [`elements/processus-viseur.html`](../elements/processus-viseur.html) |
| Section « testimonial » Arcfield | portraits-boutons en orbite, citation en fondu, pas de rotation automatique | [`elements/temoignages-orbite.html`](../elements/temoignages-orbite.html) |
| Fonds vidéo « light rays » / « planet » | shader WebGL 4 Ko (rayons angulaires), repli CSS conique, pause | [`fonds-hero/rayons-lumiere.html`](../fonds-hero/rayons-lumiere.html) |

Tous les textes de démo sont nouveaux, en français, sur des métiers réels (audit de sécurité, hébergement de jeux, studio d'identité, orfèvre, potier, maintenance industrielle, cabinet comptable, observatoire), chacune avec une typo et une palette propres au métier (Chakra Petch, Oxanium, Bricolage Grotesque, Instrument Serif, Young Serif, Barlow Condensed, Figtree, Manrope ; pas de surtitre en capitales espacées). Médias : ceux des exemples validés `artisan-sablon`, `b2b-vigie`, `commerce-odette`, `logiciel-miroir`, `liberal-calade`.

## Prompts libres cités en référence

Les prompts de Jiro sont derrière l'abonnement : aucun n'a été lu. Seule la phrase d'accroche publique de l'accueil résume la méthode : « Browse → Copy prompt → Paste vibe coding tool → build instantly » (jiro.build, accueil). Nos prompts de régénération (section « Prompt pour le régénérer » de chaque fiche) sont écrits de zéro.

## Non retenu, et pourquoi

- **Fonds vidéo** (orbe, soie, aurore, planète) : déjà couverts par nos fonds en code (`anneau-traits`, `ruban-soie`, `aurore-maillee`, `horizon-eclipse`) et trop lourds en MP4.
- **Bouton « liquid glass »** : couvert par `elements/verre-liquide`.
- **Bouton « electric border »** (canvas qui crépite en continu) : animation permanente, coûteuse pour un bouton, effet « néon IA » que le kit évite.
- **Boutons « glow », « glow color », « light beam »** : halo coloré au survol, variante faible du balayage ; un seul suffit.
- **« circle reveal » / « spot fill »** (remplissage depuis le point d'entrée du pointeur) : bon geste mais très répandu ; à faire plus tard si besoin.
- **Bande de chiffres « results-jake »** et **barres de compétences « experience-kinetix »** : les compteurs existent déjà dans le kit (`data-counter`), les barres de pourcentage de compétences n'apportent pas d'information vérifiable.
- **Popup commercial + minuteur promo** : `bandeau-minuteur` existe déjà, réservé à une échéance réelle ; le faux compte à rebours de 12 h qui repart à chaque visite est une pratique trompeuse.

## Ce qui reste à faire (session principale)

- Ajouter les 7 éléments et le fond aux index `elements/README.md` et `fonds-hero/README.md` (non modifiés ici, comme demandé).
- Régénérer les planches `captures/planche.jpg` si on veut y montrer les nouveaux éléments.

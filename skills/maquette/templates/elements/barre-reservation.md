# Barre de réservation en verre

apercu: barre-reservation.html?apercu

Élément · démo : [`barre-reservation.html`](barre-reservation.html) · captures : `captures/barre-reservation-1440.png`, `-375.png`, `-1440-reduit.png`

- **Technique** : HTML natif (`<form>`, `<select>`, `<input type="date">`, `<output>`) + CSS (verre dépoli, grille à 5 colonnes qui s'empile) + une soixantaine de lignes de JS (dates par défaut, séjour conservé quand l’arrivée change, minimum de nuits, compteur borné par la capacité du gîte, message de résultat qui dit vrai)
- **Poids** : démo 12,3 Ko (4,6 Ko gzip), aucune dépendance ; photo réutilisée de `exemples/abonnement-sillon/images/champ-1600.webp`
- **Inspiré de** : « Travora Hero Section » et « Brightly » sur https://sceneai.art/landing-pages (barre de recherche « Location / Date / Guest » en verre au pied d'un hero photo). Voir `../etude/sceneai.md`. Code et textes écrits par nous.
- **Licence** : code original Lancetonsite. Police Hanken Grotesk : SIL Open Font License 1.1. Photo : `exemples/abonnement-sillon/images/champ-1600.webp` (générée pour le kit, exemple Sillon), à remplacer par celle du client.

## Quand l'utiliser

Gîte, hôtel, camping, location de matériel, restaurant (date + couverts), salle de réception, agence de voyages : quand l'action principale est « voir les disponibilités ». À poser en bas du hero, sur une photo.

## Brancher dans une maquette

1. Copier le `<form class="resa">` et le bloc CSS « à copier » ; le script en bas de la démo.
2. Remplacer les options du `<select>` par les vrais lieux ou formules (`04-architecture/`), et brancher `submit` vers le moteur de réservation réel (ou un lien avec paramètres).
3. Le bouton rond devient un bouton pleine largeur avec libellé sous 860 px.

## Variables

| Variable | Défaut | Rôle |
|---|---|---|
| `--resa-verre` | `rgb(20 24 18 / .38)` | teinte du verre |
| `--resa-lisere` | `rgb(255 255 255 / .28)` | liseré |
| `--resa-champ` | `rgb(255 255 255 / .12)` | fond de chaque champ |
| `--resa-texte` | `#fff` | texte |
| `--resa-accent` / `--resa-accent-encre` | `#f1e3b4` / `#1f2617` | bouton de recherche |
| `data-min-nuits` (sur le `<form>`) | `2` | séjour minimum ; le départ ne peut pas être plus proche |
| `data-capacite` (sur chaque `<option>`) | `6`, `4`, `2`, `12` pour « Tous » | plafond du compteur de personnes pour ce lieu |

Logique métier : quand l’arrivée change, le départ suit en **gardant la durée choisie** ; un départ à moins de `data-min-nuits` est ramené au minimum, **et le statut dit pourquoi** (« Séjour de 2 nuits minimum : départ ramené au… »). Changer de gîte rabaisse le nombre de personnes à sa capacité, et les boutons − / + passent en `aria-disabled` aux bornes. Le message dit ce qu’on a demandé : « La Laiterie est libre du… », « Le Fournil est déjà pris… Libre à ces dates pour 4 pers. : La Grange » (seuls les gîtes assez grands pour le groupe sont proposés), « 1 gîte sur 3 libre… : La Grange » (seuls comptent les gîtes assez grands), ou « réservez La Grange et La Laiterie ensemble » au-delà de la capacité d’un seul. Les disponibilités de la démo sont fictives ; en vrai, elles viennent du moteur de réservation.

## Prompt pour le régénérer

> Écris une barre de recherche de disponibilités en verre dépoli, posée en bas d'un hero photo : un vrai `<form>` en grille de cinq colonnes (lieu en `<select>`, arrivée et départ en `<input type="date">`, nombre de personnes avec boutons − et + de 44 px et un `<output>`, puis un bouton rond avec loupe et libellé masqué visuellement). Chaque champ a une petite étiquette en capitales au-dessus de sa valeur, un fond légèrement plus clair et un contour blanc quand il a le focus. Le conteneur : fond sombre translucide, `backdrop-filter: blur(18px) saturate(1.3)`, liseré blanc interne, grands rayons. Sous 860 px, les champs passent sur deux colonnes et le bouton devient pleine largeur avec son libellé visible ; le compteur de personnes prend aussi toute la largeur (pas de trou à droite). En JS : dates par défaut (dans 14 jours, pour le minimum de nuits), un minimum de nuits réglable (`data-min-nuits`, 2 par défaut), la durée du séjour conservée quand on change l’arrivée, un compteur borné entre 1 et la capacité du lieu choisi (`data-capacite` sur chaque option, boutons en `aria-disabled` aux bornes, valeur rabaissée au changement de lieu), et à l’envoi un message vrai dans un `role="status"` : le lieu choisi est libre ou pris, ou combien de lieux assez grands sont libres. Quand un départ est corrigé, le statut dit pourquoi ; quand le lieu choisi est pris, ne proposer que les lieux libres assez grands. Petite marge à droite des champs date (l’icône calendrier ne touche pas le bord). Apostrophes typographiques et espaces insécables (« 2 nuits », « 4 pers. », avant « : »). Variables CSS pour les couleurs.

## Accessibilité

Chaque champ a son `<label>` ; le compteur est un `role="group"` étiqueté, ses boutons ont un `aria-label`, la valeur est annoncée (`aria-live`). Le résultat de recherche arrive dans un `role="status"`. Cibles de 44 px au moins, focus visible (contour du champ, contour du bouton). Voile sombre radial derrière le titre du hero.

## Mouvement réduit

Seule animation : le léger grossissement du bouton au survol, supprimé en mouvement réduit. Vérifié avec Playwright.

## Performance

Aucune bibliothèque, contrôles natifs (calendrier du système sur mobile). `backdrop-filter` sur une seule surface. L'image du hero porte `fetchpriority="high"`.

## Média qu’une génération apporterait

Une photo de gîte à la place du potager repris de Sillon : façade de longère en pierre, haie bocagère, lumière du matin, 16:9, 2400 px. Coût estimé : 0,04 à 0,10 € l’image (non lancée).

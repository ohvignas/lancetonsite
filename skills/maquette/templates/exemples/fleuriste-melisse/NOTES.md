# Atelier Mélisse : exemple du parcours direct (fleuriste, Croix-Rousse)

**Exemple fictif.** L'atelier et ses pratiques sont inventés. Images et vidéos générées. Le formulaire n'envoie rien : la clé d'envoi est vide, et la page le dit à qui essaie.

## Comment elle a été faite

Créée par un agent seul, en suivant `/lancetonsite:express`, le 6 novembre 2026.

- **25 min 30 s** jusqu'à la page ouverte.
- **Environ 4,13 $ de génération, estimés** : l'historique fal ne donne pas les prix, celui des images 2K est supposé.
- **Sans client simulé** : le chemin express n'en prévoit pas. Aucune note sur 100.
- **Sans essai à la main** : ni souris ni téléphone réels, seuls des scripts Playwright ont bougé et défilé. Les validations ont été simulées, et aucune personne n'a vu la page pendant le test.

## Ce qu'elle ne prouve pas

- Elle reste **sous les seuils agence de densité** : 9 sections pour 10, environ 370 mots pour 500.
- **Accueil seul** : pas d'autres pages, pas de mise en ligne, pas de mentions légales ni de page de confidentialité. Un vrai site doit les avoir.
- Aucun concurrent lu, prix et coordonnées absents faute d'informations.
- Polices et bibliothèques (GSAP, Lenis) par CDN : la page a besoin du réseau, à auto-héberger avant une mise en ligne.
- Une capture du test montrait un éclair jaune à l'ouverture. Il n'a pas été reproduit le 6 novembre (couleur de fond suivie image par image au chargement, à 3 largeurs), mais cette mesure ne remplace pas un œil qui recharge la page.

## Changé après le test, pour cet exemple

1. **Meneaux retirés du hero.** Les lignes sombres de la fenêtre restaient posées sur les trois images, en état stable sur le moment « Pour le jour du mariage » : elles coupaient le bouquet. Ce n'était pas une transition. Le fondu entre deux moments, lui, est voulu et reste.
2. **Liens du pied retirés** vers `mentions-legales.html` et `confidentialite.html`, qui donnaient une erreur 404.
3. **11 images non utilisées retirées** (environ 1,1 Mo).

Le reste est tel que l'agent l'a livré. La section Mariages n'avait aucun défaut en état stable. Le rapport complet du test n'est pas dans le plugin.

## Le dossier

`index.html`, `css/`, `js/hero.js` (la scène), `js/gestes.js` (copie figée du kit), `images/`, `medias/` (boucles paysage et portrait), `captures/` (`vitrine-1440.webp` et quatre vues).

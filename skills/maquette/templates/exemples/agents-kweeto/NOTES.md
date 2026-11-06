# Kweeto : exemple du parcours direct (agents IA pour PME)

**Ce n'est pas une marque fictive comme les autres exemples.** Kweeto est un projet réel de démonstration d'ILLITH. Cette page reste une **maquette** : elle n'est pas en ligne et ne vaut pas offre.

## À ne pas prendre pour acquis

- **Offres et engagements à confirmer** : le prix « à partir de 280 € », les services inclus, l'hébergement en Europe, les clauses sur les données. La page le dit elle-même au pied et dans « Ce qui reste à confirmer par écrit ».
- **Logos fictifs** : la bande affiche des entreprises inventées, avec la mention « Exemple de bande de logos : entreprises fictives ». Aucune n'est cliente. Au lancement : clients avec accord écrit, ou pas de bande.
- **Note et Qualiopi** : 4,6/5 sur 21 avis Google et la certification concernent l'école ILLITH et ses formations, pas l'agent. La page le précise.
- **Écrans et personnages** : les écrans sont des interfaces de démonstration, les agents (Sam, Léa, Noé, Inès) des personnages créés, pas des salariés.
- **Page d'accueil seule** : mentions légales et coordonnées sont annoncées pour la mise en ligne. Le formulaire n'est relié à rien.

## Client simulé

70/100 au tour 1, 74/100 au tour 2, verdict « Pas encore » (seuil 85). Les corrections suivantes n'ont pas été renotées. Le « Oui » ou le « Non » d'un client joué par l'IA ne remplace pas la validation réelle.

## La méthode du hero

Personnage vidéo généré avec Seedance : le corps respire et cligne des yeux, et seul l'iris suit la souris. Le blanc de l'œil, les paupières et la tête ne bougent pas. Recette, script et limites : `../../prototype/personnage-vivant/`. La bande de logos et le bouton principal sont passés dans la bibliothèque : `../../elements/bande-logos.md`, `../../elements/bouton-lumiere.md`.

## Le dossier

`index.html` (CSS et JS en ligne), `medias/` (images, vidéos), `captures/` (`vitrine-1440.webp` et trois sections). Polices Google par CDN, à auto-héberger avant une mise en ligne.

Copie générée par `assemble.py --exemple`, dans le projet de test, hors du dépôt. Si la page est régénérée, refaire les captures.

Vérifié le 6 novembre 2026 avec Playwright, en rendu logiciel et par scripts : ouverture en local, médias chargés, aucune erreur console. **Sam n'a pas été essayé à la main sur une vraie carte graphique dans cette copie** ; voir les limites de `personnage-vivant/README.md`.

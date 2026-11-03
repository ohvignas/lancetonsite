---
name: statut
description: 'Dit où en est le projet de site, ce qui est validé, ce qui est à revoir parce qu''un document amont a changé, et quelle est la prochaine étape. À utiliser pour reprendre un projet Atelier après une pause.'
when_to_use: '"où j''en suis", "on reprend", "prochaine étape", "statut du projet", "qu''est-ce qu''il reste à faire", ou /atelier:statut.'
---

# Statut

1. Lire `projet-site/00-etat.md`. Absent → proposer `/atelier:demarrer`.
2. Vérifier sur le disque que chaque document marqué « brouillon » ou « validé » existe
   vraiment, et lire son en-tête (statut, date). Deux formats d'en-tête existent : la
   ligne `> Étape N — mis à jour le … — statut : …`, et le frontmatter YAML des pages de
   `05-contenus/` (`statut`, `mis_a_jour`).
3. **Détecter ce qui est périmé** : un document est « à revoir » s'il dépend d'un
   document modifié **après** lui. Dépendances :

   | Document | Dépend de |
   |---|---|
   | 02 marque | 01 |
   | 03 charte | 01, 02 |
   | 04 architecture | 01, 02 |
   | 05 contenus | 01, 02, 04 |
   | 06 design system | 01, 02, 03, 04, 05 |
   | 07 médias | 03, 04, 05, 06 |
   | 08 PRD / 09 plan | 01 à 07 |
   | site/ | 05, 06, 07, 08, 09 |
   | 10 déploiement | 08, site/ |

   Date de modification d'un document = la plus récente entre sa date d'en-tête et la
   date du fichier sur le disque (`stat`) : une retouche à la main sans changer l'en-tête
   compte aussi. Pour un dossier, prendre le fichier le plus récent.
4. Répondre en 6 lignes maximum :
   - le projet et le mode ;
   - les étapes validées ;
   - ce qui est à revoir et pourquoi (« la charte a changé le 12/11, le design system date
     du 05/11 ») ;
   - **une** prochaine étape recommandée, avec sa commande.
5. Corriger `00-etat.md` si le tableau ne correspond pas au disque.

Ne pas relancer d'étape sans accord : proposer, attendre le oui.

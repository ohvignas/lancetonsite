---
name: statut
description: 'Dit où en est le projet de site, ce qui est validé, ce qui est à revoir parce qu''un document amont a changé, et quelle est la prochaine étape. À utiliser pour reprendre un projet Lance ton site après une pause.'
when_to_use: '"où j''en suis", "on reprend", "prochaine étape", "statut du projet", "qu''est-ce qu''il reste à faire", ou /lancetonsite:statut.'
---

# Statut

1. Lire `projet-site/00-etat.md`. Absent :
   - dans Claude, le projet a peut-être été commencé ailleurs ou l'espace de travail a été
     réinitialisé : demander s'il existe un `projet-site.zip` à redéposer ;
   - dans Claude Code, chercher un `projet-site.zip` ou un export de Claude Design dans le
     dossier (sinon le demander) : s'il y en a un → `/lancetonsite:prd` ;
   - sinon → proposer `/lancetonsite:demarrer`.
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
   | 07 médias (dont `07-medias/3d/`, objets 3D faits dans Blender) | 03, 04, 05, 06 |
   | 08 maquette | 04, 05, 06, 07 |
   | 09 passation | 01 à 08 |
   | 10 PRD / 11 plan | 01 à 08 |
   | site/ | 05, 06, 07, 08, 10, 11 |
   | 12 déploiement | 10, site/ |

   Date de modification d'un document = la plus récente entre sa date d'en-tête et la
   date du fichier sur le disque (`stat`) : une retouche à la main sans changer l'en-tête
   compte aussi. Pour un dossier, prendre le fichier le plus récent.
4. Répondre en 6 lignes maximum :
   - le projet et le mode ;
   - les étapes validées ;
   - ce qui est à revoir et pourquoi (« la charte a changé le 12/11, le design system date
     du 05/11 ») ;
   - **une** prochaine étape recommandée, avec sa commande — et **où** la faire (étapes 1
     tout dans Claude Code par défaut, ou 1 à 8 dans l'application Claude ; voir conventions § 0).
5. Corriger `00-etat.md` si le tableau ne correspond pas au disque.
6. **Mettre à jour le tableau de bord du projet** au même lien (`commun/parcours.md`
   § 2 et § 3 ; absent : le publier maintenant) et donner son lien, avec celui du
   document de la dernière étape.

Ne pas relancer d'étape sans accord : finir sur **une** question à choix (« Reprendre
à [étape] » / « Pas maintenant »), attendre le oui (`commun/parcours.md` § 4).

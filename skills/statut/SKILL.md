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
   | 04 architecture (et `04-wireframes/`) | 01, 02 |
   | 05 contenus | 01, 02, 04 |
   | 06 médias (dont `06-medias/3d/`, objets 3D faits dans Blender) | 03, 04, 05 |
   | 07 maquette | 03, 04, 05, 06 |
   | 08 design system | 03, 05, 06, 07 (maquette validée) |
   | 09 passation | 01 à 08 |
   | 10 PRD / 11 plan | 01 à 08 |
   | site/ | 05, 06, 07, 08, 10, 11 |
   | 12 déploiement | 10, site/ |

   Date de modification d'un document = la plus récente entre sa date d'en-tête et la
   date du fichier sur le disque (`stat`) : une retouche à la main sans changer l'en-tête
   compte aussi. Pour un dossier, prendre le fichier le plus récent.
   **Parcours direct** (champ « Parcours » de `00-etat.md` ; un ancien fichier en mode direct ou
   express, avec une ligne « Mode », se lit de même) : ce tableau ne s'applique pas. La prochaine
   étape vient de « Reprendre un projet » :
   - section par section : `${CLAUDE_PLUGIN_ROOT}/skills/direct/SKILL.md`, temps par temps et section par section ;
   - tout d'un coup : `${CLAUDE_PLUGIN_ROOT}/skills/express/SKILL.md`, palier par palier (un projet
     express n'a pas 12 étapes : ne pas marquer 01 à 04 comme manquants).
4. Répondre en 6 lignes maximum :
   - le projet et son parcours ;
   - les étapes validées ;
   - ce qui est à revoir et pourquoi (« la charte a changé le 12/11, le design system date
     du 05/11 ») ;
   - **une** prochaine étape recommandée, avec sa commande — et **où** la faire (tout dans
     Claude Code par défaut, ou étapes 1 à 8 dans l'application Claude ; voir conventions § 0).
     Parcours direct : ajouter une ligne, « Pour les documents complets : passer au dossier agence ».
5. Corriger `00-etat.md` si le tableau ne correspond pas au disque.
6. **Mettre à jour le tableau de bord du projet** au même lien (`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md`
   § 2 et § 3 ; absent : le publier maintenant) et donner son lien, avec celui du
   document de la dernière étape.

Ne pas relancer d'étape sans accord : finir sur **une** question à choix (« Reprendre
à [étape] » / « Pas maintenant »), attendre le oui (`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` § 4).

## Passer au dossier agence

Depuis un projet direct ou express, sur demande seulement. Rien de validé n'est refait.

1. `00-etat.md` : « Parcours : dossier agence », bloc « Avancement (dossier agence) » ajouté, celui
   du parcours précédent gardé pour mémoire. Le tableau de bord passe aux 12 étapes, au même lien.
2. Remplir en brouillon, depuis `00-fiche.md` : `01-cadrage.md` (cible, preuves), `02-marque.md`
   (promesse, ton), `03-charte/charte.md` (couleurs, typos, logo), `04-architecture.md` (pages, plans).
3. Garder et marquer « validé » ce qui existe : `05-contenus/` ; médias notés dans `06-medias/medias.md`,
   sans déplacer les fichiers ; `07-maquette/maquette.md` pointe vers `site/`, qui fait maquette ;
   `tokens.css` et `DESIGN.md` copiés dans `08-design-system/`.
4. Reprendre à `/lancetonsite:cadrage`, chaque brouillon passant la porte de son étape. Stack déjà
   notée HTML/CSS : `prd` écrit le plan du reste et `construire` ne refait pas ce qui est validé.

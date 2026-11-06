---
name: objets-3d
description: 'Crée les objets 3D du site dans Blender, par script et sans interface — produit du client (flacon, boîte, bouteille, objet), décor, pièces animées — lisses et éclairés comme une vraie photo de studio, puis en tire les photos du catalogue, les animations au défilement (séquence d''images, vidéo) et le .glb pour la 3D en direct. Boucle de correction automatique (agent client neuf, note sur 100) avant de montrer, puis validation de l''utilisateur avant les rendus finaux. Appelé par les étapes médias, maquette et construction de Lance ton site.'
when_to_use: '"objet 3D", "modéliser le produit", "flacon en 3D", "packshot", "photo produit 3D", "rendu Blender", "animation 3D au scroll", "le produit qui tourne", "vue éclatée", "fichier glb", "modèle 3D gratuit", ou /lancetonsite:objets-3d.'
argument-hint: "[<objet, ex. flacon> | photo | animation | glb | bibliothèque]"
---

# Objets 3D (Blender)

Lire d'abord `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, porte de validation).

## La règle : ne pas hésiter, et passer par Blender

Dès qu'un site gagne à montrer un objet (un produit, un contenant, un outil, une pièce,
une matière), **proposer la 3D sans attendre qu'on la demande**. Un objet 3D bien fait sert
trois fois : photos du catalogue (toutes cohérentes, tous les angles), animation de page
(l'objet tourne, s'ouvre, s'assemble au défilement) et 3D en direct.

**Blender d'abord**, par script Python (`bpy`) lancé sans interface : le script se rejoue à
l'identique pour chaque variante, suit les cotes réelles, et Cycles calcule la réfraction du verre
et des liquides. Les autres voies ne viennent qu'en appoint :

| Objet | Voie | Pourquoi |
|---|---|---|
| Le produit du client, son contenant, son logo | **Blender, modélisé sur mesure** (`references/modelage.md`) | c'est le sien : cotes, étiquette et logo exacts |
| Objet générique sans marque (plante, pierre, meuble, outil) | **bibliothèque libre** CC0 / CC-BY (`references/bibliotheques.md`), reprise dans Blender | plus rapide, qualité scan |
| Forme organique impossible à modéliser par script | image → 3D (fal), **payant, avec un oui**, reprise dans Blender | appoint |
| Décor abstrait léger (particules, vagues, formes simples) | three.js en code | pas besoin de Blender |

## Mise en place

1. `bash ${CLAUDE_PLUGIN_ROOT}/skills/objets-3d/scripts/installer-blender.sh` : trouve Blender.
   S'il manque, **demander le oui** (environ 1 Go, gratuit) puis relancer avec `--installer`.
2. Lancer Blender avec le chemin donné par l'installateur (`BLENDER=…`, il n'est pas toujours dans
   le PATH), dans un appel Bash **sans bac à sable** (`dangerouslyDisableSandbox: true`), sinon il
   plante au démarrage (code 139) : `"$BLENDER" -b --factory-startup --python objet.py -- <arguments>`.
3. Partir de `${CLAUDE_PLUGIN_ROOT}/skills/objets-3d/scripts/exemple.py` : le flacon Ciste complet
   (verre, jus, étiquette papier, bague moletée, bouchon), réglé en 4 tours de boucle. Changer
   profils, matières, étiquette et couleurs. La bibliothèque `scripts/lib3d.py` fournit formes
   lisses, matières, étiquette, studio photo, appareil, rendu, animation, export. Étiquette : image
   rendue depuis le HTML de la charte avec Playwright (modèle :
   `${CLAUDE_PLUGIN_ROOT}/skills/maquette/templates/exemples/commerce-flacon/outils/blender/etiquettes.cjs`).
4. Ranger dans le projet : `06-medias/3d/` (scripts, `.blend` si utile), rendus dans
   `06-medias/3d/rendus/`, `.glb` dans le dossier `modeles/` du site.

## Les étapes

1. **Brief objet** (5 lignes) : quoi, cotes réelles (ou `[hypothèse]` déduites d'une photo),
   matières, couleurs de la charte, où il servira (fiche 4:5, hero 16:9, animation, 3D en
   direct), ce qu'il doit dire (marque `02-marque.md`).
2. **Modéliser** : `references/modelage.md`. **Toujours lisse** (profil en spline `adoucir`,
   192 pas, ombrage lisse), aucune arête vive, épaisseurs réelles, liquide qui déborde dans le
   verre, étiquette et logo rendus depuis le HTML de la charte (Playwright), **logo en graisse forte**.
3. **Studio** : `eclairage_produit()` + `cyclo()` + `appareil()` (`references/lumiere-studio.md`).
4. **Aperçu** : 720 px de large, 96 échantillons, moins d'une minute.
5. **Boucle de correction automatique** (`references/boucle-3d.md`) : se relire, puis un agent
   `client-persona` **neuf** à chaque tour, en mode « élément 3D », note sur 100 ; corriger,
   re-rendre. Jusqu'à **85 et « je paierais »**, 3 tours au plus. Pas d'image montrée avant la
   fin de la boucle, mais un point d'avancement d'une ligne par tour (note, ce qui est corrigé).
6. **Porte de validation** : montrer l'aperçu, la note et son évolution, ce qui reste en
   hypothèse, puis `AskUserQuestion` : **Valider et lancer les rendus finaux** / **Modifier**,
   avec **la taille des rendus** : 1080 px pour le site (recommandé, environ 5 min par image),
   ou plus grand sur demande (2048 px pour un zoom, 3072 px pour l'impression : 25 min et plus
   par image). **Jamais de 4K par défaut.**
   **Jamais de rendu final sans un oui explicite.** Cette porte est propre au skill (exception
   prévue dans `${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` § 4) : elle ne remplace pas celle de l'étape appelante.
7. **Rendus finaux** (en tâche de fond) : photos à la taille choisie (1080 px par défaut),
   256 échantillons, déclinées par `${CLAUDE_PLUGIN_ROOT}/skills/medias/scripts/optimiser-medias.sh`
   (AVIF + WebP, plusieurs largeurs) ; **animations** selon
   `references/animations.md` (séquence `canvas[data-sequence]` par défaut, `scripts/sequence.sh`) ;
   `.glb` avec `exporter_glb()` (< 500 Ko visé).
8. **Intégrer et vérifier** dans le navigateur (desktop, mobile, mouvement réduit) : l'image de
   repos est la face avant, la séquence ne saute pas, le poids reste raisonnable.
9. **Séquences** : `sequence.sh` écrit directement dans le dossier `images/` du site (pas dans
   `06-medias/`, que `optimiser-medias.sh` balaie et décline en tailles).
10. **Manifeste** `06-medias/medias.md` : chaque rendu (script, réglages, note de la boucle),
   chaque modèle tiers (source, auteur, licence, lien).
11. **Revenir à l'étape appelante** (médias, maquette ou construction) : sa propre porte de
    validation reste celle de `${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` § 4.

## Références

- `references/modelage.md` : cotes, techniques, règles de finition, matières, export.
- `references/lumiere-studio.md` : le schéma de lumière, les erreurs et leurs causes, réglages.
- `references/animations.md` : séquence d'images, vidéo, `.glb` animé, branchement au kit.
- `references/boucle-3d.md` : la boucle de correction et la grille sur 100, la porte de validation.
- `references/bibliotheques.md` : modèles gratuits et libres (Poly Haven, ambientCG, Smithsonian…).
- `references/outils-et-sources.md` : outils, extensions, licences, sources.

## Ce qu'on ne fait pas

- Montrer un rendu qui n'est pas passé par la boucle, ou lancer les rendus finaux sans oui.
- Des facettes, une arête vive, un « on voit que c'est de la 3D faite vite ».
- Générer par IA l'image d'un produit qui porte un texte (étiquette fausse) : on le modélise.
- Télécharger un modèle sans le oui de l'utilisateur, ou sans noter sa licence.
- Une animation qui finit ailleurs que face avant ; une animation sans image fixe de repli.

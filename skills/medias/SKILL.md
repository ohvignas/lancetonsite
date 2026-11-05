---
name: medias
description: 'Produit tous les médias du site — photos, illustrations, vidéos de fond en boucle, sons, logo vectorisé — avec l''IA (MCP fal ou OpenRouter), comme sortis d''un même shooting, optimisés pour le web et rangés dans un manifeste. Étape 7 de Lance ton site.'
when_to_use: '"générer les images du site", "photos IA", "vidéo de fond", "créer les visuels", "image hero", "son d''ambiance", "vectoriser le logo", ou /lancetonsite:medias.'
argument-hint: "[tout | <emplacement précis, ex. hero>]"
---

# Médias

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire d'abord `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). **Budget : 8 min** de travail, générations lancées en lot pendant qu'on
écrit le reste. Document présenté : suivre le modèle
`${CLAUDE_PLUGIN_ROOT}/commun/modeles/plan-medias.md`, version courte par défaut — le
plan médias avec la galerie des images placées, jamais une image seule.

## Entrées

- `03-charte/charte.md` — **direction photo**, palette (hex), ce qu'on ne montre jamais.
- `04-architecture.md` — les emplacements d'images page par page.
- `05-contenus/` — ce que chaque image doit illustrer.
- `06-design-system/DESIGN.md` — formats et ratios des composants.

Sans direction photo dans la charte : la déduire de la charte et de la marque
([references/fiche-shooting.md](references/fiche-shooting.md)), marquée `[hypothèse]`
dans le plan médias, sans question (5 questions au plus en mode approfondi).

## Règle d'or

**Les vraies photos battent les photos IA** pour tout ce qui doit inspirer confiance :
l'équipe, le lieu, les vrais produits, les vrais clients. Commencer par demander à
l'utilisateur ce qu'il possède déjà. L'IA sert pour l'ambiance, les textures, les fonds,
les illustrations, les plans impossibles à shooter. Ne jamais générer un faux client,
un faux membre de l'équipe ou un faux témoignage visuel.

Aucune limite de création : photos, objets détourés, textures, illustrations, vidéos,
séquences d'images, objets 3D, sons — catalogue et outils dans
`${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 2 bis. Proposer ce qui donnera du
relief au site, pas seulement des photos.

Le site vise le niveau de `${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 2 : hero
en image ou vidéo plein cadre, au moins une grande image par page longue, rythme de
tailles. Un site sans images ressemble à une ébauche.

## Étape 1 — L'inventaire

Dresser la liste de tous les médias nécessaires à partir de l'architecture : emplacement,
format, ratio, rôle, vraie photo disponible ou non. La publier en tableau dans le plan
médias, tout de suite. Pour chaque ligne, choisir par défaut : vraie photo (si elle
existe) / génération IA / image provisoire ; l'utilisateur corrige à la porte de
validation. Le hero : proposer une
**vidéo en boucle** dès que le métier a un geste qui se filme.

**Vraies photos pas encore reçues** (cas fréquent) : pour chaque emplacement, écrire
la **liste de prises de vue** (sujet, cadrage, lumière, horizontal ou vertical, 3 prises
au moins), dire comment les envoyer (dossier `07-medias/a-recevoir/`, ou dans la
conversation) et générer en attendant (« Générer, par défaut »). Droit à l'image : accord
écrit des personnes reconnaissables (parents pour un mineur), des équipes des lieux
photographiés, et du photographe si ce n'est pas l'utilisateur. Le noter dans le
manifeste.

## Combien d'images (la source unique)

Le nombre de photos dépend de ce que la page doit faire ressentir. Compter sur le
zoning de l'accueil (`04-architecture.md`) :

| Métier | Photos sur l'accueil |
|---|---|
| **Donner envie** : événement, festival, ferme, restaurant, commerce, artisan, hôtel, lieu | des photos dans **la plupart des sections** (au moins 3 sections sur 4), hero en vidéo ou en photos, les personnes et le lieu montrés ; jamais une seule photo pour tout le site |
| **Rassurer** : service local, profession libérale, B2B | une image par section au moins une fois sur deux : l'équipe, le lieu, les réalisations, le produit en usage |
| **Montrer le produit** : objet, logiciel | le produit dans chaque section (objet, interface vivante), plus 3 à 4 photos d'usage et de l'équipe |

Le catalogue et les articles (`architecture` § 5) ont **une photo par fiche** et par
carte : les compter dans l'inventaire.

**Vidéos générées, encouragées.** Dans le budget IA, une vidéo générée rend une
animation au défilement bien plus réaliste qu'une image fixe qui zoome : le geste du
métier qui avance (`data-video-scrub`), une séquence d'images tirée d'une vidéo
(`data-sequence`), une boucle de hero. Proposer 1 à 3 vidéos dès que le métier a un
geste, un lieu ou un objet qui bouge, avant d'ajouter des images fixes de plus.

**Plans et cartes.** Un plan d'accès, une carte d'origine (« le blé pousse à 25 km du
four »), un parcours, un plan de site : une **illustration générée soignée**, dans le
style de la charte (image de référence : la palette, le logo, une photo du lieu),
avec ses repères écrits en HTML par-dessus (une image générée n'a jamais de texte).
Jamais un dessin SVG approximatif fait à la main. Les noms de lieux et les distances
viennent du cadrage.

## Générer, par défaut (la maquette n'attend pas)

La maquette ne montre **jamais** de rectangle vide ou hachuré. Toute image qui n'existe
pas encore en vraie photo est **générée**, dans la direction photo, au bon ratio, comme
un même shooting — c'est le parcours normal :
1. **Générer** avec le générateur des conventions (« Quel générateur » : fal d'abord,
   OpenRouter ensuite), sur le **budget IA unique** (annoncer le lot et ce qui restera ;
   pas de nouvel accord s'il tient dans le budget). Générer l'image maîtresse, la faire
   choisir, puis la série avec elle en référence. Deux chemins, mêmes prompts :
   - outils MCP : fal (`run_model`, `submit_jobs`) ou OpenRouter (`generate-image`) ;
   - script du kit de maquette `generer-images.py` (Claude Code) : `--fal` avec
     `FAL_KEY`, sinon `OPENROUTER_API_KEY` ; il lit les `data-prompt` des `<img>` de la
     page, génère tout, remplace les `src`.
2. **Banques libres seulement en repli** (budget à 0, ou rien de connecté) :
   Unsplash, Pexels — chercher avec les mots de la direction photo (Firecrawl
   `firecrawl_search`, ou navigateur), choisir des images cohérentes entre elles, noter
   l'adresse et l'auteur. Licence Unsplash / Pexels : usage gratuit, pas de revente
   telle quelle.

Une image générée pour le lieu, le produit ou l'équipe reste une image **provisoire**
tant que la vraie photo n'est pas là : on montre l'ambiance, pas une fausse réalité.

Chaque image qui tient la place d'une vraie photo est marquée `provisoire` dans le
manifeste, et la maquette le dit en annotation hors de la page (« image générée en
attendant ta photo : tes mains au tour »). Ne jamais
présenter une image de banque comme le lieu, le produit ou l'équipe réels sur le site
en ligne : à l'étape 11, toute image `provisoire` restante est signalée avant la mise en
ligne.

## Étape 2 — Le budget

Générateur : `commun/conventions.md`, « Quel générateur ». Budget : le **budget IA
unique** fixé au démarrage (conventions, « Le budget de génération » ; ligne « Budget
IA » de `00-etat.md`). Estimer le coût du lot avant de lancer quoi que ce soit :
`estimate_cost` / `get_pricing` sur fal ; sur OpenRouter, prix affiché sur la page du
modèle (`openrouter.ai/<modèle>`). Tarifs indicatifs dans
[references/modeles.md](references/modeles.md).
Annoncer : « environ X € pour N images et M vidéos, il restera Y € » — **en euros** (les
tarifs sont en dollars : convertir, arrondir au-dessus). Dans le budget : lancer. Au-delà
seulement : demander un « oui » pour le dépassement. Après chaque lot : mettre à jour la
ligne « Budget IA ». Plafond par défaut : 2 régénérations par média. Budget à 0 : banques
libres en repli, et la liste de prises de vue.

Les étapes 3 à 6 concernent la génération ; sans génération, passer à l'Étape 7.

Vidéo : vérifier par une recherche web quels modèles vidéo sont les plus récents au
moment du projet (Veo, Kling, Seedance, Runway… les noms changent vite) avant de
recommander. Sans outil de génération : livrer le storyboard (plan par plan, 5 à 8 s)
et les prompts complets prêts à lancer, et le dire.

## Étape 3 — Le bloc de style et les détails de métier

Écrire **un** bloc de style en anglais, réutilisé mot pour mot dans chaque prompt :
appareil et objectif, lumière, grain et rendu, palette avec codes hex, ce qu'on évite.
Modèle et exemples : [references/fiche-shooting.md](references/fiche-shooting.md).

Avant de générer, lister pour chaque scène **3 détails de métier vérifiables** (tirés
du cadrage et du questionnaire ; sinon déduits, marqués `[hypothèse]` dans le plan
médias, sans question) : où sont les outils et dans
quelle position, comment est éclairé l'atelier (lampes couchées, rasantes, au plafond…),
quelle forme exacte a le produit. Les écrire en clair dans le prompt, puis les **relire
sur chaque image** avant de la garder (voir « Erreurs de métier »).

## Étape 4 — L'image maîtresse

Générer **d'abord** l'image la plus importante (souvent le hero) en 2 variantes (4 en
mode approfondi), les montrer dans le plan médias dès qu'elles arrivent, **retenir la
recommandée** et lancer la série aussitôt : pas de question à part (`parcours.md` § 1),
l'utilisateur en change à la porte de validation. Cette image devient la **référence**
de toutes les suivantes.

## Étape 5 — La série

Chaque image suivante passe l'image maîtresse en référence (édition multi-références :
`image_urls` sur fal, `reference_image_urls` sur le MCP OpenRouter). C'est ce qui donne
un même shooting ; répéter le prompt ne suffit pas. Lancer les générations en lot
(fal : `submit_jobs` puis `wait_for_jobs`, `show_media_batch` ; OpenRouter : plusieurs
`generate-image` en parallèle).
Une image qui ne colle pas : la régénérer (2 fois max), sinon garder la meilleure et
le signaler.

**Référence locale sur fal.** Le MCP fal ne lit pas les fichiers de l'ordinateur : une
image de référence locale (maîtresse, logo) passe par un dépôt signé, en trois temps.
1. `upload_file` avec `prepare_upload: true`, `file_name` et `file_size` en octets
   (`stat -f%z hero.png` sur macOS, `stat -c%s hero.png` sur Linux) : il rend une
   `upload_url` (privée) et une `file_url`.
2. Envoyer le fichier : `curl -sS --fail --upload-file hero.png "<upload_url>"` (PUT).
3. `verify_upload` avec `file_url` et `file_size`, puis passer `file_url` dans
   `image_urls`. Jamais l'`upload_url`.

**JPEG ou PNG.** Les modèles d'édition (`nano-banana-2/edit`) rendent tantôt du JPEG,
tantôt du PNG, selon le lot. Nommer chaque fichier d'après son vrai format
(`file image.jpg` le dit) et l'écrire tel quel dans le manifeste : `.png` et `.jpg`
sont acceptés tous les deux, jusqu'à l'optimisation (étape 7).

Vidéos : plans de 5 à 8 s, lents, sans texte, muets. Dans l'ordre :
1. **La marque d'abord, sur l'image.** Si le produit porte une marque (étiquette, logo,
   gravure), la poser **sur l'image source avant la vidéo**, comme une impression ou une
   lamination : retouche d'image avec le logo en image de référence (fal
   `nano-banana-2/edit`, OpenRouter `generate-image` avec `reference_image_urls`), ou
   composition (logo détouré calé en perspective, puis une passe de retouche pour la
   lumière). Vérifier l'image avant d'animer. Un logo posé en HTML par-dessus une vidéo
   glisse dès que la caméra bouge (`niveau-agence.md` § 2).
2. **La boucle** : image de départ = image d'arrivée = cette image marquée. Sur fal
   (Kling) : `start_image_url` et `end_image_url` (`tail_image_url` sur les anciennes
   versions : vérifier avec `get_model_schema`), `generate_audio` à `false`. Sur
   OpenRouter : `first_frame_image_url` = `last_frame_image_url`, `generate_audio` à
   `false`. Une vidéo prend 1 à 5 minutes : sur OpenRouter, appeler `get-video` toutes
   les 15-20 s jusqu'à `completed`, puis télécharger aussitôt (lien valable environ 24 h).
3. **Le zoom parasite** : les modèles vidéo poussent souvent la caméra malgré « static
   camera, locked-off shot ». Comparer la première et la dernière image ; si la boucle
   saute, la recoudre avec un fondu enchaîné de 0,5 s entre la fin et le début :
   `ffmpeg -i v.mp4 -filter_complex "[0]split[a][b];[a]trim=0:4.5,setpts=PTS-STARTPTS[x];[b]trim=4.5,setpts=PTS-STARTPTS[y];[y][x]xfade=transition=fade:duration=0.5:offset=0" -an boucle.mp4`
   (pour une vidéo de 5 s ; adapter les durées). Sinon régénérer une fois.
4. **Le recadrage mobile** : le hero a sa version **9:16**, centrée sur le sujet (le
   produit, pas le ciel) : `ffmpeg -i hero.mp4 -vf "crop=ih*9/16:ih:(iw-ih*9/16)*0.5:0,scale='min(1080,iw)':-2" -an hero-916.mp4`
   (remplacer `0.5` par la position horizontale du sujet, de 0 à 1), et son affiche
   recadrée de même. Sur la page : `<source media="(max-width: 767px)">`.
5. Toujours une image d'affiche (poster) par vidéo et par format.

Objets 3D : **skill `objets-3d`** (Blender par script, d'abord). Le proposer dès qu'un
objet sert l'histoire (produit, contenant, outil). Il fait les photos produit du catalogue,
les séquences d'animation et le `.glb`, avec sa propre boucle de correction et sa porte de
validation. Objet qui porte une marque : modélisé dans Blender, jamais généré ; objet
générique : bibliothèque libre (Poly Haven…) ou, en appoint payant, image → 3D.
L'animation finit sur la face avant, logo visible. Règles complètes : `niveau-agence.md`
§ 2 bis, « 3D et marquage » et « 3D : la fin de l'animation ». Ranger les GLB dans
`07-medias/3d/`.

Sons : seulement s'ils servent la marque, coupés par défaut côté site. Sans fal, pas de
génération de sons : livrer les prompts.

## Étape 6 — Les outils, dans l'ordre

L'ordre est celui des conventions (« Quel générateur ») :
1. **MCP fal, s'il est connecté** : `recommend_model` → `run_model` ou `submit_job` →
   `check_job` → `show_media` → `save_job_outputs` pour télécharger.
2. **Sinon MCP OpenRouter** (sans redemander) :
   - images : `generate-image` (`model`, `prompt`, `aspect_ratio`,
     `reference_image_urls`) ;
   - vidéos : `generate-video` (`model`, `prompt`, `duration`, `aspect_ratio`,
     `resolution`, `first_frame_image_url` / `last_frame_image_url`) puis `get-video`
     jusqu'à `completed` ;
   - coût réel dépensé : `get-session-cost` ;
   - pour des lots ou en script : [scripts/openrouter-image.sh](scripts/openrouter-image.sh)
     (variable `OPENROUTER_API_KEY`).
3. **Rien de connecté** : proposer de connecter OpenRouter (images + vidéos en une
   connexion). Sur refus, livrer pour chaque emplacement le prompt complet, le ratio et le
   modèle conseillé, prêts à coller.

## Étape 7 — Optimiser pour le web

Lancer `bash ${CLAUDE_SKILL_DIR}/scripts/optimiser-medias.sh projet-site/07-medias projet-site/07-medias/web`
(parcourt `images/`, `videos/`, `3d/`…) : AVIF + WebP en 640/1024/1600/2560 px **et
toujours à la largeur d'origine** (une source de 928 px sort en 640 et 928, pour les
écrans 2×), vidéos H.264 + WebM sans son, poster JPG, modèles GLB compressés (Draco,
avec `npx @gltf-transform/cli` si `npx` est là). Cible : hero < 250 Ko en AVIF, vidéo de
fond < 3 Mo, GLB < 3 Mo. Générer les images à 2K quand le modèle le permet : une source
de 1K est trop petite pour un hero.
Le script accepte `.png`, `.jpg`, `.jpeg` et `.webp`, et signale un fichier dont le
contenu ne correspond pas à l'extension.
Le script demande `ffmpeg` ; absent, proposer de l'installer (`brew install ffmpeg` sur
macOS, `sudo apt install ffmpeg` sur Ubuntu), sinon livrer les originaux et signaler
que l'optimisation sera faite à l'étape 11, dans Claude Code (le framework peut s'en charger).
Dans Claude, ne rien installer : si `ffmpeg` manque dans l'espace d'exécution, reporter
directement à l'étape 11. La maquette utilise les originaux.

**Encodage sur macOS en bac à sable.** `sips` ne peut pas y écrire son fichier
temporaire, et le `ffmpeg` du système n'a souvent ni `libwebp` ni `libaom` : seule la
chaîne ffmpeg → PNG → `cwebp` / `avifenc` marche. Le script la prend d'abord ; s'il
annonce « WebP ignoré » ou « AVIF ignoré », installer `brew install webp libavif`. Ne
pas utiliser `sips`.

## Étape 8 — Le manifeste

Écrire `projet-site/07-medias/medias.md` avec
[templates/medias.md](templates/medias.md) : fichier, emplacement, rôle, texte
alternatif, modèle, prompt, référence utilisée, coût, origine (IA / photo réelle /
banque libre avec licence). Le texte alternatif décrit le contenu et sa fonction en
125 caractères max ; `alt=""` pour une image purement décorative.

## Garde-fous

- Jamais de texte, de logo inventé ni de filigrane dans une image générée.
- Jamais le visage d'une personne réelle identifiable, ni une marque déposée.
- Mentionner dans le manifeste les médias générés par IA ; si le site montre des
  personnes générées, le dire à l'utilisateur et lui conseiller de l'indiquer.
- **Erreurs de métier** : relire chaque image avec l'œil du client expert, en
  commençant par les 3 détails de métier listés à l'étape 3. Le bon outil
  au bon endroit, le geste juste, la machine plausible, l'éclairage du lieu tel qu'il
  est vraiment, la forme exacte du produit, l'écran qui affiche ce que dit le
  texte. Un professionnel repère une erreur en trois secondes, et toute la page perd sa
  crédibilité. Une image fausse se régénère avec une consigne précise (« capteur fixé
  sur le carter du palier, pas sur l'arbre ») ; un écran de téléphone ou d'ordinateur
  s'affiche en HTML par-dessus, jamais en texte généré.
- Avant de livrer : relire la série soi-même, en une minute (agent `relecteur` en mode
  approfondi) — même lumière ? même grain ? même palette ? rien qui fasse « image de
  banque » ou « rendu 3D lisse » ?

Publier le plan médias (`parcours.md` § 3) : l'inventaire, le bloc de style et la
galerie des images à leur emplacement (rôle, texte alternatif, `provisoire` ou non).
Puis **porte de validation** (`parcours.md` § 4) : jamais la maquette sans un oui.
`00-etat.md` et tableau de bord à jour. Prochaine étape : `/lancetonsite:maquette` — le
site dessiné sur le canevas Claude Design et en version animée, avec ces médias.

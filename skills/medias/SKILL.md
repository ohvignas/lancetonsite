---
name: medias
description: 'Produit tous les médias du site — photos, illustrations, vidéos de fond en boucle, sons, logo vectorisé — avec l''IA (MCP fal ou OpenRouter), comme sortis d''un même shooting, optimisés pour le web et rangés dans un manifeste. Étape 7 de l''Atelier.'
when_to_use: '"générer les images du site", "photos IA", "vidéo de fond", "créer les visuels", "image hero", "son d''ambiance", "vectoriser le logo", ou /atelier:medias.'
argument-hint: "[tout | <emplacement précis, ex. hero>]"
---

# Médias

Lire d'abord `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

## Entrées

- `03-charte/charte.md` — **direction photo**, palette (hex), ce qu'on ne montre jamais.
- `04-architecture.md` — les emplacements d'images page par page.
- `05-contenus/` — ce que chaque image doit illustrer.
- `06-design-system/DESIGN.md` — formats et ratios des composants.

Sans direction photo dans la charte : la construire avec l'utilisateur d'abord
(5 questions max, voir [references/fiche-shooting.md](references/fiche-shooting.md)).

## Règle d'or

**Les vraies photos battent les photos IA** pour tout ce qui doit inspirer confiance :
l'équipe, le lieu, les vrais produits, les vrais clients. Commencer par demander à
l'utilisateur ce qu'il possède déjà. L'IA sert pour l'ambiance, les textures, les fonds,
les illustrations, les plans impossibles à shooter. Ne jamais générer un faux client,
un faux membre de l'équipe ou un faux témoignage visuel.

## Étape 1 — L'inventaire

Dresser la liste de tous les médias nécessaires à partir de l'architecture : emplacement,
format, ratio, rôle, vraie photo disponible ou non. La présenter en tableau. Pour chaque
ligne, proposer : vraie photo / génération IA / pas d'image (le vide est aussi un choix).

## Étape 2 — Le budget

Estimer le coût total avant de lancer quoi que ce soit (`estimate_cost` ou `get_pricing`
du MCP fal, tarifs indicatifs dans [references/modeles.md](references/modeles.md)).
Annoncer : « environ X € pour N images et M vidéos ». Attendre le « oui ». Plafond par
défaut : 2 régénérations par média.

## Étape 3 — Le bloc de style

Écrire **un** bloc de style en anglais, réutilisé mot pour mot dans chaque prompt :
appareil et objectif, lumière, grain et rendu, palette avec codes hex, ce qu'on évite.
Modèle et exemples : [references/fiche-shooting.md](references/fiche-shooting.md).

## Étape 4 — L'image maîtresse

Générer **d'abord** l'image la plus importante (souvent le hero) en 2 à 4 variantes.
L'utilisateur choisit. Cette image devient la **référence** de toutes les suivantes.

## Étape 5 — La série

Chaque image suivante passe l'image maîtresse en référence (édition multi-références :
`image_urls` sur fal, `input_references` sur OpenRouter). C'est ce qui donne un même
shooting ; répéter le prompt ne suffit pas. Lancer les générations en lot
(`submit_jobs` puis `wait_for_jobs`). Montrer les résultats (`show_media_batch`).
Une image qui ne colle pas : la régénérer (2 fois max), sinon garder la meilleure et
le signaler.

Vidéos : plans de 5 à 8 s, lents, sans texte, muets. Boucle sans coupure : image de
départ = image d'arrivée (modèles « first-last frame »). Toujours une image d'affiche
(poster) pour la vidéo.

Sons : seulement s'ils servent la marque, coupés par défaut côté site.

## Étape 6 — Les outils, dans l'ordre

1. **MCP fal** (embarqué) : `recommend_model` → `run_model` ou `submit_job` →
   `check_job` → `show_media` → `save_job_outputs` pour télécharger.
2. **MCP OpenRouter** (embarqué) : `generate-image`. Pour des lots ou en script :
   [scripts/openrouter-image.sh](scripts/openrouter-image.sh) (variable
   `OPENROUTER_API_KEY`).
3. **Rien de connecté** : livrer pour chaque emplacement le prompt complet, le ratio et le
   modèle conseillé, prêts à coller.

## Étape 7 — Optimiser pour le web

Lancer `bash ${CLAUDE_SKILL_DIR}/scripts/optimiser-medias.sh projet-site/07-medias projet-site/07-medias/web`
(parcourt `images/`, `videos/`…) : AVIF + WebP en 640/1024/1600/2560 px, vidéos H.264 +
WebM sans son, poster JPG. Cible : hero < 250 Ko en AVIF, vidéo de fond < 3 Mo.
Le script demande `ffmpeg` ; absent, proposer de l'installer (`brew install ffmpeg` sur
macOS, `sudo apt install ffmpeg` sur Ubuntu), sinon livrer les originaux et signaler
que l'optimisation sera faite à l'étape 9 (le framework peut s'en charger).

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
- Avant de livrer : passer la série à l'agent `relecteur` — même lumière ? même grain ?
  même palette ? rien qui fasse « image de banque » ou « rendu 3D lisse » ?

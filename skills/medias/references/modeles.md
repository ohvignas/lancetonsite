# Modèles conseillés (vérifiés le 3 novembre 2026)

Les catalogues bougent chaque mois. Toujours préférer `recommend_model` du MCP fal, ou
`list-models` du MCP OpenRouter ; ces tables servent de point de départ et d'ordre de
grandeur. Copier les identifiants exactement.

## fal

| Besoin | Endpoint | Prix indicatif |
|---|---|---|
| Photo réaliste, cohérence personnes/produits | `google/nano-banana-2.1` (jusqu'à 14 références) | à l'unité, voir `estimate_cost` |
| Maquette de marque, produit | `fal-ai/nano-banana-pro` | ~0,15 $/image |
| Photo réaliste en série, prévisible | `fal-ai/flux-2-pro` | ~0,03 $/mégapixel |
| Alternative | `bytedance/seedream/v5/pro/text-to-image` | ~0,07 $/image |
| Maquettes avec texte lisible (jamais pour les photos du site) | `openai/gpt-image-2` | à l'unité |
| **Série cohérente à partir d'une référence** | `google/nano-banana-2.1/edit`, `fal-ai/nano-banana-pro/edit`, `bytedance/seedream/v5/pro/edit` | ~0,07 $ (Seedream) |
| Vidéo à partir d'un texte | `minimax/h3-max/text-to-video` | ~0,035 $/s |
| Vidéo à partir d'une image | `fal-ai/kling-video/v3/pro/image-to-video` | ~0,14 $/s |
| **Boucle sans coupure** (même image début/fin) | `fal-ai/kling-video/o1/image-to-video`, `fal-ai/veo3.1/first-last-frame-to-video` | ~0,11 $/s, ~0,40 $/s |
| Bruitage, ambiance | `fal-ai/elevenlabs/sound-effects/v2` | ~0,002 $/s |
| Musique | `elevenlabs/music/v2.5` | ~0,60 $/min |
| Détourage | `fal-ai/birefnet/v2`, `fal-ai/bria/background/remove` (usage commercial sûr) | quelques centimes |
| Agrandissement | `fal-ai/seedvr/upscale/image`, `topaz/upscale/image/precision` | ~0,001–0,01 $ |
| Image → SVG (logo) | `fal-ai/recraft/vectorize` | ~0,01 $ |
| Texte → vectoriel | `fal-ai/recraft/v4.1/text-to-vector` | ~0,08 $ |
| Texture raccordable | `fal-ai/z-image/turbo/tiling` | — |

Connexion : serveur `https://mcp.fal.ai/mcp-relay` (OAuth, aucune clé). Variante par clé
pour un usage sans navigateur : `https://mcp.fal.ai/mcp` avec l'en-tête
`Authorization: Bearer <FAL_KEY>` (clé sur fal.ai/dashboard/keys).

## OpenRouter (générateur par défaut quand fal n'est pas connecté)

MCP officiel `https://mcp.openrouter.ai/mcp` (OAuth ; crée une clé temporaire plafonnée).
Outils : `generate-image`, `generate-video`, `get-video`, `get-session-cost`,
`list-models` (`output_modalities` = `image` ou `video` pour la liste à jour),
`send-message`. Couvre images et vidéos ; **pas** de sons, de vectorisation ni de détourage.

| Besoin | Modèle | Remarque |
|---|---|---|
| Photo réaliste, série à partir d'une référence | `google/gemini-nano-banana-2.1` | édition, plusieurs références |
| Rapide et économique | `google/gemini-3.1-flash-image` (Nano Banana 2) | |
| Série cohérente, rendu prévisible | `black-forest-labs/flux.2-pro` | multi-références |
| Alternative | `bytedance-seed/seedream-5-0-pro` | édition précise |
| Maquettes avec texte lisible (jamais pour les photos du site) | `openai/gpt-image-2` | |
| Vidéo à partir d'un texte, économique | `google/veo-3.1-lite` | génère du son : mettre `generate_audio` à `false` |
| Vidéo à partir d'une image | `kwaivgi/kling-v3.0-pro` | |
| **Boucle sans coupure** (même image début/fin) | `kwaivgi/kling-v3.0-pro`, `bytedance/seedance-2.0`, `alibaba/wan-2.7` | contrôle première + dernière image |

Prix : l'API ne donne pas encore le prix par seconde des vidéos ; le lire sur
`openrouter.ai/<modèle>`. Le coût réel de chaque vidéo est renvoyé par `get-video`.

En script (sans MCP) :
- images : `POST https://openrouter.ai/api/v1/images`, réponse `data[0].b64_json`
  (pré-autorise 1 $ : le compte doit avoir plus de 1 $ de crédit) ;
- vidéos : `POST /api/v1/videos`, puis `GET /api/v1/videos/{id}` jusqu'à `completed`,
  puis `GET /api/v1/videos/{id}/content`.

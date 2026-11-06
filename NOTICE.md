# Attributions

Lance ton site est publié sous licence MIT (voir `LICENSE`). Il réutilise et adapte des
travaux publiés sous licence libre. Merci à leurs auteurs.

## Fichiers repris (licence MIT)

Les fichiers ci-dessous sont repris tels quels ou presque. Les textes Markdown portent
un en-tête d'attribution en première ligne ; les scripts `.cjs` modifiés le signalent dans
leur commentaire d'en-tête ; les fichiers de données (`.csv`, `.json`), qui ne peuvent
pas porter de commentaire, sont attribués ici. Les fichiers de référence restés en
anglais sont signalés par `.en.md` ou par leur en-tête.

| Source | Licence | Fichiers dans Lance ton site |
|---|---|---|
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) — © 2025 Corey Haines | MIT | `skills/cadrage/references/*.en.md`, `skills/marque/references/voix-de-marque.en.md`, `skills/architecture/references/*.en.md`, `skills/contenus/references/*.en.md`, `skills/construire/references/schema-jsonld.en.md` |
| [obra/superpowers](https://github.com/obra/superpowers) — © 2025 Jesse Vincent | MIT | `skills/prd/references/methode-plans.en.md`, `skills/construire/references/methode-execution.en.md` |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — © 2024 Next Level Builder | MIT | `skills/design-system/references/{token-architecture,primitive-tokens,semantic-tokens,component-tokens,component-specs,states-and-variants}.md`, `skills/design-system/scripts/{generate-tokens,validate-tokens}.cjs`, `skills/design-system/templates/design-tokens-starter.json`, `skills/design-system/data/*.csv` (`styles.csv` réduit aux 50 styles actifs et à certaines colonnes) |

Texte de la licence MIT de ces sources (les mentions de copyright figurent dans le
tableau ci-dessus) :

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Modifications apportées par Lance ton site : `generate-tokens.cjs` (erreur explicite sur une
référence introuvable ou une valeur composite), `validate-tokens.cjs` (fichiers `.astro`,
`.html`, `.njk`, `.liquid`, `.php` ; media queries ignorées ; code d'erreur seulement avec
`--strict`), `styles.csv` (réduit aux 50 styles actifs et à certaines colonnes).

## Méthodes adaptées (réécrites en français pour Lance ton site)

Ces skills ont inspiré des méthodes réécrites ; aucun texte n'en est copié.

| Source | Licence | Ce qui a inspiré Lance ton site |
|---|---|---|
| coreyhaines31/marketingskills — `customer-research`, `product-marketing`, `copywriting`, `copy-editing`, `site-architecture`, `seo-audit`, `ai-seo` | MIT | cadrage, marque, architecture, contenus |
| obra/superpowers — `brainstorming`, `writing-plans`, `executing-plans` | MIT | entretien, PRD, construction |
| AgriciDaniel/claude-seo — `seo-cluster` ; kostja94/marketing-skills — `keyword-research`, `branding` | MIT | recherche de mots-clés, plateforme de marque |
| hostinger/api-mcp-server, hostinger/hostinger-agent-skills | MIT | déploiement Hostinger |
| pbakaus/impeccable ; anthropics/skills — `frontend-design` | Apache-2.0 | principes de la grille `skills/design-system/references/anti-patterns.md` (rédigée pour Lance ton site, sans reprise de texte) |

## Outils et services appelés (non inclus)

fal.ai, OpenRouter, Hostinger, Firecrawl, DataForSEO, MCP for Blender, UI Skills (ui-skills.com), ainsi que les skills
`ui-ux-pro-max`, `impeccable` et les skills d'animation chargés via UI Skills (mengto,
greensock, iart-ai…) : ils restent sous leurs propres conditions d'utilisation.

Le kit `skills/maquette/templates/prototype/` (écrit pour Lance ton site) charge depuis
un CDN, sans les inclure : Tailwind CSS (MIT), GSAP (licence « no charge » de GreenSock,
gratuite plugins compris), Lenis (MIT). Les images d'exemple viennent de Lorem Picsum.

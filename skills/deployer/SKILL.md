---
name: deployer
description: 'Met le site en ligne — sur un VPS Hostinger (via le MCP Hostinger et SSH), ou sur l''hébergeur imposé par la stack choisie. Sécurise le serveur, relie le nom de domaine, active le HTTPS et vérifie que tout répond. Étape 12 de Lance ton site.'
when_to_use: '"déployer le site", "mettre en ligne", "publier sur mon VPS", "Hostinger", "connecter mon nom de domaine", "HTTPS", "mettre à jour le site en ligne", ou /lancetonsite:deployer.'
argument-hint: "[premier | mise-a-jour | diagnostic]"
---

# Déployer

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Mettre le site construit en ligne, proprement, sans bloquer l'utilisateur hors de son
propre serveur. Lire d'abord `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation). **Budget indicatif : environ 15 min**, hors propagation DNS ; un point
d'avancement à chaque étape ci-dessous. Document de fin : la remise du site, selon le
modèle `${CLAUDE_PLUGIN_ROOT}/commun/modeles/passation.md` (**partie B**), version courte
par défaut.

Cette étape se fait dans **Claude Code** (SSH, rsync et le dossier `projet-site/site/` sont sur
l'ordinateur). Lancée dans Claude : l'expliquer en une phrase et proposer
`/lancetonsite:passation`.

## Entrées

- `projet-site/00-etat.md` — parcours, stack, mode, domaine. Absent (étape lancée seule,
  `projet-site/` introuvable) : créer un `00-etat.md` minimal avec la ligne
  « Enchaînement : manuel », puis déduire le reste de `site/`.
- `projet-site/11-plan.md` — section « Déploiement » rédigée par l'étape PRD.
- Le dossier `projet-site/site/` construit (`site/` dans ce fichier ; ancien projet : `site/` à
  côté de `projet-site/`) — sauf stacks hébergées (Webflow, Framer, Wix, Shopify), où le site vit
  dans l'outil et où ce contrôle ne s'applique pas.
- `04-architecture.md` § Redirections (refonte).

**Site en HTML pur** (stack HTML/CSS) : on publie `projet-site/public/`, une copie sans les fichiers de
travail, à relancer avant chaque publication :
`rsync -a --delete --exclude _partials --exclude _sections --exclude DESIGN.md --exclude .lancetonsite --exclude /scripts --exclude 'css/source.css' --exclude generer-images.py --exclude style.txt projet-site/site/ projet-site/public/`.
Netlify : `--dir=projet-site/public`. Cloudflare Pages : `pages deploy projet-site/public`.
Script du VPS, depuis `projet-site/site/` : `bash scripts/deployer-statique.sh DOMAINE IP ../public`.

**Étape lancée seule, sans `11-plan.md` ni `10-prd.md`** : ils ne sont pas exigés. Stack vide dans
`00-etat.md` : la déduire de `site/` et l'y écrire. `09-passation.md` absent : le créer avec la seule partie B. Pages à vérifier (temps 6) :
déduites de `site/sitemap.xml`, sinon des fichiers `.html` de `site/`.

`site/` absent ou build en échec : le dire en une phrase et proposer `/lancetonsite:construire`. Ne jamais
déployer un build cassé.

Outils nécessaires sur l'ordinateur : `ssh`, `rsync` (présents sur macOS et Linux ; sous
Windows, utiliser WSL), `curl`, `dig`. Vérifier avec `which` et guider l'installation si
l'un manque.

## Temps 1 — Choisir la cible

**Rien à mettre en ligne maintenant.** Ligne « Mise en ligne » de `00-etat.md` :
« rien en ligne pour l'instant » (ou demande équivalente : « je ne publie pas encore »,
« juste préparer »). Alors, et seulement alors :
1. préparer `projet-site/public/` : site en HTML pur, le rsync de l'entrée ci-dessus ; autre stack, lancer le build et y copier sa sortie (`dist/`, `_site/`, `public/` selon l'outil), jamais les sources ;
2. contrôle local : `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/servir.py projet-site/public` (en arrière-plan), sur les
   pages de `sitemap.xml` ;
3. écrire `projet-site/12-deploiement.md`, marqué « non publié », avec la commande pour
   publier plus tard (`/lancetonsite:deployer premier`) ;
4. aucune connexion à un serveur, aucun achat, aucune clé SSH, aucune écriture DNS.
La porte dit : « Prêt à publier, rien n'est en ligne. » Valider termine le parcours ; les
temps 2 à 7 attendent un futur « publie ».

Lancé avec `premier`, ou sur un « publie » de l'utilisateur : passer d'abord la ligne « Mise en ligne »
à « prévue » ; ce paragraphe ne s'applique plus.

Sinon, lire la stack dans `00-etat.md` puis appliquer ce tableau :

| Stack | Cible par défaut | Recette |
|---|---|---|
| HTML/CSS, Astro statique, Eleventy, Hugo, Vite SPA | VPS Hostinger + Caddy | [recettes.md § A](references/recettes.md) |
| Next.js, Nuxt, Astro SSR, SvelteKit, Remix | VPS Hostinger + Node (PM2) ou Docker + Caddy | [recettes.md § B](references/recettes.md) |
| Plusieurs apps, envie d'un tableau de bord | VPS Hostinger avec Coolify ou Dokploy | [recettes.md § C](references/recettes.md) |
| WordPress | VPS Hostinger avec CloudPanel, ou hébergement WordPress Hostinger | [recettes.md § D](references/recettes.md) |
| Webflow, Framer, Wix, Shopify | Leur propre hébergement — pas de VPS | [recettes.md § E](references/recettes.md) |
| Site statique sans VPS | Netlify, Cloudflare Pages ou GitHub Pages (gratuits) | [recettes.md § F](references/recettes.md) |

Si l'utilisateur n'a pas de VPS : expliquer en 3 lignes ce qu'est un VPS, ce que
coûte le plus petit plan suffisant (vérifier le prix sur hostinger.fr, ne pas le citer
de mémoire), et proposer l'alternative gratuite pour un site statique (Netlify,
Cloudflare Pages, GitHub Pages — recette F). Ne jamais acheter à sa place.

S'il choisit un VPS Hostinger et n'en a pas encore : lui donner le lien partenaire
**https://www.hostg.xyz/SHK4I** et le code **AV10** (10 % de réduction sur le VPS, à
saisir au paiement). Le dire tel quel : « c'est un lien partenaire de l'auteur du
plugin ; ça ne te coûte rien de plus, et le code AV10 te fait 10 % sur le VPS ». Le
lien est cliquable dans le message ; proposer aussi de l'ouvrir dans le navigateur
(sur un oui seulement). L'achat, le choix du plan et le paiement restent à
l'utilisateur. Reprendre au temps 2 quand il a son VPS.

## Temps 2 — Se connecter

1. **MCP Hostinger** : le plugin l'embarque (`hostinger`, connexion OAuth au premier
   appel). Ses outils sont `search`, `execute`, `multi-execute`. Ne jamais deviner un nom
   d'opération : appeler `search` d'abord et lire le schéma renvoyé. Détails :
   [references/hostinger-mcp.md](references/hostinger-mcp.md).
2. Récupérer l'IP et l'état du VPS (`vps_virtual-machines_list` puis `_get`).
3. **Clé SSH** : vérifier `test -f ~/.ssh/id_ed25519.pub`. Absente → la créer sans
   phrase de passe (le shell de Claude ne peut pas en saisir) :
   `test -f ~/.ssh/id_ed25519 || ssh-keygen -t ed25519 -N "" -C lancetonsite -f ~/.ssh/id_ed25519`.
   Proposer à l'utilisateur d'y ajouter une phrase de passe ensuite (`ssh-keygen -p`). Puis
   l'ajouter au VPS avec `vps_ssh-keys_add-virtual-machine` (après accord), ou guider
   l'utilisateur dans hPanel → VPS → Gérer → Paramètres → Clés SSH.
4. Tester (la première connexion accepte l'empreinte du serveur) :
   `ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 root@IP 'echo ok'`.

Sans MCP (refus OAuth, autre hébergeur) : tout se fait en SSH, l'utilisateur fournit IP
et utilisateur.

## Temps 3 — Sécuriser (premier déploiement seulement)

Suivre [references/securiser-vps.md](references/securiser-vps.md) : utilisateur `deploy`,
pare-feu, fail2ban, connexion par mot de passe coupée. **Règle anti-blocage** : avant de
couper l'accès root par mot de passe, prouver dans une nouvelle connexion que
`ssh deploy@IP` fonctionne par clé. Si ce test échoue, ne rien couper.

Si le pare-feu Hostinger (hPanel) est utilisé : il bloque tout par défaut une fois
activé. Créer les règles 22, 80, 443 **avant** de l'activer, puis lancer `_sync`.

## Temps 4 — Nom de domaine

Suivre [references/dns.md](references/dns.md). Points clés :
- Domaine chez Hostinger : enregistrements A `@` et `www` vers l'IP du VPS via
  `dns_records_update`. **Lire la zone avant**, ne jamais écraser MX, SPF, DKIM, TXT
  (le courriel de l'utilisateur en dépend). Passer d'abord par `dns_records_validate`.
- Domaine ailleurs : donner à l'utilisateur les deux lignes exactes à saisir chez son
  registraire.
- Attendre que `dig +short A domaine @1.1.1.1` renvoie l'IP avant de lancer Caddy.

## Temps 5 — Déployer

Appliquer la recette du temps 1. Pour un site statique, le script
[scripts/deployer-statique.sh](scripts/deployer-statique.sh) fait build + rsync + reload.
Au premier déploiement, **copier ce script dans `projet-site/site/scripts/`** : la mise à jour se
fera ensuite sans Claude, depuis `projet-site/site/`, avec
`bash scripts/deployer-statique.sh DOMAINE IP` (site en HTML pur : le rsync d'abord, puis
`../public` en 3e argument).

Refonte : poser les redirections 301 listées dans `04-architecture.md` (Caddyfile,
voir recettes.md § Redirections ; ou réglages de redirection de l'outil hébergé).

## Temps 6 — Vérifier (obligatoire)

Ne pas annoncer « en ligne » sans ces preuves :
- `curl -sSI https://domaine` → `200`, et `http://` redirige vers `https://`.
- `www` redirige vers le domaine nu (ou l'inverse, selon le choix noté).
- Certificat valide : `curl -vI https://domaine 2>&1 | grep -i "expire date"`.
- Les 3 pages principales (celles du plan, sinon de `sitemap.xml` ou des fichiers de
  `site/`) répondent 200 ; une URL bidon répond 404 (sauf SPA
  avec `try_files`, qui renvoie 200 : le signaler).
- Refonte : chaque ancienne URL répond `301` vers la bonne nouvelle URL
  (`curl -sI https://domaine/ancienne | grep -i -E "^HTTP|^location"`).
- Le formulaire de l'action principale fonctionne (envoi test, si un service est branché).
- `robots.txt` et `sitemap.xml` répondent.

## Temps 7 — Documenter

Écrire `projet-site/12-deploiement.md` avec le modèle
[templates/12-deploiement.md](templates/12-deploiement.md) : IP, utilisateur, chemins,
commande de mise à jour en une ligne, où sont les journaux, comment revenir en arrière.
**Aucun mot de passe, jeton ni clé privée dans ce fichier.** Mettre à jour `00-etat.md`.

Puis remplir la **partie B** de `projet-site/09-passation.md` (remise au client :
adresse du site, domaine et date de renouvellement, hébergement, accès, comment
modifier son site, qui appeler), la publier (`parcours.md` § 3), et finir par **une**
question à choix (`parcours.md` § 4) : « Valider la mise en ligne » / « Modifier ». Le
parcours est terminé sur ce oui.

## Mode `mise-a-jour`

Build local (site en HTML pur : le rsync vers `projet-site/public/`) → mêmes commandes que la
recette → vérification du temps 6. Une phrase de bilan.

## Mode `diagnostic`

Site injoignable : vérifier dans l'ordre DNS (`dig`), pare-feu (`ufw status`, pare-feu
hPanel), service (`systemctl status caddy` / `pm2 ls` / `docker ps`), journaux
(`journalctl -u caddy -n 50`). Décrire la cause trouvée avant de corriger.

## Actions qui exigent un « oui » explicite

Annoncer en une ligne ce qui va se passer, attendre le oui, puis agir :
- toute écriture DNS ; activer ou modifier un pare-feu ;
- publier ou écraser la production : premier `rsync --delete` vers le serveur,
  `netlify deploy --prod`, tout déploiement du mode `mise-a-jour` ;
- réinstaller l'OS du VPS (`vps_virtual-machines_recreate` **efface tout**, sauvegardes
  comprises) ; restaurer une sauvegarde ou un instantané ;
- supprimer un projet Docker (efface volumes et images) ;
- tout achat (`*_purchase`) — ne jamais le faire, renvoyer l'utilisateur vers hPanel ;
- changer le mot de passe root, retirer une clé SSH ;
- couper la connexion par mot de passe ou l'accès root en SSH (modifier `sshd`) —
  seulement après le test anti-blocage réussi.

---
name: deployer
description: 'Met le site en ligne — sur un VPS Hostinger (via le MCP Hostinger et SSH), ou sur l''hébergeur imposé par la stack choisie. Sécurise le serveur, relie le nom de domaine, active le HTTPS et vérifie que tout répond. Étape 10 de l''Atelier.'
when_to_use: '"déployer le site", "mettre en ligne", "publier sur mon VPS", "Hostinger", "connecter mon nom de domaine", "HTTPS", "mettre à jour le site en ligne", ou /atelier:deployer.'
argument-hint: "[premier | mise-a-jour | diagnostic]"
---

# Déployer

Mettre le site construit en ligne, proprement, sans bloquer l'utilisateur hors de son
propre serveur. Lire d'abord `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

## Entrées

- `projet-site/00-etat.md` — stack, mode, domaine.
- `projet-site/09-plan.md` — section « Déploiement » rédigée par l'étape PRD.
- Le dossier `site/` construit — sauf stacks hébergées (Webflow, Framer, Wix, Shopify),
  où le site vit dans l'outil et où ce contrôle ne s'applique pas.
- `04-architecture.md` § Redirections (refonte).

Stack auto-hébergée : si `site/` n'existe pas ou si son build échoue, le dire en une
phrase et proposer `/atelier:construire`. Ne jamais déployer un build cassé.

Outils nécessaires sur l'ordinateur : `ssh`, `rsync` (présents sur macOS et Linux ; sous
Windows, utiliser WSL), `curl`, `dig`. Vérifier avec `which` et guider l'installation si
l'un manque.

## Étape 1 — Choisir la cible

Lire la stack dans `00-etat.md` puis appliquer ce tableau :

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

## Étape 2 — Se connecter

1. **MCP Hostinger** : le plugin l'embarque (`hostinger`, connexion OAuth au premier
   appel). Ses outils sont `search`, `execute`, `multi-execute`. Ne jamais deviner un nom
   d'opération : appeler `search` d'abord et lire le schéma renvoyé. Détails :
   [references/hostinger-mcp.md](references/hostinger-mcp.md).
2. Récupérer l'IP et l'état du VPS (`vps_virtual-machines_list` puis `_get`).
3. **Clé SSH** : vérifier `test -f ~/.ssh/id_ed25519.pub`. Absente → la créer sans
   phrase de passe (le shell de Claude ne peut pas en saisir) :
   `test -f ~/.ssh/id_ed25519 || ssh-keygen -t ed25519 -N "" -C atelier -f ~/.ssh/id_ed25519`.
   Proposer à l'utilisateur d'y ajouter une phrase de passe ensuite (`ssh-keygen -p`). Puis
   l'ajouter au VPS avec `vps_ssh-keys_add-virtual-machine` (après accord), ou guider
   l'utilisateur dans hPanel → VPS → Gérer → Paramètres → Clés SSH.
4. Tester (la première connexion accepte l'empreinte du serveur) :
   `ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 root@IP 'echo ok'`.

Sans MCP (refus OAuth, autre hébergeur) : tout se fait en SSH, l'utilisateur fournit IP
et utilisateur.

## Étape 3 — Sécuriser (premier déploiement seulement)

Suivre [references/securiser-vps.md](references/securiser-vps.md) : utilisateur `deploy`,
pare-feu, fail2ban, connexion par mot de passe coupée. **Règle anti-blocage** : avant de
couper l'accès root par mot de passe, prouver dans une nouvelle connexion que
`ssh deploy@IP` fonctionne par clé. Si ce test échoue, ne rien couper.

Si le pare-feu Hostinger (hPanel) est utilisé : il bloque tout par défaut une fois
activé. Créer les règles 22, 80, 443 **avant** de l'activer, puis lancer `_sync`.

## Étape 4 — Nom de domaine

Suivre [references/dns.md](references/dns.md). Points clés :
- Domaine chez Hostinger : enregistrements A `@` et `www` vers l'IP du VPS via
  `dns_records_update`. **Lire la zone avant**, ne jamais écraser MX, SPF, DKIM, TXT
  (le courriel de l'utilisateur en dépend). Passer d'abord par `dns_records_validate`.
- Domaine ailleurs : donner à l'utilisateur les deux lignes exactes à saisir chez son
  registraire.
- Attendre que `dig +short A domaine @1.1.1.1` renvoie l'IP avant de lancer Caddy.

## Étape 5 — Déployer

Appliquer la recette de l'étape 1. Pour un site statique, le script
[scripts/deployer-statique.sh](scripts/deployer-statique.sh) fait build + rsync + reload.
Au premier déploiement, **copier ce script dans `site/scripts/`** : la mise à jour se
fera ensuite sans Claude, depuis `site/`, avec
`bash scripts/deployer-statique.sh DOMAINE IP`.

Refonte : poser les redirections 301 listées dans `04-architecture.md` (Caddyfile,
voir recettes.md § Redirections ; ou réglages de redirection de l'outil hébergé).

## Étape 6 — Vérifier (obligatoire)

Ne pas annoncer « en ligne » sans ces preuves :
- `curl -sSI https://domaine` → `200`, et `http://` redirige vers `https://`.
- `www` redirige vers le domaine nu (ou l'inverse, selon le choix noté).
- Certificat valide : `curl -vI https://domaine 2>&1 | grep -i "expire date"`.
- Les 3 pages principales du plan répondent 200 ; une URL bidon répond 404 (sauf SPA
  avec `try_files`, qui renvoie 200 : le signaler).
- Refonte : chaque ancienne URL répond `301` vers la bonne nouvelle URL
  (`curl -sI https://domaine/ancienne | grep -i -E "^HTTP|^location"`).
- Le formulaire de l'action principale fonctionne (envoi test, si un service est branché).
- `robots.txt` et `sitemap.xml` répondent.

## Étape 7 — Documenter

Écrire `projet-site/10-deploiement.md` avec le modèle
[templates/10-deploiement.md](templates/10-deploiement.md) : IP, utilisateur, chemins,
commande de mise à jour en une ligne, où sont les journaux, comment revenir en arrière.
**Aucun mot de passe, jeton ni clé privée dans ce fichier.** Mettre à jour `00-etat.md`.

## Mode `mise-a-jour`

Build local → mêmes commandes que la recette → vérification étape 6. Une phrase de bilan.

## Mode `diagnostic`

Site injoignable : vérifier dans l'ordre DNS (`dig`), pare-feu (`ufw status`, pare-feu
hPanel), service (`systemctl status caddy` / `pm2 ls` / `docker ps`), journaux
(`journalctl -u caddy -n 50`). Décrire la cause trouvée avant de corriger.

## Actions qui exigent un « oui » explicite

Annoncer en une ligne ce qui va se passer, attendre le oui, puis agir :
- toute écriture DNS ; activer ou modifier un pare-feu ;
- réinstaller l'OS du VPS (`vps_virtual-machines_recreate` **efface tout**, sauvegardes
  comprises) ; restaurer une sauvegarde ou un instantané ;
- supprimer un projet Docker (efface volumes et images) ;
- tout achat (`*_purchase`) — ne jamais le faire, renvoyer l'utilisateur vers hPanel ;
- changer le mot de passe root, retirer une clé SSH ;
- couper la connexion par mot de passe ou l'accès root en SSH (modifier `sshd`) —
  seulement après le test anti-blocage réussi.

# Recettes de déploiement

Remplacer `exemple.fr` par le domaine et `IP` par l'IP du VPS.

## A. Site statique (HTML, Astro statique, Eleventy, Hugo, Vite)

Une fois :
```bash
ssh -o StrictHostKeyChecking=accept-new root@IP 'mkdir -p /var/www/exemple.fr && chown deploy:deploy /var/www/exemple.fr'
```

`/etc/caddy/Caddyfile` :
```
exemple.fr {
	root * /var/www/exemple.fr
	encode zstd gzip
	file_server
	header /_astro/* Cache-Control "public, max-age=31536000, immutable"
	handle_errors {
		rewrite * /404.html
		file_server
	}
}
www.exemple.fr {
	redir https://exemple.fr{uri} permanent
}
```
Pour une SPA (Vite/React sans SSR), ajouter `try_files {path} /index.html` dans le
premier bloc (conséquence : une URL inexistante répond 200 et non 404).

Premier déploiement : copier `${CLAUDE_PLUGIN_ROOT}/skills/deployer/scripts/deployer-statique.sh`
dans `projet-site/site/scripts/`. Ensuite, depuis `projet-site/site/` : `bash scripts/deployer-statique.sh exemple.fr IP`
(build, rsync `--delete`, reload). Dossier de sortie détecté : `dist/` (Astro, Vite),
`_site/` (Eleventy), `public/` (Hugo), `out/` (Next.js en `output: "export"`), ou la
racine pour un site HTML pur (passer `.` en 3e argument). Parcours direct ou express : passer
`../public`, la copie sans les fichiers de travail (`deployer`, « Entrées »).

## B. Application Node avec serveur (Next.js, Nuxt, Astro SSR, SvelteKit)

Option 1 — **PM2** (le plus simple).

Le code doit être dans un dépôt git distant (GitHub, GitLab). S'il n'existe pas encore :
le créer (privé), pousser `site/` dedans (après accord), puis sur le VPS créer une **clé
de déploiement** en lecture seule pour que `deploy` puisse cloner :
```bash
# sur le VPS, en deploy
ssh-keygen -t ed25519 -N "" -C deploy@vps -f ~/.ssh/deploy_key
cat ~/.ssh/deploy_key.pub   # à coller dans GitHub → dépôt → Settings → Deploy keys (lecture seule)
cat >> ~/.ssh/config <<'FIN'
Host github.com
  IdentityFile ~/.ssh/deploy_key
  IdentitiesOnly yes
FIN
```

Installation (une fois, **en root** — `deploy` n'a pas les droits d'administration) :
```bash
# en root — vérifier la version LTS actuelle de Node sur nodejs.org avant de lancer
curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt -y install nodejs
npm i -g pm2
pm2 startup systemd -u deploy --hp /home/deploy   # démarrage automatique de PM2 pour deploy
```

Puis en `deploy` :
```bash
git clone git@github.com:<compte>/<dépôt>.git ~/app && cd ~/app && npm ci && npm run build
PORT=3000 HOST=127.0.0.1 pm2 start npm --name site -- start
pm2 save
```
Points d'entrée : Next.js `npm run start` ; Astro SSR `npx astro add node` (mode
standalone) puis `node ./dist/server/entry.mjs` ; Nuxt `node .output/server/index.mjs`.

Mise à jour : `cd ~/app && git pull && npm ci && npm run build && pm2 reload site`.

Option 2 — **Docker** : `docker-compose.yaml` avec `ports: ["127.0.0.1:3000:3000"]`,
puis `docker compose up -d --build`. Ou via le Docker Manager Hostinger
(`vps_docker_create` avec l'URL du dépôt GitHub — branche `master`). Next.js : activer
`output: "standalone"`.

Caddyfile :
```
exemple.fr {
	encode zstd gzip
	reverse_proxy 127.0.0.1:3000
}
www.exemple.fr {
	redir https://exemple.fr{uri} permanent
}
```

## C. Coolify ou Dokploy (tableau de bord, déploiement par git push)

Idéal si plusieurs sites ou si l'utilisateur ne veut pas de ligne de commande après coup.
- Choisir le modèle « Ubuntu 24.04 with Coolify » ou « with Dokploy » dans hPanel →
  OS & Panel. **Changer d'OS efface tout le VPS** : à faire seulement sur un serveur vide,
  après un « oui » explicite.
- 2 Go de RAM minimum (Dokploy : 30 Go de disque).
- Tableau de bord : `http://IP:3000` selon Hostinger ; Coolify utilise aussi `:8000` en
  standard — tester les deux.
- Ensuite : relier le dépôt GitHub, renseigner le domaine, le SSL est automatique.

## D. WordPress

Modèle « Ubuntu 24.04 with CloudPanel » (même avertissement : réinstallation = effacement),
puis création du site WordPress dans CloudPanel. Ou hébergement WordPress mutualisé
Hostinger, plus simple et souvent suffisant.

## Redirections (refonte)

Pour chaque ligne du tableau « Redirections » de `04-architecture.md`, dans le bloc du
domaine du Caddyfile :
```
	redir /ancienne-page /nouvelle-page permanent
	redir /blog/* /journal{path} permanent
```
Recharger (`systemctl reload caddy`) puis vérifier chaque ancienne URL :
`curl -sI https://exemple.fr/ancienne-page | grep -i -E "^HTTP|^location"` → `301` et la
bonne destination. Outils hébergés (Webflow, Framer, Shopify) : saisir les mêmes
redirections dans leurs réglages.

## E. Webflow, Framer, Wix, Shopify

Hébergés chez eux, pas de VPS. Déployer = publier dans l'outil, puis relier le domaine
avec les enregistrements DNS **qu'ils fournissent** (pas l'IP du VPS).
- Framer : pas d'export HTML pour auto-hébergement.
- Webflow : export de code seulement sur forfaits Workspace payants, et sans CMS,
  formulaires, recherche, e-commerce ni langues secondaires. Le HTML exporté se déploie
  avec la recette A.

## F. Site statique sans VPS (gratuit)

Pour un petit site statique quand l'utilisateur n'a pas de serveur. Vérifier les
conditions actuelles de l'offre gratuite sur le site du service avant de recommander.

| Service | Mise en ligne | Domaine personnalisé |
|---|---|---|
| Netlify | `npx netlify-cli deploy --prod --dir=dist` (connexion au premier lancement) ou glisser le dossier `dist/` sur app.netlify.com | Domain settings → enregistrements DNS indiqués |
| Cloudflare Pages | `npx wrangler pages deploy dist` (connexion au premier lancement), ou lier le dépôt GitHub | Custom domains → CNAME indiqué |
| GitHub Pages | dépôt GitHub + GitHub Actions officielle de la stack (Astro fournit un modèle) | Settings → Pages → domaine personnalisé + CNAME |

Parcours direct ou express : remplacer `dist` par `projet-site/public` (`deployer`, « Entrées »).

Les commandes en ligne ouvrent une connexion dans le navigateur ; ne jamais coller de
jeton dans un fichier du projet. Redirections : fichier `_redirects` (Netlify,
Cloudflare Pages) au format `/ancienne /nouvelle 301`.

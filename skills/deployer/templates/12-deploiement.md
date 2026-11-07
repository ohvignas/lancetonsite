# Déploiement — {{NOM_DU_PROJET}}

> Étape 12 — mis à jour le {{DATE}} — statut : brouillon
> {{Si rien n'est en ligne : « non publié — rien n'est en ligne pour l'instant ». Pour publier plus tard : voir « Publier plus tard » ci-dessous.}}
> Aucun mot de passe, jeton ni clé privée dans ce fichier.

## En un coup d'œil

| | |
|---|---|
| Adresse | https://{{DOMAINE}} |
| Hébergement | {{VPS Hostinger / autre}} — IP {{IP}} |
| Méthode | {{Statique + Caddy / PM2 + Caddy / Docker / Coolify / outil hébergé}} |
| Utilisateur SSH | `deploy` (clé `~/.ssh/id_ed25519`) |
| Dossier en ligne | `{{/var/www/DOMAINE ou ~/app}}` |

## Publier plus tard (si « non publié »)

1. Préparer `projet-site/public/` (copie propre de `site/`) et le contrôler en local :
   `python3 ${CLAUDE_PLUGIN_ROOT}/commun/scripts/servir.py projet-site/public`.
2. Demander : `/lancetonsite:deployer premier`. Il choisira l'hébergement, relira ce
   document et ne publiera qu'après ton oui.

## Contrôle local (si « non publié »)

| Page | Réponse sur le serveur local |
|---|---|

## Mettre à jour le site

```bash
{{commande unique, depuis projet-site/site/ : bash scripts/deployer-statique.sh DOMAINE IP ; site en HTML pur : relancer d'abord le rsync vers public/, puis passer ../public en 3e argument}}
```
Ou demander : `/lancetonsite:deployer mise-a-jour`.

## Revenir en arrière

{{ex. : git checkout <commit précédent> puis relancer la commande ; ou instantané hPanel}}

## Où regarder si ça casse

- Serveur web : `ssh deploy@IP 'sudo journalctl -u caddy -n 50'`
- Application : {{pm2 logs site / docker compose logs}}
- DNS : `dig +short A {{DOMAINE}} @1.1.1.1`

## DNS en place

| Nom | Type | Valeur |
|---|---|---|
| @ | A | {{IP}} |
| www | A | {{IP}} |

## Sécurité en place

- [ ] Utilisateur `deploy`, connexion par clé uniquement
- [ ] Pare-feu : 22, 80, 443
- [ ] fail2ban, mises à jour automatiques
- [ ] HTTPS automatique (Caddy / Let's Encrypt)

> Ce sont des mesures appliquées, pas une garantie de sécurité totale. Un serveur
> demande des mises à jour régulières.

## Vérifications de mise en ligne ({{DATE}})

- [ ] `https://` → 200, `http://` redirige
- [ ] `www` redirige
- [ ] Certificat valide jusqu'au {{date lue}}
- [ ] Toutes les pages → 200, page inexistante → 404
- [ ] Refonte : chaque ancienne URL → 301 vers la bonne adresse
- [ ] `robots.txt`, `sitemap.xml`
- [ ] Formulaire testé (si un service est branché)
- [ ] Contrôles en ligne : liens, performance ({{valeurs lues}}), SEO, mentions légales

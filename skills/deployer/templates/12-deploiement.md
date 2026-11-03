# Déploiement — {{NOM_DU_PROJET}}

> Étape 12 — mis à jour le {{DATE}} — statut : brouillon
> Aucun mot de passe, jeton ni clé privée dans ce fichier.

## En un coup d'œil

| | |
|---|---|
| Adresse | https://{{DOMAINE}} |
| Hébergement | {{VPS Hostinger / autre}} — IP {{IP}} |
| Méthode | {{Statique + Caddy / PM2 + Caddy / Docker / Coolify / outil hébergé}} |
| Utilisateur SSH | `deploy` (clé `~/.ssh/id_ed25519`) |
| Dossier en ligne | `{{/var/www/DOMAINE ou ~/app}}` |

## Mettre à jour le site

```bash
{{commande unique, depuis site/ : bash scripts/deployer-statique.sh DOMAINE IP}}
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

## Vérifications de mise en ligne ({{DATE}})

- [ ] `https://` → 200, `http://` redirige
- [ ] `www` redirige
- [ ] Pages principales → 200, page inexistante → 404
- [ ] `robots.txt`, `sitemap.xml`
- [ ] Formulaire testé

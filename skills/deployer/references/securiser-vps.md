# Sécuriser un VPS Ubuntu 24.04 neuf

À faire une seule fois, au premier déploiement, connecté en `root` par clé SSH.

## 1. Mises à jour et utilisateur `deploy`

```bash
apt update && apt -y upgrade
id deploy 2>/dev/null || adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh && chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys
echo 'deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl reload caddy, /usr/bin/systemctl restart caddy' > /etc/sudoers.d/deploy-caddy
chmod 440 /etc/sudoers.d/deploy-caddy && visudo -c
```

## 2. Pare-feu, fail2ban, mises à jour automatiques

```bash
ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw --force enable
apt -y install fail2ban unattended-upgrades
systemctl enable --now fail2ban
```

Docker contourne `ufw` pour les ports publiés : publier les conteneurs sur
`127.0.0.1:PORT:PORT` et laisser Caddy faire la porte d'entrée.

## 3. Test anti-blocage — AVANT de couper les mots de passe

Depuis la machine de l'utilisateur, dans une **nouvelle** connexion :

```bash
ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new deploy@IP 'echo ok'
```

`ok` s'affiche → continuer. Sinon → **s'arrêter**, ne rien couper, diagnostiquer
(clé copiée ? droits 700/600 ? propriétaire `deploy` ?).

## 4. Couper la connexion par mot de passe (après un « oui » explicite)

```bash
printf 'PasswordAuthentication no\nKbdInteractiveAuthentication no\nPermitRootLogin prohibit-password\n' \
  > /etc/ssh/sshd_config.d/00-lancetonsite.conf
sshd -t && systemctl restart ssh
```

Le préfixe `00-` passe avant un éventuel fichier cloud-init qui réactiverait les mots de
passe (OpenSSH garde la première valeur lue). Garder la session root ouverte et retester
`ssh deploy@IP 'echo ok'` avant de la fermer.

## 5. Installer Caddy (HTTPS automatique)

```bash
apt -y install debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt -y install caddy
```

Vérifier la commande d'installation sur https://caddyserver.com/docs/install si elle
échoue : c'est la source officielle. Configuration dans `/etc/caddy/Caddyfile`,
application par `systemctl reload caddy`.

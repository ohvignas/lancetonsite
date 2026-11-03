# MCP Hostinger — mode d'emploi

Vérifié le 3 novembre 2026 sur github.com/hostinger/api-mcp-server (v3.x). Le paquet
évolue vite : en cas de doute, `search` fait foi, pas ce fichier.

## Connexion

- **Embarqué dans le plugin** : serveur distant `https://mcp.hostinger.com`, connexion
  OAuth dans le navigateur au premier appel. Aucun jeton à coller.
- **Variante locale** (CI, machine sans navigateur) :
  ```json
  {"mcpServers":{"hostinger":{"command":"npx","args":["-y","@hostinger/mcp"],
   "env":{"HOSTINGER_API_TOKEN":"${HOSTINGER_API_TOKEN}"}}}}
  ```
  Jeton : hPanel → Dev → API → Jetons API → Nouveau jeton. Il n'est affiché qu'une fois.
  Node 20+ requis (24 recommandé).

## Trois outils seulement

Depuis la v2.1 le serveur n'expose plus un outil par opération mais :

| Outil | Rôle |
|---|---|
| `search` | Trouve des opérations par mots-clés et renvoie leur `inputSchema`. |
| `execute` | Lance une opération : `{operation, params}`. |
| `multi-execute` | Jusqu'à 20 opérations à la suite ; réutilise un résultat avec `$steps.<i>.<chemin>`. Ne mélange pas VPS et DNS dans un même lot. |

Les anciens noms (`VPS_getVirtualMachinesV1`, `DNS_updateDNSRecordsV1`…) n'existent plus.
Toujours `search` → lire le schéma → `execute`.

## Opérations utiles (noms actuels)

**VPS** — `vps_virtual-machines_list`, `_get` (IP v4/v6, état, OS), `_restart`, `_start`,
`vps_actions_list`, `vps_actions_get` (suivre une action longue).

**Clés SSH** — `vps_ssh-keys_add-virtual-machine` `{virtualMachineId, keys:["ssh-ed25519 AAAA… lancetonsite"]}`
(ajoute à **root**), `vps_ssh-keys_list-virtual-machine`. Les `vps_public-keys_*` sont
dépréciées.

**Pare-feu Hostinger** — `vps_firewall_list|get|create|create-rule|activate|sync`.
Règle : `{firewallId, protocol, port, source:"any"}`. Une fois activé il **bloque tout** :
créer 22/80/443 avant `activate`, puis `sync` après chaque modification.

**Modèles d'OS** — `vps_templates_list`, `vps_virtual-machines_recreate` (**efface tout**).

**Docker Manager** — `vps_docker_create` `{virtualMachineId, project_name, content}` où
`content` = YAML brut, URL d'un compose, ou URL d'un dépôt GitHub (lit
`docker-compose.yaml` sur la branche **master**). Même nom = projet remplacé.
Puis `vps_docker_list|get|containers|logs|restart|update`.

**DNS** (domaines gérés par Hostinger) — `dns_records_list`, `dns_records_validate`,
`dns_records_update` `{domain, overwrite, zone:[{name,type,ttl,records:[{content}]}]}`,
`dns_snapshots_list|restore`.

**Domaines** — `domains_portfolio_list`, `domains_portfolio_get`. Des serveurs de noms en
`dns-parking.com` signifient que Hostinger gère la zone.

## Opérations destructrices — « oui » explicite obligatoire

| Opération | Effet |
|---|---|
| `vps_virtual-machines_recreate` | Réinstalle l'OS : données et instantanés perdus. |
| `vps_docker_delete` | Supprime conteneurs, volumes, images. |
| `vps_backups_restore`, `vps_snapshots_restore` | Écrase le disque. |
| `vps_snapshots_create` | Remplace l'instantané existant. |
| `dns_records_update` (surtout `overwrite:true`), `_delete`, `_reset` | Peut casser le site **et le courriel**. |
| `vps_firewall_*` (activate, delete, rules) | Peut couper l'accès SSH. |
| `vps_ssh-keys_remove-virtual-machine`, `set-root-password` | Peut verrouiller l'accès. |
| `*_purchase` | Débite la carte. Ne jamais lancer : renvoyer vers hPanel. |

Avant toute écriture DNS : `dns_records_list`, puis montrer à l'utilisateur la zone
avant/après, en conservant **tous** les enregistrements MX, SPF, DKIM, DMARC et TXT.
Un `dns_snapshots_list` donne un point de retour.

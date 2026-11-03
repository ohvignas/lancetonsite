# Relier le nom de domaine

## Où est géré le domaine ?

```bash
dig +short NS exemple.fr
```
- `*.dns-parking.com` → zone gérée par Hostinger → modifiable via le MCP.
- Autre chose (OVH, Gandi, Cloudflare, IONOS…) → l'utilisateur modifie chez eux ; donner
  les lignes exactes.

## Enregistrements à poser

| Nom | Type | Valeur | TTL |
|---|---|---|---|
| `@` | A | IP v4 du VPS | 3600 |
| `www` | A | IP v4 du VPS | 3600 |
| `@` / `www` | AAAA | IP v6 du VPS | 3600 — seulement si le VPS a une IPv6 et qu'on la veut |

Supprimer les anciens A, AAAA et CNAME de `@` et `www` qui pointeraient ailleurs
(un AAAA périmé fait échouer le certificat Let's Encrypt).

## Via le MCP Hostinger

1. `dns_snapshots_list` → noter l'instantané le plus récent (point de retour).
2. `dns_records_list` → afficher la zone actuelle à l'utilisateur.
3. Construire la nouvelle zone en **gardant** MX, SPF, DKIM, DMARC, TXT et tout
   enregistrement de service (`_dmarc`, `autodiscover`, `mail`…).
4. `dns_records_validate` avec la zone.
5. Montrer avant/après, obtenir le « oui », puis `dns_records_update`.

## Attendre la propagation

```bash
dig +short A exemple.fr @1.1.1.1
dig +short A www.exemple.fr @8.8.8.8
dig +short CAA exemple.fr          # vide, ou autorise letsencrypt.org
```
Ne lancer Caddy (certificat) qu'une fois l'IP du VPS renvoyée. Compter de quelques
minutes à 24 h.

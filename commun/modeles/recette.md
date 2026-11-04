# Modèle : recette (plan de tests et procès-verbal)

> Livrable : `projet-site/11-recette.md` · Étape 11, fin de la construction (`construire`
> § 4 et § 5) · Version courte : 6 min

## À quoi il sert

La recette vérifie que le site construit fait ce que le PRD promet, sur de vrais
appareils, avant la mise en ligne. Elle se termine par un **procès-verbal** : la décision
écrite (accepté, accepté avec réserves, refusé). En agence, c'est ce document qui
déclenche la facture finale et le début de la garantie ; chaque réserve doit pouvoir être
levée de façon vérifiable.

Lecteur : le patron, qui signe ; la personne qui corrige les anomalies.

## Sommaire type

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Objet | Version testée, adresse de test, date, références (PRD, maquette) | 4 lignes | Tableau |
| 2 | Participants | Qui teste, qui décide | 2 lignes | Liste |
| 3 | Environnements | Navigateurs et appareils testés (au moins : Chrome et Safari, un iPhone, un Android, un écran d'ordinateur) | 4 lignes | Tableau |
| 4 | Cas de test | Un cas par critère d'acceptation du PRD : étapes, résultat attendu, résultat obtenu, statut | 1 ligne par cas | Tableau numéroté (T1, T2…) relié aux E1, E2… |
| 5 | Contrôles transverses | Performance, accessibilité, SEO technique, formulaires, mentions légales, cookies, 404, redirections | 10 à 15 lignes | Liste à cocher avec mesure |
| 6 | Bilan | Cas prévus, exécutés, réussis, en échec ; écarts au plan | 4 lignes | Tableau chiffré |
| 7 | Anomalies | Description, page, appareil, gravité, capture, responsable, date de correction | 1 ligne par anomalie | Tableau |
| 8 | Réserves | Pour chacune : critère de levée, responsable, échéance | 1 ligne par réserve | Tableau |
| 9 | Décision | Accepté / accepté avec réserves / refusé ; date d'effet ; ce que ça déclenche | 3 lignes | Encadré |
| 10 | Signature | Nom, date, « bon pour mise en ligne » | 2 lignes | Texte |

### Détails qui comptent

- **Gravité** des anomalies, en trois niveaux :
  - **bloquante** : empêche l'action principale, perd des données ou pose un problème
    légal ; la mise en ligne attend ;
  - **majeure** : gêne nette mais contournable ; corrigée avant la fin de la garantie ;
  - **mineure** : défaut d'aspect ou de texte ; corrigée au fil de l'eau.
- **Contrôles transverses mesurés** : « Lighthouse performance mobile : 92 », pas
  « rapide ». Accessibilité : navigation au clavier de bout en bout, focus visible,
  textes alternatifs, contrastes.
- Le client-persona du plugin peut exécuter les cas en navigateur ; le PV reste
  `validé (simulé)` tant que le vrai patron n'a pas signé.

## Ce qui le rend « niveau agence »

1. Chaque critère d'acceptation du PRD a son cas de test, et le lien est écrit.
2. Les tests couvrent au moins un téléphone iOS, un Android et un ordinateur.
3. Chaque anomalie a une gravité, une capture et un responsable.
4. Chaque réserve a un critère de levée vérifiable et une date.
5. La décision est écrite avec sa date d'effet et ses conséquences.

## Version courte (par défaut)

Temps : 6 min, exécutée par agent dans le navigateur.

- **On garde** : objet, cas de test des exigences « indispensables », 8 contrôles
  transverses (Lighthouse mobile, clavier, formulaires, 404, title et meta, HTTPS,
  mentions légales, bannière cookies), anomalies, décision.
- **On reporte** : participants détaillés, environnements secondaires (tablettes,
  Firefox), bilan chiffré complet.

```markdown
# Recette — {Nom}
> mis à jour le JJ/MM/AAAA — statut : brouillon

| Version | Adresse de test | Date | PRD |
|---|---|---|---|

## Cas de test
| # | Exigence | Étapes | Attendu | Obtenu | Statut |
|---|---|---|---|---|---|

## Contrôles transverses
- [ ] Lighthouse mobile : performance __ · accessibilité __ · SEO __
- [ ] Parcours complet au clavier
- [ ] Formulaires : envoi, erreur, confirmation
- [ ] Page 404 · HTTPS · title et meta de chaque page
- [ ] Mentions légales · bannière cookies

## Anomalies
| # | Description | Page / appareil | Gravité | Responsable | Corrigé le |
|---|---|---|---|---|---|

## Décision
Accepté · accepté avec réserves · refusé — le JJ/MM/AAAA
```

## Comment le publier

Markdown en artifact Docs. Les captures des anomalies sont les vraies captures d'écran
du site, rangées dans `sources/` et liées depuis le tableau.

## Sources consultées

- DataALC, plan type du procès-verbal de recette en 7 rubriques :
  https://www.dataalc.com/boite-a-outils/templates/pv-de-recette/
- Blog Gestion de projet, PV de recette et modèle : https://blog-gestion-de-projet.com/pv-de-reception/
- Sequoiasoft, exemple de PV de recette (réception avec ou sans réserves) :
  https://www.sequoiasoft.com/wp-content/uploads/2022/03/PV-Recette.pdf

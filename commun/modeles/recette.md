# Modèle : recette (plan de tests et procès-verbal)

> Livrable : `projet-site/11-recette.md` · Étape 11, fin de la construction (`construire`
> § 4 et « Avant la porte »)

## À quoi il sert

La recette vérifie que le site construit fait ce que le PRD promet, sur les navigateurs et
appareils listés, avant la mise en ligne. Elle est exécutée par des agents dans le
navigateur. Elle se termine par un **procès-verbal** : la décision
écrite (accepté, accepté avec réserves, refusé). En agence, c'est ce document qui
déclenche la facture finale et le début de la garantie ; chaque réserve doit pouvoir être
levée de façon vérifiable.

Lecteur : le patron, qui signe ; la personne qui corrige les anomalies.

## Sommaire type

Toutes les sections se remplissent, et tous les critères d'acceptation ont leur cas.

| # | Section | Contenu exact | Longueur | Forme |
|---|---|---|---|---|
| 1 | Objet | Version testée, adresse de test, date, références (PRD, maquette) | 4 lignes | Tableau |
| 2 | Participants | Qui teste, qui décide | 2 lignes | Liste |
| 3 | Environnements | Navigateurs et appareils testés (au moins : Chrome, Safari, Firefox, un iPhone, un Android, une tablette, un écran d'ordinateur), chacun marqué « réel » ou « émulé » | 7 lignes | Tableau |
| 4 | Cas de test | Un cas par critère d'acceptation du PRD : étapes, résultat attendu, résultat obtenu, statut | 1 ligne par cas | Tableau numéroté (T1, T2…) relié aux E1, E2… |
| 5 | Contrôles transverses | Performance, accessibilité, SEO technique, formulaires, mentions légales, bandeau cookies (si traceurs non exemptés), 404, redirections (en refonte) | 10 à 15 lignes | Liste à cocher avec mesure |
| 6 | Bilan | Cas prévus, exécutés, réussis, en échec ; écarts au plan | 4 lignes | Tableau chiffré |
| 7 | Anomalies | Description, page, appareil, gravité, capture, responsable, date de correction | 1 ligne par anomalie | Tableau |
| 8 | Réserves | Pour chacune : critère de levée, responsable, échéance | 1 ligne par réserve | Tableau |
| 9 | Décision | Accepté / accepté avec réserves / refusé ; date d'effet ; ce que ça déclenche | 3 lignes | Encadré |
| 10 | Signature | Nom, date, « bon pour mise en ligne » | 2 lignes | Texte |

### Détails qui comptent

- **Gravité** des anomalies, en trois niveaux :
  - **bloquante** : empêche l'action principale, perd des données ou pose un problème
    légal ;
  - **majeure** : gêne nette mais contournable ;
  - **mineure** : défaut d'aspect ou de texte.
- **Toute anomalie se corrige avant la porte**, quelle que soit sa gravité. Reste en
  réserve ce que seul le client peut lever : une photo, une preuve, un accès.
- **Contrôles transverses mesurés** : la valeur lue dans l'outil (« Lighthouse performance
  mobile : NN »), pas « rapide ». Une valeur non mesurée s'écrit « non mesuré », avec
  la raison, jamais un chiffre. Accessibilité : navigation au clavier de bout en bout, focus visible,
  textes alternatifs, contrastes.
- Le client-persona du plugin peut exécuter les cas en navigateur ; le PV reste
  `validé (simulé)` tant que le vrai patron n'a pas signé.

## Ce qui le rend « niveau agence »

1. Chaque critère d'acceptation du PRD a son cas de test, et le lien est écrit.
2. Les tests couvrent au moins un téléphone iOS, un Android et un ordinateur, et disent
   ce qui est réel et ce qui est émulé.
3. Chaque anomalie a une gravité, une capture et un responsable.
4. Chaque réserve a un critère de levée vérifiable et une date.
5. La décision est écrite avec sa date d'effet et ses conséquences.

## Squelette du fichier

```markdown
# Recette — {Nom}
> mis à jour le JJ/MM/AAAA — statut : brouillon

## 1. Objet
| Version | Adresse de test | Date | PRD | Maquette |
|---|---|---|---|---|

## 2. Participants
- Testé par : … · décide : …

## 3. Environnements
| Navigateur ou appareil | Réel ou émulé | Résultat |
|---|---|---|

## 4. Cas de test
| # | Exigence | Étapes | Attendu | Obtenu | Statut |
|---|---|---|---|---|---|

## 5. Contrôles transverses
- [ ] Lighthouse mobile, par page : performance __ · accessibilité __ · bonnes pratiques __ · SEO __ · LCP __ · INP ou TBT __ · CLS __
- [ ] axe : __ défaut
- [ ] Parcours complet au clavier, focus visible
- [ ] Formulaires : envoi, erreur, confirmation
- [ ] Liens cassés, images sans alt, pages orphelines : __
- [ ] Title et meta de chaque page, `sitemap.xml`, `robots.txt`, JSON-LD
- [ ] Page 404
- [ ] Mentions légales, confidentialité
- [ ] Si traceurs non exemptés : bandeau cookies
- [ ] En refonte : redirections 301

## 6. Bilan
| Prévus | Exécutés | Réussis | En échec | Écarts au plan |
|---|---|---|---|---|

## 7. Anomalies
| # | Description | Page / appareil | Gravité | Capture | Responsable | Corrigé le |
|---|---|---|---|---|---|---|

## 8. Réserves
| Réserve | Critère de levée | Responsable | Échéance |
|---|---|---|---|

## Boucle persona
Notes de chaque tour, verdict, `FIX` restés au client.

## 9. Décision
Accepté · accepté avec réserves · refusé — le JJ/MM/AAAA — ce que ça déclenche : …

## 10. Signature
{Nom}, le JJ/MM/AAAA, « bon pour mise en ligne » : en attente de la porte de l'étape 11.
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

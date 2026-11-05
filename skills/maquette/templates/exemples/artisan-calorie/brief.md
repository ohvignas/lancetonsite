# Brief de l'exemple Calorie (tient lieu de 01-cadrage.md et 02-marque.md)

Exemple fictif du plugin Lance ton site. Budget IA : 0 € (aucune génération ; photos réutilisées des exemples Calade et Vigie, images à générer listées dans `medias-a-generer.md`). Le client-persona lit ce brief avant de tester la page.

## Le patron (cadrage)

- **Thomas Reynaud**, 45 ans, plombier-chauffagiste, a fondé **Calorie** en 2012 à Apt (Vaucluse) après dix ans en chaufferie à Cavaillon. Quatre salariés, aucun sous-traitant. Qualifié RGE QualiPAC, attestation de capacité fluides frigorigènes, garantie décennale.
- Ce qu'il vend, par ordre de chiffre d'affaires :
  1. la **pompe à chaleur air/eau** qui remplace une chaudière au fioul, au gaz ou au propane, en gardant les radiateurs ;
  2. le **chauffe-eau thermodynamique** 200 L, seul ou avec la PAC ;
  3. le **contrat d'entretien** annuel (180 €).
- Zone : 35 km autour d'Apt (Pays d'Apt, Luberon, plateau de Sault). Maisons en pierre, beaucoup de fioul, hivers frais (−7 °C les nuits de janvier).
- Prix posés (fictifs, TVA 5,5 % comprise) : PAC dès 11 900 € (13 400 € de 110 à 160 m², 15 200 € au-delà), ballon intégré +1 900 €, ballon thermodynamique seul 3 300 €.
- Aides (fictives, inspirées des barèmes publics MaPrimeRénov' et CEE « Coup de pouce », à revérifier chaque année) : PAC 5 000 / 4 000 / 3 000 / 0 € selon les revenus, plus 4 000 / 4 000 / 2 500 / 2 500 € si l'on quitte une énergie fossile ; ballon seul 1 200 / 800 / 400 / 0 € plus 150 €. Plafond : 90 / 75 / 60 / 40 % du prix.
- Concurrents : les réseaux nationaux qui démarchent par téléphone (« PAC à 1 € »), les grandes surfaces de bricolage qui sous-traitent la pose, les chauffagistes non RGE.
- Ce que le patron déteste : les sites d'installateurs avec un bonhomme 3D qui tient un billet, les promesses « divisez votre facture par 4 », les formulaires qui revendent les contacts.
- Ce qui le rendrait fier : qu'un retraité de Saignon comprenne en une minute comment l'air chauffe sa maison, voie son économie chiffrée, et demande la visite sans avoir l'impression d'être démarché.

## L'acheteur (persona principal)

- **Martine, 63 ans**, retraitée, mas en pierre de 120 m² à Saignon, chaudière fioul de 1994. Elle paie environ 2 300 € de fioul par an et a reçu trois appels de démarcheurs ce mois-ci. Elle regarde sur sa tablette, puis montre la page à son fils.
- Citations typiques : « Ça marche vraiment quand il gèle ? » « Je garde mes radiateurs en fonte ? » « Combien je paie vraiment, aides déduites ? » « Je ne veux pas d'un engin qui fait du bruit sous la fenêtre du voisin. »
- Objections, de la plus forte à la plus faible :
  1. **la confiance** (arnaques aux aides, démarchage) ;
  2. **le froid** (une PAC chauffe-t-elle en janvier ?) ;
  3. **le reste à charge** et le temps de retour ;
  4. **les travaux** (radiateurs, murs, durée) ;
  5. **le bruit**.
- Action principale attendue : **demander une visite technique gratuite**, avec la simulation jointe.

## La marque

- Voix : « nous » pour l'entreprise, « Thomas » nommé pour le rappel. Phrases courtes, chiffres concrets, mots du métier expliqués une fois (module, liaison, ballon). Jamais « éco-responsable », « solution innovante », « jusqu'à −75 % ».
- Couleurs : l'hiver dehors (givre, nuit bleu ardoise) et la chaleur dedans (braise, ambre) ; un seul rouge brique pour l'action.

## Composition : 7. Interface en démonstration (et pourquoi pas 5. Récit horizontal)

La question de l'acheteuse n'est pas « racontez-moi une histoire » mais « **combien, et est-ce que ça marche chez moi ?** ». La page se manipule donc, comme un outil : le hero est le relevé vivant d'une maison équipée (une donnée bouge déjà), la démonstration épinglée montre la machine à l'œuvre (la maison en coupe), puis le simulateur et le comparatif sur dix ans répondent avec ses propres réglages. Le récit horizontal aurait raconté un chantier en chapitres, joli mais sans réponse chiffrée, et son défilement de côté aurait gêné une lectrice de 63 ans sur tablette. La composition 7 est celle de « service numérique, simulateur » (`compositions.md`) ; on la passe devant parce que le simulateur **est** l'argument de vente.

## Sections attendues (10 à 13, 600 à 780 mots)

Hero (relevé vivant) · preuve (chiffres, zone, communes) · démonstration épinglée (maison en coupe) · offre (catalogue avec prix) · simulateur · comparatif sur dix ans · étapes · équipe · avis · chantiers datés · FAQ · demande de visite en deux colonnes · pied de page complet.

## Bandeau minuteur : non

L'élément `bandeau-minuteur` exige une échéance réelle. Les barèmes d'aides changent chaque année, mais aucune date de fin n'est connue et crédible pour un artisan local : un compte à rebours serait un faux sentiment d'urgence, exactement ce que fait le démarchage que le patron déteste.

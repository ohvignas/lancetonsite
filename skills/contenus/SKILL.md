---
name: contenus
description: 'Écrit tous les textes du site page par page, dans la voix de la marque et avec les mots réels des clients — titres, accroches, appels à l''action, FAQ, balises title et meta description, textes alternatifs, micro-textes (erreurs, confirmations), pages légales à compléter. Passe chaque texte au crible anti-« texte d''IA ». Étape 5 de Lance ton site.'
when_to_use: '"écrire les textes du site", "copywriting", "rédiger la page d''accueil", "accroche", "texte du bouton", "FAQ", "meta description", "réécrire mes textes", ou /lancetonsite:contenus.'
argument-hint: "[toutes | <nom de page>]"
---

# Contenus

**Équipe d'agents** : lancer ensemble, dès le début, tout ce que prévoit
`${CLAUDE_PLUGIN_ROOT}/commun/agents.md` pour cette étape (un agent Sonnet par source,
page ou pièce indépendante).

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md` et
`${CLAUDE_PLUGIN_ROOT}/commun/parcours.md` (rythme, document publié, porte de
validation, contrôle d'étape). Le guide éditorial d'abord, puis **toutes** les pages en parallèle,
pages secondaires comprises : un agent `redacteur-page` par page, tous lancés ensemble. L'accueil se publie
dès qu'il arrive. Document présenté : le modèle
`${CLAUDE_PLUGIN_ROOT}/commun/modeles/contenus.md`, en entier.

Méthode adaptée de `copywriting` et `copy-editing` (coreyhaines31/marketingskills, MIT).

## Entrées

- `01-cadrage.md` — **banque de citations**, objections, déclencheurs.
- `02-marque.md` — promesse, messages, voix, « on dit / on ne dit pas ».
- `04-architecture.md` — pages, zonings, mots-clés, questions IA.
- En refonte : textes actuels dans `sources/site-actuel/`.

## Diagnostic avant d'écrire

Pour chaque page :
- **A — page blanche ou texte creux** : construire l'argumentaire depuis le cadrage. Ne
  jamais inventer un fait, un chiffre, un avis.
- **B — une vraie voix existe déjà** (refonte) : la restaurer, garder son vocabulaire.
- **C — correction ponctuelle** : ne changer que la ligne visée.

## Le guide éditorial, d'abord

Avant de lancer les rédacteurs, écrire `05-contenus/guide.md`, d'après `02-marque.md` et le sommaire du
modèle : principes d'écriture, tableau ton / situation, vocabulaire oui / non, règles de forme, éléments web,
liste anti « texte d'IA ». Chaque `redacteur-page` reçoit ce guide dans son brief : toutes les pages partent
de lui.

## Une page complète, des blocs courts, dès maintenant

La page d'accueil complète (conventions § 11 : sections attendues, fourchette de mots,
3 phrases au plus par bloc, titres de 4 à 10 mots) s'applique **dès l'écriture**, pas
à la maquette. Écrire **toutes** les sections du zoning, catalogue ou articles compris
(noms de produits, prix, dates et titres d'articles réels ou notés `[À PROUVER]`). Une
phrase par idée, une idée par bloc. Ce qui ne tient pas en 3 phrases (FAQ complète,
caractéristiques, tarifs détaillés) s'écrit sur sa page dédiée, et l'accueil y renvoie
en un bloc court et un lien. Périmètre « accueil seul » : pas de page dédiée, tout reste sur l'accueil, en sections complètes
(`architecture`, Entrées). Compter les mots visibles d'`accueil.md` (titres, textes,
boutons, légendes, fiches ; pas les balises SEO ni les textes alternatifs), ajouter
menu et pied de page, et noter le total en tête du fichier (`mots_visibles`). Hors
fourchette : couper, ou compléter les sections qui manquent, avant de livrer.

## Écrire, bloc par bloc

Suivre le zoning de l'architecture. Rédiger la page entière ; les titres majeurs et la
promesse du hero passent par la méthode ci-dessous. L'utilisateur valide **les
contenus** en une fois, à la porte de validation ; par défaut, il choisit le titre au
moment de la maquette, en le voyant en place.
Structures de page utiles :
[references/structures-de-pages.en.md](references/structures-de-pages.en.md).

### Les titres et la promesse (la source unique)

Les titres font vendre la page : on ne garde jamais le premier venu.

1. **Les outils.** Charger ceux qui sont là : le skill `copywriting` et le skill
   `ogilvy` (outil `Skill`), et le MCP `ui-skills` (`get_skill`
   `elayadesign-landing-page-design` pour la copie de conversion, `list_skills`
   « copy » pour le reste). Aucun outil : suivre cette méthode seul, et le dire.
2. **5 pistes ou plus** pour la promesse du hero et pour chaque titre majeur (titres de
   section de l'accueil, titre de la page de l'action principale), d'angles
   différents : le résultat obtenu, le chiffre réel, la douleur levée, le geste du
   métier, la phrase d'un client (banque de citations), le contraste avec
   l'alternative.
3. **Garder la plus concrète et la plus désirable.** Concrète : le lecteur se la
   représente, on peut la vérifier. Désirable : l'acheteur du cadrage la veut, dans
   ses mots. Écrire en une ligne **la raison du choix**, et garder les pistes écartées
   dans le fichier de la page (rubrique « Pistes de titres »).
4. **3 variantes du titre de l'accueil** (moins de 10 mots chacune, angles différents),
   prises parmi les meilleures pistes, gardées pour un test A/B après la mise en
   ligne.

Le relecteur et le client simulé notent la force de chaque titre (agents
`relecteur`, point 11, et `client-persona`, point 3) : un titre sous 7 sur 10 se
reprend avec cette méthode.

**Le filtre en 3 questions** pour chaque phrase :
1. Le lecteur peut-il se le représenter ? (concret)
2. Peut-on le vérifier vrai ou faux ? (précis)
3. Un concurrent pourrait-il l'écrire tel quel ? (si oui, réécrire)

Règles :
- **Qui parle** : la personne fixée dans `02-marque.md` / `00-etat.md`, partout, corps
  des pages compris. Une personne seule dit « je » ; jamais son prénom à la troisième
  personne sur son propre site.
- Le titre principal reprend le résultat espéré **dans les mots du client**.
- Le bouton = verbe + ce qu'on obtient (« Réserver mon cours d'essai »), jamais
  « Envoyer », « En savoir plus », « Cliquez ici ».
- Chaque objection du cadrage est levée quelque part, près de l'action.
- Affirmation sans preuve → `[À PROUVER : quelle preuve débloquerait cette phrase]`.
  Ces marques restent dans les documents : la maquette et le site ne les affichent
  jamais (conventions § 4).
  Ne jamais écrire de faux avis, faux chiffre, faux logo client.
- **Avis cité, texte à reprendre « sans réécriture »** : un avis cité, ou tout texte que
  le client demande de reprendre tel quel, se reproduit mot pour mot, sans coupe, source
  notée. Les limites de longueur et les règles de style ne s'y appliquent pas.
- **« Aucun chiffre sans source »**, si `00-etat.md` porte cette consigne : tout chiffre
  non sourcé se retire du texte, il ne reste pas « à confirmer ».
- **Aucun avis encore** (activité neuve) : ne pas laisser un trou ni inventer. Écrire un
  **bloc de preuve sans avis**, marqué `[À PROUVER : remplacer par de vrais avis dès
  qu'il y en a]`, avec ce qui est vrai aujourd'hui :
  - le **journal d'atelier** : ce qui a été fait, daté (« mars : 12 premières
    commandes livrées », une étape de fabrication photographiée) ;
  - les **chiffres réels**, même petits (années de métier, délai tenu, matériaux) ;
  - les **engagements vérifiables** (garantie, retour, essai, devis gratuit) ;
  - une ligne honnête « les premiers avis arrivent » avec un lien vers la fiche Google
    ou le moyen d'en laisser un.
- Un ou deux moments forts par page, pas plus.
- Phrases courtes, un paragraphe = une idée, voix active.

## Le français

- Registre tu/vous fixé par la plateforme de marque, tenu partout.
- Typographie française : espace insécable avant `: ; ! ?` et dans « guillemets »,
  `€` après le nombre avec espace insécable (`25 €`), heures en `9 h 30`, nombres
  `1 500`. Apostrophe typographique ’.
- Écriture inclusive : appliquer le choix de la marque, de façon cohérente.

## SEO, sans écrire pour les robots

Par page, d'après l'architecture :
- **Title** 50-60 caractères, requête principale au début, nom de marque à la fin
  ([references/balises-title.en.md](references/balises-title.en.md)).
- **Meta description** 140-160 caractères, promesse + action.
- **Un seul H1**, hiérarchie H2/H3 sans saut.
- Requête principale dans les 100 premiers mots, naturellement.
- **Réponses autonomes** de 40 à 60 mots aux questions notées dans l'architecture,
  sous un titre formulé comme la question : c'est ce que citent les assistants IA
  ([references/seo-ia-structures.en.md](references/seo-ia-structures.en.md)). Elles
  vont sur la page FAQ ou la page du service ; la FAQ de l'accueil garde des réponses
  d'une ou deux phrases (conventions § 11), sauf en périmètre « accueil seul », où elle les porte.
- Textes alternatifs des images prévues (≤ 125 caractères).

## Micro-textes

Messages d'erreur de formulaire (dire quoi corriger, sans blâmer), confirmation
d'envoi, page 404, bandeau cookies, état vide, chargement. Dans la voix de la marque.

## Pages légales

Préparer les structures (mentions légales, confidentialité, cookies, CGV si vente) avec
les champs à remplir et la liste des informations à fournir. **Préciser que ces textes
doivent être vérifiés par l'utilisateur ou un professionnel du droit** ; ne jamais
inventer un numéro SIRET, une adresse ou un hébergeur.

## Les 7 passes du rédacteur

Chaque rédacteur les fait avant de rendre sa page ([references/checklist-relecture.en.md](references/checklist-relecture.en.md)) :
clarté → voix → « et alors ? » (relier chaque caractéristique à un bénéfice) → preuve →
précision → émotion → risque (rassurer près de l'action).

Puis la chasse aux tics d'IA
([references/tics-ia.en.md](references/tics-ia.en.md) et la liste de
`02-marque.md`) : « Ce n'est pas X, c'est Y », listes de trois adjectifs, questions
rhétoriques suivies de leur réponse, « Plongez », « Découvrez », « Libérez »,
« Bien plus qu'un simple », tirets cadratins en série, phrases-slogans en fin de
paragraphe.

**Les chiffres d'exemple, croisés avec le cadrage.** Numéros (« pièce n° 047 »),
dates, quantités, années, prix glissés dans un texte ou une légende : les confronter
aux chiffres de `01-cadrage.md` (années de métier, volume par an, prix). Un « n° 047 »
après 12 ans à 60 pièces par an, ou un « depuis 2019 » quand le cadrage dit 2012, se
voit du premier coup d'œil par le client. Corriger le chiffre selon le cadrage ; sans source, le retirer.

## Harmoniser

Au retour des rédacteurs, l'agent principal ouvre chaque fichier : même voix, même registre, mêmes prix, dates
et chiffres d'une page à l'autre, aucune promesse qui se contredit. Il corrige avant le panel.

## Le panel de relecture : de vrais agents, sur chaque page

Chaque page et `_micro-textes.md` passent devant **3 agents neufs**, lancés ensemble dans un même message.
L'agent qui a écrit ou harmonisé ne se note jamais lui-même.

| Regard | Agent | Ce qu'il juge |
|---|---|---|
| Le persona principal | `client-persona`, mode `document` | Ça sonne vrai ? Son objection a-t-elle sa réponse ? Agirait-il ? |
| Un rédacteur conversion | `relecteur` | Titres, boutons, preuve près de l'action, bénéfices |
| La voix de la marque | `relecteur`, avec `02-marque.md` et `guide.md` | Registre, vocabulaire, « on dit / on ne dit pas » |

Le brief de chacun donne la page, le fichier source à comparer et la consigne « note de 1 à 10, puis chaque
correction, ligne par ligne ». Corriger, puis relancer 3 agents neufs sur chaque page sous le seuil : **7 au
moins pour chacun et 8 de moyenne**, 3 tours au plus. Sous le seuil au troisième tour : noter la note et ce qui
bloque dans le fichier, et le dire à la porte. Un avis cité reste mot pour mot, même si un regard veut le couper.
L'agent principal reporte les notes à la ligne « Score panel » du fichier. Sans outil `Agent` (Claude sur le
web) : suivre `${CLAUDE_PLUGIN_ROOT}/commun/agents.md`, et le dire à la porte.

**Second avis d'un autre modèle** : si le MCP `openrouter` est connecté et que le budget IA n'est pas à 0, envoyer
aussi chaque page à un autre modèle (`send-message`). C'est payant mais de l'ordre du centime : le coût est pris
sur le **budget IA unique** (conventions, « Le budget de génération »), annoncé en une phrase, sans accord à part ;
ajouter le coût réel à la ligne « Budget IA » de `00-etat.md`.

## Les fichiers

Dans `projet-site/05-contenus/` :
- `guide.md`, le guide éditorial ;
- un fichier par page de l'architecture, nommé comme l'URL (`accueil.md`, `cours-debutant.md`), avec
  [templates/page.md](templates/page.md) ;
- `_micro-textes.md` et `_legal.md`, écrits chacun par son propre `redacteur-page`, lancé avec les autres.

## Avant la porte

Cocher d'après les fichiers, pas de mémoire. Un manque se fait maintenant.

- [ ] `guide.md` : les 6 sections du modèle, dont le tableau ton / situation et le vocabulaire oui / non.
- [ ] Un fichier pour **chaque** page de `04-architecture.md`, pages secondaires comprises. Aucune page sans son fichier.
- [ ] Chaque page : un bloc pour chaque bloc du zoning, dans l'ordre ; un seul H1 ; title de 50 à 60 caractères et
  meta description de 140 à 160, comptés ; requête principale dans les 100 premiers mots ; chaque bouton en verbe
  + ce qu'on obtient ; un texte alternatif par image prévue (125 caractères au plus) ; sources notées.
- [ ] `accueil.md` : `mots_visibles` noté, de 500 à 800, ou écart justifié dans `00-etat.md` (« Écart de densité », accueil seul par exemple) ; 10 à 13 sections ; 3 phrases au plus par bloc ; titres de
  4 à 10 mots ; une FAQ de 3 à 5 questions (conventions § 11).
- [ ] Titres : 5 pistes ou plus pour la promesse du hero et chaque titre majeur, raison du choix écrite, pistes écartées
  gardées ; 3 variantes du titre de l'accueil.
- [ ] Chaque question notée dans l'architecture a sa réponse autonome de 40 à 60 mots, sous un titre en forme de question (accueil seul : dans la FAQ de l'accueil).
- [ ] Chaque objection du cadrage est levée quelque part, près de l'action.
- [ ] `_micro-textes.md` : erreurs de formulaire, confirmation d'envoi, page 404, bandeau cookies, état vide, chargement.
- [ ] `_legal.md` : mentions légales, confidentialité, cookies, CGV si vente ; champs à remplir listés ; rappel de faire
  vérifier ; aucun SIRET, aucune adresse, aucun hébergeur inventés.
- [ ] Panel : « Score panel » rempli par page et dans `_micro-textes.md`, venu des 3 agents ; 7 au moins pour chacun et
  8 de moyenne, sinon la note et ce qui bloque.
- [ ] Recherche dans tous les fichiers : aucun tic de la liste, aucun chiffre contraire au cadrage, aucun faux avis ;
  avis cités mot pour mot, source notée ; consigne « aucun chiffre sans source » tenue si elle existe.

Puis le contrôle d'étape : `${CLAUDE_PLUGIN_ROOT}/commun/boucle-persona.md`, « Le contrôle d'étape ».

Ensuite, publier le document des contenus (`parcours.md` § 3 : toutes les pages, l'accueil en
premier, titres et boutons bien visibles), puis **porte de validation** (`parcours.md`
§ 4), en bloc pour toutes les pages : jamais les médias sans un oui. `00-etat.md` et tableau de bord à jour.
Prochaine étape : `/lancetonsite:medias`.

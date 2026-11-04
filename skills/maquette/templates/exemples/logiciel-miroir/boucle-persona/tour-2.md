# Miroir : boucle persona, tour 2

- **Date** : 4 novembre 2026
- **Page testée** : http://127.0.0.1:4356/logiciel-miroir/index.html (prototype animé, médias provisoires). J'ai lancé mon propre serveur (`python3 -m http.server 4356`) et l'ai arrêté à la fin.
- **Regard indépendant** : je n'ai pas lu les rapports du relecteur. Avant de tester, j'ai lu `brief.md`, mon `tour-1.md` (plan FIX-1 à FIX-15), `NOTES.md` § 10, `conventions.md` § 11 et les retours de l'utilisateur du 4 novembre.
- **Navigateur** : Chrome piloté par Playwright. Ordinateur 1440 × 900 et 1280 × 800, tablette 768 × 1024, téléphones 375 × 812 et 360 × 740 (tactile, écran ×2). J'ai aussi testé au clavier et avec `prefers-reduced-motion: reduce`.
- **Captures** : `boucle-persona/tour-2-captures/` (102 fichiers webp). Les chemins ci-dessous partent de ce dossier.
- **Dépense** : 0 $. Rien n'a été envoyé : les deux formulaires n'envoient rien et l'URL ne change pas.

Ce fichier contient le rapport de test (§ A), les 10 points, la grille et le verdict (§ B), puis le plan des corrections qui restent (§ C).

---

## A. Rapport de test

### Qui je suis

**Le patron.** Je suis Lucie Ferrand, onze ans de salon à la Croix-Rousse, cofondatrice de Miroir. J'attends de cette page qu'une gérante voie en une minute que c'est fait par quelqu'un du métier, que c'est moins cher que ce qu'elle perd, et qu'elle essaie le soir même. Je ne laisse passer aucune erreur de salon.

**L'acheteuse.** Sandrine a un salon de 4 personnes à Villeurbanne et elle est **sur Planity**. Son objection : « Planity ne me prend pas de commission. Qu'est-ce que je gagne à changer ? »

### 0. Les FIX du tour 1, un par un

| FIX | Verdict | Ce que j'ai vérifié |
|---|---|---|
| 1. Agenda du hero vrai dans le temps | **Corrigé** | J'ai relevé l'agenda seconde par seconde (`01` à `05-1440-hero-*`). L'horloge part de 9 h 00. Emma annule à 9 h 01, Julie accepte à 9 h 08 (« prévenue par SMS à 9 h 02 » : les 6 minutes sont vraies). Ensuite, 5 réservations arrivent entre 9 h 12 et 9 h 28, toutes pour l'après-midi et sur des créneaux libres (13 h, 13 h, 17 h, 17 h 20, 18 h 15). Les toasts ne se chevauchent pas. Le remplissage passe de 53 à 47, puis 53, puis 65 %, ce qui est cohérent. C'est la même histoire que dans la démo. |
| 2. Date | **Corrigé** | « jeudi 5 novembre », et sur le téléphone « mer. 4 · jeu. 5 · ven. 6 ». Le 5 novembre 2026 est bien un jeudi. |
| 3. Gérante déjà sur une plateforme sans commission | **Corrigé** | Le comparatif dit « 0 % sur certaines, jusqu'à 35 % sur d'autres » et ajoute la ligne « Votre fichier clientes : à vous, exportable / chez la plateforme ». La FAQ répond à la question. Le calculateur a une case « J'ai déjà des rappels SMS ». Pour le cas de Sandrine, il affiche 405 € sans la case et 205 € avec (`43-1440-calc-sandrine.webp`). Elle a enfin sa réponse, et elle est honnête. |
| 4. `id="equipe"` en double | **Corrigé** | La liste a `taille-equipe`. Un clic sur l'étiquette donne le focus à la liste. Je n'ai trouvé aucun `id` en double ni aucun `label` sans contrôle, aux 5 tailles. |
| 5. Forfaits fidèles au hero | **Corrigé** | Solo affiche « Acompte et liste d'attente ». Salon et Institut commencent par « Tout Solo » et « Tout Salon ». « SMS en plus : 0,07 € » apparaît (la formulation est à affiner, voir FIX-20). |
| 6. Photo du salon et photo de Camille | **Corrigé, avec une réserve** | Camille est une vraie coloriste : bol et pinceau, cliente en papillotes, bac derrière. C'est juste. Sur la photo du salon, la brosse et le séchoir sont enfin chacun dans une main. Il reste un reflet incohérent et un cordon qui sort de la brosse (FIX-18). |
| 7. Calculateur au téléphone | **Corrigé** | À 375, le montant reste collé en haut pendant que je règle le dernier curseur, et la barre « Essayer 30 jours » se cache (`51-375-calc-curseur-bas.webp`). |
| 8. Pied de page et journal | **Corrigé** | On y trouve l'adresse, Instagram et l'inscription au journal : avec un champ vide, l'erreur s'affiche ; avec une adresse valide, « C'est noté : premier numéro début décembre. » (`49-1440-pied-lettre.webp`). Le lien « Tous les articles → » est là. |
| 9. Textes | **Corrigé** | « En ligne dès demain » est cohérent avec l'étape « Demain ». « 30 jours » ne se coupe plus, à aucune taille. |
| 10. Bilan du lundi | **Corrigé** | Le chiffre d'affaires est de 1 640, 1 920 et 1 150 € par semaine. « Mardi matin encore à moitié vide » et « 1 absence, contre 3 par semaine en septembre » sont cohérents avec −68 %. |
| 11. Colonne gauche de l'essai | **Corrigé** | La carte de Lucie, avec son portrait rond, remplit la colonne (`46-1440-essai.webp`). |
| 12. Finitions | **Corrigé** | Le tiroir mobile prend toute la hauteur (`50-375-menu.webp`). La ligne « maintenant » passe sous les rendez-vous. Le pied de page tient à 768. |
| 13. Image de l'article « Acompte » | **Corrigé** | La nouvelle image montre une cliente qui réserve le soir sur son téléphone, ce qui colle au sujet. L'écran est flou (FIX-21). |
| 14. Lien « Connexion » | **Corrigé** | Il est dans la barre dès 1024 px et dans le tiroir. |
| 15. Ce que seul le client peut fournir | Reste du ressort du client | Voir FIX-22. |

**Bilan : les 14 FIX à 0 $ et en génération sont faits.** Seule la vérification jour ↔ date et `id` uniques dans `verif.js` n'est pas faite. Elle se trouve hors du dossier et concerne le plugin, pas cette page.

### 1. Les 5 premières secondes

**Ordinateur, 1440 et 1280** (`01-1440-hero-1s.webp`, `02-1440-hero-5s.webp`, `06-1280-hero.webp`, `30-1440-hero.webp`, `30-1280-hero.webp`)
- On comprend tout de suite ce qu'on vend : « Réservation en ligne · salons et instituts ».
- La promesse, « Votre agenda se remplit pendant que vous coupez. », est une vraie phrase de salon.
- Le prix est à côté du bouton : « 0 % de commission · dès 29 € par mois ».
- L'action, « Essayer 30 jours », est en corail et se voit.
- À droite, l'agenda du jeudi 5 novembre s'anime à 9 h. Au bout de 3 secondes, Emma annule. À la 10ᵉ seconde, Julie reprend le créneau.

Le hero est équilibré, sans trou au milieu. **Cette fois, le moment vivant est juste du début à la fin** : je le montrerais à une coiffeuse sans rougir.

**Téléphone, 375 et 360** (`30-375-hero.webp`, `30-360-hero.webp`) : le titre tient en 3 lignes à 37,6 px, sans coupure. Le bouton et le prix sont dans l'écran, et le haut de l'agenda dépasse en bas.

**Ce qui ne va pas au téléphone** (`32-375-hero-9s.webp`, `32-375-agenda-centre.webp`) : l'horloge démarre dès que 12 % de l'agenda est à l'écran. Si on ne fait pas défiler, elle est déjà à **9 h 07 au bout de 9 secondes**. Quand la gérante descend jusqu'à l'agenda, l'annulation et sa reprise sont déjà jouées : elle voit Julie en vert, mais ni le toast « Emma annule » ni celui de la reprise. Au téléphone, l'histoire signature se joue hors champ. Or, c'est au téléphone, entre deux clientes, que la gérante lira cette page (FIX-16).

### 2. Le défilement complet

**Défilement lent à 1440** (`10-1440-defile-01` à `12`), puis **démo épinglée** (`20-1440-demo-02` à `98`) :
- **Preuve** : la nouvelle photo du salon s'affiche en pleine largeur, suivie de 1 240, −68 % et 0 €, avec la mention « Chiffres et photo provisoires ».
- **Démo** : on passe par 1/3, 2/3 puis 3/3. À l'étape 2, l'écran passe de 09:02 à 09:08 vers 47 % de la progression (« Accepté ✓ », « Créneau repris en 6 minutes · 95 € sauvés »). C'est toujours le meilleur moment de la page.
- **Comparatif** : quatre lignes honnêtes, dont « Oui, c'est leur force ».
- **En ligne dès demain** : trois cartes, chacune avec sa mini-interface.
- **Témoignages** : trois portraits en hauteur, avec une citation et un résultat chacun. Camille est maintenant une coloriste crédible.
- **Équipe** : Lucie et Karim au comptoir.
- **Tarifs** : trois cartes et le calculateur.
- **Journal** : trois cartes datées et « Tous les articles ».
- **FAQ, essai et pied de page** : rien à redire.

**Défilement rapide** (`15-1440-rapide-a` à `c`, `15-1440-rapide-remonte`, `16-1440-rapide-k06` à `k12`) : rien ne saute, l'en-tête se cache en descendant et revient en remontant. En revanche, si on défile très vite, les apparitions en cascade (`data-reveal-group`) ont du retard. Pendant moins d'une seconde, l'écran est presque vide : le comparatif est invisible et une seule carte de « Demain » est à moitié transparente (`16-1440-rapide-k06.webp`). Tout se remet en place en moins d'une seconde (`15-1440-rapide-c.webp`). C'est léger (FIX-23).

**Tablette 768** (`30-768-hero.webp`, `31-768-*`) : correct. La démo est épinglée, les témoignages tiennent en 3 colonnes étroites mais lisibles, et le pied de page passe en 2 colonnes.

**Téléphones 375 et 360** (`31-375-*`, `31-360-*`) :
- la démo s'empile ;
- le comparatif devient des fiches ;
- les forfaits sont en colonne ;
- le calculateur garde son montant collé en haut ;
- la barre d'action disparaît sur le calculateur, l'essai et le pied de page ;
- le débordement horizontal est nul.

### 3. Le parcours de l'acheteuse (Sandrine, sur Planity)

1. **Barre de navigation** (`40-1440-clic-*.webp`) :
   - Tarifs, Avis et Questions arrivent au titre, à 80 px du haut, et le lien actif suit ;
   - Démo arrive au début de l'épinglage ;
   - après le saut, l'en-tête se cache et un léger mouvement vers le haut le fait revenir. C'est normal.
2. **Créneaux du téléphone** (`41-1440-creneau-12h45.webp`) : je clique sur « 12 h 45 » et la confirmation devient « Jeudi 12 h 45 avec Sarah ». 10 h 15 et 17 h sont « complet » et désactivés. Ils sont cohérents avec l'agenda du hero (Hugo et Zoé chez Lina).
3. **Comparatif** : Sandrine lit « 0 % sur certaines » (c'est son cas), « Vous et les salons voisins » et « Votre fichier clientes : chez la plateforme ». Elle comprend ce qu'elle gagne : ses habituées et son fichier.
4. **Calculateur** (`42`, `43`, `44-1440-calc-*.webp`) :
   - réglages par défaut : **710 €**, forfait Salon ;
   - son cas (4 personnes, 3 absences par semaine, 45 €, 0 cliente à commission) : 405 €, puis **205 €** avec la case « J'ai déjà des rappels SMS » (hypothèse de 35 %), pour 59 € par mois. C'est crédible, et ça ne lui raconte pas d'histoire ;
   - équipe de 1 : Solo à 29 €. De 6 : Salon. De 7 ou 8 : Institut à 99 €. La carte entourée suit. Les flèches du clavier font bouger le montant (1 045 €) ;
   - **mais l'addition est fausse à l'écran** : par défaut, « Absences évitées 662 € » plus « Commission évitée 50 € » font 712 €, alors que le montant affiche **710 €**. Pour Sandrine, 406 € donnent 405 €, puis 203 € donnent 205 €. Le total est arrondi à 5 €, les lignes ne le sont pas. Une gérante qui fait sa caisse tous les soirs le voit (FIX-17).
5. **Tarifs** : Solo à 29 € contient bien l'acompte et la liste d'attente promis dans le hero.
6. **FAQ** (`45-1440-faq.webp`) : l'accordéon referme la question précédente. « Puis-je garder ma place de marché ? Oui, pour vous faire connaître. Vos habituées passent par votre lien, sans voir le salon d'en face. » C'est exactement la phrase qu'il fallait.
7. **Formulaire d'essai** (`47-1440-form-erreurs.webp`, `48-1440-form-confirmation.webp`) :
   - envoyé vide : 4 messages clairs, et le focus va sur « Prénom et nom » ;
   - avec « sandrine@salon-test » : le message d'e-mail invalide s'affiche ;
   - avec une adresse valide : « C'est parti, Sandrine. Votre accès arrive à sandrine@salon-test.fr ; une ancienne coiffeuse vous écrit demain pour importer le fichier de Salon Sandrine. » Le ton est juste.
8. **Inscription au journal** : une erreur, puis la confirmation. Rien n'est envoyé.
9. **Menu au téléphone** (`50-375-menu.webp`) : le tiroir prend toute la hauteur, le focus va sur « Démo », Échap rend le focus au bouton, et « Tarifs » mène au titre.

### 4. Le clavier (50 tabulations)

Je suis parti du hero, j'ai bouclé par le pied de page et je suis revenu en haut (`60-tab-*.webp`). Ordre des arrêts :
- Essayer 30 jours ;
- les 4 créneaux libres (les complets sont sautés) ;
- les 4 curseurs et la case « rappels » ;
- Essayer 30 jours ;
- les 3 articles, puis « Tous les articles » ;
- les 5 questions ;
- les 5 champs et « Démarrer mon essai » ;
- le logo, le champ et le bouton du journal, puis les 6 liens et les 2 liens légaux du pied de page ;
- évitement, logo, les 4 liens, Connexion, Essai gratuit.

**Tous les arrêts sont à l'écran, opaques, non couverts, avec un contour net** : corail de 3 px, corail de 2 px sur les champs, encre de 2 px sur les créneaux. Le seul arrêt « sans contour » est `body`, quand le focus revient au document en fin de boucle, ce qui est normal. Sans faute.

### 5. Mouvement réduit

Captures : `70-1440-reduit-hero.webp`, `70-375-reduit-hero.webp`, `71-1440-reduit-page.webp`, `71-375-reduit-page.webp`.
- L'agenda est figé à 9 h 08 : Julie à la place d'Emma, les 5 réservations en ligne posées, 65 %, 46 et 1.
- La démo est dépliée en trois colonnes, et en une seule au téléphone.
- **Aucun élément visible n'a une opacité nulle**, et la console est vide.

La page est complète.

### 6. L'œil du métier

- **Agenda** : cette fois, tout est juste :
  - les prestations et leurs durées (balayage 2 h, couleur 1 h, coupe homme 45 min, barbe 30 min) ;
  - la fermeture à 19 h ;
  - aucun chevauchement ;
  - la reprise par la liste d'attente.

  Un seul détail : « Frange avec Sarah, **17 h 20** ». Les agendas de salon se règlent par pas de 15 minutes, et 17 h 15 serait plus naturel (FIX-19).
- **Photo du salon** (`10-1440-defile-02.webp`, image `salon-2400.webp`) : la brosse ronde est dans la main gauche, le séchoir dans la main droite, la buse vers la longueur. Le geste est juste, c'est un vrai progrès. Deux choses se voient encore à l'œil du métier :
  - dans le miroir de droite, la coiffeuse tient le séchoir à deux mains, à hauteur de taille, sans brosse, alors qu'en vrai elle l'a levé à hauteur de tête ;
  - le cordon noir semble sortir du manche de la brosse, pas du séchoir.

  C'est léger, mais c'est la première photo de la page (FIX-18).
- **Camille** : bol, pinceau, papillotes, bac. Juste, et chaleureux.
- **Sami, barbier** : juste.
- **Inès, institut** : elle porte toujours un masque et on ne voit pas son visage. Pour un témoignage signé, ça reste faible. À traiter avec les vrais témoignages (FIX-22).
- **Journal** :
  - l'image de l'acompte (réservation le soir) colle au sujet, mais l'écran du téléphone est flou et rosé. Pour un éditeur de logiciel, montrer l'écran « Acompte 20 € · Salon Lumière » serait mieux (FIX-21) ;
  - l'épilation à la lumière pour « Ouvrir un institut » est générique, mais acceptable.
- **Chiffres** : 64 % en ligne dans le bilan, 58 % en moyenne dans la FAQ et 61 % chez Camille, c'est cohérent. 35 % de commission chez Inès, c'est le haut de la fourchette du comparatif. « 0,07 € » par SMS se comprend, mais « SMS en plus » est ambigu (FIX-20).
- **Calculateur** : l'addition ne tombe pas juste (voir le point 3.4 et FIX-17).

### 7. Densité (script de `conventions.md` § 11, `compte-pane.js`, 1440 × 900)

| Mesure | Animé | Réduit | Fourchette |
|---|---|---|---|
| Mots | **787** | **788** | 500–800 |
| Sections dans `main` | 11 | 11 | 10–13 |
| Écrans | 12,2 | 10,2 | 12–18 |

Détail (animé) :

| Bloc | Mots |
|---|---|
| évitement | 3 |
| en-tête | 8 |
| hero | 44 |
| preuve | 26 |
| démo | 97 |
| comparatif | 94 |
| démarrer | 49 |
| avis | 79 |
| équipe | 41 |
| tarifs | 120 |
| journal | 45 |
| questions | 95 |
| essai | 47 |
| pied | 39 |

- Aucun bloc ne dépasse 3 phrases. Toutes les sections attendues sont là, et le pied de page est maintenant complet.
- La page est **à 13 mots du plafond** : toute correction qui ajoute du texte doit en retirer ailleurs.

### 8. Console et ressources

- **Console** : vide, sans erreur ni avertissement, aux 5 tailles, en animé comme en réduit.
- **Requêtes** : aucune n'a échoué, aucune réponse 4xx ou 5xx.
- **Contrôles aux 5 tailles** :
  - aucun débordement horizontal, aucun titre qui déborde ;
  - aucun texte sous 12 px (hors pseudo-élément : l'étiquette d'heure de la ligne « maintenant » fait 11 px, mais elle est décorative et `aria-hidden`) ;
  - interlettrage `normal` sur tous les `h1` et `h2`.

---

## B. Les 10 points, la grille, le verdict

### Les 10 points à contrôler

| # | Point | Verdict | Capture | Pourquoi |
|---|---|---|---|---|
| 1 | Page complète | OK | `71-1440-reduit-page.webp` | 11 sections, 787 mots, 3 phrases au plus par bloc, toutes les sections attendues. Le pied de page a maintenant l'adresse, Instagram et l'inscription. |
| 2 | Catalogue, articles | OK | `10-1440-defile-09.webp` | 3 cartes datées construites depuis `ARTICLES` (slug, rubrique, date, image, alt), plus « Tous les articles ». |
| 3 | Titres et promesse | OK | `02-1440-hero-5s.webp` | « Votre agenda se remplit pendant que vous coupez. », « Le trou se rebouche seul », « Un prix fixe. Zéro commission. », « En ligne dès demain » : la page ne se contredit plus. |
| 4 | Typographie d'affichage | OK | `30-1440-hero.webp`, `30-360-hero.webp` | Interlettrage 0 et aucune lettre collée. « 30 jours » est insécable. |
| 5 | Barre de navigation | OK | `02-1440-hero-5s.webp`, `50-375-menu.webp` | Logo, 4 liens, Connexion, un bouton, aucun numéro de téléphone. Le tiroir prend toute la hauteur. |
| 6 | Blocs d'action, formulaires | OK | `46-1440-essai.webp` | Deux colonnes : titre, réassurances et carte de Lucie à gauche, formulaire 2 × 2 à droite. Les étiquettes sont justes. |
| 7 | Hero équilibré | OK | `30-1440-hero.webp`, `30-1280-hero.webp` | Le texte, l'agenda vivant et l'action se répondent. |
| 8 | Responsive | OK | `30-*-hero.webp`, `31-375-*`, `31-360-*`, `31-768-*` | Aucun débordement, aucun titre cassé aux 5 tailles. Réserve : au téléphone, le récit du hero se joue hors champ (FIX-16). |
| 9 | Images et vidéos | OK, avec réserves | `10-1440-defile-02.webp`, `10-1440-defile-07.webp` | Des photos dans presque toutes les sections, et Camille est juste. Restent : le reflet du salon, Inès masquée, l'écran flou de l'article sur l'acompte (FIX-18, 21, 22). |
| 10 | 3D produit | Sans objet | — | Il n'y a pas d'objet 3D. |

### La grille sur 100

| Critère | Points | Tour 1 | **Tour 2** | Pourquoi |
|---|---|---|---|---|
| Direction artistique | 15 | 13 | **13** | Crème, encre, corail, vert bouteille, Fraunces souple : c'est un salon, pas une start-up. Les tarifs et le formulaire restent des gabarits SaaS plus communs. |
| Images | 15 | 11 | **12** | Camille est juste, le geste du brushing aussi, et l'image de l'acompte colle au sujet. On atteint le plafond provisoire, moins le reflet du salon et Inès masquée. |
| Mise en page | 15 | 13 | **14** | La composition « interface en démonstration » est tenue de bout en bout, la colonne de l'essai est remplie, les contrastes d'échelle sont bons. |
| Mouvement | 10 | 8 | **9** | Le récit du hero est juste à la minute près et colle à la démo. La démo épinglée est excellente, le mouvement réduit exemplaire. Je retire un point pour deux défauts : au téléphone, l'histoire se joue hors champ, et les cascades ont du retard quand on défile très vite. |
| Clarté en 5 secondes, action | 10 | 9 | **10** | Quoi, pour qui, prix et action sont dans le premier écran, à toutes les tailles, et l'agenda ne sème plus le doute. |
| Densité | 5 | 5 | **5** | 787 mots, 11 sections, 12,2 écrans, comptage fourni. |
| Preuves et objections | 10 | 6 | **8** | Les six objections sont traitées, dont celle de la gérante sur Planity (comparatif, FAQ, case « rappels »). Les chiffres sont marqués provisoires. On atteint le plafond provisoire. Reste l'addition du calculateur, qui ne tombe pas juste (712 → 710). |
| Textes | 10 | 8 | **9** | Plus aucune contradiction, une voix de coiffeuse, des confirmations très justes. « SMS en plus : 0,07 € » est ambigu. |
| Mobile, accessibilité, légèreté | 10 | 8 | **9** | Aucun débordement, 45 arrêts clavier par boucle, tous visibles, console vide, calculateur utilisable au téléphone, tiroir propre, `id` uniques. Je retire un point parce qu'au téléphone, le moment signature du hero se joue avant d'être vu. |
| **Total** | **100** | **81** | **89** | |

- **Note sur 10** : 8,9.
- **Seuil qui s'applique** : **85** (maquette aux médias provisoires). **Il est atteint.**
- **Atteignable sans le vrai client** : environ **91**, avec FIX-16 et FIX-17 (0 $, +1 en Mouvement et en Mobile) et FIX-18 (environ 0,06 $, +1 en Images, sans dépasser le plafond provisoire de 13).
- **Ce qui bloque un 90 solide au site construit** (client) : de vraies photos de salons clients et les vrais visages de Lucie et Karim, de vrais chiffres (salons, absences, part en ligne, délai de reprise), des témoignages signés (dont une coloriste et une gérante venue d'une plateforme sans commission), les tarifs des plateformes revérifiés, le vrai prix du SMS et le vrai délai de mise en ligne.

**Ma phrase de client** : « Cette fois, mon agenda dit la vérité : Emma annule à 9 h 01, Julie reprend à 9 h 08, et Sandrine, qui est sur Planity, a enfin sa réponse : ses habituées et son fichier restent chez elle. Corrigez-moi l'addition du calculateur et faites jouer l'histoire au téléphone quand on la regarde, et je la montre à toutes mes anciennes collègues. »

Verdict : Oui, ça vaut mes 25 000 €. Au seuil de la maquette (85), à 89/100, les 14 corrections du tour 1 sont faites et le moment signature est juste. Les FIX qui restent sont moyens ou légers.

---

## C. Plan des corrections restantes

Lignes de `index.html` sauf mention contraire. La page est à 787 mots sur 800 : tout ajout doit remplacer des mots existants.

| FIX | Gravité | Coût | Résumé |
|---|---|---|---|
| FIX-16 | moyen | **0 $** | Au téléphone, l'horloge du hero ne doit partir que quand l'agenda est réellement visible |
| FIX-17 | moyen | **0 $** | Calculateur : le détail doit s'additionner au total affiché (662 + 50 ≠ 710) |
| FIX-18 | léger | **génération**, environ 0,06 $ (ou 0 $ par recadrage) | Photo du salon : reflet incohérent et cordon qui sort de la brosse |
| FIX-19 | léger | **0 $** | Lou à 17 h 20 → 17 h 15 (pas de 15 minutes) ; l'étiquette d'heure cache « 9 h » |
| FIX-20 | léger | **0 $** | « SMS en plus : 0,07 € » → « SMS au-delà du forfait : 0,07 € » |
| FIX-21 | léger | **génération**, environ 0,06 $ | Article sur l'acompte : écran du téléphone lisible, avec l'interface Miroir |
| FIX-22 | — | **client** | Vraies photos, vrais chiffres, témoignages signés (Inès à visage découvert), tarifs revérifiés, prix du SMS, délai de mise en ligne |
| FIX-23 | léger | **0 $** | Les cascades d'apparition ont du retard quand on défile très vite |

### FIX-16 : l'histoire du hero se joue hors champ au téléphone (moyen, 0 $)

**Quoi.** L'horloge tourne dès que l'agenda touche l'écran, parce que l'`IntersectionObserver` n'a pas de seuil. À 375, seuls 12 % de l'agenda sont visibles au chargement, et l'horloge est déjà à 9 h 07 au bout de 9 secondes (`32-375-hero-9s.webp`). Quand la gérante arrive sur l'agenda, l'annulation et la reprise sont passées, sans leurs toasts (`32-375-agenda-centre.webp`).

**Où.** `index.html` l. 575 (`new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(agenda)`) et l. 577–590 (départ après 1,5 s).

**Comment.**
- Observer `.hero-ecran` avec `{ threshold: 0.55 }` et poser `visible = e.intersectionRatio >= 0.55`. Ainsi, sur ordinateur, rien ne change (l'agenda est entièrement visible) et, au téléphone, l'horloge attend que la gérante fasse défiler.
- Variante : au premier passage à « visible », relancer à `t = 0` si l'horloge n'a pas dépassé 9 h 08.
- Vérifier ensuite à 375 et 360 : faire défiler jusqu'à l'agenda au bout de 6 s, puis voir le toast « 9 h 01 · Emma annule » à l'écran.

### FIX-17 : l'addition du calculateur (moyen, 0 $)

**Quoi.** Le total est arrondi à 5 €, mais les lignes du détail sont arrondies à l'euro. Par défaut, 662 € + 50 € font 712 €, alors que le montant affiche « 710 € » (`42-1440-calc-defaut.webp`). Pour Sandrine, 203 € + 0 € donnent « 205 € » (`43-1440-calc-sandrine.webp`). Une gérante refait l'addition.

**Où.** l. 653–658.

**Comment.** Arrondir chaque ligne à 5 €, puis additionner :

```js
const h5 = Math.round(honores / 5) * 5, c5 = Math.round(commission / 5) * 5, total = h5 + c5;
$("s-honores").textContent = fr(h5) + " €"; $("s-commission").textContent = fr(c5) + " €";
```

Retirer `data-odometer="755"` (l. 335) au profit de la valeur calculée (660 + 50 = 710).

### FIX-18 : la photo du salon (léger, environ 0,06 $ en génération, ou 0 $)

**Quoi.** Dans le miroir de droite, la coiffeuse tient le séchoir à deux mains à hauteur de taille, sans brosse, alors qu'elle le lève à hauteur de tête. Le cordon noir sort du manche de la brosse, pas du séchoir (image `images/salon-2400.webp`, zone x 1000–2400, y 0–1000).

**Où.** `images/salon-*` ; balise l. 101.

**Comment.**
- À 0 $ : recadrer `salon-*` sur les deux tiers gauches (coiffeuse, cliente, plante, comptoir) pour sortir le miroir du cadre. Le format panoramique de la bande s'y prête. Puis réécrire l'`alt` si besoin.
- En génération : relancer avec la même direction photo, en précisant que le reflet doit montrer la même posture et que le cordon doit partir du séchoir.

### FIX-19 : deux détails de l'agenda (léger, 0 $)

- **Lou à 17 h 20** : dans `NOUVELLES` (l. 529), remplacer `[1, 500, 30, "Lou", "Frange"]` par `[1, 495, 30, …]`, ce qui donne 17 h 15. Cela reste libre : Louis finit à 16 h 45 et Rose commence à 18 h.
- **Étiquette d'heure** : au départ, l'étiquette « 9:00 » de la ligne « maintenant » recouvre le repère « 9 h » de la colonne des heures, dont on voit dépasser le haut du « 9 » (`32-375-agenda-centre.webp`). Dans `miroir.src.css` l. 106, masquer le repère de 9 h tant que la ligne est dessus, ou décaler l'étiquette (l. 116, `left: -2.7rem`). Passer aussi `font-size: .6875rem` à `.75rem` (12 px).

### FIX-20 : le prix du SMS (léger, 0 $)

**Où.** l. 308 : « Sans engagement. SMS en plus : 0,07 €. »

**Comment.** Écrire « Sans engagement. SMS au-delà du forfait : 0,07 €. » Cela fait 2 mots de plus (787 → 789, dans la fourchette). Le prix reste à fixer par le client.

### FIX-21 : l'écran de l'article sur l'acompte (léger, environ 0,06 $)

**Où.** `ARTICLES[0]`, l. 459, images `journal-1-*`.

**Comment.** Régénérer avec un écran lisible : « Salon Lumière · Acompte 20 € · Payer ». Sinon, à 0 $, superposer en HTML une mini-interface sur l'écran flou. C'est plus fragile, je ne le recommande pas.

### FIX-22 : ce que seul le vrai client peut fournir (client)

- Photos de vrais salons clients, et les vrais visages de Lucie et Karim.
- Une photo d'Inès à visage découvert, ou un autre institut, avec son accord.
- Vrais chiffres : nombre de salons, baisse des absences, part de réservations en ligne, délai moyen de reprise par la liste d'attente.
- Trois témoignages signés avec accord écrit, dont **une coloriste** et **une gérante venue d'une place de marché sans commission** : c'est la preuve qui fera signer Sandrine.
- Tarifs des plateformes revérifiés à la date de publication. Prix du SMS au-delà du forfait. Délai réel de mise en ligne (« dès demain »). Hypothèse de 35 % d'absences évitées avec des rappels déjà en place.
- Mentions légales et politique de confidentialité (aujourd'hui `href="#hero"`, l. 435).

### FIX-23 : retard des cascades quand on défile vite (léger, 0 $)

**Quoi.** Quand on défile très vite, l'écran est presque vide pendant moins d'une seconde, avant que les cascades `data-reveal-group` ne rattrapent (`16-1440-rapide-k06.webp`, `16-1440-rapide-k08.webp`).

**Où.** `gestes.js` l. 323 (le kit est partagé : la correction profite à tous les exemples).

**Comment.** Dans le `scrollTrigger` de la cascade, ajouter `onEnter: (self) => Math.abs(self.getVelocity()) > 2500 && self.animation.progress(1)`, ou ramener `stagger` à 0,06 et la durée à 0,5 s. Ensuite, refaire la série de défilement rapide.

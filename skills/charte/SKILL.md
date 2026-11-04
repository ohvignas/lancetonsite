---
name: charte
description: 'Crée la charte graphique — direction artistique, logo (création via IA et vectorisation, ou mise au propre de l''existant), palette justifiée et vérifiée en contraste, typographies libres de droits, direction photo, règles d''usage et interdits. Valable pour tous les supports, pas seulement le site. Étape 3 de Lance ton site.'
when_to_use: '"charte graphique", "identité visuelle", "logo", "couleurs de ma marque", "typographie", "direction artistique", "moodboard", ou /lancetonsite:charte.'
argument-hint: "[complete | logo | couleurs | typos | photo]"
---

# Charte graphique

Lire `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`.

La charte définit l'identité **sur tous les supports** (site, réseaux, print, vitrine). Le
design system (étape 6) en sera la traduction technique pour le site.

## Entrées

- `01-cadrage.md` — cible, concurrence, ce que la marque n'est pas.
- `02-marque.md` — positionnement, traits de voix, curseurs.
- `sources/identite/` si une identité existe.

Identité existante : faire l'**audit** (ce qui marche, ce qui manque, contrastes,
lisibilité, cohérence) et proposer : garder tel quel / moderniser / refaire. Ne pas tout
jeter par défaut.

## 1. Les références de l'utilisateur

Demander, un type à la fois :
1. 1 à 3 marques ou sites qu'il aime (même hors secteur) — et ce qui lui plaît dedans.
2. 3 à 5 images d'éléments qu'il aime (une typo, une couleur, une affiche, une photo).
3. 1 marque qu'il déteste.

Pour chaque site donné : Firecrawl `firecrawl_scrape` formats `branding` + `screenshot`
(pleine page) → vraies couleurs, polices, proportions. Ranger dans
`sources/references/`. **Décrire ce qui est vu, pas ce qui est supposé.** L'utilisateur
n'a pas de lien : ne pas en inventer, passer à la suite.

Puis l'analyse de références de `${CLAUDE_PLUGIN_ROOT}/commun/niveau-agence.md` § 1 :
4 à 5 concurrents (du cadrage) et 4 à 6 sites de référence en design, repérés sur
Awwwards, Godly ou Siteinspire, de préférence dans le secteur. Livrer
`03-charte/references.md` (tableau des gestes retenus) et une planche de captures :
c'est le niveau visé pour tout le site.

## 2. Trois directions

Croiser références + traits de marque + cible. Avant toute génération d'image :
générateur selon « Quel générateur » (conventions : fal d'abord, OpenRouter ensuite),
coût pris sur le **budget IA unique** fixé au démarrage (conventions, « Le budget de
génération ») : annoncer le lot et ce qui restera, sans redemander d'accord s'il tient
dans le budget. Budget à 0 ou aucun générateur : moodboards avec des images libres de
banques (Unsplash, Pexels — voir `medias`, « Générer, par défaut ») et les références ;
jamais un moodboard sans images.

**Mode rapide** : une seule planche, celle de la direction recommandée, avec 3 images ;
les deux autres directions tiennent en une ligne chacune (nom, phrase, risque).

Proposer **3 directions maximum**,
réellement différentes. Pour chacune :
- un nom évocateur et une phrase simple ;
- pourquoi elle sert le positionnement (citer `02-marque.md`) ;
- son risque ;
- un **moodboard** : planche HTML avec palette, paire de typos, 3 images d'ambiance
  générées (fal ou OpenRouter, bloc de style commun — voir l'étape médias) ou décrites, un titre et
  un bouton dans le style.

Recommander une direction. L'utilisateur choisit ou mélange ; si le mélange est
incohérent, l'expliquer et proposer un compromis.

## 3. Couleurs

Méthode : [references/couleurs.md](references/couleurs.md).
- 1 couleur principale, 1 secondaire, 1 accent au plus, + neutres (fond, texte, bordure).
- Chaque couleur tirée de la matière du métier, du lieu ou du positionnement — jamais
  d'une tendance. Une phrase de justification par couleur.
- **Vérifier les contrastes** avec [scripts/contraste.py](scripts/contraste.py) : texte
  courant ≥ 4,5:1, grands titres ≥ 3:1. Corriger une teinte qui échoue.
- Fournir HEX, RVB, et une approximation CMJN pour le print (signaler qu'un épreuvage
  est nécessaire).

## 4. Typographies

- 2 familles maximum : une de titre avec du caractère, une de texte très lisible.
- Licence libre pour usage commercial (Google Fonts, Fontshare, Velvetyne) — donner le
  lien exact et les graisses utilisées.
- Polices à éviter : la liste unique de `${CLAUDE_PLUGIN_ROOT}/commun/conventions.md`,
  § 10. Une exception doit être justifiée.
- Vérifier les accents français et les chiffres (prix, horaires).
- Catalogue de paires : `${CLAUDE_PLUGIN_ROOT}/skills/design-system/data/typography.csv`
  — écarter les lignes qui contiennent une police de cette liste.

## 5. Logo

Selon le cas :
- **Logo existant** : récupérer le meilleur fichier, le vectoriser si besoin
  (`fal-ai/recraft/vectorize`), produire les déclinaisons.
- **Logo existant mais pas encore reçu** : ne pas bloquer l'étape. Redessiner un logo
  **provisoire** (typographique, dans les polices et couleurs de la charte, d'après une
  photo ou la description de l'utilisateur), le nommer `logo-provisoire.svg`, le noter
  dans `00-etat.md` (« Fichiers à recevoir ») et dans la charte. Il est remplacé dès
  réception, avant la validation de la maquette ; à l'étape 11, un logo encore
  provisoire est signalé avant la mise en ligne.
- **Création** : brief (nom, promesse, 3 traits, contraintes) → coût annoncé et
  accepté → 3 pistes de concept
  (typographique, symbole, combiné) → générations sur fond blanc (MCP fal :
  `fal-ai/recraft/v4.1/text-to-vector` pour du vectoriel, ou un modèle image puis
  `recraft/vectorize`) → l'utilisateur choisit → nettoyage. Sans fal : générer via
  OpenRouter en PNG haute définition sur fond blanc uni, puis vectoriser (fal plus tard,
  ou Inkscape « Vectoriser un objet matriciel ») ; le dire à l'utilisateur.
- Toujours livrer : version principale, version monochrome (noir et blanc), version
  réduite (favicon 32 px lisible), SVG + PNG. Ranger dans `03-charte/logo/`.
- Règles : zone de protection, taille minimale, fonds autorisés, interdits (déformer,
  recolorer, ombrer).
- Prévenir : un logo généré par IA doit être retravaillé et vérifié (ressemblance avec
  une marque existante) avant dépôt INPI.

## 6. Direction photo

Fiche de shooting : voir `${CLAUDE_PLUGIN_ROOT}/skills/medias/references/fiche-shooting.md`. La remplir ici, elle
servira à l'étape 7.

## 7. Le document

Rédiger `projet-site/03-charte/charte.md` avec [templates/charte.md](templates/charte.md),
et générer `03-charte/planche.html` : une page visuelle (palette, typos en situation,
logo et déclinaisons, exemples photo, interdits). Relecture `relecteur` en lui demandant
aussi : « est-ce que ça ressemble à un concurrent ? est-ce que ça fait générique ? ».
Validation, `00-etat.md`. Prochaine étape : `/lancetonsite:architecture`.

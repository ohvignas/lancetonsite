# Theatre.js — caler des keyframes à l'œil, rejouer sans l'éditeur

- **Ce que c'est** : une bibliothèque d'animation avec un **éditeur visuel** (timeline, courbes, poignées) qui s'ouvre par-dessus la page en développement. On anime n'importe quelle valeur JavaScript (position d'un objet Three.js, opacité d'un titre, variable CSS), on exporte l'état en **JSON**, et le site final rejoue ce JSON avec le seul moteur, sans l'éditeur.
- **Dépôt** : https://github.com/theatre-js/theatre · doc : https://www.theatrejs.com/docs/latest
- **Version** : `@theatre/core` **0.7.2**, `@theatre/studio` 0.7.2, `@theatre/browser-bundles` 0.7.2 (npm, 5 novembre 2026). Le README annonce une 1.0 développée temporairement dans un dépôt privé ; licence promise inchangée.
- **Poids mesuré** (jsDelivr, gzip -9) : `core-only.min.js` 99 376 o → **33 614 o gzip** ; `core-and-studio.js` 2 663 314 o → 465 404 o gzip (jamais en production).

## Licence (fichier `LICENSE` du dépôt, lu le 5 novembre 2026)

Licence double, par dossier :
- **`@theatre/core` et la plupart des paquets : Apache 2.0.** C'est le seul code qui part sur le site. Garder la mention de copyright et la licence (un commentaire d'en-tête avec le lien suffit pour un fichier CDN non modifié).
- **`@theatre/studio` : AGPL 3.0.** L'éditeur. Il ne sert qu'en conception, en local ; le README précise que le bundle final n'inclut que le core, donc seule l'Apache 2.0 s'applique au site. **Règle pour nous** : le studio ne doit jamais être chargé par une page publiée (ni via `core-and-studio.js`).

## Quand s'en servir dans le plugin

- Une **séquence d'intro** ou une scène 3D où le « bon » timing ne se trouve qu'à l'œil : arrivée d'un objet, mouvement de caméra, enchaînement titre → visuel. Coder 15 keyframes à la main en GSAP prend des allers-retours ; ici on les cale en direct.
- Une animation **pilotée au défilement** avec beaucoup de valeurs liées (caméra + lumière + matériau) : on cale la timeline, on mappe la progression de scroll sur `sequence.position`.
- Quand l'utilisateur veut **régler lui-même** une animation pendant la maquette (étape 8) : on lui ouvre la page avec le studio, il ajuste, on récupère le JSON.

## Quand ne pas s'en servir

- Animations d'interface simples (apparition au scroll, survol, accordéon) → CSS ou GSAP du kit : 0 à 25 Ko, pas de JSON à maintenir.
- Si personne ne va réellement ouvrir l'éditeur : l'intérêt de Theatre.js est l'édition visuelle ; sans elle, GSAP timeline fait pareil, plus connu.
- Projet qui dépend d'une version future : l'API 0.7 est stable mais le projet est en transition vers la 1.0 (format d'état à revérifier à ce moment).

## Recette : caler, exporter, rejouer

### 1. Caler (en local, avec le studio)

```html
<script src="https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.7.2/dist/core-and-studio.js"></script>
<script>
  // conception seulement : ce fichier embarque l'éditeur (AGPL)
  const { core, studio } = Theatre;
  studio.initialize();
  const projet = core.getProject("Hero Atelier");
  const feuille = projet.sheet("Intro");
  const titre = feuille.object("Titre", {
    y: core.types.number(40, { range: [-200, 200] }),
    opacite: core.types.number(0, { range: [0, 1] }),
  });
  const el = document.querySelector("h1");
  titre.onValuesChange(({ y, opacite }) => {
    el.style.transform = `translateY(${y}px)`;
    el.style.opacity = opacite;
  });
</script>
```

Dans le panneau : sélectionner « Titre », clic droit sur une valeur → séquencer, poser les keyframes, ajuster les courbes. L'état vit dans le `localStorage` du navigateur pendant qu'on travaille.

### 2. Exporter

Dans le panneau de gauche, cliquer sur le **nom du projet** → bouton « Export … to JSON » dans le panneau de détails. On obtient un fichier du type `Hero Atelier.theatre-project-state.json`. Le ranger à côté de la page (`js/intro.etat.json`), le renommer sans espace.

### 3. Rejouer sans l'éditeur (production)

```html
<script src="https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.7.2/dist/core-only.min.js"></script>
<script type="module">
  /* Theatre.js core 0.7.2 — Apache-2.0 — https://github.com/theatre-js/theatre */
  const { core } = Theatre;
  const etat = await fetch("js/intro.etat.json").then((r) => r.json());
  const projet = core.getProject("Hero Atelier", { state: etat }); // même nom qu'à la conception
  const feuille = projet.sheet("Intro");
  const titre = feuille.object("Titre", {
    y: core.types.number(40, { range: [-200, 200] }),
    opacite: core.types.number(0, { range: [0, 1] }),
  });
  const el = document.querySelector("h1");
  const appliquer = ({ y, opacite }) => { el.style.transform = `translateY(${y}px)`; el.style.opacity = opacite; };
  titre.onValuesChange(appliquer);

  await projet.ready;
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduit) {
    // état final, sans mouvement
    feuille.sequence.position = core.val(feuille.sequence.pointer.length);
  } else {
    feuille.sequence.play({ iterationCount: 1 });
  }
</script>
```

Variante **au défilement** : ne pas appeler `play()`, mais à chaque `scroll` (ou via un `ScrollTrigger`) : `feuille.sequence.position = progression * longueur`.

Pièges :
- Les noms (`getProject`, `sheet`, `object`, et les clés des props) doivent être **identiques** entre conception et production, sinon l'état est ignoré en silence.
- Les valeurs par défaut des props restent dans le code : le JSON ne stocke que ce qui a été modifié ou séquencé.
- Prévoir le **repli** : sans JS, l'élément doit être visible dans sa position finale (ne pas mettre `opacity: 0` en CSS).
- Avec Three.js : le paquet `@theatre/r3f` est pour React Three Fiber ; en Three.js pur, on fait comme ci-dessus (`onValuesChange` → `mesh.position.set(...)`) et on rend dans la boucle existante.

# Les tokens dans Tailwind CSS v4

Tailwind v4 se configure en CSS : pas de `tailwind.config.js`. Les tokens du design
system deviennent des variables du bloc `@theme`, et chaque variable crée ses classes
(`--color-argile` → `bg-argile`, `text-argile`, `border-argile`…).

## Le fichier `06-design-system/tailwind.css`

Il part de `tokens.css` (généré par `generate-tokens.cjs`) et expose **les tokens
sémantiques** sous les noms que Tailwind attend. Les primitifs restent dans `:root`, on
ne les utilise pas directement dans les pages.

```css
@import "tailwindcss";
@import "./tokens.css";            /* :root { --primitive-…, --color-…, … } */

@theme {
  /* On efface la palette par défaut : seules les couleurs de la charte existent. */
  --color-*: initial;
  --color-fond: var(--color-bg);
  --color-encre: var(--color-text);
  --color-action: var(--color-action);
  --color-action-survol: var(--color-action-hover);

  --font-titre: "Nom de la police titre", serif;
  --font-texte: "Nom de la police texte", sans-serif;

  /* Échelle typo fluide (clamp) reprise des tokens */
  --text-affiche: var(--font-size-display);
  --text-titre: var(--font-size-h1);

  --spacing: 0.25rem;               /* base 4 px : p-4 = 1 rem */
  --radius-carte: var(--radius-md);

  --ease-entree: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-sortie: cubic-bezier(0.64, 0, 0.78, 0);
  --animate-defilant: defilant 40s linear infinite;

  @keyframes defilant {
    to { transform: translateX(-50%); }
  }
}
```

Règles :
- **Une variable `@theme` par token utilisé**, nommée en mots de la marque si c'est
  plus clair (`argile`, `ardoise`) : les classes se lisent alors comme la charte.
- `--color-*: initial;` coupe la palette par défaut : impossible d'utiliser un
  `bg-blue-500` par mégarde.
- Les valeurs restent dans `tokens.css` : `@theme` ne fait que les exposer. Une couleur
  change → `tokens.json`, on régénère, rien d'autre à toucher.
- Mouvement réduit : la variante `motion-reduce:` de Tailwind (`motion-reduce:animate-none`)
  et, côté GSAP, `gsap.matchMedia()`.

## Dans la maquette et `demo.html` (sans installation)

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.X.Y"></script>
<style type="text/tailwindcss">
  @theme { /* copier ici le contenu du bloc @theme, avec les valeurs en clair */ }
</style>
```

Remplacer `4.X.Y` par une version exacte publiée (vérifier sur npm). Le script compile
les classes dans le navigateur : parfait pour une maquette, jamais pour le site en ligne.

## Dans le site (étape 11)

- **Astro** : `npx astro add tailwind` (installe `@tailwindcss/vite`), puis copier
  `tailwind.css` dans `src/styles/global.css` et l'importer dans le gabarit principal.
- **Next.js** : `@tailwindcss/postcss`, même fichier importé dans `app/globals.css`.
- **HTML pur** : `npx @tailwindcss/cli -i tailwind.css -o site/styles.css --minify`.

Contrôle : `validate-tokens.cjs` repère les valeurs en dur ; en classes Tailwind,
chercher aussi les valeurs arbitraires (`bg-[#…]`, `p-[13px]`) qui contournent le
design system.

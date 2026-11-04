#!/usr/bin/env node
/**
 * Generate CSS variables from design tokens JSON
 * (Repris de nextlevelbuilder/ui-ux-pro-max-skill, MIT — voir NOTICE.md ; modifié pour Lance ton site : erreurs explicites sur références introuvables)
 *
 * Usage:
 *   node generate-tokens.cjs --config tokens.json -o tokens.css
 *   node generate-tokens.cjs --config tokens.json --format tailwind -o tailwind.css   (bloc @theme v4)
 */

const fs = require('fs');
const path = require('path');

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    config: null,
    output: null,
    format: 'css' // css | tailwind
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--config' || args[i] === '-c') {
      options.config = args[++i];
    } else if (args[i] === '--output' || args[i] === '-o') {
      options.output = args[++i];
    } else if (args[i] === '--format' || args[i] === '-f') {
      options.format = args[++i];
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: node generate-tokens.cjs [options]

Options:
  -c, --config <file>   Input JSON token file (required)
  -o, --output <file>   Output file (default: stdout)
  -f, --format <type>   Output format: css | tailwind (bloc @theme Tailwind v4) (default: css)
  -h, --help            Show this help
      `);
      process.exit(0);
    }
  }

  return options;
}

/**
 * Resolve token references like {primitive.color.blue.600}
 */
function resolveReference(value, tokens) {
  if (typeof value !== 'string' || !value.startsWith('{')) {
    return value;
  }

  const path = value.slice(1, -1).split('.');
  let result = tokens;

  for (const key of path) {
    result = result?.[key];
  }

  if (result?.$value !== undefined) {
    return resolveReference(result.$value, tokens);
  }

  // Lance ton site : une référence introuvable ou un objet produirait du CSS invalide
  if (result === undefined || result === null) {
    throw new Error(`Référence de token introuvable : ${value}`);
  }
  if (typeof result === 'object') {
    throw new Error(`La référence ${value} pointe vers un groupe, pas vers une valeur`);
  }
  return result;
}

/**
 * Convert token name to CSS variable name
 */
function toCssVarName(path) {
  return '--' + path.join('-').replace(/\./g, '-');
}

/**
 * Flatten tokens into CSS variables
 */
function flattenTokens(obj, tokens, prefix = [], result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...prefix, key];

    if (value && typeof value === 'object') {
      if (value.$value !== undefined) {
        // This is a token
        const cssVar = toCssVarName(currentPath);
        const resolvedValue = resolveReference(value.$value, tokens);
        if (resolvedValue !== null && typeof resolvedValue === 'object') {
          throw new Error(`${cssVar} : valeur composite non prise en charge, la découper en tokens simples`);
        }
        result[cssVar] = resolvedValue;
      } else {
        // Recurse into nested object
        flattenTokens(value, tokens, currentPath, result);
      }
    }
  }

  return result;
}

/**
 * Generate CSS output
 */
function generateCSS(tokens) {
  const primitive = flattenTokens(tokens.primitive || {}, tokens, ['primitive']);
  const semantic = flattenTokens(tokens.semantic || {}, tokens, []);
  const component = flattenTokens(tokens.component || {}, tokens, []);
  const darkSemantic = flattenTokens(tokens.dark?.semantic || {}, tokens, []);

  let css = `/* Design Tokens - Auto-generated */
/* Do not edit directly - modify tokens.json instead */

/* === PRIMITIVES === */
:root {
${Object.entries(primitive).map(([k, v]) => `  ${k}: ${v};`).join('\n')}
}

/* === SEMANTIC === */
:root {
${Object.entries(semantic).map(([k, v]) => `  ${k}: ${v};`).join('\n')}
}

/* === COMPONENTS === */
:root {
${Object.entries(component).map(([k, v]) => `  ${k}: ${v};`).join('\n')}
}
`;

  if (Object.keys(darkSemantic).length > 0) {
    css += `
/* === DARK MODE === */
.dark {
${Object.entries(darkSemantic).map(([k, v]) => `  ${k}: ${v};`).join('\n')}
}
`;
  }

  return css;
}

/**
 * Generate Tailwind CSS v4 @theme block (Lance ton site : remplace l'ancienne sortie
 * tailwind.config.ts de Tailwind v3)
 */
function generateTailwind(tokens) {
  const semantic = flattenTokens(tokens.semantic || {}, tokens, []);
  const lignes = Object.entries(semantic).map(([k, v]) => `  ${k}: ${v};`);
  const aCouleurs = Object.keys(semantic).some((k) => k.startsWith('--color-'));
  const darkSemantic = flattenTokens(tokens.dark?.semantic || {}, tokens, []);

  let css = `/* 06-design-system/tailwind.css — Tailwind CSS v4, généré par generate-tokens.cjs.
   Ne pas modifier à la main : changer tokens.json et régénérer.
   Valeurs en clair : ce bloc se colle tel quel dans la maquette
   (<style type="text/tailwindcss">) ; sur le site, le précéder de la ligne d'import de
   Tailwind (references/tailwind-integration.md). Pas de mot-clé d'import dans ce
   commentaire : le compilateur du navigateur le lirait.
   Chaque variable crée ses classes : --color-fond → bg-fond, text-fond, border-fond…
   Polices, échelle typo, rayons, courbes : vérifier qu'ils sont dans tokens.json
   (sémantiques nommés --font-*, --text-*, --radius-*, --ease-*), sinon les y ajouter. */
@theme {
${aCouleurs ? '  --color-*: initial;   /* seule la palette de la charte existe */\n' : ''}${lignes.join('\n')}
}
`;
  if (Object.keys(darkSemantic).length > 0) {
    css += `
/* Mode sombre : mêmes noms, autres valeurs */
.dark {
${Object.entries(darkSemantic).map(([k, v]) => `  ${k}: ${v};`).join('\n')}
}
`;
  }
  return css;
}

/**
 * Main
 */
function main() {
  const options = parseArgs();

  if (!options.config) {
    console.error('Error: --config is required');
    process.exit(1);
  }

  // Resolve config path
  const configPath = path.resolve(process.cwd(), options.config);

  if (!fs.existsSync(configPath)) {
    console.error(`Error: Config file not found: ${configPath}`);
    process.exit(1);
  }

  // Read and parse tokens
  const tokens = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  // Generate output
  let output;
  if (options.format === 'tailwind') {
    output = generateTailwind(tokens);
  } else {
    output = generateCSS(tokens);
  }

  // Write output
  if (options.output) {
    const outputPath = path.resolve(process.cwd(), options.output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, output);
    console.log(`Generated: ${outputPath}`);
  } else {
    console.log(output);
  }
}

main();

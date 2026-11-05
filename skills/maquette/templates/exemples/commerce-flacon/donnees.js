/*
 * Ciste — la source unique des données (exemple fictif : parfums, prix, séances et articles inventés).
 * Lu par la page (catalogue, panier, atelier, journal) ET par la scène 3D (couleur du liquide, étiquette).
 * Prêt à brancher sur un CMS : remplacer cet objet par la réponse de l'API, la page ne change pas.
 */
window.CISTE = {
  parfums: [
    { id: "restanque", nom: "Restanque", famille: "Boisé aromatique",
      accord: "Le figuier au soleil sur un mur de pierre sèche.",
      notes: { tete: "bergamote, feuille de figuier", coeur: "ciste, immortelle", fond: "cèdre, ambrette" },
      liquide: "#a9a23f", prix: { 50: 124, 100: 176 } },
    { id: "mistral", nom: "Mistral", famille: "Hespéridé",
      accord: "Néroli et citron de Menton, l'air lavé par le vent.",
      notes: { tete: "citron de Menton, petit-grain", coeur: "néroli, romarin", fond: "vétiver, musc blanc" },
      liquide: "#e6c34a", prix: { 50: 124, 100: 176 } },
    { id: "centifolia", nom: "Centifolia", famille: "Floral",
      accord: "La rose de mai de Grasse, poivrée, sans poudre.",
      notes: { tete: "poivre rose, litchi", coeur: "rose centifolia, géranium", fond: "patchouli, musc" },
      liquide: "#d9707f", prix: { 50: 138, 100: 196 } },
    { id: "nuitee", nom: "Nuitée", famille: "Floral ambré",
      accord: "Tubéreuse et jasmin cueillis à l'aube, portés le soir.",
      notes: { tete: "mandarine, cardamome", coeur: "tubéreuse, jasmin", fond: "benjoin, vanille" },
      liquide: "#d27a2c", prix: { 50: 132, 100: 186 } },
    { id: "garrigue", nom: "Garrigue", famille: "Ambré résineux",
      accord: "Le labdanum du ciste, l'encens et le thym chaud.",
      notes: { tete: "genièvre, thym", coeur: "lavande, immortelle", fond: "ciste labdanum, encens" },
      liquide: "#7e3f12", prix: { 50: 132, 100: 186 } },
  ],
  coffret: { id: "coffret", nom: "Coffret découverte", detail: "5 échantillons de 2\u00a0ml", prix: 22 },
  atelier: { prix: 95, duree: "2 h 30", places: 6 },
  // Séances à venir (à brancher sur l'agenda de réservation). « reste » = places libres.
  seances: [
    { id: "s1", jour: "Samedi 14 novembre", heure: "10 h", reste: 2 },
    { id: "s2", jour: "Samedi 14 novembre", heure: "15 h", reste: 0 },
    { id: "s3", jour: "Samedi 21 novembre", heure: "10 h", reste: 5 },
    { id: "s4", jour: "Samedi 21 novembre", heure: "15 h", reste: 4 },
    { id: "s5", jour: "Samedi 28 novembre", heure: "15 h", reste: 6 },
  ],
  // Matières achetées en direct (bande défilante de #preuves)
  matieres: [
    { id: "rose", nom: "Rose centifolia", lieu: "Grasse", couleur: "#9c4322", fond: "#eedfd4" },
    { id: "jasmin", nom: "Jasmin", lieu: "Grasse", couleur: "#c27a2a", fond: "#efe5d3" },
    { id: "neroli", nom: "Néroli", lieu: "Vallauris", couleur: "#ecd98c", fond: "#e6ead8" },
    { id: "ciste", nom: "Ciste labdanum", lieu: "Estérel", couleur: "#7a3d12", fond: "#e9ddd3" },
    { id: "iris", nom: "Iris", lieu: "Toscane", couleur: "#e2d5b4", fond: "#e2e1dc" },
    { id: "vetiver", nom: "Vétiver", lieu: "Haïti", couleur: "#7c6a2a", fond: "#e4e3d4" },
    { id: "benjoin", nom: "Benjoin", lieu: "Laos", couleur: "#b8641f", fond: "#ede0d2" },
    { id: "figuier", nom: "Feuille de figuier", lieu: "Provence", couleur: "#55602c", fond: "#e1e5d6" },
  ],
  articles: [
    { date: "2026-05-12", titre: "Cueillir la rose de mai avant dix heures", sujet: "Récolte", lecture: 4,
      image: "images/fiole-rose.webp", alt: "Fiole d'absolue de rose centifolia, orangée" },
    { date: "2026-09-03", titre: "Pourquoi votre parfum change sur la peau", sujet: "Conseil", lecture: 3,
      image: "images/eclate-garrigue-960.webp", alt: "Le flacon Garrigue séparé en trois godets de verre, du brun au doré" },
    { date: "2026-10-21", titre: "La lumière, première ennemie d'un flacon", sujet: "Entretien", lecture: 2,
      image: "images/lumiere-700.webp", alt: "Rayon de soleil sur un mur enduit à la chaux" },
  ],
};

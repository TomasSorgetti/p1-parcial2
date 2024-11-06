import { categories } from "./categories.js";

export const products = [
  // Bebidas
  {
    id: 1,
    name: "ARK Survival Ascended",
    description:
      "ARK Survival Ascended es una versión mejorada del juego de supervivencia Ark: Survival Evolved, reconstruida en Unreal Engine 5. Los jugadores deben sobrevivir en un entorno hostil lleno de dinosaurios y criaturas prehistóricas, recolectando recursos, construyendo refugios y domesticando animales. Ofrece gráficos mejorados, mejores mecánicas y nuevas características para enriquecer la experiencia multijugador.",
    price: 0,
    salePrice: 0,
    image: "images/game_ark.png",
    category: categories[1].name,
    bestSeller: true,
  },
  {
    id: 2,
    name: "Horizon",
    description:
      "Horizon es una serie de juegos de acción y aventura en un mundo abierto posapocalíptico donde la humanidad convive con criaturas robóticas gigantes inspiradas en animales. La protagonista, Aloy, una cazadora y arquera, explora vastos paisajes mientras descubre los secretos de su mundo, enfrenta enemigos mecánicos y desarrolla habilidades para sobrevivir.",
    price: 0,
    salePrice: 0,
    image: "images/game_horizon.png",
    category: categories[1].name,
    bestSeller: false,
  },
  {
    id: 3,
    name: "Valorant",
    description:
      "Valorant es un juego de disparos táctico en primera persona (FPS) desarrollado por Riot Games. En él, equipos de cinco jugadores se enfrentan en partidas donde deben completar objetivos como plantar o desactivar una bomba, mientras utilizan habilidades especiales de agentes con características únicas. El juego se enfoca en la estrategia, la coordinación de equipo y la precisión en los disparos.",
    price: 0,
    salePrice: 0,
    image: "images/game_valorant.png",
    category: categories[1].name,
    bestSeller: true,
  },

  // Comidas
  {
    id: 4,
    name: "Age of Empires",
    description:
      "Age of Empires es una serie de juegos de estrategia en tiempo real (RTS) donde los jugadores deben construir y gestionar civilizaciones, recolectar recursos, desarrollar tecnología y conquistar territorios. A lo largo de la serie, los jugadores controlan diferentes culturas a través de diversas épocas históricas, desde la Edad de Piedra hasta la Edad Moderna.",
    price: 0,
    salePrice: 0,
    image: "images/game_age.png",
    category: categories[2].name,
    bestSeller: false,
  },
  {
    id: 5,
    name: "Diablo II",
    description:
      "Diablo 2 es un videojuego de rol y acción desarrollado por Blizzard Entertainment, lanzado en 2000. En él, los jugadores exploran mazmorras, luchan contra monstruos y completan misiones mientras mejoran a su héroe mediante el uso de objetos, habilidades y hechizos. El juego es conocido por su jugabilidad adictiva, su sistema de botín aleatorio y sus épicas batallas contra poderosos enemigos.",
    price: 0,
    salePrice: 0,
    image: "images/game_diablo.png",
    category: categories[2].name,
    bestSeller: false,
  },
  {
    id: 6,
    name: "Half Life 2",
    description:
      "Half-Life 2 es un videojuego de disparos en primera persona (FPS) desarrollado por Valve. En él, los jugadores controlan a Gordon Freeman, un científico que lucha contra una invasión alienígena en una ciudad controlada por una fuerza totalitaria. El juego destaca por su innovador motor gráfico, su narrativa envolvente y su interacción con el entorno, como el uso de la famosa física para resolver puzzles.",
    price: 0,
    salePrice: 0,
    image: "images/game_half_life.png",
    category: categories[2].name || "FPS",
    bestSeller: false,
  },

  // Postres
  {
    id: 7,
    name: "Skyrim",
    description:
      "Skyrim es un videojuego de rol y acción en un mundo abierto desarrollado por Bethesda. Ambientado en la tierra ficticia de Tamriel, los jugadores controlan a un héroe conocido como el 'Dragonborn', que debe enfrentarse a dragones y resolver una serie de misiones mientras explora un vasto mundo lleno de historia, personajes y lugares por descubrir. El juego se destaca por su libertad, personalización del personaje y una profunda narrativa.",
    price: 0,
    salePrice: 0,
    image: "images/game_skyrim.png",
    category: categories[3].name || "RPG",
    bestSeller: true,
  },
  {
    id: 8,
    name: "Torchlight II",
    description:
      "Torchlight 2 es un videojuego de rol y acción con vista isométrica, desarrollado por Runic Games. Los jugadores eligen entre varias clases de héroes y exploran mazmorras generadas de manera aleatoria mientras luchan contra monstruos, buscan botines y completan misiones. El juego es conocido por su dinámica de combate rápido, personalización de personajes y su estilo visual colorido y atractivo.",
    price: 0,
    salePrice: 0,
    image: "images/game_torchlight.png",
    category: categories[3].name || "Fantasy",
    bestSeller: false,
  },
  {
    id: 9,
    name: "World of Warcraft",
    description:
      "World of Warcraft es un videojuego de rol multijugador masivo en línea (MMORPG) desarrollado por Blizzard Entertainment. En él, los jugadores crean personajes personalizables y exploran el vasto mundo de Azeroth, completando misiones, luchando contra monstruos, y participando en batallas épicas tanto en solitario como en grupo. El juego es famoso por su enorme comunidad, sus expansiones periódicas y su profunda narrativa.",
    price: 0,
    salePrice: 0,
    image: "images/game_wow.png",
    category: categories[3].name || "RPG",
    bestSeller: false,
  },
];

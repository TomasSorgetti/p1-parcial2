import { categories } from "./categories.js";

export const products = [
  // Bebidas
  {
    id: 1,
    name: "Café Expresso",
    description:
      "Es un café concentrado que se prepara forzando agua caliente a alta presión a través de granos de café finamente molidos",
    price: 0,
    salePrice: 0,
    image: "images/producto-de-ejemplo.jpg",
    category: categories[1].name || "Bebidas",
    bestSeller: false,
  },
  {
    id: 2,
    name: "Café Cappuccino",
    description:
      "Se caracteriza por su textura cremosa y el equilibrio entre el café fuerte y la leche suave.",
    price: 0,
    salePrice: 0,
    image: "images/producto-de-ejemplo.jpg",
    category: categories[1].name || "Bebidas",
    bestSeller: false,
  },
  {
    id: 3,
    name: "Café Latte",
    description:
      "Similar al cappuccino, pero con una mayor proporción de leche vaporizada y menos espuma. El latte tiene un sabor más suave y lechoso en comparación con el cappuccino.",
    price: 0,
    salePrice: 0,
    image: "images/producto-de-ejemplo.jpg",
    category: categories[1].name || "Bebidas",
    bestSeller: false,
  },

  // Comidas
  {
    id: 4,
    name: "Chocolate Negro",
    description:
      "Contiene cacao sólido, manteca de cacao y azúcar, pero no tiene leche. Su sabor es intenso y amargo, con un alto porcentaje de cacao.",
    price: 0,
    salePrice: 0,
    image: "images/producto-de-ejemplo.jpg",
    category: categories[2].name || "Comidas",
    bestSeller: false,
  },
  {
    id: 5,
    name: "Chocolate con Leche",
    description:
      "Incluye cacao sólido, manteca de cacao, leche en polvo o leche condensada, y azúcar. Tiene un sabor más dulce y suave que el chocolate negro.",
    price: 0,
    salePrice: 0,
    image: "images/producto-de-ejemplo.jpg",
    category: categories[2].name || "Comidas",
    bestSeller: false,
  },
  {
    id: 6,
    name: "Chocolate Blanco",
    description:
      "Incluye cacao sólido, manteca de cacao, leche en polvo o leche condensada, y azúcar. Tiene un sabor más dulce y suave que el chocolate negro.",
    price: 0,
    salePrice: 0,
    image: "images/producto-de-ejemplo.jpg",
    category: categories[2].name || "Comidas",
    bestSeller: false,
  },

  // Postres
  {
    id: 7,
    name: "Tiramisu",
    description:
      "Un postre italiano que combina capas de bizcochos empapados en café con una mezcla cremosa de mascarpone, huevos y azúcar, todo espolvoreado con cacao en polvo.",
    price: 0,
    salePrice: 0,
    image: "images/producto-de-ejemplo.jpg",
    category: categories[2].name || "Comidas",
    bestSeller: false,
  },
  {
    id: 8,
    name: "Cheesecake",
    description:
      "Un pastel hecho a base de queso crema, azúcar y huevos, sobre una base de galletas trituradas. Puede llevar diversos sabores y coberturas, como frutas, chocolate o caramelo.",
    price: 0,
    salePrice: 0,
    image: "images/producto-de-ejemplo.jpg",
    category: categories[2].name || "Comidas",
    bestSeller: false,
  },
  {
    id: 9,
    name: "Brownies",
    description:
      "Pequeños cuadraditos de pastel de chocolate que son densos y fudgy por dentro, con una capa crujiente en la superficie. Se pueden añadir nueces, chips de chocolate o otros ingredientes.",
    price: 0,
    salePrice: 0,
    image: "images/producto-de-ejemplo.jpg",
    category: categories[2].name || "Comidas",
    bestSeller: false,
  },
];

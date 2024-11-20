import { ProductController } from "./domains/product/product.controller.js";
import { CategoryController } from "./domains/category/category.controller.js";
import { CartController } from "./domains/cart/cart.controller.js";

const productController = new ProductController();
const categoryController = new CategoryController();
const cartController = new CartController();

// estado de loading
window.isLoading = false;

const loadingElement = document.getElementById("loader");

function updateLoadingElement() {
  loadingElement.style.display = window.isLoading ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  document.getElementById("search").addEventListener("input", () => {
    productController.getProductsFiltered((product) =>
      cartController.addToCart(product)
    );
  });
  document.getElementById("selector").addEventListener("change", () => {
    productController.getProductsFiltered((product) =>
      cartController.addToCart(product)
    );
  });
  document.getElementById("order").addEventListener("change", () => {
    productController.getProductsFiltered((product) =>
      cartController.addToCart(product)
    );
  });
});

function init() {
  productController.displayProducts((product) =>
    cartController.addToCart(product)
  );
  categoryController.getSelectorCategories();
  cartController.initCart();
}

// para actualizar el loading
export function setLoading(value) {
  window.isLoading = value;
  updateLoadingElement();
}

import { ProductController } from "./domains/product/product.controller.js";
import { CategoryController } from "./domains/category/category.controller.js";

// estado de loading
window.isLoading = false;

const productController = new ProductController();
const categoryController = new CategoryController();

const loadingElement = document.getElementById("loader");

function updateLoadingElement() {
  loadingElement.style.display = window.isLoading ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  productController.displayProducts(setLoading);
  categoryController.getSelectorCategories(setLoading);
}

// para actualizar el loading
function setLoading(value) {
  window.isLoading = value;
  updateLoadingElement();
}

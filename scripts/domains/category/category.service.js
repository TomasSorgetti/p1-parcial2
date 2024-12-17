import { categories } from "../../data/index.js";
import { Category } from "../../entities/categories.entity.js";
import { CategoryPromotion } from "../../common/ui/categoryPromotion.js";

export class CategoryService {
  #categories;

  constructor() {
    this.categoryPromotion = new CategoryPromotion();
    this.#categories = categories.map(
      (category) => new Category(category.id, category.name, category.image)
    );
  }

  getAllCategories() {
    const selector = document.querySelector("#selector");

    // Crea un option por cada categoría
    this.#categories.forEach((category) => {
      const option = document.createElement("option");
      option.id = `category-${category.id}`;
      option.value = category.name;
      option.textContent = category.name;
      selector.appendChild(option);
    });

    this.#addCategoryChangeListener(selector);
  }

  #addCategoryChangeListener(selector) {
    selector.addEventListener("change", (event) => {
      const selectedCategory = event.target.value;
      const selectedCategoryObject = this.#categories.find(
        (category) => category.name === selectedCategory
      );

      this.categoryPromotion.show(selectedCategoryObject);
    });
  }
}

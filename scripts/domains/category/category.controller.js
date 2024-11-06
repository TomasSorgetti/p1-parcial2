import { CategoryService } from "./category.service.js";

export class CategoryController {
  #categoryService;

  constructor() {
    this.#categoryService = new CategoryService();
  }

  getSelectorCategories() {
    try {
      const categories = this.#categoryService.getAllCategories();
      const selector = document.querySelector("#selector");
      // creo un option por cada categoría
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.id = `category-${category.id}`;
        option.value = category.name;
        option.textContent = category.name;
        selector.appendChild(option);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

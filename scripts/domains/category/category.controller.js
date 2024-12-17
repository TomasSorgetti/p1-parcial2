import { CategoryService } from "./category.service.js";

export class CategoryController {
  #categoryService;

  constructor() {
    this.#categoryService = new CategoryService();
  }

  getSelectorCategories() {
    try {
      this.#categoryService.getAllCategories();
    } catch (error) {
      console.log(error);
    }
  }
}

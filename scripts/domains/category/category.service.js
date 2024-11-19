import { categories } from "../../data/index.js";
import { Category } from "../../entities/categories.entity.js";

export class CategoryService {
  #categories;

  constructor() {
    this.#categories = categories.map(
      (category) => new Category(category.id, category.name, category.image)
    );
  }

  getAllCategories() {
    return this.#categories;
  }
}

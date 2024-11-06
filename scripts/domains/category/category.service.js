import { categories } from "../../data/index.js";
export class CategoryService {
  #categories;

  constructor() {
    this.#categories = categories;
  }

  getAllCategories() {
    return this.#categories;
  }
}

import { products } from "../../data/index.js";
import { Product } from "../../entities/products.entity.js";

export class ProductService {
  #products;
  constructor() {
    this.#products = this.#setProducts();
  }

  #setProducts() {
    return products.map(
      ({
        id,
        name,
        description,
        price,
        salePrice,
        image,
        category,
        bestSeller,
      }) => {
        const newProduct = new Product({
          id,
          name,
          description,
          price,
          salePrice,
          image,
          category,
          bestSeller,
        });
        return newProduct;
      }
    );
  }

  getAllProducts() {
    return this.#products;
  }

  getProductsByCategory(categoryName) {
    return this.#products.filter(
      (product) => product.category === categoryName
    );
  }

  getProductsByName(name) {
    return this.#products.filter((product) => product.name === name);
  }
}

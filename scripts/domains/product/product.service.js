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
        categories,
        bestSeller,
      }) => {
        const newProduct = new Product({
          id,
          name,
          description,
          price,
          salePrice,
          image,
          bestSeller,
        });

        if (categories) {
          categories.forEach((category) => newProduct.addCategory(category));
        }

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

import { ProductService } from "./product.service.js";

export class ProductController {
  #productService;
  constructor() {
    this.#productService = new ProductService();
  }

  displayProducts(addToCartCb) {
    try {
      this.#productService.initProducts(addToCartCb);
    } catch (error) {
      console.log(error.message);
    }
  }

  getProductsFiltered(addToCartCb) {
    try {
      this.#productService.getProductsFiltered(addToCartCb);
    } catch (error) {
      console.log(error.message);
    }
  }
}

import { CartService } from "./cart.service.js";

export class CartController {
  #cartService;
  constructor() {
    this.#cartService = new CartService();
  }

  initCart() {
    try {
      this.#cartService.initCart();
    } catch (error) {
      console.log(error.message);
    }
  }

  getCartProducts() {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
  addToCart(product, quantity) {
    try {
      this.#cartService.addToCart(product, quantity);
    } catch (error) {
      console.log(error.message);
    }
  }
  removeFromCart(product) {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
  clearCart() {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
}

// TODO => Debería de crear un metodo que mapee el cart y busque de cada producto el quantity y lo sume, o debería hacer un conteo del tipo de producto y no la cantidad totales
export class Cart {
  #cartProducts;
  constructor() {
    this.#cartProducts = [];
  }

  initCart(products) {
    this.#cartProducts = products;
  }

  addProduct(product) {
    // agrego el producto
    this.#cartProducts.push(product);
  }

  updateQuantity(productId, quantity) {
    // busco si existe el producto con ese id en el carrito
    const foundProduct = this.#cartProducts.find(
      (cartProduct) => cartProduct.id === productId
    );
    // si no existe, lanza un error
    if (!foundProduct) {
      throw new Error("No se encontro el producto");
    } else {
      // si existe, lo actualiza
      foundProduct.quantity = quantity;
    }
  }

  removeProduct(productId) {
    // busco si existe el producto con ese id en el carrito
    const foundProduct = this.#cartProducts.find(
      (cartProduct) => cartProduct.id === productId
    );
    // si no existe, lanza un error
    if (!foundProduct) {
      throw new Error("No se encontro el producto");
    } else {
      // si existe, lo elimina
      this.#cartProducts = this.#cartProducts.filter(
        (cartProduct) => cartProduct.id !== productId
      );
    }
  }

  clearCart() {
    this.#cartProducts = [];
  }
  getCartProducts() {
    return this.#cartProducts;
  }

  findProduct(productId) {
    return this.#cartProducts.find((product) => product.id === productId);
  }
}

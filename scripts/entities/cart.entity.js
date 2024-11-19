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
      (cartProduct) => cartProduct.product.id === productId
    );
    // si no existe, lanza un error
    if (!foundProduct) {
      throw new Error("No se encontro el producto");
    } else if (quantity === 0) {
      this.removeProduct(productId);
    } else {
      // si existe, lo actualiza
      foundProduct.quantity = quantity;
    }
  }

  removeProduct(productId) {
    // busco si existe el producto con ese id en el carrito
    const foundProduct = this.#cartProducts.find(
      (cartProduct) => cartProduct.product.id === productId
    );
    // si no existe, lanza un error
    if (!foundProduct) {
      throw new Error("No se encontro el producto");
    } else {
      // si existe, lo elimina
      this.#cartProducts = this.#cartProducts.filter(
        (cartProduct) => cartProduct.product.id !== productId
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
    return this.#cartProducts.find(
      (cartProduct) => cartProduct.product.id === productId
    );
  }

  getTotalPrice() {
    let total = 0;
    this.#cartProducts.forEach((cartProduct) => {
      console.log("Cart Product", cartProduct);

      total +=
        (cartProduct.product.isFree ? 0 : cartProduct.product.salePrice) *
        cartProduct.quantity;
    });
    return total;
  }
}

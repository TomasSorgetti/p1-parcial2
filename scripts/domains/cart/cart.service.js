import { Cart } from "../../entities/cart.js";
import { Product } from "../../entities/products.entity.js";

export class CartService {
  #cart;

  constructor() {
    this.#cart = new Cart();
  }

  initCart() {
    // busco si hay productos guardados en el localStorage
    const savedProducts = localStorage.getItem("cartProducts");
    // si no hay, no hago nada
    if (savedProducts === null || savedProducts === undefined) {
      return;
    } else {
      const parsedProducts = JSON.parse(savedProducts);
      // acumulo los productos guardados en un array
      const newProductList = [];
      // recorro los productos guardados
      parsedProducts.forEach((parsedProduct) => {
        // desestructuro el producto
        const {
          image,
          name,
          description,
          price,
          salePrice,
          bestSeller,
          categories,
        } = parsedProduct.product;
        // creo una instancia del producto por cada producto guardado
        const newProduct = new Product({
          image,
          name,
          description,
          price,
          salePrice,
          bestSeller,
        });
        // le agrego las categorías a la instancia
        categories.forEach((category) => newProduct.addCategory(category));
        // agrego la instancia al acumulador de productos
        newProductList.push({
          product: newProduct,
          quantity: parsedProduct.quantity,
        });
      });
      // inicializo el carrito con los productos acumulados
      this.#cart.initCart(newProductList);
      this.displayCart();
    }
  }

  displayCart() {
    // const cart = document.getElementById("cart");
    console.log(this.#cart.getCartProducts());
  }

  addToCart(product) {
    const productFound = this.#cart.findProduct(product.id);

    productFound
      ? this.#cart.updateQuantity(product.id, productFound.quantity + 1)
      : this.#cart.addProduct({ product, quantity: 1 });

    this.#updateLocalStorage();
    //? deberia renderizar el contenido del cart?
    this.displayCart();
  }

  removeFromCart(product) {
    this.#cart.removeProduct(product.id);
  }

  clearCart() {
    this.#cart.clearCart();
  }

  #updateLocalStorage() {
    localStorage.setItem(
      "cartProducts",
      JSON.stringify(this.#cart.getCartProducts())
    );
  }
}

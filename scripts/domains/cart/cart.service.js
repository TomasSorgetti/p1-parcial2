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
      setTimeout(() => {
        const parsedProducts = JSON.parse(savedProducts);
        // acumulo los productos guardados en un array
        const newProductList = [];
        // recorro los productos guardados
        parsedProducts.forEach((parsedProduct) => {
          // desestructuro el producto
          const {
            id,
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
            id,
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
      }, 1000);
    }
  }

  displayCart() {
    const products = this.#cart.getCartProducts();
    const cart = document.getElementById("cart");
    cart.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "card";
      cart.appendChild(productCard);
      // Product cart title
      const productTitle = document.createElement("h3");
      productTitle.textContent = product.product.name;
      productCard.appendChild(productTitle);
      // Count container
      const countContainer = document.createElement("div");
      countContainer.className = "count-container";
      productCard.appendChild(countContainer);
      // Remove button
      const removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.textContent = "-";
      countContainer.appendChild(removeButton);
      removeButton.addEventListener("click", () => {
        this.#cart.updateQuantity(product.product.id, product.quantity - 1);
        this.#updateLocalStorage();
        this.displayCart();
      });
      // count
      const count = document.createElement("p");
      count.textContent = product.quantity;
      countContainer.appendChild(count);
      // Add button
      const addButton = document.createElement("button");
      addButton.className = "remove-button";
      addButton.textContent = "+";
      countContainer.appendChild(addButton);
      addButton.addEventListener("click", () => {
        this.#cart.updateQuantity(product.product.id, product.quantity + 1);
        this.#updateLocalStorage();
        this.displayCart();
      });
    });
  }

  addToCart(product) {
    const productFound = this.#cart.findProduct(product.id);

    if (productFound) {
      this.#cart.updateQuantity(
        productFound.product.id,
        productFound.quantity + 1
      );
    } else {
      this.#cart.addProduct({ product, quantity: 1 });
    }

    this.#updateLocalStorage();
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

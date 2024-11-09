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
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    const toggleCart = document.createElement("button");
    const toggleCartImg = document.createElement("img");
    toggleCartImg.src = "/images/toggleCart.png";
    toggleCartImg.alt = "cart icon";
    toggleCart.appendChild(toggleCartImg);
    toggleCart.className = "toggle-cart";
    const toggleCount = document.createElement("span");
    toggleCount.className = "toggle-count";
    toggleCount.textContent = products.length;
    toggleCart.appendChild(toggleCount);
    cart.appendChild(toggleCart);
    toggleCart.addEventListener("click", () => {
      if (cart.classList.contains("hidden")) {
        cart.classList.replace("hidden", "show");
      } else if (cart.classList.contains("show")) {
        cart.classList.replace("show", "hidden");
      }
    });

    const closeCart = document.getElementById("close-cart");
    closeCart.addEventListener("click", () => {
      if (cart.classList.contains("show")) {
        cart.classList.replace("show", "hidden");
      }
    });
    const clearCartBnt = document.getElementById("clear-cart");
    clearCartBnt.addEventListener("click", () => {
      this.#cart.clearCart();
      this.#updateLocalStorage();
      this.displayCart();
    });

    products.forEach((product) => {
      const { quantity } = product;
      const { name, image, id, salePrice, isFree } = product.product;

      const productCard = document.createElement("div");
      productCard.className = "cart-card";
      cartItems.appendChild(productCard);
      // Product cart image
      const productImgCont = document.createElement("div");
      productImgCont.className = "cart-img-cont";
      productCard.appendChild(productImgCont);
      const productImg = document.createElement("img");
      productImg.src = image;
      productImg.alt = name;
      productImgCont.appendChild(productImg);

      // Cart Product card container
      const productInfoContainer = document.createElement("div");
      productInfoContainer.className = "cart-info";
      productCard.appendChild(productInfoContainer);
      // Product cart title
      const productTitle = document.createElement("h3");
      productTitle.textContent = name;
      productInfoContainer.appendChild(productTitle);

      // Product cart price
      const productTotalPrice = document.createElement("span");
      productTotalPrice.className = "cart-product-total-price";
      productTotalPrice.innerText = `$ ${
        isFree ? "Free" : salePrice * quantity
      }`;
      productInfoContainer.appendChild(productTotalPrice);

      // Count container
      const countContainer = document.createElement("div");
      countContainer.className = "count-container";
      productInfoContainer.appendChild(countContainer);
      // Remove button
      const removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.textContent = "-";
      countContainer.appendChild(removeButton);
      removeButton.addEventListener("click", () => {
        this.#cart.updateQuantity(id, quantity - 1);
        this.#updateLocalStorage();
        this.displayCart();
      });
      // count
      const count = document.createElement("p");
      count.textContent = product.quantity;
      countContainer.appendChild(count);
      // Add button
      const addButton = document.createElement("button");
      addButton.className = "add-button";
      addButton.textContent = "+";
      countContainer.appendChild(addButton);
      addButton.addEventListener("click", () => {
        this.#cart.updateQuantity(id, quantity + 1);
        this.#updateLocalStorage();
        this.displayCart();
      });

      // remove the product from cart
      const deleteProduct = document.createElement("button");
      deleteProduct.innerText = "X";
      deleteProduct.className = "delete-cart-product";
      productCard.appendChild(deleteProduct);
      deleteProduct.addEventListener("click", () => {
        this.#cart.removeProduct(id);
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

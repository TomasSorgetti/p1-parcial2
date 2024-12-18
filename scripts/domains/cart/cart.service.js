import { Cart } from "../../entities/cart.entity.js";
import { Product } from "../../entities/products.entity.js";
import { Modal } from "../../common/ui/modal.js";
import { FormField } from "../../common/ui/formField.js";

export class CartService {
  #cart;

  constructor() {
    this.modal = new Modal("modal");
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

    document.addEventListener("click", (event) => {
      if (cart.classList.contains("show") && !cart.contains(event.target)) {
        cart.classList.replace("show", "hidden");
      }
    });

    cartItems.innerHTML = "";

    const toggleCart = document.createElement("button");
    const toggleCartImg = document.createElement("img");
    toggleCartImg.src = "images/toggleCart.png";
    toggleCartImg.alt = "cart icon";
    toggleCart.appendChild(toggleCartImg);
    toggleCart.className = "toggle-cart";
    const toggleCount = document.createElement("span");
    toggleCount.className = "toggle-count";
    toggleCount.textContent = products.length;
    toggleCart.appendChild(toggleCount);
    cart.appendChild(toggleCart);
    toggleCart.addEventListener("click", (event) => {
      event.stopPropagation();
      if (cart.classList.contains("hidden")) {
        cart.classList.replace("hidden", "show");
      } else if (cart.classList.contains("show")) {
        cart.classList.replace("show", "hidden");
      }
    });

    const total = this.#cart.getTotalPrice();
    const totalPrice = document.getElementById("total-price");
    totalPrice.textContent = total;
    const closeCart = document.getElementById("close-cart");
    closeCart.addEventListener("click", () => {
      if (cart.classList.contains("show")) {
        cart.classList.replace("show", "hidden");
      }
    });
    const clearCartBnt = document.getElementById("clear-cart");
    clearCartBnt.addEventListener("click", () => {
      this.#cart.clearCart();
      cart.classList.replace("show", "hidden");
      this.#updateLocalStorage();
      this.displayCart();
    });

    if (products.length === 0) {
      cartItems.textContent = "El carrito esta vacio...";
    }
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
      productTotalPrice.innerText = isFree
        ? "Gratis"
        : `$${salePrice * quantity}`;
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
      removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        this.#cart.updateQuantity(id, quantity - 1);
        if (products.length === 1 && quantity === 1) {
          cart.classList.replace("show", "hidden");
        }
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
      addButton.addEventListener("click", (event) => {
        event.stopPropagation();

        this.#cart.updateQuantity(id, quantity + 1);
        this.#updateLocalStorage();
        this.displayCart();
      });

      // remove the product from cart
      const deleteProduct = document.createElement("button");
      const deleteProductImg = document.createElement("img");
      deleteProductImg.src = "images/delete_product.svg";
      deleteProductImg.alt = "close icon";
      deleteProduct.appendChild(deleteProductImg);
      deleteProduct.className = "delete-cart-product";
      productCard.appendChild(deleteProduct);
      deleteProduct.addEventListener("click", (event) => {
        event.stopPropagation();
        if (products.length === 1) {
          cart.classList.replace("show", "hidden");
        }
        this.#cart.removeProduct(id);
        this.#updateLocalStorage();
        this.displayCart();
      });
    });

    const buyButton = document.getElementById("buy-cart");
    buyButton.addEventListener("click", () => {
      this.modal.show(() => this.#generateCheckout());
    });
  }

  addToCart(product, quantity) {
    const productFound = this.#cart.findProduct(product.id);

    if (productFound) {
      quantity
        ? this.#cart.updateQuantity(
            productFound.product.id,
            productFound.quantity + quantity
          )
        : this.#cart.updateQuantity(
            productFound.product.id,
            productFound.quantity + 1
          );
    } else {
      this.#cart.addProduct({ product, quantity: quantity ? quantity : 1 });
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

  // TODO => En el checkout se debe solicitar la información del cliente (nombre, teléfono, email, lugar
  // TODO => y fecha de entrega) y del pago (método de pago, cuotas –si corresponde–). Este proceso
  // TODO => debe tener la posibilidad de cancelarse para seguir agregando o eliminando productos
  // TODO => del carro.
  #generateCheckout() {
    const content = document.createElement("div");
    content.className = "checkout-content";

    const title = document.createElement("h2");
    title.textContent = "Continuar con la compra";
    content.appendChild(title);

    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";
    form.id = "checkout-form";
    content.appendChild(form);

    const topFormContainer = document.createElement("div");
    topFormContainer.className = "checkout-top-cont";
    form.appendChild(topFormContainer);

    const fieldsCont = document.createElement("div");
    fieldsCont.className = "checkout-fields-cont";
    topFormContainer.appendChild(fieldsCont);

    // Nombre
    const nameField = new FormField({
      label: "Nombre:",
      type: "text",
      name: "name",
      placeholder: "John Doe",
      id: "checkout-name",
      validate: [
        (value) =>
          value.trim() === "" ? "El nombre no puede estar vacío" : "",
        (value) =>
          value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : "",
      ],
    });
    fieldsCont.appendChild(nameField.createField());

    // Teléfono
    const phoneField = new FormField({
      label: "Teléfono:",
      type: "text",
      name: "phone",
      placeholder: "+541112345678",
      id: "checkout-phone",
      validate: [
        (value) =>
          value.trim() === "" ? "El teléfono no puede estar vacío" : "",
      ],
    });
    fieldsCont.appendChild(phoneField.createField());

    // Email
    const emailField = new FormField({
      label: "Email:",
      type: "text",
      name: "email",
      placeholder: "johndoe@example.com",
      id: "checkout-email",
      validate: [
        (value) => (value.trim() === "" ? "El email no puede estar vacío" : ""),
        (value) =>
          !/\S+@\S+\.\S+/.test(value) ? "Ingrese un email válido" : "",
      ],
    });
    fieldsCont.appendChild(emailField.createField());

    // Location
    const locationField = new FormField({
      label: "Localidad:",
      type: "text",
      name: "location",
      placeholder: "Buenos Aires, Argentina",
      id: "checkout-location",
      validate: [
        (value) =>
          value.trim() === "" ? "La localidad no puede estar vacía" : "",
      ],
    });
    fieldsCont.appendChild(locationField.createField());

    // Date
    const dateField = new FormField({
      label: "Fecha de entrega:",
      type: "date",
      name: "date",
      id: "checkout-date",
      validate: [
        (value) => (value.trim() === "" ? "La fecha no puede estar vacía" : ""),
      ],
    });
    fieldsCont.appendChild(dateField.createField());

    const rightFormContainer = document.createElement("div");
    rightFormContainer.className = "checkout-right-cont";
    topFormContainer.appendChild(rightFormContainer);
    // TODO => Payment

    // checkout cart items list
    const checkoutCartItems = document.createElement("ul");
    checkoutCartItems.className = "checkout-cart-items";
    rightFormContainer.appendChild(checkoutCartItems);

    const cartProducts = this.#cart.getCartProducts();
    cartProducts.forEach((product) => {
      const checkoutCartItem = document.createElement("li");
      checkoutCartItem.className = "checkout-cart-item";
      checkoutCartItem.textContent = `${product.quantity} x ${
        product.product.name
      } - $${product.product.price * product.quantity}`;
      checkoutCartItems.appendChild(checkoutCartItem);
    });
    const totalPrice = document.createElement("li");
    totalPrice.className = "checkout-total-price";
    totalPrice.textContent = `Total: $${this.#cart.getTotalPrice()}`;
    checkoutCartItems.appendChild(totalPrice);

    //! Buttons Container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "checkout-buttons-container";
    form.appendChild(buttonsContainer);
    // Cancel Button
    const cancelButton = document.createElement("button");
    cancelButton.type = "reset";
    cancelButton.textContent = "Cancelar";
    buttonsContainer.appendChild(cancelButton);
    cancelButton.addEventListener("click", () => this.modal.hide());
    // Buy Button
    const buyButton = document.createElement("button");
    buyButton.type = "submit";
    buyButton.textContent = "Comprar";
    buttonsContainer.appendChild(buyButton);
    buyButton.addEventListener("click", () => {
      // TODO => Loading Spinner while checkout is being processed
      this.modal.hide();
      this.#cart.clearCart();
      this.#updateLocalStorage();
      this.displayCart();
      document.getElementById("cart").classList.replace("show", "hidden");
    });
    return content;
  }
}

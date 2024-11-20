import { products } from "../../data/index.js";
import { Product } from "../../entities/products.entity.js";
import { setLoading } from "../../index.js";
import { cutText } from "../../common/utils/cutText.js";

export class ProductService {
  #products;
  constructor() {
    this.#products = this.#setProducts();
  }

  initProducts(addToCartCb) {
    const products = this.getAllProducts();
    const productContainer = document.querySelector("#products");

    //? deberia corroborar que exista el contenedor?
    if (!productContainer) {
      console.error("El contenedor de productos no se encontró.");
      return;
    }

    // seteo el loading
    setLoading(true);

    // SetTimeOut para simular el tiempo de carga
    setTimeout(() => {
      try {
        productContainer.innerHTML = "";

        products.forEach((product) => {
          productContainer.appendChild(
            this.#createProductCard(product, addToCartCb)
          );
        });
      } catch (error) {
        console.error("Error al cargar productos:", error);
        productContainer.innerHTML = "<p>Error al cargar los productos.</p>";
      } finally {
        // finalizo el loading
        setLoading(false);
      }
    }, 1000);
  }

  #createProductCard(product, addToCartCb) {
    const {
      image,
      name,
      description,
      price,
      salePrice,
      category,
      bestSeller,
      isFree,
    } = product;

    // Card
    const card = document.createElement("div");
    card.className = "card";

    // Le agrego el evento a la card para mostrar el modal

    // Card image
    const cardImg = document.createElement("img");
    cardImg.src = image;
    cardImg.alt = name;
    cardImg.className = "card-img";
    card.appendChild(cardImg);

    // Best Seller
    if (bestSeller) {
      const bestSelerText = document.createElement("span");
      bestSelerText.textContent = "best seller";
      bestSelerText.className = "best-seller";
      card.appendChild(bestSelerText);
    }

    if (!isFree) {
      // Price
      const priceCont = document.createElement("div");
      priceCont.className = "price-cont";
      card.appendChild(priceCont);
      if (price != 0) {
        const priceText = document.createElement("p");
        priceText.className = "price";
        priceText.innerText = `$ ${price}`;
        priceCont.appendChild(priceText);
      }
      const salePriceText = document.createElement("p");
      salePriceText.className = "sale-price";
      salePriceText.innerText = `$ ${salePrice}`;
      priceCont.appendChild(salePriceText);
    } else {
      const freeText = document.createElement("span");
      freeText.className = "free";
      freeText.innerText = `Free`;
      card.appendChild(freeText);
    }

    // Card Text Content
    const cardTextContainer = document.createElement("div");
    cardTextContainer.className = "card-text-container";
    card.appendChild(cardTextContainer);

    // Card title
    const title = document.createElement("h3");
    title.textContent = name;
    cardTextContainer.appendChild(title);

    // Card description
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = cutText(description);
    cardTextContainer.appendChild(descriptionElement);

    // Detail Card Button
    const detailButton = document.createElement("button");
    cardTextContainer.appendChild(detailButton);
    detailButton.classList.add("detail-button");
    detailButton.textContent = "Ver más";
    detailButton.addEventListener("click", () => {
      this.#generateModal(product, addToCartCb);
    });

    // Card Button
    const buyButton = document.createElement("button");
    cardTextContainer.appendChild(buyButton);
    // Card Button Event
    buyButton.addEventListener("click", () => {
      addToCartCb(product);
      const cart = document.getElementById("cart");
      if (cart.classList.contains("hidden")) {
        cart.classList.replace("hidden", "show");
      }
    });

    // Card Button Content
    const buttonContent = document.createElement("div");
    buyButton.appendChild(buttonContent);
    const buttonText = document.createElement("span");
    buttonText.textContent = "Comprar";
    buttonContent.appendChild(buttonText);
    const buttonIcon = document.createElement("img");
    buttonIcon.src = "/images/arrowIcon.png";
    buttonIcon.alt = "arrow icon";
    buttonContent.appendChild(buttonIcon);

    return card;
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
        isFree,
      }) => {
        const newProduct = new Product({
          id,
          name,
          description,
          price,
          salePrice,
          image,
          bestSeller,
          isFree,
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

  getProductsFiltered(addToCartCb) {
    // obtengo los valores del filtro
    const search = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("selector").value;
    const order = document.getElementById("order").value;

    // filtro el array de productos por nombre y categoria
    const filteredProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search) &&
        (category === "todos" || product.categories.includes(category))
      );
    });

    // ordeno el array de productos filtrados
    filteredProducts.sort((a, b) => {
      return order === "asc"
        ? (a.isFree ? 0 : a.salePrice) - b.salePrice
        : b.salePrice - (a.isFree ? 0 : a.salePrice);
    });

    // seteo el array de productos
    this.#products = filteredProducts;

    // vuevlo a renderizar los productos borrando y cargando denuevo las cards
    const productContainer = document.querySelector("#products");
    productContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
      productContainer.textContent = "No se encontraron productos.";
    }
    filteredProducts.forEach((product) => {
      productContainer.appendChild(
        this.#createProductCard(product, addToCartCb)
      );
    });
  }

  #generateModal(product, addToCartCb) {
    const modal = document.getElementById("modal");
    // evento para cerrar el modal
    modal.addEventListener("click", () => {
      modal.removeAttribute("class");
    });
    modal.innerHTML = "";
    // seteo el modal a mostrar
    modal.className = "show";
    // creo el contenido del modal
    const modalContent = document.createElement("div");
    modal.appendChild(modalContent);
    modalContent.className = "modal-content";

    // evento para evitar que se cierre el modal al hacer click en el contenido
    modalContent.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    // creo el boton para cerrar el modal
    const closeModalButton = document.createElement("button");
    closeModalButton.textContent = "X";
    closeModalButton.className = "close-modal";
    modalContent.appendChild(closeModalButton);
    closeModalButton.className = "close-modal";
    closeModalButton.addEventListener("click", () => {
      modal.removeAttribute("class");
    });
    // creo la imágen del modal
    const modalImage = document.createElement("img");
    modalContent.appendChild(modalImage);
    modalImage.src = product.image;
    modalImage.alt = product.name;

    // creo el contenedor del texto del modal
    const modalTextContainer = document.createElement("div");
    modalContent.appendChild(modalTextContainer);
    modalTextContainer.className = "modal-text-container";
    // creo el titulo del modal
    const modalTitle = document.createElement("h3");
    modalTextContainer.appendChild(modalTitle);
    modalTitle.textContent = product.name;
    // creo la descripcion del modal
    const modalDescription = document.createElement("p");
    modalTextContainer.appendChild(modalDescription);
    modalDescription.textContent = product.description;

    // Modal Price
    const modalPrice = document.createElement("p");
    modalPrice.textContent = `$${product.price}`;
    modalPrice.className = "modal-price";
    modalTextContainer.appendChild(modalPrice);

    const modalSalePrice = document.createElement("p");
    modalSalePrice.textContent = product.isFree
      ? "Gratis"
      : `$${product.salePrice}`;
    modalSalePrice.className = "modal-sale-price";
    modalTextContainer.appendChild(modalSalePrice);

    let quantityCount = 1;
    // Count container
    const countContainer = document.createElement("div");
    countContainer.className = "count-container";
    modalTextContainer.appendChild(countContainer);
    // Remove button
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "-";
    countContainer.appendChild(removeButton);
    removeButton.addEventListener("click", () => {
      if (quantityCount > 1) {
        quantityCount -= 1;
        count.textContent = quantityCount;
        modalPrice.textContent = `$${product.price * quantityCount}`;
        modalSalePrice.textContent = `$${product.salePrice * quantityCount}`;
      }
    });

    // count
    const count = document.createElement("p");
    count.textContent = quantityCount;
    countContainer.appendChild(count);

    // Add button
    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.textContent = "+";
    countContainer.appendChild(addButton);
    addButton.addEventListener("click", () => {
      if (product.isFree) return;
      else {
        quantityCount += 1;
        count.textContent = quantityCount;
        modalPrice.textContent = `$${product.price * quantityCount}`;
        modalSalePrice.textContent = `$${product.salePrice * quantityCount}`;
      }
    });

    // Modal Buy Button
    const buyButton = document.createElement("button");
    buyButton.textContent = "Comprar";
    buyButton.classList.add("modal-buy-button");
    modalTextContainer.appendChild(buyButton);
    // Modal Buy Button Event
    buyButton.addEventListener("click", () => {
      modal.removeAttribute("class");
      addToCartCb(product, quantityCount);
      const cart = document.getElementById("cart");
      if (cart.classList.contains("hidden")) {
        cart.classList.replace("hidden", "show");
      }
    });
  }
}

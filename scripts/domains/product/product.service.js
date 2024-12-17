import { products } from "../../data/index.js";
import { Product } from "../../entities/products.entity.js";
import { setLoading } from "../../index.js";
import { cutText } from "../../common/utils/cutText.js";
import { Modal } from "../../common/ui/modal.js";

export class ProductService {
  #products;
  constructor() {
    this.modal = new Modal("modal");
    this.#products = this.#setProducts();
  }

  initProducts(addToCartCb, stockController) {
    const products = this.getAllProducts();
    const productContainer = document.querySelector("#products");

    //? deberia corroborar que exista el contenedor?
    if (!productContainer) {
      console.error("El contenedor de productos no se encontró.");
      return;
    }

    // seteo el loading
    setLoading(true);
    productContainer.innerHTML = "";
    products.forEach(() => {
      productContainer.appendChild(this.#createSkeletonCard());
    });

    // SetTimeOut para simular el tiempo de carga
    setTimeout(() => {
      try {
        productContainer.innerHTML = "";

        products.forEach((product) => {
          productContainer.appendChild(
            this.#createProductCard(product, addToCartCb, stockController)
          );
        });
      } catch (error) {
        console.error("Error al cargar productos:", error);
        productContainer.innerHTML = "<p>Error al cargar los productos.</p>";
      } finally {
        setLoading(false);
      }
    }, 1000);
  }
  #createSkeletonCard() {
    const loadingCard = document.createElement("div");
    loadingCard.className = "loading-card";

    const loadingPrice = document.createElement("div");
    loadingPrice.className = "loading-card-price";
    loadingCard.appendChild(loadingPrice);

    const loadingTextCont = document.createElement("div");
    loadingTextCont.className = "loading-text-cont";
    loadingCard.appendChild(loadingTextCont);
    // title
    const loadingTitle = document.createElement("div");
    loadingTitle.className = "loading-title";
    loadingTextCont.appendChild(loadingTitle);
    // text cont
    const loadingText = document.createElement("div");
    loadingText.className = "loading-text";
    loadingTextCont.appendChild(loadingText);
    // text cont
    const loadingText1 = document.createElement("div");
    loadingText1.className = "loading-paragraph";
    loadingText.appendChild(loadingText1);
    // text cont
    const loadingText2 = document.createElement("div");
    loadingText2.className = "loading-paragraph";
    loadingText.appendChild(loadingText2);
    // text cont
    const loadingText3 = document.createElement("div");
    loadingText3.className = "loading-paragraph";
    loadingText.appendChild(loadingText3);
    // buttons
    const loadingButtons = document.createElement("div");
    loadingButtons.className = "loading-buttons";
    loadingTextCont.appendChild(loadingButtons);
    const loadingButton1 = document.createElement("div");
    loadingButton1.className = "loading-button";
    loadingButtons.appendChild(loadingButton1);
    const loadingButton2 = document.createElement("div");
    loadingButton2.className = "loading-button";
    loadingButtons.appendChild(loadingButton2);

    return loadingCard;
  }

  #createProductCard(product, addToCartCb, stockController) {
    const { image, name, description, price, salePrice, bestSeller, isFree } =
      product;
    // const stock = stockController.getStockByProductId(product.id);

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
      this.modal.show(() =>
        this.#generateProductDetail(product, addToCartCb, stockController)
      );
    });

    // Card Button
    const buyButton = document.createElement("button");
    cardTextContainer.appendChild(buyButton);
    // Card Button Event
    buyButton.addEventListener("click", (event) => {
      event.stopPropagation();
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
    buttonIcon.src = "images/arrowIcon.png";
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
    const filteredProducts = this.#setProducts().filter((product) => {
      return (
        product.name.toLowerCase().includes(search) &&
        (category === "todos" || product.categories.includes(category))
      );
    });

    // ordeno el array de productos filtrados
    filteredProducts.sort((a, b) => {
      return order === "asc"
        ? (a.isFree ? 0 : a.salePrice) - (b.isFree ? 0 : b.salePrice)
        : (b.isFree ? 0 : b.salePrice) - (a.isFree ? 0 : a.salePrice);
    });

    // seteo el array de productos
    this.#products = filteredProducts;

    // vuevlo a renderizar los productos borrando y cargando denuevo las cards
    const productContainer = document.querySelector("#products");

    productContainer.innerHTML = "";
    filteredProducts.forEach(() => {
      productContainer.appendChild(this.#createSkeletonCard());
    });

    setTimeout(() => {
      productContainer.innerHTML = "";

      if (filteredProducts.length === 0) {
        productContainer.textContent = "No se encontraron productos.";
      }

      filteredProducts.forEach((product) => {
        productContainer.appendChild(
          this.#createProductCard(product, addToCartCb)
        );
      });
    }, 600);
  }

  #generateProductDetail(product, addToCartCb, stockController) {
    const container = document.createElement("div");
    container.className = "modal-container";

    // creo la imágen del modal
    const modalImage = document.createElement("img");
    container.appendChild(modalImage);
    modalImage.src = product.image;
    modalImage.alt = product.name;

    // creo el contenedor del texto del modal
    const modalTextContainer = document.createElement("div");
    container.appendChild(modalTextContainer);
    modalTextContainer.className = "modal-text-container";
    // creo el titulo del modal
    const modalTitle = document.createElement("h3");
    modalTextContainer.appendChild(modalTitle);
    modalTitle.textContent = product.name;
    // creo la descripcion del modal
    const modalDescription = document.createElement("p");
    modalTextContainer.appendChild(modalDescription);
    modalDescription.textContent = product.description;

    // Modal categories
    const modalCategoriesContainer = document.createElement("div");
    modalCategoriesContainer.className = "modal-categories-container";
    modalTextContainer.appendChild(modalCategoriesContainer);
    product.categories.forEach((category) => {
      const modalCategory = document.createElement("span");
      modalCategory.textContent = category;
      modalCategoriesContainer.appendChild(modalCategory);
    });

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
        modalPrice.textContent = product.isFree
          ? `$${product.price}`
          : `$${product.price * quantityCount}`;
        modalSalePrice.textContent = product.isFree
          ? "Gratis"
          : `$${product.salePrice * quantityCount}`;
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
      quantityCount += 1;

      count.textContent = quantityCount;
      modalPrice.textContent = product.isFree
        ? `$${product.price}`
        : `$${product.price * quantityCount}`;

      modalSalePrice.textContent = product.isFree
        ? "Gratis"
        : `$${product.salePrice * quantityCount}`;
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

    return container;
  }
}

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

    filteredProducts.forEach((product) => {
      productContainer.appendChild(
        this.#createProductCard(product, addToCartCb)
      );
    });
  }
}

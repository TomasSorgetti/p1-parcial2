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
    const { image, name, description, price, salePrice, category, bestSeller } =
      product;

    // Card
    const card = document.createElement("div");
    card.className = "card";

    // Card image container
    const cardImgContainer = document.createElement("div");
    cardImgContainer.className = "card-img-container";
    card.appendChild(cardImgContainer);
    // Card image
    const cardImg = document.createElement("img");
    cardImg.src = image;
    cardImg.alt = name;
    cardImgContainer.appendChild(cardImg);

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
    buyButton.textContent = "Comprar";
    cardTextContainer.appendChild(buyButton);
    // Card Button Event
    buyButton.addEventListener("click", () => {
      addToCartCb(product);
    });

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
      }) => {
        const newProduct = new Product({
          id,
          name,
          description,
          price,
          salePrice,
          image,
          bestSeller,
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

  getProductsByCategory(categoryName) {
    return this.#products.filter(
      (product) => product.category === categoryName
    );
  }

  getProductsByName(name) {
    return this.#products.filter((product) => product.name === name);
  }
}

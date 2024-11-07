import { ProductService } from "./product.service.js";

export class ProductController {
  #productService;
  constructor() {
    this.#productService = new ProductService();
  }

  displayProducts(setLoading) {
    const products = this.#productService.getAllProducts();
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
          productContainer.appendChild(this.#createProductCard(product));
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

  #createProductCard({
    image,
    name,
    description,
    price,
    salePrice,
    category,
    bestSeller,
  }) {
    const card = document.createElement("div");
    card.className = "product-card";

    // Card image
    const cardImg = document.createElement("img");
    cardImg.src = image;
    cardImg.alt = name;
    card.appendChild(cardImg);

    // Card title
    const title = document.createElement("h3");
    title.textContent = name;
    card.appendChild(title);

    // Card price
    const cardPrice = document.createElement("p");
    if (salePrice) {
      const originalPrice = document.createElement("span");
      originalPrice.textContent = `$${price}`;
      originalPrice.style.textDecoration = "line-through";
      cardPrice.appendChild(originalPrice);

      const discountedPrice = document.createElement("span");
      discountedPrice.textContent = ` $${salePrice}`;
      discountedPrice.style.color = "red";
      cardPrice.appendChild(discountedPrice);
    } else {
      cardPrice.textContent = `$${price}`;
    }
    card.appendChild(cardPrice);

    return card;
  }
}


export class CategoryPromotion {
  constructor() {
    this.adContainer = document.getElementById("category-promotion");
    if (!this.adContainer) {
      console.error("El contenedor no se encuentra.");
    }
    this.currentTimeout = null;
  }

  show(selectedCategory) {
    if (!this.adContainer) return;

    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }

    this.adContainer.innerHTML = "";

    if (selectedCategory) {
      const adContent = document.createElement("div");
      adContent.className = "ad-content";
      const addImage = document.createElement("img");
      addImage.src = `../../../images/categories/${selectedCategory.image}`;
      addImage.alt = selectedCategory.name;
      adContent.appendChild(addImage);
      const closeAdBtn = document.createElement("button");
      closeAdBtn.textContent = "X";
      closeAdBtn.className = "close-ad-btn";
      closeAdBtn.addEventListener("click", () => {
        this.#hide();
      });
      adContent.appendChild(closeAdBtn);

      this.adContainer.appendChild(adContent);
    }

    this.adContainer.style.display = "flex";

    this.currentTimeout = setTimeout(() => {
      this.#hide();
    }, 10000);
  }

  #hide() {
    if (this.adContainer) {
      this.adContainer.style.display = "none";
      this.adContainer.innerHTML = "";
    }
  }
}

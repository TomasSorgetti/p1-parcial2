export class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    if (!this.modal) {
      console.error(`No se encontró el elemento de modal"`);
    }

    this.modalContent = document.createElement("div");
    this.modalContent.className = "modal-content";
    this.modal.appendChild(this.modalContent);

    this.modal.addEventListener("click", () => this.hide());
    this.modalContent.addEventListener("click", (event) =>
      event.stopPropagation()
    );

    this.closeButton = document.createElement("button");
    this.closeButton.className = "close-modal";
    this.closeButton.textContent = "X";
    this.closeButton.addEventListener("click", () => this.hide());
    this.modalContent.appendChild(this.closeButton);
  }

  show(contentGenerator) {
    this.modalContent.innerHTML = ""; // Limpia el contenido anterior
    this.modalContent.appendChild(this.closeButton); // Agrega el botón de cerrar
    const content = contentGenerator(); // Genera el contenido dinámico
    this.modalContent.appendChild(content);
    this.modal.classList.add("show");
  }

  hide() {
    this.modal.classList.remove("show");
    this.modalContent.innerHTML = ""; // Limpia el contenido
  }
}

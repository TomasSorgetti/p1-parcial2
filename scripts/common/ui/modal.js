export class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    if (!this.modal) {
      console.error(`No se encontró el elemento de modal"`);
    }

    this.isProcessing = false;

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

    document.addEventListener("keydown", (event) =>
      this.handleCloseWithKey(event)
    );
  }

  show(modalContent) {
    this.modalContent.innerHTML = "";
    this.modalContent.appendChild(this.closeButton);
    const content = modalContent();
    this.modalContent.appendChild(content);
    this.modal.classList.add("show");
  }

  setProcessing(processing) {
    this.isProcessing = processing;
  }

  hide() {
    if (this.isProcessing) {
      return;
    }
    this.modal.classList.remove("show");
    this.modalContent.innerHTML = "";
  }

  handleCloseWithKey(event) {
    if (
      event.key === "Escape" &&
      this.modal.classList.contains("show") &&
      !this.isProcessing
    ) {
      this.hide();
    }
  }
}

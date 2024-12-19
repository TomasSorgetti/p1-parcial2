export class FormField {
  constructor({
    type,
    name,
    label,
    placeholder,
    value,
    id,
    error = "",
    validate = [],
  }) {
    this.type = type;
    this.label = label;
    this.name = name;
    this.placeholder = placeholder;
    this.value = value;
    this.id = id;
    this.error = error;
    this.validate = validate;
  }

  createField() {
    const formField = document.createElement("div");
    formField.className = "form-field";

    // Label
    const label = document.createElement("label");
    label.textContent = this.label;
    formField.appendChild(label);

    // Input
    const input = document.createElement("input");
    input.id = this.id;
    input.type = this.type;
    input.name = this.name;
    input.placeholder = this.placeholder;
    input.addEventListener("blur", () => this.validateField(input));

    formField.appendChild(input);

    // Error
    this.errorField = document.createElement("small");
    this.errorField.className = "error-field";
    formField.appendChild(this.errorField);

    return formField;
  }

  validateField(input) {
    this.error = "";
    this.validate.forEach((validationFn) => {
      const errorMessage = validationFn(input.value);
      if (errorMessage) {
        this.error = errorMessage;
      }
    });

    this.errorField.textContent = this.error;
    return !this.error; // Retorna true si no hay errores
  }

  isValid() {
    const input = document.getElementById(this.id);
    return this.validateField(input);
  }
}

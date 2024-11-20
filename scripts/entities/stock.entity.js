export class Stock {
  constructor({ productId, quantity }) {
    if (quantity < 0) {
      throw new Error("La cantidad no puede ser negativa");
    }
    this.productId = productId;
    this.quantity = quantity;
  }

  increase(amount) {
    this.quantity += amount;
  }

  decrease(amount) {
    if (this.quantity - amount < 0) {
      throw new Error("La cantidad no puede ser negativa");
    }
    this.quantity -= amount;
  }
}

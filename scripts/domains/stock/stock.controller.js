import { StockService } from "./stock.service.js";

export class StockController {
  #stockService;
  constructor() {
    this.#stockService = new StockService();
  }

  getStockByProductId(productId) {
    try {
      return this.#stockService.getStockByProductId(productId);
    } catch (error) {
      console.log(error.message);
    }
  }

  updateStock(productId, quantity) {
    try {
      return this.#stockService.updateStock(productId, quantity);
    } catch (error) {
      console.log(error.message);
    }
  }
}

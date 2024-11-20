import { Stock } from "../../entities/stock.entity.js";
import { stockDataList } from "../../data/index.js";

export class StockService {
  #stockData;
  constructor() {
    this.#stockData = this.initStock();
  }

  initStock() {
    return stockDataList.map((stock) => new Stock(stock));
  }

  getStockByProductId(productId) {
    return this.#stockData.find((stock) => stock.productId === productId);
  }

  updateStock(productId, quantity) {
    const stock = this.getStockByProductId(productId);
    if (stock) {
      stock.quantity += quantity;
      return stock;
    }
    const newStock = new Stock({ productId, quantity });
    this.#stockData.push(newStock);
    return newStock;
  }
}

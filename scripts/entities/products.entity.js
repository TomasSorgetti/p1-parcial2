export class Product {
  constructor({
    id,
    name,
    description,
    price,
    salePrice,
    image,
    bestSeller,
    isFree,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.salePrice = salePrice;
    this.image = image;
    this.bestSeller = bestSeller;
    this.isFree = isFree;
    this.categories = [];
  }

  addCategory(categoryName) {
    this.categories.push(categoryName);
  }
}

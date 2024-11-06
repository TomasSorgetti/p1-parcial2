export class Product {
  constructor({
    id,
    name,
    description,
    price,
    salePrice,
    image,
    category,
    bestSeller,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.salePrice = salePrice;
    this.image = image;
    this.category = category;
    this.bestSeller = bestSeller;
  }
}

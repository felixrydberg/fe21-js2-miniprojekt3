export default class Products {
  #amount;
  #id;
  #name;
  #price;
  #url;
  constructor(amount, id, name, price, url) {
    this.#amount = amount;
    this.#id = id;
    this.#name = name;
    this.#price = price;
    this.#url = url;
  }
  getAmount() {
    return this.#amount;
  }
  getId() {
    return this.#id;
  }
  getName() {
    return this.#name;
  }
  getPrice() {
    return this.#price;
  }
  getUrl() {
    return this.#url;
  }
  setAmount(amount) {
    this.#amount = amount;
  }
}

// TODO:
// Egenskap:
// Privata variabler, amount name etc

// Metod:
// Setter 1
// 5x Getter Amount, name, price, url, id, Products

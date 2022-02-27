export class PatchObj {
  #amount;
  #discount;
  #id;
  #name;
  #price;
  #url;
  constructor(amount, discount, id, name, price, url) {
    this.#amount = amount;
    this.#discount = discount;
    this.#id = id;
    this.#name = name;
    this.#price = price;
    this.#url = url;
  }
}

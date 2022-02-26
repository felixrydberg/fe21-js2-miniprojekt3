export class PatchObj {
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
}

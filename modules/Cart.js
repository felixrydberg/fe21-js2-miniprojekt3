export default class Cart {
  #product = {
    id: undefined,
    name: undefined,
    price: undefined,
    items: undefined,
  };
  #cart = [];

  addToCart(product) {
    this.#product = product;
    this.#cart.push(this.#product);
  }

  removeProduct(index) {
    const { items } = this.#cart[index];
    if (items > 1) {
      this.#cart[index].items--;
    } else {
      this.#cart.splice(index, 1);
    }
  }
  showCart() {
    if (this.#cart.length === 0) {
      return -1;
    } else {
      return this.#cart;
    }
  }
  totalSum() {
    let total = 0;
    this.#cart.map((val) => {
      total += val.price * val.items;
    });
    return total;
  }
  finalizeTransaction() {
    this.#cart = [];
  }
}

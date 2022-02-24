export default class Cart {
  // Explicitly defining variables as undefined
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

  updateCart(index) {
    const { items } = this.#cart[index - 1];
    if (items > 1) {
      this.#cart[index].items--;
    } else {
      this.#cart.splice(index, 1);
    }
  }
  getCartItems() {
    if (this.#cart.length === 0) {
      return -1;
    } else {
      return this.#cart;
    }
  }
  getCartTotalSum() {
    let total = 0;
    this.#cart.map((val) => {
      total += val.price * val.items;
    });
    return total;
  }
  checkout() {
    this.#cart = [];
  }
}

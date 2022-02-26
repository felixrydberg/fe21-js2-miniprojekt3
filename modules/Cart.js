export default class Cart {
  // Explicitly defining variables as undefined
  #product = {
    id: undefined,
    name: undefined,
    price: undefined,
    items: undefined,
    url: undefined,
    amount: undefined,
  };

  #cart = [];

  addItem(product) {
    const index = this.#cart.findIndex((val) => val.id === product.id);

    if (index !== -1) {
      this.#cart[index].items++;
    } else {
      this.#product = product;
      this.#cart.push(this.#product);
    }
  }

  decrementItem(index) {
    const i = this.#cart.findIndex((val) => val.id === index);

    if (i !== -1) {
      if (this.#cart[i].items > 1) {
        this.#cart[i].items--;
      } else {
        this.#cart.splice(i, 1);
      }
    }
  }
  incrementItem(index) {
    const i = this.#cart.findIndex((val) => val.id === index);

    if (i !== -1) {
      if (this.#cart[i].items > 1) {
        this.#cart[i].items++;
      }
    }
  }
  removeItem(index) {
    const i = this.#cart.findIndex((val) => val.id === index);

    if (i !== -1) {
      this.#cart.splice(i, 1);
    }
  }
  getItems() {
    if (this.#cart.length === 0) {
      return -1;
    } else {
      return this.#cart;
    }
  }
  getTotalSum() {
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

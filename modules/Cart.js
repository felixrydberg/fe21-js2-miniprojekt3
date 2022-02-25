export default class Cart {
  // Explicitly defining variables as undefined
  #product = {
    id: undefined,
    name: undefined,
    price: undefined,
    items: undefined,
  };

  #cart = [];

  addItem(product) {
    const index = this.#cart.findIndex((val) => val.id === product.id);
    console.log(index);

    if (this.getItems() !== -1) {
      this.#product = product;
      this.#cart.push(this.#product);

      // this.#cart[index] =
    } else {
      this.#product = product;
      this.#cart.push(this.#product);
    }

    /* this.#cart.map((val) => {
       if (val.id === product.id) {
          product.items++;
          this.#product = product;
          this.#cart.splice(val, 1, this.#product);
        } 
      });*/
  }

  updateCart(index) {
    const { items } = this.#cart[index - 1];
    if (items > 1) {
      this.#cart[index].items--;
    } else {
      this.#cart.splice(index, 1);
    }
  }
  getItems() {
    if (this.#cart.length === 0) {
      return -1;
    } else {
      console.log(this.#cart);
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

// @ts-nocheck
import Cart from './modules/Cart.js';
import Products from './modules/Products.js';
import { firebase } from './modules/DB.js';

(function () {
  // Firebase object which enables updating database

  // On load, get data from database and create array of products
  (async () => {
    let products = [];

    await firebase
      .getData()
      .then((r) => r.json())
      .then((d) => {
        for (let key in d) {
          const { amount, id, name, price, url } = d[key];
          products.push(new Products(amount, id, name, price, url));
        }
      })
      .catch((error) => alert(`gaming: ${error}`));
    // Create instance of cart and send to button listeners

    const main = document.querySelector('main');

    for (let i in products) {
      const containerForCards = document.createElement('div');
      containerForCards.classList.add('product-card');

      const itemCard = document.createElement('div');
      itemCard.classList.add('card');

      const productName = document.createElement('h1');
      productName.innerText = products[i].getName();

      const currentStock = document.createElement('p');
      currentStock.innerText = products[i].getAmount();

      const itemPrice = document.createElement('p');
      itemPrice.innerText = products[i].getPrice();

      const productImage = document.createElement('img');
      productImage.setAttribute('src', products[i].getUrl());
      productImage.setAttribute('alt', products[i].getName());

      const button = document.createElement('button');
      button.classList.add('cartbtn');
      button.setAttribute('value', products[i].getId());
      button.innerText = 'Add to cart';

      containerForCards.appendChild(productName);
      itemCard.appendChild(productImage);
      itemCard.appendChild(itemPrice);
      itemCard.appendChild(currentStock);
      itemCard.appendChild(button);
      containerForCards.append(itemCard);

      main.appendChild(containerForCards);
    }
    clickEvent(products);
  })();

  const clickEvent = (products) => {
    const buttons = document.querySelectorAll('.cartbtn');
    const cart = new Cart();
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        addItemToCart(cart, products, button.value);
      });
    });
  };
  const addItemToCart = (cart, products, index) => {
    cart.addItem({
      id: products[index - 1].getId(),
      name: products[index - 1].getName(),
      price: products[index - 1].getPrice(),
      items: 1,
    });
    checkoutPanel(cart, index);
    updateStorage(products, cart, index);
  };

  const checkoutPanel = (cart, ...arg) => {
    // This snippet is for removing/decrement item from cart
    /* if (cart.getItems() !== -1) {
      cart.updateCart(parseInt(arg));
    } */
  };

  // Function to update storage tally.
  const updateStorage = (products, cart, index) => {
    const i = cart
      .getItems()
      .findIndex((val) => val.id === products[index - 1].getId());

    for (let index in products) {
      if (i !== -1) {
        products[i].setAmount(
          products[index].getAmount() - cart.getItems()[i].items
        );
      }
    }
    console.log(products[i].getId(), products[i].getAmount());
  };
})();

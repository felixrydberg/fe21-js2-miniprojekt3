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
      currentStock.innerText = `Lager: ${products[i].getAmount()}`;

      const itemPrice = document.createElement('p');
      itemPrice.innerText = `${products[i].getPrice()} kr`;

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
    shoppingCart(cart);
    updateStorage(products, cart, index);
  };

  // Create and populate sho
  const shoppingCart = (cart) => {
    const parent = document.querySelector('.nav-cart');
    parent.classList.add('hidden');
    const ul = document.createElement('ul');
    ul.classList.add('cart-list');
    while (parent.firstChild) {
      parent.removeChild(parent.lastChild);
    }

    for (let key in cart.getItems()) {
      const { id, name, price, items } = cart.getItems()[key];

      const container = document.createElement('li');

      const itemContainer = document.createElement('ul');
      itemContainer.classList.add('item-container');

      const nameDiv = document.createElement('li');
      nameDiv.innerText = name.toUpperCase();

      const priceDiv = document.createElement('li');
      priceDiv.classList.add('product-items');
      priceDiv.innerText = price;

      const amount = document.createElement('li');
      amount.classList.add('product-items');
      amount.innerText = items;

      const increment = document.createElement('button');
      increment.innerText = '+';
      increment.setAttribute('value', id);
      increment.classList.add('countbtn');
      increment.addEventListener('click', () => {
        cart.incrementItem(id);
        shoppingCart(cart);
      });

      const decrement = document.createElement('button');
      decrement.innerText = '-';
      decrement.setAttribute('value', id);
      decrement.classList.add('countbtn');
      decrement.addEventListener('click', () => {
        cart.decrementItem(id);
        shoppingCart(cart);
      });

      const remove = document.createElement('button');
      remove.innerText = 'X';
      remove.setAttribute('value', id);
      remove.classList.add('countbtn');
      remove.addEventListener('click', () => {
        cart.removeItem(id);
        shoppingCart(cart);
      });

      itemContainer.appendChild(nameDiv);
      itemContainer.appendChild(priceDiv);
      itemContainer.appendChild(increment);
      itemContainer.appendChild(amount);
      itemContainer.appendChild(decrement);
      itemContainer.appendChild(remove);
      container.appendChild(itemContainer);
      ul.appendChild(container);
    }
    parent.appendChild(ul);

    if (cart.getItems() !== -1) {
      parent.addEventListener('click', () => {
        document.querySelector('.nav-cart ul').style.display = 'block';
      });
    }
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

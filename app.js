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
    checkoutPanel(cart);

    //////////////////////////

    checkout(cart);

    //////////////////////////

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
      url: products[index - 1].getUrl(),
      amount: products[index - 1].getAmount(),
    });
    checkoutPanel(cart);

    //////////////////////////

    checkout(cart);

    //////////////////////////

    updateStorage(products, cart, index);
  };

  const checkoutPanel = (cart) => {
    const items = cart.getItems();
    console.log(items);
    if (items === -1) {
    } else {
      const parent = document.querySelector('.nav-cart');
      const ul = document.createElement('ul');
      ul.classList.add('cart-list');
      while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
      }
      const cartitems = cart.getItems();
      console.clear();
      console.log(cartitems);

      for (let key in cartitems) {
        const container = document.createElement('li');

        const itemContainer = document.createElement('ul');
        itemContainer.classList.add('item-container');

        const name = document.createElement('li');
        name.innerHTML = cartitems[key].name;

        const price = document.createElement('li');
        price.innerHTML = cartitems[key].price;

        const amount = document.createElement('li');
        amount.innerHTML = cartitems[key].items;

        const increment = document.createElement('button');
        increment.innerHTML = '+';
        increment.setAttribute('value', cartitems[key].id);
        increment.addEventListener('click', function () {
          //Add number of items on this item
        });

        const decrement = document.createElement('button');
        decrement.innerHTML = '-';
        decrement.setAttribute('value', cartitems[key].id);
        decrement.addEventListener('click', function () {
          //Remove one number of items on this item
        });

        const remove = document.createElement('button');
        remove.innerHTML = 'X';
        remove.setAttribute('value', cartitems[key].id);
        remove.addEventListener('click', function () {
          //Remove item from cart
        });

        itemContainer.appendChild(name);
        itemContainer.appendChild(price);
        itemContainer.appendChild(increment);
        itemContainer.appendChild(amount);
        itemContainer.appendChild(decrement);
        itemContainer.appendChild(remove);
        container.appendChild(itemContainer);
        ul.appendChild(container);
      }
      parent.appendChild(ul);
      parent.addEventListener('click', function () {
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

  const checkout = (cart) => {
    console.log(cart);
    for (let key in cart) {
      const { amount, id, name, price, url } = cart[key];
      console.log(amount, id, name, price, url);
    }

    // await patchData();
  };
})();

// @ts-nocheck
import Cart from './modules/Cart.js';
import Products from './modules/Products.js';

(function () {
  // On load, get data from database and create array of products
  (async () => {
    let products = [];

    await fetch(
      'https://shoppingsite-457c2-default-rtdb.europe-west1.firebasedatabase.app/.json'
    )
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
      id: products[index].getId(),
      name: products[index].getName(),
      price: products[index].getPrice(),
      items: 1,
    });
    checkoutPanel(cart);
  };

  const checkoutPanel = (cart) => {};
})();

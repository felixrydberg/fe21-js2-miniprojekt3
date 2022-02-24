import Cart from './modules/Cart.js';
import Products from './modules/Products.js';

(function () {
  (async function () {
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
        spawnProducts(products);
      })
      .catch((error) => alert(`gaming: ${error}`));
  })();

  function spawnProducts(products) {
    const main = document.querySelector('main');

    for (let i in products) {
      const containerForCards = document.createElement('div');
      containerForCards.classList.add('product-card');
      containerForCards.setAttribute('id', products[i].getId());

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
      button.innerText = 'BUY';

      containerForCards.appendChild(productName);
      itemCard.appendChild(productImage);
      itemCard.appendChild(itemPrice);
      itemCard.appendChild(currentStock);
      itemCard.appendChild(button);
      containerForCards.append(itemCard);

      main.appendChild(containerForCards);
    }
  }
})();

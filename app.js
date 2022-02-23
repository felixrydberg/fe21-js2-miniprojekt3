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

  function spawnProducts(data) {}
})();

import Cart from './modules/Cart.js';
import Products from './modules/Products.js';

(function () {
  (function () {
    let products = [];
    fetch(
      'https://shoppingsite-457c2-default-rtdb.europe-west1.firebasedatabase.app/.json'
    )
      .then((r) => r.json())
      .then((d) => {
        for (let key in d) {
          // console.log(d[key]);
          const { amount, id, name, price, url } = d[key];
          const product = new Products(amount, id, name, price, url);
          products.push(product);
        }
      })
      .catch();
    products.map((e) => console.log(e.id));
    console.log('this work?');
  })();
})();

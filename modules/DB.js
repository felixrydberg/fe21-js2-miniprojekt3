export const firebase = {
  url: 'https://shoppingsite-457c2-default-rtdb.europe-west1.firebasedatabase.app/.json',

  getData: async function () {
    return await fetch(this.url);
  },
  patchData: async function (data) {
    return await fetch(this.url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  },
};

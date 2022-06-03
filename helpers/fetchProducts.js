// const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const fetchProducts = async (product) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    return data;

    // const response = await fetch(`${url}${product}`);
    // const data = await response.json();
    // console.log(data.results);
    // return data.results;
  } catch (error) {
    return error;
  }
  // console.log(data);
};
fetchProducts('computador');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
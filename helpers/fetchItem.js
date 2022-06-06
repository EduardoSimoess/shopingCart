const fetchItem = async (id) => {
try {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
} catch (error) {
  return error;
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

const saveCartItems = (item) => {
  if (item === undefined) {
    throw new Error('Preencha o parâmtro!');
  }
    localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

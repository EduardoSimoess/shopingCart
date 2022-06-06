const saveCartItems = (item) => {
  if (item === undefined) {
    throw new Error('Preencha o parâmtro!');
  }
    localStorage.setItem('cartItems', item);
};
// const saveCartItems = (cartItemsHtml) => localStorage.setItem('cartItems', cartItemsHtml);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

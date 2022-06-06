const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Deveria pergar o item salvo', () => {
    expect.assertions(1);

    getSavedCartItems('item');
    expect(localStorage.getItem).toBeCalled();
  });

  it('Deveria pergar o item salvo', () => {
    expect.assertions(1);
    
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});

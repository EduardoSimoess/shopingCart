const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Deveria ser chamado o comando setItem', () => {
    expect.assertions(1);

    saveCartItems('Item');
    expect(localStorage.setItem).toBeCalled();
  });

  it('Deveria ser chamado o comando setItem com os parâmetros "cartItems" e "Item"', () => {
    expect.assertions(1);

    saveCartItems('Item');
    expect(localStorage.setItem).toBeCalledWith('cartItems', 'Item');
  });

  it('Deveria ser retornado um erro!', () => {
    expect.assertions(1);

    expect(() => saveCartItems()).toThrow('Preencha o parâmtro!');
  });
});

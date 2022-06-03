require('../mocks/fetchSimulator');
const {
  fetchProducts
} = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Deveria ser uma função', async () => {
    expect.assertions(1);

    expect(typeof fetchProducts).toBe('function');
  });

  it('Deveria ter sido chamada a função fetch', async () => {
    expect.assertions(1);

    const response = await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });

  it('Deveria usar o fetch com o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(1);

    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(url);
  });

  it('Deveria retornar o objeto computadorSearch ao se burcar computador', async () => {
    expect.assertions(1);

    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });

  it('Deveria retornar o err "You must provide an url" caso não seja inserido nenhum argumento', async () => {
    await expect(fetchProducts()).resolves.toEqual(new Error('You must provide an url'));
  })
});
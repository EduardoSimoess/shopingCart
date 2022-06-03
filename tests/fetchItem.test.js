require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Deveria ser uma função', () => {
    expect.assertions(1);
    
    expect(typeof fetchItem).toBe('function');
  })

  it('Deveria ter sido chamada a função fetch', async () => {
    expect.assertions(1);

    const response = await fetchItem('LB1615760527');
    expect(fetch).toBeCalled();
  });

  it('Deveria usar o fetch com o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(1);

    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  });

  it('Deveria retornar "item" ao buscar o id', async () => {
    expect.assertions(1);

    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });

  it('Deveria retornar o erro "You must provide an url" caso não seja inserido nenhum argumento', async () => {
    await expect(fetchItem()).resolves.toEqual(new Error('You must provide an url'));
  })
});

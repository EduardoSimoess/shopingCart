// const { fetchItem } = require("./helpers/fetchItem");
const list = document.querySelector('.cart__items');
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {};
const payPrice = () => {
  let cost = 0;
  const listItems = document.getElementsByClassName('cart__item');
  for (let index = 0; index < listItems.length; index += 1) {
  const item = (document.getElementsByClassName('cart__item')[index]).innerText;
  const price = Number(item.split('$')[1]);
  console.log(price);
  cost += price;
}
const other = document.getElementsByClassName('total-price');
if (other.length > 0) {
other[0].remove();
}
const priceHtml = document.createElement('div');
priceHtml.className = 'total-price';
const priceString = cost.toString();
priceHtml.innerText = priceString;
const cart = document.querySelector('.cart');
cart.appendChild(priceHtml);
};

let counter = 0;
if (JSON.parse(localStorage.getItem('counter')) === null) {
  counter = 0;
} else {
  counter = JSON.parse(localStorage.getItem('counter'));
}

const createCartItemElement = async ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', async () => {
    li.remove();
    localStorage.clear();
    const others = document.getElementsByClassName('cart__item');
    for (let index = 0; index < others.length; index += 1) {
     localStorage.setItem(index, others[index].innerHTML);
    }
    cost = 0;
    await payPrice();
  });
  return li;
};

const printProducts = async () => {
  const obj = await fetchProducts('computador');
  const array = obj.results;
  array.forEach(({ id, title, thumbnail }) => {
    const product = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    const item = createProductItemElement(product);
    const lista = document.querySelector('.items');
    lista.appendChild(item);
  });
};

const envelope = async (array) => {
  array.forEach(async ({ id, title }, index) => {
    const button = document.getElementsByClassName('item__add')[index];
    const itemSku = (document.getElementsByClassName('item__sku')[index]).innerText;
    const priceObj = await fetchItem(itemSku);
    const { price } = priceObj;
    const objData = { sku: id, name: title, salePrice: price };
    const li = await createCartItemElement(objData);
    button.addEventListener('click', async () => {
      list.appendChild(li);
      saveCartItems(li.innerHTML);
      const items = getSavedCartItems('cartItems');
      localStorage.setItem(counter, items);
      counter += 1;
      payPrice();
    });
  });
};
const printPrice = async () => {
  const obj = await fetchProducts('computador');
  const array = obj.results;
  await envelope(array);
};

const get = () => {
  for (let index = 0; index <= 10; index += 1) {
    const nova = getSavedCartItems(index);
    const item = document.createElement('li');
    item.innerText = nova;
    if (nova !== null) { 
      list.appendChild(item);
      item.addEventListener('click', () => {
        item.remove();
        localStorage.removeItem(index);
      });
    }
  }
  localStorage.removeItem('cartItems');
};

localStorage.setItem('counter', JSON.stringify(counter));
window.onload = async () => {
  await printProducts();
  await printPrice();
  get();
};
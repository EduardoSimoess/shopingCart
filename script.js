// const { fetchProducts } = require('./helpers/fetchProducts');

// const { fetchItem } = require("./helpers/fetchItem");

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

const cartItemClickListener = (event) => {
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => {
    li.remove();
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
const list = document.querySelector('.items');
list.appendChild(item);
});
};

const printPrice = async () => {
  const obj = await fetchProducts('computador');
  const array = obj.results;
  array.forEach(async ({ id, title }, index) => {
  const button = document.getElementsByClassName('item__add')[index];
  const itemSku = (document.getElementsByClassName('item__sku')[index]).innerText;
  const priceObj = await fetchItem(itemSku);
  const { price } = priceObj;
  const objData = {
  sku: id,
  name: title, 
  salePrice: price,
  };
  const li = createCartItemElement(objData);
  button.addEventListener('click', () => {
  const list = document.querySelector('.cart__items');
  list.appendChild(li);
  });
  });
};

window.onload = async () => { 
  // fetchProducts('computador');
  await printProducts();
  // fetchItem('MLB1615760527');
  await printPrice();
};

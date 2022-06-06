// const { fetchProducts } = require('./helpers/fetchProducts');

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

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

const cartItemClickListener = (event) => {};
let counter = 0;
const click = () => {
  
}
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => {
    li.remove();
    localStorage.clear();
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
    const objData = { sku: id,
      name: title,
      salePrice: price,
    };
    const li = createCartItemElement(objData);
    button.addEventListener('click', () => {
      const list = document.querySelector('.cart__items');
      list.appendChild(li);
      saveCartItems(li.innerHTML);
      const items = getSavedCartItems('cartItems');
      localStorage.setItem(counter, items);
      counter += 1;
      // get();
      // if(counter > 1) {
      //   list.removeChild(list.firstElementChild);
      // }
    });
  });
};

// const saveList = () => {
//   const list = document.getElementsByClassName('cart__item');
//   console.log(list);
//   saveCartItems(list);
// };
const get = () => {
  for (let index = 0; index <= 10; index += 1) {
    const nova = getSavedCartItems(index);
    const item = document.createElement('li');
    item.innerText = nova;
    console.log(item);
    const list = document.querySelector('.cart__items');
    list.appendChild(item);
    item.addEventListener('click', () => {
      item.remove();
      localStorage.removeItem(index);
    });
  }
  localStorage.removeItem('cartItems');
};
window.onload = async () => {
  // fetchProducts('computador');
  await printProducts();
  // fetchItem('MLB1615760527');
  await printPrice();
  // saveList();
  get();
};
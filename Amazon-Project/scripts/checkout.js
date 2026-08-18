import { cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateCartQuantity } from "./utils/quantity.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";


dayjs();

let checkoutDisplay = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingItem;
  
  products.forEach((product) => {
    if (productId === product.id) {
       matchingItem = product;
    } 
  });

  checkoutDisplay += 
    `<div class="cart-item-container js-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id = ${matchingItem.id}>
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingItem.id}" data-product-id = ${matchingItem.id}>
            <span class="save-quantity-link link-primary js-save-link" data-product-id = ${matchingItem.id}>Save</span>
            <span class="delete-quantity-link link-primary   js-delete-link" data-product-id = ${matchingItem.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-1-${productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-1-${productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-1-${productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`

  document.querySelector('.js-order-summary').innerHTML = checkoutDisplay;
});


const deleteLink = document.querySelectorAll('.js-delete-link');

deleteLink.forEach((link) => {
   link.addEventListener('click', () => {
    const {productId} = link.dataset;
		removeFromCart(productId);
    updateCartQuantity(quantityLink);
    if (quantityLink.innerHTML === ' ') {
      quantityLink.innerHTML = '';
    } else if (quantityLink.innerHTML === '1') {
      quantityLink.innerHTML += ' item';
    } else {
      quantityLink.innerHTML += ' items';
  }  
	 });
});




const updateLink = document.querySelectorAll('.js-update-link');
updateLink.forEach((link) => {
  link.addEventListener('click', () => {
    const {productId} = link.dataset;
    const container = document.querySelector(`.js-container-${productId}`);
    
    container.classList.add('is-editing-quantity');

  })
})


const saveLink = document.querySelectorAll('.js-save-link');
saveLink.forEach((link) => {
  link.addEventListener('click', () => {
     finalQuantityUpdate(link);
  });
})


const dd = document.querySelectorAll(`.quantity-input`);
dd.forEach((ddd) => {
  ddd.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
       finalQuantityUpdate(ddd);
    }
  })
})




const quantityLink = document.querySelector('.js-quantity-link');
updateCartQuantity(quantityLink);
if (quantityLink.innerHTML === ' ') {
    quantityLink.innerHTML = '';
  } else if (quantityLink.innerHTML === '1') {
    quantityLink.innerHTML += ' item';
  } else {
    quantityLink.innerHTML += ' items';
 }


 function finalQuantityUpdate(elem) {
  const {productId} = elem.dataset;
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    updateQuantity(productId, newQuantity);
    updateCartQuantity(quantityLink);
    if (quantityLink.innerHTML === ' ') {
    quantityLink.innerHTML = '';
  } else if (quantityLink.innerHTML === '1') {
    quantityLink.innerHTML += ' item';
  } else {
    quantityLink.innerHTML += ' items';
  }
 }

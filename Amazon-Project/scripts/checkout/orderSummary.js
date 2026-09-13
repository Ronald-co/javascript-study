// import { cart, removeFromCart, updateDeliveryDate, updateQuantity } from "../../data/cart.js";
import { calculateDeliveryDate, deliveryOption } from "../../data/deliveryOption.js";
import { getProducts, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { updateCartQuantity } from "../utils/quantity.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { paymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { Cart } from "../../data/cart-class.js";


export function renderOrderSummaryHTML() {
  const cart = new Cart('cart');
  let checkoutDisplay = '';
  //Added an if else statement to fix display bug
  if (!cart.cartItems) {
    checkoutDisplay = '';
  } else {
    cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingItem = getProducts(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOptionn;
    
    deliveryOption.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOptionn = option
      }
    });

  
    checkoutDisplay += 
      `<div class="cart-item-container js-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: ${calculateDeliveryDate(deliveryOptionn)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-price">
              ${matchingItem.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
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

          <div class="delivery-options js-delivery-option">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(productId, cartItem)}
          </div>
        </div>
      </div>`
  });
  

    document.querySelector('.js-order-summary').innerHTML = checkoutDisplay;
  };


  const deleteLink = document.querySelectorAll('.js-delete-link');
  deleteLink.forEach((link) => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset;
      cart.removeFromCart(productId);
      renderCheckoutHeader();
      renderOrderSummaryHTML();
      paymentSummary();
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
      renderOrderSummaryHTML();
      paymentSummary();
    });
  })


  const dd = document.querySelectorAll(`.quantity-input`);
  dd.forEach((ddd) => {
    ddd.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        finalQuantityUpdate(ddd);
        renderOrderSummaryHTML();
        paymentSummary();
      }
    })
  })


  const deliveryButton = document.querySelectorAll('.js-delivery-button');
  deliveryButton.forEach((button) => {
    const{productId, deliveryOptionId} = button.dataset;
    button.addEventListener('click', () => {
      cart.updateDeliveryDate(productId, deliveryOptionId);
      renderOrderSummaryHTML();
      paymentSummary();
    })
  });
}


 function finalQuantityUpdate(elem) {
  const cart = new Cart('cart');
  const {productId} = elem.dataset;
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    cart.updateQuantity(productId, newQuantity);
    renderCheckoutHeader();
 }

 function deliveryOptionsHTML(productId, cartItem) {
  let html = '';

  deliveryOption.forEach((option) => { 
    const priceString = option.priceCents === 0
    ? 'FREE'
    : `$${formatCurrency(option.priceCents)} -`
    const isChecked = option.id === cartItem.deliveryOptionId;


    html += 
    `<div class="delivery-option js-delivery-button"
      data-product-id = ${productId}
      data-delivery-option-id = ${option.id}
    >
      <input type="radio" 
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-1-${productId}">
      <div>
        <div class="delivery-option-date">
          ${calculateDeliveryDate(option)}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>`
});
 return html;
}


 



  
  
  
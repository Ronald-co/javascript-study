import { calculateDeliveryDate, deliveryOption } from "../../data/deliveryOption.js";
import { getProducts, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { paymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummaryHTML(cart) {
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
      `<div class="cart-item-container 
      js-cart-item-container js-cart-item-container-${matchingItem.id} js-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: ${calculateDeliveryDate(deliveryOptionn)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name js-name-${matchingItem.id}">
              ${matchingItem.name}
            </div>
            <div class="product-price js-price-${matchingItem.id}">
              ${matchingItem.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingItem.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id = ${matchingItem.id}>
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingItem.id}" data-product-id = ${matchingItem.id}>
              <span class="save-quantity-link link-primary js-save-link" data-product-id = ${matchingItem.id}>Save</span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingItem.id}"
               data-product-id = ${matchingItem.id}>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options js-delivery-option js-delivery-test-${productId}-${cartItem.deliveryOptionId}">
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
      // const container = document.querySelector(`.js-container-${productId}`);
      cart.removeFromCart(productId);
      // container.remove();
      renderCheckoutHeader(cart);
      renderOrderSummaryHTML(cart);
      paymentSummary(cart);
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
      finalQuantityUpdate(link, cart);
      renderOrderSummaryHTML(cart);
      paymentSummary(cart);
    });
  })


  const dd = document.querySelectorAll(`.quantity-input`);
  dd.forEach((ddd) => {
    ddd.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        finalQuantityUpdate(ddd, cart);
        renderOrderSummaryHTML(cart);
        paymentSummary(cart);
      }
    })
  })


  const deliveryButton = document.querySelectorAll('.js-delivery-button');
  deliveryButton.forEach((button) => {
    const{productId, deliveryOptionId} = button.dataset;
    button.addEventListener('click', () => {
      cart.updateDeliveryDate(productId, deliveryOptionId);
      renderOrderSummaryHTML(cart);
      paymentSummary(cart);
    })
  });
}


 function finalQuantityUpdate(elem, cart) {
  // const cart = new Cart('cart');
  const {productId} = elem.dataset;
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    cart.updateQuantity(productId, newQuantity);
    renderCheckoutHeader(cart);
 }

 function deliveryOptionsHTML(productId, cartItem) {
  let html = '';

  deliveryOption.forEach((option) => { 
    const priceString = option.priceCents === 0
    ? 'FREE'
    : `$${formatCurrency(option.priceCents)} -`
    const isChecked = option.id === cartItem.deliveryOptionId;


    html += 
    `<div class="delivery-option js-delivery-button js-delivery-test-${productId}-${option.id}"
      data-product-id = ${productId}
      data-delivery-option-id = ${option.id}
    >
      <input type="radio" 
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input js-input-test-${productId}-${option.id}"
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


 



  
  
  
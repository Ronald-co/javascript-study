import "../../data/cart-class.js";
import { products } from "../../data/products.js";
import { deliveryOption } from "../../data/deliveryOption.js"
import { formatCurrency } from "../utils/money.js"
import {cartt } from "../../data/cart-class.js";
import { addOrder } from "../../data/orders.js";




export function paymentSummary(cart) {
let itemPrice = 0;
let shippingCost = 0;
let quantity = 0;
// const cart = new Cart('cart');

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    quantity += cartItem.quantity
    let matchingItem;
    let shipping;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingItem = product;
      } 
    });
    itemPrice += (cartItem.quantity*matchingItem.priceCents);

    deliveryOption.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        shipping = option;
      }
    });
    shippingCost += shipping.priceCents;    
  })
  const totalBeforeTax = itemPrice + shippingCost;
  const estimatedTax = totalBeforeTax* 0.1;
  const orderTotal = totalBeforeTax + estimatedTax;
  
    
  
  document.querySelector('.js-payment-summary')
     .innerHTML=
  `<div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div class= "js-payment-items">
        Items (${quantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(itemPrice)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shipping-price-test">$${formatCurrency(shippingCost)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-order-total-price-test">$${formatCurrency(orderTotal)}</div>
      </div>

      <button class="place-order-button button-primary js-place-order-button">
        Place your order
      </button>
    </div>
  </div>`;


  document.querySelector('.js-place-order-button')
    .addEventListener('click', async () => {
      try{
         const response = await fetch('https://supersimplebackend.dev/orders', {
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cartt
          })
        });
        const order = await response.json();
        addOrder(order);
        }
      catch(error){
        console.log('Unexpected error. Please try again later');
      } 
      window.location.href = 'orders.html';
  });
}

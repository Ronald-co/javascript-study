import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import { updateCartQuantity } from "./utils/quantity.js";
import { cartt } from "../data/cart-class.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";


async function loadPage (){
  await loadProductsFetch();
  renderTrackingPage();
}

loadPage();


function renderTrackingPage () {

  const url = new URL (window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  const matchingItem = getProduct(productId);
  let matchingOrder;
  let trackingDisplay = '';
  let quantity;
  let deliveryTime;

  orders.forEach((order) => {
    if (order.id === orderId){
      matchingOrder = order;
    }
  })
 
    
  matchingOrder.products.forEach((product) => {
    if(product.productId === productId){
      quantity = product.quantity;
      deliveryTime = product.estimatedDeliveryTime;
    }
  })  

  const percentProgress = ((dayjs() - dayjs(matchingOrder.orderTime)) / (dayjs(deliveryTime) - dayjs(matchingOrder.orderTime))) * 100;


  trackingDisplay += `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${dayjs(deliveryTime).format('dddd, MMMM D')}
      </div>

      <div class="product-info">
        ${matchingItem.name}
      </div>

      <div class="product-info">
        Quantity: ${quantity}
      </div>

      <img class="product-image" src="${matchingItem.image}">

      <div class="progress-labels-container">
        <div class="progress-label preparing-label">
          Preparing
        </div>
        <div class="progress-label shipped-label">
          Shipped
        </div>
        <div class="progress-label delivered-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style = "width: ${percentProgress}%"></div>
      </div>
    </div>
  `
  document.querySelector('.js-tracking').innerHTML = trackingDisplay;

  if (percentProgress < 50) {
    document.querySelector('.preparing-label').classList
     .add('current-status');
  } else if (percentProgress < 100) {
    document.querySelector('.shipped-label').classList
     .add('current-status');
  } else {
    document.querySelector('.delivered-label').classList
     .add('current-status');
  }


  const cartQuantity = document.querySelector('.js-cart-quantity');
   updateCartQuantity(cartQuantity, cartt);
}










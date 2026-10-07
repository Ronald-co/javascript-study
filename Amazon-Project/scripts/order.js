import { orders } from "../data/orders.js";
import { getProducts, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";



async function loadPage () {
  try{ 
    await loadProductsFetch() 
  } catch (error){
    console.log('Unexpected error. Please try again later');
    console.log(error);
  }
 renderOrdersHTML();
}

loadPage();

function renderOrdersHTML() {

  let orderDisplay = '';
  
  orders.forEach((order) => {
  let orderTime = dayjs(order.orderTime).format('dddd, MMMM D');
  const orderId = order.id;
  let productDetails= '';
  
   order.products.forEach((product) => {
    const productId = product.productId;
    const matchingItem = getProducts(productId);
    let estimatedDeliveryTime = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');


    productDetails += `
      <div class="product-image-container">
        <img src="${matchingItem.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingItem.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${estimatedDeliveryTime}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `
  });
  
  

  orderDisplay += `
   <div class="order-container js-order-container-${orderId}">
          
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderId}</div>
        </div>
      </div>
      <div class="order-details-grid js-order-details-${orderId}"> ${productDetails}
      </div>
    </div>
  `  
})
    document.querySelector('.js-order-grid').innerHTML = orderDisplay;
}



import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import { Cart, cartt } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products.js";
// import "../data/backend-practice.js"
 


// loadProducts(() => {
//   renderOrderSummaryHTML(cartt);
//   paymentSummary(cartt);
//   renderCheckoutHeader(cartt);
// });

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   });
// }).then(() => {
//   renderOrderSummaryHTML(cartt);
//   paymentSummary(cartt);
//   renderCheckoutHeader(cartt);
// })

async function loadPage () {
  try{ 
    await loadProductsFetch() 
  } catch (error){
    console.log('Unexpected error. Please try again later');
    console.log(error);
  }
  
  renderOrderSummaryHTML(cartt);
  paymentSummary(cartt);
  renderCheckoutHeader(cartt);
}

loadPage();

// loadProductsFetch().then(() => {
//   renderOrderSummaryHTML(cartt);
//   paymentSummary(cartt);
//   renderCheckoutHeader(cartt);
// })

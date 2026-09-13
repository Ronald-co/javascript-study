import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js' 



renderOrderSummaryHTML();
paymentSummary();
renderCheckoutHeader();
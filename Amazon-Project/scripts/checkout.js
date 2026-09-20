import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import { Cart, cartt } from "../data/cart-class.js";
 



renderOrderSummaryHTML(cartt);
paymentSummary(cartt);
renderCheckoutHeader(cartt);
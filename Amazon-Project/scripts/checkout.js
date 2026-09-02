import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummaryHTML } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js"



renderOrderSummaryHTML();
paymentSummary();
renderCheckoutHeader();
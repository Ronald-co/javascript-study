import { cart } from "../../data/cart.js";

export function updateCartQuantity(domElem) {
  let quantity = 0;
    cart.forEach((cartItem) => {
    quantity += cartItem.quantity
    });

    if (quantity === 0) {
      quantity = ' ';
    }
  domElem.innerHTML = quantity;
}
// import { cart } from "../../data/cart.js";
import { Cart } from "../../data/cart-class.js";


export function updateCartQuantity(domElem) {
  const cart = new Cart('cart');
  let quantity = 0;
    cart.cartItems.forEach((cartItem) => {
    quantity += cartItem.quantity
    });

    if (quantity === 0) {
      quantity = ' ';
    }
  domElem.innerHTML = quantity;
}
import { updateCartQuantity } from "../utils/quantity.js";

export function renderCheckoutHeader(cart) {

  document.querySelector('.js-checkout-header')
   .innerHTML = `
    Checkout (<a class="return-to-home-link js-quantity-link"
    href="amazon.html"></a>)
   `

  const quantityLink = document.querySelector('.js-quantity-link');
  updateCartQuantity(quantityLink, cart);
  formatItem(quantityLink);
}

function formatItem (quantityLink){
  if (quantityLink.innerHTML === ' ') {
    quantityLink.innerHTML = '';
  } else if (quantityLink.innerHTML === '1') {
    quantityLink.innerHTML += ' item';
  } else {
    quantityLink.innerHTML += ' items';
  }
 }
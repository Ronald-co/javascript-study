import { products } from "../data/products.js";
import { updateCartQuantity } from "./utils/quantity.js";
import { Cart, cartt } from "../data/cart-class.js";

let productDisplay='';
  products.forEach((product) => {
    const html = `
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-message-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = "${product.id}">
        Add to Cart
      </button>
    </div>
`;

    productDisplay += html;
  });
  const display =  document.querySelector('.js-products-grid');
  display.innerHTML= productDisplay;
  

  const cartQuantity = document.querySelector('.js-cart-quantity');
  updateCartQuantity(cartQuantity, cartt);

  const timeout = {};
  function addedMessage(productId) {
    const message = document.querySelector(`.js-added-message-${productId}`);
    clearTimeout(timeout[productId]);

    message.classList.add('addedMessage');
     timeout[productId] = setTimeout(() => {
      message.classList.remove('addedMessage');
    }, 2000);
  }



  

  const cartAddButton = document.querySelectorAll('.js-add-to-cart-button');
    cartAddButton.forEach((button) => {
      button.addEventListener('click', () => {
      const {productId} = button.dataset;
      cartt.addToCart(productId);
      updateCartQuantity(cartQuantity, cartt);
      addedMessage(productId);   
    });
  });


 
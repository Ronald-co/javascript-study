import { renderOrderSummaryHTML } from "../../scripts/checkout/orderSummary.js";
import { Cart } from "../../data/cart-class.js";

describe('test suite: renderOrderSummary', () => {

  const productId1 = 'id001';
  const productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    // spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
        },
        {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '3'
        }
      ]);
    });
  })

  afterEach(() => {
   document.querySelector('.js-test-container').innerHTML=``;
  });

  it('displays the cart', () => {
    document.querySelector('.js-test-container').innerHTML= `
      <div class= "js-order-summary"></div>
    `;    
    const cart = new Cart('cart-test');
    renderOrderSummaryHTML(cart);

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    expect(document.querySelector(`.js-name-${productId1}`).innerText).toEqual('Umbrella');
    expect(document.querySelector(`.js-price-${productId1}`).innerText).toEqual('$2.00');
    });



  it('removes a product', () => {
    document.querySelector('.js-test-container').innerHTML= `
    <div class= "js-order-summary"></div>
    <div class= "js-payment-summary"></div>
    <div class= "js-checkout-header"></div>
  `;
    const cart = new Cart('cart-test');
    renderOrderSummaryHTML(cart);

    document.querySelector(`.js-delete-link-${productId1}`).click();
    
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect (document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect (document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });



  it('updates the delivery option', () => {
    document.querySelector('.js-test-container').innerHTML= `
    <div class= "js-order-summary"></div>
    <div class= "js-payment-summary"></div>
    <div class= "js-checkout-header"></div>
    `;   

    const cart = new Cart('cart-test');
    renderOrderSummaryHTML(cart);

    document.querySelector(`.js-delivery-test-${productId1}-3`).click();
    console.log(document.querySelector(`.js-input-test-${productId1}-3`).value);
  })
})
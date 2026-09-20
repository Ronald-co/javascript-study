import { Cart } from "../../data/cart-class.js";

describe('test suite: addToCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  })


  it('adds existing product', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '1'
    }]);
    });
    const cart = new Cart('cart');

    cart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d"); 
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        deliveryOptionId: '1'
    }]));   

  });

  it('adds a new product', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    const cart = new Cart('cart');
    
    cart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '1'
    }]));
 });

})




describe('test suite: removeFromCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '1'
    }]);
    });
  });

  it('removes an existing productId', () => {
    const cart = new Cart('cart');
    cart.removeFromCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([ ])); 
    expect(cart.cartItems.length).toEqual(0);
  });

  it('removes a non existing productId', () => {
    const cart = new Cart('cart');
    cart.removeFromCart("15b6fc");

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '1'
    }]));
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
  });

})
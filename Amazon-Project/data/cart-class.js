export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }


  #loadFromStorage () {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))

    if (!this.cartItems) {
      this.cartItems = [{
        productId: "id001",
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '3'
      }];
    }
  }


  addToCart(productId) {
    let matchingItem;
    const selectorValue = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = Number(selectorValue.value);

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
          matchingItem = cartItem;
      }});

      if (matchingItem) {
        matchingItem.quantity+= quantity;
      } else {
        this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
        });         
      }
      this.saveToStorage();
    }


  removeFromCart(productId) {
    let newCart = [];
    this.cartItems.forEach((cartItem) => {
      let matchingItem;
      if (productId !== cartItem.productId) {
        newCart.push(cartItem);
      }
    })
    this.cartItems = newCart;
    this.saveToStorage();
  }


  updateQuantity(productId, newQuantity) {
    const container = document.querySelector(`.js-container-${productId}`);

    if (newQuantity > 0 && newQuantity < 100) {
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          cartItem.quantity = newQuantity;
        }
      });
      
      this.saveToStorage();
      container.classList.remove('is-editing-quantity');
    }
    else {
      console.log('error');
    }
  }

  saveToStorage () {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }


  updateDeliveryDate(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
          matchingItem = cartItem;
      }});

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

// const cart = new Cart('cart-oop');
// const businessCart = new Cart('cart-business');

// console.log(cart);
// console.log(businessCart);


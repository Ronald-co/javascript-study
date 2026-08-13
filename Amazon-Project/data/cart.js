export const cart = [];

export function addToCart(productId) {
     let matchingItem;
     const selectorValue = document.querySelector(`.js-quantity-selector-${productId}`);

      cart.forEach((cartItem) => {
       if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }});

        let addedValue = Number(selectorValue.value);
        
        if (matchingItem) {
          matchingItem.quantity+= addedValue;
        } else {
          cart.push({
          productId: productId,
          quantity: addedValue
         });         
       }
  }

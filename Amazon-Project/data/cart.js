export const cart = [];

export function addToCart(productId) {
     let matchingItem;
     const selectorValue = document.querySelector(`.js-quantity-selector-${productId}`);

      cart.forEach((cartItem) => {
       if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }});

        let quantity = Number(selectorValue.value);
        
        if (matchingItem) {
          matchingItem.quantity+= quantity;
        } else {
          cart.push({
          productId,
          quantity
         });         
       }
  }

export let cart = JSON.parse(localStorage.getItem('cart')) 

if (!cart) {
	cart = [{
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
			quantity,
			deliveryOptionId: '1'
			});         
  	}
		saveToCart();
  }



  
export function removeFromCart(productId) {
	let newCart = [];
	cart.forEach((cartItem) => {
		let matchingItem;
		if (productId !== cartItem.productId) {
			newCart.push(cartItem);
		}
	})
	cart = newCart;
	saveToCart();
}



export function updateQuantity(productId, newQuantity) {
	const container = document.querySelector(`.js-container-${productId}`);
	const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)


	if (newQuantity > 0 && newQuantity < 100) {
		cart.forEach((cartItem) => {
			if (productId === cartItem.productId) {
				cartItem.quantity = newQuantity;
			}
		});
		quantityLabel.innerHTML = newQuantity;
		
		saveToCart();
		container.classList.remove('is-editing-quantity');
	}
	else {
		console.log('error');
	}
}


export function saveToCart () {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function updateDeliveryDate(productId, deliveryOptionId) {
	let matchingItem;

	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
				matchingItem = cartItem;
		}});

	matchingItem.deliveryOptionId = deliveryOptionId;
	saveToCart();
}
export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: "id001",
    quantity: 2
  },
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1
  }
];

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
		localStorage.setItem('cart', JSON.stringify(cart));
  }



  
export function removeFromCart(productId) {
	let newCart = [];
	const container = document.querySelector(`.js-container-${productId}`);
	cart.forEach((cartItem) => {
		let matchingItem;
		if (productId !== cartItem.productId) {
			newCart.push(cartItem);
		}
	})
	cart = newCart;
	localStorage.setItem('cart', JSON.stringify(cart));
	container.remove();
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
	
	localStorage.setItem('cart', JSON.stringify(cart));
	container.classList.remove('is-editing-quantity');
}
else {
	console.log('error');
}
}
import React, { useState, useEffect } from 'react';
import { commerce } from '../lib/commerce';
import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import axios from 'axios';
import { LineItem } from '@chec/commerce.js/types/line-item';
import { User } from '../App';

export default function useCart(
	setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
	setOrder: React.Dispatch<React.SetStateAction<CheckoutCaptureResponse | undefined>>,
	user: User,
	setJustAdded: React.Dispatch<React.SetStateAction<boolean>>,
){
	const [cart, setCart] = useState<Cart>();

	async function fetchCart(){
	  setCart(await commerce.cart.retrieve());
	}
  
	useEffect(() => {
	  fetchCart();
	}, [])
  
	async function handleAddToCart(product: string, quantity: number) {
	  const { cart } = await commerce.cart.add(product, quantity);
	  setCart(cart);
	  setJustAdded(true)
	  setTimeout(() => {setJustAdded(false)}, 1500);
	}
  
	async function handleUpdateCartQty(product: string, quantity: number) {
		const { cart } = await commerce.cart.update(product, { quantity })
		setCart(cart)
	}
  
	async function handleRemoveFromCart(product: string) {
	  const { cart } = await commerce.cart.remove(product);
	  setCart(cart)
	}
  
	async function handleEmptyCart(){
	  const { cart } = await commerce.cart.empty();
	  setCart(cart);
	}
  
	async function handleCaptureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture){
	  try {
		const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
		
		setOrder(order => {
			if (process.env.REACT_APP_SERVER_URL)
				if (user.isAuthenticated)
					axios.post(process.env.REACT_APP_SERVER_URL + '/users/orders', {
						submitted_at: new Date().getTime(), 
						total_items: newOrder.line_items.length, 
						items: newOrder.line_items.map((item: LineItem) => ({
							name: item.name, 
							quantity: item.quantity,
							product_id: item.product_id,
							price: item.price.raw,
							total: item.price.raw * item.quantity
						})),
						orderRef: incomingOrder.customer_reference,
						state: 'paid',
						email: incomingOrder.customer.email,
					}, {headers: {authorization: user.token}})
					.then(_ => {})
					.catch(_ => {})
					// .then(response => {console.log('should have placed the order', response.data)})
					// .catch(response => {console.log('deu erro during placing order in the database', response.data)})

			return incomingOrder
		})
		setOrder(incomingOrder)

		setTimeout(() => {
			setOrder(undefined)
			refreshCart()
			window.location.href = '/'
		}, 2000)
	  } catch (error) {
		setErrorMessage(error.data.error.message)
	  }
	}
  
	async function refreshCart() {
	  const newCart = await commerce.cart.refresh();
	  setCart(newCart);
	}

	return { 
		handleAddToCart,
		handleUpdateCartQty,
		handleRemoveFromCart,
		handleEmptyCart,
		handleCaptureCheckout,
		cart,
	}
}
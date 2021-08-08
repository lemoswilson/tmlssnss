import React, { useState, useEffect } from 'react';
import { commerce } from '../lib/commerce';
import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';

export default function useCart(
	setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
	setOrder: React.Dispatch<React.SetStateAction<CheckoutCaptureResponse | undefined>>,
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
		setOrder(incomingOrder)
		refreshCart()
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
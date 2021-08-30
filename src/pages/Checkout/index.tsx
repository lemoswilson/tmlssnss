import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';

import styles from './style.module.scss';

import ConfirmOrder from '../../components/Checkout/ConfirmOrder';
import Shipment from '../../components/Checkout/Shipment';
import Payment from '../../components/Checkout/Payment';
import Loading from '../../components/UI/Loading';
import { commerce } from '../../lib/commerce';

import { User } from '../../App';
import { Cart } from '@chec/commerce.js/types/cart';
import { LineItem } from '@chec/commerce.js/types/line-item';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response'


export interface CheckoutDataProps extends BaseCheckoutProps {
	items: {[id: string]: string},
}

export interface BaseCheckoutProps {
	user: User,
	cart?: Cart,
	order?: CheckoutCaptureResponse,
	handleUpdateCartQty: (product: string, quantity: number) => void,
	handleRemoveFromCart: (product: string) => void,
	handleEmptyCart: () => void,
	handleCaptureCheckout?: (checkoutTokenId: string, newOrder: CheckoutCapture) => void,
}

interface CheckoutProps extends BaseCheckoutProps {
	error?: string,
}

export interface shippingData {
	first_name?: string,
	last_name?: string,
	email?: string,
	add?: string,
	add_2?: string,
	city?: string,
	state?: string,
	zip?: number,
	country?: string,	
	option?: string,
}

export type shippingDataBoolean = {[K in keyof shippingData]: boolean}

const Checkout: React.FC<CheckoutProps> = ({
	cart, 
	user, 
	error,
	order,
	handleCaptureCheckout,
	handleEmptyCart, 
	handleRemoveFromCart, 
	handleUpdateCartQty
}) => {
	const { register, handleSubmit, formState: { errors }} = useForm();
	const [items, setItems] = useState<{[id: string]: string}>({})
	const [pageState, setPageState] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState<CheckoutToken>();
	const [shippingData, setShippingData] = useState<shippingData>({});
	const [loading, setLoading] = useState(true);
	const elements = useElements()
	const stripe = useStripe();

	function nextPage(){
		setPageState(state => state + 1);
	}

	function previousPage(){
		setPageState(state => state - 1);
	}


	useEffect(() => {
		async function generateToken(){
			try {
				if (cart){
					const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'})
					setCheckoutToken(token)
				} 
			} catch (error) {

			}
		}

		generateToken();
	}, [cart])

	useEffect(() => {
		if (cart?.line_items.length === 0)
			setLoading(false)
		else 
			cart?.line_items.forEach(populate)
	}, [cart])

	async function populate(item: LineItem){
		const response = await commerce.products.retrieve(item.product_id)
		setItems(state => ({
			...state,
			[item.product_id]: response.assets[0].url,
		}))
		setLoading(false);
	}

	const pages: {[key: number]: string} = {
		0: 'confirm order',
		1: 'shipment',
		2: 'payment'
	}

	function checkData(data?: shippingData): boolean | shippingDataBoolean {
		const value = data ? data : shippingData;
		if (Object.keys(value).length === 0) return false

		for (const key in value){
			if (key !== 'add_2' && !value[key as keyof shippingData]){
				return true
			}
		}

		return false
	}

	function sendToPage(pageNumber: number){
		if (pageNumber !== 2 || (pageNumber === 2 && checkData() ))
			setPageState(pageNumber)
		// else if (pageNumber === 2 && !checkData()){
			
		// }
	}

	function submit(data: any){
		console.log('should be submitting', data)
		switch (pageState){
			case 0:
				nextPage()
				break;
			case 1: 
				setShippingData({...data})
				nextPage()
				break;
			case 2:
				handlePayment()
				nextPage()
				break
			default: 
				break;
		}
	}


	async function handlePayment(){
		if (!stripe || !elements)
			return

		// get a reference to a mounted CardElement. Elements knows 
		// how to find your CardElement because there can only ever be one of each type of element.

		const cardElement = elements.getElement(CardElement);

		// use your card element with other Stripe.jsAPIs
		if (cardElement){
			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: 'card',
				card: cardElement,
			})
			
			if (!error && checkoutToken && paymentMethod) {
				const orderData: any = {
					line_items: checkoutToken.live.line_items,
					customer: {
						firstname: shippingData.first_name, 
						lastname: shippingData.last_name,
						email: shippingData.email ? shippingData.email : '' 
					},
					shipping: { 
						name: 'Domestic', 
						street: shippingData.add, 
						street_2: shippingData.add_2,
						town_city: shippingData.city, 
						county_state: shippingData.state, 
						postal_zip_code: String(shippingData.zip), 
						country: shippingData.country,

					},
					fulfillment: {shipping_method: shippingData.option ? shippingData.option : ''},
					payment: {
						gateway: 'stripe',
						stripe: {
							payment_method_id: paymentMethod?.id,
						}
					}
				}
				handleCaptureCheckout?.(checkoutToken.id, orderData)
			}
		}
	}



	const Data = 
		pageState === 0 
		? <ConfirmOrder 
			items={items} 
			user={user} 
			cart={cart} 
			handleEmptyCart={handleEmptyCart} 
			handleRemoveFromCart={handleRemoveFromCart} 
			handleUpdateCartQty={handleUpdateCartQty} 
		/>
		: pageState === 1
		? <Shipment 
			checkoutToken={checkoutToken} 
			register={register}  
			setShippingData={setShippingData} 
			items={items} 
			user={user} 
			cart={cart} 
			handleEmptyCart={handleEmptyCart} 
			handleRemoveFromCart={handleRemoveFromCart} 
			handleUpdateCartQty={handleUpdateCartQty} 
		/>
		: pageState >= 2
		? (
			<Payment 
				shippingData={shippingData} 
				pageState={pageState}
				error={error}
				setPageState={setPageState}
				order={order}
				handleCaptureCheckout={handleCaptureCheckout} 
				checkoutToken={checkoutToken} 
				items={items} 
				user={user} 
				cart={cart} 
				handleEmptyCart={handleEmptyCart} 
				handleRemoveFromCart={handleRemoveFromCart} 
				handleUpdateCartQty={handleUpdateCartQty} 
			/>
		) 
		: null

	return (
		<section className={styles.checkout}>
			<form onSubmit={handleSubmit(submit)}>
				<div className={styles.headroom}></div>

				<h2 className={styles.title}>
					{ pages[pageState] }
				</h2>

				<div className={styles.data}>
					{ loading ? <Loading className={styles.loading} /> :  Data }
				</div>

				<div className={styles.pageState}>
					{ [...Array(3).keys()].map(n => (
						<div key={n} onClick={() => {sendToPage(n)}} className={`${styles.circle} ${n === pageState ? styles.selected : ''}`}></div>
					))}
				</div>

				<div className={styles.totals}>
					<h2>Total: {cart?.subtotal.formatted_with_symbol}</h2>
				</div>

				<div 
					style={
						pageState === 0 
						? {justifyContent: 'flex-end'} 
						: pageState > 2 
						? {display: 'none'} 
						: {}
					} 
					className={styles.navigation}
				>
					{ pageState > 0 ?
						<button onClick={previousPage}>back</button>
						: null
					}
					<button 
						type={'submit'} 
						style={
							pageState === 2 
							? {width: 'fit-content', padding: '5px'} 
							: ( cart?.line_items.length === 0 ) || pageState > 2 
							? {display: 'none'} 
							: {}
						} 
					>
						{
							pageState < 2
							? pages[pageState+1]
							: `pay ${cart?.subtotal.formatted_with_symbol}`
						}
					</button>
				</div>
			</form>
		</section>
	)
};

export default Checkout;
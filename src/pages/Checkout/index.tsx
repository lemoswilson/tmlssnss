import React, { useState, useRef } from 'react';
import { useLocation, Switch, Route, Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './style.module.scss';
import { cleanPath } from '../../components/ShopGrid';

import ConfirmOrder from '../../components/Checkout/ConfirmOrder';
import Shipment from '../../components/Checkout/Shipment';
import Payment from '../../components/Checkout/Payment';

import { User } from '../../App';
import { Cart } from '@chec/commerce.js/types/cart';
import { LineItem } from '@chec/commerce.js/types/line-item';
import { commerce } from '../../lib/commerce';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';


export interface CheckoutDataProps extends CheckoutProps {
	items: {[id: string]: string},
}

export interface CheckoutProps {
	user: User,
	cart?: Cart,
	handleUpdateCartQty: (product: string, quantity: number) => void,
	handleRemoveFromCart: (product: string) => void,
	handleEmptyCart: () => void,
	handleCaptureCheckout?: (checkoutTokenId: string, newOrder: CheckoutCapture) => void,
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

const Checkout: React.FC<CheckoutProps> = ({
	cart, 
	user, 
	handleCaptureCheckout,
	handleEmptyCart, 
	handleRemoveFromCart, 
	handleUpdateCartQty
}) => {
	const location = useLocation();
	const history = useHistory();
	const path = cleanPath(location.pathname)[1]
	const [items, setItems] = useState<{[id: string]: string}>({})
	const paymentRef = useRef<any>();
	const shippimentRef = useRef<any>();

	const [checkoutToken, setCheckoutToken] = useState<CheckoutToken>();
	const [shippingData, setShippingData] = useState<shippingData>({});

	const { register, handleSubmit, watch, formState: { errors }} = useForm();

	useEffect(() => {
		async function generateToken(){
			try {
				if (cart){
					const token = await commerce.checkout.generateToken(cart?.id, { type: 'cart'})
					setCheckoutToken(token)
				} 
			} catch (error) {

			}
		}

		generateToken();
	}, [cart])

	async function populate(item: LineItem){
		const response = await commerce.products.retrieve(item.product_id)
		setItems(state => ({
			...state,
			[item.product_id]: response.assets[0].url,
		}))
	}

	useEffect(() => {
		cart?.line_items.forEach(populate)
	}, [cart])

	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
	useEffect(() => {console.log('stirpe key is ', process.env.REACT_APP_STRIPE_PUBLIC_KEY)}, [])

	const pages: {[key: number]: string} = {
		0: 'confirm',
		1: 'shipment',
		2: 'payment'
	}

	const title = 
		path === 'confirm' 
		? 'confirm order'
		: path === 'shipment'
		? 'shipment'
		: path === 'payment'
		? 'payment'
		: ''

	const page = 
		path === 'confirm' 
		? 0 
		: path === 'shipment'
		? 1
		: path === 'payment'
		? 2
		: -1 

	useEffect(() => {
		console.log('page is ', page);
	}, [])

	useEffect(() => {
		if (page < 0)
			window.location.href = '/checkout/confirm'	
	}, [])

	function sendToPage(path: string){
		history.push(path);
	}

	function handlePayment(){
		if (path !== 'payment')
			return 

		if (paymentRef)
			paymentRef.current();
	}

	function submit(data: any){
		console.log('should be submitting')
		switch (page){
			case 0:
				sendToPage('/checkout/shipment');
				break;
			case 1: 
				console.log(data)
				break;
			case 2:
			default: 
				break;
		}
	}



	return (
		<section className={styles.checkout}>
			<form onSubmit={handleSubmit(submit)}>
				<div className={styles.headroom}></div>
				<h2 className={styles.title}>
					{ title }
				</h2>
				<div className={styles.data}>
					<Switch>
						<Route render={() => <ConfirmOrder items={items} user={user} cart={cart} handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty} />} path={'/checkout/confirm'} />
						<Route render={() => <Shipment checkoutToken={checkoutToken} register={register} shippmentRef={shippimentRef} setShippingData={setShippingData} items={items} user={user} cart={cart} handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty} />} path={'/checkout/shipment'} />
						<Elements stripe={stripePromise}>
							<Route render={() => (
								<Payment shippingData={shippingData} handleCaptureCheckout={handleCaptureCheckout} checkoutToken={checkoutToken} paymentRef={paymentRef} items={items} user={user} cart={cart} handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty} />
							)} path={'/checkout/payment'} />
						</Elements>
					</Switch>
				</div>
				<div className={styles.pageState}>
					{ [...Array(3).keys()].map(n => (
						<div onClick={() => {sendToPage(`/checkout/${pages[n]}`)}} className={`${styles.circle} ${n === page ? styles.selected : ''}`}></div>
					))}
				</div>
				<div className={styles.totals}>
					<h2>Total: {cart?.subtotal.formatted_with_symbol}</h2>
				</div>
				<div style={page === 0 ? {justifyContent: 'flex-end'} : {}} className={styles.navigation}>
					{ page > 0 ?
						<button>
							<Link to={`/checkout/${pages[page-1]}`}>back</Link>
						</button>
						: null
					}
					<button type={'submit'} style={path === 'payment' ? {width: 'fit-content', padding: '5px'} : cart?.line_items.length === 0 ? {display: 'none'} : {}} >
						{/* {
							page < 2
							? <Link to={`/checkout/${pages[page+1]}`}>{ pages[page+1] }</Link>
							: `pay ${cart?.subtotal.formatted_with_symbol}`
						} */}
						{
							page < 2
							? pages[page+1]
							: `pay ${cart?.subtotal.formatted_with_symbol}`
						}
					</button>
				</div>
			</form>
		</section>
	)
};

export default Checkout;
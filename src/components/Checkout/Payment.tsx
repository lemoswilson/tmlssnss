import React from 'react';
import styles from './payment.module.scss';
import { Link } from 'react-router-dom';
import { CheckoutDataProps } from '../../pages/Checkout';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { shippingData } from '../../pages/Checkout';
import './general.scss'

interface PaymentProps extends CheckoutDataProps {
	checkoutToken?: CheckoutToken,
	shippingData: shippingData,
	error?: string,
	// setError: React.Dispatch<React.SetStateAction<string>>,
	setPageState: React.Dispatch<React.SetStateAction<number>>,
	pageState: number,
}

const Payment: React.FC<PaymentProps> = ({
	handleEmptyCart, 
	handleRemoveFromCart, 
	handleUpdateCartQty, 
	handleCaptureCheckout, 
	setPageState,
	pageState,
	checkoutToken,
	shippingData,
	order,
	error,
	user, 
	items, 
	cart
}) => {
	const elements = useElements()
	const stripe = useStripe();

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
			
			if (error) {
				console.log('[error]: ', error)
			} else {
				if (checkoutToken && paymentMethod){
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
						},
						billing: {
							name: shippingData.first_name + '' + shippingData.last_name,
							street: shippingData.add, 
							street_2: shippingData.add_2,
							town_city: shippingData.city, 
							county_state: shippingData.state, 
							postal_zip_code: String(shippingData.zip), 
							country: shippingData.country,
						}
					}

					handleCaptureCheckout?.(checkoutToken.id, orderData)

				}
			}
		}

	}

	
	return (
		<div className={styles.payment}>
			<div className={styles.summary}>
				<h3>Order Summary:</h3>
				<ul className={styles.order}>
					{ cart?.line_items.map(item => (
						<li key={item.id} className={styles.item}>
							<div className={styles.name}>{item.name}</div>
							<div className={styles.quantity}>{item.quantity}x</div>
							<div className={styles.price}>{item.price.formatted_with_symbol}</div>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.payment}>
				<h3>Payment Information:</h3>
				<div className={styles.paymentInputs}>
					<CardElement className={styles.cardElement}/>
				</div>
			</div>
			{
				pageState > 2 && order && order.customer ? 
				<React.Fragment>
					<h3>Thank you for your order {order.customer.firstname} {order.customer.lastname}</h3>
					<div className={styles.divider}></div>
					<p>Order ref: { order.customer_reference }</p>
					{/* <button><Link to={'/shop'}></Link>Back to shop</button> */}
				</React.Fragment>
				: error 
				? 
				<React.Fragment>
					<h3>There was an error trying to process your order, please try again.</h3>
					<div className={styles.divider}></div>
					<button onClick={() => { setPageState(0) }}>Back</button>
				</React.Fragment>
				: null
			}	
		</div>
	)
}

export default Payment;
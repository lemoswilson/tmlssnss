import React from 'react';
import styles from './payment.module.scss';
import { CheckoutDataProps } from '../../pages/Checkout';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { shippingData } from '../../pages/Checkout';

import './general.scss'

interface PaymentProps extends CheckoutDataProps {
	checkoutToken?: CheckoutToken,
	shippingData: shippingData,
	error?: string,
	setPageState: React.Dispatch<React.SetStateAction<number>>,
	pageState: number,
}

const Payment: React.FC<PaymentProps> = ({
	setPageState,
	pageState,
	order,
	error,
	cart
}) => {
	
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
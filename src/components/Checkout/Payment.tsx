import React from 'react';
import styles from './payment.module.scss';
import { CheckoutProps } from '../../pages/Checkout';

const Payment: React.FC<CheckoutProps> = ({
	handleEmptyCart, 
	handleRemoveFromCart, 
	handleUpdateCartQty, 
	user, 
	cart
}) => {
	
	return (
		<div>
			
		</div>
	)
}

export default Payment;
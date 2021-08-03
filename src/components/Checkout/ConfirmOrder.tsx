import React from 'react';
import styles from './confirmorder.module.scss';
import { CheckoutProps } from '../../pages/Checkout'
import { commerce } from '../../lib/commerce';

const ConfirmOrder: React.FC<CheckoutProps> = ({
	user, 
	cart, 
	handleEmptyCart, 
	handleRemoveFromCart, 
	handleUpdateCartQty 
}) => {

	return (
		<div>
			
		</div>
	)
}

export default ConfirmOrder;
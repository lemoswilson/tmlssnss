import React from 'react';
import styles from './shipment.module.scss';
import { CheckoutProps } from '../../pages/Checkout';

const Shipment: React.FC<CheckoutProps> = ({
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

export default Shipment;
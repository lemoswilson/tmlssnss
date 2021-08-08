import React from 'react';
import styles from './confirmation.module.scss';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import { Link } from 'react-router-dom';

interface ConfirmationProps {
	error?: string
	order?: CheckoutCaptureResponse,
	setPageState: React.Dispatch<React.SetStateAction<number>>,
}

const Confirmation: React.FC<ConfirmationProps> = ({error, order, setPageState}) => {
	return (
		<div className={styles.confirmation}>
			{
				order && order.customer ? 
				<React.Fragment>
					<h3>Thank you for your order {order.customer.firstname} {order.customer.lastname}</h3>
					<div className={styles.divider}></div>
					<button><Link to={'/shop'}></Link>Back to shop</button>
				</React.Fragment>
				: error 
				? 
				<React.Fragment>
					<h3>There was an error trying to process your order, please try again.</h3>
					<div className={styles.divider}></div>
					<button onClick={() => { setPageState(0) }}>Back</button>
				</React.Fragment>
				: 'null'
			}	
		</div>
	)
}

export default Confirmation;
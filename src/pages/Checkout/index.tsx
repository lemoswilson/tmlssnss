import React from 'react';
import styles from './style.module.scss';
import { useLocation, Switch, Route, Link } from 'react-router-dom';
import { cleanPath } from '../../components/ShopGrid';
import ConfirmOrder from '../../components/Checkout/ConfirmOrder';
import Shipment from '../../components/Checkout/Shipment';
import Payment from '../../components/Checkout/Payment';
import { User } from '../../App';
import { Cart } from '@chec/commerce.js/types/cart';
import { useEffect } from 'react';

export interface CheckoutProps {
	user: User,
	cart?: Cart,
	handleUpdateCartQty: (product: string, quantity: number) => void,
	handleRemoveFromCart: (product: string) => void,
	handleEmptyCart: () => void,
}

const Checkout: React.FC<CheckoutProps> = ({cart, user, handleEmptyCart, handleRemoveFromCart, handleUpdateCartQty}) => {
	const location = useLocation();
	const path = cleanPath(location.pathname)[1]
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
		if (page < 0)
			window.location.href = '/checkout/confirm'	
	}, [])


	return (
		<section className={styles.checkout}>
			<div className={styles.headroom}></div>
			<h2 className={styles.title}>
				{ title }	
			</h2>
			<div className={styles.data}>
				<Switch>
					<Route render={() => <ConfirmOrder user={user} cart={cart} handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty} />} path={'/item/confirm'} />
					<Route render={() => <Shipment user={user} cart={cart} handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty} />} path={'/item/shipment'} />
					<Route render={() => <Payment user={user} cart={cart} handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty} />} path={'/item/payment'} />
				</Switch>			
			</div>
			<div className={styles.pageState}>
				{ [...Array(3).keys()].map(n => (
					<div className={`${styles.circle} ${n === page ? styles.selected : ''}`}></div>
				))}
			</div>
			<div className={styles.totals}>
				<h2>Total: {cart?.subtotal.formatted_with_symbol}</h2>
			</div>
			<div className={styles.navigation}>
				<button style={page > 0 ? {display: 'flex'} : {display: 'none'}}>
					<Link to={`/checkout/${pages[page-1]}`}>back</Link>
				</button>
				<button >
					<Link to={page < 2 ? `/checkout/${pages[page+1]}` : ''}>{ pages[page+1] }</Link>					
				</button>
			</div>
		</section>
	)
};

export default Checkout;
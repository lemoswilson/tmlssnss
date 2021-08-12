import React, { useEffect } from 'react';
import styles from './style.module.scss';
import { OrderBody, item } from '../../hooks/useOrders';
import { User } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';
import { commerce } from '../../lib/commerce';
import axios from 'axios';
import useVerify from '../../hooks/useVerify';

interface OrdersProps {
	user: User,
	updateUser: React.Dispatch<React.SetStateAction<User>>,
}

const Orders: React.FC<OrdersProps> = ({user, updateUser}) => {
	const history = useHistory()
	const location = useLocation();

	useVerify(user, updateUser, true);

	// useEffect(() => {
	// 	if (!user.isAuthenticated)	
	// 		history.push('/')
	// }, [])

	function itemTotal(item: item){
		return item.quantity * item.price
	}

	function orderTotal(items: item[]){
		return items.map(itemTotal).reduce((prev, curr) => prev + curr);
	}
	
	function capitalizeFirstLetter(word: string){
		return word[0].toUpperCase() + word.slice(1)
	}

	const { errors, orders } = useOrders(user);

	return (
		<section className={styles.orders}>
			<div className={styles.headroom}></div>
			<div className={styles.top}>
				<h1>Orders</h1>
			</div>

			<div className={styles.data}>
				{
					orders.length > 0 
					? <div className={styles.orderGrid}>
						<div className={styles.order}>
							<div className={`${styles.ref} ${styles.title}`}>Order Reference</div>
							<div className={`${styles.totals} ${styles.title}`}>Total</div>
							<div className={`${styles.date} ${styles.title}`}>Date</div>
							<div className={`${styles.status} ${styles.title}`}>Status</div>
						</div>
						{ orders.map(order => (
							<div className={styles.order}>
								<div className={styles.ref}>{order.orderRef}</div>
								<div className={styles.totals}>${orderTotal(order.items)}</div>
								<div className={styles.date}>{new Date(order.submitted_at).toDateString()}</div>
								<div className={styles.status}>{capitalizeFirstLetter(order.state)}</div>
							</div>	
						))}
					</div>
					: <h3 className={styles.vacuo}>No orders have been made yet!</h3>
				}
			</div>
		</section>
	)
}

export default Orders;
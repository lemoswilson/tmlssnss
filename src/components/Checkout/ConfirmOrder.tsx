import React, { useState } from 'react';
import styles from './confirmorder.module.scss';
import { CheckoutDataProps } from '../../pages/Checkout'
import { commerce } from '../../lib/commerce';
import { LineItem } from '@chec/commerce.js/types/line-item'
import { Product } from '@chec/commerce.js/types/product'
import { useEffect } from 'react';
import x from '../../assets/svg/x.svg';

const ConfirmOrder: React.FC<CheckoutDataProps> = ({
	user, 
	cart, 
	items, 
	handleEmptyCart, 
	handleRemoveFromCart, 
	handleUpdateCartQty 
}) => {


	return (
		<ul className={styles.orders}>
			<li className={styles.row}>
						<div className={styles.info}></div>
						<div className={styles.info}>item</div>
						<div className={styles.info}></div>
						<div className={styles.info}>quantity</div>
						<div className={styles.info}></div>
			</li>
				{ cart?.line_items.map(item => (
						<li key={item.product_id} className={styles.row}>
							<div className={styles.image}>
								<img src={items[item.product_id]} alt={item.name} />
							</div>
							<div className={styles.name}>{item.name}</div>
							<div className={styles.price}>{`${item.quantity} * ${item.price.formatted_with_symbol} = $${item.quantity * item.price.raw}`}</div>
							<div className={styles.quantity}>
								<input onChange={(e) => {handleUpdateCartQty(item.id, e.currentTarget.valueAsNumber)}} defaultValue={item.quantity} type="number" />
							</div>
							<div className={styles.remove}>
								<div onClick={() => {handleRemoveFromCart(item.id)}} className={styles.x}>
									<img src={x} alt="remove" />
								</div>
							</div>
						</li>
				)) }
			{/* <li className={styles.row}>
				{ cart?.line_items.map(item => (
					<React.Fragment>
						<div className={styles.image}>
							<img src={items[item.product_id]} alt={item.name} />
						</div>
						<div className={styles.name}>{item.name}</div>
						<div className={styles.price}>{`${item.quantity} * ${item.price.formatted_with_symbol} = $${item.quantity * item.price.raw}`}</div>
						<div className={styles.quantity}>
							<input onChange={(e) => {handleUpdateCartQty(item.id, e.currentTarget.valueAsNumber)}} defaultValue={item.quantity} type="number" />
						</div>
						<div className={styles.remove}>
							<div onClick={() => {handleRemoveFromCart(item.id)}} className={styles.x}>
								<img src={x} alt="remove" />
							</div>
						</div>
					</React.Fragment>
				)) }
			</li> */}
		</ul>
	)
}

export default ConfirmOrder;
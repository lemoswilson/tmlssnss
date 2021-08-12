import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../App'

export interface item {
	name: string,
	quantity: number,
	product_id: string,
	price: number,
	total: number,
}

export interface OrderBody {
	submitted_at: number,
	total_items: number,
	items: item[],
	orderRef: string,
	state: 'paid' | 'fullfiled' | 'delivered',
}


export default function useOrders(user: User) {
	const [orders, setOrders] = useState<OrderBody[]>([]);
	const [errors, setErrors] = useState<any>();

	useEffect(() => {
		if(process.env.REACT_APP_SERVER_URL)
			axios.get(process.env.REACT_APP_SERVER_URL + '/users/orders', {headers: {authorization: user.token}})
			.then(response => {
				console.log('there s a response for fetching orders, which is', response.data, response.status)
				if (response.status === 200) 
					setOrders(response.data.orders);
			})
			.catch(response => {
				// console.log('deu erro no fetching', response)
				setErrors(response);
			})
	}, [user.token])

	return { orders, errors	}
}
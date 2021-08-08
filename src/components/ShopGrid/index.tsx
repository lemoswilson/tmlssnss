import React, { useState } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import {  } from 'react-router';
import styles from './style.module.scss';
import cart from '../../assets/svg/cart.svg';
import GridItem from './GridItem';
import Loading from '../UI/Loading';

export function cleanPath(path: string){
	return path.split('/').filter(v => v !== '')
}

interface ShopGridProps {
	addToCart: (product: string, quantity: number) => void,
}

const ShopGrid: React.FC<ShopGridProps> = ({ addToCart }) => {
	const location = useLocation();
	const [items, setItems] = useState<Product[]>([])
	const [vacuo, setVacuo] = useState(false);
	const history = useHistory();
	const [loading, setLoading] = useState(true);



	useEffect(() => {
		console.log('should be setting load to true');
		setLoading(true);
		const path = cleanPath(location.pathname)
		commerce.products.list({
			category_slug: path[1] === 'categories' ? [path.reverse()[0]] : undefined,
			query: path[1] === 'search' ? [path.reverse()[0]] : undefined,
		})
		.then(
			products => {
				if (products.data.length > 0) {
					console.log('should be setting loading to false')
					setItems(products.data)
					setLoading(false)
				}
				else if (path[1] === 'search' && products.data.length === 0) {
					console.log('should be setting loading to false')
					setVacuo(true);
					setLoading(false)
				}
			}
		).catch(e => { 
			commerce.products.list().then(pro => { 
				setItems(pro.data) 
				console.log('should be setting loading to false')
				setLoading(false)
			})
		})
	}, [location])

	// useEffect(() => {
	// 	console.log('items are', items)
	// 	console.log('clean path is', cleanPath(location.pathname));
	// }, [items])
	
	return (
		<div className={styles.shop}>
			{ 
				loading 
				? <Loading className={styles.loading}/> 
				: vacuo
				? <div className={styles.vacuo}>tem nada nao fio</div>
				: items.length > 0 
				? (
					<ul className={styles.grid}>
						{ items.map(item => <GridItem key={item.id} addToCart={addToCart} item={item} />) }	
					</ul>
				)
				: null
			}
		</div>
	)
}

export default ShopGrid;
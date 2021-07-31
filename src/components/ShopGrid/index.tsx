import React, { useState } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import {  } from 'react-router';
import styles from './style.module.scss';
import cart from '../../assets/svg/cart.svg';
import GridItem from './GridItem';

export function cleanPath(path: string){
	return path.split('/').filter(v => v !== '')
}

const ShopGrid: React.FC = () => {
	const location = useLocation();
	const [items, setItems] = useState<Product[]>([])
	const [vacuo, setVacuo] = useState(false);
	const history = useHistory();



	useEffect(() => {
		const path = cleanPath(location.pathname)
		commerce.products.list({
			category_slug: path[1] === 'categories' ? [path.reverse()[0]] : undefined,
			query: path[1] === 'search' ? [path.reverse()[0]] : undefined,
		})
		.then(
			products => {
				if (products.data.length > 0) {
					setItems(products.data)
				}
				else if (path[1] === 'search' && products.data.length === 0) {
					setVacuo(true);
				}
			}
		).catch(e => { 
			commerce.products.list().then(pro => { 
				setItems(pro.data) 
			})
		})
	}, [location])

	useEffect(() => {
		console.log('items are', items)
		console.log('clean path is', cleanPath(location.pathname));
	}, [items])
	
	return (
		<div className={styles.shop}>
			{ 
				items.length > 0 ? 
				(
					<ul className={styles.grid}>
						{ items.map(item => <GridItem item={item} />) }	
					</ul>
				)
				: vacuo
				? <div className={styles.vacuo}>tem nada nao fio</div>
				: <div className={styles.loading}>carregando</div>
			}
		</div>
	)
}

export default ShopGrid;
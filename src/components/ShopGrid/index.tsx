import React, { useState } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import {  } from 'react-router';
import styles from './style.module.scss';
import cart from '../../assets/svg/cart.svg';
import GridItem from './GridItem';
import Loading from '../UI/Loading';
import algoliasearch from 'algoliasearch';

export function cleanPath(path: string){
	return path.split('/').filter(v => v !== '')
}


const client = algoliasearch(
	process.env.REACT_APP_PUBLIC_ALGOLIA_APP_ID,
	process.env.REACT_APP_PUBLIC_ALGOLIA_SEARCH_KEY,
)
	
const index = client.initIndex('tmlssnss')

interface ShopGridProps {
	addToCart: (product: string, quantity: number) => void,
	searchValue: string,
}
	
const ShopGrid: React.FC<ShopGridProps> = ({ addToCart, searchValue }) => {
	const location = useLocation();
	const [items, setItems] = useState<Product[]>([])
	const [vacuo, setVacuo] = useState(false);
	const [loading, setLoading] = useState(true);
	const [filteredItems, setFilteredItems] = useState<Product[]>([]);

	useEffect(() => {
		const path = cleanPath(location.pathname)
		if (path[1] === 'categories')
			index.search(searchValue, {	filters: `categories.name:${path.reverse()[0]}`})
			.then((products: any) => {setFilteredItems(products.hits)	})
	}, [searchValue])

	useEffect(() => {
		setLoading(true);
		const path = cleanPath(location.pathname)

		if (path[1] === 'categories')
			commerce.products.list({
				category_slug: [path.reverse()[0]],
			})
			.then(
				products => {
					if (products.data.length > 0) {
						setItems(products.data)
						setLoading(false)
					}
				}
			).catch(e => { 
				commerce.products.list().then(pro => { 
					setItems(pro.data) 
					setLoading(false)
				})
			})
		else if (path[1] === 'search'){
			index.search(path.reverse()[0]).then((products: any) => {
				setItems(products.hits)
				setLoading(false)
			})
		} else if (path.length === 1) {
			commerce.products.list()
				.then(
					products => {
						if (products.data.length > 0) {
							setItems(products.data)
							setLoading(false)
						}
					}
				).catch(e => { 
					commerce.products.list().then(pro => { 
						setItems(pro.data) 
						setLoading(false)
					})
				})
		}

	}, [location])
	
	return (
		<div className={styles.shop}>
			{ 
				loading 
				? <Loading className={styles.loading}/> 
				: vacuo
				? <div className={styles.vacuo}>tem nada nao fio</div>
				: searchValue.length > 0 
				? <ul className={styles.grid}>
					{ filteredItems.map(item => <GridItem key={item.id} addToCart={addToCart} item={item} />) }	
				</ul>
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
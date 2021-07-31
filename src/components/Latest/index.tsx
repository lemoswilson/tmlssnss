import { Product } from '@chec/commerce.js/types/product';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import useWidth from '../../hooks/useWidth';

interface LatestProps {
	products: Product[]
}


const Latest: React.FC<LatestProps> = ({products}) => {

	const { windowWidth, previousWidth } = useWidth();
	const [gridSize, setGridSize] = useState(windowWidth > 767 ? 12 : 6);

	useEffect(() => {
		if (previousWidth <= 767 && windowWidth > 767){
			setGridSize(12)
		} else if (previousWidth >= 768 && windowWidth < 768){
			setGridSize(6)
		}
	}, [windowWidth])
	
	return (
		<section className={styles.latest}>
			<h1>Latest Arrivals</h1>
			<p><Link to={'/shop'}>view all</Link></p>
			<div className={styles.productsGrid}>
				{ [...Array(Math.min(gridSize, products.length)).keys()].map(v => {
					return (
						<div key={v} className={styles.gridItem}>
							<img 
								src={products[v].assets[0].url} 
								alt={products[v].name} 
								className={styles.productImage} 
							/>
							<div className={styles.info}>
								<div className={styles.name}>
									{ products[v].name }
								</div>
								<div className={styles.price}>
									{ products[v].price.formatted_with_symbol }
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
};

export default Latest;
import React, { useEffect, useState } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import styles from './style.module.scss';
import Hero from '../../components/Hero';
import Latest from '../../components/Latest';
import Promos from '../../components/Promos';
import Follow from '../../components/Follow';
import { User } from '../../App';
import { commerce } from '../../lib/commerce';

interface HomeProps {
	user: User,
}

const Home: React.FC<HomeProps> = ({user}) => {

	const [latest, setLatest] = useState<Product[]>([]);
	const [error, setError] = useState<any>(undefined);

	function getLatest(){
		commerce.products.list()
			.then(products => setLatest(products.data.reverse()))
			.catch(error => setError(error))
	}

	useEffect(() => {
		getLatest()
	}, [])

	// useEffect(() => {
	// 	commerce.products.retrieve("prod_RqEv5xXdgq5Zz4").then(product => {
	// 		console.log('the product is ', product.name, product);
	// 	})
	// }, [])

	return (
		<React.Fragment>
			<div className={styles.hero}>
				<div className={styles.headroom}></div>
				<Hero/>
			</div>
			<div className={styles.latest}>
				<Latest products={latest} />
			</div>
			<div className={styles.promotions}>
				<Promos />
			</div>
			<div className={styles.follow}>
				<Follow />
			</div>
		</React.Fragment>
	)
};

export default Home;
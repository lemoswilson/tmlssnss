import React, { useState } from 'react';
import styles from './style.module.scss';
import { User } from '../../App';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import { Product } from '@chec/commerce.js/types/product';

interface ItemProps {
	user: User
}

interface params {
	id: string,
}

const Item: React.FC<ItemProps> = ({user}) => {
	const params = useParams<params>();
	const [data, setData] = useState<Product | undefined>();

	useEffect(() => {
		commerce.products.retrieve(params.id).then(
			product => { 
				setData(product) 
			}
		)
	}, [])

	return (
		<div className={styles.item}>
			<div className={styles.wrapper}>
				<div className={styles.visualizer}>
					<div className={styles.display}>
						<div className={styles.arrow}></div>
						
						<div className={styles.photo}>

						</div>
						<div className={styles.arrow}></div>
					</div>
					<div className={styles.state}>

					</div>
					<div className={styles.picker}>
						<h3>sizes</h3>
						<div className={styles.sizes}>

						</div>
					</div>
				</div>
				<div className={styles.info}>

				</div>
			</div>	
			<div className={styles.navigation}>

			</div>
		</div>
	)
}

export default Item;
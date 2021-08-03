import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './griditem.module.scss';
import { Product } from '@chec/commerce.js/types/product';
import { useState } from 'react';
import cart from '../../assets/svg/addcart.svg';
import useWidth from '../../hooks/useWidth';
import { useEffect } from 'react';

interface GridItemProps {
	item: Product,
	addToCart: (product: string, quantity: number) => void,
}

const GridItem: React.FC<GridItemProps> = ({item, addToCart}) => {
	const [hover, setHover] = useState(false);
	const { windowWidth } = useWidth();
	const history = useHistory();
	const display = hover || windowWidth < 992 ? {display: 'flex'} : {display: 'none'};
	const dimension = windowWidth > 992 ? '25px' : '17%';

	// useEffect(() => {
	// 	console.log(item.name, item);
	// },[])

	function show(){
		setHover(true);
	}

	function hide(){
		setHover(false);
	}

	function handleAddToCart(e: React.MouseEvent){
		e.stopPropagation()
		addToCart(item.id, 1);
	}

	function sendToItem(){
		history.push(`/item/${item.id}`)
	}

	return (
		<li onClick={sendToItem} className={styles.item}>
			<div onMouseEnter={show} onMouseLeave={hide} className={styles.background}>
				<img className={styles.image}  src={item.assets[0].url} alt={item.name} />
				<div style={display} className={styles.cart}>
					<img onClick={handleAddToCart} src={cart} alt={cart} width={dimension} height={dimension} />
				</div>
			</div>	
			<div className={styles.info}>
				<div className={styles.name}>
					{ item.name }
				</div>
				<div className={styles.price}>
					{ item.price.formatted_with_symbol }
				</div>
			</div>
		</li>
	)
};

export default GridItem;
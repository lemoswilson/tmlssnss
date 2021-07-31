import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './griditem.module.scss';
import { Product } from '@chec/commerce.js/types/product';
import { useState } from 'react';
import cart from '../../assets/svg/addcart.svg';
import useWidth from '../../hooks/useWidth';

interface GridItemProps {
	item: Product,
}

const GridItem: React.FC<GridItemProps> = ({item}) => {
	const [hover, setHover] = useState(false);
	const { windowWidth } = useWidth();
	const history = useHistory();
	const display = hover || windowWidth < 992 ? {display: 'flex'} : {display: 'none'};
	const dimension = windowWidth > 992 ? '25px' : '17%';

	function show(){
		setHover(true);
	}

	function hide(){
		setHover(false);
	}

	function addToCart(e: React.MouseEvent){
		e.stopPropagation()
	}

	function sendToItem(){
		history.push(`/shop/item/${item.id}`)
	}

	return (
		<li onClick={sendToItem} className={styles.item}>
			<div onMouseEnter={show} onMouseLeave={hide} className={styles.background}>
				<img className={styles.image}  src={item.assets[0].url} alt={item.name} />
				<div style={display} className={styles.cart}>
					<img onClick={addToCart} src={cart} alt={cart} width={dimension} height={dimension} />
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
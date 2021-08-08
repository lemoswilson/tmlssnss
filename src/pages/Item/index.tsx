import React, { useState } from 'react';
import styles from './style.module.scss';
import { useLocation } from 'react-router';
import { User } from '../../App';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import { Product } from '@chec/commerce.js/types/product';
import useWidth from '../../hooks/useWidth';
import useHeight from '../../hooks/useHeight';
import arrow from '../../assets/svg/arrow2.svg';
import Loading from '../../components/UI/Loading';

interface ItemProps {
	user: User,
	addToCart: (product: string, quantity: number) => void,
}

interface params {
	id: string,
}

type sizes = 's' | 'm' | 'g';

const Item: React.FC<ItemProps> = ({user, addToCart}) => {
	const params = useParams<params>();
	const history = useHistory();
	const location = useLocation();
	const [productData, setData] = useState<Product | undefined>();
	const [relatedProducts, setRelated] = useState<Product[]>();
	const [selectedImg, setImage] = useState(0);
	const [selectedSize, setSize] = useState<sizes>()
	const { windowWidth } = useWidth();
	const { windowHeight } = useHeight();
	const [counter, setCounter] = useState(0);
	const [loading, setLoading] = useState(true);

	function toImage(value: number){
		if (productData)
			setImage(v => (
				( v + value < productData.assets.length ) && ( v + value >= 0 )
				? v + value 
				: v
			))
	}
	
	function isSelected(value: sizes ){
		return value === selectedSize ? styles.selected : ''
	}

	useEffect(() => {
		commerce.products.retrieve(params.id).then(
			product => { 
				setData(product) 
			}
		)
	}, [])

	useEffect(() => {
		if (productData && !counter) {
			productData.related_products.forEach(p => {
				commerce.products.retrieve(p.id).then(product => {
					setRelated(v => v ? v.concat(product) : [product])
					setLoading(false)
				})
			})
			setCounter(1);
		}
	}, [productData])

	function toPage(v: string){
		window.location.href = v;
	}

	// useEffect(() => {}, [location])

	const Related = relatedProducts ? (
		<div style={window.innerHeight > window.innerWidth && window.innerWidth > 1000 ? {justifyContent: 'space-between', marginTop: 0, maxHeight: '600px'} : {}} className={styles.related}>
		{ relatedProducts.slice(0, 3).map(relatedItem => (
			<div key={relatedItem.id} className={styles.relatedItem}>
				<img onClick={() => toPage(`/item/${relatedItem.id}`)} src={relatedItem.assets[0].url} alt={relatedItem.name} />
				<p onClick={() => toPage(`/item/${relatedItem.id}`)} >{relatedItem.name}</p>
				<p onClick={() => toPage(`/item/${relatedItem.id}`)} >{relatedItem.price.formatted_with_symbol}</p>
			</div>
		))}	
	</div>
	) : null;

	const Component = productData && relatedProducts ? 
	(
		<section className={styles.item}>
			<div className={styles.headroom}></div>
			<div className={styles.wrapper}>
				<div className={styles.media}>
					<div className={styles.images}>
						<div className={styles.arrow}>
							<img onClick={() => toImage(-1)} src={arrow} alt={'previous'} width={'25px'} height={'25px'} />
						</div>
						<div className={styles.image}>
							<img src={productData.assets[selectedImg].url} alt="product image" />
						</div>
						<div className={styles.arrow}>
							<img style={{transform: 'rotate(180deg)'}} onClick={() => toImage(1)} src={arrow} alt={'next'} width={'25px'} height={'25px'} />
						</div>
					</div>
					<div className={styles.state}>
						{productData.assets.map(( asset, idx, arr ) => (
							<div onMouseDown={() => setImage(idx)}  key={idx} className={`${ styles.circle } ${idx === selectedImg ? styles.selected : ''}`}></div>
						))}
					</div>
					<div className={styles.sizes}>
						<h2>sizes</h2>
						<div className={styles.selector}>
							<div onClick={() => setSize('s')} className={`${styles.sizeButton} ${isSelected('s')}`}>S</div>
							<div onClick={() => setSize('m')} className={`${styles.sizeButton} ${isSelected('m')}`}>M</div>
							<div onClick={() => setSize('g')} className={`${styles.sizeButton} ${isSelected('g')}`}>G</div>
						</div>
					</div>
				</div>
				<div className={styles.info}>
					<div className={styles.title}>
						<h1>{productData.name}</h1>
						<h2>{productData.price.formatted_with_symbol}</h2>
					</div>
					<div className={styles.text}>
						<h3>Description</h3>
						<p>{productData.description}</p>
					</div>
					<div className={styles.text}>
						<h3>Shipping</h3>
						<p>Free shipping to US. <br />
							No international shipping
						</p>
					</div>
					<div className={styles.buttons}>
						<div className={`${styles.button} ${styles.red}`}>Buy</div>
						<div onClick={() => { addToCart(params.id, 1) }} className={styles.button}>Add to Cart</div>
					</div>
				</div>
					{
						windowWidth > 991 
						? Related
						: null
					}
			</div>	
			<div className={styles.navigation}>
				<button>back</button>
				<button>checkout</button>
			</div>
			{
				windowWidth < 992
				? <div className={styles.eita}>
					<h1>Related Products</h1>
					{ Related }
				</div>
				: null
			}
		</section>
	)
	: <div className={styles.item}>
		<Loading className={styles.loading}/>
	</div>

	const Load = (
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} className={styles.item}>
			<div className={styles.headroom}></div>
			<Loading className={styles.loading}/>
		</div>
	)

	// return  Component
	return loading ? Load : Component
}

export default Item;
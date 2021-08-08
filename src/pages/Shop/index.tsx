import React from 'react';
import styles from './style.module.scss';
import search from '../../assets/svg/search.svg';
import { Link, Route, Switch, NavLink } from 'react-router-dom';
import { User } from '../../App';
import ShopGrid from '../../components/ShopGrid';

interface ShopProps {
	user: User,
	addToCart: (product: string, quantity: number) => void,

}

const Shop: React.FC<ShopProps> = ({ user, addToCart }) => {

	const activeStyle = {color: 'black', textDecoration: 'underline'};


	return (
		<div className={styles.shop}>
			<div className={styles.headroom}></div>
			<div className={styles.top}>
				<h1>shop</h1>
				<button><Link to={'/checkout'}>checkout</Link></button>
			</div>
			<div className={styles.border}>
				<div className={styles.board}>
					<div className={styles.picker}>
						<div className={styles.search}>
							<img src={search} alt='search' width={'20px'} height={'20px'} />
							<input type="text" />
						</div>
						<ul className={styles.categories}>
							<li className={styles.categorie}>
								<h3><NavLink activeStyle={activeStyle} exact to={'/shop/categories/hats'}>Hats</NavLink></h3>
								<ul className={styles.subCategories}>
									<li className={styles.subCategorie}><NavLink exact activeStyle={activeStyle} to={'/shop/categories/hats/beanies'}>Beanies</NavLink></li>
									<li className={styles.subCategorie}><NavLink exact activeStyle={activeStyle} to={'/shop/categories/hats/buckets'}>Buckets</NavLink></li>
									<li className={styles.subCategorie}><NavLink exact activeStyle={activeStyle} to={'/shop/categories/hats/caps'}>Caps</NavLink></li>
								</ul>
							</li>
							<li className={styles.categorie}>
								<h3><NavLink exact activeStyle={activeStyle} to={'/shop/categories/jackets'}>Jackets</NavLink></h3>
							</li>
							<li className={styles.categorie}>
								<h3><NavLink exact activeStyle={activeStyle} to={'/shop/categories/sweatshirts'}>Sweatshirts</NavLink></h3>
							</li>
							<li className={styles.categorie}>
								<h3><NavLink exact activeStyle={activeStyle} to={'/shop/categories/shirts'}>Shirts</NavLink></h3>
							</li>
							<li className={styles.categorie}>
								<h3><NavLink exact activeStyle={activeStyle} to={'/shop/categories/accessories'}>Accessories</NavLink></h3>
								<ul className={styles.subCategories}>
									<li className={styles.subCategorie}><NavLink exact activeStyle={activeStyle} to={'/shop/categories/accessories/watches'}>Watches</NavLink></li>
									<li className={styles.subCategorie}><NavLink exact activeStyle={activeStyle} to={'/shop/categories/accessories/glasses'}>Glasses</NavLink></li>
								</ul>
							</li>
						</ul>
					</div>
					<div className={styles.gridItems}>
						<ShopGrid addToCart={addToCart}/>
						{/* <Switch>
							<Route path={'/shop/categories/:type'} render={() => <ShopGrid/>}/>
							<Route path={'/shop/search/:search'} render={() => <ShopGrid/>}/>
						</Switch> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Shop;
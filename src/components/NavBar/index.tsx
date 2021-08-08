import React, { useEffect, useState } from 'react';
import useUserName from '../../hooks/useUserName';
import { Link } from 'react-router-dom';

import SearchImg from '../../assets/svg/search.svg';
import UserIgm from '../../assets/svg/user.svg';
import CartImg from '../../assets/svg/cart.svg';
import MenuImg from '../../assets/svg/menu.svg';

import styles from './style.module.scss';

import { User } from '../../App';

interface NavBar {
	message: string,
	setMenuState: React.Dispatch<React.SetStateAction<boolean>>,
	userInfo: {
		user: User,
		updateUser: React.Dispatch<React.SetStateAction<User>>,
	}
}

const NavBar: React.FC<NavBar> = ({setMenuState, message, userInfo}) => {

	// define this hook later, after setting the backend;
	const userName = useUserName(userInfo.user)

	function toggleMenuState(){
		setMenuState(state => !state);
	}

	const greetings = userInfo.user.isAuthenticated	? `Hello, ${userName}` : '';

	return (
		<div className={styles.wrapper}>
			<div className={styles.message}>
				{ message }	
			</div>
			<header className={styles.header}>
				<div className={styles.infoButtons}>
					<div className={styles.menu}>
						<img onClick={() => setMenuState(state => !state)} src={MenuImg} alt="menu" width={'25px'} height={'25px'} />
					</div>
					<div className={styles.userInfo}>
						{ greetings }
						<img src={UserIgm} alt="user" width={'25px'} height={'25px'} />
					</div>
					<div className={styles.tmlssnss}>
						<Link to={'/'}>
							<h2>tml<span className={styles.tmlGray}>ssnss</span></h2>
						</Link>
					</div>
					<div className={styles.cartInfo}>
						<img src={SearchImg} alt="search" width={'25px'} height={'25px'} className={styles.search} />
						<img src={CartImg} alt="cart" width={'25px'} height={'25px'} />
					</div>
				</div>
				<nav className={styles.navBar}>
					<ul className={styles.navLinks}>
						<li><Link to={'/shop/categories/hats'}>Hats</Link></li>
						<li><Link to={'/shop/categories/jackets'}>Jackets</Link></li>
						<li><Link to={'/shop/categories/sweatshirts'}>Sweatshirts</Link></li>
						<li><Link to={'/shop/categories/shirts'}>Shirts</Link></li>
						<li><Link to={'/shop/categories/accessories'}>Accessories</Link></li>
					</ul>
				</nav>
			</header>
		</div>
	)
}

export default NavBar;
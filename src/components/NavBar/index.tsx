import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Search from '../NavBar/Search';
import SearchImg from '../../assets/svg/search.svg';
import UserIgm from '../../assets/svg/user.svg';
import CartImg from '../../assets/svg/cart.svg';
import CartAdd from '../../assets/svg/cart_add.svg';
import MenuImg from '../../assets/svg/menu.svg';


import styles from './style.module.scss';

import { User } from '../../App';
import useWidth from '../../hooks/useWidth';

interface NavBar {
	setMenuState: React.Dispatch<React.SetStateAction<boolean>>,
	setUserMenu: React.Dispatch<React.SetStateAction<boolean>>,
	setSearchBar: React.Dispatch<React.SetStateAction<boolean>>,
	showNav: boolean,
	justAdded: boolean,
	isSearchVisible: boolean,
	message: string,
	userMenu: boolean,
	userInfo: {
		user: User,
		updateUser: React.Dispatch<React.SetStateAction<User>>,
	},
}

const NavBar: React.FC<NavBar> = ({
	setMenuState, 
	setUserMenu, 
	setSearchBar, 
	showNav,
	message, 
	userInfo, 
	userMenu, 
	isSearchVisible, 
	justAdded
}) => {

	const history = useHistory();
	const { windowWidth } = useWidth();


	function menuClick(e: React.MouseEvent) {
		console.log('clicking on user')	;
		e.stopPropagation();
		setUserMenu(state => !state);
	}

	function searchClick(e: React.MouseEvent){
		console.log('clicking on search');
		e.stopPropagation();
		setSearchBar(state => !state);
	}

	const greetings = userInfo.user.isAuthenticated	? `Hello ${userInfo.user.name}` : '';

	return (
		<div style={!showNav && windowWidth > 991 ? {top: '-145px'} : {top: '0px'}} className={styles.wrapper}>
			<div className={styles.message}>
				{ message }	
			</div>
			<header className={styles.header}>
				<div className={styles.infoButtons}>
					<div className={styles.menu}>
						<img onClick={() => setMenuState(state => !state)} src={MenuImg} alt="menu" width={'25px'} height={'25px'} />
					</div>
					<div className={styles.userInfo}>
						<img onClick={menuClick} src={UserIgm} alt="user" width={'25px'} height={'25px'} />
						<p>{ greetings }</p>
						{ 
							userMenu && !userInfo.user.isAuthenticated 
							? <UnauthenticatedUserMenu className={styles.userMenu}/> 
							: userMenu && userInfo.user.isAuthenticated
							? <AuthenticatedUserMenu className={styles.userMenu}/>
							: null
						}

					</div>
					<div className={styles.tmlssnss}>
						<Link to={'/'}>
							<h2>tml<span className={styles.tmlGray}>ssnss</span></h2>
						</Link>
					</div>
					<div className={styles.cartInfo}>
						<img onClick={searchClick} src={SearchImg} alt="search" width={'25px'} height={'25px'} className={styles.search} />
						<Link to={'/checkout'}><img src={justAdded ? CartAdd : CartImg} alt="cart" width={'25px'} height={'25px'} /></Link>
						<Search setVisibility={setSearchBar} className={styles.searchBar} isVisible={isSearchVisible} />
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

interface UserMenuProps {
	className?: string,
}

const UnauthenticatedUserMenu: React.FC<UserMenuProps> = ({className}) => {
	return (
		<ul onMouseDown={(e) => {e.stopPropagation()}} className={className}>
			<li><Link to={'/login'}>Login</Link></li>
			<li className={styles.signup}><Link to={'/signup'}>Sign Up</Link></li>
		</ul>
	)
}

const AuthenticatedUserMenu: React.FC<UserMenuProps> = ({className}) => {
	return (
		<ul onMouseDown={(e) => {e.stopPropagation()}} className={className}>
			<li><Link to={'/orders'}>Orders</Link></li>
			<li className={styles.signup}><Link to={'/updatePassword'}>Update Password</Link></li>
		</ul>
	)
}

export default NavBar;
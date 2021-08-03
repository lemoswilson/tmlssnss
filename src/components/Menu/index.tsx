import React, { useState } from 'react';
import useWidth from '../../hooks/useWidth';
import { categories } from '../Footer';
import styles from './style.module.scss';
import x from '../../assets/svg/x.svg';
import { Link } from 'react-router-dom';
import useLinksToggler from '../../hooks/useLinksToggler';
import arrow from '../../assets/svg/arrow2.svg';

interface MenuProps {
	close: () => void,
}

const Menu: React.FC<MenuProps> = ({close}) => {

	const { windowWidth } = useWidth()	;
	const { Open, off, openClose } = useLinksToggler(windowWidth);


	const toggleAbout = Open.about
    ? `${styles.open}`
    : off.about
        ? `${styles.close}`
        : ''

	const toggleCustomer = Open.customer
	? `${styles.open}`
	: off.customer
		? `${styles.close}`
		: ''

	const toggleContact = Open.contact
	? `${styles.open}`
	: off.contact
		? `${styles.close}`
		: ''


	return (
		<section className={styles.menu}>
			<div className={styles.top}>
				<div className={styles.tmlssnss}>
					<h2>tml<span className={styles.tmlGray}>ssnss</span></h2>
				</div>
				<div className={styles.close}>
					<img src={x} alt="close" />
				</div>
			</div>		
			<ul className={styles.linkList}>
				<li className={styles.link}><Link to={'/shop/hats'}>Hats</Link></li>
				<li className={styles.link}><Link to={'shop/jackets'}>Jackets</Link></li>
				<li className={styles.link}><Link to={'shop/sweatshirts'}>Sweatshirts</Link></li>
				<li className={styles.link}><Link to={'shop/shirts'}>Shirts</Link></li>
				<li className={styles.link}><Link to={'shop/accessories'}>Accessories</Link></li>
			</ul>
			<div className={styles.login}>login</div>
			<ul className={styles.linklist}>

							<li className={`${styles.linksection}`}>
								<div onClick={() => {openClose('about')}} className={styles.topic}>
									<div className={styles.link}>About</div>
									<img className={styles.arrow} src={arrow} alt={'downarrow'} />
								</div>
								<ul className={`${styles.topicList} ${toggleAbout}`}>
									<li className={styles.item}><Link to={'/carreers'}>Carreers</Link></li>
									<li className={styles.item}><Link to={'/press'}>Press</Link></li>
									<li className={styles.item}><Link to={'/stores'}>Store</Link></li>
								</ul>
							</li>

							<li className={`${ styles.border } ${styles.linksection}`}>
								<div onClick={() => {openClose('customer')}} className={styles.topic}>
									<div className={styles.link}>Customer Service</div>
									<img className={styles.arrow} src={arrow} alt={'downarrow'} />
								</div>
								<ul className={`${styles.topicList} ${toggleCustomer}`}>
									<li className={styles.item}><Link to={'/help'}>Help</Link></li>
									<li className={styles.item}><Link to={'/shipping'}>Shipping</Link></li>
									<li className={styles.item}><Link to={'/returns'}>Returns</Link></li>
									<li className={styles.item}><Link to={'/payments'}>Payments</Link></li>
									<li className={styles.item}><Link to={'/orders'}>Orders</Link></li>
								</ul>
							</li>

							<li className={`${ styles.border } ${styles.bottom} ${styles.linksection}`}>
								<div onClick={() => {openClose('contact')}} className={styles.topic}>
									<div className={styles.link}>Contact Us</div>
									<img className={styles.arrow} src={arrow} alt="" />
								</div>
								<ul className={`${styles.topicList} ${toggleContact}`}>
									<li className={styles.item}><Link to={'/tel'}>+1 (831) 295-2230</Link></li>
									<li className={styles.item}><Link to={'/email'}>Email us</Link></li>
								</ul>
							</li>
						</ul>
		</section>
	)
}

export default Menu;
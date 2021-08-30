import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useWidth from '../../hooks/useWidth';

import { cleanPath } from '../ShopGrid';

import styles from './style.module.scss';

import instagram from '../../assets/svg/instagram.svg';
import facebook from '../../assets/svg/facebook.svg';
import tiktok from '../../assets/svg/tiktok.svg';
import wapps from '../../assets/svg/wapps.svg'
import downarrow from '../../assets/svg/downArrow.svg';
import master from '../../assets/svg/masterCard.svg';
import amex from '../../assets/svg/american-express.svg';
import visa from '../../assets/svg/visa.svg'
import useLinksToggler from '../../hooks/useLinksToggler';

export interface categories {
	about: boolean,
	customer: boolean,
	contact: boolean,
}

const Footer: React.FC = () => {
	const location = useLocation();
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

	const noShow = 
		location.pathname === '/login' || location.pathname === '/signup' || cleanPath(location.pathname)[0] === 'shop'
		? true
		: false

	return (
		<section style={ noShow ? {display: 'none'} : {}} className={styles.footer}>
			<div className={styles.sectionBorder}>
				<div className={styles.mail}>
					<div className={styles.call}>
						<h2>sign up to the tmlssnss mailing list</h2>
						<p>sign up for exclusive early sale access and tailored <br/>new arrival</p>
					</div>
					<div className={styles.signUp}>
						<form className={styles.mailInput}>
							<h3>email address</h3>
							<div className={styles.input}>
								<input  type="email" />
								<button type={'submit'} className={styles.submit}>
									sign up
								</button>
							</div>
							<div className={styles.socials}>
								<img src={instagram} alt="instagram" />
								<img src={tiktok} alt="tiktok" />
								<img src={facebook} alt="facebook" />
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className={styles.sectionBorder}>
				<div className={styles.links}>
					<div className={styles.inSite}>
						<ul className={styles.linkList}>

							<li className={`${styles.linksection}`}>
								<div onClick={() => {openClose('about')}} className={styles.topic}>
									<div className={styles.link}>About</div>
									<img className={styles.arrow} src={downarrow} alt={'downarrow'} />
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
									<img className={styles.arrow} src={downarrow} alt={'downarrow'} />
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
									<img className={styles.arrow} src={downarrow} alt="" />
								</div>
								<ul className={`${styles.topicList} ${toggleContact}`}>
									<li className={styles.item}><Link to={'/tel'}>+1 (831) 295-2230</Link></li>
									<li className={styles.item}><Link to={'/email'}>Email us</Link></li>
								</ul>
							</li>
						</ul>
					</div>
					<div className={styles.apps}>
						<img className={styles.wapps} src={wapps} alt={'wapps'} />
						<p>Our Apps</p>
					</div>
				</div>
			</div>
			<div className={styles.sectionBorder}>
				<div className={styles.footnotes}>
					<div className={styles.tmlssnss}>
						<h2>tml<span className={styles.tmlGray}>ssnss</span></h2>
					</div>					
					<div className={styles.footItem}>
						Terms &amp; Conditions
					</div>
					<div className={styles.footItem}>
						Privacy Policy
					</div>	
					<div className={styles.footItem}>
						Other Policies
					</div>
					<div className={styles.lastInfo}>
						<div className={styles.paymentMethods}>
							<img className={styles.card} src={master} alt='mastercard' />
							<img className={`${styles.card} ${styles.margin}`} src={amex} alt='americanexpress' />
							<img className={`${styles.card} ${styles.margin}`} src={visa} alt='visa' />
						</div>
						<div className={styles.devInfo}>
							Designed and developed by Wilson Lemos
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Footer;
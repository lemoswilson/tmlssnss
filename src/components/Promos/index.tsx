import React from 'react';
import styles from './style.module.scss'
import tosqueira from '../../assets/images/tosqueira_resized.jpg'
import downup from '../../assets/images/downup_ori.jpg';
import { Link } from 'react-router-dom';


const Promos: React.FC = () => {
	return (
		<section className={styles.promotion}>
			<div className={styles.promoGrid}>
				<div className={styles.gridItem}>
					<div className={styles.dummy}></div>
					<div className={styles.promo}>
						<img className={styles.tosqueira} src={tosqueira} alt="promo code" />
						<div className={styles.promoMessage}>
							<h1>
								it's more than <br/>fashion
							</h1>
							<p>it's your identity <br/>
								<Link to={'/shop'}>shop now</Link>
							</p>
						</div>
					</div>
				</div>
				<div className={styles.gridItem}>
					<div className={styles.promo}>
						<img className={styles.downup} src={downup} alt="promo code" />
						<div className={styles.promoMessage}>
							<h1>
								be bold, <br/>
								be unique
							</h1>
							<p>buy 2 get 30% off <br/>
								<Link to={'/shop'}>shop now</Link>
							</p>
						</div>
					</div>
					<div className={styles.dummy}></div>
				</div>
			</div>
		</section>
	)
};

export default Promos;
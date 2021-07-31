import React from 'react';
import styles from './style.module.scss';
import bean from '../../assets/images/follow/bean.jpg';
import estralo from '../../assets/images/follow/estralo.jpg';
import hoodie from '../../assets/images/follow/hoodie.jpg';
import mato from '../../assets/images/follow/mato.jpg';
import street from '../../assets/images/follow/street.jpg';
import arrowFollow from '../../assets/svg/arrow_follow.svg';

const Follow: React.FC = () => {
	const message = 'Follow us on instagram <br/> for fresh updates';

	return (
		<section className={styles.follow}>
			<h2 dangerouslySetInnerHTML={{__html: message}} className={styles.message}>
			</h2>
			<img src={arrowFollow} className={styles.hide} width={'20px'} height={'20px'} />

			<div className={styles.imageGrid}>
				<div className={`${styles.gridItem} ${styles.start}`}>
					<img className={styles.image} src={bean} alt="" />
				</div>
				<div className={`${styles.gridItem} ${styles.end}`}>
					<img src={mato} alt="" className={styles.image}/>
					<div className={styles.wrap}>
						<div dangerouslySetInnerHTML={{__html: message}} className={styles.messageIn}>
						</div>
						<img className={styles.arrota} src={arrowFollow} width={'20px'} height={'20px'} />
					</div>
				</div>
				<div className={`${styles.gridItem} ${styles.center}`}>
					<img src={street} alt="" className={styles.image}/>
				</div>
				<div className={`${styles.gridItem} ${styles.hide} ${styles.end}`}>
					<img src={hoodie} alt="" className={styles.image}/>
				</div>
				<div className={`${styles.gridItem} ${styles.hide} ${styles.start}`}>
					<img src={estralo} alt="" className={styles.image}/>
				</div>
			</div>		
		</section>
	)
}

export default Follow;
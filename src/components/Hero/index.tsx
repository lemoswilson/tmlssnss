import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import wendy from '../../assets/images/wendy_ori.jpg';
import arrow from '../../assets/svg/arrow.svg';
import useWidth from '../../hooks/useWidth';

const Hero: React.FC = () => {

	const { widthStyle, windowWidth } = useWidth()

	return (
		<section className={styles.hero} style={widthStyle}>

			<div className={styles.headroom}></div>

			<ul className={styles.slider} style={{width: windowWidth ? windowWidth * 3 : window.innerWidth * 3}}>
				<li className={`${ styles.si } ${styles.img1}`} style={widthStyle}>
					<div className={styles.ca}>
						<h1 className={styles.text}>
							Let your <br/>
							<span className={styles.hollow}>style</span> <br/>
							speak for you
						</h1>
						<button className={styles.shop}>
							shop now
						</button>
					</div>

					<div className={styles.background}>
						<img className={styles.wendy} src={wendy} alt='alt1' />
					</div>
				</li>

				<li className={`${ styles.si } ${styles.img2}`} style={widthStyle}>

					<div className={styles.ca}>
						<h1 className={styles.text}>
							built <br/>
							<span className={styles.hollow}>differently</span>
						</h1>
						<button className={styles.shop}>
							shop now
						</button>
					</div>


					<div className={styles.background}>
						
						<div className={styles.boots}></div>	
					</div>
				</li>

				<li className={`${ styles.si } ${styles.img3}`} style={widthStyle}>

					<div className={styles.ca}>
						<h1 className={styles.text}>
							<span className={styles.hollow}>timeless</span><br/>
							fashion 
						</h1>
						<button className={styles.shop}>
							shop now
						</button>
					</div>

					<div className={styles.background}>
						<div className={styles.alo}></div>

					</div>
				</li>
			</ul>	

			<div className={styles.navigation}>
				<div className={styles.arrow}>
					<img src={arrow} alt="prev" className={`${ styles.prev } ${styles.arrowSvg}`} />
				</div>
				<div className={styles.arrow}>
					<img src={arrow} alt="next" className={styles.arrowSvg} />
				</div>
			</div>

			<div className={styles.heroState}>
				<div className={`${ styles.state } ${styles.selected}`}></div>
				<div className={styles.state}></div>
				{/* <div className={styles.state}></div> */}
				<div className={styles.state}></div>
			</div>
		</section>
	)
}

export default Hero;
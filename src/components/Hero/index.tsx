import React, { useState } from 'react';
import styles from './style.module.scss';
import wendy from '../../assets/images/wendy_ori.jpg';
import arrow from '../../assets/svg/arrow.svg';
import useWidth from '../../hooks/useWidth';
import { useRef } from 'react';

const Hero: React.FC = () => {

	const { widthStyle, windowWidth } = useWidth()
	const [sliderPosition, setPosition] = useState(0);
	const [activeGroup, setActive] = useState(0);
	const [xCoord, setXCoord] = useState(0);
	const blocker_ref = useRef(false);
	const target_ref = useRef(0);

	// function nextAnimation(){
	// 	if (xCoord === target_ref.current){
	// 		blocker_ref.current = false;
	// 	} else {
	// 		setXCoord(s => s + 1);
	// 		requestAnimationFrame(nextAnimation)
	// 	}
	// }

	// function previousAnimation(){
	// 	if (xCoord === target_ref.current){
	// 		blocker_ref.current = false;
	// 	} else {
	// 		setXCoord(s => s - 1);
	// 		requestAnimationFrame(previousAnimation)
	// 	}
	// }

	function move(direction: number) {
		if (xCoord === target_ref.current){
			blocker_ref.current = false;
		} else {
			setXCoord(s => direction > 0 ? s + 1 : s - 1)
			requestAnimationFrame(() => move(direction))
		}
	}

	function nextImage(){
		blocker_ref.current = true;
		if (sliderPosition === 2 && activeGroup === 1){
			setXCoord(200);
			target_ref.current = 300;
			setTimeout(() => { move(1) }, 500)

			// setTimeout(nextAnimation, 500)
		} else if (sliderPosition === 2 && activeGroup === 0) {
			setActive(1)
			target_ref.current = 300;
			move(1)
			// nextAnimation()
		} else {
			target_ref.current += 100;
			move(1)
			// nextAnimation();
		}

		setPosition(state => (state + 1) % 3)
	}

	function previousImage(){
		blocker_ref.current = true;	
		if (sliderPosition === 0 && activeGroup === 0){
			setXCoord(300);
			target_ref.current = 200;
			setTimeout(() => move(-1), 500);
			// setTimeout(previousAnimation, 500)
		} else if (sliderPosition === 0 && activeGroup === 1){
			setActive(0)
			target_ref.current = 200;
			move(-1)
			// previousAnimation()
		} else {
			target_ref.current -= 100;
			move(-1)
			// previousAnimation();
		}

		setPosition(state => (state - 1) % 3);
	}

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
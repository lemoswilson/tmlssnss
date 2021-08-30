import React, { useState } from 'react';
import styles from './style.module.scss';
import wendy from '../../assets/images/wendy_ori.jpg';
import arrow from '../../assets/svg/arrow.svg';
import useWidth from '../../hooks/useWidth';
import { useRef } from 'react';
import { useEffect } from 'react';

function mod(n: number, m: number){
	return ( (n % m) + m ) % m
}

const Hero: React.FC = () => {

	const RATE = 6;
	const TIMEOUT = 100;


	const { widthStyle, windowWidth } = useWidth()
	const [sliderPosition, setPosition] = useState(0);
	const [activeGroup, setActive] = useState(0);
	const [xCoord, setXCoord] = useState(0);

	const xCoord_ref = useRef(xCoord);
	const blocker_ref = useRef(false);
	const target_ref = useRef(0);
	const animation_ref = useRef<any>();

	useEffect(() => { xCoord_ref.current = xCoord }, [xCoord])

	function nextAnimation(){
		if (xCoord_ref.current === target_ref.current){
			blocker_ref.current = false;
			clearInterval(animation_ref.current);
		} else {
			setXCoord(s => s - 1);
		}
	}

	function previousAnimation(){
		if (xCoord_ref.current === target_ref.current){
			blocker_ref.current = false;
			clearInterval(animation_ref.current);
		} else {
			setXCoord(s => { 
				return s + 1 
			});
		}
	}

	function nextImage(){
		blocker_ref.current = true;
		if (sliderPosition === 2 && activeGroup === 1){
			setXCoord(-200);
			target_ref.current = -300;
			setTimeout(() => {
				animation_ref.current = setInterval(nextAnimation, RATE);
			}, TIMEOUT)
		} else if (sliderPosition === 2 && activeGroup === 0) {
			setActive(1)
			target_ref.current = -300;
			animation_ref.current = setInterval(nextAnimation, RATE);
		} else {
			target_ref.current -= 100;
			animation_ref.current = setInterval(nextAnimation, RATE);
		}

		setPosition(state => mod(state + 1, 3))
	}

	function previousImage(){
		blocker_ref.current = true;	
		if (sliderPosition === 0 && activeGroup === 0){
			setXCoord(-300);
			target_ref.current = -200;
			setTimeout(() => {
				animation_ref.current = setInterval(previousAnimation, RATE);
			}, TIMEOUT);
		} else if (sliderPosition === 0 && activeGroup === 1){
			setActive(0)
			target_ref.current = -200;
			animation_ref.current = setInterval(previousAnimation, RATE);
		} else {
			target_ref.current += 100;
			animation_ref.current = setInterval(previousAnimation, RATE);
		}

		setPosition(state => mod(state-1, 3));
	}

	return (
		<section className={styles.hero} style={widthStyle}>

			<div className={styles.headroom}></div>
			<div style={{left: `${xCoord}vw`}} className={styles.wrapper}>
				<Slider widthStyle={widthStyle} windowWidth={windowWidth} />
				<Slider widthStyle={widthStyle} windowWidth={windowWidth}/>
			</div>

			<div className={styles.navigation}>
				<div className={styles.arrow}>
					<img 
						onClick={() => !blocker_ref.current ? previousImage() : () => {}} 
						src={arrow} 
						alt="prev" 
						className={`${ styles.prev } ${styles.arrowSvg}`} 
					/>
				</div>
				<div className={styles.arrow}>
					<img 
						onClick={() => !blocker_ref.current ? nextImage() : () => {}} 
						src={arrow} 
						alt="next" 
						className={styles.arrowSvg} 
					/>
				</div>
			</div>

			<div className={styles.heroState}>
				{ [...Array(3).keys()].map(n => (
					<div key={n} className={`${styles.state} ${n === sliderPosition ? styles.selected : ''}`}></div>
				))}
			</div>


		</section>
	)
}

interface SliderProps {
	windowWidth: number,
	widthStyle: React.CSSProperties,
}

const Slider: React.FC<SliderProps> = ({windowWidth, widthStyle}) => {

	return (
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
	)
};

export default Hero;
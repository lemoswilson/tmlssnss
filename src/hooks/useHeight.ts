import React, { useEffect, useState } from 'react';
import usePrevious from './usePrevious';

export default function useHeight() {
	const [windowHeight, setHeight] = useState<number>(window.innerHeight);
	const heightStyle = {height: windowHeight ? windowHeight : window.innerHeight };
	const previousHeight = usePrevious(windowHeight);


	useEffect(() => {
		function handleResize(){
			console.log(window.innerWidth);
			setHeight(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		}

	}, [])

	return {
		windowHeight,
		heightStyle,
		previousHeight
	}
}
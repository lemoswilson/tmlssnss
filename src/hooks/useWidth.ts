import React, { useEffect, useState } from 'react';
import usePrevious from './usePrevious';

export default function useWidth() {
	const [windowWidth, setWidth] = useState<number>(window.innerWidth);
	const widthStyle = {width: windowWidth ? windowWidth : window.innerWidth };
	const previousWidth = usePrevious(windowWidth);


	useEffect(() => {
		function handleResize(){
			console.log(window.innerWidth);
			setWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		}

	}, [])

	return {
		windowWidth,
		widthStyle,
		previousWidth
	}
}
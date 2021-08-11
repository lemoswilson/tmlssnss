import React, { useEffect } from 'react';
import useWidth from './useWidth';

export default function useBlockOverflow(isMenuOpen: boolean) {
	const { windowWidth } = useWidth();

	useEffect(() => {
		if (windowWidth < 992 && isMenuOpen) {
			document.body.style.overflow = 'hidden';
			// document.body.style.overflowX = 'hidden';
			// document.body.style.overflowY = 'auto';
			
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [windowWidth, isMenuOpen])
}
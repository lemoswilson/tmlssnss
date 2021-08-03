import React, { useEffect } from 'react';
import useWidth from './useWidth';

export default function useBlockOverflow(isMenuOpen: boolean) {
	const { windowWidth } = useWidth();

	useEffect(() => {
		if (windowWidth < 992 && isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [windowWidth, isMenuOpen])
}
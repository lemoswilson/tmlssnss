import React from 'react';
import styles from './style.module.scss';
import useWidth from '../../hooks/useWidth';

interface OverlayProps {
	isMenuOpen: boolean,
	closeMenu: () => void,

}

const Overlay: React.FC<OverlayProps> = ({isMenuOpen}) => {
	const { windowWidth } = useWidth();
	const show = isMenuOpen && windowWidth < 992 ? {display: 'flex'} : {}

	return (
		<div  style={show} className={styles.overlay}></div>
	)
}

export default Overlay;
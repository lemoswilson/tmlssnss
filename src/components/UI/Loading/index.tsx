import React from 'react';
import loading from '../../../assets/svg/loading.svg';
import styles from './style.module.scss';

interface LoadingProps {
	className?: string,
	imgClassName?: string,
}

const Loading: React.FC<LoadingProps> = ({className, imgClassName}) => {

	return (
		<div className={className}>
			<img className={`${imgClassName} ${styles.img}`} src={loading} alt={loading} />
		</div>
	)
}

export default Loading;
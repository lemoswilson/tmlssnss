import React from 'react';

interface CartProps {
	width?: string | number,
	height?: string | number,
	className?: string,
}

const Cart: React.FC<CartProps> = ({height, width, className}) => {
	return (
		<svg width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 512">
			<path d="M199.039 373.884A46.058 46.058 0 1 0 245.1 419.941 46.111 46.111 0 0 0 199.039 373.884zM380.316 373.884a46.058 46.058 0 1 0 46.059 46.057A46.111 46.111 0 0 0 380.316 373.884zM455.132 127.679H141.567l-6.8-40.047A49.869 49.869 0 0 0 85.475 46H56.868a10 10 0 1 0 0 20H85.474A29.92 29.92 0 0 1 115.05 90.979l36.21 213.315a49.871 49.871 0 0 0 49.3 41.632H413.729a10 10 0 0 0 0-20H200.556a29.92 29.92 0 0 1-29.576-24.979L167.34 279.5H376.362a59.816 59.816 0 0 0 57.131-41.666l31.161-97.1a10 10 0 0 0-9.522-13.055z"/>
		</svg>
	)
}

export default Cart;
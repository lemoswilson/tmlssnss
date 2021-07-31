import React from 'react';

interface SearchProps {
	width?: string | number,
	height?: string | number,
	className?: string,
}

const Search: React.FC<SearchProps> = ({height, width, className}) => {
	return (
		<svg width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<g data-name="Layer 2">
				<g data-name="search"><rect width="24" height="24" opacity="0"/>
					<path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"/>
				</g>
			</g>
		</svg>
	)
}

export default Search;
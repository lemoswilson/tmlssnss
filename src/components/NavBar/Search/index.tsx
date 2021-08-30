import React, {useState, useRef } from 'react';
import algoliasearch from 'algoliasearch';
import { Link } from 'react-router-dom';
import { InstantSearch, Hits, HitsProps, SearchBox } from 'react-instantsearch-dom';
import styles from './style.module.scss';
import { useEffect } from 'react';
import x from '../../../assets/svg/x.svg';
import './general.scss';


console.log('keys are',
	process.env.REACT_APP_PUBLIC_ALGOLIA_APP_ID,
	process.env.REACT_APP_PUBLIC_ALGOLIA_SEARCH_KEY,
)

const client = algoliasearch(
	process.env.REACT_APP_PUBLIC_ALGOLIA_APP_ID,
	process.env.REACT_APP_PUBLIC_ALGOLIA_SEARCH_KEY,
)



const SearchResultItem: React.FC<any> = ({hit}) => {
	useEffect(() => {
		console.log('the hit is', hit);
	}, [])

	function onClick(path: string){
		window.location.href = path;
	}
	return (
		<div onClick={() => onClick(`/item/${hit.id}`)} className={styles.searchResultItem}>
			<Link to={`/item/${hit.id}`}>
				<img src={hit.assets[0].url} alt={hit.name} />
				<div className={styles.name}>{hit.name}</div>
				<div className={styles.price}>{hit.price.formatted_with_symbol}</div>
			</Link>
		</div>
	)
};

interface SearchProps {
	setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	isVisible: boolean,
	className?: string
}

const Search: React.FC<SearchProps> = ({isVisible, className, setVisibility}) => {
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const [show, setShow] = useState(false);

	function onChange(e: React.SyntheticEvent<HTMLInputElement>){
		if ((e.target as any).value.length === 0)
			setShow(false)
		else if ((e.target as any).value.length > 0)
			setShow(true)
	}

	const shouldHideResults = !show ? styles.hide : '';
	const shouldShowSearch = isVisible ? styles.show : '';

	useEffect(() => {

	}, [])


	return (
		<div 
			onMouseDown={(e) => {e.stopPropagation()}} 
			className={`${styles.search} ${className} ${shouldShowSearch}`}
		>
			<div className={styles.close}>
				<img onClick={() => setVisibility(false)} src={x} alt="close" />
			</div>
			<div className={styles.margin}>
				<InstantSearch searchClient={client} indexName="tmlssnss">
					<SearchBox onChange={onChange} inputRef={inputRef} translations={{placeholder: 'Search for products' }} />
						<div className={`${styles.hitsWrapper} ${shouldHideResults}`}>
							<Hits hitComponent={SearchResultItem}/>
						</div>
				</InstantSearch>
			</div>
		</div>
	)
}

export default Search;
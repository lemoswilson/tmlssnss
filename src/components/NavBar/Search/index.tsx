import React, {useState, useRef } from 'react';
import algoliasearch from 'algoliasearch';
import { Link } from 'react-router-dom';
import { InstantSearch, Hits, HitsProps, SearchBox, PoweredBy } from 'react-instantsearch-dom';
import styles from './style.module.scss';
import { useEffect } from 'react';
import x from '../../../assets/svg/x.svg';
import './general.scss';

const client = algoliasearch(
	process.env.REACT_APP_PUBLIC_ALGOLIA_APP_ID,
	process.env.REACT_APP_PUBLIC_ALGOLIA_SEARCH_KEY,
)

const SearchResultItem: React.FC<any> = ({hit}) => {

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
		// const target: any = document.querySelector('ais-SearchBox')
		// if (target && target.style){
		// 	target.style.display = 'flex';
		// 	target.style.flexDirection = 'row';
		// 	target.appendChild(<PoweredBy/>)
		// }
		const parent = inputRef.current.parentElement?.parentElement;
		if (parent){
			parent.style.display = 'flex'
			parent.style.flexDirection = 'row';
			// parent.appendChild(<PoweredBy/>)
		}

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
							<PoweredBy/>
					<SearchBox onChange={onChange} inputRef={inputRef} translations={{placeholder: 'Search for products' }} />
						<div className={`${styles.hitsWrapper} ${shouldHideResults}`}>
							<Hits hitComponent={SearchResultItem}/>
						</div>
				</InstantSearch>
				{/* <PoweredBy searchClient={client} indexName="tmlssnss">
					<SearchBox onChange={onChange} inputRef={inputRef} translations={{placeholder: 'Search for products' }} />
						<div className={`${styles.hitsWrapper} ${shouldHideResults}`}>
							<Hits hitComponent={SearchResultItem}/>
						</div>
				</PoweredBy> */}
			</div>
		</div>
	)
}

export default Search;
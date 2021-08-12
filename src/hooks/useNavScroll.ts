import React, {useState, useEffect, useRef} from 'react';

export default function useNavScroll(){

	const [scrollTop, setScrollTop] = useState(0);
	const [navBarShow, setNavBarShow] = useState(true);
	const navBarShow_ref = useRef(navBarShow)
	const scrollTop_ref = useRef<number>(scrollTop);

	useEffect(() => {
		scrollTop_ref.current = scrollTop;
	}, [scrollTop]);

	useEffect(() => {
		navBarShow_ref.current = navBarShow;
	}, [navBarShow]);
  
	function onScroll(this: Document, event: Event){
	
		if (this.scrollingElement?.scrollTop && scrollTop_ref.current < this.scrollingElement.scrollTop && navBarShow_ref.current) {
			setNavBarShow(false)
		}
		else if (this.scrollingElement?.scrollTop && scrollTop_ref.current > this.scrollingElement.scrollTop && !navBarShow_ref.current) {
			setNavBarShow(true)
		}

		if (this.scrollingElement?.scrollTop) {
			setScrollTop(this.scrollingElement.scrollTop)
		}
	}
  
	useEffect(() => {
	  document.addEventListener('scroll', onScroll);
	  return () => {
		document.removeEventListener('scroll', onScroll);
	  }
	}, [])

	return navBarShow

}


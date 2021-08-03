import React, { useState } from 'react';
import { categories } from '../components/Footer';


export default function useLinksToggler(
	windowWidth: number,
){
	const [Open, setOpen] = useState<categories>({
		about: false,
		customer: false,
		contact: false,
	});
	const [off, setOff] = useState<categories>({
		about: false,
		customer: false,
		contact: false,
	});


    const openClose = (category: keyof categories) => {
		if (windowWidth > 991) return;

        if (Open[category]) {
            setOff(state => ({
				...state,
				[category]: true,
			}))
            setTimeout(() => {
                setOff(state => ({
					...state,
					[category]: false,
				}));
            }, 330);
        }

        setOpen(state => ({
			...state,
			[category]: !state[category]
		}))
    }

	return {
		openClose, 
		Open, 
		off,
	}
}
import React, { useRef, useEffect } from 'react';
import { shippingDataBoolean } from '../pages/Checkout';

export default function useRedUnerline(
	shippingFlags: shippingDataBoolean,
){

	const ref_first_name = useRef() as React.MutableRefObject<HTMLParagraphElement>;
	const ref_last_name = useRef() as React.MutableRefObject<HTMLParagraphElement>;
	const ref_email = useRef() as React.MutableRefObject<HTMLParagraphElement>;
	const ref_add = useRef() as React.MutableRefObject<HTMLParagraphElement>;
	const ref_add_2 = useRef() as React.MutableRefObject<HTMLParagraphElement>;
	const ref_city = useRef() as React.MutableRefObject<HTMLParagraphElement>;
	const ref_state = useRef() as React.MutableRefObject<HTMLParagraphElement>;
	const ref_zip_code = useRef() as React.MutableRefObject<HTMLParagraphElement>;
	const ref_country = useRef() as React.MutableRefObject<HTMLParagraphElement>;
	const ref_option = useRef() as React.MutableRefObject<HTMLParagraphElement>;


	useEffect(() => {
		console.log('should e setting first_name red underline');
		if (shippingFlags.first_name && ref_first_name.current)
			ref_first_name.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.first_name && ref_first_name.current)	
			ref_first_name.current.style.borderBottom = '';
	}, 	[shippingFlags.first_name])

	useEffect(() => {
		if (shippingFlags.last_name && ref_last_name.current)
			ref_last_name.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.last_name && ref_last_name.current)	
			ref_last_name.current.style.borderBottom = '';
	}, 	[shippingFlags.last_name])

	useEffect(() => {
		if (shippingFlags.email && ref_email.current)
			ref_email.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.email && ref_email.current)	
			ref_email.current.style.borderBottom = '';
	}, 	[shippingFlags.email])

	useEffect(() => {
		if (shippingFlags.add && ref_add.current)
			ref_add.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.add && ref_add.current)	
			ref_add.current.style.borderBottom = '';
	}, 	[shippingFlags.add])

	useEffect(() => {
		if (shippingFlags.add_2 && ref_add_2.current)
			ref_add_2.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.add_2 && ref_add_2.current)	
			ref_add_2.current.style.borderBottom = '';
	}, 	[shippingFlags.add_2])

	useEffect(() => {
		if (shippingFlags.city && ref_city.current)
			ref_city.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.city && ref_city.current)	
			ref_city.current.style.borderBottom = '';
	}, 	[shippingFlags.city])

	useEffect(() => {
		if (shippingFlags.state && ref_state.current)
			ref_state.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.state && ref_state.current)	
			ref_state.current.style.borderBottom = '';
	}, 	[shippingFlags.state])

	useEffect(() => {
		if (shippingFlags.zip && ref_zip_code.current)
			ref_zip_code.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.zip && ref_zip_code.current)	
			ref_zip_code.current.style.borderBottom = '';
	}, 	[shippingFlags.zip])

	useEffect(() => {
		if (shippingFlags.country && ref_country.current)
			ref_country.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.country && ref_country.current)	
			ref_country.current.style.borderBottom = '';
	}, 	[shippingFlags.country])

	useEffect(() => {
		if (shippingFlags.option && ref_option.current)
			ref_option.current.style.borderBottom = '1px solid red';
		else if (!shippingFlags.option && ref_option.current)	
			ref_option.current.style.borderBottom = '';
	}, 	[shippingFlags.option])


	return {
		ref_first_name, 
		ref_last_name, 
		ref_email, 
		ref_add, 
		ref_add_2, 
		ref_city, 
		ref_state, 
		ref_zip_code, 
		ref_country, 
		ref_option, 
	}
}

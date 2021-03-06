import React, { useState, useRef, ChangeEvent } from 'react';
import styles from './shipment.module.scss';
import { CheckoutDataProps } from '../../pages/Checkout';
import { useForm, UseFormRegister, FieldValues } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { shippingData } from '../../pages/Checkout';
import x from '../../assets/svg/x.svg';
import { useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';

interface ShipmentProps extends CheckoutDataProps {
	setShippingData: React.Dispatch<React.SetStateAction<shippingData>>,
	register: UseFormRegister<FieldValues>,
	checkoutToken?: CheckoutToken,
}

const Shipment: React.FC<ShipmentProps> = ({
	register,
	checkoutToken,
}) => {

	const [shippingCountries, setShippingCountries] = useState({});
	const [shippingCountry, setShippingCountry] = useState('');
	const [shippingSubdivisions, setShippingSubdivisions] = useState({});
	const [shippingSubdivision, setShippingSubdivision] = useState('');
	const [shippingOptions, setShippingOptions] = useState({});
	const [shippingOption, setShippingOption] = useState('');

	async function fetchShippingContries(checkoutTokenId: string){
		if (checkoutToken){
			const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
			setShippingCountries(countries);
			setShippingCountry(Object.keys(countries)[0]);
		}
	}

	async function fetchSubdivisions(countryCode: string){
		const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
	
		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	  };
	
	  async function fetchShippingOptions(checkoutTokenId: string, country: string, stateProvince: string | undefined = undefined){
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
		console.log('the shipping options are', options);
	
		setShippingOptions(options);
	  };

	useEffect(() => {
		if (checkoutToken)
			fetchShippingContries(checkoutToken.id);
	}, [])

	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(shippingCountry)
	}, [shippingCountry])

	useEffect(() => { 
		if (shippingSubdivision && checkoutToken) fetchShippingOptions(checkoutToken?.id, shippingCountry, shippingSubdivision)
	}, [shippingSubdivision])

	return (
		<div className={styles.form} >
			<div className={styles.loginGrid}>

				<div className={styles.field}>
					<p>First Name</p>
					<input type="text" {...register('first_name', { required: true})}/>
				</div>
				<div className={styles.field}>
					<p>Last Name</p>
					<input type="text" {...register('last_name', { required: true})}/>
				</div>
				<div className={styles.field}>
					<p>Email</p>
					<input type="email" {...register('email', { required: true})}/>
				</div>
				<div className={styles.field}>
					<p>Address Line 1</p>
					<input type="text" {...register('add', { required: true})}/>
				</div>
				<div className={styles.field}>
					<p>Address Line 2</p>
					<input type="text" {...register('add_2')}/>
				</div>
				<div className={styles.field}>
					<p>City</p>
					<input type="text" {...register('city', { required: true})}/>
				</div>
				<div className={styles.field}>
					<p>State</p>
					<select {...register('state', { required: true })} onChange={(e) => { setShippingSubdivision(e.target.value)}} >
						<option disabled selected></option>
						{ Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name})).map(item => (
							<option value={item.id} key={item.id}>
								{ ( item.label ) as any }
							</option>
						))}
					</select>

				</div>
				<div className={styles.field}>
					<p>Zip Code/Postal Code</p>
					<input type="number" {...register('zip', { required: true })}/>
				</div>
				<div className={styles.field}>
					<p>Country</p>
					<select {...register('country', { required: true })} onChange={(e) => {setShippingCountry(e.target.value)}} >
						<option disabled selected></option>
						{ Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name})).map(item => (
							<option key={item.id} value={item.id}>{(item.label) as any}</option>
						))}
					</select>
				</div>
				<div className={styles.field}>
					<p>Shipping Options</p>
					<select {...register('option', { required: true })} onChange={(e) => { setShippingOption(e.target.value)}} >
						<option disabled selected></option>
						{
							Object.values(shippingOptions).map((ship: any) => (
								<option key={ship.id} value={ship.id}> {ship.description} - {ship.price.formatted_with_symbol} </option>
							))
						}
					</select>
				</div>
			</div>
		</div>
	)
}

export default Shipment;
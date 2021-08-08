import React, { useState } from 'react';
import styles from '../Recover/style.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { User } from '../../App';
import useAuthenticate from '../../hooks/useAuthenticate';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface ResetProps {
	user: User,
	updateUser: React.Dispatch<React.SetStateAction<User>>,
}

const Reset: React.FC<ResetProps> = ({
	user, 
	updateUser
}) => {
	const { handleSubmit, register } = useForm();
	const [message, setMessage] = useState<string>('')
	const { postError } = useAuthenticate(user, updateUser);
	const [userData, setUserData] = useState<{[key: string]: string}>({})

	const location = useLocation();
	const history = useHistory();

	function splitQuery(query: string, data: {[key: string]: string}){
		query = query.slice(1)
		query.split('&').forEach((kv, idx, arr) => {
			const res = kv.split('=')
			if (res[0] === 'email' || res[0] === 'rcp'){
				data[res[0]] = res[1]
			}
		})
	}

	useEffect(() => {
		let query = location.search;
		const data: {[key: string]: string} = {};

		if (!query) {
			updateUser({...user, errorMessage: ''})
			history.push('/');
		} else {
			if (process.env.REACT_APP_SERVER_URL)
				axios.post(process.env.REACT_APP_SERVER_URL, data)
					.then(response => {
						if (response.status === 200){
							setUserData({email: data.email, secret: data.rcp})
						} else {
							setMessage('Expired link, redirecting to home page');
							updateUser({...user, errorMessage: ''})
							history.push('/')
						}
					})
					.catch(e => {postError(e.data.error)})
		}

	}, [])

	async function submit(info: any){
		try {
			const data = {
				...info,
				...userData
			}

			if (data.password !== data.confirmationPassword) {
				postError('The poassword entered don\'t match')
				return
			}
			if (process.env.REACT_APP_SERVER_URL)
				axios.post(process.env.REACT_APP_SERVER_URL, data)			
					.then(response => {
						if (response.status === 200 && response.data.data === 'reseted') {
							setMessage('Your password has been reseted, your are being redirected to login');
							updateUser({...user, errorMessage: ''})
							history.push('/login')
						} else {
							postError(response.data.error)
						}
					})

		} catch (e) {
			postError(e.response.data.error)
		}
	}

	return (
		<div className={styles.recover}>
			<div className={styles.headroom}></div>
			<div style={isMobileOnly ? {boxShadow: 'none'} : {}} className={styles.overlay}>
				<h2>Recover Password</h2>
				<form className={styles.form} onSubmit={handleSubmit(submit)}>
					<div className={styles.loginGrid}>
						<div className={styles.field}>
							<p>Password</p>
							<input type="password" {...register('password', { required: true})}/>
						</div>
						<div className={styles.field}>
							<p>Confirm Password</p>
							<input type="password" {...register('confirmationPassword', { required: true})}/>
						</div>
					</div>
					<button type='submit'>Recover Password</button>
				</form>
			</div>	
		</div>
	)
}

export default Reset;
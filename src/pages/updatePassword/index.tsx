import React, { useState } from 'react';
import { useEffect } from 'react';
import { User } from '../../App';
import { useHistory } from 'react-router-dom';
import styles from './style.module.scss';
import { isMobileOnly } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface updatePasswordProps {
	user: User,
}

const UpdatePassword: React.FC<updatePasswordProps> = ({user}) => {
	const history = useHistory();
	const [error, setError] = useState('');

	const { register, handleSubmit } = useForm();

	useEffect(() => {
		if (!user.isAuthenticated)
			history.push('/');
	}, [])

	function submit(data: any){
		if (process.env.REACT_APP_SERVER_URL)
		axios.post(process.env.REACT_APP_SERVER_URL, data, {headers: {authorization: user.token}})
			.then(response => 
				{
					alert(response.data.message)
					history.push('/')
				}
			)
			.catch(response => setError(response.data.error))
	}

	return (
		<section className={styles.update}>
			<div className={styles.headroom}></div>
			<div style={isMobileOnly ? {boxShadow: 'none'} : {}} className={styles.overlay}>
					<h2>Update Password</h2>
					<form className={styles.form} onSubmit={handleSubmit(submit)}>
						<div className={styles.loginGrid}>
							<div className={styles.field}>
								<p>Current Password</p>
								<input autoComplete={'current-password'} type="old_password" {...register('email', { required: true})}/>
							</div>
							<div className={styles.field}>
								<p>New Password</p>
								<input type="password" {...register('password', { required: true})}/>
							</div>
							<div className={styles.field}>
								<p>Confirm Password</p>
								<input type="password" {...register('confirmPassword', { required: true})}/>
							</div>
						</div>

							<button type='submit'>Change Password</button>
							<div className={styles.error}>{error}</div>
					</form>
				</div>	
		</section>
	)
}

export default UpdatePassword;
import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import styles from './style.module.scss';
import { User } from '../../App';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuthenticate from '../../hooks/useAuthenticate';
import axios from 'axios';

interface LoginProps {
	user: User,
	updateUser: React.Dispatch<React.SetStateAction<User>>,
}

const Login: React.FC<LoginProps> = ({user, updateUser}) => {
	const { register, handleSubmit, formState: { errors }} = useForm();
	const { authenticate, postError } = useAuthenticate(user, updateUser);


	async function submit(data: any) {
		try {
			axios.post(process.env.REACT_APP_SERVER_URL + '/users/login', data)
				.then(response => {
					if (response.status === 200 && response.data.token){
						authenticate(response.data.token, response.data.name)
					}
				})
				.catch(e => {
					postError(
						!e.status 
						? 'The server did not response, please try again'
						: 'There was a problem with the password or username entered'
					)
				})
		} catch (e) {
			postError(e.response.data.error);
		}
	}

	return (
		<section className={styles.login}>
			<div className={styles.headroom}></div>
				<div style={isMobileOnly ? {boxShadow: 'none'} : {}} className={styles.overlay}>
					<h2>Login</h2>
					<form className={styles.form} onSubmit={handleSubmit(submit)}>
						<div className={styles.loginGrid}>
							<div className={styles.field}>
								<p>Email</p>
								<input autoComplete={'username'} type="email" {...register('email', { required: true})}/>
							</div>
							<div className={styles.field}>
								<p>Password</p>
								<input autoComplete={'current-password'} type="password" {...register('password', { required: true})}/>
							</div>
						</div>

						<div className={styles.forgot}>
							Forgot your password? Reset it <Link to={'/reset'}>here</Link>
						</div>
							<button type='submit'>Sign In</button>
					</form>
				</div>	
		</section>
	)
}

export default Login;
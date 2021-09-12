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
					console.log('[submit:index.ts]: error is', e.response);
					console.log('[submit:index.ts]: error is', Object.keys(e).map(key => key));
					console.log('[submit:index.ts]: error is', e.toJSON());

					postError(
						e.response.status === 401
						? 'Invalid email and password combination, please try again'
						: e.response.status === 400
						? 'The server did not response, please try again'
						: 'There was an error processing your request, please try again'
					)
				})
		} catch (e: any) {
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
						<div style={user.errorMessage.length === 0 ? {display: 'none'} : {}} className={styles.forgot}>
							{user.errorMessage}
						</div>
					</form>
				</div>	
		</section>
	)
}

export default Login;
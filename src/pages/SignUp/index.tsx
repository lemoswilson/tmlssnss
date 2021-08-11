import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import styles from './style.module.scss';
import { User } from '../../App';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuthenticate from '../../hooks/useAuthenticate';
import axios from 'axios';

interface SignUpProps {
	user: User,
	updateUser: React.Dispatch<React.SetStateAction<User>>,
}

const SignUp: React.FC<SignUpProps> = ({user, updateUser}) => {
	const history = useHistory();
	const { register, handleSubmit, watch, formState: { errors }} = useForm();
	const { authenticate, postError} = useAuthenticate(user, updateUser)

	async function submit(data: any) {
		try {
			if (data.password.length && (data.password.length < 6 || data.password.length > 16)){
				updateUser({
					...user,
					errorMessage: 'Password must have between 6 and 16 characters',
				})
				return
			}
	
			axios.post(process.env.REACT_APP_SERVER_URL + '/users/signup', data)
				.then(response => {
					if (response.status === 200 && response.data.token) {
						authenticate(response.data.token, response.data.name)	
					} else {
						postError(response.data.error)	
					}
				})
				.catch(e => {
					if (!e.status)
						postError( 'The server did not respond, please try again later')
					else if (e.response.data.error.match('"password"'))
						postError('Password must have between 6 and 16 characeters')
					else if (e.response.data.error.match('"email"'))
						postError('Email must be a valid email');
				})
		} catch (e) {
			postError(e.response.data.error)
		}
	}

	return (
		<React.Fragment>
			<section className={styles.signup}>
				<div className={styles.headroom}></div>
					<div style={isMobileOnly ? {boxShadow: 'none'} : {}} className={styles.overlay}>
						<h2>Sign Up</h2>
						<form className={styles.form} onSubmit={handleSubmit(submit)}>
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
									<p>Password</p>
									<input type="password" {...register('password', { required: true })}/>
								</div>

							</div>

							<div className={styles.forgot}>
								By registering you agree with the <Link to={'/terms'}>terms and license</Link>.
							</div>

							<button type='submit'>Register</button>

							<div className={styles.error}>{user.errorMessage}</div>
						</form>
					</div>	
			</section>
		</React.Fragment>
	)
}

export default SignUp;
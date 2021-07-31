import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import styles from './style.module.scss';
import { User } from '../../App';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface LoginProps {
	user: User,
}

const Login: React.FC<LoginProps> = ({user}) => {
	const history = useHistory();
	const { register, handleSubmit, watch, formState: { errors }} = useForm();

	useEffect(() => {
		if (user.isAuthenticated){
			history.push('/')
		}
	}, [])

	function submit(data: any) {
		console.log(data);
	}

	return (
		<React.Fragment>
			<section className={styles.login}>
				<div className={styles.headroom}></div>
					<div style={isMobileOnly ? {boxShadow: 'none'} : {}} className={styles.overlay}>
						<h2>Login</h2>
						<form className={styles.form} onSubmit={handleSubmit(submit)}>
							<div className={styles.loginGrid}>
								<div className={styles.field}>
									<p>Email</p>
									<input type="email" {...register('email', { required: true})}/>
								</div>
								<div className={styles.field}>
									<p>Password</p>
									<input type="password" {...register('password', { required: true})}/>
								</div>
							</div>

							<div className={styles.forgot}>
								Forgot your password? Reset it <Link to={'/reset'}>here</Link>
							</div>
								<button type='submit'>Sign In</button>
						</form>
					</div>	
			</section>
		</React.Fragment>
	)
}

export default Login;
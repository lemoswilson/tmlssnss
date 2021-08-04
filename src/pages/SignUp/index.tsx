import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import styles from './style.module.scss';
import { User } from '../../App';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface SignUpProps {
	user: User,
}

const SignUp: React.FC<SignUpProps> = ({user}) => {
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
			<section className={styles.signup}>
				<div className={styles.headroom}></div>
					<div style={isMobileOnly ? {boxShadow: 'none'} : {}} className={styles.overlay}>
						<h2>Sign Up</h2>
						<form className={styles.form} onSubmit={handleSubmit(submit)}>
							<div className={styles.loginGrid}>

							<div className={styles.field}>
								<p>First Name</p>
								<input type="text" {...register('first name', { required: true})}/>
							</div>
							<div className={styles.field}>
								<p>Last Name</p>
								<input type="text" {...register('Last Name', { required: true})}/>
							</div>
							<div className={styles.field}>
								<p>Email</p>
								<input type="email" {...register('email', { required: true})}/>
							</div>
							<div className={styles.field}>
								<p>Address Line 1</p>
								<input type="text" {...register('add1', { required: true})}/>
							</div>
							<div className={styles.field}>
								<p>Address Line 2</p>
								<input type="text" {...register('add2')}/>
							</div>
							<div className={styles.field}>
								<p>City</p>
								<input type="text" {...register('city', { required: true})}/>
							</div>
							<div className={styles.field}>
								<p>State</p>
								<input type="text" {...register('state', { required: true})}/>
							</div>
							<div className={styles.field}>
								<p>Zip Code/Postal Code</p>
								<input type="number" {...register('zip', { required: true })}/>
							</div>
							<div className={styles.field}>
								<p>Country</p>
								<input type="text" {...register('country', { required: true })}/>
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
						</form>
					</div>	
			</section>
		</React.Fragment>
	)
}

export default SignUp;
import React, { useState } from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { User } from '../../App';
import useAuthenticate from '../../hooks/useAuthenticate';

interface RecoverProps {
	user: User,
	updateUser: React.Dispatch<React.SetStateAction<User>>,
}

const Recover: React.FC<RecoverProps> = ({
	user, 
	updateUser
}) => {
	const { handleSubmit, register } = useForm();
	const [message, setMessage] = useState<string>('')
	const { postError } = useAuthenticate(user, updateUser);

	async function submit(data: any){
		try {
			if (process.env.REACT_APP_SERVER_URL)
				axios.post(process.env.REACT_APP_SERVER_URL, data)
					.then(response => {
						if (response.status === 200 && response.data) {
							updateUser({ ...user, errorMessage: ''})
							setMessage(response.data.data)
						} 
					})
					.catch(e => {postError(e.response.data.error)})
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
							<p>Email</p>
							<input type="email" {...register('email', { required: true})}/>
						</div>
					</div>
					<button type='submit'>Reset Password</button>
				</form>
			</div>	
		</div>
	)
}

export default Recover;
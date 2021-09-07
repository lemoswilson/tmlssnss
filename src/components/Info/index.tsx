import React from 'react';
import styles from './style.module.scss';

interface InfoProps {

}

const Info: React.FC<InfoProps> = () => {
	// const { register, handleSubmit, formState: { errors }} = useForm();
	// const { authenticate, postError } = useAuthenticate(user, updateUser);



	return (
		<section className={styles.login}>
			<div className={styles.headroom}></div>
				<div style={{boxShadow: 'none'}} className={styles.overlay}>
					<h1>Info</h1>
					<div className={styles.form}>
						<p>
							Disclaimer: The items in the website are not really for sale. This is a web project made by me in order to learn and implement web technologies in an e-commerce context.
							<br/>
							<br/>For more information, feel free to send an <a href="mailto:wlemosdev@gmail.com">email</a>.
						</p>
					</div>
				</div>	
		</section>
	)
}

export default Info;


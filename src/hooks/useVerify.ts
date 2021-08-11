import React, { useEffect } from 'react';
import { User } from '../App';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function useVerify(
	user: User,
	updateUser: React.Dispatch<React.SetStateAction<User>>,	
){
	const history = useHistory();

	useEffect(() => {
		async function verify(){
			const res = await axios.post(
				process.env.REACT_APP_SERVER_URL + '/users/auth/verify',
				undefined,
				{
					headers: {
						authorization: localStorage.getItem('tmlssnssJWT')
					}
				}
			)
			return res;
		}

		if(localStorage.getItem('tmlssnssJWT') && !user.isAuthenticated){
			const res = verify()

			res.then((res) => {
				if (res.status === 200){
					updateUser({
						errorMessage: '',
						isAuthenticated: true,
						token: localStorage.getItem('tmlssnssJWT'),
						name: res.data.name,
					})
				}
			}).catch(err => {
				updateUser({
					errorMessage: err,
					isAuthenticated: false,
					token: '',
					name: '',
				})
			})
		}
	},[])

}


export function useSignOut(updateUser: React.Dispatch<React.SetStateAction<User>>){
	function signOut() {
		function signOut() {
			localStorage.removeItem('tmlssnssJWT')
			updateUser({
			  errorMessage: '',
			  isAuthenticated: false,
			  token: '',
			  name: '',
			})
		  }
	}

	return signOut;
}
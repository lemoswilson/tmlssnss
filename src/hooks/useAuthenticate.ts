import React, { useEffect } from 'react';
import { User } from '../App';
import { useHistory } from 'react-router-dom';

export default function useAuthenticate(
	user: User,
	updateUser: React.Dispatch<React.SetStateAction<User>>,
) {
	const history = useHistory();

	useEffect(() => {
		if (user.isAuthenticated){
			history.push('/')
		}
	}, [])

	function authenticate(token: string, name: string){
		updateUser({
			token,
			isAuthenticated: true,
			errorMessage: '',
			name: name,
		})
		localStorage.setItem('tmlssnssJWT', token)
		history.push('/')
	}

	function postError(error: any){
		updateUser({
			...user,
			errorMessage: error,
		})
	}

	return {
		authenticate, 
		postError
	}

}
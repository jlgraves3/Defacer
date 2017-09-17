import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
	login, 
	logout, 
	isLoggedIn 
} from '../utils/AuthService';

class Nav extends Component {
	render () {
		return (
			<nav>
				{isLoggedIn() ? <a>Profile</a> : <a onClick={() => login()}>Log In</a>}
				{isLoggedIn() ? <a onClick={() => logout()}>Log Out</a> : <a>Register</a>} 
					
			</nav>
		)
	}
}

export default Nav;
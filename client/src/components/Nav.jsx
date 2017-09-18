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
				<Link to='/login'>Log In</Link>	
				<Link to='/gallery'>Gallery</Link>	
			</nav>
		)
	}
}

export default Nav;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
	render () {
		return (
			<nav>
				<Link to='/'>Home</Link>	
				<Link to='/gallery'>Gallery</Link>	
				<Link to='/login'>Log In</Link>	
				<Link to='/register'>Register</Link>	
			</nav>
		)
	}
}

export default Nav;
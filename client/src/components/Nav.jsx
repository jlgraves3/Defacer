import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Nav extends Component {
	render () {
		return (
			<nav>
				<Link to='/login'>Login</Link>
				<Link to='/register'>Register</Link>
			</nav>
		);
	}
}

export default Nav;
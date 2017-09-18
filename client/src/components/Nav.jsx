import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
	render () {
		return (
			<nav>
				<div>
				<Link to='/'>Home</Link>	
				<Link to='/gallery'>Gallery</Link>
				</div>
				<div>	
				{this.props.loggedIn ? <a>{this.props.user.username}</a> : <Link to='/login'>Log In</Link>}	
				{this.props.loggedIn ? <a>Log Out</a>: <Link to='/register'>Register</Link>}	
				</div>
			</nav>
		)
	}
}

export default Nav;
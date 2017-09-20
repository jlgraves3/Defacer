import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
	render () {
		return (
			<nav>
				<div>
				<Link to='/' id='logo'></Link>	
				<Link to='/gallery'>Gallery</Link>
				</div>
				<div>	
				{this.props.loggedIn ? <Link to='/profile'><i className="fa fa-user" aria-hidden="true"></i> {this.props.user.username}</Link> : <Link to='/login'>Log In</Link>}	
				{this.props.loggedIn ? <a onClick={this.props.handleLogout}>Log Out</a>: <Link to='/register'>Register</Link>}	
				</div>
			</nav>
		)
	}
}

export default Nav;
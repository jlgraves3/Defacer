import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Nav extends Component {
	constructor() {
		super();
		this.loggedInNav = this.loggedInNav.bind(this);
		this.loggedOutNav = this.loggedOutNav.bind(this);
		this.logout = this.logout.bind(this);
	}

	logout() {
		axios.get('/auth/logout')
		.then(res => {
			alert(res.data);
		}).catch(err => console.log(err));
	}

	loggedInNav() {
		return (
			<nav>
				<a>Profile</a>
				<a onClick={this.logout}>Logout</a>
			</nav>
			)
	}

	loggedOutNav() {
		return (
			<nav>
				<Link to='/login'>Login</Link>
				<Link to='/register'>Register</Link>
				<a onClick={this.logout}>Logout</a>
			</nav>
			)
	}

	render () {
		return this.props.loggedIn ? this.loggedInNav() : this.loggedOutNav() 
	}
}

export default Nav;
import React, { Component } from 'react';

class Login extends Component {
	render() {
		return (
			<div>
			<h1>Log In</h1>
			<form>
				<label>Username: </label>
				<input type='text' />
				<label>Password: </label>
				<input type='password' />
			</form>
			</div>
		)
	}
}

export default Login;

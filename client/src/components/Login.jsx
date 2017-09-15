import React, { Component } from 'react';

class Login extends Component {
	render() {
		return (
			<div className='form'>
			<h1>Login</h1>
			<form>
				<label>Username: </label>
				<input type='text' />
				<label>Password: </label>
				<input type='password' />
				<button type='submit'>Login</button>
			</form>
			</div>
		)
	}
}

export default Login;

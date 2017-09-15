import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
	constructor() {
		super();
	}

	handleSubmit(e) {
		const user = {
			username: e.target.username,
			password: e.target.password,
		}
		console.log(user);
	}

	render() {
		return (
			<div className='form'>
			<h1>Register</h1>
			<form onSubmit={(e) => this.handleSubmit(e)}>
				<label>Username: </label>
				<input 
					type='text' 
					name='username' />
				<label>Password: </label>
					<input 
						type='password' 
						name='password' />
					<button type='submit'>Login</button>
			</form>
			</div>
		)
	}
}

export default Register;

import React, { Component } from 'react';

class Register extends Component {
	render() {
		return (
			<h1>Register</h1>
			<form>
				<label>Username: </label>
				<input type='text' />
				<label>Password: </label>
				<input type='password' />
			</form>
		)
	}
}

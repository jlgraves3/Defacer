import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: null,
			password: null,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		let user = {
			username: this.state.username,
			password: this.state.password
		}
		console.log(user)
		e.preventDefault();
		axios.post('/auth/login', {
			username: this.state.username,
			password: this.state.password
		}).then(res => {
			console.log(res.data);
		}).catch(err => console.log(err));
	}

	handleChange(e) {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value
		});
	}

	render() {
		return (
			<div className='form'>
			<h1>Login</h1>
			<form onSubmit={(e) => this.handleSubmit(e)}>
				<label>Username: </label>
				<input 
					type='text' 
					name='username' 
					value={this.state.username}
					onChange={this.handleChange} />
				<label>Password: </label>
					<input 
						type='password' 
						name='password'
						value={this.state.password}
						onChange={this.handleChange} />
					<button type='submit'>Login</button>
			</form>
			</div>
		)
	}
}

export default Login;

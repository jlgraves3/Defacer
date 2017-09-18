import React, { Component } from 'react';
import Auth from '../utils/AuthService';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			status: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		Auth.login(this.state.username,this.state.password)
		.then(() => {
			this.setState((prevState,props) => {
				return {status: "Login successful"}
			})
		})
		.catch(err => {
			this.setState((prevState,props) => {
				return {status: "Error: " + err}
			});
		});
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
			<h1>Login {this.state.status}</h1>
			<form onSubmit={(e) => this.handleSubmit(e)}>
				<label>Username </label>
					<input 
						type='text' 
						name='username' 
						value={this.state.username}
						onChange={this.handleChange} 
						placeholder='username'
						required />
				<label>Password </label>
					<input 
						type='password' 
						name='password'
						value={this.state.password}
						onChange={this.handleChange} 
						placeholder='password'
						required />
				<button type='submit'>Login</button>
			</form>
			</div>
		)
	}

}

export default Login;

import React, { Component } from 'react';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value
		});
	}

	render() {
		return (
			<div className='form' >
			<form>
			<h1>Register</h1>
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
				<button type='submit' 
					onClick={(e) => {
							this.props.handleRegister(e,this.state.username,this.state.password)
							this.setState({
								redirect: true,
							});
						}
					} >Register</button>
			</form>
			</div>

		)
	}

}

export default Register;

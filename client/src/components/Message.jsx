import React, { Component } from 'react';

class Message extends Component {
	render() {
		return (
			<div id='message'>
			<div>
				<h2>{this.props.message}</h2>
			</div>
			</div>
		)
	}
}

export default Message;
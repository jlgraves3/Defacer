import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

import {
	SketchPad, 
	TOOL_PENCIL, 
} from 'react-sketchpad/lib';

	
class Edit extends Component {
	constructor() {
		super();
		this.state = {
			height: 0,
			width: 0,
			dimensionsLoaded: false,
			size: 5,
			color: '#000000',
			fill: '',
			tool: TOOL_PENCIL,
			title: '',
			painting_src: '',
			canvas_src: '',
			user_id: '',
			redirect: false,
			canvasLoaded: false,
			message: '',
		}
		this.tools = this.tools.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.getDimensions = this.getDimensions.bind(this);
		this.initCanvas = this.initCanvas.bind(this);
		this.initSketchPad = this.initSketchPad.bind(this);
		this.clearCanvas = this.clearCanvas.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
	}

	componentWillMount() {
		console.log('will mount');
		this.setState({
			title: this.props.artwork.title,
			painting_src: this.props.artwork.painting_src,
			canvas_src: this.props.artwork.canvas_src,
			user_id: this.props.artwork.user_id,
		});
	}

	handleInputChange(e) {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value
		});
	}

	getDimensions({target:img}) {
		this.setState({
			height: img.offsetHeight,
			width: img.offsetWidth,
			dimensionsLoaded: true,
		});
	}	

	clearCanvas() {
		const canvas = document.getElementsByClassName('canvas')[0];
		canvas.width = canvas.width;
		this.initCanvas();
	}

	initSketchPad() {
		return (
			<SketchPad
				width={this.state.width} 
				height={this.state.height} 
				color={this.state.color}
				size={this.state.size}
				items={[]} />
		)
	}

	initCanvas() {
		if (document.getElementsByClassName('canvas')) {
			const canvas = document.getElementsByClassName('canvas')[0];
			const img = document.getElementById('drawing');
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img,0,0,this.state.width,this.state.height);
		} 
	}

	saveChanges(action) {
		const canvas_src = document.getElementsByClassName('canvas')[0].toDataURL();
		const artwork = {
			title: this.state.title,
			user_id: this.state.user_id,
			painting_src: this.state.painting_src,
			canvas_src: canvas_src
		}
		if (action === 'put') {
				axios.put(`/gallery/${this.props.id}`,artwork)
				.then(res => {
					this.props.handleUpdateArtwork(res.data.data);
					this.props.handleRedirectPath('/profile');
				}).catch(err => console.log(err));
			} 
		else if (action === 'post') {
				axios.post('/gallery', artwork)
				.then(res => {
					this.props.handleCreateArtwork(res.data.data);
					this.props.handleRedirectPath('/profile');
				}).catch(err => {
					console.log(err);
					this.setState({
						redirect: true,
					});
				});
		}
	
	}

	//renders canvas tools and save/discard buttons
	tools() {
		return(
			<div className='options'>
				<div className='inline-buttons'>
					<button onClick={this.props.toggleEdit}>Cancel</button>
					<button onClick={this.clearCanvas}>Reset</button>
				</div>
				<div>
					<label>color </label>
					<input 
						type='color' 
						value={this.state.color} 
						onChange={(e) => this.setState({
							color: e.target.value,
						})} />
				</div>
				<div>
					<label>size </label>
					<input 
						type='range'
						min='1'
						max='20'
						value={this.state.size} 
						onChange={(e) => this.setState({
							size: parseInt(e.target.value,10)
						})} />
				</div>
				<button onClick={() => this.saveChanges('put')}>Save Changes</button>
				<button onClick={() => this.saveChanges('post')}>Save As New</button>
			</div>
		)
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to='/profile' />
		}		
		return(
			<div>
				<input 
					type='text'
				 	name='title'
					placeholder={this.state.title || "Untitled"} 
					value={this.state.title} 
					onChange={this.handleInputChange} />
				<div id='sketch-container'>
					{this.state.dimensionsLoaded ? this.initSketchPad() : ''}
						<img onLoad={this.getDimensions} src={this.state.painting_src} alt='' />
						<img onLoad={this.initCanvas} id='drawing' src={this.state.canvas_src} alt='' />
					</div>
					{this.tools()}
			</div>
		)
	}
}

export default Edit;
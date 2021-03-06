import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

import {
	SketchPad, 
	TOOL_PENCIL, 
} from 'react-sketchpad/lib';

	
class Canvas extends Component {
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
			redirect: false,
			message: '',
		}
		this.getDimensions = this.getDimensions.bind(this);
		this.tools = this.tools.bind(this);
		this.clearCanvas = this.clearCanvas.bind(this);
		this.saveCanvas = this.saveCanvas.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	//add selected painting to state
	componentWillMount() {
		this.setState({
			painting_src: this.props.artwork._links.image.href.replace("{image_version}","large"),
		});
	}

	handleInputChange(e) {
		const name = e.target.name;
		this.setState({
			[name]: e.target.value
		});
	}

	/* used https://stackoverflow.com/questions/39092859/get-dimensions-of-image-with-react
	 thread answer to help */

	//gets dimensions of painting image so that they can be used for canvas size
	getDimensions({target:img}) {
		this.setState({
			height: img.offsetHeight,
			width: img.offsetWidth,
			dimensionsLoaded: true,
		});
	}	

	//erases canvas contents to start new
	clearCanvas() {
		const canvas = document.getElementsByClassName('canvas')[0];
		canvas.width = canvas.width;
	}

	//adds canvas to gallery
	saveCanvas() {
		if (!this.props.loggedIn) {
			this.setState({
				message: 'You must be logged in to save your work.'
			});
			return;
		}
		//convert canvas contents to png file
		const canvas = document.getElementsByClassName('canvas')[0];
		const options = {
			user_id: this.props.user.id,
			title: this.state.title || 'Untitled',
			painting_src: this.state.painting_src,
			canvas_src: canvas.toDataURL(),
		}
		axios.post('/gallery', options)
			.then((res) => {
				//add to global state
				this.props.handleCreateArtwork(res.data.data);
				const message = `${this.state.title || 'Untitled'}  has been saved to the gallery.`;
				this.props.displayMessage(message);
				setTimeout(() => {
					this.setState({
						redirect: true,
					});
				}, 2000);
		}).catch(err => console.log(err));
	}

	//renders canvas tools and save/discard buttons
	tools() {
		return(
			<div className='options'>
				<div className='inline-buttons'>
					<button onClick={this.props.discard}>Discard</button>
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
				<button onClick={this.saveCanvas} className={!this.props.loggedIn ? 'disabled' : ''} >Save to Gallery</button>
				<p className='error'>{this.state.message}</p>
			</div>
		)
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to='/gallery' />
		}
		else {
				return(
					<div>
						<input 
							type='text'
						 	name='title'
							placeholder="Untitled" 
							value={this.state.title} 
							onChange={this.handleInputChange} />
						<div id='sketch-container' width={this.state.width} height={this.state.height}>
							<img onLoad={this.getDimensions} src={this.state.painting_src} alt='' />
							{this.state.dimensionsLoaded ? 
								<SketchPad 
										width={this.state.width} 
										height={this.state.height} 
										color={this.state.color}
										size={this.state.size}
										items={[]} />
								: ''}
							</div>
							{this.tools()}
					</div>
				)
			}
	}

}

export default Canvas;
import React, { Component } from 'react';
//import Sketchpad from 'sketchpad'
import {
	SketchPad, 
	TOOL_PENCIL, 
	TOOL_LINE, 
	TOOL_RECTANGLE, 
	TOOL_ELLIPSE
} from 'react-sketchpad/lib';


class Canvas extends Component {
	constructor() {
		super();
		this.state = {
			height: 0,
			width: 0,
			dimensionsLoaded: false,
			size: 5,
			color: 'black',
			fill: '',
			tool: TOOL_PENCIL,
		}
		this.getDimensions = this.getDimensions.bind(this);
		this.tools = this.tools.bind(this);
	}
	/* used https://stackoverflow.com/questions/39092859/get-dimensions-of-image-with-react
	 thread answer to help */
	getDimensions({target:img}) {
		console.log('get dimensions')
		this.setState({
			height: img.offsetHeight,
			width: img.offsetWidth,
			dimensionsLoaded: true,
		});
	}	

	tools() {
		return(
			<div className='options'>
				<button onClick={this.props.discard}>Discard</button>
				<button onClick={() => this.forceUpdate()}>Reset</button>
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
							size: parseInt(e.target.value)
						})} />
				</div>
				<div>
					<label>tool </label>

				</div>
			</div>
		)
	}

	render() {
		const src= this.props.artwork._links.image.href.replace("{image_version}","large");
		return(
			<div>
				<h1>{this.props.artwork.title}</h1>
				<div id='sketch-container' width={this.state.width} height={this.state.height}>
					<img onLoad={this.getDimensions} src={src} />
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

export default Canvas;
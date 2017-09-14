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
		}
		this.getDimensions = this.getDimensions.bind(this);
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

	render() {
		const src= this.props.artwork._links.image.href.replace("{image_version}","large");
		//const {width} = this.state.width;
		//const {height} = this.state.height; 
		//<canvas id='sketchpad' width={this.state.width} height={this.state.height} />

		return(
			<div>
				<h2>{this.props.artwork.title}</h2>
				<div id='sketch-container' width={this.state.width} height={this.state.height}>
					<img onLoad={this.getDimensions} src={src} />
					{this.state.dimensionsLoaded ? 
						<SketchPad width={this.state.width} height={this.state.height} />
						: ''}
					
				</div>
				<div id='tools'>
					<button onClick={this.props.discard}>Discard</button>
				</div>
			</div>

		)
	}

}

export default Canvas;
import React, { Component } from 'react';

class Canvas extends Component {
	constructor() {
		super();
		this.state = {
			height: 0,
			width: 0, 
		}
		this.getDimensions = this.getDimensions.bind(this);
	}
	/* used https://stackoverflow.com/questions/39092859/get-dimensions-of-image-with-react
	 thread answer to help */
	getDimensions({target:img}) {
		this.setState({
			height: img.offsetHeight,
			width: img.offsetWidth,
		});
	}	

	render() {
		const src= this.props.artwork._links.image.href.replace("{image_version}","large");
		//const {width} = this.state.width;
		//const {height} = this.state.height; 

		return(
			<div>
				<h2>{this.props.artwork.title}</h2>
				<div id='sketch-container' >
					<img onLoad={this.getDimensions} src={src} />
					<canvas width={this.state.width} height={this.state.height} />
				</div>
			</div>

		)
	}

}

export default Canvas;
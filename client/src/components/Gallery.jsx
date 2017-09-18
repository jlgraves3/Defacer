import React, { Component } from 'react';
import axios from 'axios';

class Gallery extends Component {
	constructor() {
		super();
		this.state = {
			artworks: null,
			artworksLoaded: false,
		}
		this.renderArtwork = this.renderArtwork.bind(this);
	}

	componentWillMount() {
		axios.get('/gallery')
		.then(res => {
			this.setState({
				artworks: res.data.data,
				artworksLoaded: true,
			});
		}).catch(err => console.log(err));
	}

	renderArtwork(artwork) {
		return(
			<div key={artwork.id} className='gallery-work' >
				<img src={artwork.painting_src} />
				<img src={artwork.canvas_src} />	
			</div>
		)
	}

	render() {
		return(
			<div>
				<h1>Gallery</h1>
				<div className='gallery-container'>
				{this.state.artworksLoaded ? this.state.artworks.map(this.renderArtwork) : ''}
				</div>
			</div>
		)
	}
}

export default Gallery
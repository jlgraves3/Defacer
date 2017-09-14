import React, { Component } from 'react';
import axios from 'axios';

class Works extends Component {
	constructor() {
		super();
		this.state = {
			artworks: null,
			artworksLoaded: false,
		}
		this.renderArtwork = this.renderArtwork.bind(this);
	}

	componentWillMount() {
		console.log('will mount',this.props);
		axios.get(`/artists/${this.props.selectedArtist}/works`)
		.then(res => {
			this.setState({
				artworks: res.data.data,
				artworksLoaded: true,
			});
		}).catch(err => console.log(err));
	}

	renderArtwork(artwork) {
		console.log(artwork)
		return (
			<h3>{artwork.title}</h3>
		);
	}

	render() {
		return (
			<div>
			<h1>{this.props.artist.name}</h1>
				{this.state.artworksLoaded ? 
					this.state.artworks.map(this.renderArtwork) : ''}
			</div>
		)
	}

}

export default Works
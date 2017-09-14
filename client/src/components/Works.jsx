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
		const parsedName = this.props.artist.name.split(' ').join('-').replace("'","").toLowerCase();
		console.log(`/artists/${parsedName}/works`)
		axios.get(`/artists/${parsedName}/works`)
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
			<div key={artwork.id}>
				<img src={artwork._links.image.href.replace("{image_version}","medium")} />
				<h3>{artwork.title}</h3>
			</div>
		);
	}

	render() {
		return (
			<div>
			<h1>{this.props.artist.name} 
				 <span id='x' onClick={() => this.props.toggleArtist(this.props.artist)}> × </span> 
			</h1>
				<div className='container'>
					{this.state.artworksLoaded ? 
						this.state.artworks.map(this.renderArtwork) : ''}
				</div>
			</div>
		)
	}

}

export default Works
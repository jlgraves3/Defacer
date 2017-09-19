import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class Gallery extends Component {
	constructor() {
		super();
		this.state = {
			artworks: null,
			artworksLoaded: false,
		}
		this.renderArtwork = this.renderArtwork.bind(this);
	}

	componentDidMount() {
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
			<Link to={`/gallery/${artwork.id}`} key={artwork.id}>
			<div className='gallery-work'>
				<div className='overlay'>
					<h4>{artwork.title || 'Untitled'}</h4>
					<h5>{artwork.username}</h5>
				</div>
				<img src={artwork.painting_src} />
				<img src={artwork.canvas_src} />	
			</div>
			</Link>
		)
	}

	render() {
		return(
			<div>
				<h1>Gallery</h1>
				<div className='gallery-container'>
				{this.state.artworksLoaded ? this.state.artworks.map(this.renderArtwork) :  <Loading />}
				</div>
			</div>
		)
	}
}

export default Gallery
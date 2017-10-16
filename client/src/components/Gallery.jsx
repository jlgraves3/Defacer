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
		//fetch artworks from gallery
		console.log(this.props);
		axios.get('/gallery')
		.then(res => {
			const artworks = res.data.data
			this.setState({
				artworks: artworks,
				artworksLoaded: true,
			});
			const artworkFavorites = {};
			//gets number of favorites for each artwork
			artworks.forEach(artwork => artworkFavorites[artwork.id] = artwork.count);
			console.log(artworkFavorites);
		}).catch(err => console.log(err));
	}

	//render single artwork div
	renderArtwork(artwork) {
		return(
			<div className='gallery-work' key={artwork.id}>
				<Link to={`/gallery/${artwork.id}`} >
					<div className='overlay'>
						<h4>{artwork.title || 'Untitled'}</h4>
						<h5>{artwork.username}</h5>
					</div>
				<img src={artwork.painting_src} alt=''/>
				<img src={artwork.canvas_src} alt='' />	
				</Link>
				<p><i className={`${this.props.userFavorites[artwork.id] ? "fa fa-heart favorited" : "fa fa-heart-o"}`} 
					aria-hidden="true" 
					onClick={() => this.props.toggleFavorite(artwork.id)}></i> 
					{artwork.count > 0 ? " " + artwork.count : ' '}</p>︎
			</div>	
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
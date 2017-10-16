import React, { Component } from 'react';
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
		this.sortArtworks = this.sortArtworks.bind(this);
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
					onClick={() => this.props.toggleFavorite(artwork.id, this)}></i> 
					{this.props.artworkFavorites[artwork.id] > 0 ? " " + this.props.artworkFavorites[artwork.id] : ' '}</p>︎
			</div>	
		)
	}

	sortArtworks(artworks) {
		return artworks.sort((a,b) => b.id - a.id);
	}

	render() {
		return(
			<div>
				<h1>Gallery</h1>
				<div className='gallery-container'>
				{this.props.artworksLoaded ? this.sortArtworks(this.props.artworks).map(this.renderArtwork) :  <Loading />}
				</div>
			</div>
		)
	}
}

export default Gallery
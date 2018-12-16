import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class Gallery extends Component {
	constructor() {
		super();
		this.state = {
			artworks: null,
			sortBy: 'recent',
		}
		this.renderArtwork = this.renderArtwork.bind(this);
		this.sortArtworks = this.sortArtworks.bind(this);
		this.handleSortChange = this.handleSortChange.bind(this);
	}

	//render single artwork div
	renderArtwork(artwork) {
		return(
			<div className='gallery-work' key={artwork.id}>
				<Link to={`/gallery/${artwork.id}`} >
					<div className='overlay'></div>
				<img src={artwork.painting_src} alt=''/>
				<img src={artwork.canvas_src} alt='' />	
				</Link>
				<div className='info'>
					<h4>{artwork.title || 'Untitled'}</h4>
					<h5>{artwork.username}</h5>
					<p><i className={`${this.props.userFavorites[artwork.id] ? "fa fa-heart favorited" : "fa fa-heart-o"}`} 
					aria-hidden="true" 
					onClick={() => this.props.toggleFavorite(artwork.id, this)}></i> 
					{this.props.artworkFavorites[artwork.id] > 0 ? " " + this.props.artworkFavorites[artwork.id] : ' '}</p>︎
				</div>
			</div>	
		)
	}

	// sorts artworks by sort by filter in state
	sortArtworks(artworks) {
		if (this.state.sortBy === 'recent') {
			return artworks.sort((a,b) => b.id - a.id);
		} else {
			const count = this.props.artworkFavorites;
			return artworks.sort((a,b) => count[b.id] - count[a.id]); 
		}	
	}

	// changes state to sort filter - either recent or popular
	handleSortChange(e) {
		this.setState({
			sortBy : e.target.value,
		});
		console.log(this.state.sortBy);
	}

	render() {
		return(
			<div>
				<h1>Gallery</h1>
				<div className='sort-container'>
				<span id='sort'>
					<select name='sortBy' onChange={this.handleSortChange}>
						<option value='recent'>Recent</option>
						<option value='popular'>Popular</option>
					</select>
				</span>
				</div>
				{this.props.artworksLoaded ? <div className='gallery-container'>{this.sortArtworks(this.props.artworks).map(this.renderArtwork)}</div> :  <Loading />}
			</div>
		)
	}
}

export default Gallery
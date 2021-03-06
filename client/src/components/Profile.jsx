import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			userArtworks: null,
			userArtworksLoaded: false,
		}
		this.renderArtwork = this.renderArtwork.bind(this);
		this.renderHelper = this.renderHelper.bind(this);
	}

	componentWillMount() {
		if (this.props.loggedIn) {
			//get artworks by logged in user
			axios.get(`/gallery/user/${this.props.user.id}`)
			.then(res => {
				this.setState({
					userArtworks: res.data.data,
					userArtworksLoaded: true,
				});
			}).catch(err => console.log(err));
			//get user favorites
			axios.get(`/gallery/user/${this.props.user.id}/favorites`)
			.then(res => {
				this.props.handleUserFavorites(res.data.data.ids);
			}).catch(err => console.log(err));
		}
	}

	//render single artwork
	renderArtwork(artwork) {
		return(
			<div className='gallery-work' key={artwork.id}>
			<Link to={`/gallery/${artwork.id}`}>
				<div className='overlay'>
				</div>
				<img src={artwork.painting_src} alt=''/>
				<img src={artwork.canvas_src} alt='' />
				</Link>
				<div className='info'>
				<h4>{artwork.title || 'Untitled'}</h4>
				<p><i className={`${this.props.userFavorites[artwork.id] ? "fa fa-heart favorited" : "fa fa-heart-o"}`} 
					aria-hidden="true" 
					onClick={() => this.props.toggleFavorite(artwork.id, this)}></i> 
					{this.props.artworkFavorites[artwork.id] > 0 ? " " + this.props.artworkFavorites[artwork.id] : ' '}</p>︎	
				</div>
			</div>
		)
	}

	//renders message if user does not have any artworks, renders users artworks if not
	renderHelper() {
		if (this.state.userArtworks.length) {
			const sortedArtworks = this.state.userArtworks.sort((a,b) => b.id - a.id);
			return sortedArtworks.map(this.renderArtwork) 
		} else {
			return (
				<div id='empty'>
					<p>You do not have any artworks yet. <span><Link to='/'>Start Defacing.</Link></span></p>
				</div>
				)
		}
			
	}

	render() {
		if (!this.props.loggedIn) {
			return <Redirect to='/login' />
		}
		return(
			<div>
				<h1>{this.props.user.username}</h1>
				<h2>Your Artworks:</h2>
				{this.state.userArtworksLoaded ? 
					<div className='gallery-container'>{this.renderHelper()}</div> :  <Loading />}
			</div>
		)
	}
}

export default Profile;
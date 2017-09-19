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
		}
	}

	renderArtwork(artwork) {
		return(
			<Link to={`/gallery/${artwork.id}`} key={artwork.id}>
			<div className='gallery-work'>
				<div className='overlay'>
					<h4>{artwork.title || 'Untitled'}</h4>
				</div>
				<img src={artwork.painting_src} />
				<img src={artwork.canvas_src} />	
			</div>
			</Link>
		)
	}

	render() {
		if (!this.props.loggedIn) {
			return <Redirect to='/login' />
		}
		return(
			<div>
				<h1>{this.props.user.username}</h1>
				<h2>Your Artworks:</h2>
				<div className='gallery-container'>
					{this.state.userArtworksLoaded ? this.state.userArtworks.map(this.renderArtwork) :  <Loading />}
				</div>
			</div>
		)
	}
}

export default Profile;
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class UserArtwork extends Component {
	constructor() {
		super();
		this.state = {
			artwork: null,
			artworkLoaded: false,
			redirect: false,
		}
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount() {
		axios.get(`/gallery/${this.props.match.params.id}`)
		.then(res => {
			this.setState({
				artwork: res.data.data,
				artworkLoaded: true,
			});
		}).catch(err => console.log(err));
	}

	handleDelete(artwork) {
		axios.delete(`/gallery/${artwork.id}`)
		.then(() => {
			this.setState({
				redirect: true,
			});
		}).catch(err => console.log(err));
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to='/profile' />
		}
		if (this.state.artworkLoaded) {
			const artwork = this.state.artwork;
			return (
				<div className='single'>
				<Link to='/profile' className='back'>Back</Link>
					<h1>{artwork.title || 'Untitled'}</h1>
					<h2>{artwork.username}</h2>
					<div className='artwork-single'>
						<img src={artwork.painting_src} />
						<img src={artwork.canvas_src} />
					</div>
					<button onClick={() => this.handleDelete(artwork)}>Delete</button>
					<button>Edit</button>
				</div>
			)
		} else {
			return <div></div>
		}
	}
}

export default UserArtwork;
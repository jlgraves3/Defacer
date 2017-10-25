import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Edit from './Edit';

class Artwork extends Component {
	constructor() {
		super();
		this.state = {
			artwork: null,
			artworkLoaded: false,
			edit: false,
		}
		this.userOptions = this.userOptions.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	componentWillMount() {
		//fetch artwork data
		axios.get(`/gallery/${this.props.match.params.id}`)
		.then(res => {
			//artwork found
			if (res.data.data) {
					this.setState({
					artwork: res.data.data,
					artworkLoaded: true,
				});
			//artwork not found
			} else {
				this.props.handleRedirectPath('/gallery');
			}
		}).catch(err => console.log(err));
	}

	//toggle edit state
	toggleEdit() {
		this.setState((prevstate,props) => {
			return {edit: !prevstate.edit}
		});
	}

	//render edit and delete buttons if artwork belongs to user
	userOptions() {
		if (this.props.loggedIn && this.state.artwork.user_id === this.props.user.id) {
			return (
				<div className='crud-buttons'>
					<button onClick={() => this.setState(this.toggleEdit)}>Edit</button>
					<button onClick={() => this.props.handleDelete(this.state.artwork)}>Delete</button>
				</div>
			)
		}
	}

	render() {
		if (this.state.artworkLoaded) {
			const artwork = this.state.artwork;
			if (this.state.edit) {
				return <Edit 
					toggleEdit={this.toggleEdit} 
					artwork={artwork} 
					id={this.props.match.params.id}
					handleRedirectPath={this.props.handleRedirectPath}
					handleUpdateArtwork={this.props.handleUpdateArtwork}
					handleCreateArtwork={this.props.handleCreateArtwork} />
			}
			return (
				<div className='single'>
				<Link to='/gallery' className='back'>Back</Link>
					<h1>{artwork.title || 'Untitled'}</h1>
					<h2>{artwork.username}</h2>
					<h2 id='likes'><i className={`${this.props.userFavorites[artwork.id] ? "fa fa-heart favorited" : "fa fa-heart-o"}`} 
					aria-hidden="true" 
					onClick={() => this.props.toggleFavorite(artwork.id, this)}></i> 
					{this.props.artworkFavorites[artwork.id] > 0 ? " " + this.props.artworkFavorites[artwork.id] : ' '}</h2>
					{this.userOptions()}
					<div className='artwork-single'>
						<img src={artwork.painting_src} alt='' />
						<img src={artwork.canvas_src} alt=''/>
					</div>
				</div>
			)
		} else {
			return <Loading />
		}
	}
}

export default Artwork;
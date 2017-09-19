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
		axios.get(`/gallery/${this.props.match.params.id}`)
		.then(res => {
			this.setState({
				artwork: res.data.data,
				artworkLoaded: true,
			});
		}).catch(err => console.log(err));
	}

	toggleEdit() {
		this.setState((prevstate,props) => {
			return {edit: !prevstate.edit}
		});
	}

	userOptions() {
		if (this.props.loggedIn && this.state.artwork.user_id === this.props.user.id) {
			return (
				<div className='crud-buttons'>
					<button onClick={() => this.setState(this.toggleEdit)}>Edit</button>
					<button onClick={() => this.props.handleDelete(this.props.match.params.id)}>Delete</button>
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
					id={this.props.match.params.id} />
			}
			return (
				<div className='single'>
				<Link to='/gallery' className='back'>Back</Link>
					<h1>{artwork.title || 'Untitled'}</h1>
					<h2>{artwork.username}</h2>
					{this.userOptions()}
					<div className='artwork-single'>
						<img src={artwork.painting_src} />
						<img src={artwork.canvas_src} />
					</div>
				</div>
			)
		} else {
			return <Loading />
		}
	}
}

export default Artwork;
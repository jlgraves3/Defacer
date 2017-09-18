import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Artwork extends Component {
	constructor() {
		super();
		this.state = {
			artwork: null,
			artworkLoaded: false,
		}
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

	render() {
		if (this.state.artworkLoaded) {
			const artwork = this.state.artwork;
			return (
				<div className='single'>
				<Link to='/gallery' className='back'>Back</Link>
					<h1>{artwork.title || 'Untitled'}</h1>
					<h2>{artwork.username}</h2>
					<div className='artwork-single'>
						<img src={artwork.painting_src} />
						<img src={artwork.canvas_src} />
					</div>
				</div>
			)
		} else {
			return <div></div>
		}
	}
}

export default Artwork;
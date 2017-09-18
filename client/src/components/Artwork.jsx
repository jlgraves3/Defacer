import React, { Component } from 'react';
import axios from 'axios';

class Artwork extends Component {
	constructor() {
		super();
		this.state = {
			artwork: null,
			artworkLoaded: false,
		}
	}

	componentWillMount() {
		console.log(this.props)
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
					<h1>{artwork.title || 'Untitled'}</h1>
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
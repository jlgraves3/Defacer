import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import WorkThumbnail from './Work-Thumbnail';

class Works extends Component {
	constructor() {
		super();
		this.state = {
			artworks: null,
			artworksLoaded: false,
		}
		this.renderArtwork = this.renderArtwork.bind(this);
		this.getArtistWorks = this.getArtistWorks.bind(this);
	}

	componentWillMount() {
		console.log('Works Will Mount');
	}

	componentDidMount() {
		console.log('Works Did Mount');
		this.getArtistWorks();
	}

	shouldComponentUpdate() {
		return this.props.artist !== null;
	}

	getArtistWorks() {
		axios.get(`/artists/${this.props.artist.path}/works`)
		.then(res => {
			this.setState({
				artworks: res.data.data,
				artworksLoaded: true,
			});
		}).catch(err => console.log(err));
	}

	//render single artwork	
	renderArtwork(artwork) {
		return (<WorkThumbnail key={artwork.id}
			artwork={artwork}
			selectArtwork={this.props.selectArtwork} />);
	}

	render() {
		return (
			<div>
				<header>
					<h1>{this.props.artist.name}</h1>
					<h1 id='x' onClick={this.props.deselectArtist}> × </h1> 
				</header>
				<div className='container'>
					{this.state.artworksLoaded ? 
						this.state.artworks.map(this.renderArtwork) :  <Loading />}
				</div>
			</div>
		)
	}

}

export default Works
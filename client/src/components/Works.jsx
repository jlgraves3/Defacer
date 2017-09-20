import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

class Works extends Component {
	constructor() {
		super();
		this.state = {
			artworks: null,
			artworksLoaded: false,
		}
		this.renderArtwork = this.renderArtwork.bind(this);
	}

	componentWillMount() {
		//fetch selected artist's works and add to state
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
		return (
			<div key={artwork.id} className='artwork' onClick={() => this.props.selectArtwork(artwork)}>
				<img src={artwork._links.image.href.replace("{image_version}","large")} alt='' />
				<h3>{artwork.title}</h3>
			</div>
		);
	}

	render() {
		return (
			<div>
				<header>
					<h1>{this.props.artist.name}</h1>
					<h1 id='x' onClick={() => this.props.toggleArtist(this.props.artist)}> × </h1> 
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
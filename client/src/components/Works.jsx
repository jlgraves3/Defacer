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
		console.log('will mount',this.props);
		//const parsedName = this.props.artist.name.split(' ').join('-').replace("'","").toLowerCase();
		console.log(`/artists/${this.props.artist.path}/works`)
		axios.get(`/artists/${this.props.artist.path}/works`)
		.then(res => {
			console.log(res.data);
			this.setState({
				artworks: res.data.data,
				artworksLoaded: true,
			});
		}).catch(err => console.log(err));
	}

	renderArtwork(artwork) {
		return (
			<div key={artwork.id} className='artwork' onClick={() => this.props.selectArtwork(artwork)}>
				<img src={artwork._links.image.href.replace("{image_version}","large")} />
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
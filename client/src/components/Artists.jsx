import React, { Component } from 'react';
import axios from 'axios';

class Artists extends Component {
	constructor() {
		super();
		this.state = {
			artists: [
				'pablo-picasso',
				'michelangel-buonarroti',
				'leonardo-da-vinci',
				'salvador-dali',
				'vincent-van-gogh',
				'henri-matisse',
				'georgia-okeeffe',
				'frida-kahlo'
			],
			artistData: [],
			artistDataLoaded: false,
		}
		this.renderArtist = this.renderArtist.bind(this);
	}

	componentWillMount() {
		console.log('will mount');
		const artistData = [];
		this.state.artists.forEach(artist => {
			axios.get(`/artists/${artist}`)
			.then(res => {
				artistData.push(res.data.data);
				this.setState({
						artistData: artistData,
						artistDataLoaded: true,
				}); 
			})
			.catch(err => console.log(err));
		})
	}

	renderArtist(artist) {
		return(
			<div key={artist.id}>
				<img className='thumbnail' src={artist._links.thumbnail.href} />
				<h3>{artist.name}</h3>
			</div>
		)
	}

	render() {
		return (
			<div>
			{this.state.artistDataLoaded ? 
				this.state.artistData.map(this.renderArtist) : ''}
			</div>
		)
	}
}

export default Artists;
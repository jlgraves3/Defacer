import React, { Component } from 'react';
import axios from 'axios';
import Works from './Works';

import {
  Link
} from 'react-router-dom';

class Artists extends Component {
	constructor() {
		super();
		this.state = {
			artists: [
				'pablo-picasso',
				'michelangel-buonarroti',
				'leonardo-da-vinci',
				'vincent-van-gogh',
			],
			artistData: [],
			artistDataLoaded: false,
			selectedArtistId: null,
		}
		this.renderArtist = this.renderArtist.bind(this);
		this.toggleArtist = this.toggleArtist.bind(this);
		this.renderWorks = this.renderWorks.bind(this);
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

	toggleArtist(artist) {
		if (this.state.selectedArtistId === artist) {
			this.setState({
				selectedArtistId: null
			});
		} else {
			this.setState({
				selectedArtistId: artist.id
			});
		}
	}

	renderArtist(artist) {
		return(
			<div key={artist.id} onClick={() => this.toggleArtist(artist)}>
				<img className='thumbnail' src={artist._links.thumbnail.href} />
				<h3>{artist.name}</h3>
				{this.state.selectedArtistId === artist.id ? <Works artist={artist} /> : '' }
			</div>
		)
	}

	renderWorks() {
		if (this.state.selectedArtist) {
			return <Works />
		}
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
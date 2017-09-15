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
				'michelangelo-buonarroti',
				'leonardo-da-vinci',
				'vincent-van-gogh',
				'hieronymus-bosch',
				'albrecht-durer',
				'francisco-de-goya',
				'edgar-degas',
				'claude-monet',
				'georges-seurat',
				'johannes-vermeer',
				'edouard-manet',
				'sandro-botticelli',
				'winslow-homer',
				//'auguste-rodin',
				'paul-cezanne',
				'el-greco',
				'peter-paul-rubens',
				'camille-pissarro',
				'paul-gauguin',
				'mary-cassatt',
			],
			artistData: [],
			artistDataLoaded: false,
			selectedArtist: null,
		}
		this.renderArtist = this.renderArtist.bind(this);
		this.toggleArtist = this.toggleArtist.bind(this);
		this.renderHelper = this.renderHelper.bind(this);
	}

	componentWillMount() {
		console.log('will mount');
		const artistData = [];
		this.state.artists.sort().forEach(artist => {
			axios.get(`/artists/${artist}`)
			.then(res => {
				const data = res.data.data;
				data.path = artist
				artistData.push(data);
				this.setState({
						artistData: artistData,
						artistDataLoaded: true,
				}); 
			}).catch(err => console.log(err));
		});
	}

	toggleArtist(artist) {
		if (this.state.selectedArtist === artist) {
			this.setState({
				selectedArtist: null
			});
		} else {
			this.setState({
				selectedArtist: artist
			});
		}
	}

	renderArtist(artist) {
		return(
			<div key={artist.id} className="artist" onClick={() => this.toggleArtist(artist)}>
				<img className='thumbnail' src={artist._links.thumbnail.href} />
				<h3>{artist.name}</h3>
			</div>
		)
	}

	renderHelper() {
		console.log('helper')
		if (this.state.selectedArtist) {
			console.log('IS SELECTED')
			return 	<Works artist={this.state.selectedArtist} toggleArtist={this.toggleArtist} 
			selectArtwork={this.props.selectArtwork} /> 
		} else {
			console.log('NONE IS SELECTED')
			return (
				<div className='container'>
				{this.state.artistData.map(this.renderArtist)}
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				{this.state.artistDataLoaded ? this.renderHelper() : ''}
			</div>
		)
	}
}

export default Artists;
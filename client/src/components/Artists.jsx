import React, { Component } from 'react';
import axios from 'axios';
import Works from './Works';
import Loading from './Loading';

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
				'paul-cezanne',
				'el-greco',
				'peter-paul-rubens',
				'camille-pissarro',
				'paul-gauguin',
				'mary-cassatt',
				'gilbert-stuart',
				'artemisia-gentileschi',
				'amedeo-modigliani',
				'jan-van-eyck',
			],
			artistData: [],
			artistDataLoaded: false,
			selectedArtist: null,
		}
		this.renderArtist = this.renderArtist.bind(this);
		this.toggleArtist = this.toggleArtist.bind(this);
		this.renderHelper = this.renderHelper.bind(this);
		this.introDiv = this.introDiv.bind(this);
	}

	componentDidMount() {
		const artistData = [];
		//get artist data for each artist in array
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

	//deselect/select artist based on current state
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

	//render a single artist div
	renderArtist(artist) {
		return(
			<div key={artist.id} className="artist" onClick={() => this.toggleArtist(artist)}>
				<img className='thumbnail' src={artist._links.thumbnail.href} alt=''/>
				<h3>{artist.name}</h3>
			</div>
		)
	}

	//render artists' works if there is a selected artist
	renderHelper() {
		if (this.state.selectedArtist) {
			return 	<Works artist={this.state.selectedArtist} toggleArtist={this.toggleArtist} 
			selectArtwork={this.props.selectArtwork} /> 
		} else {
			//renders all artists thumbnails if no artists has been selected
			return (
				<div className='container'>
				{this.state.artistData.map(this.renderArtist)}
				</div>
			)
		}
	}

	//renders page header
	introDiv() {
		return (
				<h1 className='intro'>Pick an artist. Deface their work.</h1>
			)
	}

	render() {
		return (
			<div>
				{this.state.selectedArtist ? '' : this.introDiv()}
				{this.state.artistDataLoaded ? this.renderHelper() : <Loading />}
			</div>
		)
	}
}

export default Artists;
import React, { Component } from 'react';
import axios from 'axios';
import Works from './Works';
import Loading from './Loading';
import ArtistThumbnail from './Artist-Thumbnail';

class Artists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artists: [
				'pablo-picasso',
				'leonardo-da-vinci',
				'francisco-de-goya',
				'albrecht-durer',
				'hieronymus-bosch',
				'claude-monet',
				'georges-seurat',
				'johannes-vermeer',
				'sandro-botticelli',
				'winslow-homer',
				'paul-cezanne',
				'el-greco',
				'peter-paul-rubens',
				'camille-pissarro',
				'paul-gauguin',
				'gilbert-stuart',
				'jan-van-eyck',
				'vincent-van-gogh',
				'amedeo-modigliani',
				'artemisia-gentileschi',
				'edouard-manet',
				'michelangelo-buonarroti',
				'gustav-klimt',
				'mary-cassatt',
			],
			artistData: [],
			artistDataLoaded: false,
			selectedArtist: null,
		}
		this.getArtistData = this.getArtistData.bind(this);
		this.selectArtist = this.selectArtist.bind(this);
		this.deselectArtist = this.deselectArtist.bind(this);
		this.renderSelectedArtistWorks = this.renderSelectedArtistWorks.bind(this);
		this.renderArtistThumbnails = this.renderArtistThumbnails.bind(this);
		this.renderArtist = this.renderArtist.bind(this);
	}

	getArtistData() {
		let artistData = this.state.artistData;
		let artists = this.state.artists.sort();
		let artist = artists.shift();
		if (artist === undefined) {
			this.setState({
				artistDataLoaded: true,
			});
			return;
		}
		axios.get(`/artists/${artist}`)
		.then(res => {
			const data = res.data.data;
			data.path = artist;
			artistData.push(data);
			this.setState({
				artistData: artistData,
				artists: artists,
			}); 
		}).catch(err => {
			console.log(err)
			this.setState({
				artists: artists,
			}); 
		});
	}

	componentWillMount() {
		console.log('Artists Will Mount');
	}

	componentDidMount() {
		console.log('Artists Did Mount');
	}

	shouldComponentUpdate() {
		setTimeout(this.getArtistData,500);
		return true;
	}

	selectArtist(artist) {
		this.setState({
				selectedArtist: artist
		});
	}

	deselectArtist() {
		this.setState({
				selectedArtist: null
		});
	}

	renderArtist = (artist) => <ArtistThumbnail 
		artist={artist} key={artist.id} selectArtist={this.selectArtist} 
		isLoaded={this.state.artistDataLoaded} />
	
	renderArtistThumbnails = () => {
		let artistThumbnails =  <div className="container">{this.state.artistData.map(this.renderArtist)}</div>;
		let header = <h1 className='intro'>Pick an artist. Deface their work.</h1>
		return <div>{header}{artistThumbnails}{this.state.artistDataLoaded ? '' : <Loading />}</div>
	}

	renderSelectedArtistWorks() {
		return <Works 
			artist={this.state.selectedArtist} 
			deselectArtist={this.deselectArtist} 
			selectArtwork={this.props.selectArtwork} />
	}

	render() {
		return (
			<div>
				{this.state.selectedArtist ? this.renderSelectedArtistWorks() : this.renderArtistThumbnails()}
			</div>
		)
	}
}

export default Artists;
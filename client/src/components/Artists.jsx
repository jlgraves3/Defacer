import React, { Component } from 'react';
import axios from 'axios';
import Works from './Works';
import Loading from './Loading';
import ArtistThumbnail from './Artist-Thumbnail';

class Artists extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		let artists = this.props.artists;
		let artist = artists.shift();
		let artistData = this.props.artistData;
		if (artist === undefined) {
			this.props.handleArtistData({artistDataLoaded: true});
			return;
		}
		axios.get(`/artists/${artist}`)
		.then(res => {
			const data = res.data.data;
			data.path = artist;
			artistData.push(data);
			this.props.handleArtistData({artistData: artistData});
		}).catch(err => {
			this.props.handleArtistData({artists: artists});
		});
	}

	componentWillMount() {
		console.log('Artists Will Mount');
	}

	componentDidMount() {
		console.log('Artists Did Mount');
	}

	shouldComponentUpdate() {
		setTimeout(this.getArtistData, 500);
		return true;
	}

	selectArtist(artist) {
		this.setState({
			selectedArtist: artist,
		});
	}

	deselectArtist() {
		this.setState({
			selectedArtist: null
		});
	}

	renderArtist = (artist) => <ArtistThumbnail 
		artist={artist} key={artist.id} selectArtist={this.selectArtist} 
		isLoaded={this.props.artistDataLoaded} />
	
	renderArtistThumbnails = () => {
		let artistThumbnails =  <div className="container">{this.props.artistData.map(this.renderArtist)}</div>;
		let header = <h1 className='intro'>Pick an artist. Deface their work.</h1>
		return <div>{header}{artistThumbnails}{this.props.artistDataLoaded ? '' : <Loading />}</div>
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
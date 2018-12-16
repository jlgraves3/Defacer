import React, { Component } from 'react';

class ArtistThumbnail extends Component {
	render() {
		let artist = this.props.artist;
		let isLoaded = this.props.isLoaded;
		let classNames = isLoaded ? "artist" : "artist not-loaded";
		return (
			<div key={artist.id} className={classNames} onClick={() => isLoaded ? this.props.selectArtist(artist) : ''}>
				<img className='thumbnail' src={artist._links.thumbnail.href} alt={artist.name} title={artist.name}/>
				<h3>{artist.name}</h3>
			</div>
		);
	}
}

export default ArtistThumbnail;
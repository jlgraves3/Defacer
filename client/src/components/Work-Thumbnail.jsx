import React, { Component } from 'react';

class WorkThumbnail extends Component {
	render() {
		let artwork = this.props.artwork;
		return (
			<div key={artwork.id} className='artwork' onClick={() => this.props.selectArtwork(artwork)}>
				<img src={artwork._links.image.href.replace("{image_version}","large")} alt='' />
				<h3>{artwork.title}</h3>
			</div>
		);
	}
}

export default WorkThumbnail;
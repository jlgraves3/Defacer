const Artwork = props => {
	return(
		<div>
			<h1>{props.artwork.name || 'Untitled'}</h1>
			<div className='artwork-single'>
				<img src={props.artwork.painting_src} />
				<img src={props.artwork.canvas_src} />
			</div>
		</div>
	)
} 

export default Artwork;
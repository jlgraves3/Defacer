const Gallery = require('../models/gallert');

const galleryController = {};

galleryController.index = (req,res) => {
	Gallery.findAll()
	.then(artworks => {
		res.json({
			message: 'ok',
			data: artworks,
		});
	}).catch(err => console.log(err))
}


module.exports = galleryController;
const Gallery = require('../models/gallery');

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

galleryController.create = (req,res) => {
	Gallery.create({
		user_id: req.body.user_id,
		title: req.body.title,
		painting_src: req.body.painting_src,
		canvas_src: req.body.canvas_src
	}).catch(err => console.log(err));
}


module.exports = galleryController;
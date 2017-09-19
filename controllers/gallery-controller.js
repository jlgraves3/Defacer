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

galleryController.show = (req,res) => {
	Gallery.findById(req.params.id)
	.then(artwork => {
		res.json({
			message: 'ok',
			data: artwork,
		});
	}).catch(err => console.log(err));
}

//gets all artworks by given user
galleryController.showUser = (req,res) => {
	Gallery.findByUser(req.params.user_id)
	.then(artworks => {
		res.json({
			message: 'ok',
			data: artworks,
		});
	}).catch(err => console.log(err));
}

galleryController.create = (req,res) => {
	Gallery.create({
		user_id: req.body.user_id,
		title: req.body.title,
		painting_src: req.body.painting_src,
		canvas_src: req.body.canvas_src
	}).then(artwork => {
		res.json({
			message: 'successfully added',
			data: artwork,
		});
	}).catch(err => console.log(err));
}

galleryController.destroy = (req,res) => {
	Gallery.delete(req.params.id)
	.then(() => {
		res.json({
			message: 'deleted successfully',
		});
	}).catch(err => console.log(err));
}


module.exports = galleryController;
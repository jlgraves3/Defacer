const Gallery = require('../models/gallery');
const Favorite = require('../models/favorite');

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
		Favorite.findByArtwork(req.params.id)
		.then(users => {
			artwork.favorites = users;
			res.json({
				message: 'ok',
				data: artwork,
			});
		}).catch(err => console.log(err));
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

galleryController.update = (req,res) => {
	const artwork = {
		user_id: req.body.user_id,
		title: req.body.title,
		painting_src: req.body.painting_src,
		canvas_src: req.body.canvas_src,
	};

	Gallery.update(artwork, req.params.id)
		.then(updated => {
			res.json({
				message: 'updated successfully',
				data: updated
			});
		}).catch(err => console.log(err));
}

galleryController.favorite = (req,res) => {
	Favorite.create(req.params.id, req.user.id)
	.then(favorite => {
		res.json({
			message: 'successfully favorited',
			data: favorite
		});
	}).catch(err => console.log(err));
}

galleryController.unfavorite = (req,res) => {
	Favorite.delete(req.params.id, req.user.id)
	.then(() => {
		res.json({
			message: 'successfully unfavorited',
		});
	}).catch(err => console.log(err));
}

galleryController.showUserFavorites = (req,res) => {
	Favorite.findByUser(req.params.user_id)
	.then(artworks => {
		//creates set to make accessing favorites easier on frontend
		const favoritesObject = {};
		artworks.forEach(artwork => favoritesObject[artwork.id] = true); 
		res.json({
			message: 'ok',
			data: {
				list: artworks, 
				ids: favoritesObject
			}
		});
	}).catch(err => console.log(err));
}


module.exports = galleryController;
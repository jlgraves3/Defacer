const express = require('express');
const galleryRoutes = express.Router();

const galleryController = require('../controllers/gallery-controller');

galleryRoutes.get('/', galleryController.index);
galleryRoutes.get('/:id', galleryController.show);
galleryRoutes.get('/user/:user_id', galleryController.showUser);

galleryRoutes.get('/user/:user_id/favorites', galleryController.showUserFavorites);

galleryRoutes.post('/', galleryController.create);
galleryRoutes.put('/:id',galleryController.update);

galleryRoutes.delete('/:id', galleryController.destroy);

galleryRoutes.post('/:id/favorite', galleryController.favorite);
galleryRoutes.delete('/:id/favorite', galleryController.unfavorite);

module.exports = galleryRoutes;
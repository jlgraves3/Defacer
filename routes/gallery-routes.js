const express = require('express');
const galleryRoutes = express.Router();

const galleryController = require('../controllers/gallery-controller')

galleryRoutes.get('/', galleryController.index);
galleryRoutes.get('/:id', galleryController.show);
galleryRoutes.get('/user/:user_id', galleryController.showUser);
galleryRoutes.post('/', galleryController.create);

module.exports = galleryRoutes;
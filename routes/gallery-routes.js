const express = require('express');
const galleryRoutes = express.Router();

const galleryController = require('../controllers/gallery-controller')

galleryRoutes.get('/', galleryController.index);
galleryRoutes.post('/', galleryController.create);

module.exports = galleryRoutes;
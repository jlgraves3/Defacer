const express = require('express');
const galleryRoutes = express.Router();

galleryRoutes.get('/', galleryRoutes.index);

module.exports = galleryRoutes;
const db = require('../db/config');

const Gallery = {};

Gallery.create = artwork => {
	db.one(`
		INSERT INTO gallery	(user_id,title,painting_src,canvas_src)
		VALUES ($1,$2,$3,$4)
		RETURNING *
	`,[artwork.user_id,artwork.title,artwork.painting_src,artwork.canvas_src]);
}

module.exports = Gallery;
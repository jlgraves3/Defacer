const db = require('../db/config');

const Gallery = {};

Gallery.findAll = () => {
	return db.query("SELECT * FROM gallery");
}

Gallery.findById = id => {
	return db.oneOrNone(`
		SELECT * FROM gallery 
		WHERE id = $1
	`,[id]);
}

Gallery.create = artwork => {
	db.one(`
		INSERT INTO gallery	(user_id,title,painting_src,canvas_src)
		VALUES ($1,$2,$3,$4)
		RETURNING *
	`,[artwork.user_id,artwork.title,artwork.painting_src,artwork.canvas_src]);
}

Gallery.delete = id => {
	return db.none(`
		DELETE FROM gallery
		WHERE id = $1
	`,[id])
}

module.exports = Gallery;
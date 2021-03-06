const db = require('../db/config');

const Gallery = {};

Gallery.findAll = () => {
	return db.query(`
		SELECT 
			gallery.id, 
			users.username,
			gallery.user_id, 
			gallery.title, 
			gallery.painting_src, 
			gallery.canvas_src,
			COUNT(favorites.user_id) 
		FROM gallery JOIN users 
		ON gallery.user_id = users.id
		FULL JOIN favorites 
		ON gallery.id = favorites.gallery_id
		GROUP BY users.username, gallery.id
		ORDER BY gallery.id DESC`);
}

Gallery.findById = id => {
	return db.oneOrNone(`
		SELECT 
			gallery.id,
			gallery.user_id,
			gallery.title,
			gallery.painting_src,
			gallery.canvas_src,
			users.username
		FROM gallery JOIN users 
		ON gallery.user_id = users.id
		WHERE gallery.id = $1
	`,[id]);
}

Gallery.findByUser = user_id => {
	return db.query(`
		SELECT * FROM gallery
		WHERE user_id = $1	
	`,[user_id]);
}

Gallery.create = artwork => {
	return db.one(`
		INSERT INTO gallery	
		(user_id, title, painting_src, canvas_src)
		VALUES ($1,$2,$3,$4)
		RETURNING *
	`,[artwork.user_id, artwork.title, artwork.painting_src, artwork.canvas_src]);
}

Gallery.delete = id => {
	return db.none(`
		DELETE FROM gallery
		WHERE id = $1
	`,[id]);
}

Gallery.update = (artwork,id) => {
	return db.one(`
		UPDATE gallery SET 
			user_id = $1,
			title = $2,
			painting_src = $3,
			canvas_src = $4
			WHERE id = $5
		RETURNING *
	`,[artwork.user_id,artwork.title,artwork.painting_src,artwork.canvas_src,id])
}

module.exports = Gallery;
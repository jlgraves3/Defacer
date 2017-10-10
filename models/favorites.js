const db = require('../db/config');
const Favorite = {};


//finds all artworks user has favorited
Favorite.findByUser = user_id => {
	return db.query(`
		SELECT * FROM 
		gallery JOIN favorites ON
		favorites.gallery_id = gallery.id
		WHERE favorites.user_id = $1
		`, [user_id]);
}

Favorite.create = (gallery_id,user_id) {
	return db.one(`
		INSERT INTO favorites (gallery_id, user_id)
		VALUES ($1,$2)
		RETURNING *
	`,[gallery_id,user_id]);
} 

Favorite.delete = (gallery_id,user_id) {
	return db.none(`
		DELETE FROM favorites WHERE
		gallery_id = $1 AND
		user_id = $2
	`,[gallery_id,user_id]);
} 


module.exports = Favorite;

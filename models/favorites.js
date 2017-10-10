const db = require('../db/config');
const Favorites = {};


//finds all artworks user has favorited
Favorites.findByUser = user_id => {
	return db.query(`
		SELECT * FROM 
		gallery JOIN favorites ON
		favorites.gallery_id = gallery.id
		WHERE favorites.user_id = $1
		`, [user_id]);
}

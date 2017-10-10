CREATE TABLE IF NOT EXISTS favorites (
	gallery_id INTEGER references gallery(id),
	user_id INTEGER references users(id) 
);
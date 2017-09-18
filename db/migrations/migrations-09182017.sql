\c vandalizer_dev

CREATE TABLE IF NOT EXISTS gallery (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	title VARCHAR(255),
	painting_src VARCHAR(255),
	canvas_src VARCHAR(255)
);
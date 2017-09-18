\c vandalizer_dev

CREATE TABLE IF NOT EXISTS gallery (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	title VARCHAR(255),
	painting_src TEXT,
	canvas_src TEXT
);
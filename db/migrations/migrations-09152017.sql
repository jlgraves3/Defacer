\c vandalizer_dev

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) UNIQUE NOT NULL,
	password_digest TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gallery (
	id SERIAL PRIMARY KEY,
	user_id REFERENCES users(id),
	title VARCHAR(255),
	painting_src VARCHAR(255),
	canvas_src VARCHAR(255),
);
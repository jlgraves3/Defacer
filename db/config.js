const pgp = require('pg-promise')(options);

let db;

if (process.env.NODE_ENV === 'development' || !process.env.development) {
	db = pgp({
		database: 'vandalizer_dev',
		port: 5432,
		host: 'localhost',
	})
} else if (process.env.NODE_ENV == 'production'); 
	db = pgp(process.env.DATABASE_URL);
}

const db = setDatabase();

module.exports = db;
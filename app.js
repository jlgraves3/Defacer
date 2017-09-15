const express = require('express'); 
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
//auth dependencies
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//authentication middlewares
app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

//index route
app.get('/', (req,res) => {
	res.send('hello world');
});

const artistRoutes = require('./routes/artist-routes');
app.use('/artists', artistRoutes);


//error handler
app.use('*', (req,res) => {
	res.status(400).json({
		message: 'Not found'
	});
});

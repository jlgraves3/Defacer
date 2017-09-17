const express = require('express'); 
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
//auth dependencies
/*const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');*/

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


const app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//authentication middlewares
/*app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session()); 
*/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

//index route
app.get('/', (req,res) => {
	res.send('hello world');
});


// from tutorial: https://auth0.com/blog/reactjs-authentication-tutorial/
const authCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://vandalizer.auth0.com/.well-known/jwks.json"
	}),
	audience: 'http://vandelizer-auth.com',
	issuer: "https://vandalizer.auth0.com/",
	algorithms: ['RS256']
});

app.use(authCheck);

app.get('/authorized', (req,res) => {
	res.send('Secured Resource');
});

const artistRoutes = require('./routes/artist-routes');
app.use('/artists', artistRoutes);

//const authRoutes = require('./routes/auth-routes');
//app.use('/auth',authRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);


//error handler
app.use('*', (req,res) => {
	res.status(400).json({
		message: 'Not found'
	});
});

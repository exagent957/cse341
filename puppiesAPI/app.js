/*CSE341 Web Services - Project 2 - Puppies API*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('node:path');
// const https = require('node:https');
// const fs = require('node:fs');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const xss = require('xss-clean');
const hpp = require('hpp');
const connect = require('./db/connect');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const port = process.env.PORT || 8080;
const app = express();

//Passport config
require('./config/passport')(passport);

app.use(bodyParser.json());

//Data sanitization. Protect against NoSQL query injection
app.use(mongoSanitize());
//Data sanitization. Protect against XSS
app.use(xss());
//Prevent parameter pollution
app.use(hpp());
//Logging
app.use(morgan('dev'));
//Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
//Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

app
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('', require('./routes'));

//Error handling
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

connect.connectToMongo();

// const options = {
//   key: fs.readFileSync('./agent2-key.pem'),
//   cert: fs.readFileSync('./agent2-cert.pem')
// };
// https.createServer(app).listen(port);
app.listen(port);
console.log(`Listening on ${port}`);

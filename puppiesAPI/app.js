/*eslint-disable*/
/*CSE341 Web Services - Project 2 - Puppies API*/
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./db/connect');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const port = process.env.PORT || 8080;
const app = express();


app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('', require('./routes'));

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

connect.connectToMongo();
app.listen(port);
console.log(`Listening on ${port}`);

// mongodb.initDb((err, mongodb) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on ${port}`);
//   }
// });






/*CSE341 Web Services - L02 Personal exercise. 
Requirements:  
Add at least 3 documents to "contacts" collection in cse341 database. 
Fields will be firstName, lastName, email, favoriteColor and birthday. 
Use .env to store MongoDB connection string to connect to MongoDB. 
Create a new route file called "contacts.js" to:
  1> GET All of the documents in the collection.
  2> GET a Single document By Id from a query parameter.
Use VS Code debugger. 
Use REST client to make http requests to web server.
*/
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


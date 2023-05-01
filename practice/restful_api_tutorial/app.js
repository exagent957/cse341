const express = require('express');
const app = express();// this now give the ability to add routes in a very simple way
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//Import Routes - a big time saver
const postsRoute = require('./routes/posts');


//Express middlewares
// app.use('/posts', () =>{
//   console.log("Hello from express middleware app.use");
// } )
app.use('/posts', postsRoute); //express middleware
app.use(bodyParser.json());

//routes--- moved them to routes directory
app.get('/', (req,res) => {res.send("We are on home page")});
// app.get('/posts', (req,res) => {res.send("We are on Posts page")});

//connect to db
mongoose.connect(process.env.DB_CONNECTION);

//talk to server
app.listen(3000);
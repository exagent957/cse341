/********* Connect to Mongodb *********/
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const DB = process.env.MONGODB_URI.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

function connectToMongo() {
  mongoose
    .connect(DB, { useNewUrlParser: true })
    .then(() => console.log('DB Connection successful'));
}

module.exports = { connectToMongo };

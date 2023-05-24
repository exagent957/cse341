/********* Connect to Mongodb *********//*eslint-disable*/ 
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const DB = process.env.MONGODB_URI.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

function connectToMongo(){
  mongoose.connect(DB, { useNewUrlParser: true })
  .then(() => console.log('DB Connection successful'));
};

module.exports = { connectToMongo };

//const MongoClient = require('mongodb').MongoClient;
// this is giving me trouble
// exports.connectToMongo = async () => {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log(`Connected to MongoDB and listening on port ${port}`);
//   };

// let _db;

// const initDb = (callback) => {
//   if (_db) {
//     console.log('Db is already initialized!');
//     return callback(null, _db);
//   }
    // MongoClient.connect(process.env.MONGODB_URI)
  // Connect using Mongoose
  // mongoose.connect(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  // })
//     .then((client) => {
//       _db = client;
//       callback(null, _db);
//     })
//     .catch((err) => {
//       console.log(err);
//       callback(err);
//     });
// };

// const getDb = () => {
//   if (!_db) {
//     throw Error('Db not initialized');
//   }
//   return _db;
// };

// module.exports = {
//   initDb,
//   getDb,
// };


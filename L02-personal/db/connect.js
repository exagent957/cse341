/********* Connect to Mongodb *********/ 
// Set up environment variable
const dotenv = require('dotenv');
dotenv.config();
// MongoClient Instance
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      console.log('Connected');
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
const { MongoClient } = require("mongodb");

const mongoClient = require("mongodb").MongoClient;
const objectID = require("mongodb").objectID;

const dbname = "crud_mongodb";

const url = "mongodb://localhost:27017";
const mongOptions = { useNewUrlParser: true };

// intially no db
const state = {
  db: null,
};

// declaring functions here:

const connect = (cb) => {
  if (state.db) cb();
  else {
    MongoClient.connect(url, mongOptions, (err, client) => {
      if (err) cb();
      else {
        state.db = client.db(dbname);
        cb();
      }
    });
  }
};

const getPrimaryKey = (_id)=>{
    return objectID(_id);
}

const getDB = () => {
    return state.db;
}

module.exports = {getDB, connect, getPrimaryKey};


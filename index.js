const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require("path");

const db = require("./db");
const { getPrimaryKey } = require("./db");
const collection = "todo";

db.connect((err) => {
  if (err) {
    console.log("unable to connect to database");
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log("connected to database, app listening to port 3000");
    });
  }
});

// css routing
// TODO: refactor this
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(express.static("public"));

// READ ROUTE
app.get("/getTodos", (req, res) => {
  db.getDB()
    .collection(collection)
    .find({})
    .toArray((err, documents) => {
      if (err) {
        console.log(err);
      } else {
        console.log(documents);
        res.json(documents);
      }
    });
});

// UPDATE ROUTE
// update
app.put("/:id", (req, res) => {
  // Primary Key of Todo Document we wish to update
  const todoID = req.params.id;
  // Document used to update
  const userInput = req.body;
  // Find Document By ID and Update
  db.getDB()
    .collection(collection)
    .findOneAndUpdate(
      { _id: db.getPrimaryKey(todoID) },
      { $set: { todo: userInput.todo } },
      { returnOriginal: false },
      (err, result) => {
        if (err) console.log(err);
        else {
          res.json(result);
        }
      }
    );
});

// create route
app.post("/", (req, res) => {
  const userInput = req.body;
  db.getDB()
    .collection(collection)
    .insertOne(userInput, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result: result, document: result.ops[0] });
      }
    });
});

//delete route
app.delete("/:id", (req, res) => {
  const todoID = req.params.id;
  db.getDB()
    .collection(collection)
    .findOneAndDelete({ _id: db.getPrimaryKey(todoID) }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
});

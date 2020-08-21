const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const path = require('path');

const db = require("./db");
const collection = "todo";


db.connect((err)=>{
    if(err){
        console.log("unable to connect to database");
        process.exit(1);
    }
    else{
        app.listen(3000, ()=>{
            console.log("connected to database, app listening to port 3000");
        });
    }
});
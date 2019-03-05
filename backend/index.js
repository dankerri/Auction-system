// api-server entry
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
//self
var router = require("./router");
//========================================================


var app = express();
app.use(cors());
app.use('/', router);

app.listen(5000, ()=>{
  console.log("Listening port 5000")
})

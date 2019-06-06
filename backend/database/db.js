// setup mysql connection configrations
var mysql = require("mysql");


// setup database configration variables
var config = {
  host:'localhost',
  user:'danker',
  password:'cctv..p,q'
}

var userPool = mysql.createPool({
  connectionLimit : 10,
  host            : config.host,
  user            : config.user,
  password        : config.password,
  database        : "sell"
});

var contentPool = mysql.createPool({
  connectionLimit : 10,
  host            : config.host,
  user            : config.user,
  password        : config.password,
  database        : "sell"
});


module.exports = {
  // adminPool,
  userPool,
  contentPool
};

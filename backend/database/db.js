// setup mysql connection configrations
var mysql = require("mysql");


// setup database configration variables
var config = {
  host:'localhost',
  user:'danker',
  password:'cctv..p,q'
}

var adminPool = mysql.createPool({
  connectionLimit : 10,
  host            : config.host,
  user            : config.user,
  password        : config.password,
  database        : "s_admin_auth"
});

var userPool = mysql.createPool({
  connectionLimit : 10,
  host            : config.host,
  user            : config.user,
  password        : config.password,
  database        : "s_user_auth"
});

var contentPool = mysql.createPool({
  connectionLimit : 10,
  host            : config.host,
  user            : config.user,
  password        : config.password,
  database        : "s_content"
});


module.exports = {
  adminPool,
  userPool,
  contentPool
};

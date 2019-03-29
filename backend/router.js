// express middleware.
var express = require("express");
var squel = require("squel");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var checkJwt = require("express-jwt");
var fileUpload = require('express-fileupload')
// self
var db = require("./database/db");
//=========================================================

// secret key for token sign
const secret = 'shhh'

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(fileUpload())

// provide static source 
router.use(express.static(__dirname+'/public'));


router.post('/adminLogin', (req, res) => {
  // Debugging
  // console.log(req.body.username + ' ' + req.body.password);
  db.adminPool.query(
    squel.select()
    .from("admin")
    .join("admin_profile", null, "admin.id = admin_profile.user_id")
    .field("admin.id")
    .field("username")
    .field("password")
    .field("level")
    .field("phone")
    .where("username = '"+req.body.username+"' ")
    .toString(), 
    (err, row)=> {
      if (row[0] && row[0].password == req.body.password) {
        var token = jwt.sign({
          id: row[0].id,
          username: row[0].username,
          level: row[0].level
        }, secret)
        
        res.send({
          token: token,
          username: row[0].username,
          level: row[0].level,
          phone: row[0].phone,
        })
      } else {
        console.log("unmatch")
        res.status(500).send("unmatch");
      }
      // debugging
      // console.log(row);
  })
})


router.post('/userLogin', (req, res) => {
  // Debugging
  // console.log(req.body.username + ' ' + req.body.password);
  db.userPool.query(
    squel.select()
    .from("user")
    .join("user_profile", null, "user.id = user_profile.user_id")
    .field("user.id as id")
    .field("username")
    .field("password")
    .field("level")
    .where("username = '"+req.body.username+"' ")
    .toString(), 
    (err, row)=> {
      if (row[0] && row[0].password == req.body.password) {
        var token = jwt.sign({
          id: row[0].id,
          username: row[0].username,
          level: row[0].level
        }, secret)
        
        res.send({
          token: token,
          username: row[0].username,
          level: row[0].level,
          id: row[0].id
        })
      } else {
        console.log("unmatch")
        res.status(500).send("unmatch");
      }
      // Debugging
      // console.log(row);
  })
})

// In root dashboard, get the list of admin
router.get('/adminList', checkJwt({ secret: secret }), (req, res)=> {
  if (!req.user) {
    res.send("token in request is unvaild")
  } else {
    // level 0 means root permission
    if (! (req.user.level == 0 ) ) {
      res.send("you don't have permission.")
    } else {
        db.adminPool.query(
          squel.select()
          .from("admin")
          .join("admin_profile", null, "admin.id = admin_profile.user_id")
          .field("admin.id")
          .field("username")
          .field("phone")
          .toString(), 
          (err, row)=> {
            if (err) {
      
            } else {
              res.send(row)
              // debugging
              console.log(row);
            }
        })
    }
  }
})


// In root or admin dashboard, manage users
router.get('/userList', checkJwt({ secret: secret }), (req, res)=>{
  if( !req.user ) { res.send("Token in request is invaild.") }
  else {
    if ( !( req.user.level >= 0 )) {
      res.send("you don't have permission.")
    } else {
      db.userPool.query(
        squel.select()
        .from("user")
        .join("user_profile", null, "user.id = user_profile.user_id")
        .field("user.id")
        .field("username")
        .field("neckname")
        .toString(), 
        (err, row)=> {
          res.send(row)
      })
    }
  }
})

// In root or admin dashboard, managge commodities
router.get('/commodityList', (req, res)=>{
      db.contentPool.query(
        squel.select()
        .from("commodity")
        .join("commodity_detail", null, "commodity.commodity_id = commodity_detail.commodity_id")
        .join("s_user_auth.user", null, "commodity.seller_id = s_user_auth.user.id")
        .field("commodity.commodity_id as id")
        .field("commodity_name")
        .field("price")
        .field("seller_id")
        .field("username")
        .field("post_time")
        .field("commodity_des")
        .field("category")
        .field("pic_num")
        .where("status = 1")
        .toString(), 
        (err, row)=> {
          res.send(row)
      })
})

// ==============================================================================
// check duplication of username before create user account
router.post('/duplicationCheck', (req, res)=>{
  console.log("checking " + req.body.username)
  
  db.userPool.query(
    squel.select()
    .from('user')
    .field('username')
    .where("username = '"+req.body.username+"' ")
    .toString(),
    (err, row) => {
      if (row.length > 0) {
        res.send({ existence: true })
      } else {
        res.send({ existence: false })
      }
    }
  )
})

// create new user account 
router.post('/signup', (req, res) => {
  db.userPool.query(
    squel.insert()
    .into("user")
    .set("username",req.body.username)
    .set("password",req.body.password)
    .toString(), 
    (err, row) => {
      if (err) {
        console.log(err)
        res.send({ signup: false })
      } else {
        db.userPool.query('select max(id) as id from user', (err, row) => {
          db.userPool.query(
            squel.insert()
            .into("user_profile")
            .set("user_id", row[0].id)
            .toString(), 
            (err, row) => {
              if(err) { console.log(err); res.send({ signup: false})}
              else { res.send({ signup: true })}
          })
        })
      }
    }
  )  
})

//=======================================================================================
// user profile
// get user profile
router.post('/userProfile', checkJwt({ secret: secret }), (req, res)=>{
  if( !req.user ) { res.send("Token in request is invaild.") }
  else {
      db.userPool.query(
        squel.select()
        .from("user")
        .join("user_profile", null, "user.id = user_profile.user_id")
        .field("user.id as uid")
        .field("username")
        .field("neckname")
        .field("phone")
        .where(`username ='${req.body.username}' `)
        .toString(), 
        (err, row)=> {
          res.send(row)
      })
  }
})

// update user profile
router.post('/editUserProfile', checkJwt({ secret: secret }), (req, res)=>{
  if( !req.user ) { res.send("Token in request is invaild") }

  else {
    db.userPool.query(
      squel.update()
      .table("user_profile")
      .set("neckname", req.body.neckname)
      .set("phone", req.body.phone)
      .where(`user_id = ${req.body.id}`)
      .toString(),
      (err, row) => {
        if(err) {
          console.log(err)
          res.send({
            edit: false
          })      
        } else {
          res.send({
            edit: true,
            username: req.body.username,
            neckname: req.body.neckname,
            uid: req.body.uid
          })
        }
      }
    )
  }
})

// update wechat qrcode
const publicUrl = './backend/public';
router.post('/uploadWechat', (req, res)=>{
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let sampleFile = req.files.wechat;
  console.log(sampleFile)
  sampleFile.mv(publicUrl+'/user/'+req.body.username +'_wx.jpg', function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
})

// ==================================================================================================================================================================
// create new commodity card

// upload commodity_list
router.post('/uploadCommodityPic', (req, res)=>{
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const pic = req.files.pic

  // I don't know why typeof(pic) always return object
  // so if only upload a single picture, map function can't be called.
  // if catch thus error, we tear pic as an object.
  try {
    pic.map(item=>{
      console.log(item.name)
      
      //save pictures
      /* */
    })
  } 
  catch(e) {
    console.log(pic.name)
  }

  // set pic_num in commodity_detail
  /* */

  res.send(true)
})


router.post('/createCard', (req, res)=>{
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  console.log(req.files)

  res.send(true)
    
})




module.exports = router;

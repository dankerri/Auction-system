// express middleware.
var express = require("express");
// generate sql query
var squel = require("squel");
// paser post request
var bodyParser = require("body-parser");
//generate token
var jwt = require("jsonwebtoken");
// check token 
var checkJwt = require("express-jwt");

var base64Img = require('base64-img')
var thumb = require('node-thumbnail').thumb
// self
var db = require("./database/db");

var moment = require('moment');
var fs = require('fs')
 
//=========================================================

// secret key for token sign
const secret = 'shhh'

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({limit:"2100000kb"}));

// provide static source 
router.use(express.static(__dirname+'/public'));


router.get('/test', (req, res)=>{
  res.send("api server visited.")
})


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


// 获取需要放在首页拍卖的商品数据
router.get('/commodityList', (req, res)=>{
  db.contentPool.query(
    squel.select()
    .from("commodity")
    .field("commodity_id as cid")
    .field("pic_num")
    .field("price")
    .field("post_time")
    .field("commodity_name")
    .field("commodity_desc")
    .field("buyer")
    .where('active = 1')
    .order("cid", false)
    .toString(), 
    (err, rows)=> {
      if(err) {
        console.log(err)
      } else {
        res.send(rows)
      }
  })
})

// 获取所有未拍卖的商品(status =1)
router.get('/getUnsellCommodityList', (req, res)=>{
  db.contentPool.query(
    squel.select()
    .from("commodity")
    .field("commodity_id as cid")
    .field("pic_num")
    .field("price")
    .field("post_time")
    .field("commodity_name")
    .field("commodity_desc")
    .field("buyer")
    .where("status = 1")
    .order("cid", false)
    .toString(), 
    (err, rows)=> {
      if(err) {
        console.log(err)
      } else {
        res.send(rows)
      }
  })
})

//拍卖过程中价格和买家不停变化
router.post('/price', (req, res)=>{
  console.log(req.body)
  db.contentPool.query(
    squel.update()
    .table("commodity")
    .set("price", req.body.price)
    .set("buyer", req.body.buyer)
    .toString(), ()=>{})
})

//将商品状态设置为拍卖结束, 并取消活动状态
router.post('/end', (req, res)=>{
  db.contentPool.query(
    squel.update()
    .table("commodity")
    .set("status", 3)
    .set("active", 0)
    .where("commodity_id = ?", req.body.cid)
    .toString(),()=>{})
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


//======================================================================================

// upload component always auto upload
// But I don't need it, so just response true is enought.
router.post('/createCard', (req, res)=>{
  res.send(true)
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
      .where(`user_id = ${req.body.uid}`)
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

          if( req.body.cardPic){
            const pic = req.body.cardPic[0]
            base64Img.img(pic.thumbUrl, __dirname+'/public/user', `${req.body.username}_wx`, (err, filePath)=>{
              if(!err) {
                thumb({
                  source: filePath,
                  destination: __dirname+'/public/commodity/',
                  width: 200
                }, (files, err, stdout, stderr)=> {
                  console.log("All done")
                })
              }
            })
          }
        }
      }
    )
  }
})



// ==================================================================================================================================================================

// create new commodity card
router.post('/uploadPic', (req,res)=> {
  console.log(" received require")
  const cardPic = req.body.cardPic
  const picNum = cardPic.length
  let cid = '';


  db.contentPool.query(
    squel.insert()
    .into("commodity")
    .set("commodity_name",req.body.commodity_name)
    .set("price", req.body.price)
    .set("commodity_desc", req.body.desc)
    .set("pic_num", picNum)
    .toString(), (err, rows)=>{
    if(!err) {
      const cid = rows.insertId
      // save photo
      cardPic.map((pic, index)=>{
        base64Img.img(pic.thumbUrl, __dirname+'/public/commodity', `${cid}_${index}`, (err, filePath)=>{
            if(!err) {
              thumb({
                source: filePath,
                destination: __dirname+'/public/commodity/',
                width: 400
              }, (files, err, stdout, stderr)=> {
                console.log("All done")
              })
            }
          })
        })
        console.log("insert detail successed")
        res.send({
          post: true
        })
      } else {
        res.send({
          post: false
        })
        console.log(err)
      }
    }
  )




}) 

// delete commodity card from post list
router.post('/deleteCommodity', (req, res)=>{
  const cid = req.body.cid

  db.contentPool.query(
    squel.delete()
    .from("commodity")
    .where(`commodity_id = ${req.body.cid}`)
    .toString(),
    (err, rows)=>{
      if(!err) {
        const file = `${cid}_0.jpg`
        const thub = `${cid}_0_thumb.jpg`
        fs.unlinkSync(`${__dirname}/public/commodity/${file}`)
        fs.unlinkSync(`${__dirname}/public/commodity/${thub}`)
        res.send({ edit : true})
      } else {
        res.send({ edit: false})
        console.log(err)
      }
    }
  )
})

// update commodity card information
router.post('/updateCommodityCard', (req, res)=>{
  let payload = req.body.payload
  let cid = req.body.cid
  // console.log(payload)
  // console.log(cid)
  console.log(req.body.payload)

  db.contentPool.query(
    squel.update()
    .table("commodity")
    .set("commodity_name = ?", payload.commodity_name)
    .set("price = ?", payload.price)
    .set("commodity_desc = ?", payload.commodity_desc)
    .where("commodity_id = ?", cid)
    .toString(),
     (err, rows) => {
      if(!err) {
        res.send({
          update: true
        })
      } else {
        res.send({
          update: false
        })
      }
    })
})

// change active from 1 to 2
router.post('/activePost', (req, res)=>{
  const date = new Date()
  const formatDate = (moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))

  db.contentPool.query(
    squel.update()
    .table("commodity")
    .set("active = 1")
    .set("status = 2")
    .set("post_time = ?", formatDate)
    .where(`commodity_id = ${req.body.cid}`)
    .toString(),
    (err, rows)=>{
      if(!err) {
        res.send({ edit : true})
      } else {
        res.send({ edit: false})
        console.log(err)
      }
    }
  )
})


module.exports = router;

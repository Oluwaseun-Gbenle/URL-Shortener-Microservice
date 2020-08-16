'use strict';

var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');
var bodyParser = require("body-parser");
var dns = require("dns");
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;
console.log(process.env.MONGO_URI)
/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.json())
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
  
});
// schema into model
const Url = mongoose.model('Url', urlSchema);
app.post("/api/shorturl/new",function(req,res){
  var originalUrl= req.body.url;
  var randomNum=Math.round(Math.random()*10000).toString();
   var shortUrl=randomNum;
  dns.lookup(originalUrl.replace(/^https?:\/\//, ''),(err,address)=>{
if(err || address== null){
res.json({"error":"invalid URL"})
}
   else{ 
  var data = new Url({
original_url: originalUrl,
     short_url:shortUrl
   });
  
 data.save(function(err, data) {
    if (err) console.error(err);
return res.json(data);
    })
       } 
    
})
  
 
})

 
app.get("/api/shorturl/:num",(req,res)=>{
  var shorterUrl = req.params.num;
Url.findOne({short_url: shorterUrl}, (err, doc) => {
  var re = /^https?:\/\//;
    if (err)console.log("not found");
  if(re.test(doc.original_url)){
    res.redirect(301,doc.original_url)
  }
 else res.redirect(301,"http://" + doc.original_url)
   
  })
 
})






app.listen(port, function () {
  console.log('Node.js listening ...');
});
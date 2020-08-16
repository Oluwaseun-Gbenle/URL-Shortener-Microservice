'use strict';

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongodb = require('mongodb');
const cors = require('cors')
const mongoose = require('mongoose')
const dns = require('dns')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
const urlSchema = new mongoose.Schema({
 username:{ type: String, required: true },
    _id:Number
  
});
// schema into model
const Test = mongoose.model('Test', urlSchema);
app.post("/api/shorturl/new",function(req,res){
  var originalUrl= req.body.url;

   var clientusername = req.body.username;
  var re = /^\d+$/;
  if(!re.test(originalUrl) && originalUrl != ""){
   var data = new Test({
username:originalUrl,
    _id:4
   });
 data.save(function(err, data) {
    if (err) console.error(err);
return res.json(data);
    })
       } 
    else{
return res.json({"error":"invalid URL"})
}
  
 
})


 







const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
const userSchema = new mongoose.Schema({
 username:{ type: String, required: true },
    _id:Number
  
});
// schema into model
const User = mongoose.model('User', userSchema);
app.post("/api/exercise/new-user",function(req,res){
   var clientusername = req.body.username;
  var re = /^\d+$/;
  if(!re.test(clientusername) && clientusername!= ""){
   var data = new User({
username:clientusername,
    _id:4
   });
 data.save(function(err, data) {
    if (err) console.error(err);
return res.json(data);
    })
       } 
    else{
return res.json({"error":"invalid username"})
}
  
 
})
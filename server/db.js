const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/final");
const db = mongoose.connection;
db.on('error',(error) => console.log('Mongo connection error'+error)); //failed
db.once('open',() => console.log('Mongo connection successed')); //success

const loginSchema = mongoose.Schema({
    name : String,
    password : String,
    nickname: String
  });

  const Models = {
    login : mongoose.model('users',loginSchema)
} //create a chart named users

const treeComment= mongoose.Schema({
  nickname:String,
  likes:Number,
  comment:String
})

 const tree={
   HomePage : mongoose.model('comments', treeComment)
 }

module.exports = Models;
module.exports = tree;
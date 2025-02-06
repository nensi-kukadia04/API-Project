const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ApiData');

const db=mongoose.connection;

db.once('open',(err)=>{
    err?console.log("error",err):console.log("Database is connected");
})

module.exports=db;
const express=require('express');
const passport=require('passport');

const routes=express.Router();
const homeCtrl=require('../controllers/homeController');
const { route } = require('./authRoute');

routes.get('/',passport.authenticate('jwt',{failureRedirect:'/unAuth'}),homeCtrl.viewData);
routes.post('/insertData',passport.authenticate('jwt',{failureRedirect:'/unAuth'}),homeCtrl.insertData);
routes.delete('/deleteData/:id',passport.authenticate('jwt',{failureRedirect:'/unAuth'}),homeCtrl.deleteData);

//update data
routes.get('/getsingleObj/:id',passport.authenticate('jwt',{failureRedirect:'/unAuth'}),homeCtrl.getsingleObj);
routes.patch('/editData/:id',passport.authenticate('jwt',{failureRedirect:'/unAuth'}),homeCtrl.editData);

//unauth
routes.get('/unAuth',async(req,res)=>{
    res.status(200).json({msg:"You are Unauthorized"});
})

routes.use('/auth',require('./authRoute'));

module.exports=routes;
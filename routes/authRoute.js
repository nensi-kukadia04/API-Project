const express=require('express');
const routes=express.Router();
const authCtrl=require('../controllers/authController');

routes.post('/',authCtrl.signUp);
routes.post('/signIn',authCtrl.signIn);

module.exports=routes;
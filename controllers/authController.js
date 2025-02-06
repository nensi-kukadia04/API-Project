const Auth=require('../models/authModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

// signUp(register)

module.exports.signUp=async(req,res)=>{
    try{
    console.log(req.body);
    let checkData=await Auth.find({email:req.body.email}).countDocuments();
    if(checkData==0){
        if(req.body.password==req.body.confirmPassword){
            req.body.password=await bcrypt.hash(req.body.password,10);
            let signUpUser=await Auth.create(req.body);
            if(signUpUser){
                res.status(200).json({msg:"user Register successfully"});
            }
            else{
                res.status(200).json({msg:"user not register"});
            }
        }else{
            res.status(200).json({msg:"Password and confirm password are doesn't match...Try again"});
        }
    }
    else{
        res.status(200).json({msg:"Email already register....try new email"});
    }   
    }catch(err){
        res.status(400).json({msg:"something is wrong",error:err});
    }
}

//signIn

module.exports.signIn=async(req,res)=>{
    try{
        let checkEmail=await Auth.findOne({email:req.body.email});
        if(checkEmail){
            let checkPassword=await bcrypt.compare(req.body.password,checkEmail.password);
            if(checkPassword){
                let token = await jwt.sign({data:checkEmail},"API");
                res.status(200).json({msg:"Login successfully",data:token});
            }else{
                res.status(200).json({msg:"password not matched...Try again"});
            }
        }
        else{
            res.status(200).json({msg:"Email not register...Try again"});
        }
    }catch(err){
        res.status(400).json({msg:"something is wrong",error:err});
    }
}
const User=require('../models/userModel');

module.exports.viewData=async(req,res)=>{
    try{
        let viewData=await User.find();
        if(viewData){
            res.status(200).json({msg:"view Data",data:viewData});
        }
        else{
            res.status(200).json({msg:"something is wrong....data not shown"});
        }
    }
    catch(err){
        res.status(400).json({msg:"something is wrong",error:err});
    }
}
module.exports.insertData=async(req,res)=>{
    try{
        // console.log(req.body);
        const userData=await User.create(req.body);
        if(userData){
            res.status(200).json({msg:"Data add successfully"});
        }
        else{
            res.status(200).json({msg:"Data not added"});
        }
    }
    catch(err){
        res.status(400).json({msg:"something is wrong",error:err});
    }
}

module.exports.deleteData=async(req,res)=>{
    try{
        const deleteRecord=await User.findByIdAndDelete(req.params.id);
        if(deleteRecord){
            res.status(200).json({msg:"Data delete successfully"});
        }
        else{
            res.status(200).json({msg:"Data not delete"});
        }
    }
    catch(err){
        res.status(400).json({msg:"something is wrong",error:err});
    }
}

module.exports.getsingleObj=async(req,res)=>{
    try{
        const singleData=await User.findById(req.params.id);
        if(singleData){
            res.status(200).json({msg:"Data found successfully "});
        }
        else{
            res.status(200).json({msg:"Data not found"});
        }
    }
    catch(err){
        res.status(400).json({msg:"something is wrong",error:err});
    }
}

module.exports.editData=async(req,res)=>{
    try{
        const checkData=await User.findById(req.params.id);
        if(checkData){
            let updateData=await User.findByIdAndUpdate(checkData._id,req.body);
            if(updateData){
                updateData=await User.findById(checkData._id);
                res.status(200).json({msg:"Data update successfully ",data:updateData});
            }
            else{
                res.status(200).json({msg:"Data not update"});
            }
        }
        else{
            res.status(200).json({msg:"Data not found"});
        }
    }
    catch(err){
        res.status(400).json({msg:"something is wrong",error:err});
    }
}

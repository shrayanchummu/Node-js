const Joi= require('joi');
const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');

// Mongoose
const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:5,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        minLength:5,
        maxLength:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:1024,
    }
    // id is inbuilt
});

const User= mongoose.model('User',userSchema);

//function to validate user
function validateUser(user)
{
    const schema={
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(8).max(1024).required(),
    };
    return Joi.validate(user,schema);
}

router.post('/',async(req, res)=>{

    const {error} = validateUser(req.body);
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }


    let user=await User.findOne({email:req.body.email});
    if(user){
        res.status(400).send('User already registered');
    }
    

    user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    const salt=await bcrypt.genSalt(10);
    // console.log(salt);
    user.password=await bcrypt.hash(user.password,salt);
    // console.log(user.password);

    await user.save();
    res.send({
        name:user.name,
        email:user.email
    });
});

module.exports=router;
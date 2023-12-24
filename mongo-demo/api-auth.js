const Joi= require('joi');
const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');

const User = require('./api-users'); 


//function to validate login details
function validate(req)
{
    const schema={
        email:Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(8).max(1024).required(),
    };
    return Joi.validate(req,schema);
}

router.post('/',async(req, res)=>{

    const {error} = validate(req.body);
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }

    let user=await User.findOne({email:req.body.email});
    if(!user){
        res.status(400).send('Invalid Email or Password');
        // return;
    }
    
    const valid= await bcrypt.compare(req.body.password,user.password);
    if(!valid){
        res.status(400).send('Invalid Email or Password');
        // return;
    }

    res.send("Login Successfully");
});

module.exports=router;
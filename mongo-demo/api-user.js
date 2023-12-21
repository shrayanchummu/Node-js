// const Joi= require('joi');
// const express = require('express');
// const router = express.Router();
// const bcrypt=require('bcrypt');

// // Mongoose
// const mongoose= require('mongoose');
// console.log('Importing done in user');
// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         minLength:5,
//         maxLength:50
//     },
//     email:{
//         type:String,
//         required:true,
//         minLength:5,
//         maxLength:50,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true,
//         minLength:8,
//         maxLength:1024,
//     }
//     // id is inbuilt
// });
// console.log('Created Schema in user');

// const User= mongoose.model('User',userSchema);
// console.log('Created Model in user');
// //function to validate user
// function validateUser(user)
// {
//     const schema={
//         name:Joi.string().min(5).max(50).required(),
//         email:Joi.string().min(5).max(50).required().email(),
//         password:Joi.string().min(8).max(1024).required(),
//     };
//     console.log('Validated User in user', user);

//     return Joi.validate(user,schema);
// }

// router.post('/',async(req, res)=>{
//     console.log('POst endpoint in user');

//     const {error} = validateUser(req.body);
//     console.log('CHecking error in user', req.body);

//     if(error)
//     {
//         res.status(400).send(error.details[0].message);
//         return;
//     }

//     console.log('Incoming request bodyin user');


//     let user=await User.findOne({email:req.body.email});
//     console.log('Finding email', req.body);

//     if(user){
//         res.status(400).send('User already registered');
//         return;
//     }
    

//     user=new User({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password
//     });

//     console.log('Created User', req.body);
//     const salt=await bcrypt.genSalt(10);
//     // console.log(salt);
//     user.password=await bcrypt.hash(user.password,salt);
//     // console.log(user.password);
//     console.log('Hashing Password', req.body);

//     await user.save();
//     console.log('Saving User', req.body);
//     res.send({
//         name:user.name,
//         email:user.email
//     });
// });

// module.exports=router;
// module.exports=User;
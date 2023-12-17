const Joi= require('joi');
const express = require('express');
const router = express.Router();

// Mongoose
const mongoose= require('mongoose');

const namesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:5,
        maxLength:20
    },
    // id is inbuilt
});

const Name= mongoose.model('Name',namesSchema);


// const names = [
//     {id:1,name:'NAME1'},
//     {id:2,name:'NAME2'},
//     {id:3,name:'NAME3'},
// ];

router.get('/', async(req, res)=>{
    const names= await Name.find().sort('name'); 
    res.send(names);
});

router.get('/:id', async(req, res)=>{
    const name =await Name.findById(req.params.id)
    // const name=names.find(n => n.id === parseInt(req.params.id));
    if(!name)
    {
        return res.status(404).send('given id not found');
    }
    else
    {
        res.send(name);
    }
});


//function to validate names
function validateNames(name)
{
    const schema={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(name,schema);
}

router.post('/',async(req, res)=>{

    const {error} = validateNames(req.body);
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }

    let newName=new Name({ name:req.body.name });
    names=await newName.save();
    res.send(names);
});

router.put('/:id',async(req, res) => {
    const {error} = validateNames(req.body);
    if(error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const name=await Name.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        new:true
    })
    // const name=names.find(n => n.id === parseInt(req.params.id));
    if(!name)
    {
        return res.status(404).send('given id not found');
    }
    // name.name=req.body.name;
    res.send(names);
});

router.delete('/:id',async(req, res) =>{
    const name = await Name.findByIdAndDelete(req.params.id)
    // const name=names.find(n => n.id === parseInt(req.params.id));
    if(!name)
    {
        return res.status(404).send('given id not found');
    }
    // const index= names.indexOf(name);
    // names.splice(index,1);
    res.send(name);
});

module.exports=router;
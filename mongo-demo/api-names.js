const express = require('express');
const router = express.Router();

const names = [
    {id:1,name:'NAME1'},
    {id:2,name:'NAME2'},
    {id:3,name:'NAME3'},
];

router.get('/', (req, res)=>{
    res.send(names);
});

router.get('/:id', (req, res)=>{
    const name=names.find(n => n.id === parseInt(req.params.id));
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

router.post('/',(req, res)=>{
    const {error} = validateNames(req.body);
    if(error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const newName={
        id:names.length+1 ,
        name:req.body.name
    };
    names.push(newName);
    res.send(names);
});

router.put('/:id',(req, res) => {
    const name=names.find(n => n.id === parseInt(req.params.id));
    if(!name)
    {
        return res.status(404).send('given id not found');
    }
    const {error} = validateNames(req.body);
    if(error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    name.name=req.body.name;
    res.send(names);

});

router.delete('/:id',(req, res) =>{
    const name=names.find(n => n.id === parseInt(req.params.id));
    if(!name)
    {
        return res.status(404).send('given id not found');
    }
    const index= names.indexOf(name);
    names.splice(index,1);
    res.send(name);
});

module.exports=router;
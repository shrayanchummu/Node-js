const Joi= require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

const startupDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');




//config managing
const config=require('config');
console.log('App name:'+config.get('name'));
console.log('Mail Server name:'+config.get('mail.host'));


const helmet = require('helmet');
const morgan = require('morgan');
// this app object have all these methods
// app.get(); ('path',callback function)
// app.post();
// app.put();
// app.delete();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);


app.use(express.json());
// middleware functions
app.use(logger);
// static middleware function
app.use(express.static('public'));
// third-party middleware function
if(app.get('env') === 'production')
{
    app.use(helmet());
    dbDebug('Testing Helmet');
}
if(app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    startupDebug('Testing Morgan');
}

const names = [
    {id:1,name:'NAME1'},
    {id:2,name:'NAME2'},
    {id:3,name:'NAME3'},
];

// app.get('/api/:id/:name', (req, res)=>{
//     res.send(req.params);
// });
// app.get('/api/:id/:name', (req, res)=>{
//     res.send(req.query);
// });

app.get('/', (req, res) => {
    res.send('Hello World!, You are on Port 3000');
});
app.get('/api/names', (req, res)=>{
    res.send(names);
});
app.get('/api/names/:id', (req, res)=>{
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

app.post('/api/names',(req, res)=>{

    // const schema={
    //     name:Joi.string().min(3).required()
    // };
    // const result=Joi.validate(req.body,schema);

    // if(result.error)
    // {
    //     // 400 Bad Request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
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



app.put('/api/names/:id',(req, res) => {
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
    // If valid, Update the names
    // Return the updated names
    name.name=req.body.name;
    res.send(names);

});

app.delete('/api/names/:id',(req, res) =>{
    // Look up the names
    // if not found,return 404
    const name=names.find(n => n.id === parseInt(req.params.id));
    if(!name)
    {
        return res.status(404).send('given id not found');
    }
    // if found,delete the name and return it.
    const index= names.indexOf(name);
    names.splice(index,1);
    res.send(name);
});

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
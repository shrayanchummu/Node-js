const Joi= require('joi')
const express = require('express');
const app = express();

app.use(express.json()); 


const names = [
    {id:1,name:'NAME1'},
    {id:2,name:'NAME2'},
    {id:3,name:'NAME3'},
];

app.post('/api/names',(req, res)=>{

    const schema={
        name:Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body,schema);
    console.log(result);

    if(result.error)
    {
        // 400 Bad Request
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
        res.status(404).send('given id not found');
    }
    else
    {
        res.send(name);

    }
});


// app.get('/api/:id/:name', (req, res)=>{
//     res.send(req.params);
// });
// app.get('/api/:id/:name', (req, res)=>{
//     res.send(req.query);
// });


const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});




// this app object have all these methods
// app.get(); ('path',callback function)
// app.post();
// app.put();
// app.delete();
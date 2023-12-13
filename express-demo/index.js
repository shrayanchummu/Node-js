const express = require('express')
const app = express()
app.use(express.json());


const names = [
    {id:1,name:'NAME1'},
    {id:2,name:'NAME2'},
    {id:3,name:'NAME3'},
];

app.post('/api/names',(req, res)=>{

    if(!res.body.name || res.body.name.length<3)
    {
        // 400 Bad Request
        res.status(400).send('name must be at least 3 characters');
        return;
    }

    const name={
        id:names.length+1,
        name:req.body.name
    };
    names.push(name);
    res.send(name);
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
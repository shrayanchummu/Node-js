const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!, You are on Port 3000');
});
app.get('/api', (req, res)=>{
    res.send([1,2,3]);
});
app.get('/api/:id/:name', (req, res)=>{
    res.send(req.params);
});
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
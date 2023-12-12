const { Socket } = require('dgram');
const http=require('http');
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write('You are in Home Page');
        res.end();
    }
    if(req.url==='/api'){
        res.write('You are in /api page');
        res.end();
    }
});

server.listen(3000);
console.log('Listening on Port 3000');
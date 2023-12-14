const express = require('express');
const router=express.Router();

router.get('/', (req, res) => {
    res.render('index',{title:"My App",message:"Hello from pug"});
    //res.send('Hello World!, You are on Port 3000');
});

module.exports = router;
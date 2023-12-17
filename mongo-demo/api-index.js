// order of the elements [require,set,use]
const Joi= require('joi');
const express = require('express');
const api_names=require('./api-names');
const app = express();

app.use(express.json());
app.use('/api/names',api_names);

//port allocation
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
// order of the elements [require,set,use]
const express = require('express');
const api_names=require('./api-names');
const api_user=require('./api-user');
const app = express();

// Mongoose
const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1/api-demo')
  .then(()=>{
        console.log('connected to mongodb');
    })
  .catch(err=>{
       console.log(err.message);
   });

app.use(express.json());
app.use('/api/names',api_names);
app.use('/api/user',api_user);

//port allocation
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
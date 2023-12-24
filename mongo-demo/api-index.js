// order of the elements [require,set,use]
const api_names=require('./api-names');
const api_users=require('./api-users');
const api_auth=require('./api-auth');
const express = require('express');
const app = express();
// console.log('Importing done');
// Mongoose
const mongoose= require('mongoose');
// console.log('Importing mongoose');
mongoose.connect('mongodb://127.0.0.1/api')
  .then(()=>{
        console.log('connected to mongodb');
    })
  .catch(err=>{
       console.log(err.message);
   });

app.use(express.json());
app.use('/api/names',api_names);
app.use('/api/users',api_users);
app.use('/api/login',api_auth);
// console.log('Using apps');

//port allocation
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
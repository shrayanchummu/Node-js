const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/database_name');
// if db is not created already, it will create it
// if its production environment, link should come from configuration file
mongoose.connect('mongodb://127.0.0.1/playground')
    .then(()=>{console.log('Connected to MongoDB');})
    .catch(err=>{console.error('Error connecting to MongoDB ',err.message);});

// create a schema

const userSchema = new mongoose.Schema({
    name: String,
    tags:[String],
    date:{ type: Date, default: Date.now },
    isPublished: Boolean
});
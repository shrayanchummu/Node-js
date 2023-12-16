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

// Classes, Objects in OOPS
// Schema, Model in Mongoose
async function createModel(){
    const User = mongoose.model('User', userSchema);
    const user = new User({
    name:'Chummu',
    tags:['C++','System Design'],
    isPublished:true
    });
    const result = await user.save();
    console.log(result);
}
//createModel();

// Querying Documents
const User = mongoose.model('User', userSchema);
async function getModel(){
    const result= await User.find();
    console.log(result);
}
getModel();
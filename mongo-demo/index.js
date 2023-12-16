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
// const User = mongoose.model('User', userSchema);
// async function getModel(){
//     const result= await User.find();
//     console.log(result);
// }
// getModel();

const User = mongoose.model('User', userSchema);
async function getModel(){
    const result= await User
        .find({name:'Shrayan'})
        // .find({price: {$gt: 10, $lt: 20}}) // greater than 10 & less than 20
        // .find({price: {$in:[10,20,30]}}) // if price = 10 or 20 or 30
        // .find({price: {$ne:10}}) // if price not equal to 10
        // .find()
        // .or([{name:'Shrayan'},{isPublished:true}]) // gets Shrayan or true values
        // .and([{name:'Shrayan'},{isPublished:false}])// gets only if 
        // // Starts with 'Abc' (case senstive)
        // .find({name: /^Abc/ })
        // // Ends with 'Abc' (case insenstive)
        // .find({name: /Abc$/i })
        // // Contains 'Abc' (case insenstive)
        // .find({name: /.*Abc.*/i })
        
        .limit(10)
        .sort({name :1}) // 1/-1 => Ascending/Descending
        .select({ name:1,tags:1}) // shows only name,tag info
    console.log(result);
}
getModel();
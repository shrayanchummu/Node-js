const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/database_name');
// if db is not created already, it will create it
// if its production environment, link should come from configuration file
mongoose.connect('mongodb://127.0.0.1/playground')
    .then(()=>{console.log('Connected to MongoDB');})
    .catch(err=>{console.error('Error connecting to MongoDB ',err.message);});

// create a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:5,
        maxLength:50,
        //match: /pattern/
    },
    category:{
        type:String,
        required: true,
        enum:['option 1','option 2'],
        lowercase:true,
        // uppercase:true,
        trim:true // removes padding in string
    },
    tags:{
        type:Array,
        validate:{
            validator: function(value){
                return (value) && value.length > 0;
            },
            message: 'Should have at least one tag'
        }
    },
    date:{ type: Date, default: Date.now },
    isPublished: Boolean,
    price:{
        type: Number,
        required: function(){
             return this.isPublished;
            //requires if isPublishes is true
        },
        min:10,
        max:5000,
        set: value=>Math.round(value),
        get: value=>Math.round(value)
    }
});

// Classes, Objects in OOPS
// Schema, Model in Mongoose
async function createModel(){
    const User = mongoose.model('User', userSchema);
    const user = new User({
    name:'Chummu',
    category:'Developer',
    tags:['C++','System Design'],
    isPublished:true,
    price:1000.5
    });

    try{
        const result = await user.save();
        console.log(result);
    }
    catch(err){
        console.log(err.message);
    }
}
//createModel();

// Querying Documents
// const User = mongoose.model('User', userSchema);
// async function getModel(){
//     const result= await User.find();
//     console.log(result);
// }
// getModel();

// const User = mongoose.model('User', userSchema);
// async function getModel(){
//             // const pageNumber =3;
//             // const pageSize =10;
//     const result= await User
//         .find({name:'Shrayan'})
//         // .find({price: {$gt: 10, $lt: 20}}) // greater than 10 & less than 20
//         // .find({price: {$in:[10,20,30]}}) // if price = 10 or 20 or 30
//         // .find({price: {$ne:10}}) // if price not equal to 10
//         // .find()
//         // .or([{name:'Shrayan'},{isPublished:true}]) // gets Shrayan or true values
//         // .and([{name:'Shrayan'},{isPublished:false}])// gets only if 
//         // // Starts with 'Abc' (case senstive)
//         // .find({name: /^Abc/ })
//         // // Ends with 'Abc' (case insenstive)
//         // .find({name: /Abc$/i })
//         // // Contains 'Abc' (case insenstive)
//         // .find({name: /.*Abc.*/i })
//         // .count() // Counts the no. of documents in the collection
//         .limit(10)
//         .sort({name :1}) // 1/-1 => Ascending/Descending
//         .select({ name:1,tags:1}) // shows only name,tag info
//     console.log(result);
// }
// //getModel();

// const User = mongoose.model('User', userSchema);
// async function updateUser(id){
//     const userResult = await User.updateOne({_id : id},{
//         $set:{
//             name:'again new name',
//             tags:['new tag1', 'new tag2'],
//             isPublished:true
//         }
//     });
//     console.log(userResult);
// }
// updateUser('657de5487df95880d24530fb');

const User = mongoose.model('User', userSchema);
async function deleteUser(id){
    const userResult = await User.deleteOne({_id : id});
    console.log(userResult);
}
deleteUser('657de5487df95880d24530fb');



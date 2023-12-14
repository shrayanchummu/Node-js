// order of the elements [require,set,use]
const Joi= require('joi');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();

//router module
const names = require('./routes/names');
app.use('/api/names',names);
const home= require('./routes/home');
app.use('/',home);



//template engines
app.set('view engine', 'pug');
app.set('views','./views'); //default and optional

//debugging package
const startupDebug = require('debug')('app:startup');
const dbDebug = require('debug')('app:db');

//config managing
const config=require('config');
console.log('App name:'+config.get('name'));
console.log('Mail Server name:'+config.get('mail.host'));


const helmet = require('helmet');
const morgan = require('morgan');

// ENVIRONMENT VARIABLES
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
// middleware functions
app.use(logger);
// static middleware function
app.use(express.static('public'));
// third-party middleware function
if(app.get('env') === 'production')
{
    app.use(helmet());
    dbDebug('Testing Helmet');
}
if(app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    startupDebug('Testing Morgan');
}
//port allocation
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
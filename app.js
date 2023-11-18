const EventEmitter=require('events'); // EventEmitter is a class

const Logger=require('./logger')
const logger=new Logger();

// Register a Listener
logger.on('messageLogged', (event)=>{
    console.log('Listener called',event);
});

logger.log('Hello World');


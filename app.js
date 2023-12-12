//const EventEmitter=require('events'); // EventEmitter is a class

const Logger=require('./logger')
const logger=new Logger();

// Register a Listener
// eventArd indiactes the arguments of the event which is raised at event emitter
logger.on('messageLogged', (eventArg)=>{
    console.log('Listener called',eventArg);
});

logger.log('I am logged in');


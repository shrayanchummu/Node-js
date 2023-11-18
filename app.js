const EventEmitter=require('events'); // EventEmitter is a class
const emitter = new EventEmitter(); // creating a object

// Register a Listener
emitter.on('messageLogged', (event)=>{
    console.log('Listener called',event);
});
//Raise an Event
emitter.emit('messageLogged',{ id:1, url:'https://'});

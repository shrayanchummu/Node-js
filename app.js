const EventEmitter=require('events'); // EventEmitter is a class
const emitter = new EventEmitter(); // creating a object

// Register a Listener
emitter.on('messageLogged', function(){
    console.log('Listener called');
});
//Raise an Event
emitter.emit('messageLogged');

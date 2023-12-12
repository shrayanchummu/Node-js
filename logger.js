const EventEmitter=require('events'); // EventEmitter is a class
var url="";

// Wrapping func in Logger class
class Logger extends EventEmitter{ 
    log(message){
        // send an HTTP request
        console.log(message);
        //Raise an Event
        this.emit('messageLogged',{ id:1, url:'https://',loggedmessage:message});
    }
}
module.exports=Logger; // to export Logger Class
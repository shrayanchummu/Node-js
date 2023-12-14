function log(req, res, next){
    console.log('Logging (Middleware Function)');
    next();
}

module.exports = log;
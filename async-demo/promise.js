const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('blah blah blah');
        //resolve('Answer');
        reject(new Error('Error'));
    }, 2000);
});

p.then((result) => {console.log(result);})
.catch((err) => {console.log(err.message)});
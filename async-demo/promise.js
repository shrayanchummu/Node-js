// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('blah blah blah');
//         resolve('Answer'); // pending -> fulfilled
//         reject(new Error('Error')); // pending -> rejected
//     }, 2000);
// });

// p.then((result) => {console.log(result);})
// .catch((err) => {console.log(err.message)});

function getUser(id)
{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('getting username'); // executes in future after 2000ms
            // callback is called when the result of the asynchronous operation is ready
            resolve({id: id,username:'Chummu'});
        },2000);
    }); 
}
function getRepositories(username)
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('getting repositories of '+username +' by gitbuh API'); // executes in future after 2000ms
            resolve(['repo1','repo2','repo3']);
        },2000);
    });
}

const p= getUser(1);
p.then((user)=>{
    console.log(user);
    return getRepositories(user.username);
})
.then((repo)=>{
    console.log(repo);
})
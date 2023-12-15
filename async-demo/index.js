console.log('Before');
// getUser(id, function)
getUser(1, function(result){
    console.log(result);
    username=result.username;
    getRepositories(username, function(repo){
        console.log(repo);
    });
});
console.log('After');

function getUser(id,callback)
{
    setTimeout(()=>{
        console.log('getting username'); // executes in future after 2000ms
        // callback is called when the result of the asynchronous operation is ready
        callback({id: id,username:'Chummu'});
    },2000);
}
function getRepositories(username,callback)
{
    setTimeout(()=>{
        console.log('getting repositories of '+username +' by gitbuh API'); // executes in future after 2000ms
        callback(['repo1','repo2','repo3']);
    },2000);
}

// //Asynchronous
// console.log('Before');
// getUser(1,displayResult);
// console.log('After');

// //solving CALLBACK HELL
// function displayParameter(Parameter){
//     console.log(Parameter);
// }
// function displayRepository(repo){
//     anotherFunction(repo,displayParameter);
// }
// function displayResult(result){
//     getRepositories(result.username,displayRepository);
// }

const p1=new Promise((resolve, reject) =>{
    setTimeout(() => {
        console.log('Asynchronous no. 1');
        resolve(1); 
        reject(new Error('Error')); 
    }, 2000);
});
const p2=new Promise((resolve, reject) =>{
    setTimeout(() => {
        console.log('Asynchronous no. 2');
        resolve(2); 
        reject(new Error('Error')); 
    }, 2000);
});
// retuns after all fullfillments
Promise.all([p1,p2]).then((result)=>{
    console.log(result);
})
// returns after first fulfillment
// Promise.race([p1,p2]).then((result)=>{
//     console.log(result);
// })
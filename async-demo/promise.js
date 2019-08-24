const p = new Promise((resolve, reject) =>{
    //some async work
    //value
    setTimeout(() => {
        //resolve(1);
        reject(new Error('message'));
    }, 2000)
    //error
    //reject(new Error('message'));
});

p
.then(result => console.log('Result', result))
.catch(err => console.log('Error:', err.message));
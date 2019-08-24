//Predefined resolve
const p = Promise.resolve({id: 1});
p.then(result => console.log(result));
//Predefined reject
const p1 = Promise.reject(new Error('Reason for rejection'));
p1.catch(error => console.log(error));
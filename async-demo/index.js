//@ts-check
console.log('Before');
//
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => displayRepositories(repos))
//     .catch(err => console.log('Error: ', err.message));
//Get repositories

//Using Async Await approach
async function displayCommits() {
    try{
        const user = await getUser(1);
        const repos = await  getRepositories(user.gitHubUsername);
        displayRepositories(repos);
    }
    catch (err) {
        console.log('Error:', err.message);
    }
}

displayCommits();

console.log('After');

// function getRepositories1(user){
//     console.log('User:', user);
//     getRepositories(user.gitHubUsername);
// }

function displayRepositories(repos){
    console.log('Repositories:', repos);
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading from databsse ....');
            //callback({ id: id, gitHubUsername: 'Mosh'});
            resolve({ id: id, gitHubUsername: 'Mosh'});
            }, 2000);
    });
    
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading from GitHub ....');
            //callback({ username: username, repos: ['repo1', 'repo2', 'repo3'] });
            resolve({ username: username, repos: ['repo1', 'repo2', 'repo3'] });
            //use below to simulate an error
            //reject(new Error ('Could not get the repos..'))
            }, 2000);
    });
    
}
//Callbacks
//Promises
//Async/await
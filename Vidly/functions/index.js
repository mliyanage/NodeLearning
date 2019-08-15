//@ts-check
const functions = require('firebase-functions');
const express = require('express');

const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const vidlyDebugger = require('debug')('app:vidly');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');
//admin.initializeApp(functions.config().firebase); 


const app = express();
//const main = express();

//loaf pug template engine
app.set('view engine', 'pug');
app.set('views', './views');

//Configuration
vidlyDebugger('Application Name :' + config.get('name'));
//DB related code
dbDebugger('Connecting to the database');
console.log('Mail server :' + config.get('mail.host'));
console.log('Mail password :' + app.get('%app_password%')); //can use property from custom-environment-variables.json

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);
// main.use('/v1', app);
// main.use(bodyParser.json());
// main.use(bodyParser.urlencoded({ extended: false}));

//export const webApi = functions.https.onRequest(main);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port :  ${port}`))

app.use(express.json()); //built-in middleware sets the req.body property
app.use(express.urlencoded({ extended: true })); //key=value&key=value populate to req.body

//courses router
app.use('/courses', courses);
app.use('/', home);
//Logging middleware
app.use(logger);

app.use(helmet());
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled..')
}
//Authenticate middleware
app.use(function (req, res, next) {
    console.log('Athenticating...');
    next();
});


app.get('/posts/:year/:month', (req, res) => {
    res.send(req.params)
})


exports.api = functions.https.onRequest(app);
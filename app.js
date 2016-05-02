'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let routesApi = require('./routes/api.js');
let app = express();
/* eslint-disable */
let args = process.argv;
/* eslint-enable */
let passedPort = args[2];
let environment = args[3];

if (environment !== 'prod' && environment !== 'dev' && environment !== 'homolog') {
    throw new Error('Environment is not defined. Follow sintax: \n > node index.js |port| [dev|homolog|prod]');
}

if (isNaN(passedPort)) {
    throw new Error('Port is not a number. \n Follow sintax: \n > node index.js |port| |log-options|');
}

app.port = passedPort || 3000;
app.use(environment === 'prod' ? morgan('common') : morgan('dev'));

global.environment = environment;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    /* eslint-disable */
    'OPTIONS' === req.method ? res.status(204).send() : next();
    /* eslint-enable */
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routesApi);
/* eslint-disable */
app.use((req, res, next) => {
    var err = new Error();
    err.status = 404;
    next(err);
});
/* eslint-enable */
app.use((err, req, res) => {
    res.status(err.status || 500).send(err.stack);
});

module.exports = app;

'use strict';

let http = require('http');
let app = require('./app.js');

let server = http.createServer(app);

server.listen(app.port);
/* eslint-disable */
server.on('error', error => console.error('Server error', error.stack));

process.on('uncaughtException', error => console.error('Exception', error.stack));

console.log(`Server run on port ${app.port}
Started at - ${new Date(Date.now())} `);
/* eslint-enable */

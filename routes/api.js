'use strict';

let router = require('express').Router();

let Client = require('../controller/client/');
let Dress = require('../controller/dress/');

router.post('/client/',  Client.post);
router.get('/client/:email',  Client.get);
router.patch('/client/:id',  Client.get);
router.delete('/client/:id',  Client.get);

module.exports = router;

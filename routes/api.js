'use strict';

let router = require('express').Router();

let Client = require('../controller/client/');
let Dress = require('../controller/dress/');

router.post('/client/',  Client.create);
router.get('/client/:email',  Client.find);
router.patch('/client/:id',  Client.update);
router.delete('/client/:id',  Client.del);

module.exports = router;

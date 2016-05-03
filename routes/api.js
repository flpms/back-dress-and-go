'use strict';

let router = require('express').Router();

let Client = require('../controller/client/');
let Dress = require('../controller/dress/');

router.post('/client/',  Client.create);
router.get('/client/:email',  Client.find);
router.patch('/client/:email',  Client.update);
router.delete('/client/:email',  Client.del);

router.post('/dress/',  Dress.create);
router.get('/dress/:id',  Dress.find);
router.patch('/dress/:id',  Dress.update);
router.delete('/dress/:id',  Dress.del);

module.exports = router;

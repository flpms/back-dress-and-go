'use strict';

let router = require('express').Router();

let Client = require('../controller/client/');
let Dress = require('../controller/dress/');
let Rent = require('../controller/rent/');

router.get('/clients', Client.find);
router.get('/dresses', Dress.find);
router.get('/rents', Rent.find);

router.post('/client/',  Client.create);
router.get('/client/:email',  Client.find);
router.patch('/client/:email',  Client.update);
router.delete('/client/:email',  Client.del);

router.post('/dress/',  Dress.create);
router.get('/dress/:id',  Dress.find);
router.patch('/dress/:id',  Dress.update);
router.delete('/dress/:id',  Dress.del);

router.post('/rent/',  Rent.create);
router.get('/rent/:id',  Rent.find);
router.patch('/rent/:id',  Rent.update);
router.delete('/rent/:id',  Rent.del);

module.exports = router;

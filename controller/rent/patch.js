'use strict';

const moment = require('moment');
const Rent = require('../../model/rent');

const update = function(req, res) {

    let fail = err => {
        if (err.statusCode) {
            res.status(err.statusCode).send({message: err.message});
        } else {
            res.status(503).send({});
        }
    };

    if (!req.body || !Object.keys(req.body).length) {
        return fail({ statusCode: 400, message: 'Rent object not informed' });
    }

    let rent = req.body;
    let id = req.params.id;

    if (rent.clientId) {
        return fail({ statusCode: 400, message: '{ "clientId": number } is required field' });
    }

    if (rent.dressId && typeof rent.dressId !== 'number') {
        return fail({ statusCode: 400, message: '{ "dressId": number } is required field' });
    }

    if (rent.bookingDate || rent.devolutionDate) {

        if (rent.bookingDate && !rent.devolutionDate) {
            return fail({statusCode: 400, message: 'for update bookingDate need a devolutionDate'});
        }

        if (rent.devolutionDate && !rent.bookingDate) {
            return fail({statusCode: 400, message: 'for update devolutionDate need a bookingDate'});
        }

        let bookingDate = moment(rent.bookingDate);
        let devolutionDate = moment(rent.devolutionDate);
        let actualDate = moment();

        if (typeof rent.bookingDate !== 'string' && bookingDate.toString().toLowerCase() === 'invalid date') {
            return fail({ statusCode: 400, message: '{ "bookingDate": "string" } is required field' });
        }

        if (typeof rent.devolutionDate !== 'string' && devolutionDate.toString().toLowerCase() === 'invalid date') {
            return fail({ statusCode: 400, message: '{ "devolutionDate": "string" } is required field' });
        }

        if (bookingDate.isBefore(actualDate)) {
            return fail({ statusCode: 400, message: 'Invalid rent date.'});
        }

        if (devolutionDate.isBefore(bookingDate)) {
            return fail({ statusCode: 400, message: 'Invalid devolution date.' });
        }
    }

    Rent.update(id, rent).then(result => {
        res.status(200).send({status: 'ok', message: 'updated with sucess', changedRows: result.changedRows });
    }).catch(err => fail(err));
};

module.exports = update;

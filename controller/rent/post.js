'use strict';

const moment = require('moment');
const Rent = require('../../model/rent');

const create = function(req, res) {

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

    if (!rent.clientId || typeof rent.clientId !== 'number') {
        return fail({ statusCode: 400, message: '{ "clientId": number } is required field' });
    }

    if (!rent.dressId || typeof rent.dressId !== 'number') {
        return fail({ statusCode: 400, message: '{ "dressId": number } is required field' });
    }

    if (!rent.bookingDate || typeof rent.bookingDate !== 'string' ||
            moment(rent.bookingDate, 'YYYY-MM-DD').toString().toLowerCase() === 'invalid date') {

        return fail({ statusCode: 400, message: '{ "bookingDate": "string" } is required field' });
    }

    if (!rent.devolutionDate || typeof rent.devolutionDate !== 'string' ||
        moment(rent.devolutionDate, 'YYYY-MM-DD').toString().toLowerCase() === 'invalid date') {

        return fail({ statusCode: 400, message: '{ "devolutionDate": "string" } is required field' });
    }

    if (moment(rent.devolutionDate).isBefore(rent.bookingDate)) {
        return fail({ statusCode: 400, message: 'Invalid devolution date.' });
    }

    rent.orderDate = moment().format();

    if (moment(rent.bookingDate).isBefore(rent.orderDate)) {
        return fail({ statusCode: 400, message: 'Invalid rent date.'});
    }


    Rent.create(rent).then(() => {
        res.status(200).send({status: 'ok', message: 'inserted with sucess', orderDate: rent.orderDate });
    }).catch(err => fail(err));
};

module.exports = create;

'use strict';

const Dress = require('../../model/dress');

const update = function(req, res) {

    let fail = err => {
        if (err.statusCode) {
            res.status(err.statusCode).send({message: err.message});
        } else {
            res.status(503).send({});
        }
    };

    if (!req.body || !Object.keys(req.body).length) {
        return fail({ statusCode: 400, message: 'Dress info not informed' });
    }

    let dress = req.body;
    let id = req.params.id;

    if (!id || isNaN(id)) {
        return fail({ statusCode: 400, message: '{"id": number} is required field' });
    }

    if (dress.model && typeof dress.model !== 'string') {
        return fail({ statusCode: 400, message: '{"model": "string"} is required field' });
    }

    if (dress.stylist && typeof dress.stylist !== 'string') {
        return fail({ statusCode: 400, message: '{"stylist": "string"} is required field' });
    }

    if (dress.color && typeof dress.color !== 'string') {
        return fail({ statusCode: 400, message: '{"color": "string"} is required field' });
    }

    if (dress.height && typeof dress.height !== 'number') {
        return fail({ statusCode: 400, message: '{"height": number} is required field' });
    }

    if (dress.size && typeof dress.size !== 'number') {
        return fail({ statusCode: 400, message: '{"size": number} is required field' });
    }

    Dress.update(id, dress).then(result => {
        res.status(200).send({status: 'ok', message: 'updated with sucess', changedRows: result.changedRows });
    }).catch(err => fail(err));
};

module.exports = update;

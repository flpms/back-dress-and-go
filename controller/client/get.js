'use strict';

const Client = require('../../model/client');

const create = function(req, res) {

    let fail = err => {
        if (err.statusCode) {
            res.status(err.statusCode).send({message: err.message});
        } else {
            res.status(503).send({});
        }
    };

    if (!req.params || !Object.keys(req.params).length) {
        return fail({ statusCode: 400, message: 'Client e-mail not informed' });
    }

    let client = req.params.email;

    if (!client.email || typeof client.email !== 'string') {
        return fail({ statusCode: 400, message: '{"email": "string"} is required field' });
    }

    Client.create(client).then(result => {
        res.status(200).send({status: 'ok', message: 'inserted with sucess', client: client});
    }).catch(err => fail(err));
};

module.exports = create;

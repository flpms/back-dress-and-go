'use strict';

const Client = require('../../model/client');

const find = function(req, res) {

    let fail = err => {
        if (err.statusCode) {
            res.status(err.statusCode).send({message: err.message});
        } else {
            res.status(503).send({});
        }
    };

    if (!req.params || !Object.keys(req.params).length) {
        return Client.find('findall').then(result => {

            let filterResults = result.filter(client => {
                if (client.clientDeleted !== 1) {
                    delete client.clientDeleted;
                    return client;
                }
            });

            res.status(200).send({status: 'ok', clients: filterResults });
        }).catch(fail);
    }

    let client = req.params.email;

    if (!client || typeof client !== 'string') {
        return fail({ statusCode: 400, message: '{"email": "string"} is required field' });
    }

    Client.find(client).then(result => {

        if (!result[0]) {
            res.status(404).send({ statusCode: 404, message: 'message client don\'t exists.'});
        }

        if (result[0].clientDeleted) {
            res.status(404).send({ statusCode: 404, message: 'message client don\'t exists.'});
        } else {
            delete result[0].clientDeleted;
        }

        res.status(200).send({ status: 'ok', client: result[0]});
    }).catch(fail);
};

module.exports = find;

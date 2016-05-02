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

    if (!req.body || !Object.keys(req.body).length) {
        return fail({ statusCode: 400, message: 'Client Object not informed' });
    }

    let client = req.body;

    if (!client.name || typeof client.name !== 'string') {
        return fail({ statusCode: 400, message: '{"name": "string"} is required field' });
    }

    if (!client.email || typeof client.email !== 'string') {
        return fail({ statusCode: 400, message: '{"email": "string"} is required field' });
    }

    if (!client.password || typeof client.password !== 'string') {
        return fail({ statusCode: 400, message: '{"password": "string"} is required field' });
    }

    if (!client.address || typeof client.address !== 'string') {
        return fail({ statusCode: 400, message: '{"address": "string"} is required field' });
    }

    if (!client.number || typeof client.number !== 'number') {
        return fail({ statusCode: 400, message: '{"number": number} is required field' });
    }

    if (!client.city || typeof client.city !== 'string') {
        return fail({ statusCode: 400, message: '{"city": "string"} is required field' });
    }

    if (!client.state || typeof client.state !== 'string') {
        return fail({ statusCode: 400, message: '{"state": "string"} is required field' });
    }

    if (!client.postalCode || typeof client.postalCode !== 'string') {
        return fail({ statusCode: 400, message: '{"postalCode": "string"} is required field' });
    }

    if (!client.cellPhone || typeof client.cellPhone !== 'number') {
        return fail({ statusCode: 400, message: '{"cellPhone": number} is required field' });
    }

    if (!client.height || typeof client.height !== 'number') {
        return fail({ statusCode: 400, message: '{"height": number} is required field' });
    }

    if (!client.bust || typeof client.bust !== 'number') {
        return fail({ statusCode: 400, message: '{"bust": number} is required field' });
    }

    if (!client.hip || typeof client.hip !== 'number') {
        return fail({ statusCode: 400, message: '{"hip": number} is required field' });
    }

    if (!client.waist || typeof client.waist !== 'number') {
        return fail({ statusCode: 400, message: '{"waist": number} is required field' });
    }

    if (!client.heelSize || typeof client.heelSize !== 'number') {
        return fail({statusCode: 400, message: '{"heelSize": number} is required field' });
    }

    if (!client.size || typeof client.size !== 'number') {
        return fail({statusCode: 400, message: '{"size": number} is required field' });
    }

    Client.create(client).then(() => {
        res.status(200).send({status: 'ok', message: 'inserted with sucess', client: client});
    }).catch(err => fail(err));
};

module.exports = create;

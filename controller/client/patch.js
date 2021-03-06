'use strict';

const Client = require('../../model/client');

const update = function(req, res) {

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
    let email = req.params.email;

    if (client.name && typeof client.name !== 'string') {
        return fail({ statusCode: 400, message: '{"name": "string"} should be a string' });
    }

    if (client.email && typeof client.email !== 'string') {
        return fail({ statusCode: 400, message: '{"email": "string"} should be a string' });
    }

    if (client.password && typeof client.password !== 'string') {
        return fail({ statusCode: 400, message: '{"password": "string"} should be a string' });
    }

    if (client.address) {
        return fail({ statusCode: 400, message: 'Can\'t update address' });
    }

    if (client.addressNumber && typeof client.addressNumber !== 'number') {
        return fail({ statusCode: 400, message: '{"addressNumber": number} should be a number' });
    }

    if (client.city) {
        return fail({ statusCode: 400, message: 'Can\'t update address' });
    }

    if (client.state) {
        return fail({ statusCode: 400, message: 'Can\'t update address ' });
    }

    if (client.postalCode) {
        return fail({ statusCode: 400, message: 'Can\'t update address' });
    }

    if (client.cellPhone && typeof client.cellPhone !== 'number') {
        return fail({ statusCode: 400, message: '{"cellPhone": number} should be a number' });
    }

    if (client.height && typeof client.height !== 'number') {
        return fail({ statusCode: 400, message: '{"height": number} should be a number' });
    }

    if (client.bust && typeof client.bust !== 'number') {
        return fail({ statusCode: 400, message: '{"bust": number} should be a number' });
    }

    if (client.hip && typeof client.hip !== 'number') {
        return fail({ statusCode: 400, message: '{"hip": number} should be a number' });
    }

    if (client.waist && typeof client.waist !== 'number') {
        return fail({ statusCode: 400, message: '{"waist": number} should be a number' });
    }

    if (client.heelSize && typeof client.heelSize !== 'number') {
        return fail({ statusCode: 400, message: '{"heelSize": number} should be a number' });
    }

    if (client.size && typeof client.size !== 'number') {
        return fail({ statusCode: 400, message: '{"size": number} should be a number' });
    }

    Client.update(email, client).then(result => {
        res.status(200).send({status: 'ok', message: 'updated with sucess', changedRows: result.changedRows });
    }).catch(err => fail(err));
};

module.exports = update;

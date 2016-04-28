'use strict';

const Client = require('../../model/client');

let create = function(req, res) {

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

    if (!client.name) {
        return fail({statusCode: 400, message: '{"name": "string"} is required field' });
    }

    if (!client.email) {
        return fail({ statusCode: 400, message: '{"email": "string"} is required field' });
    }

    if (!client.password) {
        return fail({statusCode: 400, message: '{"password": "string"} is required field' });
    }

    if (!client.address) {
        return fail({statusCode: 400, message: '{"address": "string"} is required field' });
    }

    if (!client.number) {
        return fail({statusCode: 400, message: '{"number": number} is required field' });
    }

    if (!client.city) {
        return fail({statusCode: 400, message: '{"city": "string"} is required field' });
    }

    if (!client.state) {
        return fail({statusCode: 400, message: '{"state": "string"} is required field' });
    }

    if (!client.postalCode) {
        return fail({statusCode: 400, message: '{"postalCode": "string"} code is required field' });
    }

    if (!client.cellPhone) {
        return fail({statusCode: 400, message: '{"cellPhone": number} is required field' });
    }

    if (!client.height) {
        return fail({statusCode: 400, message: '{"height": number} is required field' });
    }

    if (!client.bust) {
        return fail({statusCode: 400, message: '{"bust": number} is required field' });
    }

    if (!client.hip) {
        return fail({statusCode: 400, message: '{"hip": number} is required field' });
    }

    if (!client.waist) {
        return fail({statusCode: 400, message: '{"waist": number} is required field' });
    }

    if (!client.heelSize) {
        return fail({statusCode: 400, message: '{"heelSize": number} is required field' });
    }

    if (!client.size) {
        return fail({statusCode: 400, message: '{"size": number} is required field' });
    }

    return Client.create(req.body).then(result => {
        console.log('- - - - -', result);
        // let obj = result.ops.map(op => {
        //
        //     op.id = op['_id'];
        //     delete op['_id'];
        //
        //     return op;
        // });

        res.status(200).send(obj[0]);

    }).catch(err => fail(err));
};
module.exports = create;

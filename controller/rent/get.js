'use strict';

const Rent = require('../../model/rent');

const find = function(req, res) {

    let fail = err => {
        if (err.statusCode) {
            res.status(err.statusCode).send({ message: err.message });
        } else {
            res.status(503).send({});
        }
    };

    if (!req.params || !Object.keys(req.params).length) {
        return fail({ statusCode: 400, message: 'Id rent not informed' });
    }

    let rent = Number(req.params.id);

    if (!rent || isNaN(rent)) {
        return fail({ statusCode: 400, message: '{"id": number} is required field' });
    }

    Rent.find(rent).then(result => {

        if (!result[0]) {
            return res.status(404).send({ statusCode: 404, message: 'message rent don\'t exists.'});
        }

        if (result[0].rentDeleted) {
            return res.status(404).send({ statusCode: 404, message: 'message rent don\'t exists.'});
        }

        res.status(200).send({ status: 'ok', client: result[0]});
    }).catch(fail);
};

module.exports = find;

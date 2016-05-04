'use strict';

const Rent = require('../../model/rent');

const del = function(req, res) {

    let fail = err => {
        if (err.statusCode) {
            res.status(err.statusCode).send({message: err.message});
        } else {
            res.status(503).send({message: err});
        }
    };

    if (!req.params || !Object.keys(req.params).length) {
        return fail({ statusCode: 400, message: 'Rent id not informed' });
    }

    let rentId = req.params.id;

    if (isNaN(rentId)) {
        return fail({ statusCode: 400, message: '{"id": number } is required field' });
    }

    Rent.del(rentId).then(result => {

        if (result.changedRows === 1) {
            res.status(200).send({ status: 'ok', message: `Rent deleted with sucess.`});
        }
    }).catch(fail);
};

module.exports = del;

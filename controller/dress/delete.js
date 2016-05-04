'use strict';

const Dress = require('../../model/dress');

const del = function(req, res) {

    let fail = err => {
        if (err.statusCode) {
            res.status(err.statusCode).send({message: err.message});
        } else {
            res.status(503).send({message: err});
        }
    };

    if (!req.params || !Object.keys(req.params).length) {
        return fail({ statusCode: 400, message: 'Dress id not informed' });
    }

    let dressId = req.params.id;

    if (isNaN(dressId)) {
        return fail({ statusCode: 400, message: '{"id": number } is required field' });
    }

    Dress.del(dressId).then(result => {

        if (result.changedRows === 1) {
            res.status(200).send({ status: 'ok', message: `Dress deleted with sucess.`});
        }
    }).catch(fail);
};

module.exports = del;

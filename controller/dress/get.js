'use strict';

const Dress = require('../../model/dress');

const find = function(req, res) {

    let fail = err => {
        if (err.statusCode) {
            res.status(err.statusCode).send({message: err.message});
        } else {
            res.status(503).send({});
        }
    };

    if (req.params && !Object.keys(req.params).length) {
        return Dress.find('findall').then(result => {

            if (!result) {
                res.status(404).send({ statusCode: 404, message: 'message dress don\'t exists.'});
            }

            let filterResult = result.filter((item) => {
                if (item.dressDeleted !== 1) {
                    delete item.dressDeleted;
                    return item;
                }
            });

            res.status(200).send({ status: 'ok', dress: filterResult});
        }).catch(fail);
    }

    let dress = Number(req.params.id);

    if (!dress || isNaN(dress)) {
        return fail({ statusCode: 400, message: '{"id": number} is required field' });
    }

    Dress.find(dress).then(result => {

        if (!result[0]) {
            res.status(404).send({ statusCode: 404, message: 'message dress don\'t exists.'});
        }

        if (result[0].dressDeleted) {
            res.status(404).send({ statusCode: 404, message: 'message dress don\'t exists.'});
        } else {
            delete result[0].dressDeleted;
        }

        res.status(200).send({ status: 'ok', dress: result[0]});
    }).catch(fail);
};

module.exports = find;

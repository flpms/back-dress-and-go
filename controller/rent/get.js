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

    if (req.params && !req.params.id) {
        return Rent.find('findall').then(result => {

            if (!result) {
                return res.status(404).send({ statusCode: 404, message: 'message rent don\'t exists.'});
            }

            let filterResult = result.filter((item) => {
                if (item.rentDeleted !== 1) {
                    delete item.rentDeleted;
                    return item;
                }
            });

            res.status(200).send({ status: 'ok', rent: filterResult});
        }).catch(fail);
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

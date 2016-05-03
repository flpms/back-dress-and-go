'use strict';

const Client = require('../../model/client');

const del = function(req, res) {

    let fail = err => {
        if (err.statusCode) {
            res.status(err.statusCode).send({message: err.message});
        } else {
            res.status(503).send({message: err});
        }
    };

    if (!req.params || !Object.keys(req.params).length) {
        return fail({ statusCode: 400, message: 'Client e-mail not informed' });
    }

    let client = req.params.email;

    if (!client || typeof client !== 'string') {
        return fail({ statusCode: 400, message: '{"email": "string"} is required field' });
    }

    Client.del(client).then(result => { console.log(' - - ', result);
        if (result.changedRows === 1) {
            res.status(200).send({ status: 'ok', message: `${client} deleted with sucess.`});
        }
    }).catch(fail);
};

module.exports = del;

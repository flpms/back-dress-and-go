'use strict';

const mysql = require('mysql');

let create = function(client) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {
        if (!Object.keys(client).length) {
            return reject({statusCode: 400, message: 'Need be Object to create a client'});
        }

        if (!isNaN(client.postalCode) || client.postalCode.length < 8) {
            return reject({
                statusCode: 400,
                message: 'A string is required to postalCode, the string format need be similar to this 00000-000'
            });
        }

        if (!client.email) {
            return reject({
                statusCode: 400,
                message: 'without a email user can\'t be created'
            });
        }

        let validatedClient = {
            name: client.name,
            email: client.email,
            password: client.password,
            postalCode: client.postalCode.replace(/\-/gi, ''),
            addressNumber: client.addressNumber,
            cellPhone: client.cellPhone,
            height: client.height,
            hip: client.hip,
            waist: client.waist,
            heelSize: client.heelSize,
            size: client.size
        };

        let validatedAddress = {
            postalCode: client.postalCode.replace(/\-/gi, ''),
            street: client.street,
            city: client.city,
            state: client.state
        };

        connection.query('INSERT INTO addresses SET ? ', validatedAddress, (err, result) => {
            if (err) {
                return reject({statusCode: 503, message: err.code});
            }

            connection.query('INSERT INTO client SET ?', validatedClient, (clientErr, clientResult) => {
                if (clientErr) { console.log('- - - 57', clientErr);
                    return reject(clientErr);
                }

                return resolve({address: result, client: clientResult});
            });
        });
    });

    return promise;
};

module.exports = create;

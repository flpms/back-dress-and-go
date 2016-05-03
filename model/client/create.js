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

        let postalCode = client.postalCode.replace(/\-/gi, '');
        let selectPostalCode = 'SELECT * FROM `addresses` WHERE `postalCode`=?;';
        let selectSQL = mysql.format(selectPostalCode, postalCode);

        connection.query(selectSQL, (err, resultPostalCode) => {
            if (err) {
                return reject({
                    statusCode: 400,
                    message: 'error in search postalCode'
                });
            }

            let callbackInsert = (clientErr, clientResult) => {
                if (clientErr) {
                    return reject(clientErr);
                }

                connection.end();

                return resolve({ client: clientResult });
            };

            let clientQuery = 'INSERT INTO client(`name`,`email`, `password`,' +
            ' `postalCode`, `addressNumber`, `cellPhone`, `height`, `hip`, `waist`,' +
            ' `heelSize`, `size`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

            let clientValues = [client.name, client.email, client.password, postalCode,
                client.number, client.cellPhone, client.height, client.hip,
                client.waist, client.heelSize, client.size];

            let clientSQL = mysql.format(clientQuery, clientValues);

            if (resultPostalCode.length) {
                return connection.query(`${clientSQL}`, callbackInsert);
            }

            let addressQuery = 'INSERT INTO addresses(`postalCode`, `street`, `city`, `state`) VALUES(?, ?, ?, ?);';
            let addressValues = [postalCode, client.address, client.city, client.state];
            let addressSQL = mysql.format(addressQuery, addressValues);

            connection.query(`${addressSQL}`, addressErr => {
                if (addressErr) {
                    return reject({statusCode: 503, message: err.code});
                }

                connection.query(`${clientSQL}`, callbackInsert);
            });
        });
    });

    return promise;
};

module.exports = create;

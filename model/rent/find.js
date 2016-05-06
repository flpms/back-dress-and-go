'use strict';

const mysql = require('mysql');

let find = function(rentId) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {

        if (!rentId) {
            return reject({ statusCode: 400, message: 'Need id to search' });
        }

        let sql = '';
        let searchSQL = '';

        if (rentId === 'findall') {
            searchSQL = 'SELECT * FROM rents INNER JOIN `dress` ON rents.dressId=dress.id ' +
            'INNER JOIN `client` ON rents.clientId=client.id INNER JOIN `addresses` ON client.postalCode=addresses.postalCode LIMIT 100;'
        } else {
            sql = 'SELECT * FROM rents INNER JOIN `dress` ON rents.dressId=dress.id ' +
            'INNER JOIN `client` ON rents.clientId=client.id INNER JOIN `addresses` ON client.postalCode=addresses.postalCode ' +
            'WHERE rents.id=?;';
            searchSQL = mysql.format(sql, rentId);
        }

        connection.query(searchSQL, (err, result) => {
            if (err) {
                return reject(err);
            }

            connection.end();

            return resolve(result);
        });
    });

    return promise;
};

module.exports = find;

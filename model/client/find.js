'use strict';

const mysql = require('mysql');

let find = function(clientEmail) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {

        if (typeof clientEmail !== 'string') {
            return reject({ statusCode: 400, message: 'Need be string to find a client' });
        }

        let sql = 'SELECT * FROM `client` INNER JOIN `addresses` ON client.postalCode=addresses.postalCode WHERE `email`=?;';
        let searchSQL = mysql.format(sql, clientEmail);

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

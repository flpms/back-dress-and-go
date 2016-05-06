'use strict';

const mysql = require('mysql');

let find = function(dress) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {

        let sql = '';
        let searchSQL = '';

        if (!dress) {
            return reject({ statusCode: 400, message: 'Need id to search' });
        }

        if (dress === 'findall') {
            searchSQL = 'SELECT * FROM `dress` LIMIT 100';
        } else {
            sql = 'SELECT * FROM `dress` WHERE id=?;';
            searchSQL = mysql.format(sql, dress);
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

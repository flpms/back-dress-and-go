'use strict';

const mysql = require('mysql');

let del = function(rentId) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {

        if (!rentId) {
            return reject({ statusCode: 400, message: 'Need have id to delete' });
        }

        let sql = 'UPDATE rents SET `deleted`=1 WHERE `id`=?;';

        connection.query(sql, rentId, (err, rows) => {
            if (err) {
                return reject(err);
            }

            connection.end();

            return resolve(rows);
        });
    });

    return promise;
};

module.exports = del;

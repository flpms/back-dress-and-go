'use strict';

const mysql = require('mysql');

let del = function(dressId) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {

        if (!dressId) {
            return reject({ statusCode: 400, message: 'Need have id to delete' });
        }

        let sql = 'UPDATE dress SET `dressDeleted`=1 WHERE `id`=?;';

        connection.query(sql, dressId, (err, rows) => {
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

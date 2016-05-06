'use strict';

const mysql = require('mysql');

let del = function(id, clientEmail) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {

        if (typeof clientEmail !== 'string') {
            return reject({ statusCode: 400, message: 'Need be email to delete a client' });
        }

        let sql = 'UPDATE client SET `clientDeleted`=1 WHERE `email`=? AND id=?;';
        let query = mysql.format(sql, [clientEmail, id]);

        connection.query(query, (err, rows) => {
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

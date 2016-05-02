'use strict';

const mysql = require('mysql');

let update = function(email, client) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {

        if (!email) {
            return reject({ statusCode: 400, message: 'Need email to update a client' });
        }

        if (!Object.keys(client).length) {
            return reject({ statusCode: 400, message: 'Need a object to update a client' });
        }

        if (client.postalCode) {
            return reject({ statusCode: 400, message: 'Postalcode can be update in this way' });
        }

        let fields = '';

        for (let key in client) {
            fields += fields === '' ? ', ' : '';
            fields += `${key}='${client[key]}'`;
        }

        let sql = `UPDATE client SET ${fields} WHERE \`email\`=?;`;
        let searchSQL = mysql.format(sql, email);

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

module.exports = update;

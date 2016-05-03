'use strict';

const mysql = require('mysql');

let update = function(id, dressInfo) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {

        if (!id) {
            return reject({ statusCode: 400, message: 'Need a id to update a dress' });
        }

        if (!Object.keys(dressInfo).length) {
            return reject({ statusCode: 400, message: 'Need info to update a dress' });
        }

        if (dressInfo.id) {
            return reject({ statusCode: 400, message: 'Can\'t update id dress' });
        }

        let fields = '';

        for (let key in dressInfo) {
            fields += fields === '' ? '' : ', ';
            fields += `${key}='${dressInfo[key]}'`;
        }

        let sql = `UPDATE dress SET ${fields} WHERE \`id\`=?;`;
        let updateSQL = mysql.format(sql, id);

        connection.query(updateSQL, (err, result) => {
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

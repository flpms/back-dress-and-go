'use strict';

const mysql = require('mysql');

let update = function(id, rentInfo) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {

        if (!id) {
            return reject({ statusCode: 400, message: 'Need a id to update a rent' });
        }

        if (!Object.keys(rentInfo).length) {
            return reject({ statusCode: 400, message: 'Need info to update a rent' });
        }

        if (rentInfo.id) {
            return reject({ statusCode: 400, message: 'Can\'t update id rent' });
        }

        let fields = '';

        for (let key in rentInfo) {
            fields += fields === '' ? '' : ', ';
            fields += `${key}='${rentInfo[key]}'`;
        }

        let sql = `UPDATE rents SET ${fields} WHERE \`id\`=?;`;
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

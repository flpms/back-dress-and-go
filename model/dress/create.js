'use strict';

const mysql = require('mysql');

let create = function(dress) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {
        if (!Object.keys(dress).length) {
            return reject({statusCode: 400, message: 'Need be Object to create a dress'});
        }

        let dressQuery = 'INSERT INTO dress(`model`, `stylist`, `color`, `height`, `size`) VALUES(?, ?, ?, ?, ?);';
        let dressValues = [dress.model, dress.stylist, dress.color, dress.height, dress.size];
        let dressSQL = mysql.format(dressQuery, dressValues);

        connection.query(`${dressSQL}`, (dressErr, dressResult) => {
            if (dressErr) {
                return reject({statusCode: 503, message: dressErr.code});
            }


            return resolve(dressResult);
        });
    });

    return promise;
};

module.exports = create;

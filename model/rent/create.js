'use strict';

const mysql = require('mysql');

let create = function(rentInfo) {

    let connection = mysql.createConnection(this.config);

    connection.connect();

    let promise = new Promise((resolve, reject) => {
        if (!Object.keys(rentInfo).length) {
            return reject({statusCode: 400, message: 'Need be Object to create a rent'});
        }

        let rentQuery = 'INSERT INTO rents(`clientId`, `dressId`, `orderDate`, `bookingDate`, `devolutionDate`, `obs`) VALUES(?, ?, ?, ?, ?, ?);';
        let rentValues = [rentInfo.clientId, rentInfo.dressId, rentInfo.orderDate, rentInfo.bookingDate, rentInfo.devolutionDate, rentInfo.obs];
        let rentSQL = mysql.format(rentQuery, rentValues);

        connection.query(`${rentSQL}`, (rentErr, rentResult) => {
            if (rentErr) {
                return reject({statusCode: 503, message: rentErr.code});
            }

            return resolve(rentResult);
        });
    });

    return promise;
};

module.exports = create;

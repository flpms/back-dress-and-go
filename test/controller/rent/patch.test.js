'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const moment = require('moment');

const Rent = require('../../../controller/rent/');
const expect = chai.expect;

describe('Controller patch dress test', function() {

    let connection;

    before(function() {
        global.environment = 'test';

        connection = mysql.createConnection({
            "host": "localhost",
            "user": "root",
            "password": "2016@admin",
            "multipleStatements": true,
            "database": "test_dress_and_go"
        });

        connection.connect();

        connection.query('SET FOREIGN_KEY_CHECKS=0;' +
        'TRUNCATE TABLE rents;' +
        'INSERT INTO rents(`id`, `clientId`, `dressId`, `orderDate`, `bookingDate`, `devolutionDate`, `obs`) VALUES(1, 1, 1, \'2016-05-04T11:40:56-03:00\', \'2016-05-08T11:40:56-03:00\', \'2016-05-12T11:40:56-03:00\', \'Vestido alugado para festa de casamento\');' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected sucess cause client is a function', function() {
        expect(Rent.update).to.be.a('function');
    });

    it('Expected a failure when change rent, cause post "empty" body', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('Rent object not informed');

                done();
            }
        };

        Rent.update({body: {}}, res);
    });

    it('Expected sucess when update dressId name', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(result) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(200);

                expect(result).to.be.a('object');
                expect(result).to.have.property('message');
                expect(result).to.have.property('changedRows');
                expect(result.message).to.equal('updated with sucess');

                done();
            }
        };

        Rent.update({
            params: {
                id:1
            },
            body: {
                dressId: 2
            }
        }, res);
    });

    it('Expected sucess when update booking date', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(result) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(200);

                expect(result).to.be.a('object');
                expect(result).to.have.property('message');
                expect(result).to.have.property('changedRows');
                expect(result.message).to.equal('updated with sucess');
                expect(result.changedRows).to.equal(1);

                done();
            }
        };

        Rent.update({
            params: {
                id: 1
            },
            body: {
                bookingDate: moment().add(8, 'd').toISOString(),
                devolutionDate: moment().add(16, 'd').toISOString()
            }
        }, res);
    });
});

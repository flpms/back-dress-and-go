'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Rent = require('../../../controller/rent/');
const expect = chai.expect;

describe('Controller get rent test', function() {

    let connection;

    before(function() {
        global.environment = 'test';

        let connection = mysql.createConnection({
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
        'INSERT INTO rents(`id`, `clientId`, `dressId`, `orderDate`, `bookingDate`, `devolutionDate`, `obs`, `rentDeleted`) VALUES(2, 1, 1, \'2016-05-04T11:43:56-03:00\', \'2016-05-08T11:43:56-03:00\', \'2016-05-12T11:43:56-03:00\', \'\', 1);' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected sucess cause rent find is a function', function() {
        expect(Rent.find).to.be.a('function');
    });

    it('Expected a failure when find a rent, cause empty params', function(done) {
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
                expect(err.message).to.equal('Id rent not informed');

                done();
            }
        };

        Rent.find({params: ''}, res);
    });

    it('Expected a failure when find a rent, cause empty id', function(done) {
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
                expect(err.message).to.equal('{"id": number} is required field');

                done();
            }
        };

        Rent.find({ params: { id: '' }}, res);
    });

    it('Expected a failure when find a rent, cause empty id is a wrong type', function(done) {
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
                expect(err.message).to.equal('{"id": number} is required field');

                done();
            }
        };

        Rent.find({params: {id: 'aluguel'}}, res);
    });

    it('Expected a failure when find a rent, cause rent don\'t exists', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(err) {

                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(404);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('message rent don\'t exists.');

                done();
            }
        };

        Rent.find({ params: { id: 10 } }, res);
    });

    it('Expected a failure when find a rent cause rent was deleted', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(404);
                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('message dress don\'t exists.');

                done();
            }
        };

        Rent.find({ params: { id: 2 } }, res);
    });

    it('Expected sucess when find rent', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(result) {

                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(200);

                expect(result).to.be.a('object');
                expect(result).to.have.property('status');
                expect(result.status).to.equal('ok');

                done();
            }
        };

        Rent.find({ params: { id: 1} }, res);
    });
});

'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Dress = require('../../../controller/dress/');
const expect = chai.expect;

describe('Controller client test', function() {

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

        connection.query('SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE dress;' +
        'INSERT INTO dress(\`id\` ,\`model\`, \`stylist\`, \`color\`, \`height\`, \`size\`) VALUES(1, \'Sereia\', \'Marcelo Quadros\', \'verde\', 142, 34);' +
        'INSERT INTO dress(\`id\` ,\`model\`, \`stylist\`, \`color\`, \`height\`, \`size\`, \`deleted\`) VALUES(3, \'Sereia\', \'Marcelo Quadros\', \'rosa\', 142, 34, 1);' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected sucess cause client find is a function', function() {
        expect(Dress.find).to.be.a('function');
    });

    it('Expected a failure when find a dress, cause empty params', function(done) {
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
                expect(err.message).to.equal('Id dress not informed');

                done();
            }
        };

        Dress.find({params: ''}, res);
    });

    it('Expected a failure when find a dress, cause empty id', function(done) {
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

        Dress.find({ params: { id: '' }}, res);
    });

    it('Expected a failure when find a dress, cause empty id is a wrong type', function(done) {
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

        Dress.find({params: {id: 'sereia'}}, res);
    });

    it('Expected a failure when find a dress, cause dress don\'t exists', function(done) {
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

        Dress.find({ params: { id: 10 } }, res);
    });

    it('Expected a failure when find a dress causa dress was deleted', function(done) {
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

        Dress.find({ params: { id: 3 } }, res);
    });

    it('Expected sucess when find client', function(done) {
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

        Dress.find({ params: { id: 1} }, res);
    });
});

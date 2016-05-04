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

        connection.query('SET FOREIGN_KEY_CHECKS=0;' +
        'INSERT INTO dress(\`id\` ,\`model\`, \`stylist\`, \`color\`, \`height\`, \`size\`) VALUES(1, \'Sereia\', \'Marcelo Quadros\', \'verde\', 142, 34);' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected sucess cause dress delete is a function', function() {
        expect(Dress.del).to.be.a('function');
    });

    it('Expected a failure when del call cause empty id', function(done) {
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
                expect(err.message).to.equal('Dress id not informed');

                done();
            }
        };

        Dress.del({params: ''}, res);
    });

    it('Expected a failure when delete a dress, id not a number', function(done) {
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
                expect(err.message).to.equal('{"id": number } is required field');

                done();
            }
        };

        Dress.del({ params: { id: 'sereia' } }, res);
    });

    it('Expected sucess when delete a dress', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(result) {
console.log('- - - ', result);
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(200);
                expect(result).to.be.a('object');
                expect(result).to.have.property('status');
                expect(result.status).to.equal('ok');

                done();
            }
        };

        Dress.del({ params: { id: 1 } }, res);
    });
});

'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const client = require('../../../controller/client/');
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

        connection.query('SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE client; TRUNCATE TABLE addresses;' +
        'INSERT INTO client(`name`, `email`, `password`, `postalCode`, `addressNumber`, `cellPhone`, `height`, `hip`, `waist`, `heelSize`, `size`)' +
        'VALUES(\'Keila\', \'keila@dressandgo.com.br\', \'Senha123Forte\', \'04545041\', \'352\', 1130454006, 168, 78, 68, 10, 40);' +
        'INSERT INTO addresses(`postalCode`, `street`, `city`, `state`) VALUES(\'04545041\', \'Rua Santa Justina\', \'São Paulo\', \'SP\');' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected sucess cause client find is a function', function() {
        expect(client.find).to.be.a('function');
    });

    it('Expected a failure when find client, cause empty id', function(done) {
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
                expect(err.message).to.equal('Client e-mail not informed');

                done();
            }
        };

        client.del({params: ''}, res);
    });

    it('Expected a failure when find client, cause empty email', function(done) {
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
                expect(err.message).to.equal('{"email": "string"} is required field');

                done();
            }
        };

        client.del({ params: { email: '' } }, res);
    });

    it('Expected sucess when find client, cause empty id', function(done) {
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

        client.del({ params: { email: 'filipemelodasilva@gmail.com' } }, res);
    });
});

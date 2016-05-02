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

        connection = mysql.createConnection({
            "host": "localhost",
            "user": "root",
            "password": "2016@admin",
            "multipleStatements": true,
            "database": "test_dress_and_go"
        });

        connection.connect();

        connection.query(`
            SET FOREIGN_KEY_CHECKS=0;
            TRUNCATE TABLE client;
            TRUNCATE TABLE addresses;
            TRUNCATE TABLE rents;
            TRUNCATE TABLE dress;
            SET FOREIGN_KEY_CHECKS=1;
            INSERT INTO client SET name=Keila, email=keila@dressandgo.com,
                password=2A1B0C6D, postalCode=09111-620, addressNumber=80,
                cellPhone=11964316820, height=158, hip=78, waist=68, heelSize=10, size=40;
            INSERT INTO addresses SET ;
            `);


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

        client.find({params: ''}, res);
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
                expect(err.message).to.equal('Client id not informed');

                done();
            }
        };

        client.find({params: ''}, res);
    });
});

'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');

const Dress = require('../../../controller/dress/');
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

        connection.query(' SET FOREIGN_KEY_CHECKS=0;' +
            'INSERT INTO dress(\`id\` ,\`model\`, \`stylist\`, \`color\`, \`height\`, \`size\`) VALUES(1, \'Sereia\', \'Marcelo Quadros\', \'verde\', 142, 34);' +
            'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected sucess cause client is a function', function() {
        expect(Dress.update).to.be.a('function');
    });

    it('Expected a failure when change dress, cause post "empty" body', function(done) {
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
                expect(err.message).to.equal('Dress info not informed');

                done();
            }
        };

        Dress.update({body: {}}, res);
    });

    it('Expected sucess when update dress stylist name', function(done) {
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

        Dress.update({
            params: {
                id:1
            },
            body: {
                stylist: 'Carina Duek'
            }
        }, res);
    });

    it('Expected sucess when update color and model', function(done) {
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

        Dress.update({
            params: {
                id: 1
            },
            body: {
                model: 'crepe',
                color: 'vermelho'
            }
        }, res);
    });
});

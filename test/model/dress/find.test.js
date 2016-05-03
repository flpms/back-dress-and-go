'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Dress = require('../../../model/dress');
const expect = chai.expect;

describe('Find dress', function() {

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
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected a failure when dress object is not informed', function(done) {

        Dress.find().catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need id to search');

            done();
        });
    });

    it('Expected a sucess when search for a dress with id', function(done) {

        Dress.find(1).then(function(result) {
            expect(result).to.be.a('array');
            expect(result[0]).to.have.property('id');
            expect(result[0]).to.have.property('model');
            expect(result[0]).to.have.property('stylist');
            expect(result[0]).to.have.property('color');
            expect(result[0]).to.have.property('size');
            expect(result[0].model).to.equal('Sereia');
            expect(result[0].color).to.equal('verde');

            done();
        });
    });
});

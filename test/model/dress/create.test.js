'use strict';

const mysql = require('mysql');
const chai = require('chai');
const assert = require('assert');
const Dress = require('../../../model/dress');

const expect = chai.expect;

describe('Creating Dress', function() {

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

        connection.query(`SET FOREIGN_KEY_CHECKS=0;
            TRUNCATE TABLE dress;
            SET FOREIGN_KEY_CHECKS=1;`);

        connection.end();
    });

    it('Expected a failure when dress is not informed', function(done) {
        Dress.create({}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need be Object to create a dress');
            done();
        });
    });

    it('Expected sucess when insert a dress', function(done) {
        Dress.create({
            model: 'sereia',
            stylist: 'Marcelo Quadros',
            color: 'verde',
            height: 142,
            size: 34
        }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('affectedRows');
            expect(result).to.have.property('insertId');
            expect(result.affectedRows).to.equal(1);
            done();
        });
    });
});

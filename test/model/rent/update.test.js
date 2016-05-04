'use strict';

const chai = require('chai');
const moment = require('moment');
const assert = require('assert');
const mysql = require('mysql');
const Rent = require('../../../model/rent');
const expect = chai.expect;

describe('Rent update', function() {

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
        'INSERT INTO rents(\`id\`, `clientId`, `dressId`, `orderDate`, `bookingDate`, `devolutionDate`, `obs`) VALUES(1, 1, 1, \'2016-05-04T11:40:56-03:00\', \'2016-05-08T11:40:56-03:00\', \'2016-05-12T11:40:56-03:00\', \'Vestido alugado para festa de casamento\');' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected failure when update observation rent cause id is not informed', function(done) {
        Rent.update('', { obs: 'Mudança na data do aluguel' }).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need a id to update a rent');
            done();
        });
    });

    it('Expected a failure cause rent info not informed', function(done) {
        Rent.update(1, {}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need info to update a rent');
            done();
        });
    });

    it('Expected a failure cause try update id dress', function(done) {
        Rent.update(1, {id: 2}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Can\'t update id rent');
            done();
        });
    });

    it('Expected sucess when update rent observation', function(done) {
        Rent.update(1, { obs: 'Mudança na data do aluguel' }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('changedRows');
            expect(result.changedRows).to.equal(1);
            done();
        });
    });

    it('Expected sucess when update rent bookingDate e devolutionDate', function(done) {
        Rent.update(1, {
            bookingDate: moment().add(6, 'd').format(),
            devolutionDate: moment().add(10, 'd').format(),
        }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('changedRows');
            expect(result.changedRows).to.equal(1);
            done();
        });
    });
});

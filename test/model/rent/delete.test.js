'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Rent = require('../../../model/rent');
const expect = chai.expect;

describe('Delete Dress', function() {

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

    it('Expected a failure when id rent not informed', function(done) {
        Rent.del().catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need have id to delete');

            done();
        });
    });

    it('Expected a sucess when rent id is informed', function(done) {
        Rent.del(1).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('changedRows');
            expect(result).to.have.property('affectedRows');

            done();
        });
    });
});

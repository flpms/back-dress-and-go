'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Dress = require('../../../model/dress');
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

        connection.query('SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE dress' +
        'INSERT INTO dress(\`id\` ,\`model\`, \`stylist\`, \`color\`, \`height\`, \`size\`, \`dressDeleted\`) VALUES(1, \'Sereia\', \'Marcelo Quadros\', \'verde\', 142, 34, 0);' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected a failure when id dress not informed', function(done) {
        Dress.del().catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need have id to delete');

            done();
        });
    });

    it('Expected a sucess when client id is informed', function(done) {
        Dress.del(1).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('changedRows');
            expect(result).to.have.property('affectedRows');
            expect(result.changedRows).to.equal(1);
            expect(result.affectedRows).to.equal(1);
            done();
        });
    });
});

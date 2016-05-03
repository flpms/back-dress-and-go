'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Dress = require('../../../model/dress');
const expect = chai.expect;

describe('Dress update', function() {

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

    it('Expected failure when update dress model cause id is not informed', function(done) {
        Dress.update('', {model: 'blusê'}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need a id to update a dress');
            done();
        });
    });

    it('Expected a failure cause dress info not informed', function(done) {
        Dress.update(1, {}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need info to update a dress');
            done();
        });
    });

    it('Expected a failure cause try update id dress', function(done) {
        Dress.update(1, {id: 2}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Can\'t update id dress');
            done();
        });
    });

    it('Expected sucess when update dress model', function(done) {
        Dress.update(1, { size: 38 }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('changedRows');
            expect(result.changedRows).to.equal(1);
            done();
        });
    });

    it('Expected sucess when update client password and cellPhone', function(done) {
        Dress.update(1, {
            model: 'crepe',
            color: 'vermelho'
        }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('changedRows');
            expect(result.changedRows).to.equal(1);
            done();
        });
    });
});

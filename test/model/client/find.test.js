'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Client = require('../../../model/client');
const expect = chai.expect;

describe('Find User', function() {

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

    it('Expected a failure when client email is not informed', function(done) {

        Client.find({}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);

            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need be Object to create a client');

            done();
        });
    });

    it('Expected a failure when client email is not informed', function(done) {

        Client.find('keila@dressandgo.com.br').then(function(result) {

            expect(result).to.be.a('array');
            expect(result[0]).to.have.property('id');
            expect(result[0]).to.have.property('email');
            expect(result[0]).to.have.property('password');
            expect(result[0]).to.have.property('postalCode');
            expect(result[0]).to.have.property('street');

            expect(result[0].street).to.equal('Rua Santa Justina');
            expect(result[0].postalCode).to.equal('04545041');

            done();
        });
    });
});

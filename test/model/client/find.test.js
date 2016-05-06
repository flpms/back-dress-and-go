'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Client = require('../../../model/client');
const expect = chai.expect;

describe('Find Client', function() {

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
        'INSERT INTO client(`name`, `email`, `password`, `postalCode`, `addressNumber`, `cellPhone`, `height`, `hip`, `waist`, `heelSize`, `size`)' +
        'VALUES(\'Natalie\', \'natalie@dressandgo.com.br\', \'Senha123Forte\', \'04545042\', \'352\', 1130454006, 168, 78, 68, 10, 40);' +
        'INSERT INTO addresses(`postalCode`, `street`, `city`, `state`) VALUES(\'04545042\', \'Rua Santa Justina\', \'São Paulo\', \'SP\');' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected a failure when client email is not informed', function(done) {

        Client.find({}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);

            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need be string to find a client');

            done();
        });
    });

    it('Expected a failure when client email is not informed', function(done) {

        Client.find('keila@dressandgo.com.br').then(function(result) {

            expect(result).to.be.a('array');

            done();
        });
    });

    it('Expected a sucess when find all clients', function(done) {

        Client.find('findall').then(function(result) {

            expect(result).to.be.a('array');

            done();
        });
    });
});

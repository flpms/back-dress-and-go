'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Client = require('../../../model/client');
const expect = chai.expect;

describe('Client update', function() {

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

    it('Expected failure when update client name cause email is not informed', function(done) {
        Client.update('', {name: 'Keila Silva'}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need email to update a client');
            done();
        });
    });

    it('Expected a failure cause email is informed, but don\'t have update infos', function(done) {
        Client.update('keila@dressandgo.com.br', {}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need a object to update a client');
            done();
        });
    });

    it('Expected sucess when update client name', function(done) {
        Client.update('keila@dressandgo.com.br', {
            name: 'Keila Silva'
        }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('changedRows');
            expect(result.changedRows).to.equal(1);
            done();
        });
    });

    it('Expected sucess when update client password and cellPhone', function(done) {
        Client.update('keila@dressandgo.com.br', {
            password: 'K1i2la6S7i8l9v3a4',
            cellPhone: 1196316820
        }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('changedRows');
            expect(result.changedRows).to.equal(1);
            done();
        });
    });
});

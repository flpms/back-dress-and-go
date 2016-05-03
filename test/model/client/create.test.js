'use strict';

const mysql = require('mysql');
const chai = require('chai');
const assert = require('assert');
const Client = require('../../../model/client');

const expect = chai.expect;

describe('Creating Client', function() {

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
            TRUNCATE TABLE client;
            TRUNCATE TABLE addresses;
            INSERT INTO addresses(\`postalCode\`, \`street\`, \`city\`, \`state\`) VALUES(\'09111620\', \'Rua Jales\', \'Santo André\', \'SP\');
            SET FOREIGN_KEY_CHECKS=1;`);

        connection.end();
    });

    it('Expected a failure when client is not informed', function(done) {
        Client.create({}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);

            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need be Object to create a client');

            done();
        });
    });

    it('Expected a failure when client postalCode is a number', function(done) {
        Client.create({
            name: 'Keila',
            email: 'keila@dressandgo.com.br',
            password: 'Senha123Forte',
            address: 'Rua Santa Justina',
            number: '352',
            city: 'São Paulo',
            state: "SP",
            postalCode: 4545041,
            cellPhone: 1130454006,
            height: 168,
            hip: 78,
            waist: 68,
            heelSize: 10,
            size: 40
        }).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);

            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('A string is required to postalCode, the string format need be similar to this 00000-000');

            done();
        });
    });

    it('Expected a failure when client postalCode is not a formated postal code', function(done) {
        Client.create({
            name: 'Keila',
            email: 'keila@dressandgo.com.br',
            password: 'Senha123Forte',
            address: 'Rua Santa Justina',
            number: '352',
            city: 'São Paulo',
            state: "SP",
            postalCode: "4545041",
            cellPhone: 1130454006,
            height: 168,
            hip: 78,
            waist: 68,
            heelSize: 10,
            size: 40
        }).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);

            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('A string is required to postalCode, the string format need be similar to this 00000-000');

            done();
        });
    });

    it('Expected a failure when client email is null', function(done) {
        Client.create({
            name: 'Keila',
            password: 'Senha123Forte',
            address: 'Rua Santa Justina',
            number: '352',
            city: 'São Paulo',
            state: "SP",
            postalCode: "04545-041",
            cellPhone: 1130454006,
            height: 168,
            hip: 78,
            waist: 68,
            heelSize: 10,
            size: 40
        }).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);

            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('without a email user can\'t be created');

            done();
        });
    });

    it('Expected sucess in a existign address', function(done) {
        Client.create({
            name: 'Keila',
            email: 'Keila@dressandgo.com.br',
            password: 'Senha123Forte',
            address: 'Rua Jales',
            number: '80',
            city: 'Santo André',
            state: "SP",
            postalCode: "09111-620",
            cellPhone: 1130454006,
            height: 168,
            hip: 78,
            waist: 68,
            heelSize: 10,
            size: 40
        }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('client');
            expect(result.client).to.have.property('fieldCount');
            expect(result.client).to.have.property('affectedRows');
            expect(result.client.insertId).to.equal(1);
            done();
        });
    });

    it('Expected a sucess with a client object', function(done) {
        Client.create({
            name: 'Keila',
            email: 'keila@dressandgo.com.br',
            password: 'Senha123Forte',
            address: 'Rua Santa Justina',
            number: '352',
            city: 'São Paulo',
            state: "SP",
            postalCode: "04545-041",
            cellPhone: 1130454006,
            height: 168,
            hip: 78,
            waist: 68,
            heelSize: 10,
            size: 40
        }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('client');
            expect(result.client).to.have.property('fieldCount');
            expect(result.client).to.have.property('affectedRows');
            expect(result.client.affectedRows).to.equal(1);
            done();
        });
    });
});

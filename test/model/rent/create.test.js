'use strict';

const mysql = require('mysql');
const moment = require('moment');
const chai = require('chai');
const assert = require('assert');
const Rent = require('../../../model/rent');

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

        connection.query('SET FOREIGN_KEY_CHECKS=0;' +
        'TRUNCATE TABLE rents;' +
        'TRUNCATE TABLE client;' +
        'TRUNCATE TABLE addresses;' +
        'INSERT INTO client(`name`, `email`, `password`, `postalCode`, `addressNumber`, `cellPhone`, `height`, `hip`, `waist`, `heelSize`, `size`)' +
        'VALUES(\'Keila\', \'keila@dressandgo.com.br\', \'Senha123Forte\', \'04545041\', \'352\', 1130454006, 168, 78, 68, 10, 40);' +
        'INSERT INTO addresses(`postalCode`, `street`, `city`, `state`) VALUES(\'04545041\', \'Rua Santa Justina\', \'São Paulo\', \'SP\');' +
        'INSERT INTO dress(\`id\` ,\`model\`, \`stylist\`, \`color\`, \`height\`, \`size\`) VALUES(1, \'Sereia\', \'Marcelo Quadros\', \'verde\', 142, 34);' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected a failure when rent object is not informed', function(done) {
        Rent.create({}).catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need be Object to create a rent');
            done();
        });
    });

    it('Expected sucess when insert a dress', function(done) {
        Rent.create({
            clientId: 1,
            dressId: 1,
            orderDate: moment().format(),
            bookingDate: moment().add(4, 'd').format(),
            devolutionDate: moment().add(8, 'd').format(),
            obs: 'Vestido alugado para festa de casamento',
        }).then(function(result) {
            expect(result).to.be.a('object');
            expect(result).to.have.property('affectedRows');
            expect(result).to.have.property('insertId');
            expect(result.affectedRows).to.equal(1);
            done();
        });
    });
});

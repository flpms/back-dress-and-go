//

'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const Rent = require('../../../model/rent');
const expect = chai.expect;

describe('Find dress', function() {

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
        'TRUNCATE TABLE rents;' +
        'TRUNCATE TABLE client;' +
        'TRUNCATE TABLE addresses;' +
        'INSERT INTO client(`name`, `email`, `password`, `postalCode`, `addressNumber`, `cellPhone`, `height`, `hip`, `waist`, `heelSize`, `size`)' +
        'VALUES(\'Keila\', \'keila@dressandgo.com.br\', \'Senha123Forte\', \'04545041\', \'352\', 1130454006, 168, 78, 68, 10, 40);' +
        'INSERT INTO addresses(`postalCode`, `street`, `city`, `state`) VALUES(\'04545041\', \'Rua Santa Justina\', \'São Paulo\', \'SP\');' +
        'INSERT INTO dress(\`id\` ,\`model\`, \`stylist\`, \`color\`, \`height\`, \`size\`) VALUES(1, \'Sereia\', \'Marcelo Quadros\', \'verde\', 142, 34);' +
        'INSERT INTO rents(\`id\`, `clientId`, `dressId`, `orderDate`, `bookingDate`, `devolutionDate`, `obs`) VALUES(1, 1, 1, \'2016-05-04T11:40:56-03:00\', \'2016-05-08T11:40:56-03:00\', \'2016-05-12T11:40:56-03:00\', \'Vestido alugado para festa de casamento\');' +
        'SET FOREIGN_KEY_CHECKS=1;');

        connection.end();
    });

    it('Expected a failure when rent object is not informed', function(done) {

        Rent.find().catch(function(err) {
            expect(err).to.have.property('statusCode');
            expect(err.statusCode).to.equal(400);
            expect(err).to.be.a('object');
            expect(err).to.have.property('message');
            expect(err.message).to.equal('Need id to search');

            done();
        });
    });

    it('Expected a sucess when search for a rent with id', function(done) {

        Rent.find(1).then(function(result) {

            expect(result).to.be.a('array');
            done();
        });
    });
});

'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');

const client = require('../../../controller/client/');
const expect = chai.expect;

describe('Controller client test', function() {

    let connection;

    before(function() {
        global.environment = 'test';

        connection = mysql.createConnection({
            "host": "localhost",
            "user": "root",
            "password": "2016@admin",
            "multipleStatements": true,
            "database": "test_dress_and_go"
        });

        connection.connect();

        connection.query(`
            SET FOREIGN_KEY_CHECKS=0;
            TRUNCATE TABLE client;
            TRUNCATE TABLE addresses;
            TRUNCATE TABLE rents;
            TRUNCATE TABLE dress;
            INSERT INTO client(\`name`, \`email\`, \`password`, \`postalCode`, `\addressNumber\`, \`cellPhone\`, \`height\`, \`hip\`, \`waist\`, \`heelSize\`, \`size\`, \`deleted\`)
            VALUES(\'Keila\', \'keila@dressandgo.com.br\', \'Senha123Forte\', \'04545041\', \'352\', 1130454006, 168, 78, 68, 10, 40, 0);
            INSERT INTO addresses(\`postalCode\`, \`street\`, \`city\`, \`state\`) VALUES(\'04545041\', \'Rua Santa Justina\', \'São Paulo\', \'SP\');
            SET FOREIGN_KEY_CHECKS=1;`);

        connection.end();
    });

    it('Expected sucess cause client is a function', function() {
        expect(client.update).to.be.a('function');
    });

    it('Expected a failure when create client, cause post "empty" body', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('Client Object not informed');

                done();
            }
        };

        client.update({body: {}}, res);
    });

    it('Expected sucess when update name client', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(result) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(200);

                expect(result).to.be.a('object');
                expect(result).to.have.property('message');
                expect(result).to.have.property('changedRows');
                expect(result.message).to.equal('updated with sucess');
                expect(result.changedRows).to.equal(1);

                done();
            }
        };

        client.update({
            params: {
                email: 'keila@dressandgo.com.br'
            },
            body: {
                name: 'Keila A. Silva'
            }
        }, res);
    });

    it('Expected sucess when update password and cellPhone client', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(result) {

                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(200);

                expect(result).to.be.a('object');
                expect(result).to.have.property('message');
                expect(result).to.have.property('changedRows');
                expect(result.message).to.equal('updated with sucess');
                expect(result.changedRows).to.equal(1);

                done();
            }
        };

        client.update({
            params: {
                email: 'keila@dressandgo.com.br'
            },
            body: {
                password: 'K1i2la6S7i8l9v3a4',
                cellPhone: 1196316820
            }
        }, res);
    });
});

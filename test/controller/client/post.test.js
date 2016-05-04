'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');

const client = require('../../../controller/client/');
const expect = chai.expect;

describe('Controller post client test', function() {

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
            SET FOREIGN_KEY_CHECKS=1;`);

        connection.end();
    });

    it('Expected sucess cause client is a function', function() {
        expect(client.create).to.be.a('function');
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

        client.create({body: ''}, res);
    });

    it('Expected a failure when create client, cause missing name in parameters', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {

                expect(this.statusCode).to.equal(400);
                expect(this.statusCode).to.be.a('number');

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"name": "string"} is required field');

                done();
            }
        };

        var req = {
            body: { email: 'keila@dressandgo.com.br' }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, name field is a wrong type', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {

                expect(this.statusCode).to.equal(400);
                expect(this.statusCode).to.be.a('number');

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"name": "string"} is required field');

                done();
            }
        };

        var req = {
            body: { email: 'keila@dressandgo.com.br', name: 345 }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing email in parameters', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {

                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);
                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"email": "string"} is required field');

                done();
            }
        };

        var req = {
            body: { name: 'Keila'}
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, email field is wrong type', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {

                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);
                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"email": "string"} is required field');

                done();
            }
        };

        var req = {
            body: { name: 'Keila', email: 434343 }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing password in parameters', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {

                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"password": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, password is wrong type', function(done) {
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {

                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"password": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: true
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing address in parameters', function(done) {

        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"address": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, address field is wrong type', function(done) {

        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"address": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: true
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing address number in parameters', function(done) {

        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"number": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, address number is wrong type', function(done) {

        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"number": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: true
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing city in parameters', function(done) {

        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"city": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, city is wrong type', function(done) {

        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"city": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: {}
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing state in parameters', function(done) {

        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"state": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, state is wrong type', function(done) {

        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"state": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: true
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing postal code in parameters', function(done) {

        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send: function(err) {
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(400);

                expect(err).to.be.a('object');
                expect(err).to.have.property('message');
                expect(err.message).to.equal('{"postalCode": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, postalCode is wrong type', function(done) {

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
                expect(err.message).to.equal('{"postalCode": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: 4545041
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing phone in parameters', function(done) {

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
                expect(err.message).to.equal('{"cellPhone": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cellPhone is wrong type', function(done) {

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
                expect(err.message).to.equal('{"cellPhone": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: '1130454006'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing height in parameters', function(done) {

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
                expect(err.message).to.equal('{"height": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: "SP",
                postalCode: '04545-041',
                cellPhone: 1130454006
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, height is wrong type', function(done) {

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
                expect(err.message).to.equal('{"height": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: '158'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing bust in parameters', function(done) {

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
                expect(err.message).to.equal('{"bust": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 158
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, bust is wrong type', function(done) {

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
                expect(err.message).to.equal('{"bust": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 158,
                bust: '80'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing hip in parameters', function(done) {

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
                expect(err.message).to.equal('{"hip": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 158,
                bust: 80
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, hip is wrong type', function(done) {

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
                expect(err.message).to.equal('{"hip": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 158,
                bust: 80,
                hip: '98'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing waist in parameters', function(done) {

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
                expect(err.message).to.equal('{"waist": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 158,
                bust: 80,
                hip: 98
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, waist is wrong type', function(done) {

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
                expect(err.message).to.equal('{"waist": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 168,
                bust: 80,
                hip: 78,
                waist: '68'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing heel-size in parameters', function(done) {

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
                expect(err.message).to.equal('{"heelSize": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 168,
                bust: 80,
                hip: 78,
                waist: 68
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, heelSize is wrong type', function(done) {

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
                expect(err.message).to.equal('{"heelSize": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 168,
                bust: 80,
                hip: 78,
                waist: 68,
                heelSize: '10'
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing size in parameters', function(done) {

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
                expect(err.message).to.equal('{"size": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 168,
                bust: 80,
                hip: 78,
                waist: 68,
                heelSize: 10
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, size is wrong type', function(done) {

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
                expect(err.message).to.equal('{"size": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: "SP",
                postalCode: "04545-041",
                cellPhone: 1130454006,
                height: 168,
                bust: 80,
                hip: 78,
                waist: 68,
                heelSize: 10,
                size: '45'
            }
        };

        client.create(req, res);
    });

    it ('Should call create and receive a response', function(done) {

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: 352,
                city: 'São Paulo',
                state: 'SP',
                postalCode: '04545-041',
                cellPhone: 1130454006,
                height: 168,
                bust: 80,
                hip: 78,
                waist: 68,
                heelSize: 10,
                size: 40
            }
        };

        var res = {
            status(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send(obj) {
                expect(obj).to.be.a('object');
                expect(obj).to.have.property('status');
                expect(obj).to.have.property('message');
                expect(obj).to.have.property('client');
                expect(this.statusCode).to.equal(200);

                done();
            }
        };

        client.create(req, res);
    });
});

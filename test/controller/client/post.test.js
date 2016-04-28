'use strict';

const chai = require('chai');
const assert = require('assert');
const DB = require('mysql');

const client = require('../../../controller/client/');
const expect = chai.expect;

describe('Controller client test', function() {

    let connection;

    before(function(done) {

        var collection;
        connection = DB.createConnection({
            "host": "localhost",
            "user": "root",
            "password": "2016@admin",
            "multipleStatements": true
        });

        connection.connect(function(err, result) {
            if (err) {
                console.error(err);
                return;
            }
        });

        connection.query('CREATE DATABASE IF NOT EXISTS dress_and_go_test; USE dress_and_go_test', function(err, results) {
            if (err) {
                console.error(err);
            }

            done();
        });
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
                number: '352'
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
                number: '352',
                city: 'São Paulo'
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
                expect(err.message).to.equal('{"postalCode": "string"} code is required field');

                done();
            }
        };

        var req = {
            body: {
                name: 'Keila',
                email: 'keila@dressandgo.com.br',
                password: 'Senha123Forte',
                address: 'Rua Santa Justina',
                number: '352',
                city: 'São Paulo',
                state: "SP"
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
                number: '352',
                city: 'São Paulo',
                state: "SP",
                postalCode: "04545-041"
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
                number: '352',
                city: 'São Paulo',
                state: "SP",
                postalCode: "04545-041",
                cellPhone: 1130454006
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
                number: '352',
                city: 'São Paulo',
                state: "SP",
                postalCode: "04545-041",
                cellPhone: 1130454006,
                height: 158
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
                number: '352',
                city: 'São Paulo',
                state: "SP",
                postalCode: "04545-041",
                cellPhone: 1130454006,
                height: 158,
                bust: 80
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
                number: '352',
                city: 'São Paulo',
                state: "SP",
                postalCode: "04545-041",
                cellPhone: 1130454006,
                height: 158,
                bust: 80,
                hip: 98
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
                number: '352',
                city: 'São Paulo',
                state: "SP",
                postalCode: "04545-041",
                cellPhone: 1130454006,
                height: 168,
                bust: 80,
                hip: 78,
                waist: 68
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
                number: '352',
                city: 'São Paulo',
                state: "SP",
                postalCode: "04545-041",
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

    it ('Should call create and receive a response', function(done) {

        var req = {
            body: {
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
            }
        };

        var res = {
            status(statusCode) {
                this.statusCode = statusCode;
                return this;
            },
            send(obj) {
                expect(obj).to.be.a('object');
                expect(obj).to.have.property('nome');
                expect(obj).to.have.property('email');
                expect(obj).to.have.property('senha');
                expect(obj).to.have.property('telefones');
                expect(obj).to.have.property('id');
                expect(obj).to.have.property('data_criacao');
                expect(obj).to.have.property('data_atualizacao');
                expect(obj).to.have.property('ultimo_login');
                expect(obj).to.have.property('token');
                expect(this.statusCode).to.equal(200);

                done();
            }
        };

        client.create(req, res);
    });

    it('Expected a failure when create client, cause missing "email" exist', function(done) {
        this.timeout(5000);
        var res = {
            status: function(statusCode) {
                this.statusCode = statusCode
                return this;
            },
            send: function(err) {
                expect(err).to.be.a('object');
                expect(err).to.have.property('mensagem');
                expect(err.mensagem).to.equal('email já existente');
                expect(this.statusCode).to.be.a('number');
                expect(this.statusCode).to.equal(409);
                done();
            }
        };

        var req = {
            body: {
                nome: 'Filipe M. Silva',
                email: 'filipe@filipe.com',
                senha: 'Senha123Forte',
                telefones: [{ numero: "123456789", ddd: "11" }]
            }
        };

        client.create(req, res);
    });

    after(function(done){

        connection.query('DROP DATABASE IF EXISTS dress_and_go_test');
        connection.close();
    });
});

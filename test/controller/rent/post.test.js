'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');
const moment = require('moment');

const Rent = require('../../../controller/rent/');
const expect = chai.expect;

describe('Controller create a rent test', function() {

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

    it('Expected sucess cause dress create is a function', function() {
        expect(Rent.create).to.be.a('function');
    });

    it('Expected a failure when create rent, cause post "empty" body', function(done) {
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
                expect(err.message).to.equal('Rent object not informed');

                done();
            }
        };

        Rent.create({body: ''}, res);
    });

    it('Expected a failure when create rent, cause missing clientId in parameters', function(done) {
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
                expect(err.message).to.equal('{ "clientId": number } is required field');

                done();
            }
        };

        var req = {
            body: { dressId: 1 }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, clientID is a wrong type', function(done) {
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
                expect(err.message).to.equal('{ "clientId": number } is required field');

                done();
            }
        };

        var req = {
            body: { clientId: "id" }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, cause missing dressId in parameters', function(done) {
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
                expect(err.message).to.equal('{ "dressId": number } is required field');

                done();
            }
        };

        var req = {
            body: { clientId: 1 }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, dressId field is wrong type', function(done) {
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
                expect(err.message).to.equal('{ "dressId": number } is required field');

                done();
            }
        };

        var req = {
            body: { clientId: 1, dressId: "id" }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, cause missing booking date in parameters', function(done) {
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
                expect(err.message).to.equal('{ "bookingDate": "string" } is required field');

                done();
            }
        };

        var req = {
            body: {
                clientId: 1,
                dressId: 1
            }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, booking date is wrong type', function(done) {
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
                expect(err.message).to.equal('{ "bookingDate": "string" } is required field');

                done();
            }
        };

        var req = {
            body: {
                clientId: 1,
                dressId: 1,
                bookingDate: 20160504
            }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, booking date is invalid date time', function(done) {
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
                expect(err.message).to.equal('{ "bookingDate": "string" } is required field');

                done();
            }
        };

        var req = {
            body: {
                clientId: 1,
                dressId: 1,
                bookingDate: 'teste'
            }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, cause missing devolution date in parameters', function(done) {
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
                expect(err.message).to.equal('{ "devolutionDate": "string" } is required field');

                done();
            }
        };

        var req = {
            body: {
                clientId: 1,
                dressId: 1,
                bookingDate: '2016-05-04'
            }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, devolution date is wrong type', function(done) {
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
                expect(err.message).to.equal('{ "devolutionDate": "string" } is required field');

                done();
            }
        };

        var req = {
            body: {
                clientId: 1,
                dressId: 1,
                bookingDate: '2016-05-04',
                devolutionDate: 'test'
            }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, devolution date is invalid date time', function(done) {
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
                expect(err.message).to.equal('{ "devolutionDate": "string" } is required field');

                done();
            }
        };

        var req = {
            body: {
                clientId: 1,
                dressId: 1,
                bookingDate: '2016-05-04',
                devolutionDate: 20160512
            }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, devolution date is before bookingDate', function(done) {
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
                expect(err.message).to.equal('Invalid devolution date.');

                done();
            }
        };

        var req = {
            body: {
                clientId: 1,
                dressId: 1,
                bookingDate: '2016-05-04',
                devolutionDate: '2016-04-12'
            }
        };

        Rent.create(req, res);
    });

    it('Expected a failure when create rent, bookingDate is before devolutionDate', function(done) {
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
                expect(err.message).to.equal('Invalid rent date.');

                done();
            }
        };

        var req = {
            body: {
                clientId: 1,
                dressId: 1,
                bookingDate: '2016-05-03',
                devolutionDate: '2016-05-12'
            }
        };

        Rent.create(req, res);
    });

    it ('Should call create and receive a response', function(done) {

        var req = {
            body: {
                clientId: 1,
                dressId: 1,
                orderDate: moment().format(),
                bookingDate: moment().add(4, 'd').format(),
                devolutionDate: moment().add(8, 'd').format(),
                obs: 'Vestido alugado para festa de casamento',
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
                expect(this.statusCode).to.equal(200);

                done();
            }
        };

        Rent.create(req, res);
    });
});

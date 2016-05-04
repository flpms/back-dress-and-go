'use strict';

const chai = require('chai');
const assert = require('assert');
const mysql = require('mysql');

const Dress = require('../../../controller/dress/');
const expect = chai.expect;

describe('Controller create a dress test', function() {

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
            TRUNCATE TABLE dress;
            SET FOREIGN_KEY_CHECKS=1;`);

        connection.end();
    });

    it('Expected sucess cause dress create is a function', function() {
        expect(Dress.create).to.be.a('function');
    });

    it('Expected a failure when create dress, cause post "empty" body', function(done) {
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

        Dress.create({body: ''}, res);
    });

    it('Expected a failure when create dress, cause missing model in parameters', function(done) {
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
                expect(err.message).to.equal('{"model": "string"} is required field');

                done();
            }
        };

        var req = {
            body: { stylist: 'Marcelo Quadros' }
        };

        Dress.create(req, res);
    });

    it('Expected a failure when create dress, model is a wrong type', function(done) {
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
                expect(err.message).to.equal('{"model": "string"} is required field');

                done();
            }
        };

        var req = {
            body: { model: {tipo: 'sereia'}, stylist: 'Marcelo Quadros' }
        };

        Dress.create(req, res);
    });

    it('Expected a failure when create dress, cause missing stylist in parameters', function(done) {
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
                expect(err.message).to.equal('{"stylist": "string"} is required field');

                done();
            }
        };

        var req = {
            body: { model: 'sereia' }
        };

        Dress.create(req, res);
    });

    it('Expected a failure when create dress, stylist field is wrong type', function(done) {
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
                expect(err.message).to.equal('{"stylist": "string"} is required field');

                done();
            }
        };

        var req = {
            body: { model: 'sereia', stylist: 3 }
        };

        Dress.create(req, res);
    });

    it('Expected a failure when dress dress, cause missing color in parameters', function(done) {
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
                expect(err.message).to.equal('{"color": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                model: 'sereia',
                stylist: 'Marcelo Quadros'
            }
        };

        Dress.create(req, res);
    });

    it('Expected a failure when create dress, color is wrong type', function(done) {
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
                expect(err.message).to.equal('{"color": "string"} is required field');

                done();
            }
        };

        var req = {
            body: {
                model: 'sereia',
                stylist: 'Marcelo Quadros',
                color: true
            }
        };

        Dress.create(req, res);
    });

    it('Expected a failure when create dress, cause missing height in parameters', function(done) {

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
                expect(err.message).to.equal('{"height": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                model: 'sereia',
                stylist: 'Marcelo Quadros',
                color: 'verde'
            }
        };

        Dress.create(req, res);
    });

    it('Expected a failure when create dress, height field is wrong type', function(done) {

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
                expect(err.message).to.equal('{"height": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                model: 'sereia',
                stylist: 'Marcelo Quadros',
                color: 'verde',
                height: "142"
            }
        };

        Dress.create(req, res);
    });

    it('Expected a failure when create dress, cause missing sizer in parameters', function(done) {

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
                expect(err.message).to.equal('{"size": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                model: 'sereia',
                stylist: 'Marcelo Quadros',
                color: 'verde',
                height: 142
            }
        };

        Dress.create(req, res);
    });

    it('Expected a failure when create dress, size is wrong type', function(done) {

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
                expect(err.message).to.equal('{"size": number} is required field');

                done();
            }
        };

        var req = {
            body: {
                model: 'sereia',
                stylist: 'Marcelo Quadros',
                color: 'verde',
                height: 142,
                size: "34"
            }
        };

        Dress.create(req, res);
    });

    it ('Should call create and receive a response', function(done) {

        var req = {
            body: {
                model: 'sereia',
                stylist: 'Marcelo Quadros',
                color: 'vermelho',
                height: 142,
                size: 34
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

        Dress.create(req, res);
    });
});

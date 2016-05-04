'use strict';

const chai = require('chai');
const assert = require('assert');
const client = require('../../../model/client');
const expect = chai.expect;

describe('Test model client index', function() {
    it ('Expect sucess if client is a object', function() {
        expect(client).to.be.a('object');
    });

    it('Expect sucess if client has create function', function(){
        expect(client).to.have.property('create');
    });

    it('Expect sucess if client has find function', function(){
        expect(client).to.have.property('find');
    });

    it('Expect sucess if client has update function', function(){
        expect(client).to.have.property('update');
    });

    it('Expect sucess if client has delete function', function(){
        expect(client).to.have.property('del');
    });
});

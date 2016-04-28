'use strict';

const chai = require('chai');
const assert = require('assert');
const index = require('../../../controller/client');
const expect = chai.expect;

describe('Controller client test', function() {
    it ('Test index user object', function() {
        expect(index).to.be.a('object');
    });

    it('Test index has user create', function(){
        expect(index).to.have.property('create');
    });

    it('Test index has user find', function(){
        expect(index).to.have.property('find');
    });

    it('Test index has user delete', function(){
        expect(index).to.have.property('del');
    });

    it('Test index has user update', function(){
        expect(index).to.have.property('update');
    });
});

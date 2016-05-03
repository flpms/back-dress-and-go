'use strict';

const chai = require('chai');
const assert = require('assert');
const dress = require('../../../model/dress');
const expect = chai.expect;

describe('Test dress index', function() {
    it ('Expect sucess if dress is a object', function() {
        expect(dress).to.be.a('object');
    });

    it('Expect sucess if dress has create function', function(){
        expect(dress).to.have.property('create');
    });

    it('Expect sucess if dress has find function', function(){
        expect(dress).to.have.property('find');
    });

    it('Expect sucess if dress has update function', function(){
        expect(dress).to.have.property('update');
    });

    it('Expect sucess if dress has delete function', function(){
        expect(dress).to.have.property('del');
    });
});

'use strict';

const chai = require('chai');
const assert = require('assert');
const Rent = require('../../../model/rent');
const expect = chai.expect;

describe('Test rent index', function() {
    it ('Expect sucess if rend is a object', function() {
        expect(Rent).to.be.a('object');
    });

    it('Expect sucess if rent has create function', function(){
        expect(Rent).to.have.property('create');
    });

    it('Expect sucess if rent has find function', function(){
        expect(Rent).to.have.property('find');
    });

    it('Expect sucess if rent has update function', function(){
        expect(Rent).to.have.property('update');
    });

    it('Expect sucess if rent has delete function', function(){
        expect(Rent).to.have.property('del');
    });
});

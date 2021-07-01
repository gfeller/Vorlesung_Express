import chai from 'chai';

chai.should();

const foo = 'bar';
const beverages = {tea: ['chai', 'matcha', 'oolong']};

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
beverages.should.have.property('tea').with.lengthOf(3);


const expect = chai.expect;
expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);

const assert = chai.assert;
assert.typeOf(foo, 'string'); // without optional message
assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');


// mocha + chai
describe('mocha + chai', function () {
    it('should return undefined when the value is not present', function () {
        const foo = 'bar';
        const beverages = {tea: ['chai', 'matcha', 'oolong']};

        foo.should.be.a('string');
        foo.should.equal('bar');
        foo.should.have.lengthOf(3);
        beverages.should.have.property('tea').with.lengthOf(3);
    });

});

import assert from 'assert'

describe('Array', function() {
    describe('#find()', function() {
        it('should return undefined when the value is not present', function() {
            assert.strictEqual([1, 2, 3].find(x=>x > 4), undefined);
        });
    });
});

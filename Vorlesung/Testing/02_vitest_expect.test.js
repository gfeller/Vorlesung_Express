import { describe, it, expect } from 'vitest'

const foo = 'bar';
const beverages = {tea: ['chai', 'matcha', 'oolong']};

// vitest expect (replaces chai's should / expect / assert styles)
expect(foo).toBeTypeOf('string');
expect(foo).toBe('bar');
expect(foo).toHaveLength(3);
expect(beverages).toHaveProperty('tea');
expect(beverages.tea).toHaveLength(3);


// vitest + expect
describe('vitest + expect', function () {
    it('should work with basic assertions', function () {
        const foo = 'bar';
        const beverages = {tea: ['chai', 'matcha', 'oolong']};

        expect(foo).toBeTypeOf('string');
        expect(foo).toBe('bar');
        expect(foo).toHaveLength(3);
        expect(beverages).toHaveProperty('tea');
        expect(beverages.tea).toHaveLength(3);
    });
});

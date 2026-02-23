import { describe, it, expect } from 'vitest';
import { overrideMiddleware } from '../../2_view/utils/method-override.js';

describe('Override Middleware', () => {
    it('replace method', () => {
        const request = {
            body: { _method: 'PUT', name: 'michael' },
            method: 'POST'
        };
        overrideMiddleware(request, {}, () => {});

        expect(request.method).toBe('PUT');
        expect(request.originalMethod).toBe('POST');
        expect(request.body._method).toBeUndefined();
    });
});

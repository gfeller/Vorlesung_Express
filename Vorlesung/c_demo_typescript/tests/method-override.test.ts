import { describe, it, expect } from 'vitest';
import { overrideMiddleware } from '../utils/method-override';
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            originalMethod: string;
        }
    }
}

describe('Override Middleware', () => {
    it('replace method', () => {
        const request = {
            body: { _method: 'PUT', name: 'michael' },
            method: 'POST'
        } as Request;

        overrideMiddleware(request, {} as any, () => null);

        expect(request.method).toBe('PUT');
        expect(request.originalMethod).toBe('POST');
        expect(request.body._method).toBeUndefined();
    });
});

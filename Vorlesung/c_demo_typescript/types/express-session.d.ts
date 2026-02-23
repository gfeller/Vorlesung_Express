import 'express-session';
import 'express-serve-static-core';

declare module 'express-session' {
    interface SessionData {
        user?: {
            email: string;
            name?: string;
            isAdmin?: boolean;
        };
    }
}
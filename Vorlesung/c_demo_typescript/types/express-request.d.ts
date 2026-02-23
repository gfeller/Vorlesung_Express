import 'express-session';
import 'express-serve-static-core';


declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            email: string;
            name?: string;
            isAdmin?: boolean;
        };
    }
}

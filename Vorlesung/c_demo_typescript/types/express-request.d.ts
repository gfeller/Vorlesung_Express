import 'express-session';
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
    interface Request {
        auth: {
            uuid: string;
            name: string;
            email: string;
        };
    }
}

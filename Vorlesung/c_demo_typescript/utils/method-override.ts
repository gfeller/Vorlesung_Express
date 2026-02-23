import override from "method-override";
import {Request} from "express";

export const overrideMiddleware = override(function (req: Request) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
});

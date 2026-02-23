import {Response, Request, NextFunction} from "express";

export class SecurityUtil {
    static isLoggedIn(req: Request) {
        return !!req.session.user;
    }

    static logout(req: Request) {
        req.session.user = undefined;
    }

    static login(req:Request, email: string) {
        req.session.user = {email: email};
    }

    static handleAuthenticate(req: Request, res: Response, next: NextFunction ) {
        if (SecurityUtil.isLoggedIn(req)) {
            next();
        } else {
            res.render("login", {backref: req.originalUrl});
        }
    }

    static currentUser(req: Request): string {
        if(req.session.user){
            return req.session.user.email
        }
        throw Error();
    }
}

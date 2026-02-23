import {Request, Response, NextFunction} from "express";
import {userStore} from "./user-store.js"

export class SecurityService {
    private getAuthUser(req: Request) {
        return req.session.user;
    }

    handleAuthenticate = (req: Request, res: Response, next: NextFunction) => {
        const user = this.getAuthUser(req);
        if (user) {
            req.user = user;
        }
        next();
    }

    ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
        if (req.user) {
            next();
        } else {
            res.render("login", {backref: req.originalUrl});
        }
    }

    logout = (req: Request) => {
        req.session.user = undefined;
        req.user = undefined;
        req.session.destroy(() => {});
    }

    isLoggedIn = (req: Request) => {
        return req.user != null;
    }

    login = async (req: Request, email: string) => {
        await userStore.findByEmail(email);
        req.session.user = {email: email};
    }

    currentUser = async (req: Request) => {
        const email = req.session.user!.email;
        const user = await userStore.findByEmail(email);
        return user;
    }
}

export const securityService = new SecurityService()
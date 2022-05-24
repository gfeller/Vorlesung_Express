import {userStore} from '../services/user-store';
import {SecurityUtil} from "../utils/security";
import {Request, Response} from "express";

export class IndexController {
    login = async (req: Request, res: Response) => {
        if (!SecurityUtil.isLoggedIn(req)) {
            const {email, pwd} = req.body;
            const valid = await userStore.authenticate(email, pwd);

            if (valid) {
                SecurityUtil.login(req, email);
                this.#handleBackRef(req, res);
            } else {
                res.render("login", {backref: req.body._backref || (req.method === "GET" && req.originalUrl ? req.originalUrl : "")});
            }
        } else {
            res.redirect("/");
        }
    };

    index = (req: Request, res: Response) => {
        res.render("index", {isLoggedIn: SecurityUtil.isLoggedIn(req)});
    };

    logout = (req: Request, res: Response) => {
        if (SecurityUtil.isLoggedIn(req)) {
            SecurityUtil.logout(req);
            res.redirect("/");
        }
    };

    #handleBackRef(req: Request, res: Response) {
        if (req.body._backref) {
            res.redirect(req.body._backref);
        } else {
            res.redirect("/");
        }
    }
}

export const indexController = new IndexController();

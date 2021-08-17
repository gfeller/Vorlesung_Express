import {userStore} from '../services/user-store.js';
import {SecurityUtil} from "../utils/security.js";

export class IndexController {
    login = async (req, res) => {
        if (!SecurityUtil.isLoggedIn(req)) {
            const {email, pwd} = req.body;
            let valid = await userStore.authenticate(email, pwd);

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

    index = (req, res) => {
        res.render("index", {isLoggedIn: SecurityUtil.isLoggedIn(req)});
    };

    logout = (req, res) => {
        if (SecurityUtil.isLoggedIn(req)) {
            SecurityUtil.logout(req);
            res.redirect("/");
        }
    };

    #handleBackRef(req, res) {
        if (req.body._backref) {
            res.redirect(req.body._backref);
        } else {
            res.redirect("/");
        }
    }
}

export const indexController = new IndexController();

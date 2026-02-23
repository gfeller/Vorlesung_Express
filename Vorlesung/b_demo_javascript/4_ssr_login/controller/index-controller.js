import {userStore} from '../../shared.js';

import {securityService} from "../services/security-service.js";

export class IndexController {
    login = async (req, res) => {
        if (securityService.isLoggedIn(req)) {
            res.redirect("/");
        } else {
            const {email, pwd} = req.body;
            let valid = await userStore.authenticate(email, pwd);

            if (valid) {
                await securityService.login(req, email);
                this.#handleBackRef(req, res);
            } else {
                res.render("login", {backref: req.body._backref || (req.method === "GET" && req.originalUrl ? req.originalUrl : "")});
            }
        }
    };

    index = (req, res) => {
        res.render("index", {isLoggedIn: securityService.isLoggedIn(req)});
    };

    logout = (req, res) => {
        if (securityService.isLoggedIn(req)) {
            securityService.logout(req);
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

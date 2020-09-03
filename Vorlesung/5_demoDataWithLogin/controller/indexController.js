import {userStore} from '../services/userStore.js';

export class IndexController {
    async login(req, res) {
        if (!req.session.name) {
            let valid = await userStore.authenticate(req.body.email, req.body.pwd);
            if (valid) {
                req.session.name = req.body.email;
                this._handleBackRef(req, res);
            }
            else {
                res.render("login", {backref: req.body._backref || (req.method === "GET" && req.originalUrl ? req.originalUrl : "")});
            }
        }
        else {
            res.redirect("/");
        }
    };

    index(req, res) {
        res.render("index", {isLoggedIn: !req.session.name});
    };

    logout(req, res) {
        if (req.session.name) {
            req.session.name = null;
            res.redirect("/");
        }
    };

    _handleBackRef(req, res) {
        if (req.body._backref) {
            res.redirect(req.body._backref);
        }
        else {
            res.redirect("/");
        }
    }
}

export const indexController = new IndexController();

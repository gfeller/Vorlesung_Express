export class SecurityUtil {
    static isLoggedIn(req) {
        return !!req.session.user;
    }

    static logout(req) {
        req.session.user = null;
    }

    static login(req, name) {
        req.session.user = {name, isAdmin: false};
    }

    static handleAuthenticate(req, res, next) {
        if (SecurityUtil.isLoggedIn(req)) {
            next();
        } else {
            res.render("login", {backref: req.originalUrl});
        }
    }

    static currentUser(req) {
        return req.session.user.name;
    }
}

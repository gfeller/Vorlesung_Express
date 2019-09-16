export class SecurityUtil {
    static isLoggedIn(req) {
        return !!req.session.name;
    }

    static handleAuthenticate(req, res, next) {
        if (SecurityUtil.isLoggedIn(req)) {
            next();
        }
        else {
            res.render("login", {backref: req.originalUrl});
        }
    }

    static currentUser(req) {
        return req.session.name;
    }
}
import {userStore} from "./user-store.js"

export class SecurityService {
    #getAuthUser(req){
        return req.session.user;
    }


    handleAuthenticate = (req, res, next)=> {
        const user = this.#getAuthUser(req);
        if (user) {
            req.user = user;
        }
        next()
    }


    ensureAuthenticated = (req, res, next) =>  {
        if (req.user) {
            next();
        } else {
            res.render("login", {backref: req.originalUrl});
        }
    }


    logout= (req) =>  {
        req.session.user = null;
        req.user = null;
        req.session.destroy();
    }

    isLoggedIn = (req) => {
        return req.user != null;
    }

    login = async (req, email) => {
        const user = await userStore.findByEmail(email);
        req.session.user = {email: email, isAdmin: user.isAdmin};
    }

    currentUser = async (req) => {
        const email = req.session.user.email;
        const user = await userStore.findByEmail(email);
        return user;
    }


}

export const securityService = new SecurityService()
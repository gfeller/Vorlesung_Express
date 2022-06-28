import jwt from 'jsonwebtoken';
import {userStore} from '../services/user-store.js';
import util from 'util';

const sign = util.promisify(jwt.sign);

export class SecurityUtil {
    static isLoggedIn(req) {
        return req.auth != null;
    }

    static authenticated(req, res, next) {
        if (this.isLoggedIn(req)) {
            next();
        }
        else {
            res.status(401).send(false);
        }
    }

    static currentUser(req) {
        return req.auth.name;
    }


    static async createSessionToken(name, secret, options, callback) {
        if (!name) {
            return "";
        }
        return sign({name}, secret, options);
    }

    static async handleLogin(req, res) {
        if (this.isLoggedIn(req)) {
            res.send(true);
        }
        else {
            const {email, pwd} = req.body;
            if (await userStore.authenticate(email, pwd)) {
                let token = await this.createSessionToken(email, req.app.get("jwt-secret"), req.app.get("jwt-sign"));
                res.json(token);
            }
            else {
                res.status("401").json(false);
            }
        }
    }
}

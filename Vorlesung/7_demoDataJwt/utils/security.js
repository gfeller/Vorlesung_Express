import jwt from 'jsonwebtoken';
import {userStore} from '../services/userStore';
import util from 'util';

const sign = util.promisify(jwt.sign);

export class SecurityUtil {
    static isLoggedIn(req) {
        return req.user != null;
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
        return req.user.name;
    }


    static async createSessionToken(name, secret, options, callback) {
        if (!name) {
            return "";
        }
        return await sign({name}, secret, options);
    }

    static async handleLogin(req, res) {
        if (this.isLoggedIn(req)) {
            res.send(true);
        }
        else {
            if (await userStore.authenticate(req.body.email, req.body.pwd)) {
                let token = await this.createSessionToken(req.body.email, req.app.get("jwt-secret"), req.app.get("jwt-sign"));
                res.json(token);
            }
            else {
                res.status("401").json(false);
            }
        }
    }
}
import jwt from 'jsonwebtoken';
import {userStore} from '../services/userStore';
import util from 'util';
import {jwt_secret, jwt_sign} from "../config";

const sign = util.promisify(jwt.sign);

export class SecurityUtil {
    static isLoggedIn(req) {
        return req.user != null;
    }

    static authenticated(req, res, next) {
        if (this.isLoggedIn(req)) {
            next();
        } else {
            res.status(401).send(false);
        }
    }

    static currentUser(req) {
        return req.user.name;
    }


    static async createSessionToken(name) {
        if (!name) {
            return "";
        }
        return await sign({name}, jwt_secret, jwt_sign);
    }

    static async handleLogin(email, pwd) {
        if (await userStore.authenticate(email, pwd)) {
            let token = await this.createSessionToken(email, jwt_secret, jwt_sign);
            return token;
        } else {
            return null
        }
    }
}

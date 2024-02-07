import jwt from 'jsonwebtoken';
import {userStore} from '../services/user-store.js';
import util from 'util';
import {jwt_secret, jwt_sign} from "../config.js";

const sign = util.promisify(jwt.sign);

export class SecurityUtil {

    static async createToken(token) {
        return sign(token, jwt_secret, jwt_sign);
    }

    static async createAuthResponse(email, pwd) {
        if (await userStore.authenticate(email, pwd)) {
            let user = await userStore.findByEmail(email);
            return this.createToken({email: user.email, isAdmin : user.isAdmin}, jwt_secret, jwt_sign);
        } else {
            return null
        }
    }
}

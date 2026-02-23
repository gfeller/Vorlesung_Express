import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import util from "util";

const sign = util.promisify(jwt.sign);

export class CryptoUtil {
    static hashPwd(pwd) {
        return crypto.createHmac('sha256', "secret!") //more information: https://nodejs.org/api/crypto.html
            .update(pwd)
            .digest('hex');
    }

    static createJWT(data, secret, options){
        return sign(data, secret, options);
    }
}
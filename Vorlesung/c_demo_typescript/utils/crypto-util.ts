import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import util from "util";
import {CONFIG} from "../config";

const sign  = util.promisify<object, string, jwt.SignOptions, string>(jwt.sign);


export class CryptoUtil {
    static hashPwd(pwd: string): string {
        return crypto.createHmac('sha256', CONFIG.sha_secret) //more information: https://nodejs.org/api/crypto.html
            .update(pwd)
            .digest('hex');
    }


    static createJWT(data: Record<string, string | number | boolean>) {
        return sign(data,  CONFIG.jwt_secret, CONFIG.jwt_sign);
    }
}

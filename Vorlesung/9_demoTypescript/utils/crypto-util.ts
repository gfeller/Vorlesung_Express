import crypto from 'crypto';

export class CryptoUtil {
    static hashPwd(pwd: string): string {
        return crypto.createHmac('sha256', "secret!") //more information: https://nodejs.org/api/crypto.html
            .update(pwd)
            .digest('hex');
    }
}

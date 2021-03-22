import Datastore from 'nedb-promise'
import {CryptoUtil} from '../utils/cryptoUtil.js';

export class User {
    constructor(email, passwort) {
        this.email = email;
        this.passwortHash = CryptoUtil.hashPwd(passwort);
    }
}

export class UserStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/user.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async register(email, passwort) {
        if (!(email && passwort)) {
            throw new Error('no user');
        }
        let user = new User(email, passwort);
        return await this.db.insert(user);
    }

    async authenticate(email, passwort) {
        if (!(email && passwort)) {
            return false;
        }
        let user = await this.db.findOne({email: email});
        if (user == null) {
            await this.register(email, passwort);
            return true;
        }
        else {
            return user.passwortHash === CryptoUtil.hashPwd(passwort)
        }
    }
}
export const userStore = new UserStore();

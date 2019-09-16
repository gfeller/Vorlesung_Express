import Datastore from 'nedb-promise'
import {CryptoUtil} from '../utils/cryptoUtil';

export class User {
    constructor(email, passwort) {
        this.email = email;
        this.passwortHash = CryptoUtil.hashPwd(passwort);
    }
}

export class UserStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/user.db', autoload: true});
    }

    async register(email, passwort) {
        if (!(email && passwort)) {
            throw new Error('no user');
        }
        let user = new User(email, passwort);
        return await this.db.insert(user);
    }

    async authenticate(email, passwort, callback) {
        if (!(email && passwort)) {
            return false;
        }
        let user = await this.db.findOne({email: email});
        if (user == null) {
            await this.register(email, passwort, callback);
            return true;
        }
        else {
            return user.passwortHash === CryptoUtil.hashPwd(passwort)
        }
    }
}
export const userStore = new UserStore();

import Datastore from '@seald-io/nedb'

import {CryptoUtil} from '../utils/crypto-util.js';
import {CONFIG} from "../../2_view/config.js";

export class User {
    constructor(email, passwort, isAdmin = false) {
        this.email = email;
        this.passwortHash = CryptoUtil.hashPwd(passwort);
        this.isAdmin = isAdmin
    }
}


export class UserStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: CONFIG.data("user.db"), autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async register(email, passwort) {
        if (!(email && passwort)) {
            throw new Error('missing data');
        }
        let user = new User(email, passwort, false);
        return this.db.insertAsync(user);
    }

    async authenticate(email, passwort) {
        if (!(email && passwort)) {
            return false;
        }
        let user = await this.findByEmail(email);

        if (user == null) {
            // NOTE: in real application the register should be a separated.
            await this.register(email, passwort);
            return true;
        } else {
            return user.passwortHash === CryptoUtil.hashPwd(passwort)
        }
    }

    async all() {
        return this.db.find({});
    }

    async findByEmail(email) {
        return  this.db.findOneAsync({email});
    }


    async registerAdmin(email, passwort) {
        if (!(email && passwort)) {
            throw new Error('missing data');
        }
        let user = new User(email, passwort, true);
        return this.db.insertAsync(user);
    }
}
export const userStore = new UserStore();

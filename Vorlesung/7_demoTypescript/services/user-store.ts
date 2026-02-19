import Datastore from '@seald-io/nedb'
import {CryptoUtil} from '../utils/crypto-util';

export class User {
    public email: string;
    public passwortHash: string;

    constructor(email: string, passwort: string) {
        this.email = email;
        this.passwortHash = CryptoUtil.hashPwd(passwort);
    }
}

export class UserStore {
    private db: Datastore<User>;

    constructor(db?: Datastore<User>) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/user.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async register(email: string, passwort: string) {
        if (!(email && passwort)) {
            throw new Error('no user');
        }
        const user = new User(email, passwort);
        return this.db.insertAsync(user);
    }

    async authenticate(email: string, passwort: string) {
        if (!(email && passwort)) {
            return false;
        }
        const user = await this.db.findOneAsync({email: email});
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

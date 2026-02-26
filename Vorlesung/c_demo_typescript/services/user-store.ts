import Datastore from '@seald-io/nedb'
import {CryptoUtil} from '../utils/crypto-util';
import {z} from "zod";

export class User {
    public email: string;
    public passwortHash: string;

    constructor(email: string, passwort: string) {
        this.email = email;
        this.passwortHash = CryptoUtil.hashPwd(passwort);
    }
}

export const LoginSchema = z.object({
    email: z.email(),
    pwd: z.string(),
});
export type Login = z.infer<typeof LoginSchema>;


export class UserStore {
    private db: Datastore<User>;

    constructor(db?: Datastore<User>) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/user.db', autoload: true} : {}
        this.db = db || new Datastore(options);

        this.db.ensureIndexAsync({ fieldName: 'email', unique: true })
    }


    async register(data: Login) {
        const { email, pwd } = data;

        let user = new User(email, pwd);
        return this.db.insertAsync(user);
    }

    async authenticate(data: Login) {
        const { email, pwd } = data;

        let user = await this.findByEmail(email);

        if (user == null) {
            // NOTE: in real application the register should be a separated.
            await this.register(data);
            return true;
        } else {
            return user.passwortHash === CryptoUtil.hashPwd(pwd)
        }
    }

    async all() {
        return this.db.findAsync({}, {multi: true});
    }

    async findByEmail(email: string) {
        return this.db.findOneAsync({email});
    }
}
export const userStore = new UserStore();

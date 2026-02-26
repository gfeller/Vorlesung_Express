import {Request} from "express";
import {CONFIG} from "../config";
import {CryptoUtil} from "../utils/crypto-util";
import {userStore} from "./user-store";


export class SecurityService {
    isLoggedIn(req: Request) {
        return req.auth != null;
    }


    currentUser(req: Request) {
        return req.auth.email;
    }


    async createJWT(email: string) {
        const user = await userStore.findByEmail(email);
        if (user) {
            return CryptoUtil.createJWT({email: user.email});
        }
        throw new Error();
    }
}

export const securityService = new SecurityService()

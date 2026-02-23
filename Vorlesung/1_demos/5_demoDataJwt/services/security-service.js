import {userStore, CryptoUtil} from "../../shared.js"

export class SecurityService {
    isLoggedIn(req) {
        return req.auth != null;
    }


    currentUser(req) {
        return req.auth.email;
    }


    async createJWT(email, secret, options) {
        const user = await userStore.findByEmail(email);
        if (user) {
            return CryptoUtil.createJWT({email: user.email, isAdmin: user.isAdmin}, secret, options);
        }
        throw new Error();
    }
}

export const securityService = new SecurityService()
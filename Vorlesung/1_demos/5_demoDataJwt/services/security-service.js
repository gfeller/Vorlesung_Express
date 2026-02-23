import {userStore, CryptoUtil} from "../../shared.js"

export class SecurityService {
    isLoggedIn(req) {
        return req.auth != null;
    }


    currentUser(req) {
        return req.auth.name;
    }


    async createJWT(email, secret, options) {
        const user = await userStore.findByEmail(email);
        if (user) {
            throw new Error();
        }
        return CryptoUtil.createJWT({email: user.email, isAdmin: iuser.isAdmin}, secret, options);
    }
}

export const securityService = new SecurityService()
import {userStore, CryptoUtil, CONFIG} from "../../shared.js"

export class SecurityService {
    isLoggedIn(req) {
        return req.auth != null;
    }


    currentUser(req) {
        return req.auth.email;
    }


    async createJWT(email, secret = CONFIG.jwt_secret, options =  CONFIG.jwt_sign) {
        const user = await userStore.findByEmail(email);
        if (user) {
            return CryptoUtil.createJWT({email: user.email, isAdmin: user.isAdmin}, secret, options);
        }
        throw new Error();
    }
}

export const securityService = new SecurityService()
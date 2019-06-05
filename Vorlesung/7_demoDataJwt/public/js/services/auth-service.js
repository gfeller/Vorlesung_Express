import { httpService, tokenKey } from './http-service.js'
import { valueStorage } from './value-storage.js'

class AuthService {
    async login(userName, pwd) {
        const token = await httpService.ajax("POST", "/login/", { email: userName, pwd: pwd });
        valueStorage.setItem(tokenKey, token);
        return token;
    }

    logout() {
        valueStorage.setItem(tokenKey, undefined);
    }

    isLoggedIn() {
        return !!valueStorage.getItem(tokenKey);
    }  
}

export const authService = new AuthService();
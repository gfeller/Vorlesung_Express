import { httpService } from './http-service.js'

class AuthService {
    async login(userName, pwd) {
        const token = await httpService.ajax("POST", "/login/", { email: userName, pwd: pwd });
        httpService.setAuthToken(token)
        return token;
    }

    logout() {
        httpService.removeAuthToken();
    }

    isLoggedIn() {
        return httpService.hasAuthToken();
    }  
}

export const authService = new AuthService();
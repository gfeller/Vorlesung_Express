import {httpService} from './http-service.js'


class AuthService {
    async login(userName, pwd) {
        const authQuery = `mutation{
            authenticate(input: {email: "${userName}", passwort: "${pwd}"}){
                token
                isAdmin
              }
            }`;

        const token = (await httpService.ajax(authQuery)).authenticate.token;
        httpService.setAuthToken(token);
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

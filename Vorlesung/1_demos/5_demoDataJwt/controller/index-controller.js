import {securityService} from '../services/security-service.js';
import {userStore} from "../../shared.js";



export class IndexController {
    login = async (req, res) => {
        await securityService.handleLogin(req, res);

        if (securityService.isLoggedIn(req)) {
            res.send(true);
        }
        else {
            const {email, pwd} = req.body;
            if (await userStore.authenticate(email, pwd)) {
                let token = await securityService.createJWT(email, req.app.get("jwt-secret"), req.app.get("jwt-sign"));
                res.json(token);
            }
            else {
                res.status("401").json(false);
            }
        }
    };
}

export const indexController = new IndexController();

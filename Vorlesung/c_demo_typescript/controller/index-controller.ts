import {Request, Response} from "express";
import {z} from "zod";

import {securityService} from '../services/security-service';
import {userStore} from "../services/user-store";

const loginBodySchema = z.object({
    email: z.email(),
    pwd: z.string(),
});


export class IndexController {
    login = async (req: Request, res: Response) => {
        if (securityService.isLoggedIn(req)) {
            res.status(204).send();
            return;
        }
        const {error, data} = loginBodySchema.safeParse(req.body);

        if (data) {
            if (await userStore.authenticate(data.email, data.pwd)) {
                let token = await securityService.createJWT(data.email);
                res.json(token);
            } else {
                res.status(401).json(false);
            }
        } else {
            res.status(400).send({error: error});
            return;
        }
    }
}

export const indexController = new IndexController();

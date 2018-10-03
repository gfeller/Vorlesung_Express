import {SecurityUtil} from '../utils/security';

export class IndexController {
    async login(req, res) {

        SecurityUtil.handleLogin(req, res);
    };
}

export const indexController = new IndexController();

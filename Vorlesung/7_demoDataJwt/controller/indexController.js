import {SecurityUtil} from '../utils/security.js';

export class IndexController {
    async login(req, res) {

        SecurityUtil.handleLogin(req, res);
    };
}

export const indexController = new IndexController();

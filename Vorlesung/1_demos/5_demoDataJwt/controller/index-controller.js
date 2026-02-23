import {SecurityUtil} from '../utils/security.js';

export class IndexController {
    login = async (req, res) => {
        await SecurityUtil.handleLogin(req, res);
    };
}

export const indexController = new IndexController();

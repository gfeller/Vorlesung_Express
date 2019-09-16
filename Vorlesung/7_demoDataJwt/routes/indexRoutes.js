import express from 'express';

const router = express.Router();
import {indexController} from '../controller/indexController';

router.post("/login", indexController.login.bind(indexController));

export const indexRoutes = router;
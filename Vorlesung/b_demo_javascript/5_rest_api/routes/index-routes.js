import express from 'express';

const router = express.Router();
import {indexController} from '../controller/index-controller.js';

router.post("/login", indexController.login);

export const indexRoutes = router;

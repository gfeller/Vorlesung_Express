import express from 'express';

const router = express.Router();
import {indexController} from '../controller/indexController.js';

router.post("/login", indexController.login);

export const indexRoutes = router;

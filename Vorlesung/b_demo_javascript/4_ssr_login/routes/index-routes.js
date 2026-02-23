import express from 'express';

const router = express.Router();
import {indexController} from '../controller/index-controller.js';

router.get("/", indexController.index);
router.post("/login", indexController.login);
router.post("/logout", indexController.logout);

export const indexRoutes = router;

import express from 'express';

const router = express.Router();
import {indexController} from '../controller/indexController.js';

router.get("/", indexController.index.bind(indexController));
router.post("/login", indexController.login.bind(indexController));
router.post("/logout", indexController.logout.bind(indexController));

export const indexRoutes = router;

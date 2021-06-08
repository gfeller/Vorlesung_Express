import express from 'express';

const router = express.Router();
import {indexController} from '../controller/indexController.js';

router.get("/", indexController.index.bind(indexController));

export const indexRoutes = router;

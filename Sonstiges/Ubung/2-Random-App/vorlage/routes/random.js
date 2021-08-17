import express from 'express';
const router = express.Router();

import * as randomController from '../controllers/random-controller.js'

// TODO Routes
router.get('/',  randomController.index);


export const randomRoutes = router;

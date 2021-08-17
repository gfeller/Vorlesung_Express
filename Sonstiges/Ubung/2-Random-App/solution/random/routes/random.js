import express from 'express';
const router = express.Router();

import * as randomController from '../controllers/random-controller.js'

router.get('/',  randomController.index);
router.get('/random', randomController.renderRandomResult);
router.post('/random', randomController.redirectToRandomResult);

export const indexRoutes = router;

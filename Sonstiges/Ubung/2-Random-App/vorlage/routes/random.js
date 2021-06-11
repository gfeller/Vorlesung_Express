import express from 'express';
const router = express.Router();

import * as randomController from '../controllers/randomController.js'

// TODO Routes
router.get('/',  randomController.index);


export const randomRoutes = router;

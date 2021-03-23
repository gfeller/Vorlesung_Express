import express from 'express';

// app
const app = express();
const router = express.Router();

router.get("/", (req, res) => res.end("Hello World"));

app.use(router);

export default app;

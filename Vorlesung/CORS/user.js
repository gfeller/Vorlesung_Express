import express from 'express';
import {dirname} from "path";
import {fileURLToPath} from "url";
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname));

app.listen(3001, function () {
    console.log('Example app listening on port http://localhost:3001/');
});

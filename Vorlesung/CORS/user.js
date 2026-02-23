import express from 'express';
const app = express();

const __dirname = import.meta.dirname;
app.use(express.static(__dirname));

app.listen(3001, function () {
    console.log('Example app listening on port http://localhost:3001/');
});

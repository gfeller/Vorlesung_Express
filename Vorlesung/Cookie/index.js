import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser("secret"));

app.get("/cookieDemo/*", function (req, res) {
    console.log(JSON.stringify(req.cookies));
    res.cookie("url", req.url);
    if (req.cookies.url) {
        res.end("dein letzter besuch: " + req.cookies.url)
    } else {
        res.end("Dein erster besuch?!")
    }
});

app.listen(3000, function () {
    console.log('listening on http://localhost:3000');
});

var express = require('express');
var app = express();
app.use(require("cookie-parser")());


app.get("/cookie/*", function(req,res){
    console.log(JSON.stringify(req.cookies));
    res.cookie("url", req.url);
    if(req.cookies.url)
    {
        res.end("dein letzter besuch: "+ req.cookies.url)
    }
    else{
        res.end("Dein erster besuch?!")
    }
});

app.listen(3000);


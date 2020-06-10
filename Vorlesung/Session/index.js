const express = require('express');
const session = require('express-session');

const app = express();

app.use(require("cookie-parser")()); // not required for session middleware. Needed for: console.log(JSON.stringify(req.cookies));
app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));

app.get("/*", function (req, res) {
    console.log(JSON.stringify(req.cookies));
    if (req.session.counter) {
        req.session.counter++;
    }
    else {
        req.session.counter = 1;
    }
    res.end(`Dein ${req.session.counter} besuch`);
});

app.listen(3000, function () {
    console.log('listening on http://localhost:3000');
});

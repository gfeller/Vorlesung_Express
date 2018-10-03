const express = require('express');
const session = require('express-session');

const app = express();

const sessionUserSettings = (req, res, next) => {
    // default Wert oder aktueller Wert von der Session lesen
    const userSettings = req.session.userSettings || {orderBy: 'default', orderDirection: -1};
    const {orderBy, orderDirection} = req.query;

    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection;
    }
    req.userSettings = req.session.userSettings = userSettings;

    next();
};

app.use(session({secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true}));
app.use(sessionUserSettings);

app.get("/*", function (req, res) {
    res.write(`<p><a href="/test">Refresh</a></p>`);
    res.write(`<p><a href="/test?orderBy='a'">Neu: orderBy='a'</a></p>`);
    res.write(`<p><a href="/test?orderBy='b'">Neu: orderBy='b'</a></p>`);
    res.write(`<p><a href="/test?orderBy='a'&orderDirection='-1">orderBy='a' und orderDirection=-1</a></p>`);
    res.write(`<p><a href="/test?orderBy='c'&orderDirection='1">orderBy='c' und orderDirection=1</a></p>`);
    res.end(`Aktuelle userSettings: ${JSON.stringify(req.userSettings)}`);
});

app.listen(3000, function () {
    console.log('listening on http://localhost:3000');
});
const jwt = require('jsonwebtoken');
const userService = require('../services/userStore.js');

function publicIsLoggedIn(req)
{
    return Boolean(req.session.token || req.user);
}

function clearLogin(req){
    if(req.session) {
        req.session.token = null;
    }
}

function authenticated(req, res, next){

    if(publicIsLoggedIn(req))
    {
        next();
    }
    else
    {
        res.format({
            'text/html': function () {
                res.render("login", { backref : req.originalUrl});
            },
            'application/json': function () {
                res.status(401).send(false);
            }
        });
    }
}

function currentUser(req)
{
    return req.user.name;
}


function createSessionToken(name, secret, options, callback)
{
    if(!name){
        return "";
    }
    jwt.sign({ name }, secret, options, (err, token) => callback(token));
}

function handleLogin(req,res) {
    userService.authenticate(req.body.email, req.body.pwd, function (err, valid) {
        if (valid) {
            createSessionToken(req.body.email, req.app.get("jwt-secret"), req.app.get("jwt-sign"), (token) => {
                    res.format({
                        'text/html': function () {
                            req.session.token = token;
                            if (req.body._backref) {
                                res.redirect(req.body._backref);
                            }
                            else {
                                res.redirect("/");
                            }
                        },
                        'application/json': function () {
                            res.json(token)
                        }
                    });
                }
            );
        }
        else {
            res.status("401").json(false);
        }

    });
}

module.exports = {clearLogin : clearLogin, isLoggedIn : publicIsLoggedIn, handleAuthenticate :authenticated , current : currentUser, createToken : createSessionToken, handleLogin : handleLogin};
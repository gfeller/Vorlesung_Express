var crypto = require('crypto');
var userService = require('../services/userStore.js');

var tokens = {};
var tokensBack = {};


function publicIsLoggedIn(req)
{
    if( req.body.token)
    {
        return !!tokensBack[req.body.token];
    }
    return !!req.session.name;
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
    if( req.body.token)
    {
        return tokensBack[req.body.token];
    }
    return req.session.name;
}


function createSessionToken(name)
{
    if(!name){
        return "";
    }

    if(!tokens[name]){
        var token= crypto.randomBytes(48).toString('hex'); //Sync!!
        tokens[name] = token;
        tokensBack[token] = name;
    }
    return tokens[name];
}

function handleLogin(req,res)
{
    if (publicIsLoggedIn(req))
    {
        res.format({
            'text/html': function () {
                res.redirect("/");
            },
            'application/json': function () {
                res.send(true);
            },
        });
    }
    else {
        userService.authenticate(req.body.email, req.body.pwd, function (err, valid) {
            if (valid) {
                res.format({
                    'text/html': function () {
                        req.session.name = req.body.email;
                        if (req.body._backref) {
                            res.redirect(req.body._backref);
                        }
                        else {
                            res.redirect("/");
                        }
                    },
                    'application/json': function () {
                        res.json(createSessionToken(req.body.email));
                    }
                });
            }
            else{
                res.format({
                    'text/html': function () {
                        res.status("401").redirect("/");
                    },
                    'application/json': function () {
                        res.status("401").json(false);
                    }
                });
            }
        });
    }
}


function clearLoginInformation(req)
{
    if(req.body.token)
    {
        var name = tokensBack[req.body.token];
        if(name)
        {
            delete tokensBack[req.body.token];
            delete tokens[name];
        }
    }
    if(req.session.name) {
        req.session.name = null;
    }
}

module.exports = {isLoggedIn : publicIsLoggedIn, handleAuthenticate :authenticated , current : currentUser, createToken : createSessionToken, handleLogin : handleLogin, clearLogin : clearLoginInformation};
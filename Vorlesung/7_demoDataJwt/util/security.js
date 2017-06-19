const jwt = require('jsonwebtoken');
const userService = require('../services/userStore.js');

function publicIsLoggedIn(req)
{
    return req.user != null;
}

function authenticated(req, res, next){

    if(publicIsLoggedIn(req))
    {
        next();
    }
    else
    {
        res.status(401).send(false);
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

function handleLogin(req,res)
{
    if (publicIsLoggedIn(req))
    {
        res.send(true);
    }
    else {
        userService.authenticate(req.body.email, req.body.pwd, function (err, valid) {
            if (valid) {
                createSessionToken(req.body.email, req.app.get("jwt-secret"),req.app.get("jwt-sign"),  (token) => res.json(token));
            }
            else{
                res.status("401").json(false);
            }
        });
    }
}

module.exports = {isLoggedIn : publicIsLoggedIn, handleAuthenticate :authenticated , current : currentUser, createToken : createSessionToken, handleLogin : handleLogin};
function publicIsLoggedIn(req)
{
    return !!req.session.name;
}


function authenticated(req, res, next){
    if(publicIsLoggedIn(req))
    {
        next();
    }
    else
    {
        res.render("login", { backref : req.originalUrl});
    }
}

function currentUser(req)
{
    return req.session.name;
}


module.exports = {isLoggedIn : publicIsLoggedIn, handleAuthenticate :authenticated , current : currentUser};
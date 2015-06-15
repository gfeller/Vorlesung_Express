function isLoggedIn(req)
{
    return !!req.session.name;
}


function handleAuthenticate(req, res, next){
    if(isLoggedIn(req))
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


module.exports = {isLoggedIn : isLoggedIn, handleAuthenticate :handleAuthenticate , current : currentUser};
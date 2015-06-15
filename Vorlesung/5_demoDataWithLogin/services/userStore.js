var Datastore = require('nedb');
var db = new Datastore({ filename: './data/user.db', autoload: true });

function User(email, passwort)
{
    this.email = email;
    this.passwort = passwort;
}


function publicRegisterUser(email, passwort, callback)
{
    if(!(email && passwort)) {  callback("no user", null); }

    var user = new User(email, passwort);
    db.insert(user, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicAuthentication(email, passwort, callback){
    if(!(email && passwort)) {  callback(false); }

    db.findOne({ email: email }, function (err, doc) {
        if(doc == null && !err){
            publicRegisterUser(email, passwort, callback);
        }
        else {
            callback(err, doc && doc.passwort == passwort);
        }
    });
}

module.exports = {add : publicRegisterUser, authenticate : publicAuthentication};
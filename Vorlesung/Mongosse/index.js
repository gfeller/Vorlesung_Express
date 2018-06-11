const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/demo2');

const User = require('./User.js');

function createUser(mail, pwd) {

    const u = new User({email: mail, passwordHash: pwd, dummy: "1234"});
    return u.save().then(() => console.log("Kein Problem")).catch(err => console.log('Problem: ' + err.message));
}

createUser("mgfeller@hsr.ch", "123");
createUser("mgfeller@hsr.ch", "123456789").then(checkUser, checkUser);

function checkUser() {
    return User.findByEmailAndPassword("mgfeller@hsr.ch", "123456789", function (err, user) {
        if (user) {
            console.log(`${user.passwordHash} ${user.email} ${user.dummy}`);
        }
        else {
            console.log("wrong user or password");
        }
    });
}


//"C:\Program Files (x86)\MongoDB\Server\3.0\bin\mongod.exe" --dbpath c:\temp\mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test2');

var User = require('./User.js');

function createUser(mail, pwd){
    var u = new User({email: mail, passwordHash: pwd, dummy: "1234"});
    var x = u.save(function(err) {
        if (err) {
            console.log('Problem: ' + err.message);
        } else {
            console.log('Kein Problem');
        }
        test();
    });
}

createUser("mgfeller@hsr.ch", "123");
createUser("mgfeller@hsr.ch", "123456789");

function test() {


    User.findByEmailAndPassword("mgfeller@hsr.ch", "123456789", function (err, user) {
        if (user) {
            console.log(`${user.passwordHash} ${user.email} ${user.dummy}`);
        }
        else {
            console.log("wrong user or password");
        }
    });
}


//createUser("mgfeller@hsr.ch", 123456789);

//"C:\Program Files (x86)\MongoDB\Server\3.0\bin\mongod.exe" --dbpath c:\temp\mongodb
// --expose_debug_as=v8debug
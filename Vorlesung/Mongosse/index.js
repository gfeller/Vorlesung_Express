import mongoose from 'mongoose';
import {User} from './User.js';

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/demo2',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


async function createUser(mail, pwd) {

    const u = new User({email: mail, passwordHash: pwd, dummy: "1234"});
    try {
        await u.save();
        console.log("Kein Problem")
    } catch (err) {
        console.log('Problem: ' + err.message)
    }
}

await createUser("michael.gfeller@ost.ch", "123");
await createUser("michael.gfeller@ost.ch", "123456789");
checkUser()

function checkUser() {
    return User.findByEmailAndPassword("michael.gfeller@ost.ch", "123456789", function (err, user) {
        if (user) {
            console.log(`${user.passwordHash} ${user.email} ${user.dummy}`);
        } else {
            console.log("wrong user or password");
        }
    });
}


//"C:\Program Files (x86)\MongoDB\Server\3.0\bin\mongod.exe" --dbpath c:\temp\mongodb

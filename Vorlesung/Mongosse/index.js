import mongoose from 'mongoose';
import {User} from './User.js';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/demo5',
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
        console.log('\x1b[33m', err.message, '\x1b[0m');
    }
}

await createUser("michael.gfeller@ost.ch", "123");
await createUser("michael.gfeller@ost.ch", "123456789");
await checkUser("michael.gfeller@ost.ch", "123")
await checkUser("michael.gfeller@ost.ch", "123456789")

async function checkUser(mail, pwd) {
    try{
        const user = await User.findByEmailAndPassword(mail, pwd);
        console.log(`${user.passwordHash} ${user.email} ${user.dummy}`);
    }
    catch( error ) {
        console.log('\x1b[33m', error, '\x1b[0m');
    }
}


//"C:\Program Files (x86)\MongoDB\Server\3.0\bin\mongod.exe" --dbpath c:\temp\mongodb

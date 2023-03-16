import mongoose from 'mongoose';
import {User, Order} from './User.js';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/demo0',
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

const user = await User.findByEmailAndPassword("michael.gfeller@ost.ch", "123456789");

async function checkUser(mail, pwd) {
    try{
        const user = await User.findByEmailAndPassword(mail, pwd);
        console.log(`${user.passwordHash} ${user.email} ${user.dummy}`);
    }
    catch( error ) {
        console.log('\x1b[33m', error, '\x1b[0m');
    }
}

const order = new Order({order: "Hawaii", orderBy: user._id})
await order.save()
const savedOrder = await Order.findById(order._id).populate("orderBy").exec();
console.log(`${savedOrder.order} ordered by ${savedOrder.orderBy.email}`);


await User.deleteOne({_id: user._id})
const savedOrder2A = await Order.findById(order._id).populate("orderBy").exec();
console.log(`${savedOrder2A.order} ordered by ${savedOrder2A.orderBy?.email}`);
const savedOrder2B = await Order.findById(order._id).exec();
console.log(`${savedOrder2B.order} ordered by ${savedOrder2B.orderBy}`);

await mongoose.disconnect();
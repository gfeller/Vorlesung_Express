import mongoose from 'mongoose';
import crypto from 'crypto';
const { Schema } = mongoose;


const REQUIRED_PASSWORD_LENGTH = 8;

function validateStringLength(value) {
    return value && value.length >= REQUIRED_PASSWORD_LENGTH
}

const schema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    passwordHash: {
        type: String,
        required: true,
        validate: [validateStringLength, 'is too short (minimum is ' + REQUIRED_PASSWORD_LENGTH + ' characters']
    }
});





schema.pre('save', function (next) {
    let self = this;

    if (!self.isModified('passwordHash')) {
        return next();
    }
    self.passwordHash = crypto.createHash('md5').update(self.passwordHash).digest('hex'); //besser wenn asynchrone
    next();
});

schema.statics.findByEmailAndPassword = async function findByEmailAndPassword(email, password, cb) {
    return this.findOne({email: email}).then(user => {
        let pwdHash = crypto.createHash('md5').update(password).digest('hex'); //besser wenn asynchrone
        user = pwdHash === user.passwordHash ? user : null;
        if(!user){
            return Promise.reject("ERR_AUTH_0001: WRONG PASSWORD OR USERNAME")
        }
        return user;
    })
};

export const User = mongoose.model('User', schema);


const orderSchema = mongoose.Schema({
    order: {type: String, required: true},
    orderBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const Order = mongoose.model('Order', orderSchema);


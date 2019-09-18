const mongoose = require('mongoose');
const crypto = require('crypto');

const REQUIRED_PASSWORD_LENGTH = 8;

function validateStringLength(value) {
    return value && value.length >= REQUIRED_PASSWORD_LENGTH
}

const schema = mongoose.Schema({
      email: {type: String, required: true, unique: true}
    , passwordHash: {type: String, required: true, validate: [validateStringLength, 'is too short (minimum is ' + REQUIRED_PASSWORD_LENGTH + ' characters']}
});


schema.pre('save', function(next) {
    let self = this;

    if (!self.isModified('passwordHash')){
        return next();
    }
    self.passwordHash = crypto.createHash('md5').update(self.passwordHash).digest('hex'); //besser wenn asynchrone
    next();
});

schema.statics.findByEmailAndPassword = function findByEmailAndPassword(email,password,cb) {
    this.findOne({email:email}, function(err,user) {
        if (err)
        {
            return cb(err);
        }
        if (!user) {
            return cb();
        }

        let pwdHash = crypto.createHash('md5').update(password).digest('hex'); //besser wenn asynchrone

        return cb(err, pwdHash === user.passwordHash ? user : null)
    });
};

const Model = mongoose.model('User', schema);
module.exports = Model;

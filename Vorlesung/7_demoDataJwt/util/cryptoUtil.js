const crypto = require('crypto');

function hashPwd(pwd){
    return crypto.createHmac('sha256', "secret!") //more information: https://nodejs.org/api/crypto.html
        .update(pwd)
        .digest('hex');
}

module.exports = {hashPwd};
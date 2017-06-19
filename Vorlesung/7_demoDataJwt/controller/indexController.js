const util = require('../util/security');


module.exports.login = function(req, res) {
    util.handleLogin(req, res);
};
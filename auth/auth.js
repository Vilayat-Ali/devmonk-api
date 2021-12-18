const jwt = require('jsonwebtoken');

/*
USERINFO

{
    username: 'name',
    email: 'email'
}

*/

module.exports.generateToken = (userInfo, key) => {
    const token = jwt.sign(userInfo, key, {expiresIn: (60*60*24)}); // Valid for 1 day
    return token;
}
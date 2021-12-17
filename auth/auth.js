const jwt = require('jsonwebtoken');

/*
USERINFO

{
    username: 'name',
    email: 'email'
}

*/

module.exports.generateToken = (userInfo) => {
    const token = jwt.sign(userInfo, process.env.SECRET_TOKEN, {expiresIn: (60*60*24)}); // Valid for 1 day
    return token;
}
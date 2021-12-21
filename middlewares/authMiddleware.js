const jwt = require('jsonwebtoken');

module.exports.isAuthenticated = function(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.json({success: false, message: 'Token not found.'});
    } 
    else{
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if(err){
            res.json({success: false, message: err.message});
        }
        req.user = user;
        next();
    });
}
}
const userModel = require('./../models/user');
const hash = require('./../util/hash');
const auth = require('./../auth/auth');

// signing up a user
module.exports.signup = async function(req, res){
    try{
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hash.hashString(req.body.password)
        });

        const createdUser = await newUser.save();

        const accessToken = auth.generateToken({
            username: req.body.username,
            email: req.body.email
        }, process.env.SECRET_TOKEN);

        res.json(
            {
                success: true, message: "User created successfully",
                data: {
                     username: createdUser.username,
                      email: createdUser.email 
                    },
                     accessToken: accessToken});
    }catch(err){
        if(err) res.json({success: false, message: err.message, data: { username: req.body.username, email: req.body.email }});
    }
}

// refreshing token 
module.exports.refreshToken = async function(req, res){
    const refreshToken = req.body.refreshToken;
    const user = await userModel.findOne({username : req.body.username, email : req.body.email}, {password: 0});
    const tokens = user.token;
    if(tokens === null) return res.sendStatus(401);
    if(!tokens.include(refreshToken)) return res.sendStatus(403);
    jwt.verify({username: req.body.username, email: req.body.email}, process.env.REFRESH_TOKEN, (user, err) => {
        if(err) return res.sendStatus(403);
        const accessToken = auth.generateToken({username: req.body.username, email: req.body.email}, process.env.SECRET_TOKEN);
        res.json({accessToken});
    })
}

// logging in the user 
module.exports.login = async function(req, res){
try{
    const user = await userModel.findOne({email: req.body.email});
    if(user){ // user found
        if(hash.compareHash(req.body.password, user.password)){
            const accessToken = auth.generateToken({username: req.body.username, email: req.body.email}, process.env.SECRET_TOKEN);
            const refreshToken = auth.generateToken({username: req.body.username, email: req.body.email}, process.env.REFRESH_TOKEN);
            // storing in the database 
            const pushToken = await userModel.updateOne({email: req.body.email}, {
                $push: {token: refreshToken}
            });
            res.json({success: true, message: "User has logged in successfully", accessToken, refreshToken});
        }else{
            res.json({success: false, message: "Invalid credentials"});
        }
    }
}catch(err){
    if(err) res.json({success: false, message: err.message})
}
}

// logout 
module.exports.logout = async function(){
    const currentAccessToken = await userModel.updateOne({email: req.user.email}, {
        $pull: {
            tokens: currentAccessToken
        }
    });
}

// getting all users 
module.exports.getAllUsers = async function(req, res){
    try{
        const allUsers = await userModel.find({},{password:0});
        res.json({success: true, message: "User data has been fetched successfully", users: allUsers});
    }catch(err){
        res.json({success: false, message: err.message})
    }
}

// getting specific user
module.exports.getMe = async function(req, res){
    try{
        const user = await userModel.findOne({email: req.user.email},{ password: 0 });
        res.json({success: true, userssage: "User data has been fetched successfully", user: user});
    }catch(err){
        res.json({success: false, message: err.message})
    }
}
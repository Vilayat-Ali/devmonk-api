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
        });

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

// logging in the user 
module.exports.login = async function(req, res){
try{
    const user = await userModel.findOne({email: req.body.email});
    console.log()
    if(user){ // user found
        if(hash.compareHash(req.body.password, req.user.password)){
            const refreshToken = auth.generateToken({username: req.user.username, email: req.body.email});
            res.json({success: true, message: "User has logged in successfully", token: refreshToken});
        }else{
            res.json({success: false, message: "Invalid credentials"});
        }
    }
}catch(err){
    if(err) res.json({success: false, message: err.message})
}
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
const userModel = require('./../models/user');

// add a new friend to the list
module.exports.addFriend = async function(req, res){
    try{
        const addFriend = await userModel.findOneAndUpdate({ email: req.user.email }, {
            $push: {
                friends: {
                    f_username: req.body.friendname,
                    f_email: req.body.friendemail,
                    favourite_language: req.body.favourite_language
                }
            }
        }); 
        res.json({success: true, message: `${req.body.friendname} was added successfully`}); 
    }catch(err){
        if(err) res.json({success: false, message: err.message})
    }
}

// Delete a friend from the friend
module.exports.deleteFriend = async function(req, res){
    try{
        const removeFriend = await userModel.findOneAndUpdate({ email: req.user.email }, {
            $pull: {
                friends: {
                    f_username: req.body.friendname
                }
            }
        });
        res.json({success: true, message: `${req.body.friendname} was deleted successfully`});
    }catch(err){
        if(err) res.json({success: false, message: err.message})
    }
}

// Get friends /api/friend/get/:page/:pageCount
module.exports.getFriends = async function(req, res){
    try{
        const pageCount = parseInt(req.params.pageCount); // 10 friends to be presented per page
        const page = parseInt(req.params.page); 
        const user = await userModel.findOne({email: req.user.email}, {username: 0, password: 0, token: 0}); // getting user 
        const friends = user.friends;

        var start = (page-1)*pageCount;
        var end = (pageCount*page); // end + 1 {+1}

        const requiredFriendList = friends.slice(start,end);
        res.json({success: true, friends: requiredFriendList});

    }catch(err){
        if(err) res.json({success: false, message: err.message});
    }
}

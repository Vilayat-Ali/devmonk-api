const express = require('express');
const friendRouter = express.Router();

// Controllers
const friendControllers = require("./../controllers/friend.controllers");

// middleware 
const middleware = require('../middlewares/authMiddleware');

friendRouter.put('/create', middleware.isAuthenticated, friendControllers.addFriend);
friendRouter.put('/delete', middleware.isAuthenticated, friendControllers.deleteFriend);
friendRouter.get('/get/:page/:pageCount', middleware.isAuthenticated, friendControllers.getFriends);

module.exports = friendRouter;
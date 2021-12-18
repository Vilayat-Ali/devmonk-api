const express = require('express');
const userRouter = express.Router();

// Controllers
const userControllers = require("./../controllers/userController");

// middleware 
const middleware = require('../middlewares/authMiddleware');

userRouter.post('/signup', userControllers.signup);
userRouter.post('/login', userControllers.login);
userRouter.put('/logout', userControllers.logout);
userRouter.put('/token', userControllers.refreshToken);
userRouter.get('/all', middleware.isAuthenticated, userControllers.getAllUsers);
userRouter.post('/me', middleware.isAuthenticated, userControllers.getMe);

module.exports = userRouter;
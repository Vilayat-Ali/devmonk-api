const express = require('express');
const userRouter = express.Router();

// User model
const userModel = require("./../models/user");

// Controllers
const userControllers = require("./../controllers/userController");

userRouter.get('/', userControllers.test);

module.exports = userRouter;
// Libraries
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
 
const app = express();
const port = Number(process.env.PORT || 5000);

// Configuring app instance 
dotenv.config();
app.use(express.json());

// connecting to the database

// importing user defined routes
const userRoutes = require('./routes/userRouter');

app.use('/api/user', userRoutes);

app.listen(port , () => {
    console.log(`🚀 Server running on port ${port}`);
})

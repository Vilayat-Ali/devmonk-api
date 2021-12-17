// Libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

// Configuring app instance 
app.use(express.json());
app.use(cors());

// connecting to the database
try{
    mongoose.connect(process.env.DB_URI).then(function(){
        console.log("Connected to DB successfully!");
    })
}catch(err){
    if(err) console.log(`DB Error: ${err.message}`);
}

// importing user defined routes
const userRoutes = require('./routes/userRouter');

// Mpping routes
app.use('/api/user', userRoutes);

app.listen(port , () => {
    console.log(`🚀 Server running on port ${port}`);
})

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

const routes = require('./Routes/taskRoute');

app.use(express.json());
app.use(cors());


dotenv.config();


const PORT = process.env.PORT || 3000;




mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    console.log("App is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

app.use('/', routes); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

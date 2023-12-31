const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const customerRoutes = require('./routes/customer');
const authRoutes = require('./routes/auth');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/dashboard', customerRoutes);
app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://BS14897-Test14:m7mkJNd4WJVhNRj7@cluster0.miq66.mongodb.net/test?retryWrites=true&w=majority')
    .then(result => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });


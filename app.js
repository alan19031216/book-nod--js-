const express = require('express');
const expressLogging = require('express-logging');
const logger = require('logops');
const passport = require('passport');
const bodyParser = require('body-parser');
const db = require('./config/config');
const book = require('./routes/API/book'); // Imports routes for the products
const app = express();

// logger
app.use(expressLogging(logger));

// passport
app.use(passport.initialize());
require('./routes/API/passport-auth')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/book', book);

let port = 27017;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
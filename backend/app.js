const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

// Back-End Routes
app.use('/register', registerRouter(db));
app.use('/login', loginRouter(db));

module.exports = app;

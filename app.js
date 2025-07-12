const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const mongoose = require('mongoose');

const { userModel } = require('./routes/user');  // ✅ Get the model
const indexRouter = require('./routes/index');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(expressSession({
    secret: 'Code_Thrust',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Use model methods from passport-local-mongoose
passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('server is running on port 3000');
});

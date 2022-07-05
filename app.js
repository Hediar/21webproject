require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./app_api/models/db');
require('./app_api/config/passport');

// var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var apiRouter = require('./app_api/routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));
app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-type, Accept, Authorization");
  next();
});

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// app.get('*', function(req, res, next) {
//   res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
// });

app.get(/(\/about)|(\/location\/[a-z0-9]{24})/, function(req, res, next) {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

// error handlers 2021250005 이세령
// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name ==='UnauthorizedError') {
    res
      .status(401)
      .json({"message" : err.name + ": " + err.message});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
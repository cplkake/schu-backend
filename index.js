const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./api/index');

const app = express();

// Establish connection to the MongoDB data cluster
require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.disable("x-powered-by");

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "Resource not found"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;

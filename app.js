var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose =  require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const todoRouter  = require('./routes/todo/todoRouter');
const recipeRouter = require('./routes/recipe/recipeRouter')

mongoose.connect("mongodb://localhost:27017/express-mongodb-promise", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MONGOBD CONNECTED')
})
.catch((e)=>{
  console.log(e)
})

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/todo', todoRouter)
app.use('/api/recipe', recipeRouter)

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

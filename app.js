var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public', 'dist')));
app.use('/css', express.static(path.join(__dirname, 'public', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'dist', 'js')));

app.use('/', indexRouter);


module.exports = app;
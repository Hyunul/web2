var createError = require('http-errors');
var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var boardRouter = require('./routes/board');
var app = express();
var port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/board', boardRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

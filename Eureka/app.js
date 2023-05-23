'use strict';
var debug = require('debug')('my express app');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var user = require('./routes/user');
var site = require('./routes/site');
var equip = require('./routes/equip');
var cobot = require('./routes/cobot');
var amr = require('./routes/amr');
var operation = require('./routes/operation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', user);
app.use('/site', site);
app.use('/equip', equip);
app.use('/cobot', cobot);
app.use('/amr', amr);
app.use('/operation', operation);

//swagger-ui
const { swaggerUi, specs, swaggerUIOptions } = require("./swagger/swagger")
app.use("/", swaggerUi.serve, swaggerUi.setup(specs, swaggerUIOptions));


// DB Test
const { getConnection } = require('./db/db');
async function testDBConnection() {
    try {
        const conn = await getConnection();
        console.log('DB 연결 성공');
        conn.release();
    } catch (err) {
        console.error('DB 연결 실패:', err);
    }
}

testDBConnection();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

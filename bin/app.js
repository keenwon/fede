'use strict';

var path = require('path'),
    fs = require('fs');

var express = require('express'),
    app = express(),
    argv = require('optimist').argv,
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jsInterceptor = require('./jsInterceptor'),
    mock = require('./mock');

var devDir = path.join(__dirname, '../dev'),
    mockDir = path.join(__dirname, '../mock');

// views
var helpers = require('./helpers')(argv.v || 'development');
for (var item in helpers) {
    if (helpers.hasOwnProperty(item)) {
        hbs.registerHelper(item, helpers[item]);
    }
}
app.set('views', devDir);
app.set('view engine', 'hbs');

// bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// intercept javascript
app.use(jsInterceptor(mockDir, devDir));

// static
app.use(express.static(devDir));

// logger
app.use(morgan('dev'));

// mock
mock(app, mockDir);

app.listen(3000);
console.log('Server running at http://localhost:3000/');
var path = require('path'),
    fs = require('fs');

var express = require('express'),
    app = express(),
    argv = require('optimist').argv,
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

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

// static
app.use(express.static(devDir));

// bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// logger
app.use(morgan('dev'));

// mock
var dirList = fs.readdirSync(mockDir);
dirList.forEach(function (item) {
    if (fs.statSync(mockDir + '/' + item).isDirectory()) {
        mock(mockDir + '/' + item);
    } else {
        require(mockDir + '/' + item)(app);
    }
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');
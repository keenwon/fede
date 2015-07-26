'use strict';

var fs = require('fs');

module.exports = mock;

function mock(app, dir) {
    var dirList = fs.readdirSync(dir);
    dirList.forEach(function (item) {
        if (fs.statSync(dir + '/' + item).isDirectory()) {
            mock(dir + '/' + item);
        } else if (item !== '_map.js') {
            require(dir + '/' + item)(app);
        }
    });
}
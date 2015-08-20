'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = mock;

function mock(app, dir) {
    var dirList = fs.readdirSync(dir),
        filePath;

    dirList.forEach(function (item) {
        filePath = path.join(dir, item);

        if (fs.statSync(filePath).isDirectory()) {
            mock(filePath);
        } else if (item !== '_map.js') {
            require(filePath)(app);
        }
    });
}
'use strict';

var fs = require('fs'),
    path = require('path'),
    util = require('util');

module.exports = mock;

function mock(app, dir) {
    var dirList = fs.readdirSync(dir),
        filePath;

    dirList.forEach(function (item) {
        filePath = path.join(dir, item);

        if (fs.statSync(filePath).isDirectory()) {
            mock(app, filePath);
        } else if (item !== '_map.js') {
            try {
                require(filePath)(app);
            } catch (e) {
                console.log(util.format('注意：文件"%s"不是变准的mock文件，已跳过', filePath));
            }
        }
    });
}
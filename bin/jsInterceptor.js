'use strict';

var path = require('path'),
    fs = require('fs');

module.exports = intercept;

function intercept(mockDir, staticDir) {
    return function (req, res, next) {
        // 如果存在mock map，执行拦截
        var mapFilePath = path.join(mockDir, '_map.js');
        if (!fs.existsSync(mapFilePath)) {
            next();
            return;
        }

        var mapRules = require(mapFilePath),
            pathname = req._parsedUrl.pathname,
            filePath = path.join(staticDir, pathname);

        if (!/.js$/.test(pathname)) {
            next();
            return;
        }

        if (fs.existsSync(filePath)) {
            var fileContent = fs.readFileSync(filePath).toString(),
                reg;

            Object.keys(mapRules).forEach(function (rule) {
                reg = new RegExp(rule, 'gm');
                fileContent = fileContent.replace(reg, mapRules[rule]);
            });

            res.set('Content-Type', 'text/javascript; charset=UTF-8');
            res.end(fileContent);
        } else {
            next();
        }
    };
}
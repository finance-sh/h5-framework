const fs = require('fs');
const path = require('path');

//回调
var readFile = function(realPath, callback) {
    fs.exists(realPath, function(exists) {
        if (!exists) {

            if (callback) callback(false);
        } else {
            var content = fs.readFileSync(realPath, 'utf-8');
            if (callback) callback(content);
        }
    })
};


exports.readFile = readFile;
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mockPath = './mockData';
var HtmlPath = '../dist';

var mine = require('./mine.js').types;

var isDev = process.env.NODE_ENV !== 'production';
//是否是开发模式


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

http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;

    var ext = path.extname(pathname);
    ext = ext ? ext.slice(1) : 'unknown';


    var realPath = path.join(HtmlPath, pathname);

    console.log(realPath);


    var contentType = mine[ext] || "text/plain";

    readFile(realPath, function(content) {
        response.writeHead(200, {
            'Content-Type': contentType
        });
        response.end(content);
    });



}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');

//http://blog.csdn.net/u011456337/article/details/50704331
//http://www.cnblogs.com/shawn-xie/archive/2013/06/06/3121173.html
//https://github.com/youyudehexie/node-webstatic
//http://blog.csdn.net/youyudehexie/article/details/11760059/
//http://www.jb51.net/article/57874.htm
//http://www.cnblogs.com/chyingp/p/node-learning-guide-path.html
const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs');
const url = require('url');
const app = express();

var isDev = process.env.NODE_ENV !== 'production';
//是否是开发模式
if (isDev) {
    var mockPath = path.resolve(__dirname, './server/mockData');
    var mockConfig = require('./mock.config.js');
    const readFile = require('./server/readFile.js').readFile;
    app.use(express.static(path.join(__dirname, 'dist'))) //设置静态资源目录
}

app.get('/', function(req, res) {
    res.send('Hello World!');
});
var setInterface = function(url, type, dataPath) {

    router.all('/*', function(req, res) {
        console.log(req);
        var method = req.method.toUpperCase();
        var proxy_url = 'http:www.xx.com/api';

        var options = {
            headers: {
                "Connection": "close"
            },
            url: proxy_url,
            method: method,
            json: true,
            body: req.body
        };

        function callback(error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log('------接口数据------', data);

                res.json(data)
            }
        }

        request(options, callback);
    })

    if (type === "get") {
        app.get(url, function(req, res) {
            var pathname = url.parse(req.url).pathname;
            var realPath = path.join(mockPath, pathname);
            var realPath = realPath + '.json';
            console.log(realPath);
            var file = readFile(realPath, function(content) {
                if (content !== false) {
                    res.send(content);
                } else {
                    res.send("22");
                }
            })
        })
    } else if (type === "post") {
        app.post(url, function(req, res) {
            var pathname = url.parse(req.url).pathname;
            var realPath = path.join(mockPath, pathname);
            var realPath = realPath + '.json';
            console.log(realPath);
            var file = readFile(realPath, function(content) {
                if (content !== false) {
                    res.send(content);
                } else {
                    res.send("22");
                }
            })
        })
    }
}

for (var i = 0, j = mockConfig.length; i < j; i++) {
    setInterface(mockConfig[i].url, mockConfig[i].type, mockConfig[i].dataPath)
}
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
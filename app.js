const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs');
const url = require('url');
const app = express();
var isDev = process.env.NODE_ENV !== 'production';
const proxy = require('./server/proxy.js');
//const tools = require('./lib/tools.js');
const ifProxy = true;
const proxyConfig = {
    host: 'localhost', // 这里是代理服务器       
    port: 80 // 这里是代理服务器端口 
}
//是否是开发模式
if (isDev) {
    var mockPath = path.resolve(__dirname, './server/mockData');
    var mockConfig = require('./mock.config.js');
    const readFile = require('./server/readFile.js').readFile;
    //设置静态资源目录
    app.use(express.static(path.join(__dirname, 'dist')))
    var setInterface = function(reqPath, type, dataPath) {
        if (reqPath.indexOf("?") !== "-1") {
            reqPath = reqPath.split("?")[0];
        }
        if (type === "get") {
            app.get(reqPath, function(req, res) {
                if (ifProxy) {
                    var params = req.query;
                    proxy(proxyConfig, reqPath, 'get', params, function(content) {
                        res.send(content);
                    });
                } else {
                    var realPath = path.join(mockPath, dataPath);
                    var file = readFile(realPath, function(content) {
                        if (content !== false) {
                            res.send(content);
                        } else {
                            res.send("查询失败");
                        }
                    })
                }
            })
        } else if (type === "post") {
            app.post(reqPath, function(req, res) {
                if (ifProxy) {
                    var params = req.query;
                    proxy(proxyConfig, reqPath, 'get', params, function(content) {
                        res.send(content);
                    });
                } else {
                    var realPath = path.join(mockPath, dataPath);
                    var file = readFile(realPath, function(content) {
                        if (content !== false) {
                            res.send(content);
                        } else {
                            res.send("查询失败");
                        }
                    })
                }
            })
        }
    }
    for (var i = 0, j = mockConfig.length; i < j; i++) {
        setInterface(mockConfig[i].url, mockConfig[i].type, mockConfig[i].dataPath)
    }
}
app.get('/', function(req, res) {
    res.send('Hello World!');
});
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
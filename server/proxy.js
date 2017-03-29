var http = require('http')
var proxy = function(reqPath, callback) {
    var options = {
        host: 'localhost', // 这里是代理服务器       
        port: 3001, // 这里是代理服务器端口 
        path: reqPath,
        method: 'get', //这里是发送的方法
        headers: {
            // 如果代理服务器需要认证
            'Proxy-Authentication': 'Base ' + new Buffer('user:password').toString('base64') // 替换为代理服务器用户名和密码
        }
    };
    var body = '';
    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        res.on('data', function(data) {
            body += data;
        }).on('end', function() {
            //console.log(res.headers)
            //console.log(body)
            if (callback) callback(body);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    })
    req.end();
}
module.exports = proxy;
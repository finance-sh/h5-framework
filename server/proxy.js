const http = require('http')
const querystring = require("querystring");
var proxy = function(proxConfig, reqPath, method, params, callback) {
    if (method === "get") {
        var getDate = querystring.stringify(params);
        var url = reqPath + '?' + getDate;
        var options = {
            host: proxConfig.host,
            port: proxConfig.port,
            path: url,
            method: 'GET'
        };
        var body = '';
        var req = http.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                //console.log(body);
                if (callback) callback(body);
            });
        });
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        req.end();
    } else if (method === "post") {
        var postDate = querystring.stringify(params);
        var options = {
            host: proxConfig.host, // 这里是代理服务器       
            port: proxConfig.port, // 这里是代理服务器端口 
            path: reqPath,
            method: method,
            headers: {
                //使用这个可以接收参数
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postDate),
                // 如果代理服务器需要认证
                'Proxy-Authentication': 'Base ' + new Buffer('user:password').toString('base64') // 替换为代理服务器用户名和密码
            }
        };
        var body = '';
        var req = http.request(options, (res) => {
            //console.log(`STATUS: ${res.statusCode}`);
            //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                if (callback) callback(body);
            });
        });
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        req.write(postDate);
        req.end();
    }
}
module.exports = proxy;
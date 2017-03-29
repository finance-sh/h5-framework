const path = require('path')
const proxy = require('./server/proxy.js');


var reqPath = '/mock/getNav';
proxy(reqPath);
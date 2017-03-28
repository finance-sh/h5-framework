##启动步骤：
1. `npm install`
2.  `npm start`启动
3. 访问 `http://localhost:3000`

##mock server 说明：
`package.json`中配置`start`的执行脚本，如果带上`--proxy`则会启动一个内置的mock server，不带此参数则不启动。

mock server 路由配置在`scripts/mockServer.js`中，参考接口配置示例。
mock server默认端口是9999，可在`scripts/mockServer.js`中修改，同时修改`scripts/start.js`中`webpack-dev-server`中proxy的配置。
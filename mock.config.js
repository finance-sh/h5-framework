/*
 * mock 配置文件
 **/
var mockConfig = [{
    "url": "/mock/getNav",
    "dataPath": "nav.json",
    "type": "get"
}, {
    "url": "/qihang/index.php/Article/addCollect?userId=275&articleId=8",
    "dataPath": "mock/getdata.json",
    "type": "get"
}, {
    "url": "/mock/data",
    "dataPath": "data.json",
    "type": "get"
}]


module.exports = mockConfig;
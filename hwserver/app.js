//使用express构建web服务器 
const express = require('express');
const bodyParser = require('body-parser');
const index=require("./routes/index");    //主页
const detail=require("./routes/detail");    //详情页
const search=require("./routes/search");    //搜索页
const cors=require("cors");  //跨域模块


var app = express();
var server = app.listen(5050);//部署新浪云，硬性要求必须监听5050端口
app.use(cors({
  origin:"http://localhost:8080"
}));
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));

/*使用路由器来管理路由*/
app.use("/index",index);
app.use("/detail",detail);
app.use("/search",search);

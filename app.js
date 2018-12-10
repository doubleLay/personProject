const express=require("express");
const bodyParser=require("body-parser");
const session = require('express-session');
const user=require("./routes/user");
const index=require("./routes/index");
const product=require("./routes/product");
const store=require("./routes/store");
const cart=require("./routes/cart");
const register=require("./routes/register");
var app = express();
var server = app.listen(3000);
app.use(session({
    secret: '128位随机字符串',
    resave: false,
    saveUninitialized: true,
  }))
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));
//配置登录login
app.use("/user",user);
//配置主页index
app.use("/index",index);
//配置商品详情页product
app.use("/product",product);
//配置商品列表页
app.use("/store",store);
//配置购物车模块
app.use("/cart",cart);
//配置注册模块
app.use("/register",register);

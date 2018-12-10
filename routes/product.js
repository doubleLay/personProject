const express=require("express");
const pool=require("../pool");
const router=express.Router();
router.get("/list",(req,res)=>{
    var pid=req.query.pid;
    var sql="SELECT * FROM elec_product WHERE pid=?";
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Content-type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
    })
});
router.get("/comment",(req,res)=>{
    var pno=req.query.pno;
    //客户端分页
    var output={
        pno:0,//页号，从零开始，客户端
        pageSize:3,//每页3个商品
        count:0,//查询的总记录数
        products:[],//查询结果列表
        pageCount:0
    }
    output.pno=req.query.pno;
    var sql="SELECT * FROM elec_product_comment WHERE cid<=12";
    pool.query(sql,[output.pno],(err,result)=>{
        if(err) throw err;
        output.count=result.length;
        output.pageCount=Math.ceil(output.count/output.pageSize);
        output.products=result.slice(output.pno*3,output.pno*3+3);
        //跨域
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        //stringify 是什么？
            res.write(JSON.stringify(output))
            res.end();
    })
});
router.get("/lslist",(req,res)=>{
    var sql="SELECT * FROM elec_similar_product WHERE pid>1";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Content-type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
    })
});
module.exports=router;
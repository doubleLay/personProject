const express=require("express");
const pool=require("../pool.js");
const router=express.Router();
router.get("/list",(req,res)=>{
    var output={
        pno:0,//页号,从零开始，客户端
        pageSize:9,//每页9个商品
        count:0,//查询的总记录数
        products:[],//查询结果列表
        pageCount:0
    }
    output.pno=req.query.pno;//从客户端获取页数
    var kword=req.query.keyword;
    console.log(kword);
    console.log(kword);
    // macbook i5 128g
    var arr=kword.split(" ");
    //arr=[macbook,i5,128g]
    for(var i=0;i<arr.length;i++){
        //将title like '%macbook%'传递给数组
        arr[i]=`pname like '%${arr[i]}%'`;
    }
    var where=" where "+ arr.join(" and ");
    console.log(where);
    var sql="SELECT * FROM elec_store";
    pool.query(sql+where,[],(err,result)=>{
        if(err) console.log(err);
        output.count=result.length;//获取总记录数
        //获取分页数
        output.pageCount=Math.ceil(output.count/output.pageSize);
        output.products=result.slice(output.pno*9,output.pno*9+9);
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        //stringify 是什么？
        res.write(JSON.stringify(output))
        res.end();
    })
})
module.exports=router;